# PostHog

**What Sprid does with this:** See how people use your app and where they stop.

## You need

Access to your app’s PostHog project and permission to create a **personal API key**. Your app must already send events to PostHog; connecting Sprid does not add tracking.

## Click path (us.posthog.com or eu.posthog.com)

1. In PostHog, open **Settings → Account → Personal API keys**.
2. Click **Create personal API key** and name it `Sprid <app name>`.
3. Under access, select **Projects** and choose your app’s project. Leave **All access** off.
4. Select **Query → Read** and **Project → Read**. Leave write access off.
5. Create the key, copy it before closing the dialog and save it to a private file such as `~/keys/posthog-myapp.txt`.

Create a separate key for each app. The public key used inside your app cannot be used for this connection.

## Project id and host

- **Project id:** the number after `/project/` in your PostHog address, such as `12345`.
- **Host:** `eu` for `eu.posthog.com`, `us` for `us.posthog.com`, or your full self-hosted address. Use the address where you open the dashboard.

## Then run

```sh
sprid connect posthog --app myapp --key ~/keys/posthog-myapp.txt --project 12345 --host eu
```

Replace `myapp` with your Sprid app slug and use your own file path, project id and host. Add `--workspace <slug>` if needed. Do not paste the key into chat.

## How to check it worked

Ask your agent: “Check that Sprid can read recent PostHog events for this app, and confirm the project is correct.”

A saved connection alone does not prove events are arriving. The check should report recent activity or explain why it is missing.

## Metric definitions

Open **Settings → Apps → your app → PostHog**. Set the account-created event
and the first UTC date from which tracking is complete. Defaults:

| Metric | What counts |
|---|---|
| Registrations | First `sprid_signup` event per PostHog person, across all surfaces |
| New app users | First native app activity, including anonymous people |
| Active app users | Distinct people with native activity during the period |
| Web visitors | Distinct website pageview visitors on the saved hostname |

Send `sprid_signup` from your server **after account creation**, with the account
id as `distinct_id`. Identify that same id in your clients. Never fire it on
login, page load or install. Existing `posthogEvents.signup` mappings work too;
`posthogConfig.registration.event` takes precedence. No matching event history
means unavailable; recorded history with no new registrations means zero.
Periods before the tracking start are unavailable. Comparisons crossing it are
withheld, as are comparisons without a confirmed start. Backfill using original creation timestamps.

Native defaults require `posthog-react-native` plus iOS/iPadOS/Android and reject
explicit web surfaces. Set `app_surface: 'web'` on Expo web and `'native'` on devices.
Web counts require a browser and exclude reported bots and crawler user agents.
Every metric excludes event/person `is_internal`, `is_test` and `sprid_test = true`.
These are observed identities, not a guarantee that every remaining visitor is human.

### Custom properties

Expand **Custom properties** for advanced rules. Example JSON:

```json
{"registration":{"identity":{"scope":"event","property":"account_id"}},"app":{"filters":[{"scope":"event","property":"client_type","operator":"in","values":["native"]}]},"exclude":[{"scope":"person","property":"staff","operator":"in","values":[true]}]}
```

`app.filters` replaces SDK/OS matching with your positive native rule. All app
filters must match. Each `exclude` rule removes matching traffic from all metrics.
`registration.filters` narrows the selected event (for example `result = success`).
Use `scope: event|person`, `operator: in|not_in` and string, number or boolean
`values`. Missing properties fail `in` and pass `not_in`. Property names are literal
keys, including dots. Registration identity defaults to `person_id`; a configured
identity property must be present. It counts accounts, so it should be immutable.

The same object is `posthogConfig` in REST `PATCH /api/app-profiles/:id`, MCP
`upsert_app_profile`, and the App Profile JSON used by `sprid init`. Add
`registration.event` and `registration.since` there; the form edits those separately.
No credentials or SQL belong in this object. Fetch Insights after saving and check
its registration notes and totals against your database before trusting a funnel.

## Review suspected automated traffic

Open **Web visitors → Review traffic exclusions**, or **Settings → Apps → your
app → PostHog → Review traffic**. Inspect a UTC date range, choose a traffic
group and preview its effect before saving. A spike or a shared device
fingerprint alone does not prove that visitors are bots. **How to tell a
scraper from an audience, and the traps in doing it, are in
[Check whether a traffic spike is real](https://sprid.studio/docs/traffic)**
(`sprid docs traffic`). Read that before saving a rule.

Saved exclusions apply by default to Sprid’s website totals, charts, breakdowns,
social attribution and weekly website counts, including the comparison period.
They are app-specific and date-bounded. All properties inside a rule must match;
matching any enabled rule excludes the event. Remaining visitors are counted
again as distinct people, never by subtracting overlapping group totals.
Native app activity and registrations are unchanged. **Restore this traffic**
disables a rule. Original PostHog data is never changed or deleted. Raw connected
queries and the marketing-review event inventory remain unfiltered evidence;
use Insights for the corrected website figures.

Agents use MCP `review_traffic`, or REST
`POST /api/app-profiles/:ref/traffic-review?workspaceId=…` with
`{"start":"2026-09-18","end":"2026-09-19"}`. End dates are exclusive, UTC;
review ranges are at most 31 days. An optional `exclusion` previews a rule
against this period and the one before it. Save approved rules through
`upsert_app_profile` or the profile PATCH route in
`posthogConfig.trafficExclusions`, preserving the other configuration. Sprid
records the last editor and update time. The vocabulary is provider-neutral;
currently only PostHog is supported.

## Social traffic and clip comparisons

Save the app’s website URL on its App Profile as well as the PostHog connection.
Insights compares completed-day website sessions with recorded social view gains.
Shared bio traffic stays at channel level; only a dedicated tagged link identifies
an individual publish. Older clips with metric activity remain candidates.

Copy stable bio links and dedicated clip links from Insights. Preserve
`utm_source`, `utm_medium`, `sprid_account` and, for dedicated links only,
`sprid_publish` through redirects. Never rotate the shared bio link to the newest
publish. The optional bio-page HTML export records selections separately and
keeps a direct app link. Host it on the saved website hostname, with your existing
PostHog initialization.

To capture store-link clicks and explicit website outcomes, include after the
site’s existing PostHog initialization:

```html
<script src="https://sprid.studio/sprid-attribution.js" defer></script>
```

This adapter uses your client and consent state; it sends nothing to Sprid.
Call `window.spridAttribution?.track('signup')` or `.track('activation')` only
after that action succeeds. Existing App Profile `posthogEvents.signup` and
`posthogEvents.activation` mappings are also accepted when the events share the
arriving website session. The adapter does not add tracking to a native app or
join website visits to purchases. A store click is not an install.

Missing outcomes stay unmeasured. Redirect-only flows need a pre-navigation
beacon; redirect events are counted separately from website sessions.
`get_insights` and `sprid insights` return the same evidence as the dashboard.

## If it fails

- **Access denied:** check the key is active, grants your project and has both Read permissions above. Reconnect with the corrected key file.
- **Project not found:** check the project number and host together. A US project needs the US host.
- **Connected but no events:** check the dates and project first. Then ask your agent to check whether your app’s tracking is sending events.

## Sources and verification

Setup and live data reads checked on 2026-09-09.

- [PostHog personal API keys](https://posthog.com/docs/api/personal-api-keys)
- [Project identity endpoint](https://posthog.com/docs/api/projects)
- [HogQL query endpoint](https://posthog.com/docs/api/query)
- [SDK and framework guides](https://posthog.com/docs/libraries)
- [React Native screen tracking](https://posthog.com/docs/libraries/react-native)
- [Identifying users](https://posthog.com/docs/product-analytics/identify)
- [Funnels](https://posthog.com/docs/product-analytics/funnels)

## Investigate with this connection

Your agent can use `list_marketing_queries` and `query_marketing_source` for `query`, `events`, `properties`. Discover the exact parameters and required setup with:

```sh
sprid marketing-review capabilities --app <slug> --source posthog --json
```

Project-pinned analytics. SQL is HogQL; inspect instrumentation before interpreting events. See [connected queries](https://sprid.studio/docs/queries) for the shared workflow. Extra operations may need additional read permissions; a stored key alone is not live verification.

Event-definition discovery additionally needs `event_definition:read`; property-definition discovery needs `property_definition:read`. Keep `query:read` and `project:read` for SQL and project verification. Restrict all of them to the saved project.
