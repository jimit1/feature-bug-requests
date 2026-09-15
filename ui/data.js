window.DIGEST = {
 "generated": "2026-09-11",
 "days": [
  "2026-09-08",
  "2026-09-09",
  "2026-09-10",
  "2026-09-11"
 ],
 "ask_url": "https://g3kmsu2e2ikq7cyivffqi7i6oe0unrtk.lambda-url.us-east-1.on.aws/",
 "themes": [
  {
   "id": "THEME-0001",
   "title": "Renewal invoices omitting prior credits and balances",
   "type": "bug",
   "summary": "Renewal invoices are calculated without accounting for what the member has already paid, including prior credits, outstanding balances, and mid-year tier upgrades. Members receive a bill for the full annual amount, and staff have to recalculate and correct the invoice manually.",
   "claim_ids": [
    "c-915d4dd0bc13",
    "c-deb7b49ebfd6",
    "c-a48464d88d04"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-10",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-915d4dd0bc13",
     "why": "Nothing in the index covers renewal totals that leave out what the member already paid or carried over, so this opens the theme."
    },
    {
     "day": "2026-09-08",
     "action": "append",
     "claim_id": "c-deb7b49ebfd6",
     "why": "A missing credit line for a partial year adjustment is the same renewal total defect as the missing carried-over balance, described from the finance side."
    },
    {
     "day": "2026-09-10",
     "action": "append",
     "claim_id": "c-a48464d88d04",
     "why": "Billing the full annual amount to a member who upgraded mid-year is the renewal total being computed without what the member already paid, the same ask as omitted credits and balances."
    }
   ],
   "accounts": {
    "customer": 2,
    "prospect": 0
   },
   "open_cases": 9,
   "score_parts": {
    "accounts": 15.0,
    "value": 17.0,
    "cases": 20.0,
    "recency": 13.9,
    "bug": 10.0
   },
   "score": 76,
   "claims": [
    {
     "id": "c-915d4dd0bc13",
     "day": "2026-09-08",
     "source": "gong",
     "type": "bug",
     "topic": "missing carried-over balance on renewal statements",
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
    }
   ]
  },
  {
   "id": "THEME-0005",
   "title": "Membership report export truncates at row limit",
   "type": "bug",
   "summary": "Staff exporting membership reports get a file that stops partway through once the record count passes roughly ten thousand rows. The export appears to finish but the data is incomplete, so any downstream reporting or mailing built from it is wrong.",
   "claim_ids": [
    "c-7d2a3f364428",
    "c-155dc035f7d8",
    "c-75d5cbd07ce7"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-10",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-7d2a3f364428",
     "why": "Truncated export files for large membership lists are a reporting defect with no matching theme in the index."
    },
    {
     "day": "2026-09-09",
     "action": "append",
     "claim_id": "c-155dc035f7d8",
     "why": "A donor report cut off past a few thousand rows is the same export row limit truncation, just noticed on a different report."
    },
    {
     "day": "2026-09-10",
     "action": "append",
     "claim_id": "c-75d5cbd07ce7",
     "why": "An export that stops partway once membership passes roughly ten thousand rows is the same row-limit truncation on report exports."
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
    "bug": 10.0
   },
   "score": 76,
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
     "topic": "donor report row limit",
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
     "id": "c-75d5cbd07ce7",
     "day": "2026-09-10",
     "source": "salesforce",
     "type": "bug",
     "topic": "export cuts off at 10,500 rows",
     "quote": "Any report we try to export once membership crosses about ten thousand rows just cuts off partway through instead of finishing the file.",
     "account_id": "ACC-0001",
     "account": "Great Lakes Museum Alliance",
     "account_type": "customer",
     "tier": "Enterprise",
     "arr": 340000,
     "speaker": "Naomi Castellanos",
     "locator": {
      "case_id": "500000000000000006",
      "comment_id": "00a000000000000017",
      "case_number": "00005006"
     },
     "occurred_at": "2026-09-10T16:35:02Z"
    }
   ]
  },
  {
   "id": "THEME-0008",
   "title": "Pledge reminders ignore donor contact preferences",
   "type": "bug",
   "summary": "Pledge reminders continue to send on the default schedule even when a donor has asked for fewer or different contact. Development staff have to apologize for over-contacting donors and cannot rely on the stored preferences.",
   "claim_ids": [
    "c-5d3a978f29d2",
    "c-5b5f6e38062c",
    "c-7a9d32ef25ab",
    "c-8cdbbd7323dd"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-10",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-5d3a978f29d2",
     "why": "Reminder cadence overriding a stated donor preference is a fundraising communication defect that no open theme covers."
    },
    {
     "day": "2026-09-09",
     "action": "append",
     "claim_id": "c-5b5f6e38062c",
     "why": "Donors who asked for paper only are still emailed pledge reminders, which is exactly the contact preference failure this theme tracks."
    },
    {
     "day": "2026-09-09",
     "action": "append",
     "claim_id": "c-7a9d32ef25ab",
     "why": "Mail-only donors receiving pledge reminder email is the same stated preference being ignored by the reminder run."
    },
    {
     "day": "2026-09-10",
     "action": "append",
     "claim_id": "c-8cdbbd7323dd",
     "why": "Reminders going out on the standard cadence despite a donor asking for a single reminder is the existing failure to honor donor contact preferences."
    }
   ],
   "accounts": {
    "customer": 2,
    "prospect": 0
   },
   "open_cases": 6,
   "score_parts": {
    "accounts": 15.0,
    "value": 13.4,
    "cases": 20.0,
    "recency": 13.9,
    "bug": 10.0
   },
   "score": 72,
   "claims": [
    {
     "id": "c-5d3a978f29d2",
     "day": "2026-09-08",
     "source": "gong",
     "type": "bug",
     "topic": "pledge reminders sent despite donor preference",
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
     "topic": "pledge reminders sent to opted-out donors",
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
     "id": "c-8cdbbd7323dd",
     "day": "2026-09-10",
     "source": "salesforce",
     "type": "bug",
     "topic": "reminder schedule ignores donor preference",
     "quote": "Pledge reminders keep going out on the standard schedule even for donors who told us they only want a single reminder before the campaign closes.",
     "account_id": "ACC-0002",
     "account": "Cascadia Nurses Association",
     "account_type": "customer",
     "tier": "Enterprise",
     "arr": 268000,
     "speaker": "Renee Okafor",
     "locator": {
      "case_id": "500000000000000012",
      "comment_id": "00a000000000000045",
      "case_number": "00005018"
     },
     "occurred_at": "2026-09-10T12:05:49Z"
    }
   ]
  },
  {
   "id": "THEME-0006",
   "title": "Duplicate journal entries in general ledger sync",
   "type": "bug",
   "summary": "The general ledger sync posts the same journal entry more than once during closings at several organizations. Finance staff have to find and reverse the duplicates by hand before they can close the books.",
   "claim_ids": [
    "c-9e53583c6513",
    "c-5c26d1b4bb94",
    "c-c5feba4cd6d7"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-10",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-9e53583c6513",
     "why": "Double posting during accounting sync is a distinct finance integration defect not represented in the index."
    },
    {
     "day": "2026-09-09",
     "action": "append",
     "claim_id": "c-5c26d1b4bb94",
     "why": "Transactions appearing twice in the ledger after a sync run is the duplicate journal entry problem this theme already covers."
    },
    {
     "day": "2026-09-10",
     "action": "append",
     "claim_id": "c-c5feba4cd6d7",
     "why": "The same journal entry posted twice during general ledger sync and reversed by hand is the existing duplicate journal entry defect."
    }
   ],
   "accounts": {
    "customer": 2,
    "prospect": 0
   },
   "open_cases": 5,
   "score_parts": {
    "accounts": 15.0,
    "value": 7.7,
    "cases": 20.0,
    "recency": 13.9,
    "bug": 10.0
   },
   "score": 67,
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
     "id": "c-c5feba4cd6d7",
     "day": "2026-09-10",
     "source": "salesforce",
     "type": "bug",
     "topic": "duplicate journal entry posting",
     "quote": "The general ledger sync has posted the same journal entry twice on more than one closing, and our bookkeeper has to go back and reverse the duplicate by hand.",
     "account_id": "ACC-0003",
     "account": "Prairie Land Trust Council",
     "account_type": "customer",
     "tier": "Professional",
     "arr": 154000,
     "speaker": "Miguel Ferreira",
     "locator": {
      "case_id": "50000000000000000b",
      "comment_id": "00a00000000000002a",
      "case_number": "00005011"
     },
     "occurred_at": "2026-09-10T16:45:27Z"
    }
   ]
  },
  {
   "id": "THEME-0003",
   "title": "Event check-in stops working when venue wifi drops",
   "type": "bug",
   "summary": "Onsite event staff using tablets lose the ability to check attendees in whenever venue wifi becomes unavailable. Check-in halts until connectivity returns and there is no way to capture arrivals in the meantime.",
   "claim_ids": [
    "c-6fdcefc76dcd"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-08",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-6fdcefc76dcd",
     "why": "A reported failure of check-in on tablets during connectivity loss is not covered by any open theme."
    }
   ],
   "accounts": {
    "customer": 1,
    "prospect": 0
   },
   "open_cases": 4,
   "score_parts": {
    "accounts": 7.5,
    "value": 13.4,
    "cases": 20.0,
    "recency": 11.8,
    "bug": 10.0
   },
   "score": 63,
   "claims": [
    {
     "id": "c-6fdcefc76dcd",
     "day": "2026-09-08",
     "source": "gong",
     "type": "bug",
     "topic": "event check-in offline resilience",
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
    }
   ]
  },
  {
   "id": "THEME-0004",
   "title": "Renewal notices filtered into spam",
   "type": "bug",
   "summary": "Members at multiple associations report that renewal notices never reach the inbox because they are delivered to the spam folder. Staff only discover the problem when members say they were never notified, which puts renewals at risk of lapsing.",
   "claim_ids": [
    "c-8fc57031470e",
    "c-c3cc9482540b",
    "c-2cd3d99a5193"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-10",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-8fc57031470e",
     "why": "Delivery of renewal email to the wrong folder is an email deliverability problem distinct from invoice content, and no theme exists for it."
    },
    {
     "day": "2026-09-09",
     "action": "append",
     "claim_id": "c-c3cc9482540b",
     "why": "Renewal reminder mail being classified as spam by large providers is the same deliverability failure already open as renewal notices filtered into spam."
    },
    {
     "day": "2026-09-10",
     "action": "append",
     "claim_id": "c-2cd3d99a5193",
     "why": "Members not receiving renewal notices because the messages are delivered to spam is the same deliverability failure already tracked in this theme."
    }
   ],
   "accounts": {
    "customer": 2,
    "prospect": 0
   },
   "open_cases": 4,
   "score_parts": {
    "accounts": 15.0,
    "value": 2.0,
    "cases": 20.0,
    "recency": 13.9,
    "bug": 10.0
   },
   "score": 61,
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
     "id": "c-2cd3d99a5193",
     "day": "2026-09-10",
     "source": "salesforce",
     "type": "bug",
     "topic": "renewal notices routed to spam",
     "quote": "A good number of our members tell us the renewal notice never showed up, and when we check, it landed in their spam folder instead of the inbox.",
     "account_id": "ACC-0005",
     "account": "Sunbelt Literacy Network",
     "account_type": "customer",
     "tier": "Standard",
     "arr": 41000,
     "speaker": "Yolanda Pruitt",
     "locator": {
      "case_id": "500000000000000004",
      "comment_id": "00a00000000000000f",
      "case_number": "00005004"
     },
     "occurred_at": "2026-09-10T12:55:59Z"
    }
   ]
  },
  {
   "id": "THEME-0002",
   "title": "Reason codes for membership tier changes",
   "type": "feature",
   "summary": "Staff who track why members move between membership tiers cannot record transitions involving newer tiers because the reason code list predates them. The split is tracked by hand outside the system as a result.",
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
     "why": "This is a request for configurable reason codes covering newer tiers, which no existing theme addresses."
    }
   ],
   "accounts": {
    "customer": 1,
    "prospect": 0
   },
   "open_cases": 6,
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
   "id": "THEME-0009",
   "title": "Offline event check-in with deferred sync",
   "type": "feature",
   "summary": "Event teams want check-in to continue running on tablets while the venue network is down and to sync the captured records once connectivity returns. Without this, onsite staff have no supported way to admit attendees during an outage.",
   "claim_ids": [
    "c-b58dd0db5d66"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-08",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-b58dd0db5d66",
     "why": "This is a feature request for offline capability and deferred sync, so it is filed separately from the reported check-in failure rather than merged into a bug theme."
    }
   ],
   "accounts": {
    "customer": 1,
    "prospect": 0
   },
   "open_cases": 4,
   "score_parts": {
    "accounts": 7.5,
    "value": 13.4,
    "cases": 20.0,
    "recency": 11.8,
    "bug": 0.0
   },
   "score": 53,
   "claims": [
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
    }
   ]
  },
  {
   "id": "THEME-0007",
   "title": "No expiration warning before a posting comes down",
   "type": "bug",
   "summary": "Postings come down at expiration with no advance notice to the person who placed them, so the poster believes the listing is still live. Both employers placing postings and the staff supporting them want a warning before the expiration date arrives.",
   "claim_ids": [
    "c-c44577763b5c",
    "c-e91f3ddc7a25"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-09",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-c44577763b5c",
     "why": "Silent expiry of postings and the missing advance notice to the poster is a new heading with no existing theme."
    },
    {
     "day": "2026-09-09",
     "action": "append",
     "claim_id": "c-e91f3ddc7a25",
     "why": "The poster getting no notice before a listing expires is the identical gap described in this theme, seen from the person who placed the posting."
    }
   ],
   "accounts": {
    "customer": 1,
    "prospect": 0
   },
   "open_cases": 3,
   "score_parts": {
    "accounts": 7.5,
    "value": 4.8,
    "cases": 15.0,
    "recency": 12.9,
    "bug": 10.0
   },
   "score": 50,
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
     "id": "c-e91f3ddc7a25",
     "day": "2026-09-09",
     "source": "salesforce",
     "type": "feature",
     "topic": "advance warning before posting expiration",
     "quote": "A posting expires and comes down with no warning to the person who placed it, so postings vanish while they still think it is live.",
     "account_id": "ACC-0004",
     "account": "Atlantic Shipwrights Guild",
     "account_type": "customer",
     "tier": "Professional",
     "arr": 96000,
     "speaker": "Colin Bramwell",
     "locator": {
      "case_id": "50000000000000000e",
      "comment_id": "00a000000000000037",
      "case_number": "00005014"
     },
     "occurred_at": "2026-09-09T13:05:24Z"
    }
   ]
  },
  {
   "id": "THEME-0012",
   "title": "Chapter records and remittances maintained by hand",
   "type": "bug",
   "summary": "Chapters and the national office keep separate record sets, so membership and financial data never line up on their own. The national office spends weeks each year reconciling those records, and finance staff calculate quarterly chapter remittances in a spreadsheet.",
   "claim_ids": [
    "c-0d73633ed6f5",
    "c-e4157573bef0"
   ],
   "first_seen": "2026-09-09",
   "last_seen": "2026-09-09",
   "log": [
    {
     "day": "2026-09-09",
     "action": "open",
     "claim_id": "c-0d73633ed6f5",
     "why": "Nothing in the index covers chapter and national records being kept apart and reconciled manually, so this opens a theme."
    },
    {
     "day": "2026-09-09",
     "action": "append",
     "claim_id": "c-e4157573bef0",
     "why": "Quarterly remittance math in a spreadsheet is the same underlying gap as the year end chapter reconciliation, both caused by chapter finance and membership data sitting outside the system."
    }
   ],
   "accounts": {
    "customer": 0,
    "prospect": 1
   },
   "open_cases": 0,
   "score_parts": {
    "accounts": 7.5,
    "value": 0.0,
    "cases": 0.0,
    "recency": 12.9,
    "bug": 10.0
   },
   "score": 30,
   "claims": [
    {
     "id": "c-0d73633ed6f5",
     "day": "2026-09-09",
     "source": "gong",
     "type": "bug",
     "topic": "Manual reconciliation of chapter records",
     "quote": "The national office reconciles the five sets of records at the end of every year, and that takes about six weeks.",
     "account_id": "ACC-0007",
     "account": "Northwoods Arborists Society",
     "account_type": "prospect",
     "tier": "Prospect",
     "arr": 0,
     "speaker": "Delphine Okerlund",
     "locator": {
      "call_id": "7782934451311",
      "speaker_id": "4852",
      "start_ms": 307222,
      "end_ms": 352416
     },
     "occurred_at": "2026-09-09T16:05:55Z"
    },
    {
     "id": "c-e4157573bef0",
     "day": "2026-09-09",
     "source": "gong",
     "type": "bug",
     "topic": "Manual calculation of chapter remittances",
     "quote": "By our finance manager, in a spreadsheet, four times a year, over about three days each time.",
     "account_id": "ACC-0007",
     "account": "Northwoods Arborists Society",
     "account_type": "prospect",
     "tier": "Prospect",
     "arr": 0,
     "speaker": "Delphine Okerlund",
     "locator": {
      "call_id": "7782934451311",
      "speaker_id": "4852",
      "start_ms": 999582,
      "end_ms": 1039230
     },
     "occurred_at": "2026-09-09T16:17:27Z"
    }
   ]
  },
  {
   "id": "THEME-0010",
   "title": "SCORM package import into the learning module",
   "type": "feature",
   "summary": "Organizations with existing e-learning content want to load SCORM 1.2 and SCORM 2004 packages directly into the learning module. Without an import path, education staff must rebuild each course by hand before it can be offered.",
   "claim_ids": [
    "c-b696c3430eb3"
   ],
   "first_seen": "2026-09-09",
   "last_seen": "2026-09-09",
   "log": [
    {
     "day": "2026-09-09",
     "action": "open",
     "claim_id": "c-b696c3430eb3",
     "why": "No existing theme covers loading standards-based course packages into the learning module, so this is a new heading."
    }
   ],
   "accounts": {
    "customer": 0,
    "prospect": 1
   },
   "open_cases": 0,
   "score_parts": {
    "accounts": 7.5,
    "value": 0.0,
    "cases": 0.0,
    "recency": 12.9,
    "bug": 0.0
   },
   "score": 20,
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
    }
   ]
  },
  {
   "id": "THEME-0011",
   "title": "Course completion results written to member records",
   "type": "feature",
   "summary": "Completion, score and time spent live in the learning platform and never reach the member record automatically. A membership clerk retypes those values weekly, which delays credit tracking and introduces errors.",
   "claim_ids": [
    "c-299d81776e9e"
   ],
   "first_seen": "2026-09-09",
   "last_seen": "2026-09-09",
   "log": [
    {
     "day": "2026-09-09",
     "action": "open",
     "claim_id": "c-299d81776e9e",
     "why": "The ask is for learning results to land on the member record automatically, which no theme in the index addresses."
    }
   ],
   "accounts": {
    "customer": 0,
    "prospect": 1
   },
   "open_cases": 0,
   "score_parts": {
    "accounts": 7.5,
    "value": 0.0,
    "cases": 0.0,
    "recency": 12.9,
    "bug": 0.0
   },
   "score": 20,
   "claims": [
    {
     "id": "c-299d81776e9e",
     "day": "2026-09-09",
     "source": "gong",
     "type": "feature",
     "topic": "Completion data integration with member records",
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
    }
   ]
  }
 ]
};
