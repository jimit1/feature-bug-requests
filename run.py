"""Nightly pipeline: read one day of calls and cases, verify every quote, file claims into themes."""
import argparse, glob, hashlib, json, os, re, subprocess, sys
from datetime import date, datetime, timedelta
ROOT = os.path.dirname(os.path.abspath(__file__))
def path(*a): return os.path.join(ROOT, *a)
def load(rel): return json.load(open(path(rel), encoding="utf-8"))  # rel or absolute
CFG = load("config.json")
PRICE = {"reader": (1.0, 5.0), "editor": (5.0, 25.0), "ask": (3.0, 15.0)}
USAGE = {"reader": [0, 0], "editor": [0, 0], "ask": [0, 0]}
CLIENT = []

SCHEMAS = {"reader": load("agents/reader.schema.json"), "editor": load("agents/editor.schema.json")}  # the only shapes an agent can answer in

def call_model(tier, system, user):
    import anthropic
    if not os.environ.get("ANTHROPIC_API_KEY"):
        sys.exit("ANTHROPIC_API_KEY is not set in the environment. Export it and run again.")
    CLIENT[:] = CLIENT or [anthropic.Anthropic()]
    tool = {"tools": [{"name": "record", "description": "Record the result.", "input_schema": SCHEMAS[tier]}],
            "tool_choice": {"type": "tool", "name": "record"}} if tier in SCHEMAS else {}
    r = CLIENT[0].messages.create(model=CFG["models"][tier], max_tokens=4096, system=system,
                                  messages=[{"role": "user", "content": user}], **tool)
    USAGE[tier][0] += r.usage.input_tokens
    USAGE[tier][1] += r.usage.output_tokens
    if tool:
        return next((b.input for b in r.content if b.type == "tool_use"), None)
    return "".join(b.text for b in r.content if b.type == "text")
EMAIL, PHONE = re.compile(r"[\w.+-]+@[\w-]+\.[\w.-]+\w"), re.compile(r"(?:\+?\d{1,2}[ .-])?\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}")
REDACTED = [0]

def scrub(doc, names):
    """Replace addresses, numbers and customer-side names before any of this text reaches a reader."""
    pats = [(EMAIL, "[EMAIL]"), (PHONE, "[PHONE]")]
    pats += [(re.compile(re.escape(n)), "[NAME]") for n in sorted(set(names)) if n and n != "Unknown"]
    def clean(text, count=False):
        for pat, tag in pats:
            text, hits = pat.subn(tag, text)
            REDACTED[0] += hits if count else 0
        return text
    doc["text"] = clean(doc["text"], True)
    for unit in doc["units"].values():  # the verifier checks quotes against the same scrubbed text
        unit["text"] = clean(unit["text"])
    return doc

def stamp(iso, ms=0):
    t = datetime.strptime(iso[:19], "%Y-%m-%dT%H:%M:%S") + timedelta(milliseconds=ms)
    return t.strftime("%Y-%m-%dT%H:%M:%SZ")
def account_fields(a):
    if not a:
        return {"account_id": None, "account": None, "account_type": None, "tier": None, "arr": 0}
    r = a["record"]
    return {"account_id": a["account_id"], "account": r["Name"], "account_type": a["account_type"],
            "tier": r.get("Tier__c"), "arr": r.get("ARR__c") or 0}

def open_cases_per_account(cases, by_sfid):
    counts = {}
    for c in (d["case"] for d in cases):
        if c.get("ClosedDate") or c.get("Status") == "Closed":
            continue
        a = by_sfid.get(c.get("AccountId"))
        if a:
            counts[a["account_id"]] = counts.get(a["account_id"], 0) + 1
    return counts

def gong_doc(d, by_domain, day):
    meta, parties = d["call"]["metaData"], {p["speakerId"]: p for p in d["call"]["parties"]}
    domains = [(p.get("emailAddress") or "@").rsplit("@", 1)[-1] for p in d["call"]["parties"]
               if p.get("affiliation") == "External"]
    acct = next((by_domain[dm] for dm in domains if dm in by_domain), None)
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
    return scrub({"source": "gong", "doc_id": meta["id"], "day": day, "account": account_fields(acct),
                  "text": "\n".join(lines), "units": units, "hidden": set()},
                 [p.get("name") for p in d["call"]["parties"] if p.get("affiliation") == "External"])

def case_doc(d, by_sfid, users, day):
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
    return scrub({"source": "salesforce", "doc_id": c["Id"], "day": day, "case_number": c.get("CaseNumber"),
                  "account": account_fields(by_sfid.get(c.get("AccountId"))),
                  "text": "\n".join(lines), "units": units, "hidden": hidden},
                 [u["speaker"] for u in units.values()])

def documents_for(day):
    accs = load("data/accounts.json")["accounts"]
    by_domain = {a["domain"]: a for a in accs}
    by_sfid = {a["record"]["Id"]: a for a in accs}
    users = {u["Id"]: u for u in load("data/users.json")["records"]}
    docs = []
    for d in (load(f) for f in sorted(glob.glob(path("data/gong/*.json")))):
        if d["call"]["metaData"]["started"][:10] == day:
            docs.append(gong_doc(d, by_domain, day))
    cases = [load(f) for f in sorted(glob.glob(path("data/salesforce/*.json")))]
    for d in cases:
        if any(c.get("IsPublished") and c["CreatedDate"][:10] == day for c in d.get("comments", [])):
            docs.append(case_doc(d, by_sfid, users, day))
    return docs, by_sfid, cases
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
        return "not the customer side"
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
        out = call_model("reader", prompts[doc["source"]], doc["text"])
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
    return list({c["id"]: c for c in claims}.values()), rejected

def apply_decisions(out, new_claims, themes, state, day):
    by_id = {c["id"]: c for c in new_claims}
    summaries = out.get("summaries") or {}
    opened_by_title, appended, opened = {t["title"].lower(): t for t in themes.values()}, 0, 0
    for d in out.get("decisions") or []:
        c = by_id.get(d.get("claim_id"))
        if not c:  # an editor decision that names nothing real is still part of the trail
            append_jsonl("library/claims/rejected.jsonl", [dict(d, day=day, source="editor",
                         reason="decision names a claim that was not in tonight's claims")])
            continue
        action, tid, title = d.get("action"), d.get("theme_id"), d.get("title") or c["topic"]
        if action == "append" and tid in themes:
            theme = themes[tid]
            appended += 1
        elif title.lower() in opened_by_title:
            theme = opened_by_title[title.lower()]
            action, appended = "append", appended + 1
        else:
            tid = "THEME-%04d" % state["next_theme"]
            state["next_theme"] += 1
            theme = {"id": tid, "title": title, "type": c["type"], "summary": summaries.get(title, ""),
                     "claim_ids": [], "first_seen": day, "last_seen": day, "log": []}
            themes[tid] = opened_by_title[title.lower()] = theme
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
    theme["score_parts"], theme["score"] = parts, round(sum(parts.values()))
    theme["type"] = max(("bug", "feature"), key=lambda k: sum(c.get("type") == k for c in cs)) if cs else theme["type"]
    return theme
def unfiled(themes, known):
    filed = {i for t in themes.values() for i in t["claim_ids"]}
    return [c for c in known.values() if c["id"] not in filed]

def all_claims():
    files = [f for f in sorted(glob.glob(path("library/claims/*.jsonl"))) if not f.endswith("rejected.jsonl")]
    rows = [json.loads(ln) for f in files for ln in open(f, encoding="utf-8") if ln.strip()]
    return {c["id"]: c for c in rows}
def append_jsonl(rel, rows):
    if not rows:
        return
    os.makedirs(os.path.dirname(path(rel)), exist_ok=True)
    with open(path(rel), "a", encoding="utf-8") as fh:
        for r in rows:
            fh.write(json.dumps(r, ensure_ascii=False) + "\n")

def write_library(themes, claims, state, day):
    os.makedirs(path("library/themes"), exist_ok=True)
    ranked = sorted(themes.values(), key=lambda t: -t["score"])
    for t in themes.values():
        json.dump(t, open(path("library/themes/%s.json" % t["id"]), "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    index = ["%s | %s | %s | accounts %d | last %s" % (t["id"], t["type"], t["title"],
             sum(t["accounts"].values()), t["last_seen"]) for t in sorted(themes.values(), key=lambda t: t["id"])]
    open(path("library/themes/index.md"), "w", encoding="utf-8").write("\n".join(index) + ("\n" if index else ""))
    view = {"as_of": day, "days": state["days"], "ask_url": CFG.get("ask_url", ""),
            "themes": [dict(t, claims=[claims[i] for i in t["claim_ids"] if i in claims]) for t in ranked]}
    open(path("ui/data.js"), "w", encoding="utf-8").write(
        "window.DIGEST = " + json.dumps(view, indent=1, ensure_ascii=False) + ";\n")
    json.dump(state, open(path("library/state.json"), "w", encoding="utf-8"), indent=1)

def data_days():
    calls = [load(f)["call"]["metaData"]["started"][:10] for f in glob.glob(path("data/gong/*.json"))]
    comments = [c["CreatedDate"][:10] for f in glob.glob(path("data/salesforce/*.json")) for c in load(f)["comments"]]
    return sorted(set(calls + comments))

def all_units():
    """Every turn and published comment under data/, keyed the way a claim locator keys it."""
    accs = load("data/accounts.json")["accounts"]
    users = {u["Id"]: u for u in load("data/users.json")["records"]}
    docs = [gong_doc(load(f), {a["domain"]: a for a in accs}, "") for f in sorted(glob.glob(path("data/gong/*.json")))]
    docs += [case_doc(load(f), {a["record"]["Id"]: a for a in accs}, users, "")
             for f in sorted(glob.glob(path("data/salesforce/*.json")))]
    return {(d["source"], k) for d in docs for k in d["units"]}

def resolves(claim, units):
    try:
        return (claim["source"], unit_key(claim["source"], claim["locator"])) in units
    except (KeyError, TypeError, ValueError):
        return False

def run_eval():
    """The golden set: claims that must still be there, sentences that must never be, locators that must resolve."""
    golden, claims = load("evals/golden.json"), list(all_claims().values())
    checks = [(any(c["quote"] == g["quote"] and c["account"] == g["account"] for c in claims),
               "present, %s: %s" % (g["account"], g["quote"][:56])) for g in golden["present"]]
    checks += [(not any(g["quote"] in c["quote"] for c in claims), "absent, %s: %s" % (g["why"], g["quote"][:56]))
               for g in golden["absent"]]
    units = all_units()
    lost = [c["id"] for c in claims if not resolves(c, units)]
    checks.append((not lost, "every locator resolves in data, %d claims checked, %d lost" % (len(claims), len(lost))))
    for ok, line in checks:
        print("%s  %s" % ("pass" if ok else "FAIL", line))
    print("%d of %d passed" % (sum(1 for ok, _ in checks if ok), len(checks)))
    return 0 if all(ok for ok, _ in checks) else 1

def main():
    ap = argparse.ArgumentParser(description="Build one day of the feature and bug digest.")
    ap.add_argument("--day", help="YYYY-MM-DD, or --next for the earliest day not yet run")
    ap.add_argument("--next", action="store_true")
    ap.add_argument("--no-commit", action="store_true")
    ap.add_argument("--eval", action="store_true", help="run the golden set against the library and exit")
    args = ap.parse_args()
    if args.eval:
        sys.exit(run_eval())
    state = load("library/state.json") if os.path.exists(path("library/state.json")) else {"days": [], "next_theme": 1}
    if not (args.day or args.next):
        ap.error("use --day YYYY-MM-DD or --next")
    day = args.day or next((d for d in data_days() if d not in state["days"]), None)
    if not day or day in state["days"]:
        print("%s. Nothing to do." % ("%s is already in state.json" % day if day else "No day left to run"))
        return
    docs, by_sfid, cases = documents_for(day)
    claims, rejected = read_documents(docs, day)
    known = all_claims()
    seen = {(c.get("account_id"), c["quote"]) for c in known.values()}
    claims = list({(c.get("account_id"), c["quote"]): c for c in claims
                   if c["id"] not in known and (c.get("account_id"), c["quote"]) not in seen}.values())
    append_jsonl("library/claims/rejected.jsonl", rejected)
    append_jsonl("library/claims/%s.jsonl" % day, claims)

    themes = {t["id"]: t for t in (load(f)
                                  for f in sorted(glob.glob(path("library/themes/*.json"))))}
    known.update({c["id"]: c for c in claims})
    to_file = unfiled(themes, known)
    appended = opened = 0
    if to_file:
        index = open(path("library/themes/index.md"), encoding="utf-8").read() if os.path.exists(path("library/themes/index.md")) else ""
        brief = [{k: c[k] for k in ("id", "type", "topic", "quote", "account", "account_type", "day")} for c in to_file]
        user = ("Theme index, one line per theme:\n%s\n\nTonight's verified claims, %s:\n%s"
                % (index or "(empty, no themes yet)", day, json.dumps(brief, indent=1, ensure_ascii=False)))
        out = call_model("editor", open(path("agents/editor.md"), encoding="utf-8").read(), user)
        if isinstance(out, dict):
            appended, opened = apply_decisions(out, to_file, themes, state, day)
        else:
            append_jsonl("library/claims/rejected.jsonl", [{"day": day, "source": "editor", "reason":
                         "editor returned nothing usable", "claim_ids": [c["id"] for c in to_file]}])
            print("The editor returned nothing usable. The claims are stored and will be filed on the next run.")

    open_cases = open_cases_per_account(cases, by_sfid)
    for t in themes.values():
        score_theme(t, known, open_cases, day)
    state["days"] = sorted(set(state["days"] + [day]))
    ranking = [t["id"] for t in sorted(themes.values(), key=lambda t: -t["score"])]
    was = {t: i for i, t in enumerate(state.get("ranking") or [])}
    moved = sum(1 for i, t in enumerate(ranking) if t in was and was[t] != i)
    state["ranking"] = ranking
    write_library(themes, known, state, day)

    cost = sum(USAGE[t][0] * PRICE[t][0] / 1e6 + USAGE[t][1] * PRICE[t][1] / 1e6 for t in USAGE)
    tin, tout = sum(USAGE[t][0] for t in USAGE), sum(USAGE[t][1] for t in USAGE)
    msg = "%s: %d sources, %d redactions, %d new, %d filed, %d rejected, %d appended, %d opened, %d unfiled, %d themes, %d changed rank, %d in / %d out tokens, $%.4f" % (
        day, len(docs), REDACTED[0], len(claims), len(to_file), len(rejected), appended, opened,
        len(unfiled(themes, known)), len(themes), moved, tin, tout, cost)
    print(msg)
    if not args.no_commit:
        subprocess.run(["git", "add", "library", "ui/data.js"], cwd=ROOT, check=True)
        subprocess.run(["git", "commit", "-m", msg], cwd=ROOT, check=True)

if __name__ == "__main__":
    main()
