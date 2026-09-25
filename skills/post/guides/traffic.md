# Check whether a traffic spike is real

**What this guide does:** Tells you how to judge a sudden jump in website
visitors, and how to remove a scraper from your numbers without removing
customers. Read it before you act on a spike or explain one.

A spike is not proof of a bot, and a quiet baseline is not proof of people.
Get it wrong one way and you chase a channel that never existed; the other way
and you drop real readers from your own numbers. Use the four reads below, in
order, and keep any rule as narrow as your evidence.

Sprid flags candidates. When one day carries at least 35% of a 30-day period
and runs at ten times the median day, `next` shows **Review that day** with the
date, the multiple and that day’s pageviews per visitor against the rest of the
month. Treat it as a reason to look closer: a daily series can’t tell a crawl from a
good day.

## Four reads, in order

**1. Find the hours, not the day.** Split the suspect day by hour. Marketing
arrives across a day and decays over several. A scrape is a block: a flat rate
for a few hours, then nothing. If the day’s total sits in four consecutive
hours with ordinary hours either side, it is one client, not an audience.

**2. Divide pageviews by visitors, but don’t trust it alone.** A browser with no
cookie is a new visitor on every request, so a crawl that reads each page once
shows a huge visitor count at 1.0 pageviews each. A crawler that hits each URL
several times doesn’t: the September 2026 scrape ran at **1.60 pageviews a
visitor against a baseline of 1.44**. A flat 1.0 is suspicious; a healthy ratio
proves nothing.

**3. Ask for whole groups, not separate dimensions.** `review_traffic` returns
compound groups (browser, version, OS, screen, timezone, referrer, country
together), because adding up separate dimension counts double-counts everyone.
One group carrying most of a day is the finding. Twelve groups sharing it evenly
is not, unless they agree on something (below).

**4. Look at which pages were hit.** A crawl walks your sitemap: every locale
and item, a few hits each. Real discovery is lopsided: a few pages that rank or
were linked take most of the traffic.

## What the fingerprint looks like

Read the fields that are hardest to fake:

- **Timezone against geography** is the strongest tell. A browser on
  `Asia/Shanghai` while its IPs sit in the US, Singapore and Germany is one
  operator on rented addresses. The addresses rotate; the machine’s clock
  doesn’t.
- **An odd viewport** (`800x600`, `1512x982`, `1280x720`) beats the user agent,
  which is the field they bother to spoof. Expect a plausible current Chrome on
  macOS with a screen no customer has.
- **A blend is a signature too.** One wave rotated Chrome 118-120, Edge 119-120
  and Firefox 120-121 so no browser stood out, all on one viewport, timezone and
  referrer. What they varied is noise; what they forgot to vary is the rule.
- **Referrer `$direct`** on everything, with no search or social.
- **Country is not a tell.** The same wave comes from a dozen countries. A
  country rule removes customers and keeps the scraper.

## Check the comparison period too

A percentage change has two periods, and nobody looks at the older one. On one
app in September 2026 the same thirty days read **+252.5%** before review,
**-62.6%** with only the obvious spike excluded, and **-17.6%** once two earlier
waves in the comparison period were excluded too. The middle answer was wrong
and the most convincing, because it already looked corrected.

So when you find one wave, look for others before saving anything. Query the
whole history for its marker (the timezone, the viewport) by day. Waves have
edges: 5 to 30 visitors a day in the background and several hundred on wave
days tells you where the rule starts and that the rest is ordinary.

## Two more traps

**Raw provider data is not what Sprid counted.** Web visitors already exclude
events with no browser, crawler and headless user agents, reported bots, and
anything marked internal or test. A wave with a null browser never reached your
total, so a raw query including it won’t match the card. Compare like with like
or you exclude the same traffic twice.

**Bound a rule by how ordinary its conditions are.** `1920x1080` is a real
screen many customers use, so a rule on it gets exactly the wave’s dates. A
viewport nobody has can carry a longer window. The date range is the safety
margin for a condition that isn’t distinctive on its own.

## Save the exclusion

Preview, then save. `review_traffic` shows visitor counts before and after for
the period **and the one before it**, which is the number you want to see move.

```json
{
  "id": "scrape-2026-09-18",
  "reason": "Full-site crawl 04:00-08:00 UTC: Asia/Shanghai timezone, 800x600 viewport, direct referrer, IPs across US/SG/DE. 39,958 of the day's 40,476 visitors, every locale and item page hit at most 5 times with no cookie reuse.",
  "start": "2026-09-18",
  "end": "2026-09-19",
  "enabled": true,
  "conditions": [
    { "field": "timezone", "value": "Asia/Shanghai" },
    { "field": "screenWidth", "value": "800" },
    { "field": "screenHeight", "value": "600" }
  ]
}
```

- End dates are exclusive and UTC.
- Conditions in a rule are AND; separate rules are OR.
- Fields: `browser`, `browserVersion`, `os`, `osVersion`, `screenWidth`,
  `screenHeight`, `timezone`, `referrer`, `country`. Values are exact strings;
  a missing property never matches.
- Write `reason` for someone reading it in a year: the window, the evidence and
  how much it removes.

Save through `upsert_app_profile` or `PATCH /api/app-profiles/:id` under
`posthogConfig.trafficExclusions`, keeping the rest of the configuration. Then
**log the change as an event** with the areas it affects and why, or next
month’s drop in your graph becomes a new mystery.

## What an exclusion doesn’t touch

Your provider’s data is never changed or deleted; Sprid filters when it reads.
App activity, registrations and revenue are unaffected, since a scraper doesn’t
sign up. Raw connected queries and the marketing-review event inventory stay
unfiltered on purpose, as the evidence to check the rule against. **Restore this
traffic** disables a rule and the original numbers come straight back.

## When not to exclude

A spike with a real referrer and lopsided pages is a link that worked: find it
before you filter it. A shared office machine, an uptime probe and a preview
renderer all repeat a fingerprint, and none is worth a rule. A group you can’t
explain stays in: an unexplained visitor counted is a smaller error than a
customer removed.
