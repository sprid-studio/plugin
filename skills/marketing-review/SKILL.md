---
name: marketing-review
description: Review marketing and business results for apps, web shops, software and services. Compare connected evidence across periods, verify the customer path and outcome definitions, and recommend concrete work or measurement where evidence is missing. Use for marketing reviews, funnel analysis, campaign assessment or evaluating a delivered change.
---

# Marketing review [period]

Read [agent runtime](../../references/agent-runtime.md) for invocation and tool discovery, and run its [version check](../../references/agent-runtime.md#versions-at-the-start-of-a-job) once per session before anything else. Without a local repository or terminal, follow the [portable connected review](../post/guides/marketing-review.md), also available through `get_documentation` with `topic: "marketing-review"`. Label missing repository and private-database evidence explicitly; supported server reads require no CLI. The repo-specific workflow below applies in Codex or Claude Code, with the report in `marketing-reports/<YYYY-MM-DD>.md`.

## Resolve the app and its history

Read `.sprid/app.json`, repository instructions and the latest marketing report, including corrections. A profile with `enabled: false` or `review.enabled: false` is paused: stop before queries or report writes and give its reason.

For a migrated local review, preserve the event map, identity basis, exclusions and app-specific investigations. The importer accepts an explicit old mapping path, prints a preview by default and writes only the current repo’s profile with `--write`:

```sh
node "<plugin>/tools/migrate-review.mjs" --from <old-mapping.json> --app <slug>
```

It does not import keys, send anything to Sprid, or make inherited notes verified evidence. Existing local identifiers and event mappings win. If no mapping or profile exists, infer the non-secret identifiers from the repo as bootstrap does; do not make an existing customer redo their marketing strategy just to run a review.

Read [one marketing plan](../../references/guided-marketing.md), then load, reuse and save the shared context as the [portable review](../post/guides/marketing-review.md) describes (step 2 of “Start with the question”, and “Shared context” under “Report and save”). The CLI reads it with `sprid marketing-review context --app <slug> --json` and imports `{baseRevision,context}` with `--file <file.json>`. Preserve local-only notes and pause rules. Never upload the repository or raw customer rows as context. Locally, the surfaces to audit are `review.surfaces` in `.sprid/app.json` ([surface inventory](../../references/repository-review-sources.md#keep-a-surface-inventory)): audit the most overdue even when their numbers did not move.

Read the newest saved review with `list_marketing_reviews {profile}` or `sprid marketing-review history --app <slug>` and check whether its agenda shipped. Fetch evidence, receipts and refreshes as the portable review's steps 3 and 4 and “Collection and coverage” describe. The CLI equivalents are `sprid marketing-review --app <slug> --json` (full view by default, `--view summary` for the compact one) and `sprid marketing-review evidence --app <slug> --id <id>`. Retain local exports beyond server retention.

Sprid supplies every connected sensor and stored post performance; local provider reads are fallbacks only. Use `get_app_profile` for identifier reconciliation. Resolve the workspace explicitly when necessary (`workspace` in the local profile or `--workspace`). Resolve a social account using `accountId`, then a same-workspace slug; an app's publishing account may have a different name or a market suffix.

Keep local `review` settings when reconciling profiles. Do not replace the file with a server response: it cannot carry local pause flags, query notes or investigation paths. An empty server `posthogEvents` map must not erase a populated local one. Use `sprid init` to sync verified profile fields when profile updates are authorized; local review settings remain local.

## Define the periods and collect evidence

Use the saved business goal, payment model and relevant customer path; fill only missing or changed parts using [business context and outcomes](../../references/review-to-action.md#1-follow-the-money-then-split-volume-from-rate). App installs, paywalls and renewals apply only where those steps exist; shops may need paid orders and returns, services qualified enquiries and paid delivery. Keep irrelevant metrics separate from relevant but unavailable evidence. App Profile and `--app` remain the existing selectors; no repository or mobile listing is required for the portable review.

Default: the last 30 complete calendar days, ending at today’s date, exclusive. Use the preceding equal window. `--since YYYY-MM-DD` and `--end YYYY-MM-DD` support custom windows. Preserve provider timezones: GSC uses Pacific dates, and PostHog uses its project timezone. Do not describe these as identical UTC cohorts.

```sh
node "<plugin>/tools/review.mjs" --check
node "<plugin>/tools/review.mjs" --days 30
# or --since 2026-08-01 --end 2026-09-01
```

The runner calls Sprid first using the CLI’s existing login. Sources marked ready come from Sprid without opening local provider keys. It runs local collectors only for unavailable/failed sources, records both outcomes, adds git history, and saves a JSON evidence packet. ASC and Play fallbacks run separately so one missing leg does not repeat the connected leg. `SPRID_CLI=/absolute/path/to/bin.mjs` selects a development CLI. The packet is the starting evidence, not the finished review. Check every source’s nested status and coverage, even when the process succeeded. Store and GSC comparisons with missing observed dates withhold percentage changes; do not reconstruct those deltas from incomplete totals. Use explicit matched periods in a targeted follow-up. `diagnostic.code`, `httpStatus` and `retryable` distinguish permissions from transient failures; reconnect only when evidence supports a credential problem.

The server packet includes `sources`, `social.publishes` with per-post metrics, the current publishing queue/channel health, stored reviews and milestones. Read that distribution evidence before proposing more content: drafted supply, scheduled posts, failed publishes and measured results answer different questions. Missing social-account linkage does not block the sensors. Each publish’s metrics are cumulative as sampled before the requested end, except Pinterest, whose Pin metrics are dated daily activity summed to the end with observed-day coverage; compare post ages before declaring a format winner. A null metrics row is unmeasured, not zero performance.

For Pinterest, read Pins as [Measure what happened](../post/guides/pinterest.md#measure-what-happened) describes. The connected `pinterest` source has a `posts` operation only, and per-Pin live results come from `get_pinterest_metrics`. Do not turn rolling API windows into lifetime totals or present platform, account or competitor benchmarks without Pinterest’s written permission.

When present, use the packet’s `dataset` for validated calculations. Each observation names its definition, window, scope and quality; `results` either supplies a calculated value or a `blocked` reason. Follow [metric evidence](../../references/metric-evidence.md) before combining sources. A blocked total does not invalidate the available source readings. Keep investigating through custom queries, but do not turn their `investigative` metadata into a verified population join by relabeling it.

`--refresh` is the CLI's `refresh: true`; poll it as the portable review describes and continue independent repo analysis meanwhile. Never bypass a collection cooldown with local provider reads. Saved values during a refresh retain their original date, and `get_insights` exposes the same progress in `refresh.sources`.

If the CLI is unavailable but MCP is connected, call `get_marketing_review` directly and use its packet. If the installed server has not shipped this verb yet, use `get_insights` plus publishing/metrics reads, and name the reduced coverage. Use the same explicit dates on every read; never splice a rolling-window delta into a different calendar comparison.
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

Read [review checks](../../references/marketing-review-checks.md) before interpreting the packet, starting with the PostHog source's measurement `checks`: each one says a number in this review cannot be read at face value. It carries the project drift, activation, bot, attribution and revenue checks relevant to interpreting the returned evidence.

Assess measurement coverage even when PostHog is connected. Follow [the shared instrumentation guide](../../references/marketing-review-checks.md#product-instrumentation-workflow): distinguish no provider, inaccessible data, failed delivery and missing events. Inspect the business's relevant steps through purchase and delivered value. Use emitting code when accessible; otherwise check available event definitions, CMS or commerce records and controlled observations. Reuse working analytics through available reads or exports; disclose unsupported integrations and unverifiable steps.

When coverage is missing, recommend exact events/properties, the emitting files if known or the responsible system, and a verification query or check. `/sprid:measurement` carries that recommendation out as a tracking plan with verified events. Explain which business question each change makes answerable. Follow [service selection and access](../../references/marketing-review-checks.md#choose-services-by-the-question), including billing, reliability or feedback sources when the question requires them. Reuse a working provider; otherwise recommend the capability and a suitable service. Cite supplemental tool reads or exports separately from the automatic packet and record unsupported-connector needs without inventing profile fields or commands. Do not end at “connect PostHog” or “data unavailable.” Continue the review with the sources that work; unknown drop-off stays unknown. A review alone does not authorize implementing instrumentation. Record its verified release boundary when it does ship and revisit the gap in the next report.

PostHog’s local pull pins every request to the profile’s project id. It returns per-event people split by surface, and the exact query. Those counts are a diagnostic, not an ordered conversion funnel. Use `query_marketing_posthog {profile, workspace, query}` or `sprid marketing-review query --app <slug> --query-file <query.sql>` for cohorts, internal exclusions, return behaviour, market splits and the app’s actual activation definition. These follow-ups use Sprid’s stored key and pin the project again. Use a direct provider MCP/REST query only when that source is not connected on Sprid. If using a stateful MCP, switch and verify the project before each query; do not batch project switches.

RevenueCat: prefer Sprid’s revenue block or available aggregate MCP tools. The overview is a current snapshot with a fixed revenue window, not historical period-over-period data. Use explicit-range revenue/chart tools for revenue, trials, paid conversion, churn and retention. If those are unavailable, query the app’s purchase records or subscription tables read-only, with their coverage stated. Account for every configured web revenue rail and check overlap before adding totals.

Read available diffs or CMS/campaign change records, current pages and delivery evidence for changes in either period. A commit, draft or completed issue alone does not prove a change reached customers. Verify the latest report’s recommendations against the delivered product or offer and live distribution; carry unresolved recommendations with their original dates. Reconcile the hypothesis ledger with what shipped and escalate anything carried twice, as the [report contract](../../references/marketing-review-report.md) describes.

Read app-specific `review` settings and referenced investigations using [repository review sources](../../references/repository-review-sources.md). Complete each enabled investigation or name its coverage gap in the report. A demand ledger, lifecycle-email analysis, attribution question, acquisition DB or retention query used in earlier reviews remains part of coverage after migration. If an existing app has no inventory yet, discover it from the repo and earlier reports during this review; do not require another bootstrap. Re-check inherited metric definitions against the instrumentation; never silently substitute an easier event.

## Turn the diagnosis into an activity

Use [from diagnosis to an activity](../../references/review-to-action.md), sections 2 to 8, once the headline movements are explained. Split the relevant segment's volume from its rates, investigate competing causes and check previous work. Select a concrete activity from the evidence, with audience, assets, destination, outcome, baseline and next observation; leave unavailable counts or dates unknown. Rank by the business problem and evidence, including product or checkout repairs when needed. Name delivery dependencies instead of automatically ranking release-dependent work last.

Match the deliverable to actual access: finished content, a CMS draft, a tested repo patch or a complete handoff to another executor. A review alone prepares its recommendation; further work follows the user's existing authorization. A missing code connection does not justify replacing a necessary repair with more content. Use supported action tools when saving authorized work, and distinguish a prepared artifact, an external handoff, verified delivery and later effect.

## Write and finish

Follow [the business report contract](../../references/marketing-review-report.md). Lead with the commercial verdict, a compact scorecard and one ranked agenda spanning marketing, revenue and product value. Inspect actual pages and distribution, challenge the current strategy and revisit the dated hypothesis ledger. Keep required revenue and app-specific investigations in this review. Measurement fixes earn priority through the decisions they enable.

Record definitions, joined-cohort rates, period coverage and exact evidence in the appendix. Missing metrics stay missing. Distinguish raw audience, filtered floors and verified actions; test findings against a competing explanation. The final response must deliver the verdict, consequential movements and recommendations inline, with a compact measured chart when useful, then link the full report. A completion notice alone is insufficient.

Save the review to Sprid once the report is written, so the app's Reviews page, the Monday mail and the next review start from it. Send the verdict and the ranked agenda only; the report and evidence stay in the repo:

```sh
sprid marketing-review save --app <slug> --file <review.json>
# {"verdict": "...", "agenda": [{"id": "save-test", "title": "...", "why": "...", "status": "carried"}], "period": {"start": "YYYY-MM-DD", "end": "YYYY-MM-DD"}, "reportPath": "marketing-reports/<YYYY-MM-DD>.md"}
```

Over MCP: `save_marketing_review {profile, verdict, agenda, period, reportPath, surface: "repo"}`. Agenda items carry `id` and `status` as the [report contract](../../references/marketing-review-report.md#one-ranked-agenda) describes; a refused save names the item and the exits it has. Save the hypothesis ledger with `update_review_hypotheses` and surface audits with `update_review_surfaces` in the same run. A same-day re-run replaces that day's saved review, matching the corrected report. Write the JSON to a scratch location, not the repo. A paused profile saves nothing.

Keep same-day corrections when a report already exists; never overwrite them with an unqualified re-run. Evidence packets can include commercial analytics: keep them local unless sharing was requested, and keep a short index rather than copying raw outputs into product documentation.

After delivering the business brief and report path, read `next_actions` once in scope, reusing a current result from this run. Follow [keep setup current](../../references/setup-continuation.md#keep-setup-current) for returned gaps that affect the work or unfinished setup the user requested. Do not restart identity/icon/voice discovery for completed setup or repeat explicitly declined connections. Otherwise follow agent runtime’s account/CLI handoff when the user wants connected results or the weekly email; a local review must still be delivered with its data gaps. Reading/reviewing does not authorize publishing, paid generation, store changes or external writes. If a separately authorized growth change ships, record an `add_event` with its actual `areas` and `why`.
