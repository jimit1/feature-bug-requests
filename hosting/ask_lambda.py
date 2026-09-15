import json, os, urllib.request

import ask

CALLS = 0
HEADERS = {"content-type": "application/json",
           "Access-Control-Allow-Origin": "*",
           "Access-Control-Allow-Headers": "content-type"}

def reply(status, body):
    return {"statusCode": status, "headers": HEADERS, "body": json.dumps(body)}

def library():
    with urllib.request.urlopen(os.environ["DATA_URL"], timeout=20) as response:
        text = response.read().decode("utf-8")
    digest = json.loads(text.split("window.DIGEST", 1)[1].split("=", 1)[1].strip().rstrip(";"))
    themes = digest["themes"]
    claims = {c["id"]: c for t in themes for c in t.get("claims", [])}
    return themes, claims

def handler(event, context):
    global CALLS
    method = event.get("requestContext", {}).get("http", {}).get("method", "POST")
    if method == "OPTIONS":
        return {"statusCode": 204, "headers": HEADERS, "body": ""}
    try:
        body = json.loads(event.get("body") or "{}")
        if body.get("passphrase") != os.environ.get("ASK_PASSPHRASE"):
            return reply(403, {"error": "wrong passphrase"})
        if CALLS >= int(os.environ.get("ASK_DAILY_CAP", "200")):
            return reply(429, {"error": "too many questions today, try again tomorrow"})
        CALLS += 1
        question = (body.get("question") or "").strip()[:500]
        if not question:
            return reply(400, {"error": "no question"})
        themes, claims = library()
        return reply(200, {"answer": ask.answer(question, themes, claims)})
    except Exception as failure:
        return reply(500, {"error": ("%s: %s" % (type(failure).__name__, failure)).replace("\n", " ")[:200]})
