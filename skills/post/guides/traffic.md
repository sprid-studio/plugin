# Check whether a traffic spike is real

**What this guide does:** Tells you how to judge a sudden jump in website
visitors, and how to remove a scraper from your numbers without removing
customers. Read it before you act on a spike, and before you explain one.

A spike is not evidence of a bot, and a quiet baseline is not evidence of
people. Both mistakes cost the same: one makes you chase a channel that never
existed, the other makes you drop real readers from your own scoreboard. Decide
with the four reads below, in order, and keep the rule you save as narrow as the
evidence you actually have.

Sprid raises this for you. When one day carries at least 35% of a 30-day
period and runs at ten times the median day, `next` shows **Review that day**
with the date, the multiple and that day's pageviews per visitor beside the
rest of the month. It is a prompt, not a verdict: nothing in a daily series
separates a crawl from a day that went well, which is what the rest of this
guide is for.

## Four reads, in order

**1. Find the hours, not the day.** Get daily visitors for the period, then
split the suspect day by hour. Marketing arrives across a day and decays over
several. A scrape is a block: it starts, runs at a flat rate for a few hours and
stops. If the day's total lands in four consecutive hours and the hours either
side are ordinary, you are looking at one client, not an audience.

**2. Divide pageviews by visitors, and do not trust it on its own.** A browser
that keeps no cookie is a new person on every request, so a crawl that reads
each page once reports a huge visitor count at 1.0 pageviews each, and that is
worth seeing. But a crawler that hits each URL several times does not look like
that at all: the September 2026 scrape ran at **1.60 pageviews a visitor
against a baseline of 1.44** — higher than the real traffic it was hiding in.
Read the number, let a flat 1.0 accuse, and never let a healthy-looking ratio
acquit.

**3. Ask for the compound group, never the dimensions separately.** `review_traffic`
returns whole groups — browser, version, OS, screen, timezone, referrer,
country together — because adding up independent dimension counts double-counts
everyone. One group carrying most of a day is the finding. Twelve groups sharing
it evenly is not, unless they agree on something (see below).

**4. Look at which pages were hit.** A crawl walks your sitemap: every locale,
every item, a handful of hits each, nothing concentrated. Real discovery is
lopsided — a few pages take most of the traffic, and they are the pages that
rank or were linked.

## What the fingerprint actually looks like

Sort the fields by how hard they are to fake, and read the hard ones:

- **Timezone against geography** is the strongest single tell. A browser
  reporting `Asia/Shanghai` while the IP geolocates across the United States,
  Singapore and Germany is one operator on rotating addresses. The address is
  rented; the container's clock is not.
- **An odd viewport** — `800x600`, `1512x982`, `1280x720` — beats the user
  agent, because the user agent is the field they bother to spoof. Expect a
  plausible current Chrome on macOS with a screen no customer has.
- **A blend is itself a signature.** One wave rotated across Chrome 118–120,
  Edge 119–120 and Firefox 120–121 so that no browser stood out — on one
  viewport, one timezone and one referrer. What they varied is noise. What they
  forgot to vary is the rule.
- **Referrer `$direct`** on everything, with no search or social mixed in.
- **Country is not the tell.** The same wave arrives from a dozen of them. A
  country rule removes customers and keeps the scraper.

## The trap: your comparison period is contaminated too

A percentage has two numbers in it, and the older one is the one nobody looks
at. On one app in September 2026 the same thirty days read **+252.5%** before
any review, **-62.6%** with only the obvious spike day excluded, and **-17.6%**
once two earlier waves in the comparison period were excluded as well. Same
data, three answers, two of them wrong, and the middle one was the most
convincing because it was already a correction.

So when you find one wave, look for its siblings before you save anything.
Query the whole visible history for the marker you just identified — the
timezone, the viewport — and read it by day. Waves have edges: a background of
5 to 30 visitors a day with several hundred on the wave days tells you both
where the rule starts and that the rest is ordinary.

## Two more things that will catch you out

**Raw provider data is not what Sprid counted.** Web visitors already exclude
events with no browser, crawler and headless user agents, reported bots, and
anything marked internal or test. A wave that arrives with a null browser never
reached your total, so a raw query that includes it will not reconcile with the
card. Compare like for like or you will exclude the same traffic twice.

**Bound a rule as tightly as its conditions are ordinary.** `1920x1080` is a
real screen that real customers use, so a rule built on it gets the wave's dates
and nothing wider. A viewport nobody has can carry a longer window. The date
range is the safety margin for a condition that is not distinctive on its own.

## Saving the exclusion

Review the range, preview the effect, then save. `review_traffic` previews
visitor counts before and after for the period **and the one before it**, which
is the number you want to see move.

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

End dates are exclusive and UTC. Conditions inside a rule are AND; separate
rules are OR. Fields: `browser`, `browserVersion`, `os`, `osVersion`,
`screenWidth`, `screenHeight`, `timezone`, `referrer`, `country`. Values are
exact strings and a missing property never matches. Write the `reason` for
someone who finds the rule in a year and has to decide whether it still holds —
name the window, the evidence and the size of what it removes.

Save it through `upsert_app_profile` or `PATCH /api/app-profiles/:id` under
`posthogConfig.trafficExclusions`, preserving the rest of the configuration. Then
**log the change as an event** with the areas it can explain and why, or the drop
in your own graph becomes a second mystery a month from now.

## What it does not touch

Your provider's stored data is never changed or deleted; the exclusion is a
filter Sprid applies when it reads. Native app activity, registrations and
revenue are unaffected — a scraper does not sign up. Raw connected queries and
the marketing-review event inventory stay unfiltered on purpose, because they
are the evidence you check the rule against. **Restore this traffic** disables a
rule and the original numbers come straight back.

## When not to exclude

A spike with a real referrer and a lopsided page distribution is a link that
worked. Find it before you filter it. A shared
office machine, an uptime probe and a preview renderer all produce a repeated
fingerprint and none of them is worth a rule. And a group you cannot explain
stays in the numbers: an unexplained visitor counted is a smaller error than a
customer removed.
