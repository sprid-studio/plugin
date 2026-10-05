# PostHog

**What Sprid does with this:** See how people use your app and where they stop.

## You need

Access to your app’s PostHog project and permission to create a **personal API key**. Your app must already send events to PostHog; connecting Sprid adds no tracking. The public key inside your app does not work here.

## Click path (us.posthog.com or eu.posthog.com)

1. **Settings → Account → Personal API keys → Create personal API key**, named `Sprid <app name>`.
2. Under access, select **Projects** and choose your app’s project. Leave **All access** off.
3. Select **Query → Read** and **Project → Read**. Leave write access off.
4. Create the key and keep the dialog open: PostHog shows it once. Use a separate key per app.
5. Copy the key and leave it on your clipboard.

## Project id and host

- **Project id:** the number after `/project/` in your PostHog address, such as `12345`.
- **Host:** `eu` for `eu.posthog.com`, `us` for `us.posthog.com`, or your full self-hosted address, whichever you open the dashboard on.

## Then run

```sh
sprid connect posthog --app myapp --key-from-clipboard --project 12345 --host eu
```

Use your own app slug, project id and host. Add `--workspace <slug>` if needed. Keep the key out of chat.

Sprid reads the key from your clipboard, saves it and clears the clipboard, so it never shows on screen or lands in a file. Working with an agent? Tell it the key is copied and it runs this for you. Typing it yourself, copy the key last: paste the command into your terminal first, then copy the key, then press Enter. If the clipboard still holds the command, Sprid refuses it; copy the key and run it again. Without clipboard access (a remote shell), save the key to a file and pass `--key <file>` instead.

## How to check it worked

Ask your agent: “Check that Sprid can read recent PostHog events for this app, and confirm the project is correct.” The check reports recent activity or explains why there is none; a saved connection alone does not prove events arrive.

## Metric definitions

In **Settings → Apps → your app → PostHog**, set the account-created event and the first UTC date from which tracking is complete.

| Metric | What counts |
|---|---|
| Signups | First `sprid_signup` event per PostHog person, across all surfaces |
| New product users | First product activity, including anonymous people |
| Active product users | Distinct people with product activity in the period |
| Web visitors | Distinct pageview visitors on the saved website hostname, minus your product |

**Signups.** Send `sprid_signup` from your server after the account is created, with the account id as `distinct_id`, and identify that id in your clients. Never fire it on login, page load or install. An existing `posthogEvents.signup` mapping also works; `posthogConfig.registration.event` wins over it. With no tracking start date, no matching event history reads as unavailable; with one, it reads as zero signups. A period that starts before the tracking date is counted from that date and says so. Comparisons crossing it, or with no confirmed start, are withheld. Backfill with the original creation timestamps.

**Every signup surface has to send it.** An event your app sends after sign-up misses accounts made on your website, and the other way round: one app's in-app event missed 17% of its signups, which happened on its website. A server event covers every surface at once. Without one, list each surface's account-created event in `registration.events`; the first of any of them per identity counts, so an existing account signing in elsewhere is not a new signup. Never add a sign-in event that existing accounts also send. The marketing review flags a signup-like event on a surface where your registration event never fires.

When an app reports signups, they are its user count on Home and in Insights. First product activity counts anonymous devices, so it moves into that card's detail.

### What counts as your product

Set this under **What counts as your product** on the same screen. It decides who is an active person, and it is the single setting most likely to make the people card wrong.

| Your product is | Choose | Also give |
|---|---|---|
| An iOS or Android app | **A phone app** | Nothing. This is the default |
| A web app on its own subdomain | **A website or web app** | The hostnames, such as `app.example.com` |
| A web app under a path on your marketing domain | **A website or web app** | The paths, such as `/app`, `/dashboard` |
| A phone app with a web client | **Both** | The web hostnames or paths |

**A web product must say where it lives.** Your marketing pages and your product are the same PostHog events; without a hostname or a path there is nothing to tell them apart, and every visitor would be counted as someone using the product. Sprid refuses that configuration rather than reporting it.

Whatever you name here is **subtracted from your website visitor numbers**, so a page inside the product is never also counted as a visit.

**A phone app** needs `posthog-react-native` on iOS, iPadOS or Android and rejects explicit web surfaces: set `app_surface: 'web'` on Expo web and `'native'` on devices. Web counts need a browser and exclude reported bots and crawler user agents. Every metric excludes events or people with `is_internal`, `is_test` or `sprid_test = true`. What remains is observed identities, not guaranteed humans.

### Keep your own testing out

On a new app, your own phone, simulators and store reviewers can outnumber real people. Sprid already drops Google Play's pre-launch test devices, events reporting `$is_emulator`, reported bots, and anything flagged `is_internal`, `is_test` or `sprid_test`. Two things are yours to add:

- **Flag your own accounts.** After sign-in, register `is_internal: true` when the account's email is on your own domain, store-review accounts included, and set it on the person if you identify. A web client that never identifies has to put it on every event, before the first pageview. Do the same on the server event that records a signup.
- **List your own devices** under `exclude`, for what happens before sign-in, such as a fresh install. Open your app, then read the newest events in PostHog for the `$device_name` values:

```json
{"exclude":[{"scope":"event","property":"$device_name","operator":"in","values":["Pixel 8","Simulator iOS","sdk_gphone64_arm64"]}]}
```

Apple's review devices have reported `$device_name` `iPhone99,7`, with locale `en-US` and time zone `US/Pacific`, in every app we checked (September 2026). Add it if it shows up in yours.

Two more Apple populations pass every default rule, because they are real iPhones: the device that checks each uploaded build (a fresh US person per build, often Cupertino, locale a bare `en` where real phones send `en-US`) and App Review (US, locale `zh-Hans`, about one a day). Both are active for one day and never reach a paywall: one app counted 14 of them as installs in two months. The marketing review flags them with their counts. Exclude a locale only after checking none of your real users send it.

Google Play's pre-launch devices are covered by default: in the app we checked, every `OnePlus8Pro` event carried the fleet's screen width and every `sdk_gphone` event carried `$is_emulator` (2026-10-03). If yours sends neither property, list the device names under `exclude`.

### Custom properties

Advanced rules go under **Custom properties**:

```json
{"registration":{"identity":{"scope":"event","property":"account_id"}},"app":{"kind":"web","hosts":["app.example.com"]},"exclude":[{"scope":"person","property":"staff","operator":"in","values":[true]}]}
```

- `app.kind` is `native`, `web` or `both`, with `app.hosts` and `app.pathPrefixes` saying where a web product lives. This is what the screen above writes.
- `app.filters` replaces the whole definition with your own rule; all filters must match. Choosing it shows as **Custom rules** on the screen, and the rule is subtracted from web visitors the same way.
- `exclude` removes matching traffic from every metric.
- `registration.filters` narrows the registration event, for example `result = success`.
- `registration.events` adds account-created events from other surfaces, counted with `registration.event` (see Signups above).
- `entryUrls` lists the pages a plan, campaign or bio link sends people to, such as a web funnel's first step. The review flags one with almost no pageviews in 14 days, which usually means a link stopped pointing at it.
- `registration.accounts: false` says the app has no accounts (a local-first app, or one that identifies by device). Registrations then read as not applicable instead of a missing event, and the weekly email stops listing them as unread.
- `registration.identity` defaults to `person_id`. A configured property must be present and should never change, because it counts accounts.
- Each rule takes `scope: event|person`, `operator: in|not_in` and string, number or boolean `values`. A missing property fails `in` and passes `not_in`. Property names are literal keys, dots included.

The same object is `posthogConfig` in REST `PATCH /api/app-profiles/:id`, MCP `upsert_app_profile` and the App Profile JSON used by `sprid init`, where `registration.event` and `registration.since` also live. No credentials or SQL belong in it. After saving, fetch Insights and check its registration notes and totals against your database before trusting a funnel.

### Paywall and purchase events

A paywall event that says only that a paywall appeared cannot tell a price change from a paywall that failed to load: both read as fewer sales. One app's Android paywall had no purchasable product for five months and its revenue view read as zero demand. Send at least these, and map the events under `posthogEvents` as `paywallShown` and `purchase`:

| Event | Properties |
|---|---|
| Paywall shown | `price`, `currency`, `product_id`, `offering_id`, `offering_loaded` (true once the store returned a product), `has_free_phase`, `store_country` |
| Purchase or trial started, after the store confirms it | `price`, `currency`, `product_id`, `has_free_phase` |
| Purchase failed | `product_id`, the store's error code |

Report a billing error to your error tracker too, never only to the console. The marketing review flags a platform that shows the paywall to many people and never sells, and paywall events that carry none of these properties.

## Countries, sources and entry pages

Each website breakdown is one PostHog property on each `$pageview`. posthog-js fills them all itself, so a site that loads it with default settings needs nothing here. They go missing when something else sends the events, and the breakdown then reads **Unknown**. Insights and `get_insights` (`traffic.gaps`) name which one is missing, why, and the fix.

| Breakdown | Property Sprid reads | posthog-js sets it from |
|---|---|---|
| Country, region, city | `$geoip_country_code`, `$geoip_subdivision_1_name`, `$geoip_city_name` | PostHog’s GeoIP lookup of the visitor’s IP |
| Source | `$referring_domain` | The referrer’s hostname, or `$direct` when there is none, on every page of the visit |
| Entry and exit page, sessions, bounce, time on site | `$session_id` | One id per visit |
| Browser, OS, device | `$browser`, `$os`, `$device_type` | The user agent |
| Pages, hostname | `$pathname`, `$host` | The page address |

Website events also need `$lib: "web"`; Sprid tells your site apart from your app by it.

Three setups lose the country, and each has its own fix:

- **Cookieless mode** (`cookieless_mode: "always"`): PostHog does not geolocate cookieless events, so every country is Unknown. Register the country yourself before the first pageview, from a value your host already has. On Cloudflare that is `request.cf.country`, the `CF-IPCountry` header, or `loc=` in `/cdn-cgi/trace` on your own domain: `posthog.register({ $geoip_country_code: "SE" })`. Or turn cookieless mode off if your privacy policy allows it.
- **Your own relay or server** (a Worker, an API route or a proxy that calls PostHog’s capture endpoint): PostHog sees the server’s IP, or none if you set `$geoip_disable: true`. Set `$geoip_country_code` in the relay. A property called `country` does not count: nothing in PostHog or Sprid reads it.
- **"Discard client IP data"** under Project settings, or the GeoIP transformation switched off under Data pipelines: no event in the project gets a location. Turn it back on, or supply the country as above.

A relay also has to send what posthog-js would have: `$referring_domain` on every pageview (`$direct` when the visit had no referrer, and the landing page’s referrer on every later page of the same visit), and a `$session_id` that stays the same for the whole visit. For example, in a Cloudflare Worker:

```js
properties: {
  ...props,
  $lib: "web",
  $host: "example.com",
  $pathname: path,
  $session_id: visitId,
  $referring_domain: visitReferrer || "$direct",
  $geoip_disable: true,                         // PostHog never sees the IP
  $geoip_country_code: request.cf?.country ?? null,
}
```

A visit whose source is `localhost` is someone on a development build clicking through to your live site. Stop capturing on development hosts, or exclude it as below.

## Review suspected automated traffic

Read [Check whether a traffic spike is real](https://sprid.studio/docs/traffic) (`sprid docs traffic`) before saving a rule: a spike or a shared fingerprint alone does not prove bots.

Not every crawler arrives as a spike. One site's September was 84% people on desktop, with no referrer, from one country, most of them for one pageview, with a normal Chrome user agent that no bot filter catches. The marketing review flags a desktop, direct, single-country group above half of website people; confirm it here before excluding anything.

Open **Web visitors → Review traffic exclusions**, or **Settings → Apps → your app → PostHog → Review traffic**. Pick a UTC date range and a traffic group, preview the effect, then save. Agents use MCP `review_traffic` or `POST /api/app-profiles/:ref/traffic-review?workspaceId=…` with `{"start":"2026-09-18","end":"2026-09-19"}`: end dates exclusive, UTC, at most 31 days. An optional `exclusion` previews a rule against this period and the one before. Save approved rules in `posthogConfig.trafficExclusions` through `upsert_app_profile` or the profile PATCH route, keeping the rest of the configuration. Sprid records who edited it and when.

How exclusions apply:

- App-specific and date-bounded. Properties inside a rule are AND; enabled rules are OR.
- Applied to website totals, charts, breakdowns, social attribution and weekly website counts, comparison period included. Remaining visitors are recounted as distinct people, never subtracted.
- Native app activity and registrations are unchanged, and PostHog’s data is never changed or deleted. **Restore this traffic** disables a rule.
- Raw connected queries and the marketing-review event inventory stay unfiltered as evidence; Insights shows the corrected figures.
- Only PostHog is supported today.

## Social traffic and clip comparisons

Save the app’s website URL on its App Profile as well as connecting PostHog. Insights then compares completed-day website sessions with recorded social view gains. Shared bio traffic stays at channel level; only a dedicated tagged link identifies one publish. Older clips with metric activity stay candidates.

Copy the stable bio link and dedicated clip links from Insights. Keep `utm_source`, `utm_medium`, `sprid_account` and, on dedicated links only, `sprid_publish` through any redirects. Never repoint the shared bio link to the newest publish. The optional bio-page HTML export records selections separately and keeps a direct app link; host it on the saved hostname with your existing PostHog setup.

To capture store-link clicks and website outcomes, add after your PostHog initialization:

```html
<script src="https://sprid.studio/sprid-attribution.js" defer></script>
```

It uses your PostHog client and consent state and sends nothing to Sprid. Call `window.spridAttribution?.track('signup')` or `.track('activation')` only after that action succeeds. `posthogEvents.signup` and `posthogEvents.activation` mappings also count when the event shares the arriving website session. It does not track a native app or join visits to purchases, and a store click is not an install. Missing outcomes stay unmeasured. Redirect-only flows need a beacon before navigating; redirect events are counted apart from sessions. `get_insights` and `sprid insights` return the same evidence as the dashboard.

## If it fails

- **Access denied:** check the key is active, grants your project and has both Read permissions. Reconnect with a corrected key file.
- **Project not found:** check project number and host together. A US project needs the US host.
- **Connected but no events:** check the dates and project, then ask your agent to check your app’s tracking is sending events.

## Investigate with this connection

Reads `query` (HogQL), `events` and `properties` for the pinned project. Check instrumentation before interpreting events. Event-definition discovery also needs `event_definition:read`, property-definition discovery `property_definition:read`, both restricted to the same project.

```sh
sprid marketing-review capabilities --app <slug> --source posthog --json
```

See [connected queries](https://sprid.studio/docs/queries).

## Sources and verification

Setup and live reads checked 2026-09-09.

- [PostHog personal API keys](https://posthog.com/docs/api/personal-api-keys)
- [Project identity endpoint](https://posthog.com/docs/api/projects)
- [HogQL query endpoint](https://posthog.com/docs/api/query)
- [SDK and framework guides](https://posthog.com/docs/libraries)
- [React Native screen tracking](https://posthog.com/docs/libraries/react-native)
- [Identifying users](https://posthog.com/docs/product-analytics/identify)
- [Funnels](https://posthog.com/docs/product-analytics/funnels)
