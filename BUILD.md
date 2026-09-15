# BUILD.md: instructions for the agent building the prototype

You are building a small, working prototype called **Feature / Bug Requests**: a prioritized digest for a product team, built from Gong call transcripts and Salesforce support cases. Read this whole file and `CONTRACT.md` before writing anything. The deck in `deck/` is the spec. The pictures in `deck/png/slide-4.png` (whole system), `slide-5.png` (agents), `slide-6.png` (ask) and `slide-7.png` (what is not built) are the contract. Build exactly what they show, nothing more.

## 0. The two rules that override everything else

**Rule 1: tiny.** The whole repository, excluding mock data and the committed library output, stays under **1,000 lines** of code, prompts, HTML and docs combined. Target 600. A previous build of this same brief ran to 20,000 lines and 531 tests and was rejected for it. If you find yourself adding a schema registry, a plugin system, a retry framework, a second repo, an MCP server, a corpus generator or a test file longer than the code it tests, stop and delete it. Fewer files, fewer lines, fewer concepts. When two designs work, pick the one a reader understands in one sitting.

**Rule 2: the code never says who wrote it.** No mention anywhere in the repository that an AI, an assistant, an agent, or any model *wrote or generated* this code. Concretely, none of the following may exist anywhere in the repo, including comments, commit messages, docs, file names and metadata:

- a `.claude/` directory, `CLAUDE.md`, `.cursor/`, `.aider*`, or any assistant config
- the strings "Claude Code", "Generated with", "Co-Authored-By", "AI-generated", "as an AI", "I am an AI", "Anthropic" in prose
- prompt files that describe themselves as "Claude artifacts" or "Claude skills"
- commit trailers of any kind; commit messages are one plain line

The **only** place a model name appears is `config.json`, because the API needs it. The `anthropic` Python package name in `requirements.txt` and the import line are unavoidable and fine. Everything else refers to "the model", "the reader", "the editor". Before you finish, run this and it must print nothing:

```
grep -rniE "claude code|generated with|co-authored|ai-generated|as an ai|\.claude|CLAUDE\.md" --exclude-dir=.git --exclude-dir=data --exclude-dir=deck --exclude-dir=node_modules . ; grep -rli "claude" --exclude-dir=.git --exclude-dir=data --exclude-dir=deck --exclude-dir=node_modules . | grep -v '^./config.json$'
```

## 1. What it is, in one paragraph

One job runs every night. Two reader agents, one per source, each read one document (a Gong call or a Salesforce case thread) and return a structured list of claims: what the customer asked for, quoted verbatim, with the exact locator (call id plus turn start, or case id plus comment id). Code verifies every quote is an exact substring of the cited source before anything is stored. Verified claims are appended to `library/claims/`. Then, in the same run, the editor agent reads the existing theme index first, then the night's new claims, and decides per claim whether to append to an existing theme or open a new one, with one line of reasoning. Code applies those decisions to `library/themes/`, scores and ranks the themes, regenerates the page's data file from `themes/`, and commits. `themes/` is the single source of truth: the digest UI and the ask agent both read it and nothing else, so they can never disagree. That is the whole system.

## 2. Where to start: what to borrow and what to leave

The previous build lives at `~/momentive-bi-digest/bi-theme-digest-agent/`. It is **read-only reference**. Do not import, copy, or adapt its Python. Borrow exactly three things:

1. **Mock data.** Copy `data/mock/gong/calls/*.json` to `data/gong/` and `data/mock/salesforce/cases/*.json` to `data/salesforce/`. Also copy `data/mock/accounts.json` to `data/accounts.json` (tier, ARR, customer versus prospect) and the six decoy files under `data/mock/traps/` into the same two folders (they are the tests for dedupe and classification: a prospect who is not a customer, two customers describing one issue in different words, an internal comment). Drop `index.json`, `seed_spec.yaml`, `pii_names.json`. Keep `users.json` (comment author names). This copy is already done and committed. The files are in the real Gong and Salesforce API response shapes; keep them that way and say so in the README: swapping the mock loader for the real connector is one function.
2. **The two reader prompts** at `src/digest/agents/readers/gong_reader.prompt.md` and `sfdc_reader.prompt.md`. Read them once, then rewrite each to under 40 lines. Keep: recall first, client turns only, verbatim rules (one turn, contiguous, 8 to 60 words, exact characters), the locator rule, one claim per point, quote the first fullest statement. Change: claim type is now only `bug` or `feature`. Drop churn, pricing, praise, integration, importance, product_area. Drop the YAML front matter.
3. **The old digest as a quality bar.** Read `~/momentive-bi-digest/bi-theme-digest-store/digests/2026-W37.md` once. Your theme summaries and the page should read that well, with less machinery behind it.

Leave everything else. No MCP servers, no schema JSON files, no PII scrubber, no eval harness, no deck generator, no second repository.

## 3. Repository layout (this is the complete list)

```
feature-bug-requests/
  README.md            what it is, how to run, production context, cost. Under 120 lines.
  BUILD.md             this file. Deleted when the build is done.
  CONTRACT.md          the exact file shapes everyone builds against. Deleted when the build is done.
  config.json          three model ids and the tier weights. The only file that names a model.
  requirements.txt     anthropic, pytest. Nothing else.
  run.py               the pipeline: `python run.py --day 2026-09-08` (readers, verify, editor, rank, regenerate, commit)
  ask.py               `python ask.py "why does the renewal credit issue matter"`
  agents/
    call_reader.md     prompt, under 40 lines
    case_reader.md     prompt, under 40 lines
    editor.md          prompt, under 40 lines
    ask.md             prompt, under 20 lines
  data/
    accounts.json      copied
    users.json         copied
    gong/*.json        copied
    salesforce/*.json  copied
  library/             the store. Committed. Written only by run.py.
    claims/YYYY-MM-DD.jsonl   one verified claim per line; raw evidence, never edited after
    claims/rejected.jsonl     quotes that failed verification, with the reason
    themes/THEME-0001.json    id, title, type, summary, score, score_parts, claim_ids, first_seen, last_seen
    themes/index.md           one line per theme; what the editor reads first
    state.json                days already ingested
  No digests folder. The digest is themes/ rendered; see section 5.
  ui/
    index.html         the digest page. One file. Reads ui/data.js. Opens from disk.
    data.js            `window.DIGEST = {...}` regenerated from library/themes/ on every run. A view, not a source. Never edited by hand.
  tests/test_run.py    under 80 lines, under 8 tests
  deck/                already there. Do not touch.
```

Line budget per file: `run.py` under 300, `ask.py` under 60, `ui/index.html` under 250, each prompt under 40, README under 120. Print `wc -l` of every non-data file in your final report.

## 4. The agents, precisely

All calls go through one small function in `run.py`: `call_model(tier, system_prompt, user_content) -> str`. `config.json` maps `reader`, `editor`, `ask` to model ids. Application code names a tier, never a model. Use the current cheap model for `reader` and the current frontier model for `editor` and `ask`; verify the exact ids against the API docs before you write them down.

**Call reader and case reader.** Input: one document, rendered as plain text with a locator on every turn or comment. Output: JSON only, `{"claims": [{"type": "bug|feature", "quote": "...", "topic": "...", "account": "...", "speaker": "...", "locator": {...}}]}`. Gong locator is `{"call_id", "speaker_id", "start_ms", "end_ms"}`. Salesforce locator is `{"case_id", "comment_id"}`. Parse with `json.loads`. Validate required keys in code. A malformed response is logged and dropped, never patched.

**Verify, in code, not by the model.** For each claim, load the cited turn or comment and assert `claim["quote"] in source_text`. Failing claims go to `library/claims/rejected.jsonl` with a reason and never enter the store. This check is the traceability guarantee and the only reason a PM can trust the page. Say that in the README in one sentence.

**Enrich, in code.** Attach `account_type` (customer or prospect), `tier` and `arr` from `data/accounts.json`. Count open cases per account from the Salesforce files.

**Editor.** Runs every night, in the same job, after the readers. Input, in this order: the contents of `library/themes/index.md` (existing themes, one line each), then the night's verified claims from `library/claims/`. Output: JSON only, `{"decisions": [{"claim_id": "...", "action": "append|open", "theme_id": "THEME-0002" | null, "title": "..." | null, "why": "one sentence"}], "summaries": {"THEME-0002": "two plain sentences a PM can read"}}`. The prompt says: read the index first; append when a claim is the same underlying ask in different words; open only when nothing fits; one line of why per decision. The editor has no tools and no write access. Code applies the decisions to `library/themes/`.

**Score, in code.** `score = 30 * min(distinct_accounts, 4) / 4 + 25 * min(max_arr, 500000) / 500000 + 20 * min(open_cases, 4) / 4 + 15 * recency + 10 * (type == bug)`, weights in `config.json`. Print the arithmetic under each theme in the digest so the ranking is checkable.

**Ask.** `ask.py` loads every theme and every claim into the prompt (the library is small; say so), plus the question, and answers with the quote and locator for anything it asserts. If the library does not support an answer it says so. It never reads `data/`.

**Scheduling.** One crontab line in the README: `python run.py --day yesterday` at 06:00. Nothing else. There is no weekly step; the ranked list is always current, and a weekly email is just a link to the page.

## 5. The UI

One HTML file. Loads `ui/data.js` with a `<script>` tag so it opens from disk with no server. Shows the ranked list from `deck/png/slide-3.png`: rank, theme title, type pill (bug red, feature purple), accounts count split customer and prospect, score. Three filters at the top: type, customer or prospect, last 7 or 30 or all days. Clicking a row expands it to show the summary, the score arithmetic, and every claim as a quote with its account and locator. Plain CSS, no framework, no build step, no external requests. Light mode only.

## 6. Run it, commit it, measure it

1. `python run.py --day D` for each day that has mock data, in order. Each run appends claims, files them into themes, re-ranks, regenerates `ui/data.js`, updates `state.json`, and makes **one git commit** with a message like `2026-09-08: 9 sources, 11 claims, 0 rejected, 3 themes appended, 2 opened`. Re-running a day already in `state.json` does nothing and says so.
2. After the last day, show in the commit history and in the README that at least one theme was **appended to** across days, not duplicated. That is the dedupe proof.
3. Record real numbers from the runs in the README: sources read, claims verified, claims rejected, themes opened, themes appended, input and output tokens, cost in USD for one nightly run, and the running total.
4. `pytest`: verify passes on an exact substring and fails on a one-character change; scoring arithmetic; a stubbed editor decision applies as append versus open; a day already in `state.json` is skipped.

## 7. The README, in this order, under 120 lines

1. What it is (three sentences) and how to open the digest (`open ui/index.html`).
2. How to run it (one command, one cron line, `python ask.py "..."`). Needs an API key; the committed `library/` and `ui/` are the demo, so a reviewer can read everything without running anything.
3. The picture from `deck/png/slide-4.png`, embedded.
4. The traceability guarantee, one paragraph, with one worked example: a digest sentence, its claim id, the call id and start second, and the exact source sentence.
5. How it gathers its own context in production, one short list: one nightly job, pulling only days not yet in `state.json`; the mock loader replaced by read-only connectors for Gong and Salesforce; the theme index as what the editor reads first; `themes/` as the one source every consumer reads; commits as the audit trail; hosting behind the platform's own APIs, with one sentence on when Bedrock makes sense (data residency, IAM-native identity, private networking, consolidated billing) and which this prototype assumes (the API directly).
6. Cost and KPIs, one small table: cost per nightly run, claims per run, themes open, themes appended versus opened, and the line that routing extraction to the cheap tier keeps the bill flat as volume grows.
7. Not built, by choice: PII scrub before the model, live connectors, a golden-set eval, an approve gate before filing to a backlog. One line each on what it would be and where it snaps on (`deck/png/slide-7.png`).

Voice: first person, plain sentences, no marketing. No em dashes or en dashes anywhere. Write "Momentive Software". Never name any other company's customers.

## 8. Process

- Work only inside `~/feature-bug-requests/`. `git init` here if not already a repo. Commit as you go with one-line messages. Do not push; the owner pushes.
- Use the `anthropic` Python SDK directly. No agent framework, no orchestration library.
- If the API key is missing, stop and say so. Do not fake responses.
- When done, report: the line counts, the run numbers from section 6, the output of the grep in Rule 2 (must be empty), and anything you cut and why.
