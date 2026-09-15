# Feature / Bug Requests

A prioritized digest for a product team, built from the customer conversations that already exist in Gong (sales and customer success calls) and Salesforce (support cases). Every line on the page traces back to the second in a call or the comment in a case where a customer said it. I built it for Momentive Software as a scoped prototype: two mocked sources, three agents, one git library, one page.

**Live page:** https://jimit1.github.io/feature-bug-requests/ (the ask panel on the right needs the passphrase from my email)

**This repository is the library.** The nightly job commits into it, so the commit history is the audit trail and the page is always the current state of `library/themes/`.

## How to run it

The committed `library/` and `ui/` are the demo, so nothing here needs to run to review it. To run it yourself you need an API key in `ANTHROPIC_API_KEY`.

```
pip install -r requirements.txt
python run.py --next                 # the earliest day in data/ not yet run: read, verify, file, rank, commit
python ask.py "why does the renewal credit issue matter"
pytest -q
open ui/index.html                   # works from disk, no server
```

In production the one cron line is `0 6 * * * python run.py --next`. Here that line lives in `.github/workflows/nightly.yml`, which runs it every morning at 06:00 UTC, pushes the commit, and republishes the page. Each mock day is consumed one night at a time, so the repository shows a new commit and the page a new state every day for two weeks.

## The system

![whole system](deck/png/body/slide-4.png)

One job runs every night, in this order:

1. **Two reader agents**, one per source, on the cheap tier. Each reads one document (a call transcript or a case thread) and returns claims as JSON: type (bug or feature), the customer's words verbatim, the speaker, and the locator (call id plus turn start, or case id plus comment id). Prompts: `agents/call_reader.md`, `agents/case_reader.md`.
2. **Verification, in code.** A claim survives only if its quote is an exact substring of the turn or comment it cites. Nothing is patched. Rejections go to `library/claims/rejected.jsonl` with a reason. Verified claims are enriched from `data/accounts.json` (customer or prospect, tier, ARR) and appended to `library/claims/<day>.jsonl`.
3. **The editor agent**, on the frontier tier, once per night. It reads `library/themes/index.md` first, one line per existing theme, then the night's new claims, and returns one decision per claim: append to an existing theme or open a new one, with one line of why. Prompt: `agents/editor.md`. Code applies the decisions.
4. **Scoring, in code.** `accounts + value + cases + recency + bug`, weights in `config.json`, parts stored on each theme so the page can print the arithmetic.
5. **Publish.** `ui/data.js` is regenerated from `library/themes/`, and the run commits. `themes/` is the single source; the page and the ask agent both read it and nothing else, so they cannot disagree.

**The ask agent** (`ask.py`, prompt `agents/ask.md`) answers a product manager's question from the library only, quoting the customer and the source for every assertion, and says so when the library does not cover something. It ends each answer with the themes it drew on, and the page spotlights those. Hosted as one AWS Lambda behind a function URL (`hosting/ask_lambda.py`, deployed by `hosting/deploy_ask.sh`), behind a passphrase and a daily cap because the key sits behind it.

Application code asks for a tier, never a model. `config.json` is the only file that names one.

## The traceability guarantee

A sentence reaches the page only through a claim, and a claim exists only if code found its quote, character for character, in the source it cites. The model proposes; code checks; the page shows the check. Worked example from the library: theme THEME-0001 carries claim `c-915d4dd0bc13` whose quote is "Every renewal statement we send out is missing the balance that carried over from the previous period, so the invoice total reads far higher than it should." It cites call 7782934451002, speaker 4521, 663288 ms, which is 11:03 on the page, and that sentence sits in `data/gong/7782934451002.json` at exactly that turn.

## How it gathers its own context in production

- One nightly job, pulling only days not yet in `library/state.json`, so nothing is read twice.
- The mock loaders in `run.py` (`gong_doc`, `case_doc`) read files in the real Gong and Salesforce API response shapes. Swapping them for read-only connectors, scoped to transcripts and cases, is the only change to go live.
- The theme index is what the editor reads first. It is the agent's memory between runs, and it is a text file anyone can open.
- `library/themes/` is the one source every consumer reads. Commits are the audit trail: who changed what, when, with the editor's reason on every append.
- Hosting: the page on GitHub Pages, the nightly job on GitHub Actions, the ask agent on Lambda behind my own URL. The model call is one function. Running it on Bedrock instead makes sense when the data must stay inside the company's AWS account, when identity should be IAM rather than an API key, when traffic has to stay on private networking, or when billing should consolidate under AWS. This prototype calls the API directly because none of those apply to mocked data, and the swap is that one function.

## Cost and volume

Measured on the API path, from the run summaries in the commit messages.

| | |
|---|---|
| cost per nightly run | $0.068 average over five runs, $0.112 the busiest |
| sources per run | 5.8 average (calls plus cases with new comments) |
| claims verified per run | 6.4 average, 32 in total, 1 rejected |
| themes after the first week | 12 |
| appended versus opened | 16 appended, 12 opened; after night one, 16 of 22 claims joined an existing theme |

Extraction runs on the cheap tier and is most of the tokens; the editor sees only the index and the night's claims, so its cost stays flat as history grows. Volume grows the reader bill linearly and nothing else.

## Not built, by choice

The brief asked for a scoped prototype, so these are designed and drawn (`deck/png/slide-7.png`), not built:

- **PII scrub before the model.** A pass over transcripts and comments before the readers see them, so names, emails and phone numbers never reach a prompt or a log. The mock data here is already redacted.
- **Live connectors.** Read-only Gong and Salesforce connectors replacing the two mock loaders, with credentials scoped to transcripts and cases.
- **Evals.** A golden set of claims that must appear and decoys that must not, run after every night and diffed week over week to catch drift.
- **Approve gate.** A person approves before any theme is filed into a backlog. The agents never write to a system of record.

## Layout

```
run.py            the nightly pipeline          agents/*.md   the four prompts
ask.py            the ask agent                 library/      claims, themes, state (committed by run.py)
hosting/          Lambda handler, deploy script ui/           index.html and the generated data.js
config.json       model tiers and weights       data/         mock Gong and Salesforce, API shape
tests/            seven small checks            deck/         the presentation
```
