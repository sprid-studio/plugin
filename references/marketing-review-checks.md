# Checks that keep a marketing review honest

## Choose services by the question

Start with the decision the user cannot make, then inventory the tools already in the repo and the authorized connections available to the agent. Check dependencies and emitting code as well as provider configuration; an absent Sprid sensor is not evidence that the customer lacks that capability. Reuse a working service before recommending another subscription or duplicate SDK.

| Missing answer | Capability and candidate sources |
|---|---|
| Which features are used, where onboarding stops, who returns? | Product events with identity and ordered funnels. Candidates include PostHog, Amplitude, Mixpanel, Google Analytics for Firebase, or an existing first-party event store. Verify the chosen read path supports the required cohorts. |
| Which acquisition sources bring people who get value? | Search/store acquisition reports plus website analytics and campaign handoffs. Search Console and GA4 answer different parts; join to product outcomes only when identities and coverage allow it. |
| What happens at an unexplained exit? | Existing session recordings or error/performance telemetry, matched to the relevant step and build. Clarity is a recording candidate; an existing error tracker may already explain a failure. Neither alone measures onboarding conversion. |
| Does use lead to payment or cancellation? | The customer’s billing system, such as an existing RevenueCat or Stripe connection, with product identity where available. Keep transaction truth and behavioral intent separate. |
| What do people ask for, and does follow-up bring them back? | Existing support/review data, search-miss or demand ledgers, and email/push delivery and click records. Verify subsequent product use; an opened email alone does not establish a return. |

These are examples, not a required stack or a declaration of Sprid support. If no suitable service exists, recommend a provider based on the app’s framework, the exact question and available read/export access, plus the user’s hosting/privacy and budget requirements. Verify current official documentation for a concrete recommendation. Sprid’s built-in connector is a convenience, not sufficient reason to pick a vendor. Recommend additional capabilities only when they would change a named decision; do not recommend every category.

## Record how the evidence can be read

For each relevant source, record capability, provider/project, access path, verified coverage and remaining gap in the existing marketing plan or report. Use these access distinctions:

- **Sprid connection:** verify the current guide/tool and a live read. Only claim dashboard or unattended-mail coverage that the server actually provides.
- **Agent-accessible source:** discover an available authorized provider tool, CLI or read-only API path and verify the project. Its data can support this review; an agent connection does not install a Sprid server connector.
- **Export or app records:** read available exports or durable records, retaining source, dates, identity definitions and limitations. If access is unavailable, state the exact missing read rather than recommending a vendor switch.

The automatic review packet covers its implemented collectors. Add other sources as explicitly cited supplemental evidence in the report; do not claim the runner collected them. Do not put another provider’s identifiers or event map into `posthogProjectId` or `posthogEvents`, invent `sprid connect <provider>` commands, or mark unsupported sources as connected. Keep credentials out of reports and use the provider’s authorized credential mechanism.

When a customer uses an unsupported service, capture the integration need alongside the report’s gap: provider, capability, required read, project identity, current workaround and whether unattended access is needed. Do not send a feature request or promise a connector release. Future adapters should preserve the same evidence contract (source/project, window and timezone, metric/identity definitions, coverage and error status); review rules and instrumentation checks remain shared across providers. This is an extension direction, not a generic connector API that exists today.

Candidate capabilities checked against official sources on 2026-09-10: [Amplitude product analytics](https://amplitude.com/docs/analytics/product-analytics), [Mixpanel product analytics](https://mixpanel.com/platform/product-analytics/), [Google Analytics for Firebase](https://firebase.google.com/docs/analytics/get-started), [GA4 reporting API](https://developers.google.com/analytics/devguides/reporting/data/v1), [Clarity recordings](https://learn.microsoft.com/en-gb/clarity/session-recordings/recordings-overview). Recheck SDK/platform support and read permissions at recommendation time.

## Instrumentation checks

Use the following checks against the customer's own implementation. The examples are illustrative; inspect emitting code and query fresh evidence before applying a diagnosis.

| Check | What to inspect |
|---|---|
| Track navigation centrally, then meaningful actions. | Router integration and successful action handlers. Distinguish tutorial activity from independently completed work. |
| Reconcile client events against durable records. | Account creation and completed-task records. A missing event alone cannot establish whether consent, blocking or a build caused the gap. |
| Choose activation from the value users get. | Actual product behavior, concentration by person and subsequent return. A reading app and an authoring app may need different activation definitions. |
| Trace properties through ingestion. | Client types, API validators, metadata allowlists and a stored row. Sending a property does not prove it was retained. |
| Separate signup origin from today's surface. | Account creation metadata and the resolved CTA destination after device-specific rewrites. A direct store click and a desktop modal are different paths. |
| Read product demand alongside acquisition. | Search misses, unfulfilled requests and inventory coverage, with source, identity and date coverage verified for each ledger. |

For an instrumentation change, compare behavior only inside verified coverage. Preserve old event ids and classify renamed routes/features across build boundaries. If a redesign makes an action compulsory or seeds it automatically, retire that action's old success threshold: an increase is built into the flow.

## Product identity and activation

- PostHog MCP project selection can drift. Switch to the profile’s project before each independent query and verify its id or known event taxonomy. A warning that a previously observed event does not exist is an identity failure, not zero activity. Prefer a REST URL containing the explicit project id. A 403 is an access gap; retries with rewritten SQL cannot fix it.
- `$lib = 'posthog-react-native'` can include Expo web. Verify whether `$app_version` distinguishes native builds in this app before using it as a surface filter. Keep server and unknown SDKs visible; do not silently discard them.
- Count distinct people, exclude internal accounts using verified identifiers, and state whether identities are accounts, RevenueCat ids, anonymous browsers or devices. Do not add daily unique counts and call the sum unique users.
- Read repeat use and cohort return behaviour before recommending acquisition spend. Sparse mature cohorts do not support a retention trend. Identify cohorts that have had time to return.
- Check meaningful exposure and resolved state. A mount event sent before data loads cannot establish that an empty screen was shown. Inspect server allowlists and stored properties before treating null metadata as “the user chose nothing.”

## Traffic and acquisition

- A JS beacon measures emitted beacons. Blockers suppress events; JS-capable crawlers can emit them. RUM is a sampled cross-check. A zone-http fallback includes bots and must be labelled for both periods.
- Report raw visitors and a filtered floor separately. Multiple pageviews or a click-driven event can strengthen the floor; neither proves all remaining people are human. One-page visitors include legitimate SEO readers.
- On an SEO-led site, cross-check apparent traffic changes against GSC clicks and a verified click-driven event. A crawler population leaving can reverse a raw visitor trend. A fixed percentage gap between vendors is not a universal anomaly threshold.
- A spike is judged, not assumed. Read [traffic spikes](https://sprid.studio/docs/traffic) before excluding anything, and check the COMPARISON period for the same fingerprint: a scraper in the baseline moves the percentage as far as one in the current period, and correcting only the obvious half reads as a confident answer while still being wrong.
- GSC date bounds are inclusive in Pacific time. Scripts convert the review’s exclusive end to the preceding calendar date. Inspect `dataThrough`; the last row with observations is not a promise of full coverage. Query/page lists omit anonymized searches and can be truncated. A query absent from a prior top-N list has unknown prior clicks, not zero.
- Downloads by Source Type × territory answer store acquisition. Impressions by source answer listing exposure. Do not interchange them. Both store referrers are last-click floors; a web reader searching the store later appears organic.
- Read an onboarding attribution question if the app has one, split by market and report its respondent count/skip coverage. It captures a different step from last-click attribution; do not turn a small respondent sample into a population percentage.
- Store search-term fields may be suppressed or empty. Inspect the returned coverage; do not spend the review hunting terms absent from the available export.
- Existing reviews may include demand investigations, such as unfulfilled searches or inventory gaps. Follow the repo's local investigation index and current instructions; rank recorded demand only when the sample supports it. These are app-specific extensions, not mandatory scripts for every customer.
- For a CTA change, join exposure to the resulting action for the same eligible population and actual path. Separate direct store links from modal paths, resolve destination after device rewrites, and check campaign/deep-link continuity through redirects. A queued capture may be lost when navigation happens immediately. A click does not establish an install or activation.

## Store coverage and money

- Check each store’s `dataThrough`, days covered and report status. Missing/suppressed history and observed zero are different. Do not diagnose the cause of an all-zero prior period without inspecting report instances and rows.
- Apple’s `processingDate` is when an instance was created, not the events’ date. Late-delivered batches may contain events from an earlier requested window. Paginate instances and segments and bucket by the row’s Date.
- Confirm store availability before explaining `pending` or `no-files` as reporting lag. An unreleased app has no acquisition funnel to diagnose.
- RevenueCat overview revenue has a fixed window; MRR and active trials are snapshots. Compare explicit-range chart values for historical revenue. State currency and minor/whole-unit conversion, and never add unlike currencies.
- Multiple rails can overlap: check Sprid’s per-source overlap result before adding RevenueCat to Stripe/Paddle. A failed rail leaves an incomplete total, not zero revenue. Web subscription MRR can be computed rather than equal to the provider dashboard.
- If RevenueCat MCP lacks aggregate tools, inspect available tools once, then use Sprid or a read-only DB query. Configuration tools do not establish revenue. A missing historical comparison is an honest result.

## Evidence and decisions

Every actionable claim needs its actual period, source/query, population and count. Attack the interpretation with a second query or independent source. Report disagreements instead of picking the number that fits the story. A code change preceding movement is a hypothesis until cohort, release and competing explanations have been checked.

Revisit the latest report’s recommendations and retractions. Keep “still open since” dates. A recommendation names what changes, the measured problem and the observation that would reverse it. Avoid numerical impact promises unsupported by an experiment.

Provider semantics checked for this implementation:
- [Google Search Analytics query](https://developers.google.com/webmaster-tools/v1/searchanalytics/query): date bounds, finalized data, top-row limits.
- [Apple data completeness](https://developer.apple.com/documentation/analytics-reports/data-completeness-corrections): delivery date versus event batches.
- [Cloudflare sampling](https://developers.cloudflare.com/analytics/graphql-api/sampling/): adaptive analytics sampling.

## Product instrumentation workflow

### Before connecting: can you measure product use?

Connecting Sprid gives it read access to events your app already sends. It does not install analytics or add events to your app.

Check the app’s analytics wrapper and its callers, navigation, onboarding and release configuration. Then check recent events in the intended provider project when access is available. Record connection status separately from event coverage; an installed SDK or a saved key proves neither delivery nor a measurable funnel. Before saying analytics is absent, check both dependencies/configuration and emitting code, including wrappers and server events. Without a live read, label delivery unverified.

| What you find | Recommendation |
|---|---|
| No product analytics | Recommend the capability first: screen and feature usage, ordered onboarding and return cohorts. Choose a provider that fits the app and the customer’s requirements; Sprid’s PostHog connection is one option. |
| Another provider already measures product use | Keep it. Use its available API or exports and the same coverage checks below; state when Sprid has no connector for it. Switching providers is not a prerequisite for a review. |
| Events arrive, but Sprid cannot read them | For PostHog, follow the [PostHog connection guide](../skills/connect/guides/posthog.md). For other providers, use a verified available tool/API or export and state whether unattended Sprid reads are supported. Keep the existing event names and project. |
| SDK or connection exists, but events are missing or incomplete | Check project, dates, deployed build and delivery first. Then name the missing screens or actions and their emitting files. |

Continue the marketing diagnosis with available evidence. Recommend measurement alongside distribution work; missing analytics does not block drafting or an otherwise authorized post. A review produces a concrete instrumentation recommendation. Implement app changes when that work is requested or already authorized; creating a provider account or enabling paid features needs its own authorization.

### Instrument the questions you need answered

Use the app’s existing event conventions. Inspect its SDK version and current official framework guide before proposing code. If analytics is absent, add the SDK through the app’s shared analytics layer. Check the production build receives its public ingestion token; keep the personal read key used by Sprid out of client code. Write the event contract in the repo’s existing analytics document, or in the marketing plan when this is only a recommendation. For each gap, name the question, event and properties, emitting file or hook, and verification query.

| Question | Coverage to add or verify |
|---|---|
| Which screens do people open? | One screen/page view per navigation transition through the shared router or supported SDK integration. Normalize dynamic routes and strip query values. Check existing automatic capture before adding manual events. |
| What do they actually use? | Meaningful feature actions emitted after success, with a stable feature/surface property. A screen view shows exposure; a saved item, completed analysis or read article needs its own success definition. |
| Where does onboarding stop? | Start, step viewed and step completed, with stable step id and flow version; record skips and explicit exits separately. Include the final completion and the first real value action. |
| Did they get value and return? | An app-specific activation event excluding tutorial/demo/seeded actions, followed by repeat meaningful use in a defined return window. Onboarding completion alone does not establish activation. |
| Does use lead to payment? | If monetized, distinguish paywall exposure, trial start and confirmed payment. Use a verified billing/server outcome for money and a joinable identity. |

Attach a stable pseudonymous user id after authentication and verify anonymous-to-identified continuity and logout reset. Distinguish native app, web app and marketing site explicitly, with app/build version, environment and relevant locale/market. Do not infer the surface from SDK name alone. Mark internal/test traffic and apply those exclusions in queries.

For long-running actions, record start and success/failure with a shared operation id and duration. Where the server owns signup or completion, emit after durable success, using the same identity and a deduplication rule if clients also emit. Respect the app’s consent and opt-out behavior on both paths. Keep private text and sensitive content out of event properties; use route templates, lengths or booleans where sufficient.

Check anonymous onboarding explicitly. A first-party endpoint requiring login cannot observe people who leave before signup; a buffer flushed only after login still misses those people. Use an appropriate anonymous analytics path within the app’s privacy choices, or report that coverage limit. When events are queued, keep their original occurrence time. Trace custom events through API validation and property allowlists to the stored row, since fields can disappear after a successful client capture.

For website-to-app flows, measure CTA exposure and clicks by placement and actual destination after device-specific rewrites. Keep signup origin distinct from current platform. Verify attribution survives redirects and the app lands on the intended content after onboarding. Separate direct mobile store links from modal funnels; verify events arrive when navigation happens immediately. Use a verified delivery mechanism for that redirect path rather than assuming an SDK queue survives departure.

Compute onboarding drop-off from ordered steps for the same eligible entrants within an explicit completion window. Optional branches are separate paths. Someone who has not yet had the full window is still pending. Closing an app may send no exit event, so infer non-completion after the window; do not rely on an `onboarding_abandoned` callback. Counts of unrelated stage audiences cannot supply this rate. Show people reaching each step, the denominator and elapsed time. Events can locate the loss; the reason remains a hypothesis.

### Verify instrumentation before using the numbers

Trace a test user through onboarding and a real feature action, then exit midway in another run. Inspect arrival in the intended project: ordered steps, success emitted once, consistent identity and surface/build properties, no private payload. Check a return session and logout/account switching where supported. Keep test users excluded from customer metrics.

Cross-check a server-owned outcome against its durable record when available. A database signup with no client events is a coverage gap; it does not establish why tracking failed. Confirm the deployed build sends the events, record the first verified build/date and preserve the old period’s coverage gap. New instrumentation cannot reconstruct missing history. Preserve old event ids and classify renamed routes/features across build boundaries. Revisit the metric when a redesign changes its meaning: making an action compulsory or seeding it invalidates the old success threshold. If production cannot be checked, report local verification separately and give the exact remaining live check.

### Which events matter

Keep the app’s actual activation, onboarding and purchase event names in `posthogEvents` on its App Profile and `.sprid/app.json`. Verify names against the app’s instrumentation. The initial event table is a diagnostic; conversion and retention require a cohort query with explicit identity rules and internal-user exclusions. A count of events is not a count of people.

## Reading connected analytics

For live checks, use `sprid marketing-review --app <slug> --days 7 --json`, or MCP `get_marketing_review` with `{ "profile": "<slug>", "days": 7 }`. `sprid status` and `marketing-review --check` confirm configuration only. Reports may contain one failed source beside working ones; inspect the source itself.

Check `sources.posthog.status` is `ready`, `sources.posthog.data.projectId` is the intended project, and inspect `rows`, `query` and `coverage`. Empty rows can mean no events in those dates; they do not prove an authentication failure.

For a specific activation or retention question, use `query_marketing_posthog` (CLI: `sprid marketing-review query --app myapp --query-file query.sql --json`). Credentials stay on Sprid.

Inspect `sources.revenue.data.sources`: the RevenueCat row must have `ok: true`. Check its `reading.notes` for partial reads and `reading.series` for its daily history. Another working revenue rail can make the aggregate available while RevenueCat itself fails, so check the individual row. Current overview totals can work even when Charts permission is missing.

Missing history is a data gap; never replace it with zero revenue. Current MRR and 28-day overview revenue are snapshots, not totals for the review’s dates.


Instrumentation sources checked 2026-09-10: [SDK integration](https://posthog.com/docs/libraries), [React Native navigation](https://posthog.com/docs/libraries/react-native), [identity](https://posthog.com/docs/product-analytics/identify), [funnels](https://posthog.com/docs/product-analytics/funnels).
