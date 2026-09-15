window.DIGEST = {
 "as_of": "2026-09-15",
 "days": [
  "2026-09-08",
  "2026-09-09",
  "2026-09-10",
  "2026-09-11",
  "2026-09-14",
  "2026-09-15"
 ],
 "ask_url": "https://g3kmsu2e2ikq7cyivffqi7i6oe0unrtk.lambda-url.us-east-1.on.aws/",
 "themes": [
  {
   "id": "THEME-0005",
   "title": "Membership report export truncated at row limit",
   "type": "bug",
   "summary": "Customers running large reports get files that stop partway through, with no warning that rows are missing. This affects both membership and donor reporting, so staff only discover the gap when the totals do not match their own record counts.",
   "claim_ids": [
    "c-7d2a3f364428",
    "c-155dc035f7d8",
    "c-83304fe35523",
    "c-e79e344c3032"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-11",
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
    "recency": 10.7,
    "bug": 10.0
   },
   "score": 73,
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
    }
   ]
  },
  {
   "id": "THEME-0001",
   "title": "Renewal invoices omit prior credits and balances",
   "type": "bug",
   "summary": "Staff at member organizations are sending renewal invoices that do not account for money the member has already paid, including prior credits, open balances, and payments made when a member upgraded tiers partway through the year. Members receive a bill for the full annual amount, forcing finance staff to catch and correct each invoice by hand before or after it goes out.",
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
    "recency": 9.6,
    "bug": 10.0
   },
   "score": 72,
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
    }
   ]
  },
  {
   "id": "THEME-0008",
   "title": "Pledge reminder schedule ignores donor contact preferences",
   "type": "bug",
   "summary": "Pledge reminders go out by email to donors who have asked to be contacted by mail only, and staff have no way to hold those sends back. Donors repeat the request and fundraising teams lose trust with the people they are asking to give.",
   "claim_ids": [
    "c-5d3a978f29d2",
    "c-5b5f6e38062c",
    "c-7a9d32ef25ab"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-09",
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
    "recency": 8.6,
    "bug": 10.0
   },
   "score": 67,
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
    }
   ]
  },
  {
   "id": "THEME-0006",
   "title": "Duplicate journal entries in general ledger sync",
   "type": "bug",
   "summary": "A batch of transactions periodically posts twice to the general ledger after the accounting sync runs. Finance staff have to identify and remove the duplicate entries before the books reconcile.",
   "claim_ids": [
    "c-9e53583c6513",
    "c-5c26d1b4bb94"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-09",
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
    "recency": 8.6,
    "bug": 10.0
   },
   "score": 61,
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
    }
   ]
  },
  {
   "id": "THEME-0003",
   "title": "Offline event check-in with later sync",
   "type": "feature",
   "summary": "Event staff lose the ability to sign attendees in whenever venue network access drops, and some accounts need the on-site attendance record for insurance and compliance evidence. They are asking for the check-in kiosk to keep accepting arrivals during an outage and reconcile the entries once connectivity returns.",
   "claim_ids": [
    "c-6fdcefc76dcd",
    "c-b58dd0db5d66",
    "c-dd21af62c2f6",
    "c-5814ec6d0a27"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-11",
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
    }
   ],
   "accounts": {
    "customer": 2,
    "prospect": 0
   },
   "open_cases": 7,
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
    }
   ]
  },
  {
   "id": "THEME-0004",
   "title": "Renewal notice email deliverability",
   "type": "bug",
   "summary": "Renewal reminder emails are being filtered as spam by major mail providers, so members never see the notice and lapse without warning. Staff only find out when renewals are missed and have to chase members by hand.",
   "claim_ids": [
    "c-8fc57031470e",
    "c-c3cc9482540b"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-09",
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
    "recency": 8.6,
    "bug": 10.0
   },
   "score": 56,
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
   "open_cases": 6,
   "score_parts": {
    "accounts": 7.5,
    "value": 17.0,
    "cases": 20.0,
    "recency": 7.5,
    "bug": 0.0
   },
   "score": 52,
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
   "id": "THEME-0007",
   "title": "Expiration warnings for postings",
   "type": "bug",
   "summary": "Postings expire and are removed without any notice to the person who created them. Owners keep assuming their posting is still live long after it has come down.",
   "claim_ids": [
    "c-c44577763b5c"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-08",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-c44577763b5c",
     "why": "Postings coming down with no notice to their owner is a new area not covered by any existing theme."
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
    "recency": 7.5,
    "bug": 10.0
   },
   "score": 45,
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
    }
   ]
  },
  {
   "id": "THEME-0009",
   "title": "SCORM package import into learning module",
   "type": "feature",
   "summary": "Associations with existing SCORM course libraries want to upload those packages directly into the learning module and have them run without rebuilding the content. Both customers and prospects raise this as a condition of moving their training online, including support for SCORM 1.2 packages.",
   "claim_ids": [
    "c-b696c3430eb3",
    "c-c9934ceb9fc5"
   ],
   "first_seen": "2026-09-09",
   "last_seen": "2026-09-15",
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
    "recency": 15.0,
    "bug": 0.0
   },
   "score": 22,
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
    }
   ]
  },
  {
   "id": "THEME-0010",
   "title": "Course completion data sync to member records",
   "type": "feature",
   "summary": "Completion, score and time spent from the learning platform are not written back to the member record automatically. A membership clerk rekeys those values weekly, which is slow and leaves member training histories out of date and error prone.",
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
     "why": "Nothing in the index covers moving completion, score and time spent onto member records, which is a distinct ask from importing course packages."
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
    "recency": 8.6,
    "bug": 0.0
   },
   "score": 16,
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
    }
   ]
  }
 ]
};
