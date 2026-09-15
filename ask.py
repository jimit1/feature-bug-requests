import json, pathlib, sys

from run import call_model

ROOT = pathlib.Path(__file__).resolve().parent
LIBRARY = ROOT / "library"

def source_line(loc):
    if "call_id" in loc:
        s = int(loc.get("start_ms", 0)) // 1000
        return "call %s at %d:%02d" % (loc["call_id"], s // 60, s % 60)
    return "case %s, comment %s" % (loc.get("case_id"), loc.get("comment_id"))

def render(themes, claims):
    lines = []
    for t in themes:
        parts = ", ".join("%s %s" % kv for kv in t.get("score_parts", {}).items())
        lines.append("\n%s | %s | score %s (%s)\n%s\n%s" % (
            t["id"], t["type"], t.get("score"), parts, t["title"], t.get("summary", "")))
        for c in (claims.get(i) for i in t.get("claim_ids", [])):
            if c:
                lines.append('  "%s" %s (%s), %s, %s, %s' % (
                    c["quote"], c["account"], c["account_type"], c["speaker"],
                    c["day"], source_line(c["locator"])))
    return "\n".join(lines)

def load_library(library_dir):
    library_dir = pathlib.Path(library_dir)
    themes = [json.loads(p.read_text()) for p in sorted((library_dir / "themes").glob("*.json"))]
    themes.sort(key=lambda t: t.get("score", 0), reverse=True)
    claims = {}
    for path in sorted((library_dir / "claims").glob("*.jsonl")):
        if path.name != "rejected.jsonl":
            for line in path.read_text().splitlines():
                if line.strip():
                    claim = json.loads(line)
                    claims[claim["id"]] = claim
    return themes, claims

def answer(question, themes, claims):
    text = call_model(
        "ask", (ROOT / "agents" / "ask.md").read_text(),
        "Library\n%s\n\nQuestion\n%s" % (render(themes, claims), question))
    return text

def main():
    question = " ".join(sys.argv[1:]).strip()
    if not question:
        sys.exit('usage: python ask.py "why does the renewal credit issue matter"')
    themes, claims = load_library(LIBRARY)
    if not themes:
        sys.exit("library/themes is empty, so there is nothing to ask about yet.")
    print(answer(question, themes, claims))


if __name__ == "__main__":
    main()
