"""Nightly pipeline: read one day of calls and cases, verify every quote, file claims into themes."""
import argparse, glob, hashlib, json, os, re, subprocess, sys
from datetime import date, datetime, timedelta

ROOT = os.path.dirname(os.path.abspath(__file__))
def path(*a): return os.path.join(ROOT, *a)
def load(rel): return json.load(open(path(rel), encoding="utf-8"))

CFG = load("config.json")
PRICE = {"reader": (1.0, 5.0), "editor": (5.0, 25.0)}
USAGE = {"reader": [0, 0], "editor": [0, 0]}
CLIENT = []


def call_model(tier, system, user):
    import anthropic
    key = os.environ.get("ANTHROPIC_API_KEY")
    if not key:
        sys.exit("ANTHROPIC_API_KEY is not set in the environment. Export it and run again.")
    if not CLIENT:
        CLIENT.append(anthropic.Anthropic(api_key=key))
    r = CLIENT[0].messages.create(model=CFG["models"][tier], max_tokens=4096, system=system,
                                  messages=[{"role": "user", "content": user}])
    USAGE[tier][0] += r.usage.input_tokens
    USAGE[tier][1] += r.usage.output_tokens
    return "".join(b.text for b in r.content if b.type == "text")


def parse_json(text):
    t = text.strip()
    if t.startswith("```"):
        t = re.sub(r"^```[a-zA-Z]*\s*", "", t).rsplit("```", 1)[0]
    try:
        return json.loads(t)
    except ValueError:
        return None


def stamp(iso, ms=0):
    t = datetime.strptime(iso[:19], "%Y-%m-%dT%H:%M:%S") + timedelta(milliseconds=ms)
    return t.strftime("%Y-%m-%dT%H:%M:%SZ")


def account_fields(a):
    if not a:
        return {"account_id": None, "account": None, "account_type": None, "tier": None, "arr": 0}
    r = a["record"]
    return {"account_id": a["account_id"], "account": r["Name"], "account_type": a["account_type"],
            "tier": r.get("Tier__c"), "arr": r.get("ARR__c") or 0}


def open_cases_per_account(by_sfid):
    counts = {}
    for f in sorted(glob.glob(path("data/salesforce/*.json"))):
        c = json.load(open(f, encoding="utf-8"))["case"]
        if c.get("ClosedDate") or c.get("Status") == "Closed":
            continue
        a = by_sfid.get(c.get("AccountId"))
        if a:
            counts[a["account_id"]] = counts.get(a["account_id"], 0) + 1
    return counts


def gong_doc(f, by_domain, day):
    d = json.load(open(f, encoding="utf-8"))
    meta, parties = d["call"]["metaData"], {p["speakerId"]: p for p in d["call"]["parties"]}
    acct = None
    for p in d["call"]["parties"]:
        if p.get("affiliation") == "External" and not acct:
            acct = by_domain.get((p.get("emailAddress") or "@").rsplit("@", 1)[-1])
    lines = ["Call %s, recorded %s. Title: %s" % (meta["id"], meta["started"][:10], meta.get("title", "")),
             "Turns in order. Each header reads [speaker_id S | Name | side | START-END]."]
    units = {}
    for t in d["transcript"]["transcript"]:
        s = t.get("sentences") or []
        if not s:
            continue
        sid, start, end = str(t["speakerId"]), s[0]["start"], s[-1]["end"]
        p = parties.get(t["speakerId"], {})
        side = "client" if p.get("affiliation") == "External" else "momentive"
        text = " ".join(x["text"] for x in s)
        units[(sid, start, end)] = {"text": text, "side": side, "speaker": p.get("name", "Unknown"),
                                    "day": meta["started"][:10], "occurred_at": stamp(meta["started"], start)}
        lines += ["", "[speaker_id %s | %s | %s | %d-%d]" % (sid, p.get("name", "Unknown"), side, start, end), text]
    return {"source": "gong", "doc_id": meta["id"], "day": day, "account": account_fields(acct),
            "text": "\n".join(lines), "units": units, "hidden": set()}


def case_doc(f, by_sfid, users, day):
    d = json.load(open(f, encoding="utf-8"))
    c = d["case"]
    lines = ["Case %s, opened %s, run date %s. Subject: %s" % (c["Id"], c["CreatedDate"][:10], day, c.get("Subject", "")),
             "Comments oldest first. Each header reads [comment_id C | Name | side | DATE]."]
    units, hidden = {}, set()
    for cm in d.get("comments", []):
        if not cm.get("IsPublished"):
            hidden.add(cm["Id"])
            continue
        u = users.get(cm.get("CreatedById"))
        side = "momentive" if u and u.get("UserType") == "Standard" else "client"
        name = u["Name"] if u else "Unknown"
        units[cm["Id"]] = {"text": cm["CommentBody"], "side": side, "speaker": name,
                           "day": cm["CreatedDate"][:10], "occurred_at": stamp(cm["CreatedDate"])}
        lines += ["", "[comment_id %s | %s | %s | %s]" % (cm["Id"], name, side, cm["CreatedDate"][:10]),
                  cm["CommentBody"]]
    return {"source": "salesforce", "doc_id": c["Id"], "day": day, "case_number": c.get("CaseNumber"),
            "account": account_fields(by_sfid.get(c.get("AccountId"))),
            "text": "\n".join(lines), "units": units, "hidden": hidden}


def documents_for(day):
    accs = load("data/accounts.json")["accounts"]
    by_domain = {a["domain"]: a for a in accs}
    by_sfid = {a["record"]["Id"]: a for a in accs}
    users = {u["Id"]: u for u in load("data/users.json")["records"]}
    docs = []
    for f in sorted(glob.glob(path("data/gong/*.json"))):
        if json.load(open(f, encoding="utf-8"))["call"]["metaData"]["started"][:10] == day:
            docs.append(gong_doc(f, by_domain, day))
    for f in sorted(glob.glob(path("data/salesforce/*.json"))):
        d = json.load(open(f, encoding="utf-8"))
        if any(c.get("IsPublished") and c["CreatedDate"][:10] == day for c in d.get("comments", [])):
            docs.append(case_doc(f, by_sfid, users, day))
    return docs, by_sfid


def unit_key(source, loc):
    if source == "gong":
        return (str(loc["speaker_id"]), int(loc["start_ms"]), int(loc["end_ms"]))
    return str(loc["comment_id"])


def verify(claim, doc):
    """Return None when the claim is citable and its quote is exact, otherwise the reason it is rejected."""
    if not isinstance(claim, dict) or claim.get("type") not in ("bug", "feature"):
        return "malformed"
    if not isinstance(claim.get("quote"), str) or not isinstance(claim.get("locator"), dict) or not claim.get("topic"):
        return "malformed"
    try:
        key = unit_key(doc["source"], claim["locator"])
    except (KeyError, TypeError, ValueError):
        return "malformed"
    unit = doc["units"].get(key)
    if unit is None:
        return "internal comment" if key in doc["hidden"] else "unknown speaker"
    if unit["side"] != "client":
        return "unknown speaker"
    if unit["day"] != doc["day"]:
        return "comment outside the run day"
    if claim["quote"] not in unit["text"]:
        return "quote not found in cited turn"
    return None


def build_claim(claim, doc):
    unit = doc["units"][unit_key(doc["source"], claim["locator"])]
    loc = dict(claim["locator"])
    if doc["source"] == "salesforce":
        loc["case_number"] = doc.get("case_number")
    seed = doc["source"] + json.dumps(loc, sort_keys=True) + claim["quote"]
    out = {"id": "c-" + hashlib.sha256(seed.encode("utf-8")).hexdigest()[:12], "day": doc["day"],
           "source": doc["source"], "type": claim["type"], "topic": claim["topic"], "quote": claim["quote"]}
    out.update(doc["account"])
    out["speaker"] = unit["speaker"] if unit["speaker"] != "Unknown" else claim.get("speaker", "Unknown")
    out["locator"] = loc
    out["occurred_at"] = unit["occurred_at"]
    return out


def read_documents(docs, day):
    prompts = {"gong": open(path("agents/call_reader.md"), encoding="utf-8").read(),
               "salesforce": open(path("agents/case_reader.md"), encoding="utf-8").read()}
    claims, rejected = [], []
    for doc in docs:
        out = parse_json(call_model("reader", prompts[doc["source"]], doc["text"]))
        if not isinstance(out, dict) or not isinstance(out.get("claims"), list):
            rejected.append({"day": day, "source": doc["source"], "doc_id": doc["doc_id"], "reason": "malformed"})
            continue
        for c in out["claims"]:
            reason = verify(c, doc)
            if reason:
                bad = c if isinstance(c, dict) else {"raw": str(c)[:400]}
                rejected.append(dict(bad, day=day, source=doc["source"], doc_id=doc["doc_id"], reason=reason))
            else:
                claims.append(build_claim(c, doc))
    seen, unique = set(), []
    for c in claims:
        if c["id"] not in seen:
            seen.add(c["id"])
            unique.append(c)
    return unique, rejected


def apply_decisions(out, new_claims, themes, state, day):
    by_id = {c["id"]: c for c in new_claims}
    summaries = out.get("summaries") or {}
    opened_by_title, appended, opened = {}, 0, 0
    for d in out.get("decisions") or []:
        c = by_id.get(d.get("claim_id"))
        if not c:
            continue
        action, tid, title = d.get("action"), d.get("theme_id"), d.get("title") or c["topic"]
        if action == "append" and tid in themes:
            theme = themes[tid]
            appended += 1
        elif title in opened_by_title:
            theme = opened_by_title[title]
            action, appended = "append", appended + 1
        else:
            tid = "THEME-%04d" % state["next_theme"]
            state["next_theme"] += 1
            theme = {"id": tid, "title": title, "type": c["type"], "summary": summaries.get(title, ""),
                     "claim_ids": [], "first_seen": day, "last_seen": day, "log": []}
            themes[tid] = opened_by_title[title] = theme
            action, opened = "open", opened + 1
        if c["id"] not in theme["claim_ids"]:
            theme["claim_ids"].append(c["id"])
        theme["log"].append({"day": day, "action": action, "claim_id": c["id"], "why": d.get("why", "")})
        theme["last_seen"] = max(theme["last_seen"], day)
        if summaries.get(theme["id"]):
            theme["summary"] = summaries[theme["id"]]
    return appended, opened


def score_theme(theme, claims, open_cases, day):
    cs = [claims[i] for i in theme["claim_ids"] if i in claims]
    ids = {c["account_id"] for c in cs if c.get("account_id")}
    w, cap = CFG["weights"], CFG["arr_cap"]
    theme["accounts"] = {k: len({c["account_id"] for c in cs if c.get("account_type") == k and c.get("account_id")})
                         for k in ("customer", "prospect")}
    theme["open_cases"] = sum(open_cases.get(a, 0) for a in ids)
    since = (date.fromisoformat(day) - date.fromisoformat(theme["last_seen"])).days
    parts = {"accounts": round(w["accounts"] * min(len(ids), 4) / 4, 1),
             "value": round(w["value"] * min(max([c.get("arr") or 0 for c in cs] or [0]), cap) / cap, 1),
             "cases": round(w["cases"] * min(theme["open_cases"], 4) / 4, 1),
             "recency": round(w["recency"] * max(0, CFG["recency_days"] - since) / CFG["recency_days"], 1),
             "bug": float(w["bug"]) if theme["type"] == "bug" else 0.0}
    theme["score_parts"] = parts
    theme["score"] = round(sum(parts.values()))
    return theme


def all_claims():
    out = {}
    for f in sorted(glob.glob(path("library/claims/*.jsonl"))):
        if f.endswith("rejected.jsonl"):
            continue
        for line in open(f, encoding="utf-8"):
            if line.strip():
                c = json.loads(line)
                out[c["id"]] = c
    return out


def append_jsonl(rel, rows):
    os.makedirs(os.path.dirname(path(rel)), exist_ok=True)
    with open(path(rel), "a", encoding="utf-8") as fh:
        for r in rows:
            fh.write(json.dumps(r, ensure_ascii=False) + "\n")


def write_library(themes, claims, state, day):
    os.makedirs(path("library/themes"), exist_ok=True)
    ranked = sorted(themes.values(), key=lambda t: -t["score"])
    for t in themes.values():
        json.dump(t, open(path("library/themes/%s.json" % t["id"]), "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    index = ["%s | %s | %s | %d accounts | last %s" % (t["id"], t["type"], t["title"],
             sum(t["accounts"].values()), t["last_seen"]) for t in sorted(themes.values(), key=lambda t: t["id"])]
    open(path("library/themes/index.md"), "w", encoding="utf-8").write("\n".join(index) + ("\n" if index else ""))
    view = {"generated": day, "days": state["days"],
            "themes": [dict(t, claims=[claims[i] for i in t["claim_ids"] if i in claims]) for t in ranked]}
    open(path("ui/data.js"), "w", encoding="utf-8").write(
        "window.DIGEST = " + json.dumps(view, indent=1, ensure_ascii=False) + ";\n")
    json.dump(state, open(path("library/state.json"), "w", encoding="utf-8"), indent=1)


def main():
    ap = argparse.ArgumentParser(description="Build one day of the feature and bug digest.")
    ap.add_argument("--day", required=True, help="YYYY-MM-DD")
    ap.add_argument("--no-commit", action="store_true")
    args = ap.parse_args()
    day = args.day
    state = load("library/state.json") if os.path.exists(path("library/state.json")) else {"days": [], "next_theme": 1}
    if day in state["days"]:
        print("%s is already in state.json. Nothing to do." % day)
        return
    if not os.environ.get("ANTHROPIC_API_KEY"):
        sys.exit("ANTHROPIC_API_KEY is not set in the environment. Export it and run again.")

    docs, by_sfid = documents_for(day)
    claims, rejected = read_documents(docs, day)
    known = all_claims()
    claims = [c for c in claims if c["id"] not in known]
    if rejected:
        append_jsonl("library/claims/rejected.jsonl", rejected)
    if claims:
        append_jsonl("library/claims/%s.jsonl" % day, claims)

    themes = {}
    for f in sorted(glob.glob(path("library/themes/*.json"))):
        t = json.load(open(f, encoding="utf-8"))
        themes[t["id"]] = t
    appended = opened = 0
    if claims:
        index = open(path("library/themes/index.md"), encoding="utf-8").read() if os.path.exists(path("library/themes/index.md")) else ""
        brief = [{k: c[k] for k in ("id", "type", "topic", "quote", "account", "account_type", "day")} for c in claims]
        user = ("Theme index, one line per theme:\n%s\n\nTonight's verified claims, %s:\n%s"
                % (index or "(empty, no themes yet)", day, json.dumps(brief, indent=1, ensure_ascii=False)))
        out = parse_json(call_model("editor", open(path("agents/editor.md"), encoding="utf-8").read(), user))
        if isinstance(out, dict):
            appended, opened = apply_decisions(out, claims, themes, state, day)
        else:
            print("The editor returned no usable JSON. Claims are stored, themes are unchanged.")

    known.update({c["id"]: c for c in claims})
    open_cases = open_cases_per_account(by_sfid)
    for t in themes.values():
        score_theme(t, known, open_cases, day)
    state["days"] = sorted(set(state["days"] + [day]))
    write_library(themes, known, state, day)

    cost = sum(USAGE[t][0] * PRICE[t][0] / 1e6 + USAGE[t][1] * PRICE[t][1] / 1e6 for t in USAGE)
    tin, tout = sum(USAGE[t][0] for t in USAGE), sum(USAGE[t][1] for t in USAGE)
    msg = "%s: %d sources, %d claims, %d rejected, %d themes appended, %d opened" % (
        day, len(docs), len(claims), len(rejected), appended, opened)
    print("%s, %d themes total, %d in / %d out tokens, $%.4f" % (msg, len(themes), tin, tout, cost))
    if not args.no_commit:
        subprocess.run(["git", "add", "library", "ui/data.js"], cwd=ROOT, check=True)
        subprocess.run(["git", "commit", "-m", msg], cwd=ROOT, check=True)


if __name__ == "__main__":
    main()
