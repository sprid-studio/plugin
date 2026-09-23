# PostHog

**What Sprid does with this:** See how people use your app and where they stop.

## You need

Access to your app’s PostHog project and permission to create a **personal API key**. Your app must already send events to PostHog; connecting Sprid adds no tracking. The public key inside your app does not work here.

## Click path (us.posthog.com or eu.posthog.com)

1. **Settings → Account → Personal API keys → Create personal API key**, named `Sprid <app name>`.
2. Under access, select **Projects** and choose your app’s project. Leave **All access** off.
3. Select **Query → Read** and **Project → Read**. Leave write access off.
4. Copy the key before closing the dialog and save it to a private file such as `~/keys/posthog-myapp.txt`. Use a separate key per app.

## Project id and host

- **Project id:** the number after `/project/` in your PostHog address, such as `12345`.
- **Host:** `eu` for `eu.posthog.com`, `us` for `us.posthog.com`, or your full self-hosted address, whichever you open the dashboard on.

## Then run

```sh
sprid connect posthog --app myapp --key ~/keys/posthog-myapp.txt --project 12345 --host eu
```

Use your own app slug, file path, project id and host. Add `--workspace <slug>` if needed. Keep the key out of chat.

## How to check it worked

Ask your agent: “Check that Sprid can read recent PostHog events for this app, and confirm the project is correct.” The check reports recent activity or explains why there is none; a saved connection alone does not prove events arrive.

## Metric definitions

In **Settings → Apps → your app → PostHog**, set the account-created event and the first UTC date from which tracking is complete.

| Metric | What counts |
|---|---|
| Registrations | First `sprid_signup` event per PostHog person, across all surfaces |
| New product users | First product activity, including anonymous people |
| Active product users | Distinct people with product activity in the period |
| Web visitors | Distinct pageview visitors on the saved website hostname, minus your product |

**Registrations.** Send `sprid_signup` from your server after the account is created, with the account id as `distinct_id`, and identify that id in your clients. Never fire it on login, page load or install. An existing `posthogEvents.signup` mapping also works; `posthogConfig.registration.event` wins over it. No matching event history reads as unavailable; history with no new registrations reads as zero. Periods before the tracking start are unavailable, and comparisons crossing it, or with no confirmed start, are withheld. Backfill with the original creation timestamps.

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

### Custom properties

Advanced rules go under **Custom properties**:

```json
{"registration":{"identity":{"scope":"event","property":"account_id"}},"app":{"kind":"web","hosts":["app.example.com"]},"exclude":[{"scope":"person","property":"staff","operator":"in","values":[true]}]}
```

- `app.kind` is `native`, `web` or `both`, with `app.hosts` and `app.pathPrefixes` saying where a web product lives. This is what the screen above writes.
- `app.filters` replaces the whole definition with your own rule; all filters must match. Choosing it shows as **Custom rules** on the screen, and the rule is subtracted from web visitors the same way.
- `exclude` removes matching traffic from every metric.
- `registration.filters` narrows the registration event, for example `result = success`.
- `registration.identity` defaults to `person_id`. A configured property must be present and should never change, because it counts accounts.
- Each rule takes `scope: event|person`, `operator: in|not_in` and string, number or boolean `values`. A missing property fails `in` and passes `not_in`. Property names are literal keys, dots included.

The same object is `posthogConfig` in REST `PATCH /api/app-profiles/:id`, MCP `upsert_app_profile` and the App Profile JSON used by `sprid init`, where `registration.event` and `registration.since` also live. No credentials or SQL belong in it. After saving, fetch Insights and check its registration notes and totals against your database before trusting a funnel.

## Review suspected automated traffic

Read [Check whether a traffic spike is real](https://sprid.studio/docs/traffic) (`sprid docs traffic`) before saving a rule: a spike or a shared fingerprint alone does not prove bots.

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
