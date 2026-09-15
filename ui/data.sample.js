// Development sample only. run.py regenerates ui/data.js with the real thing in exactly this shape.
window.DIGEST = {
  "generated": "2026-09-25",
  "days": ["2026-09-08","2026-09-09","2026-09-10","2026-09-11","2026-09-14","2026-09-15","2026-09-16","2026-09-17","2026-09-18","2026-09-21","2026-09-22","2026-09-23","2026-09-24","2026-09-25"],
  "themes": [
    {"id":"THEME-0001","title":"Renewal invoices ignore credits and mid-year upgrades","type":"bug",
     "summary":"Great Lakes Museum Alliance says every renewal statement is missing the balance carried over from the previous period. Prairie Land Trust Council sees the same failure from the other side: members who upgraded mid-year are billed the full annual figure again.",
     "claim_ids":["c-3f9a1c2b7d4e","c-9b0e44d1a7c2","c-77aa12bc90de"],"accounts":{"customer":2,"prospect":0},"open_cases":3,
     "score":80,"score_parts":{"accounts":15.0,"value":24.7,"cases":20.0,"recency":10.7,"bug":10.0},
     "first_seen":"2026-09-08","last_seen":"2026-09-10",
     "log":[{"day":"2026-09-08","action":"open","claim_id":"c-3f9a1c2b7d4e","why":"Nothing in the index covers renewal billing arithmetic."},
            {"day":"2026-09-10","action":"append","claim_id":"c-77aa12bc90de","why":"Different words, same failure: what the member already paid never reaches the amount billed."}],
     "claims":[
       {"id":"c-3f9a1c2b7d4e","day":"2026-09-08","source":"gong","type":"bug","topic":"renewal statements drop the carried-over balance","quote":"Every renewal statement we send out is missing the balance that carried over from the previous period, so the invoice total reads far higher than it should.","account_id":"ACC-0001","account":"Great Lakes Museum Alliance","account_type":"customer","tier":"Enterprise","arr":340000,"speaker":"Rhonda Calloway","locator":{"call_id":"7782934451002","speaker_id":"4521","start_ms":663288,"end_ms":722760},"occurred_at":"2026-09-08T15:12:15Z"},
       {"id":"c-9b0e44d1a7c2","day":"2026-09-09","source":"salesforce","type":"bug","topic":"renewal invoice missing partial-year credit line","quote":"Our renewal invoice keeps landing without a line for the credit we are owed from the partial year adjustment, and finance ends up chasing it every single cycle.","account_id":"ACC-0001","account":"Great Lakes Museum Alliance","account_type":"customer","tier":"Enterprise","arr":340000,"speaker":"Naomi Castellanos","locator":{"case_id":"500000000000000001","comment_id":"00a000000000000001"},"occurred_at":"2026-09-09T14:10:51Z"},
       {"id":"c-77aa12bc90de","day":"2026-09-10","source":"salesforce","type":"bug","topic":"mid-year upgrades billed at full annual rate","quote":"Members who upgraded partway through the year are billed the whole annual figure again with nothing knocked off, and we end up correcting each invoice by hand.","account_id":"ACC-0003","account":"Prairie Land Trust Council","account_type":"customer","tier":"Professional","arr":154000,"speaker":"Marla Hendricks","locator":{"case_id":"5008W00002aQpLrQAK","comment_id":"00a8W00000XfT2mQAF"},"occurred_at":"2026-09-10T13:58:41Z"}
     ]},
    {"id":"THEME-0002","title":"Report exports stop silently above ten thousand rows","type":"bug",
     "summary":"Two customers see exports cut off at the bottom once a report passes about ten thousand rows, with no warning that data is missing.",
     "claim_ids":["c-147e1313dfcd","c-76c56a349aad"],"accounts":{"customer":2,"prospect":0},"open_cases":2,
     "score":75,"score_parts":{"accounts":15.0,"value":24.7,"cases":10.0,"recency":15.0,"bug":10.0},
     "first_seen":"2026-09-11","last_seen":"2026-09-25",
     "log":[{"day":"2026-09-11","action":"open","claim_id":"c-147e1313dfcd","why":"No existing theme about export size limits."}],
     "claims":[
       {"id":"c-147e1313dfcd","day":"2026-09-11","source":"gong","type":"bug","topic":"exports truncate above 10k rows","quote":"Any report we try to export once membership crosses about ten thousand rows just cuts off partway through instead of finishing the file.","account_id":"ACC-0001","account":"Great Lakes Museum Alliance","account_type":"customer","tier":"Enterprise","arr":340000,"speaker":"Naomi Castellanos","locator":{"call_id":"7782934452010","speaker_id":"c-01","start_ms":208000,"end_ms":231400},"occurred_at":"2026-09-11T15:00:00Z"},
       {"id":"c-76c56a349aad","day":"2026-09-25","source":"gong","type":"bug","topic":"exports come back cut off","quote":"Every export we run over about ten thousand rows comes back cut off at the bottom and nobody is told that it happened.","account_id":"ACC-0004","account":"Copper Ridge Youth Foundation","account_type":"customer","tier":"Professional","arr":98000,"speaker":"Marisol Quintero","locator":{"call_id":"7782934451119","speaker_id":"c-02","start_ms":406000,"end_ms":428900},"occurred_at":"2026-09-25T16:00:00Z"}
     ]},
    {"id":"THEME-0003","title":"Offline event check-in","type":"feature",
     "summary":"One customer and one prospect want check-in to keep working when the venue has no connectivity.",
     "claim_ids":["c-aa01","c-aa02"],"accounts":{"customer":1,"prospect":1},"open_cases":0,
     "score":41,"score_parts":{"accounts":15.0,"value":17.0,"cases":0.0,"recency":9.6,"bug":0.0},
     "first_seen":"2026-09-15","last_seen":"2026-09-20",
     "log":[{"day":"2026-09-15","action":"open","claim_id":"c-aa01","why":"New ask."}],
     "claims":[
       {"id":"c-aa01","day":"2026-09-15","source":"gong","type":"feature","topic":"offline check-in","quote":"We need check-in to keep working when the venue wifi drops, because it always drops.","account_id":"ACC-0004","account":"Copper Ridge Youth Foundation","account_type":"customer","tier":"Professional","arr":98000,"speaker":"Marisol Quintero","locator":{"call_id":"7782934451207","speaker_id":"c-02","start_ms":120000,"end_ms":131000},"occurred_at":"2026-09-15T16:00:00Z"},
       {"id":"c-aa02","day":"2026-09-20","source":"gong","type":"feature","topic":"attendee kiosk without connectivity","quote":"The attendee kiosk has to work with no connection at all or our volunteers will go back to paper.","account_id":"ACC-0008","account":"Harbor Arts Council","account_type":"prospect","tier":null,"arr":0,"speaker":"Devon Park","locator":{"call_id":"7782934451311","speaker_id":"c-03","start_ms":90000,"end_ms":101000},"occurred_at":"2026-09-20T16:00:00Z"}
     ]},
    {"id":"THEME-0004","title":"SCORM import for the LMS","type":"feature",
     "summary":"A prospect evaluating the LMS needs to import existing SCORM packages.",
     "claim_ids":["c-bb01"],"accounts":{"customer":0,"prospect":1},"open_cases":0,
     "score":18,"score_parts":{"accounts":7.5,"value":0.0,"cases":0.0,"recency":10.7,"bug":0.0},
     "first_seen":"2026-09-22","last_seen":"2026-09-22",
     "log":[{"day":"2026-09-22","action":"open","claim_id":"c-bb01","why":"New ask."}],
     "claims":[
       {"id":"c-bb01","day":"2026-09-22","source":"gong","type":"feature","topic":"SCORM import","quote":"We have about two hundred SCORM courses and we cannot rebuild them, so import has to be there on day one.","account_id":"ACC-0009","account":"Summit Trades Institute","account_type":"prospect","tier":null,"arr":0,"speaker":"Lena Okafor","locator":{"call_id":"7782934451404","speaker_id":"c-01","start_ms":300000,"end_ms":312000},"occurred_at":"2026-09-22T16:00:00Z"}
     ]}
  ]
};
