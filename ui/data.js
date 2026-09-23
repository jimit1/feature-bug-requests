window.DIGEST = {
 "as_of": "2026-09-25",
 "days": [
  "2026-09-08",
  "2026-09-09",
  "2026-09-10",
  "2026-09-11",
  "2026-09-14",
  "2026-09-15",
  "2026-09-16",
  "2026-09-17",
  "2026-09-18",
  "2026-09-21",
  "2026-09-22",
  "2026-09-23",
  "2026-09-24",
  "2026-09-25"
 ],
 "ask_url": "https://g3kmsu2e2ikq7cyivffqi7i6oe0unrtk.lambda-url.us-east-1.on.aws/",
 "themes": [
  {
   "id": "THEME-0005",
   "title": "Membership report export truncated at row limit",
   "type": "bug",
   "summary": "Staff pulling membership and report data cannot get a complete, reliable extract. Exports stop near ten thousand rows with no notice that the file is short, and teams are left running manual weekly downloads instead of having their own systems pull the data on a schedule.",
   "claim_ids": [
    "c-7d2a3f364428",
    "c-155dc035f7d8",
    "c-83304fe35523",
    "c-e79e344c3032",
    "c-534bacb5d43b",
    "c-a61007860db0"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-22",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-7d2a3f364428",
     "why": "Exports cutting off above a row threshold is a reporting failure with no matching theme in the index."
    },
    {
     "day": "2026-09-09",
     "action": "append",
     "claim_id": "c-155dc035f7d8",
     "why": "A donor report cut off past a few thousand rows is the same export truncation at a row limit as the existing theme, only on a different report."
    },
    {
     "day": "2026-09-11",
     "action": "append",
     "claim_id": "c-83304fe35523",
     "why": "This is the same silent row-limit truncation on large exports already tracked in the export truncation theme."
    },
    {
     "day": "2026-09-11",
     "action": "append",
     "claim_id": "c-e79e344c3032",
     "why": "A donor report cut off short of the full record count is the same export row cap, differing only in which report noticed it."
    },
    {
     "day": "2026-09-22",
     "action": "append",
     "claim_id": "c-534bacb5d43b",
     "why": "Same failure already in the index: report exports stop at a row ceiling and give no warning that the file is incomplete."
    },
    {
     "day": "2026-09-22",
     "action": "append",
     "claim_id": "c-a61007860db0",
     "why": "Same underlying ask from the other side: manual file downloads do not get the full membership data out, and a scheduled programmatic pull is the fix for the export path."
    }
   ],
   "accounts": {
    "customer": 3,
    "prospect": 0
   },
   "open_cases": 14,
   "score_parts": {
    "accounts": 22.5,
    "value": 17.0,
    "cases": 20.0,
    "recency": 11.8,
    "bug": 10.0
   },
   "score": 81,
   "claims": [
    {
     "id": "c-7d2a3f364428",
     "day": "2026-09-08",
     "source": "gong",
     "type": "bug",
     "topic": "membership export cuts off at row limit",
     "quote": "Any report we try to export once membership crosses about ten thousand rows just cuts off partway through instead of finishing the file.",
     "account_id": "ACC-0001",
     "account": "Great Lakes Museum Alliance",
     "account_type": "customer",
     "tier": "Enterprise",
     "arr": 340000,
     "speaker": "Naomi Castellanos",
     "locator": {
      "call_id": "7782934452010",
      "speaker_id": "c-01",
      "start_ms": 208421,
      "end_ms": 271579
     },
     "occurred_at": "2026-09-08T09:04:55Z"
    },
    {
     "id": "c-155dc035f7d8",
     "day": "2026-09-09",
     "source": "gong",
     "type": "bug",
     "topic": "year end donor report row limit",
     "quote": "Our year end donor report stops short of the full list once it gets past a few thousand rows, so we are stitching multiple exports together by hand.",
     "account_id": "ACC-0006",
     "account": "Copper Ridge Youth Foundation",
     "account_type": "customer",
     "tier": "Standard",
     "arr": 18000,
     "speaker": "Denise Okonkwo",
     "locator": {
      "call_id": "7782934452011",
      "speaker_id": "c-06",
      "start_ms": 252720,
      "end_ms": 259200
     },
     "occurred_at": "2026-09-09T15:20:51Z"
    },
    {
     "id": "c-83304fe35523",
     "day": "2026-09-11",
     "source": "gong",
     "type": "bug",
     "topic": "export truncation at ten thousand rows",
     "quote": "Every export we run over about ten thousand rows comes back cut off at the bottom and nobody is told that it happened.",
     "account_id": "ACC-0006",
     "account": "Copper Ridge Youth Foundation",
     "account_type": "customer",
     "tier": "Standard",
     "arr": 18000,
     "speaker": "Marisol Quintero",
     "locator": {
      "call_id": "7782934451119",
      "speaker_id": "5066",
      "start_ms": 406214,
      "end_ms": 453060
     },
     "occurred_at": "2026-09-11T15:38:08Z"
    },
    {
     "id": "c-e79e344c3032",
     "day": "2026-09-11",
     "source": "salesforce",
     "type": "bug",
     "topic": "year end donor report row limit",
     "quote": "Our year end donor report stops at about 3,200 rows even though we have close to 5,000 donors on file.",
     "account_id": "ACC-0006",
     "account": "Copper Ridge Youth Foundation",
     "account_type": "customer",
     "tier": "Standard",
     "arr": 18000,
     "speaker": "Denise Okonkwo",
     "locator": {
      "case_id": "500000000000000007",
      "comment_id": "00a00000000000001a",
      "case_number": "00005007"
     },
     "occurred_at": "2026-09-11T15:45:55Z"
    },
    {
     "id": "c-534bacb5d43b",
     "day": "2026-09-22",
     "source": "gong",
     "type": "bug",
     "topic": "exports silently truncate past ten thousand records",
     "quote": "Once a report runs past about ten thousand records the file comes back short, and nothing on it tells us it stopped early.",
     "account_id": "ACC-0001",
     "account": "Great Lakes Museum Alliance",
     "account_type": "customer",
     "tier": "Enterprise",
     "arr": 340000,
     "speaker": "Louisa Hartmann",
     "locator": {
      "call_id": "7782934453105",
      "speaker_id": "5005",
      "start_ms": 52220,
      "end_ms": 105080
     },
     "occurred_at": "2026-09-22T09:33:04Z"
    },
    {
     "id": "c-a61007860db0",
     "day": "2026-09-22",
     "source": "salesforce",
     "type": "feature",
     "topic": "API to pull membership data on a schedule",
     "quote": "What we need is an interface our own systems can call for the membership data on a schedule, because one person downloading a file every Monday morning is not something we can keep doing.",
     "account_id": "ACC-0004",
     "account": "Atlantic Shipwrights Guild",
     "account_type": "customer",
     "tier": "Professional",
     "arr": 96000,
     "speaker": "Colin Bramwell",
     "locator": {
      "case_id": "50000000000000001a",
      "comment_id": "00a000000000000068",
      "case_number": "00005026"
     },
     "occurred_at": "2026-09-22T09:34:16Z"
    }
   ]
  },
  {
   "id": "THEME-0006",
   "title": "Duplicate journal entries in general ledger sync",
   "type": "bug",
   "summary": "Finance staff at multiple associations find the same journal entries posted twice into their general ledger after a sync, including month end closings that came through in duplicate on several occasions. Treasurers reverse the extra copies by hand, so the ledger is only correct after manual cleanup.",
   "claim_ids": [
    "c-9e53583c6513",
    "c-5c26d1b4bb94",
    "c-19a349819453"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-24",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-9e53583c6513",
     "why": "Double-posted journal entries in the accounting sync are distinct from invoice and reporting issues and open a new theme."
    },
    {
     "day": "2026-09-09",
     "action": "append",
     "claim_id": "c-5c26d1b4bb94",
     "why": "Transactions appearing twice in the ledger after a sync run is the duplicate journal entry problem the existing theme covers."
    },
    {
     "day": "2026-09-24",
     "action": "append",
     "claim_id": "c-19a349819453",
     "why": "Month end posting arriving twice in the ledger is the same duplicate journal entry failure in the accounting sync already tracked."
    }
   ],
   "accounts": {
    "customer": 3,
    "prospect": 0
   },
   "open_cases": 7,
   "score_parts": {
    "accounts": 22.5,
    "value": 7.7,
    "cases": 20.0,
    "recency": 13.9,
    "bug": 10.0
   },
   "score": 74,
   "claims": [
    {
     "id": "c-9e53583c6513",
     "day": "2026-09-08",
     "source": "gong",
     "type": "bug",
     "topic": "duplicate journal entries in general ledger sync",
     "quote": "The general ledger sync has posted the same journal entry twice on more than one closing, and our bookkeeper has to go back and reverse the duplicate by hand.",
     "account_id": "ACC-0003",
     "account": "Prairie Land Trust Council",
     "account_type": "customer",
     "tier": "Professional",
     "arr": 154000,
     "speaker": "Miguel Ferreira",
     "locator": {
      "call_id": "7782934452015",
      "speaker_id": "c-03",
      "start_ms": 478615,
      "end_ms": 486462
     },
     "occurred_at": "2026-09-08T09:08:48Z"
    },
    {
     "id": "c-5c26d1b4bb94",
     "day": "2026-09-09",
     "source": "salesforce",
     "type": "bug",
     "topic": "duplicate transactions in ledger after sync",
     "quote": "Every few weeks a batch of transactions shows up twice in the ledger after the sync runs, and finance has to hunt down which one to remove.",
     "account_id": "ACC-0005",
     "account": "Sunbelt Literacy Network",
     "account_type": "customer",
     "tier": "Standard",
     "arr": 41000,
     "speaker": "Yolanda Pruitt",
     "locator": {
      "case_id": "50000000000000000a",
      "comment_id": "00a000000000000026",
      "case_number": "00005010"
     },
     "occurred_at": "2026-09-09T11:45:46Z"
    },
    {
     "id": "c-19a349819453",
     "day": "2026-09-24",
     "source": "gong",
     "type": "bug",
     "topic": "month end posting duplicates in ledger",
     "quote": "The month end posting has come through twice into our ledger on three closings since the spring, and our treasurer reverses the copy by hand each time.",
     "account_id": "ACC-0010",
     "account": "Ozark Valley Arts Council",
     "account_type": "customer",
     "tier": "Professional",
     "arr": 128000,
     "speaker": "Rosalind Achterberg",
     "locator": {
      "call_id": "7782934453107",
      "speaker_id": "5207",
      "start_ms": 93870,
      "end_ms": 153880
     },
     "occurred_at": "2026-09-24T10:04:04Z"
    }
   ]
  },
  {
   "id": "THEME-0008",
   "title": "Pledge reminder schedule ignores donor contact preferences",
   "type": "bug",
   "summary": "Pledge reminders go out to donors who have told the organization in writing how often they want to be contacted, including donors who asked for once a year only. The reminder schedule does not read stored contact preferences, so staff learn about the breach from the donors themselves.",
   "claim_ids": [
    "c-5d3a978f29d2",
    "c-5b5f6e38062c",
    "c-7a9d32ef25ab",
    "c-f9dffedd9836"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-17",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-5d3a978f29d2",
     "why": "Fundraising reminders overriding stored donor preferences is a separate ask from renewal notice delivery and opens its own theme."
    },
    {
     "day": "2026-09-09",
     "action": "append",
     "claim_id": "c-5b5f6e38062c",
     "why": "Pledge reminders emailed to donors who asked for paper only is the same failure as the existing theme about reminders ignoring donor contact preferences."
    },
    {
     "day": "2026-09-09",
     "action": "append",
     "claim_id": "c-7a9d32ef25ab",
     "why": "Mail-only donors still receiving emailed pledge reminders is the same preference being ignored that the existing theme describes."
    },
    {
     "day": "2026-09-17",
     "action": "append",
     "claim_id": "c-f9dffedd9836",
     "why": "Same failure already in the index: pledge reminders go out to donors whose stated contact frequency preference says not to."
    }
   ],
   "accounts": {
    "customer": 3,
    "prospect": 0
   },
   "open_cases": 10,
   "score_parts": {
    "accounts": 22.5,
    "value": 13.4,
    "cases": 20.0,
    "recency": 6.4,
    "bug": 10.0
   },
   "score": 72,
   "claims": [
    {
     "id": "c-5d3a978f29d2",
     "day": "2026-09-08",
     "source": "gong",
     "type": "bug",
     "topic": "pledge reminders ignoring donor preference",
     "quote": "Pledge reminders keep going out on the standard schedule even for donors who told us they only want a single reminder before the campaign closes.",
     "account_id": "ACC-0002",
     "account": "Cascadia Nurses Association",
     "account_type": "customer",
     "tier": "Enterprise",
     "arr": 268000,
     "speaker": "Renee Okafor",
     "locator": {
      "call_id": "7782934452019",
      "speaker_id": "c-02",
      "start_ms": 313354,
      "end_ms": 319749
     },
     "occurred_at": "2026-09-08T12:06:21Z"
    },
    {
     "id": "c-5b5f6e38062c",
     "day": "2026-09-09",
     "source": "gong",
     "type": "bug",
     "topic": "pledge reminders ignore paper-only preference",
     "quote": "Our pledge reminders still go out by email to donors who told us twice that they only want paper, and there is no way to hold them back.",
     "account_id": "ACC-0005",
     "account": "Sunbelt Literacy Network",
     "account_type": "customer",
     "tier": "Standard",
     "arr": 41000,
     "speaker": "Yvette Bramhall",
     "locator": {
      "call_id": "7782934451404",
      "speaker_id": "4955",
      "start_ms": 449706,
      "end_ms": 486168
     },
     "occurred_at": "2026-09-09T14:08:59Z"
    },
    {
     "id": "c-7a9d32ef25ab",
     "day": "2026-09-09",
     "source": "salesforce",
     "type": "bug",
     "topic": "pledge reminders sent to opted-out mail-only donors",
     "quote": "We have donors who asked to be reminded by mail only, and the system still emails them pledge reminders on top of that.",
     "account_id": "ACC-0005",
     "account": "Sunbelt Literacy Network",
     "account_type": "customer",
     "tier": "Standard",
     "arr": 41000,
     "speaker": "Yolanda Pruitt",
     "locator": {
      "case_id": "500000000000000011",
      "comment_id": "00a000000000000042",
      "case_number": "00005017"
     },
     "occurred_at": "2026-09-09T09:45:54Z"
    },
    {
     "id": "c-f9dffedd9836",
     "day": "2026-09-17",
     "source": "salesforce",
     "type": "bug",
     "topic": "pledge reminders sent to donors who opted out",
     "quote": "two of the donors on that list also told us in writing that they only want to hear from us once a year, and the pledge reminders went out to them anyway in the spring.",
     "account_id": "ACC-0006",
     "account": "Copper Ridge Youth Foundation",
     "account_type": "customer",
     "tier": "Standard",
     "arr": 18000,
     "speaker": "Denise Okonkwo",
     "locator": {
      "case_id": "500000000000000017",
      "comment_id": "00a00000000000005e",
      "case_number": "00005023"
     },
     "occurred_at": "2026-09-17T13:40:28Z"
    }
   ]
  },
  {
   "id": "THEME-0003",
   "title": "Offline event check-in with later sync",
   "type": "feature",
   "summary": "Event staff and volunteers need to check attendees in away from a fixed kiosk and a dependable network, at venues such as school gyms where connectivity drops or no hardware travels. They want check-in to run on the devices they carry and to sync the records once a connection returns.",
   "claim_ids": [
    "c-6fdcefc76dcd",
    "c-b58dd0db5d66",
    "c-dd21af62c2f6",
    "c-5814ec6d0a27",
    "c-9e3ed5d027fc",
    "c-396b59402c5f"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-24",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-6fdcefc76dcd",
     "why": "Check-in failing when venue wifi drops and the ask for offline capture with sync are one theme, and none exists yet."
    },
    {
     "day": "2026-09-08",
     "action": "append",
     "claim_id": "c-b58dd0db5d66",
     "why": "Same ask as the other check-in claim from the same account: keep check-in running without connectivity and sync when back online."
    },
    {
     "day": "2026-09-11",
     "action": "append",
     "claim_id": "c-dd21af62c2f6",
     "why": "A kiosk that stops signing people in when the wifi drops is the failure side of the existing offline check-in with later sync theme."
    },
    {
     "day": "2026-09-11",
     "action": "append",
     "claim_id": "c-5814ec6d0a27",
     "why": "The request for the kiosk to keep running through an outage and reconcile afterwards is exactly the offline check-in with later sync ask."
    },
    {
     "day": "2026-09-16",
     "action": "append",
     "claim_id": "c-9e3ed5d027fc",
     "why": "Asking the attendee kiosk to keep checking people in without a connection and sync on reconnect is the same ask as offline event check-in with later sync."
    },
    {
     "day": "2026-09-24",
     "action": "append",
     "claim_id": "c-396b59402c5f",
     "why": "Signing attendees in from volunteer phones at venues without kiosks or reliable connectivity is the same check-in away from fixed infrastructure ask."
    }
   ],
   "accounts": {
    "customer": 3,
    "prospect": 0
   },
   "open_cases": 12,
   "score_parts": {
    "accounts": 22.5,
    "value": 13.4,
    "cases": 20.0,
    "recency": 13.9,
    "bug": 0.0
   },
   "score": 70,
   "claims": [
    {
     "id": "c-6fdcefc76dcd",
     "day": "2026-09-08",
     "source": "gong",
     "type": "feature",
     "topic": "offline event check-in syncing",
     "quote": "When the venue wifi drops we need event check-in to keep running on the tablets and sync everything back up once we are online again. That is the single thing I would change if I could change one thing.",
     "account_id": "ACC-0002",
     "account": "Cascadia Nurses Association",
     "account_type": "customer",
     "tier": "Enterprise",
     "arr": 268000,
     "speaker": "Sylvia Marchetti",
     "locator": {
      "call_id": "7782934451118",
      "speaker_id": "4631",
      "start_ms": 754970,
      "end_ms": 790252
     },
     "occurred_at": "2026-09-08T17:44:14Z"
    },
    {
     "id": "c-b58dd0db5d66",
     "day": "2026-09-08",
     "source": "salesforce",
     "type": "feature",
     "topic": "offline event check-in with sync",
     "quote": "Our onsite team needs event check-in to keep working even when the venue wifi drops, and then sync everything back once we are online again.",
     "account_id": "ACC-0002",
     "account": "Cascadia Nurses Association",
     "account_type": "customer",
     "tier": "Enterprise",
     "arr": 268000,
     "speaker": "Renee Okafor",
     "locator": {
      "case_id": "500000000000000002",
      "comment_id": "00a000000000000005",
      "case_number": "00005002"
     },
     "occurred_at": "2026-09-08T10:25:12Z"
    },
    {
     "id": "c-dd21af62c2f6",
     "day": "2026-09-11",
     "source": "gong",
     "type": "bug",
     "topic": "attendee kiosk offline during network outage",
     "quote": "If the hall wifi cuts out halfway through the morning, the attendee kiosk has to carry on signing people in and catch up later.",
     "account_id": "ACC-0004",
     "account": "Atlantic Shipwrights Guild",
     "account_type": "customer",
     "tier": "Professional",
     "arr": 96000,
     "speaker": "Garrett Thibodeaux",
     "locator": {
      "call_id": "7782934451207",
      "speaker_id": "4744",
      "start_ms": 444042,
      "end_ms": 506400
     },
     "occurred_at": "2026-09-11T13:09:29Z"
    },
    {
     "id": "c-5814ec6d0a27",
     "day": "2026-09-11",
     "source": "gong",
     "type": "feature",
     "topic": "offline capability for attendee kiosk during network outages",
     "quote": "Our insurance requires us to show who was on site and roughly when, so the attendee kiosk staying up through an outage and reconciling afterwards is the difference between a compliant record and a gap.",
     "account_id": "ACC-0004",
     "account": "Atlantic Shipwrights Guild",
     "account_type": "customer",
     "tier": "Professional",
     "arr": 96000,
     "speaker": "Garrett Thibodeaux",
     "locator": {
      "call_id": "7782934451207",
      "speaker_id": "4744",
      "start_ms": 444042,
      "end_ms": 506400
     },
     "occurred_at": "2026-09-11T13:09:29Z"
    },
    {
     "id": "c-9e3ed5d027fc",
     "day": "2026-09-16",
     "source": "gong",
     "type": "feature",
     "topic": "attendee kiosk offline resilience",
     "quote": "The attendee kiosk has to keep taking people in even if the venue connection goes down, and catch back up automatically the moment it reconnects.",
     "account_id": "ACC-0004",
     "account": "Atlantic Shipwrights Guild",
     "account_type": "customer",
     "tier": "Professional",
     "arr": 96000,
     "speaker": "Colin Bramwell",
     "locator": {
      "call_id": "7782934452004",
      "speaker_id": "c-04",
      "start_ms": 90586,
      "end_ms": 105683
     },
     "occurred_at": "2026-09-16T12:33:17Z"
    },
    {
     "id": "c-396b59402c5f",
     "day": "2026-09-24",
     "source": "gong",
     "type": "feature",
     "topic": "mobile phone sign-in for event volunteers",
     "quote": "We want something our volunteers can run on their own phones to sign people in at the door, because the kiosks do not travel to a school gym.",
     "account_id": "ACC-0006",
     "account": "Copper Ridge Youth Foundation",
     "account_type": "customer",
     "tier": "Standard",
     "arr": 18000,
     "speaker": "Devon Hargreaves",
     "locator": {
      "call_id": "7782934453108",
      "speaker_id": "5308",
      "start_ms": 127050,
      "end_ms": 185740
     },
     "occurred_at": "2026-09-24T15:18:47Z"
    }
   ]
  },
  {
   "id": "THEME-0009",
   "title": "SCORM package import into learning module",
   "type": "feature",
   "summary": "Associations and training teams arrive with libraries of existing course packages built to SCORM, including SCORM 2004, and the learning module will not take them in. Staff must rebuild each course page by page in the editor before it will run, leaving dozens of finished courses stranded in a folder.",
   "claim_ids": [
    "c-b696c3430eb3",
    "c-c9934ceb9fc5",
    "c-0a7bb09191c1",
    "c-ac4356cf3621"
   ],
   "first_seen": "2026-09-09",
   "last_seen": "2026-09-23",
   "log": [
    {
     "day": "2026-09-09",
     "action": "open",
     "claim_id": "c-b696c3430eb3",
     "why": "No existing theme covers loading course content into the learning module, so this import ask needs a new heading."
    },
    {
     "day": "2026-09-15",
     "action": "append",
     "claim_id": "c-c9934ceb9fc5",
     "why": "The prospect is asking to bring existing SCORM course packages into the learning module and have them run as-is, which is the same import ask the theme already covers."
    },
    {
     "day": "2026-09-23",
     "action": "append",
     "claim_id": "c-0a7bb09191c1",
     "why": "The ask is for the learning module to accept existing SCORM packaging directly, which is the same import gap already open."
    },
    {
     "day": "2026-09-23",
     "action": "append",
     "claim_id": "c-ac4356cf3621",
     "why": "Rebuilding course packages page by page because the module will not run them is the failure side of the same package import ask."
    }
   ],
   "accounts": {
    "customer": 1,
    "prospect": 2
   },
   "open_cases": 5,
   "score_parts": {
    "accounts": 22.5,
    "value": 13.4,
    "cases": 20.0,
    "recency": 12.9,
    "bug": 0.0
   },
   "score": 69,
   "claims": [
    {
     "id": "c-b696c3430eb3",
     "day": "2026-09-09",
     "source": "gong",
     "type": "feature",
     "topic": "SCORM package upload without rebuilding",
     "quote": "We need to upload SCORM 1.2 and SCORM 2004 packages straight into the learning module without rebuilding every course by hand.",
     "account_id": "ACC-0007",
     "account": "Northwoods Arborists Society",
     "account_type": "prospect",
     "tier": "Prospect",
     "arr": 0,
     "speaker": "Delphine Okerlund",
     "locator": {
      "call_id": "7782934451311",
      "speaker_id": "4852",
      "start_ms": 629690,
      "end_ms": 675828
     },
     "occurred_at": "2026-09-09T16:11:17Z"
    },
    {
     "id": "c-c9934ceb9fc5",
     "day": "2026-09-15",
     "source": "gong",
     "type": "feature",
     "topic": "SCORM 1.2 course package upload and execution",
     "quote": "We need to be able to upload our existing SCORM 1.2 course packages and have them run inside the new learning module without rebuilding anything.",
     "account_id": "ACC-0007",
     "account": "Northwoods Arborists Society",
     "account_type": "prospect",
     "tier": "Prospect",
     "arr": 0,
     "speaker": "Grant Halverson",
     "locator": {
      "call_id": "7782934452006",
      "speaker_id": "c-07",
      "start_ms": 298776,
      "end_ms": 303673
     },
     "occurred_at": "2026-09-15T12:07:12Z"
    },
    {
     "id": "c-0a7bb09191c1",
     "day": "2026-09-23",
     "source": "gong",
     "type": "feature",
     "topic": "SCORM 2004 packaging support",
     "quote": "Our training team already has a library built for SCORM 2004, so whatever we move to needs to accept that packaging directly.",
     "account_id": "ACC-0008",
     "account": "Harbor City Teachers Collective",
     "account_type": "prospect",
     "tier": "Prospect",
     "arr": 0,
     "speaker": "Simone Whitfield",
     "locator": {
      "call_id": "7782934452007",
      "speaker_id": "c-08",
      "start_ms": 375273,
      "end_ms": 453455
     },
     "occurred_at": "2026-09-23T09:22:43Z"
    },
    {
     "id": "c-ac4356cf3621",
     "day": "2026-09-23",
     "source": "salesforce",
     "type": "bug",
     "topic": "course packages not accepted by learning module",
     "quote": "Every one of our existing course packages has to be rebuilt page by page in your editor before it will run, and we have forty of them sitting in a folder waiting.",
     "account_id": "ACC-0002",
     "account": "Cascadia Nurses Association",
     "account_type": "customer",
     "tier": "Enterprise",
     "arr": 268000,
     "speaker": "Renee Okafor",
     "locator": {
      "case_id": "50000000000000001b",
      "comment_id": "00a00000000000006d",
      "case_number": "00005027"
     },
     "occurred_at": "2026-09-23T10:31:48Z"
    }
   ]
  },
  {
   "id": "THEME-0001",
   "title": "Renewal invoices omit prior credits and balances",
   "type": "bug",
   "summary": "Customers with multi-chapter and multi-tier memberships receive renewal invoices that bill the full amount again without subtracting what the member already paid. Prior credits, outstanding balances and mid-year upgrade payments are all ignored, so staff have to correct totals by hand before sending.",
   "claim_ids": [
    "c-915d4dd0bc13",
    "c-deb7b49ebfd6",
    "c-a48464d88d04",
    "c-eb335972d011"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-16",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-915d4dd0bc13",
     "why": "Nothing in the empty index covers renewal totals being calculated without amounts the member already paid or carried over, so this opens that theme."
    },
    {
     "day": "2026-09-08",
     "action": "append",
     "claim_id": "c-deb7b49ebfd6",
     "why": "A missing partial-year credit line is the same failure as a missing carried-over balance: the renewal total ignores what the member already paid."
    },
    {
     "day": "2026-09-10",
     "action": "append",
     "claim_id": "c-a48464d88d04",
     "why": "The renewal total is computed without crediting what the member already paid during the year, which is the same underlying failure as the existing theme about renewal invoices omitting prior credits and balances."
    },
    {
     "day": "2026-09-16",
     "action": "append",
     "claim_id": "c-eb335972d011",
     "why": "The renewal total is computed without crediting what the chapter already paid mid-year, which is the same underlying failure as renewal invoices omitting prior credits and balances."
    }
   ],
   "accounts": {
    "customer": 2,
    "prospect": 0
   },
   "open_cases": 11,
   "score_parts": {
    "accounts": 15.0,
    "value": 17.0,
    "cases": 20.0,
    "recency": 5.4,
    "bug": 10.0
   },
   "score": 67,
   "claims": [
    {
     "id": "c-915d4dd0bc13",
     "day": "2026-09-08",
     "source": "gong",
     "type": "bug",
     "topic": "renewal statements missing carried-over balance",
     "quote": "Every renewal statement we send out is missing the balance that carried over from the previous period, so the invoice total reads far higher than it should.",
     "account_id": "ACC-0001",
     "account": "Great Lakes Museum Alliance",
     "account_type": "customer",
     "tier": "Enterprise",
     "arr": 340000,
     "speaker": "Rhonda Calloway",
     "locator": {
      "call_id": "7782934451002",
      "speaker_id": "4521",
      "start_ms": 663288,
      "end_ms": 722760
     },
     "occurred_at": "2026-09-08T15:12:15Z"
    },
    {
     "id": "c-deb7b49ebfd6",
     "day": "2026-09-08",
     "source": "gong",
     "type": "bug",
     "topic": "missing credit line on renewal invoices",
     "quote": "Our renewal invoice keeps landing without a line for the credit we are owed from the partial year adjustment, and finance ends up chasing it every single cycle.",
     "account_id": "ACC-0001",
     "account": "Great Lakes Museum Alliance",
     "account_type": "customer",
     "tier": "Enterprise",
     "arr": 340000,
     "speaker": "Naomi Castellanos",
     "locator": {
      "call_id": "7782934452001",
      "speaker_id": "c-01",
      "start_ms": 187200,
      "end_ms": 223200
     },
     "occurred_at": "2026-09-08T12:35:27Z"
    },
    {
     "id": "c-a48464d88d04",
     "day": "2026-09-10",
     "source": "salesforce",
     "type": "bug",
     "topic": "mid-year upgrade renewal billing",
     "quote": "Members who upgraded partway through the year are billed the whole annual figure again with nothing knocked off",
     "account_id": "ACC-0003",
     "account": "Prairie Land Trust Council",
     "account_type": "customer",
     "tier": "Professional",
     "arr": 154000,
     "speaker": "Unknown",
     "locator": {
      "case_id": "5008W00002aQpLrQAK",
      "comment_id": "00a8W00000XfT2mQAF",
      "case_number": "00001042"
     },
     "occurred_at": "2026-09-10T14:22:05Z"
    },
    {
     "id": "c-eb335972d011",
     "day": "2026-09-16",
     "source": "gong",
     "type": "bug",
     "topic": "renewal billing with mid-year upgrade",
     "quote": "When one of our chapters upgrades partway through the year we get billed the full renewal amount again in the fall, with nothing knocked off for what was already collected.",
     "account_id": "ACC-0003",
     "account": "Prairie Land Trust Council",
     "account_type": "customer",
     "tier": "Professional",
     "arr": 154000,
     "speaker": "Miguel Ferreira",
     "locator": {
      "call_id": "7782934452002",
      "speaker_id": "c-03",
      "start_ms": 534447,
      "end_ms": 596915
     },
     "occurred_at": "2026-09-16T10:56:14Z"
    }
   ]
  },
  {
   "id": "THEME-0011",
   "title": "Identity provider sync misses role changes",
   "type": "bug",
   "summary": "Customers who provision staff and volunteer accounts from an external identity provider find that role changes are not carried across. People who move departments or change roles keep their previous permission set for weeks until an administrator notices and fixes it manually.",
   "claim_ids": [
    "c-b35dfc0ea355",
    "c-24607f31d72f"
   ],
   "first_seen": "2026-09-16",
   "last_seen": "2026-09-16",
   "log": [
    {
     "day": "2026-09-16",
     "action": "open",
     "claim_id": "c-b35dfc0ea355",
     "why": "No theme in the index covers user provisioning or permission sync from an external identity provider, so this is a new heading."
    },
    {
     "day": "2026-09-16",
     "action": "append",
     "claim_id": "c-24607f31d72f",
     "why": "Merged from THEME-0012 by code: its title said the same thing as THEME-0011. Editor: Staff keeping prior access because the provisioning sync does not pick up a role change is the same failure opened tonight for identity provider role sync."
    }
   ],
   "accounts": {
    "customer": 2,
    "prospect": 0
   },
   "open_cases": 12,
   "score_parts": {
    "accounts": 15.0,
    "value": 17.0,
    "cases": 20.0,
    "recency": 5.4,
    "bug": 10.0
   },
   "score": 67,
   "claims": [
    {
     "id": "c-b35dfc0ea355",
     "day": "2026-09-15",
     "source": "gong",
     "type": "bug",
     "topic": "identity provider sync misses role changes",
     "quote": "When someone changes roles in our identity provider the sync misses it, and they keep the old permission set until someone catches it manually.",
     "account_id": "ACC-0001",
     "account": "Great Lakes Museum Alliance",
     "account_type": "customer",
     "tier": "Enterprise",
     "arr": 340000,
     "speaker": "Naomi Castellanos",
     "locator": {
      "call_id": "7782934452022",
      "speaker_id": "c-01",
      "start_ms": 252458,
      "end_ms": 270931
     },
     "occurred_at": "2026-09-15T09:36:53Z"
    },
    {
     "id": "c-24607f31d72f",
     "day": "2026-09-16",
     "source": "gong",
     "type": "bug",
     "topic": "provisioning sync not updating role changes",
     "quote": "Staff who move departments still show up with their prior access weeks later because the provisioning sync does not pick up the role change.",
     "account_id": "ACC-0002",
     "account": "Cascadia Nurses Association",
     "account_type": "customer",
     "tier": "Enterprise",
     "arr": 268000,
     "speaker": "Renee Okafor",
     "locator": {
      "call_id": "7782934452023",
      "speaker_id": "c-02",
      "start_ms": 284715,
      "end_ms": 295665
     },
     "occurred_at": "2026-09-16T15:36:00Z"
    }
   ]
  },
  {
   "id": "THEME-0013",
   "title": "Member directory search by location and specialty",
   "type": "feature",
   "summary": "Members ask staff to find other members by where they are and what they do, but the directory only supports searching by name. Staff end up answering these requests by hand every week because the search cannot filter by region or specialty.",
   "claim_ids": [
    "c-19324e96cdf8",
    "c-771740209506"
   ],
   "first_seen": "2026-09-17",
   "last_seen": "2026-09-24",
   "log": [
    {
     "day": "2026-09-17",
     "action": "open",
     "claim_id": "c-19324e96cdf8",
     "why": "Nothing in the index covers searching the member directory by attributes other than name."
    },
    {
     "day": "2026-09-24",
     "action": "append",
     "claim_id": "c-771740209506",
     "why": "Searching the member directory by region is the same gap as directory search by location and specialty."
    }
   ],
   "accounts": {
    "customer": 2,
    "prospect": 0
   },
   "open_cases": 8,
   "score_parts": {
    "accounts": 15.0,
    "value": 17.0,
    "cases": 20.0,
    "recency": 13.9,
    "bug": 0.0
   },
   "score": 66,
   "claims": [
    {
     "id": "c-19324e96cdf8",
     "day": "2026-09-17",
     "source": "gong",
     "type": "feature",
     "topic": "member directory search by location and craft",
     "quote": "Our members cannot look one another up by county or by the craft they work in, so the directory is only useful if you already know the person's name.",
     "account_id": "ACC-0010",
     "account": "Ozark Valley Arts Council",
     "account_type": "customer",
     "tier": "Professional",
     "arr": 128000,
     "speaker": "Alina Petrosyan",
     "locator": {
      "call_id": "7782934453101",
      "speaker_id": "4601",
      "start_ms": 236520,
      "end_ms": 300380
     },
     "occurred_at": "2026-09-17T13:06:40Z"
    },
    {
     "id": "c-771740209506",
     "day": "2026-09-24",
     "source": "salesforce",
     "type": "feature",
     "topic": "directory search by region",
     "quote": "Members ask us for other members by region almost every week and all we can offer them is a search on a name",
     "account_id": "ACC-0001",
     "account": "Great Lakes Museum Alliance",
     "account_type": "customer",
     "tier": "Enterprise",
     "arr": 340000,
     "speaker": "Naomi Castellanos",
     "locator": {
      "case_id": "50000000000000001c",
      "comment_id": "00a000000000000070",
      "case_number": "00005028"
     },
     "occurred_at": "2026-09-24T11:26:39Z"
    }
   ]
  },
  {
   "id": "THEME-0004",
   "title": "Renewal notice email deliverability",
   "type": "bug",
   "summary": "Mail the system sends on behalf of organizations is being filtered to junk, affecting both renewal notices and fundraising appeal letters, with the large free mail providers the worst case. Organizations find out by accident from a member or board member rather than from anything in the product, so they cannot tell how much mail went unseen.",
   "claim_ids": [
    "c-8fc57031470e",
    "c-c3cc9482540b",
    "c-b1bf7c6402b9"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-23",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-8fc57031470e",
     "why": "This is about renewal emails being filtered to spam rather than about invoice amounts, and no theme covers message delivery."
    },
    {
     "day": "2026-09-09",
     "action": "append",
     "claim_id": "c-c3cc9482540b",
     "why": "Renewal reminders landing in spam and members missing the notice is the deliverability failure the existing theme already tracks."
    },
    {
     "day": "2026-09-23",
     "action": "append",
     "claim_id": "c-b1bf7c6402b9",
     "why": "Fundraising appeal mail landing in junk at the large free providers is the same deliverability failure as renewal notices not reaching inboxes."
    }
   ],
   "accounts": {
    "customer": 2,
    "prospect": 0
   },
   "open_cases": 5,
   "score_parts": {
    "accounts": 15.0,
    "value": 2.0,
    "cases": 20.0,
    "recency": 12.9,
    "bug": 10.0
   },
   "score": 60,
   "claims": [
    {
     "id": "c-8fc57031470e",
     "day": "2026-09-08",
     "source": "gong",
     "type": "bug",
     "topic": "renewal notices landing in spam folder",
     "quote": "A good number of our members tell us the renewal notice never showed up, and when we check, it landed in their spam folder instead of the inbox.",
     "account_id": "ACC-0005",
     "account": "Sunbelt Literacy Network",
     "account_type": "customer",
     "tier": "Standard",
     "arr": 41000,
     "speaker": "Yolanda Pruitt",
     "locator": {
      "call_id": "7782934452008",
      "speaker_id": "c-05",
      "start_ms": 127685,
      "end_ms": 167586
     },
     "occurred_at": "2026-09-08T15:04:04Z"
    },
    {
     "id": "c-c3cc9482540b",
     "day": "2026-09-09",
     "source": "gong",
     "type": "bug",
     "topic": "renewal reminder emails flagged as spam",
     "quote": "Our renewal reminder emails are getting flagged as spam by some of the bigger providers, so members are missing the notice entirely.",
     "account_id": "ACC-0006",
     "account": "Copper Ridge Youth Foundation",
     "account_type": "customer",
     "tier": "Standard",
     "arr": 18000,
     "speaker": "Denise Okonkwo",
     "locator": {
      "call_id": "7782934452009",
      "speaker_id": "c-06",
      "start_ms": 312000,
      "end_ms": 324000
     },
     "occurred_at": "2026-09-09T13:23:01Z"
    },
    {
     "id": "c-b1bf7c6402b9",
     "day": "2026-09-23",
     "source": "gong",
     "type": "bug",
     "topic": "appeal letters landing in junk for free mail providers",
     "quote": "Our appeal letters are landing in junk for anyone on the two large free mail providers, and we only learned that because a board member mentioned it in passing.",
     "account_id": "ACC-0005",
     "account": "Sunbelt Literacy Network",
     "account_type": "customer",
     "tier": "Standard",
     "arr": 41000,
     "speaker": "Curtis Ellsworth",
     "locator": {
      "call_id": "7782934453106",
      "speaker_id": "5106",
      "start_ms": 92330,
      "end_ms": 145960
     },
     "occurred_at": "2026-09-23T13:48:41Z"
    }
   ]
  },
  {
   "id": "THEME-0010",
   "title": "Course completion data sync to member records",
   "type": "feature",
   "summary": "Course completion does not flow into the member record automatically, so staff rekey finished hours by hand. One registrar spends about three hours every week copying numbers from the learning screens into member records.",
   "claim_ids": [
    "c-299d81776e9e",
    "c-7b86c73b5e27"
   ],
   "first_seen": "2026-09-09",
   "last_seen": "2026-09-21",
   "log": [
    {
     "day": "2026-09-09",
     "action": "open",
     "claim_id": "c-299d81776e9e",
     "why": "Nothing in the index covers moving completion, score and time spent onto member records, which is a distinct ask from importing course packages."
    },
    {
     "day": "2026-09-21",
     "action": "append",
     "claim_id": "c-7b86c73b5e27",
     "why": "Same ask as the existing theme: finished course hours do not reach the member record without manual keying."
    }
   ],
   "accounts": {
    "customer": 1,
    "prospect": 1
   },
   "open_cases": 5,
   "score_parts": {
    "accounts": 15.0,
    "value": 13.4,
    "cases": 20.0,
    "recency": 10.7,
    "bug": 0.0
   },
   "score": 59,
   "claims": [
    {
     "id": "c-299d81776e9e",
     "day": "2026-09-09",
     "source": "gong",
     "type": "feature",
     "topic": "completion data to member records",
     "quote": "The hosted platform writes completion, score and time spent to a file, and our membership clerk keys those three numbers onto the member record once a week.",
     "account_id": "ACC-0007",
     "account": "Northwoods Arborists Society",
     "account_type": "prospect",
     "tier": "Prospect",
     "arr": 0,
     "speaker": "Delphine Okerlund",
     "locator": {
      "call_id": "7782934451311",
      "speaker_id": "4852",
      "start_ms": 765578,
      "end_ms": 793190
     },
     "occurred_at": "2026-09-09T16:13:33Z"
    },
    {
     "id": "c-7b86c73b5e27",
     "day": "2026-09-21",
     "source": "gong",
     "type": "feature",
     "topic": "completion data should sync to member records",
     "quote": "The second thing is the one I have raised before, so I will say it once and then stop. Completion still does not reach the member record on its own, so our registrar keys the finished hours in every Friday afternoon. It is about three hours a week for her and it is three hours of copying numbers from one screen to another.",
     "account_id": "ACC-0002",
     "account": "Cascadia Nurses Association",
     "account_type": "customer",
     "tier": "Enterprise",
     "arr": 268000,
     "speaker": "Ingrid Solheim",
     "locator": {
      "call_id": "7782934453103",
      "speaker_id": "4803",
      "start_ms": 266480,
      "end_ms": 319560
     },
     "occurred_at": "2026-09-21T14:06:21Z"
    }
   ]
  },
  {
   "id": "THEME-0007",
   "title": "Expiration warnings for postings",
   "type": "bug",
   "summary": "Customers who publish postings are not told before a posting expires, so listings drop off without anyone noticing in time to act. They want a warning sent at least a week ahead so the poster can renew or extend before the listing disappears.",
   "claim_ids": [
    "c-c44577763b5c",
    "c-096f6053d878",
    "c-d307607f309c"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-25",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-c44577763b5c",
     "why": "Postings coming down with no notice to their owner is a new area not covered by any existing theme."
    },
    {
     "day": "2026-09-18",
     "action": "append",
     "claim_id": "c-096f6053d878",
     "why": "The yard learning a listing dropped only when someone phones is the same gap as missing expiration warnings for postings."
    },
    {
     "day": "2026-09-25",
     "action": "append",
     "claim_id": "c-d307607f309c",
     "why": "The ask for a week of advance warning before a posting expires is the feature side of the existing expiration warnings for postings theme."
    }
   ],
   "accounts": {
    "customer": 1,
    "prospect": 0
   },
   "open_cases": 4,
   "score_parts": {
    "accounts": 7.5,
    "value": 4.8,
    "cases": 20.0,
    "recency": 15.0,
    "bug": 10.0
   },
   "score": 57,
   "claims": [
    {
     "id": "c-c44577763b5c",
     "day": "2026-09-08",
     "source": "gong",
     "type": "bug",
     "topic": "posting expiration without warning",
     "quote": "A posting expires and comes down with no warning to the person who placed it, so postings vanish while they still think it is live.",
     "account_id": "ACC-0004",
     "account": "Atlantic Shipwrights Guild",
     "account_type": "customer",
     "tier": "Professional",
     "arr": 96000,
     "speaker": "Colin Bramwell",
     "locator": {
      "call_id": "7782934452018",
      "speaker_id": "c-04",
      "start_ms": 220800,
      "end_ms": 225600
     },
     "occurred_at": "2026-09-08T16:20:39Z"
    },
    {
     "id": "c-096f6053d878",
     "day": "2026-09-18",
     "source": "gong",
     "type": "bug",
     "topic": "expired listings drop without notice to the posting yard",
     "quote": "Listings come down when they expire and nothing tells the yard that it happened. Nobody gets a note before a listing drops off the board, so the yard that placed it finds out only when somebody phones to ask why it disappeared.",
     "account_id": "ACC-0004",
     "account": "Atlantic Shipwrights Guild",
     "account_type": "customer",
     "tier": "Professional",
     "arr": 96000,
     "speaker": "Harriet Vandermeer",
     "locator": {
      "call_id": "7782934453102",
      "speaker_id": "4702",
      "start_ms": 139990,
      "end_ms": 193180
     },
     "occurred_at": "2026-09-18T10:33:37Z"
    },
    {
     "id": "c-d307607f309c",
     "day": "2026-09-25",
     "source": "salesforce",
     "type": "feature",
     "topic": "advance warning before posting expiry",
     "quote": "At least a week ahead would give them time to renew it before it drops.",
     "account_id": "ACC-0004",
     "account": "Atlantic Shipwrights Guild",
     "account_type": "customer",
     "tier": "Professional",
     "arr": 96000,
     "speaker": "Colin Bramwell",
     "locator": {
      "case_id": "500000000000000010",
      "comment_id": "00a000000000000040",
      "case_number": "00005016"
     },
     "occurred_at": "2026-09-25T15:05:29Z"
    }
   ]
  },
  {
   "id": "THEME-0018",
   "title": "Cross site reporting on member and non member visits",
   "type": "feature",
   "summary": "Multi site organizations cannot compare member visits against non member visits across their locations in one place. Staff have to go to each site separately and stitch the numbers together by hand to answer a question their boards ask routinely.",
   "claim_ids": [
    "c-4d4d64d27752"
   ],
   "first_seen": "2026-09-22",
   "last_seen": "2026-09-22",
   "log": [
    {
     "day": "2026-09-22",
     "action": "open",
     "claim_id": "c-4d4d64d27752",
     "why": "Nothing in the index covers rolled up visit reporting across multiple sites, which is a reporting capability gap rather than an export or sync defect."
    }
   ],
   "accounts": {
    "customer": 1,
    "prospect": 0
   },
   "open_cases": 7,
   "score_parts": {
    "accounts": 7.5,
    "value": 17.0,
    "cases": 20.0,
    "recency": 11.8,
    "bug": 0.0
   },
   "score": 56,
   "claims": [
    {
     "id": "c-4d4d64d27752",
     "day": "2026-09-22",
     "source": "gong",
     "type": "feature",
     "topic": "member versus non-member visit data by site",
     "quote": "We are being asked to show member visits against non member visits by site, and we cannot get that without going to each museum individually.",
     "account_id": "ACC-0001",
     "account": "Great Lakes Museum Alliance",
     "account_type": "customer",
     "tier": "Enterprise",
     "arr": 340000,
     "speaker": "Louisa Hartmann",
     "locator": {
      "call_id": "7782934453105",
      "speaker_id": "5005",
      "start_ms": 253390,
      "end_ms": 294850
     },
     "occurred_at": "2026-09-22T09:36:25Z"
    }
   ]
  },
  {
   "id": "THEME-0016",
   "title": "Session dates to learner calendars",
   "type": "feature",
   "summary": "Learning staff have no way to get scheduled session dates into a learner's own calendar. They paste the dates into a reminder note and rely on each learner to copy them across by hand.",
   "claim_ids": [
    "c-92d6a9487216"
   ],
   "first_seen": "2026-09-21",
   "last_seen": "2026-09-21",
   "log": [
    {
     "day": "2026-09-21",
     "action": "open",
     "claim_id": "c-92d6a9487216",
     "why": "The index covers SCORM import and completion sync back to member records, but nothing pushes scheduled session dates out to a learner's calendar."
    }
   ],
   "accounts": {
    "customer": 1,
    "prospect": 0
   },
   "open_cases": 5,
   "score_parts": {
    "accounts": 7.5,
    "value": 13.4,
    "cases": 20.0,
    "recency": 10.7,
    "bug": 0.0
   },
   "score": 52,
   "claims": [
    {
     "id": "c-92d6a9487216",
     "day": "2026-09-21",
     "source": "gong",
     "type": "feature",
     "topic": "session dates should sync to learner calendars",
     "quote": "None of the session dates land in a learner's own calendar, so we paste them into a reminder note and trust people to copy them across themselves.",
     "account_id": "ACC-0002",
     "account": "Cascadia Nurses Association",
     "account_type": "customer",
     "tier": "Enterprise",
     "arr": 268000,
     "speaker": "Ingrid Solheim",
     "locator": {
      "call_id": "7782934453103",
      "speaker_id": "4803",
      "start_ms": 140910,
      "end_ms": 202350
     },
     "occurred_at": "2026-09-21T14:04:15Z"
    }
   ]
  },
  {
   "id": "THEME-0017",
   "title": "Splitting dues payments across council and chapter",
   "type": "feature",
   "summary": "A single dues payment cannot be allocated between the parent council and the member's chapter. The bookkeeper moves the chapter share manually with a journal entry every month.",
   "claim_ids": [
    "c-418a8c8e7f16"
   ],
   "first_seen": "2026-09-21",
   "last_seen": "2026-09-21",
   "log": [
    {
     "day": "2026-09-21",
     "action": "open",
     "claim_id": "c-418a8c8e7f16",
     "why": "No theme covers allocating a single dues payment between parent and chapter entities; the ledger theme is about duplicate entries, not revenue splits."
    }
   ],
   "accounts": {
    "customer": 1,
    "prospect": 0
   },
   "open_cases": 4,
   "score_parts": {
    "accounts": 7.5,
    "value": 7.7,
    "cases": 20.0,
    "recency": 10.7,
    "bug": 0.0
   },
   "score": 46,
   "claims": [
    {
     "id": "c-418a8c8e7f16",
     "day": "2026-09-21",
     "source": "salesforce",
     "type": "feature",
     "topic": "splitting dues payments between council and chapter",
     "quote": "When a member pays their dues we have no way to split that payment between the council and the chapter they belong to, so our bookkeeper moves the chapter share across by journal entry every month.",
     "account_id": "ACC-0003",
     "account": "Prairie Land Trust Council",
     "account_type": "customer",
     "tier": "Professional",
     "arr": 154000,
     "speaker": "Miguel Ferreira",
     "locator": {
      "case_id": "500000000000000019",
      "comment_id": "00a000000000000064",
      "case_number": "00005025"
     },
     "occurred_at": "2026-09-21T09:47:10Z"
    }
   ]
  },
  {
   "id": "THEME-0002",
   "title": "Reason codes for membership tier changes",
   "type": "feature",
   "summary": "Staff who report on movement between membership tiers have no reason codes for tiers added after the code list was built, such as a family tier. They track those transitions by hand, which makes tier change reporting slow and inconsistent.",
   "claim_ids": [
    "c-16cd97e72e9e"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-08",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-16cd97e72e9e",
     "why": "This is a request for reason code coverage of newer membership tiers, which no existing theme addresses."
    }
   ],
   "accounts": {
    "customer": 1,
    "prospect": 0
   },
   "open_cases": 7,
   "score_parts": {
    "accounts": 7.5,
    "value": 17.0,
    "cases": 20.0,
    "recency": 0.0,
    "bug": 0.0
   },
   "score": 44,
   "claims": [
    {
     "id": "c-16cd97e72e9e",
     "day": "2026-09-08",
     "source": "gong",
     "type": "feature",
     "topic": "reason codes for membership tier transitions",
     "quote": "We track that split by hand at the moment, because our own reason codes were set up before the family tier existed.",
     "account_id": "ACC-0001",
     "account": "Great Lakes Museum Alliance",
     "account_type": "customer",
     "tier": "Enterprise",
     "arr": 340000,
     "speaker": "Rhonda Calloway",
     "locator": {
      "call_id": "7782934451002",
      "speaker_id": "4521",
      "start_ms": 178804,
      "end_ms": 218688
     },
     "occurred_at": "2026-09-08T15:04:10Z"
    }
   ]
  },
  {
   "id": "THEME-0019",
   "title": "Staff sign-in with existing office identity provider",
   "type": "feature",
   "summary": "Staff at member organizations keep a password for this system and nothing else, which they have to remember and reset separately. They want to sign in with the same office account they already use for the rest of their tools.",
   "claim_ids": [
    "c-91501239d30d"
   ],
   "first_seen": "2026-09-23",
   "last_seen": "2026-09-23",
   "log": [
    {
     "day": "2026-09-23",
     "action": "open",
     "claim_id": "c-91501239d30d",
     "why": "The index covers role changes failing to sync from an identity provider but nothing about letting staff sign in with their existing office account instead of a separate password."
    }
   ],
   "accounts": {
    "customer": 1,
    "prospect": 0
   },
   "open_cases": 2,
   "score_parts": {
    "accounts": 7.5,
    "value": 2.0,
    "cases": 10.0,
    "recency": 12.9,
    "bug": 0.0
   },
   "score": 32,
   "claims": [
    {
     "id": "c-91501239d30d",
     "day": "2026-09-23",
     "source": "gong",
     "type": "feature",
     "topic": "staff sign-in with single office account instead of separate password",
     "quote": "Our staff keep a separate password for this system and nothing else, and we want them signing in with the same account they use for everything else in the office.",
     "account_id": "ACC-0005",
     "account": "Sunbelt Literacy Network",
     "account_type": "customer",
     "tier": "Standard",
     "arr": 41000,
     "speaker": "Curtis Ellsworth",
     "locator": {
      "call_id": "7782934453106",
      "speaker_id": "5106",
      "start_ms": 254380,
      "end_ms": 312190
     },
     "occurred_at": "2026-09-23T13:51:23Z"
    }
   ]
  },
  {
   "id": "THEME-0014",
   "title": "Consolidated year end donor tax receipts",
   "type": "feature",
   "summary": "Nonprofit staff cannot generate one year end tax receipt for a donor who gave to several appeals. They pull three separate exports and assemble each receipt by hand in a mail merge, which is slow and easy to get wrong.",
   "claim_ids": [
    "c-8c2632e3512c"
   ],
   "first_seen": "2026-09-17",
   "last_seen": "2026-09-17",
   "log": [
    {
     "day": "2026-09-17",
     "action": "open",
     "claim_id": "c-8c2632e3512c",
     "why": "No existing theme covers aggregating a donor's gifts across appeals into one receipt."
    }
   ],
   "accounts": {
    "customer": 1,
    "prospect": 0
   },
   "open_cases": 3,
   "score_parts": {
    "accounts": 7.5,
    "value": 0.9,
    "cases": 15.0,
    "recency": 6.4,
    "bug": 0.0
   },
   "score": 30,
   "claims": [
    {
     "id": "c-8c2632e3512c",
     "day": "2026-09-17",
     "source": "salesforce",
     "type": "feature",
     "topic": "year end tax receipts for donors with multiple gifts",
     "quote": "There is no way to produce a single year end tax receipt for a donor who gave across several appeals, so we build each one in a mail merge from three separate exports.",
     "account_id": "ACC-0006",
     "account": "Copper Ridge Youth Foundation",
     "account_type": "customer",
     "tier": "Standard",
     "arr": 18000,
     "speaker": "Denise Okonkwo",
     "locator": {
      "case_id": "500000000000000017",
      "comment_id": "00a00000000000005c",
      "case_number": "00005023"
     },
     "occurred_at": "2026-09-17T09:24:50Z"
    }
   ]
  },
  {
   "id": "THEME-0015",
   "title": "Name badge printing from attendee lists",
   "type": "feature",
   "summary": "Event staff cannot print name badges directly from the attendee list. They export attendees to a spreadsheet and run them through a separate label program the night before the event, which adds manual work and risks stale or mismatched badges.",
   "claim_ids": [
    "c-f5506b29197f"
   ],
   "first_seen": "2026-09-18",
   "last_seen": "2026-09-18",
   "log": [
    {
     "day": "2026-09-18",
     "action": "open",
     "claim_id": "c-f5506b29197f",
     "why": "Nothing in the index covers producing badges or printed materials from event attendee data."
    }
   ],
   "accounts": {
    "customer": 1,
    "prospect": 0
   },
   "open_cases": 1,
   "score_parts": {
    "accounts": 7.5,
    "value": 6.4,
    "cases": 5.0,
    "recency": 7.5,
    "bug": 0.0
   },
   "score": 26,
   "claims": [
    {
     "id": "c-f5506b29197f",
     "day": "2026-09-18",
     "source": "salesforce",
     "type": "feature",
     "topic": "printing name badges from attendee list",
     "quote": "We cannot print name badges from the attendee list at all, so we export to a spreadsheet and run the whole thing through a separate label program the night before.",
     "account_id": "ACC-0010",
     "account": "Ozark Valley Arts Council",
     "account_type": "customer",
     "tier": "Professional",
     "arr": 128000,
     "speaker": "Alina Petrosyan",
     "locator": {
      "case_id": "500000000000000018",
      "comment_id": "00a000000000000060",
      "case_number": "00005024"
     },
     "occurred_at": "2026-09-18T08:31:06Z"
    }
   ]
  }
 ]
};
