import json, os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import run

TEXT = "The renewal statement drops the balance carried over from last period."
DOC = {"source": "gong", "day": "2026-09-08", "hidden": set(),
       "units": {("4521", 100, 900): {"text": TEXT, "side": "client", "speaker": "Rhonda Calloway",
                                      "day": "2026-09-08", "occurred_at": "2026-09-08T15:12:15Z"}}}
CLAIM = {"type": "bug", "topic": "renewal balance", "quote": TEXT[4:40], "speaker": "Rhonda Calloway",
         "locator": {"call_id": "1", "speaker_id": "4521", "start_ms": 100, "end_ms": 900}}


def test_exact_quote_passes():
    assert run.verify(dict(CLAIM), DOC) is None


def test_one_character_change_fails():
    bad = dict(CLAIM, quote=CLAIM["quote"].replace("renewal", "Renewal"))
    assert run.verify(bad, DOC) == "quote not found in cited turn"


def test_bad_locator_and_bad_type_are_caught():
    assert run.verify(dict(CLAIM, locator={"call_id": "1", "speaker_id": "9", "start_ms": 100, "end_ms": 900}),
                      DOC) == "unknown speaker"
    assert run.verify(dict(CLAIM, type="churn"), DOC) == "malformed"


def test_score_matches_the_contract():
    claims = {"c-1": {"id": "c-1", "account_id": "ACC-0001", "account_type": "customer", "arr": 340000},
              "c-2": {"id": "c-2", "account_id": "ACC-0003", "account_type": "prospect", "arr": 154000}}
    theme = {"id": "THEME-0001", "type": "bug", "claim_ids": ["c-1", "c-2"], "last_seen": "2026-09-08"}
    run.score_theme(theme, claims, {"ACC-0001": 3, "ACC-0003": 1}, "2026-09-11")
    assert theme["accounts"] == {"customer": 1, "prospect": 1} and theme["open_cases"] == 4
    assert theme["score_parts"] == {"accounts": 15.0, "value": 17.0, "cases": 20.0, "recency": 11.8, "bug": 10.0}
    assert theme["score"] == 74


def test_decisions_apply_as_append_or_open():
    claims = [{"id": "c-1", "type": "bug", "topic": "a"}, {"id": "c-2", "type": "feature", "topic": "b"}]
    themes = {"THEME-0001": {"id": "THEME-0001", "title": "Renewal totals", "type": "bug", "summary": "",
                             "claim_ids": [], "first_seen": "2026-09-08", "last_seen": "2026-09-08", "log": []}}
    state = {"days": ["2026-09-08"], "next_theme": 2}
    out = {"decisions": [{"claim_id": "c-1", "action": "append", "theme_id": "THEME-0001", "why": "same ask"},
                         {"claim_id": "c-2", "action": "open", "theme_id": None, "title": "Bulk export", "why": "new"}],
           "summaries": {"THEME-0001": "Updated.", "Bulk export": "Fresh."}}
    appended, opened = run.apply_decisions(out, claims, themes, state, "2026-09-09")
    assert (appended, opened) == (1, 1) and state["next_theme"] == 3
    assert themes["THEME-0001"]["claim_ids"] == ["c-1"] and themes["THEME-0001"]["summary"] == "Updated."
    assert themes["THEME-0002"]["title"] == "Bulk export" and themes["THEME-0002"]["summary"] == "Fresh."
    assert themes["THEME-0002"]["log"][0]["action"] == "open"


def test_a_known_day_is_skipped(tmp_path, monkeypatch, capsys):
    (tmp_path / "library").mkdir()
    (tmp_path / "library" / "state.json").write_text(json.dumps({"days": ["2026-09-08"], "next_theme": 1}))
    monkeypatch.setattr(run, "ROOT", str(tmp_path))
    monkeypatch.setattr(sys, "argv", ["run.py", "--day", "2026-09-08", "--no-commit"])
    run.main()
    assert "already in state.json" in capsys.readouterr().out


def test_parse_json_strips_a_code_fence():
    assert run.parse_json('```json\n{"claims": []}\n```') == {"claims": []}
    assert run.parse_json("not json at all") is None


def test_unfiled_claims_are_sent_back_to_the_editor():
    themes = {"THEME-0001": {"claim_ids": ["c-1"]}}
    known = {"c-1": {"id": "c-1"}, "c-2": {"id": "c-2"}}
    assert [c["id"] for c in run.unfiled(themes, known)] == ["c-2"]
