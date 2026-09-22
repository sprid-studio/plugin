---
name: marketing-review
description: Review an app’s marketing and growth against shipped changes. Compare local and Sprid analytics across two periods, verify acquisition and activation definitions, and recommend instrumentation where usage or onboarding drop-off is unmeasurable. Use for marketing reviews, funnel analysis, or assessing a shipped change’s growth results.
---

# Marketing review [period]

Read [agent runtime](../../references/agent-runtime.md) for invocation and tool discovery. Without a local repository or terminal, follow the [portable connected review](../post/guides/marketing-review.md), also available through `get_documentation` with `topic: "marketing-review"`. Label missing repository and private-database evidence explicitly; supported server reads require no CLI. The repo-specific workflow below applies in Codex or Claude Code, with the report in `marketing-reports/<YYYY-MM-DD>.md`.

## Resolve the app and its history

Read `.sprid/app.json`, repository instructions and the latest marketing report, including corrections. A profile with `enabled: false` or `review.enabled: false` is paused: stop before queries or report writes and give its reason.

For a migrated local review, preserve the event map, identity basis, exclusions and app-specific investigations. The importer accepts an explicit old mapping path, prints a preview by default and writes only the current repo’s profile with `--write`:

```sh
node "<plugin>/tools/migrate-review.mjs" --from <old-mapping.json> --app <slug>
```

It does not import keys, send anything to Sprid, or make inherited notes verified evidence. Existing local identifiers and event mappings win. If no mapping or profile exists, infer the non-secret identifiers from the repo as bootstrap does; do not make an existing customer redo their marketing strategy just to run a review.

Read [one marketing plan](../../references/guided-marketing.md), then read shared review context with `get_marketing_review_context` or `sprid marketing-review context --app <slug> --json` when supported. Reconcile definitions, required investigations, decisions and corrections against local evidence. A stored assertion is not a verified fact; deployment, store release and first-observed dates remain distinct. Preserve local-only notes and pause rules. When saving shared context is authorized, explicitly select non-secret context and use `save_marketing_review_context` with `baseRevision`; resolve conflicts without discarding either proposal. The equivalent CLI imports `{baseRevision,context}` with `marketing-review context --file <file.json>`. Never upload the repository or raw customer rows as context.

Start with `get_marketing_review {profile: <slug>, workspace, days, end}` or `sprid marketing-review --app <slug> --json`. MCP defaults to a compact summary. Fetch `view: "full", sources: [<source>]` for each needed evidence packet; omit `sources` for social history, reviews and milestones. CLI retains the full default and supports `--view summary`. Retrieve immutable receipts with `get_marketing_review_evidence {profile, evidenceId}` or `sprid marketing-review evidence --app <slug> --id <id>`; retain local exports beyond server retention. Daily collection refreshes configured services on active plans; packets name actual `freshness.fetchedAt` and cache state. `refresh: true` forces a live read; `cachedOnly: true` never calls providers. Pausing daily collection (`metricsCollectionEnabled: false`) preserves readable evidence. Collection creates no Apple report requests, model calls or paid social metric reads.

Sprid supplies every connected sensor and stored post performance; local provider reads are fallbacks only. Use `get_app_profile` for identifier reconciliation. Resolve the workspace explicitly when necessary (`workspace` in the local profile or `--workspace`). Resolve a social account using `accountId`, then a same-workspace slug; an app's publishing account may have a different name or a market suffix.

Keep local `review` settings when reconciling profiles. Do not replace the file with a server response: it cannot carry local pause flags, query notes or investigation paths. An empty server `posthogEvents` map must not erase a populated local one. Use `sprid init` to sync verified profile fields when profile updates are authorized; local review settings remain local.

## Define the periods and collect evidence

Default: the last 30 complete calendar days, ending at today’s date, exclusive. Use the preceding equal window. `--since YYYY-MM-DD` and `--end YYYY-MM-DD` support custom windows. Preserve provider timezones: GSC uses Pacific dates, and PostHog uses its project timezone. Do not describe these as identical UTC cohorts.

```sh
node "<plugin>/tools/review.mjs" --check
node "<plugin>/tools/review.mjs" --days 30
# or --since 2026-08-01 --end 2026-09-01
```

The runner calls Sprid first using the CLI’s existing login. Sources marked ready come from Sprid without opening local provider keys. It runs local collectors only for unavailable/failed sources, records both outcomes, adds git history, and saves a JSON evidence packet. ASC and Play fallbacks run separately so one missing leg does not repeat the connected leg. `SPRID_CLI=/absolute/path/to/bin.mjs` selects a development CLI. The packet is the starting evidence, not the finished review. Check every source’s nested status and coverage, even when the process succeeded. Store and GSC comparisons with missing observed dates withhold percentage changes; do not reconstruct those deltas from incomplete totals. Use explicit matched periods in a targeted follow-up. `diagnostic.code`, `httpStatus` and `retryable` distinguish permissions from transient failures; reconnect only when evidence supports a credential problem.

The server packet includes `sources`, `social.publishes` with per-post metrics, the current publishing queue/channel health, stored reviews and milestones. Read that distribution evidence before proposing more content: drafted supply, scheduled posts, failed publishes and measured results answer different questions. Missing social-account linkage does not block the sensors. Each publish’s metrics are cumulative as sampled before the requested end; compare post ages before declaring a format winner. A null metrics row is unmeasured, not zero performance.

For Pinterest, read [Pinterest content and publishing](../post/guides/pinterest.md). Keep impressions, saves, Pin clicks and outbound clicks separate; compare Pins at equal ages because useful Pins can resurface long after publication. Rank acquisition work by qualified visits and activation, using saves as a diagnostic. Do not turn rolling API windows into lifetime totals or present platform, account or competitor benchmarks without Pinterest’s written permission.

When present, use the packet’s `dataset` for validated calculations. Each observation names its definition, window, scope and quality; `results` either supplies a calculated value or a `blocked` reason. Follow [metric evidence](../../references/metric-evidence.md) before combining sources. A blocked total does not invalidate the available source readings. Keep investigating through custom queries, but do not turn their `investigative` metadata into a verified population join by relabeling it.

Sprid reads saved evidence and queues missing or expired sources. `refresh=true` (CLI `--refresh`) requests background collection and joins existing work; it does not wait for providers. Inspect each source's `collection.state`, `retryAt` and `freshness.fetchedAt`. While queued/running, continue independent repo analysis and read again without `refresh`; stop polling on completion, a reported failure/cooldown, or paused collection. Never treat pending collection as a broken connection or bypass its cooldown with local provider reads. Saved values during a refresh retain their original date. Dashboard `get_insights` exposes the same progress in `refresh.sources`.

If the CLI is unavailable but MCP is connected, call `get_marketing_review` directly and use its packet. If the installed server has not shipped this verb yet, use `get_insights` plus publishing/metrics reads, and name the reduced coverage. Dashboard Insights uses rolling 7/30/90-day windows; never splice those deltas into an explicit calendar comparison.
Local scripts read `~/.sprid/secrets/<slug>.json` themselves; never print it. `SPRID_SECRETS_FILE` selects an explicit alternative. Keys connected on Sprid are not downloadable local keys. A missing local key does not mean the source is disconnected on the server. Use the available server or MCP read before declaring a gap. Do not reconnect a working source just because one transport is absent.

Individual pulls remain available for investigations:

```sh
node "<plugin>/tools/gsc.mjs" --days 30 --pages 10000
node "<plugin>/tools/cf-analytics.mjs" --days 30
node "<plugin>/tools/store.mjs" --days 30
node "<plugin>/tools/posthog.mjs" --days 30
```

ASC reads existing report requests by default. If none exists, record that gap; `--request-reports` enables generation only with authorization for that external change. A pending report is not zero downloads.

## Complete the analysis

Read [connected investigations](../../references/connected-queries.md) before custom follow-ups. Call `list_marketing_queries` for the App Profile, then `query_marketing_source` with a discovered source, operation and parameters. These reads use Sprid-held credentials across the supported connectors; provider MCP setup in this repo is optional. Keep following questions after the first report, and preserve corrections. The reference covers ordered funnels, fixed return windows, login/CTA checks and content-demand joins.

Read [review checks](../../references/marketing-review-checks.md) before interpreting the packet. It carries the project drift, activation, bot, attribution and revenue checks that survived the local review workflow.

Assess measurement coverage even when PostHog is connected. Follow [the shared instrumentation guide](../../references/marketing-review-checks.md#product-instrumentation-workflow): distinguish no provider, inaccessible data, failed delivery and missing events. Inspect emitting code for screen views, meaningful feature use and onboarding steps through real activation. Reuse another working analytics provider through its available reads or exports; disclose any missing Sprid integration.

When coverage is missing, recommend the exact events/properties, emitting files and verification query in this report. Explain which product question each change makes answerable. Follow [service selection and access](../../references/marketing-review-checks.md#choose-services-by-the-question), including billing, reliability or feedback sources when the question requires them. Reuse a working provider; otherwise recommend the capability and a suitable service. Cite supplemental tool reads or exports separately from the automatic packet and record unsupported-connector needs without inventing profile fields or commands. Do not end at “connect PostHog” or “data unavailable.” Continue the review with the sources that work; unknown drop-off stays unknown. A review alone does not authorize implementing instrumentation. Record its verified release boundary when it does ship and revisit the gap in the next report.

PostHog’s local pull pins every request to the profile’s project id. It returns per-event people split by surface, and the exact query. Those counts are a diagnostic, not an ordered conversion funnel. Use `query_marketing_posthog {profile, workspace, query}` or `sprid marketing-review query --app <slug> --query-file <query.sql>` for cohorts, internal exclusions, return behaviour, market splits and the app’s actual activation definition. These follow-ups use Sprid’s stored key and pin the project again. Use a direct provider MCP/REST query only when that source is not connected on Sprid. If using a stateful MCP, switch and verify the project before each query; do not batch project switches.

RevenueCat: prefer Sprid’s revenue block or available aggregate MCP tools. The overview is a current snapshot with a fixed revenue window, not historical period-over-period data. Use explicit-range revenue/chart tools for revenue, trials, paid conversion, churn and retention. If those are unavailable, query the app’s purchase records or subscription tables read-only, with their coverage stated. Account for every configured web revenue rail and check overlap before adding totals.

Read actual diffs, current listing/landing copy and release evidence for changes in either period. A git commit alone does not prove a release reached customers. Verify the latest report’s recommendations against shipped code and live distribution; carry unresolved recommendations with their original dates.

Read app-specific `review` settings and referenced investigations using [repository review sources](../../references/repository-review-sources.md). Complete each enabled investigation or name its coverage gap in the report. A demand ledger, lifecycle-email analysis, attribution question, acquisition DB or retention query used in earlier reviews remains part of coverage after migration. If an existing app has no inventory yet, discover it from the repo and earlier reports during this review; do not require another bootstrap. Re-check inherited metric definitions against the instrumentation; never silently substitute an easier event.

## Write and finish

Follow [the business report contract](../../references/marketing-review-report.md). Lead with the commercial verdict, a compact scorecard and one ranked agenda spanning marketing, revenue and product value. Inspect actual pages and distribution, challenge the current strategy and revisit the dated hypothesis ledger. Keep required revenue and app-specific investigations in this review. Measurement fixes earn priority through the decisions they enable.

Record definitions, joined-cohort rates, period coverage and exact evidence in the appendix. Missing metrics stay missing. Distinguish raw audience, filtered floors and verified actions; test findings against a competing explanation. The final response must deliver the verdict, consequential movements and recommendations inline, with a compact measured chart when useful, then link the full report. A completion notice alone is insufficient.

Keep same-day corrections when a report already exists; never overwrite them with an unqualified re-run. Evidence packets can include commercial analytics: keep them local unless sharing was requested, and keep a short index rather than copying raw outputs into product documentation.

After delivering the business brief and report path, call `next_actions` when connected, but show only actions relevant to the user’s current review. Otherwise follow agent runtime’s account/CLI handoff when the user wants connected results or the weekly email; a local review must still be delivered with its data gaps. Do not use `log_reflection` for a marketing report: that tool requires a post and performance statistics. Reading/reviewing does not authorize publishing, paid generation, store changes or external writes. If a separately authorized growth change ships, record an `add_event` with its actual `areas` and `why`.
