# Umami

**What Sprid does with this:** See how many people visit your website, where they came from and which pages they land on.

Umami is the one to reach for if Plausible's Business plan is more than you want to pay for an API, or if you self-host.

## You need

An **API key**. On Umami Cloud that is any plan. Self-hosting, you need a version new enough to have **Settings → API keys**; an older instance cannot be connected at all, whatever key you paste.

## Click path

1. Open [Umami](https://cloud.umami.is), or your own instance.
2. **Settings → API keys → Create API key**. Name it `sprid` and copy the key. Umami shows it once.
3. Save it to a file, such as `~/Downloads/umami-key.txt`, so it never sits in your shell history.
4. **Settings → Websites →** the site **→ Details**. Copy the **Website ID**. It is a uuid such as `8f2a1c90-4d1e-4b7a-9f33-2c0b5e7a1d44`, **not** the domain.

## Then run

```
sprid connect umami --key ~/Downloads/umami-key.txt --site 8f2a1c90-4d1e-4b7a-9f33-2c0b5e7a1d44
```

Self-hosting? Add `--host https://analytics.example.com`. Sprid appends the `/api` your instance serves under, so either form works. Add `--use` to make Umami the source Sprid reports website traffic from.

## Only one provider answers

PostHog, Google Analytics, Plausible and Umami all count the same visits to the same site. Sprid reads **one** of them per app and never adds them together, because adding them would overstate your traffic by roughly the overlap, and the overlap is nearly everything.

With one connected, that one answers. With several, Sprid uses the one you chose with `--use` (PostHog by default, because it also answers the people and registration cards). The others stay connected and idle, and the traffic card says so.

## How to check it worked

Run `sprid status`, then ask your agent: “Read this website’s visitors for the last 28 days through Sprid and say which provider answered.” A saved key confirms setup; only the live read confirms access.

## If it fails

- **Unauthorized:** the key cannot see this website, or your self-hosted Umami predates API keys. Check for the **Settings → API keys** screen; if there is none, upgrade first.
- **Not found:** you probably saved the domain instead of the website id, or left `/api` off a self-hosted host. Sprid adds `/api` for you when you pass `--host`.
- **Rate limited:** Umami Cloud is limiting requests. The next hourly read picks it up.

## What Sprid can and cannot read here

Visitors, pageviews, visits, bounces and total time, plus **every** breakdown this product draws: country, region, city, referrer, channel, campaign, term, page, entry page, exit page, hostname, browser, operating system and device. Umami is the only alternative provider that reports an exit page.

Umami is **cookieless**, so window totals come from Umami directly and are never the daily numbers added up. The daily line counts **sessions** rather than distinct people, so it will not sum to the visitor total beside it.
