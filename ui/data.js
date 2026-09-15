window.DIGEST = {
 "as_of": "2026-09-08",
 "days": [
  "2026-09-08"
 ],
 "ask_url": "https://g3kmsu2e2ikq7cyivffqi7i6oe0unrtk.lambda-url.us-east-1.on.aws/",
 "themes": [
  {
   "id": "THEME-0001",
   "title": "Renewal invoices omit prior credits and balances",
   "type": "bug",
   "summary": "Membership staff send renewal invoices that leave out credits and carried-over balances the member has already paid, so the amount due reads far higher than it should. Finance teams chase the difference manually every renewal cycle.",
   "claim_ids": [
    "c-915d4dd0bc13",
    "c-deb7b49ebfd6"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-08",
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
    "recency": 15.0,
    "bug": 10.0
   },
   "score": 70,
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
    }
   ]
  },
  {
   "id": "THEME-0005",
   "title": "Membership report export truncated at row limit",
   "type": "bug",
   "summary": "Staff exporting membership reports get files that stop partway through once the record count passes roughly ten thousand rows. The truncated export is silent, so incomplete data can be used without anyone noticing.",
   "claim_ids": [
    "c-7d2a3f364428"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-08",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-7d2a3f364428",
     "why": "Exports cutting off above a row threshold is a reporting failure with no matching theme in the index."
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
    "recency": 15.0,
    "bug": 10.0
   },
   "score": 70,
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
    }
   ]
  },
  {
   "id": "THEME-0008",
   "title": "Pledge reminder schedule ignores donor contact preferences",
   "type": "bug",
   "summary": "Donors who asked for a single reminder before a campaign closes still receive the full standard reminder sequence. Fundraising staff face complaints and have to manage those preferences outside the system.",
   "claim_ids": [
    "c-5d3a978f29d2"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-08",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-5d3a978f29d2",
     "why": "Fundraising reminders overriding stored donor preferences is a separate ask from renewal notice delivery and opens its own theme."
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
    "recency": 15.0,
    "bug": 10.0
   },
   "score": 66,
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
    "recency": 15.0,
    "bug": 0.0
   },
   "score": 60,
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
   "id": "THEME-0003",
   "title": "Offline event check-in with later sync",
   "type": "feature",
   "summary": "Onsite teams checking attendees in on tablets lose the ability to work when venue wifi drops, which stalls the line at the door. They need check-in to keep recording locally and sync back to the system once connectivity returns.",
   "claim_ids": [
    "c-6fdcefc76dcd",
    "c-b58dd0db5d66"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-08",
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
    "recency": 15.0,
    "bug": 0.0
   },
   "score": 56,
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
    }
   ]
  },
  {
   "id": "THEME-0006",
   "title": "Duplicate journal entries in general ledger sync",
   "type": "bug",
   "summary": "The general ledger sync has posted the same journal entry twice during more than one close. Bookkeepers must find and reverse the duplicates by hand before the books balance.",
   "claim_ids": [
    "c-9e53583c6513"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-08",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-9e53583c6513",
     "why": "Double-posted journal entries in the accounting sync are distinct from invoice and reporting issues and open a new theme."
    }
   ],
   "accounts": {
    "customer": 1,
    "prospect": 0
   },
   "open_cases": 3,
   "score_parts": {
    "accounts": 7.5,
    "value": 7.7,
    "cases": 15.0,
    "recency": 15.0,
    "bug": 10.0
   },
   "score": 55,
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
    "recency": 15.0,
    "bug": 10.0
   },
   "score": 52,
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
   "id": "THEME-0004",
   "title": "Renewal notice email deliverability",
   "type": "bug",
   "summary": "Members report that renewal notices never arrived, and staff find the messages were filtered into spam folders instead of the inbox. Renewals are missed and staff have to follow up individually to confirm delivery.",
   "claim_ids": [
    "c-8fc57031470e"
   ],
   "first_seen": "2026-09-08",
   "last_seen": "2026-09-08",
   "log": [
    {
     "day": "2026-09-08",
     "action": "open",
     "claim_id": "c-8fc57031470e",
     "why": "This is about renewal emails being filtered to spam rather than about invoice amounts, and no theme covers message delivery."
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
    "recency": 15.0,
    "bug": 10.0
   },
   "score": 44,
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
    }
   ]
  }
 ]
};
