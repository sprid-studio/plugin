# Plausible

**What Sprid does with this:** See how many people visit your website, where they came from and which pages they land on.

## You need

A **Business** plan or higher. The Stats API is a Business-plan feature, so a valid key on a cheaper plan is refused with a plan error rather than a key error. An API key also belongs to **one team**, so create it in the team that owns the site.

## Click path

1. Open [Plausible](https://plausible.io) and switch to the team that owns the site.
2. **Settings → API keys → New API key**.
3. Name it `sprid`, create it, and copy the key. Plausible shows it once.
4. Save it to a file, such as `~/Downloads/plausible-key.txt`, so it never sits in your shell history.
5. Your **site id** is the domain exactly as it was added to Plausible: no `https://`, no trailing slash. It is the last part of the site’s URL, `plausible.io/<site id>`.

## Then run

```
sprid connect plausible --key ~/Downloads/plausible-key.txt --site example.com
```

Self-hosting? Add `--host https://analytics.example.com`. Add `--use` to make Plausible the source Sprid reports website traffic from.

## Only one provider answers

PostHog, Google Analytics and Plausible all count the same visits to the same site. Sprid reads **one** of them per app and never adds them together, because adding them would overstate your traffic by roughly the overlap, and the overlap is nearly everything.

With one connected, that one answers. With several, Sprid uses the one you chose with `--use` (PostHog by default, because it also answers the people and registration cards). The others stay connected and idle, and the traffic card says so.

## How to check it worked

Run `sprid status`, then ask your agent: “Read this website’s visitors for the last 28 days through Sprid and say which provider answered.” A saved key confirms setup; only the live read confirms access.

## If it fails

- **Business plan required:** the key is fine; the plan does not include the Stats API. Move to Business, or use PostHog or Google Analytics for this app instead. Nothing needs re-entering afterwards.
- **Unauthorized:** the key belongs to a different team from the site. Create the key inside the team that owns the site.
- **Site not found:** the site id is the domain as Plausible has it, with no scheme and no trailing slash.
- **Rate limited:** Plausible allows 600 requests an hour per key. One reading is well inside that, so check whether another tool shares the key.

## What Sprid can and cannot read here

Visitors, pageviews, visits, bounce rate and visit duration, plus breakdowns by country, region, city, source, channel, campaign, term, page, entry page, exit page, hostname, browser, operating system and device.

Plausible is **cookieless**: it has no person id, so a visitor is its own daily estimate rather than someone Sprid can follow between days. Window totals therefore come from Plausible directly and are never the daily numbers added up. Bounces and session time arrive as a rate and an average, and Sprid turns them back into counts, so they carry Plausible’s rounding. Days are the site’s own time zone, not UTC.

## Sources

- [Stats API v2 `query`, and the Business-plan requirement](https://plausible.io/docs/stats-api)
