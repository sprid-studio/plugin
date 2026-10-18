# Check whether a traffic spike is real

**What this guide does:** Helps investigate a jump in website visitors and prepare
a narrow, reviewable exclusion when evidence supports it.

A spike can be a successful referral, automated traffic or a mixture. Sprid's
**Review that day** action is a prompt to investigate, not a bot verdict. Keep raw
counts beside any filtered comparison and explain what remains uncertain.

## Inspect the traffic

1. **Locate the change.** Split the period by day and hour. Compare the spike with
   campaigns, referrals and ordinary traffic. A concentrated burst alone does not
   establish that the visitors are automated.
2. **Read behavior.** Compare pages per visitor, navigation and meaningful events.
   A crawler can send several pageviews; a real reader may need only one page.
   Neither ratio proves who visited.
3. **Inspect combined groups.** `review_traffic` groups browser, screen, timezone,
   referrer and other dimensions together. Counts from separate dimensions can
   describe the same visitors and must not be added.
4. **Read the pages and sources.** Broad repeated requests across a catalogue may
   suggest automation. Check whether a real campaign, shared device or monitoring
   service explains the same pattern before excluding it.

## Treat fingerprints as clues

Compare combinations of browser properties, request timing, destinations and
referrers. A shared viewport, missing referrer or timezone mismatch is insufficient
on its own: ordinary people can share those properties or use a VPN.

Do not infer a bot from country, language or a device model. Seek independent
support such as verified crawler identification or matching server-log behavior
when those sources are available. Preserve unresolved traffic as uncertain.

## Check both comparison periods

Apply the same investigation to the baseline. Removing a spike only from the
current period can distort the reported change when similar traffic exists in
the earlier one. Query suspected patterns across both windows before comparing.

Use matching metric definitions. Sprid's website counts already apply their
configured exclusions; a raw provider query can include traffic that never
entered the displayed total. Read the returned coverage and filter notes before
trying to reconcile or exclude it again.

## Prepare a narrow exclusion

Choose conditions supported by the customer's evidence and limit the dates to
the verified interval. Preview the affected visitors and the remaining traffic
in both periods. Check that known customer activity is not caught by the rule.

The following is a fictional schema example, not a suggested device blacklist.
Replace its dates, conditions and reason with verified evidence before saving:

```json
{
  "id": "verified-crawl-example",
  "reason": "Example only: record the corroborating evidence, date range and affected counts here.",
  "start": "2026-01-10",
  "end": "2026-01-11",
  "enabled": false,
  "conditions": [
    { "field": "browser", "value": "Example crawler" },
    { "field": "screenWidth", "value": "800" }
  ]
}
```

- End dates are exclusive and UTC.
- Conditions in a rule are AND; separate rules are OR.
- Fields: `browser`, `browserVersion`, `os`, `osVersion`, `screenWidth`,
  `screenHeight`, `timezone`, `referrer`, `country`. Values are exact strings;
  a missing property never matches.
- Write the evidence and affected counts in `reason`. Keep unrelated exclusions
  and profile settings intact.

When authorized, save through `upsert_app_profile` or `PATCH /api/app-profiles/:id`
under `posthogConfig.trafficExclusions`. Read back the configuration and affected
metrics, then log the measurement change with its areas and reason so a later
review can explain the difference.

## What changes

An exclusion filters Sprid's website readings; it does not delete provider data.
App activity, registrations and revenue use their own definitions. Raw connected
queries and the marketing-review event inventory remain available as evidence.
Disabling the rule restores that traffic to the filtered readings.

Keep an unexplained group visible. If the available evidence cannot separate
customers from automation, report that limitation instead of saving an exclusion.
