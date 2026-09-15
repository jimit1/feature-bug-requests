import json, os, re, urllib.request
from datetime import date

import ask

CALLS = {}
HEADERS = {"content-type": "application/json"}  # CORS is handled by the function URL

def reply(status, body):
    return {"statusCode": status, "headers": HEADERS, "body": json.dumps(body)}

def library():
    with urllib.request.urlopen(os.environ["DATA_URL"], timeout=20) as response:
        text = response.read().decode("utf-8")
    digest = json.loads(text.split("window.DIGEST", 1)[1].split("=", 1)[1].strip().rstrip(";"))
    themes = digest["themes"]
    claims = {c["id"]: c for t in themes for c in t.get("claims", [])}
    return themes, claims

THEMES = re.compile(r"\s*^themes:[ \t]*(.*?)\s*\Z", re.M)

def split_themes(text):
    found = THEMES.search(text)
    if not found:
        return text, []
    named = [n.strip() for n in found.group(1).split(",")]
    return text[:found.start()].rstrip(), [n for n in named if n.startswith("THEME-")]

def handler(event, context):
    today = str(date.today())
    try:
        body = json.loads(event.get("body") or "{}")
        if body.get("passphrase") != os.environ.get("ASK_PASSPHRASE"):
            return reply(403, {"error": "wrong passphrase"})
        if CALLS.get(today, 0) >= int(os.environ.get("ASK_DAILY_CAP", "200")):
            return reply(429, {"error": "too many questions today, try again tomorrow"})
        CALLS[today] = CALLS.get(today, 0) + 1
        question = (body.get("question") or "").strip()[:500]
        if not question:
            return reply(400, {"error": "no question"})
        themes, claims = library()
        text, used = split_themes(ask.answer(question, themes, claims))
        return reply(200, {"answer": text, "themes": used})
    except Exception as failure:
        return reply(500, {"error": ("%s: %s" % (type(failure).__name__, failure)).replace("\n", " ")[:200]})
