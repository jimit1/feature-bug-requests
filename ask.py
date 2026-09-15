import json
import os
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent
LIBRARY = ROOT / "library"


def source_line(claim):
    loc = claim.get("locator", {})
    if "call_id" in loc:
        seconds = int(loc.get("start_ms", 0)) // 1000
        return "call %s at %d:%02d" % (loc["call_id"], seconds // 60, seconds % 60)
    return "case %s, comment %s" % (loc.get("case_id"), loc.get("comment_id"))


def render(themes, claims):
    lines = []
    for theme in themes:
        parts = ", ".join("%s %s" % kv for kv in theme.get("score_parts", {}).items())
        lines.append("\n%s | %s | score %s (%s)\n%s\n%s" % (
            theme["id"], theme["type"], theme.get("score"), parts,
            theme["title"], theme.get("summary", "")))
        for claim_id in theme.get("claim_ids", []):
            claim = claims.get(claim_id)
            if claim:
                lines.append('  "%s" %s (%s), %s, %s, %s' % (
                    claim["quote"], claim["account"], claim["account_type"],
                    claim["speaker"], claim["day"], source_line(claim)))
    return "\n".join(lines)


def main():
    question = " ".join(sys.argv[1:]).strip()
    if not question:
        print('usage: python ask.py "why does the renewal credit issue matter"')
        return 1
    themes = [json.loads(p.read_text()) for p in sorted((LIBRARY / "themes").glob("*.json"))]
    if not themes:
        print("library/themes is empty, so there is nothing to ask about yet.")
        return 1
    themes.sort(key=lambda t: t.get("score", 0), reverse=True)
    claims = {}
    for path in sorted((LIBRARY / "claims").glob("*.jsonl")):
        if path.name != "rejected.jsonl":
            for line in path.read_text().splitlines():
                if line.strip():
                    claim = json.loads(line)
                    claims[claim["id"]] = claim
    key = os.environ.get("ANTHROPIC_API_KEY")
    if not key:
        print("ANTHROPIC_API_KEY is not set in the environment.")
        return 1
    model = "claude-opus-5"
    config = ROOT / "config.json"
    if config.is_file():
        model = json.loads(config.read_text())["models"]["ask"]
    else:
        print("no config.json, falling back to %s\n" % model)
    import anthropic
    reply = anthropic.Anthropic(api_key=key).messages.create(
        model=model, max_tokens=1024,
        system=(ROOT / "agents" / "ask.md").read_text(),
        messages=[{"role": "user", "content": "Library\n%s\n\nQuestion\n%s" % (
            render(themes, claims), question)}])
    print(reply.content[0].text)
    return 0


sys.exit(main())
