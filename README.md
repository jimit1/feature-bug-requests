# Feature / Bug Requests

A prioritized digest for a product team, built from the conversations already in Gong (sales and customer success calls) and Salesforce (support cases). Every line traces back to the second in a call or the comment in a case where a customer said it. Built for Momentive Software as a scoped prototype on mocked data.

**Live page:** https://jimit1.github.io/feature-bug-requests/ (the ask panel needs the passphrase from my email)

![whole system](deck/png/body/slide-4.png)

## How it works

One job runs every night (`python run.py --next`, one cron line; here a GitHub Actions schedule that consumes one mock day per night and commits):

1. Two **reader agents**, one per source, on the cheap tier, each turn one document into claims: bug or feature, the customer's words verbatim, the speaker, and the locator (call id plus turn start, or case and comment id).
2. **Code verifies** each quote is an exact substring of the cited turn or comment. Nothing is patched; failures go to `library/claims/rejected.jsonl` with a reason. Verified claims are enriched from `data/accounts.json` and appended to `library/claims/`.
3. The **editor agent**, on the frontier tier, reads `library/themes/index.md` first, then every claim not yet filed, and appends each to an existing theme or opens a new one, with one line of why. Code applies the decisions and scores every theme (`accounts + value + cases + recency + bug`, weights in `config.json`, parts kept so the page can show the arithmetic).
4. `ui/data.js` is rebuilt from `library/themes/` and the run commits. The commit history is the audit trail.

The **ask agent** (`ask.py`) answers questions from that same library, quoting the customer and the source for every assertion, and says so when the library does not cover something. Hosted as one Lambda behind a function URL (`hosting/`), behind a passphrase and a daily cap. Application code names a tier, never a model; `config.json` is the only file that does.

## Traceability

A sentence reaches the page only through a claim, and a claim exists only if code found its quote, character for character, in the source it cites. Example: theme THEME-0001 carries claim `c-915d4dd0bc13`, "Every renewal statement we send out is missing the balance that carried over from the previous period, so the invoice total reads far higher than it should." It cites call 7782934451002, speaker 4521, 663288 ms (11:03 on the page), and that sentence sits in `data/gong/7782934451002.json` at exactly that turn.

## In production

- Nightly, only days not yet in `library/state.json`. The two mock loaders in `run.py` read the real Gong and Salesforce API shapes; swapping them for read-only connectors is the only change to go live.
- The theme index is the editor's memory between runs, and it is a text file anyone can read. `library/themes/` is the one source the page and the ask agent both read.
- The model call is one function. Bedrock instead of the API makes sense when data must stay in the company's AWS account, identity should be IAM, traffic must stay on private networking, or billing should consolidate under AWS. This prototype calls the API directly.

## Cost and volume

From the run summaries in the commit messages, first five nights on the API path:

| | |
|---|---|
| cost per nightly run | COST |
| sources per run | SOURCES |
| claims verified | CLAIMS |
| themes after the first week | THEMES |
| appended versus opened | APPENDED |

Extraction is most of the tokens and runs on the cheap tier; the editor only ever sees the index and the unfiled claims, so its cost stays flat as history grows.

## Not built, by choice

Designed and drawn in `deck/png/slide-7.png`, left out of a scoped prototype: a PII scrub before the readers (the mock data is already redacted), live read-only connectors, a golden-set eval diffed week over week, and an approve gate before anything is filed into a backlog.

## Run it yourself

```
pip install -r requirements.txt
export ANTHROPIC_API_KEY=...
python run.py --next
python ask.py "why does the renewal credit issue matter"
pytest -q
```
