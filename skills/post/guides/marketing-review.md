# Review marketing from connected evidence

**What this guide does:** Investigate acquisition, activation, retention and revenue through Sprid-held connections, with an explicit account of missing evidence when no repository is available.

## Start with the decision

Name the app, date range and question. Use `list_apps` and `list_app_profiles` to resolve identity. Read `get_marketing_review_context` for shared definitions, required investigations, prior decisions and corrections. Read `get_marketing_review` for the selected app and two comparable periods. Its default summary links to `view: "full", sources: [<source>]` evidence; omit `sources` to include social history, store reviews and milestones. Exact-window snapshots retain collection time. Read the exact saved packet through `get_marketing_review_evidence` with its `evidence.id`, or `sprid marketing-review evidence --id <id> --app <slug>`, even after a connection changes. `refresh: true` requests live reads; `cachedOnly: true` reads stored evidence only. Daily collection covers configured services on active plans, without model calls, publishing or paid social reads. Pause through the App Profile's `metricsCollectionEnabled: false` or `sprid marketing-review collection --enabled false`. Stored evidence remains readable. A configuration check does not verify provider access. Preserve returned errors, coverage, population definitions and sample counts.

In a browser chat, ask for a release summary or public changelog when the question concerns a shipped change. Label it supplied evidence. Do not claim to have inspected a repository or private app database. Local users can add repo diffs and measured database reads through their own authorized tools.

## Follow the evidence

Use `list_marketing_queries` to discover supported operations and their schemas; `query_marketing_source` executes those reads through Sprid-held credentials. Follow pagination and keep truncation visible. Read `get_documentation` with `topic: "metrics"` for definitions and refused calculations, and `topic: "queries"` for source-specific queries.

Separate acquisition from activation and people from events. Compare equal date windows and comparable populations. A post impression is not an app install; a download is not an activated user. Missing onboarding events require an instrumentation recommendation, not a guessed funnel. Keep revenue rails separate until the overlap check supports adding them.

For each finding, test an alternative explanation: changed tracking, traffic exclusions, attribution window, seasonality or a different audience mix. Observational before/after changes do not establish causality. If a difference is within normal variation or the sample is too small, say so and avoid ranking it as a result.

## Keep the review portable

Save selected non-secret definitions, investigations, decisions, corrections and release references through `save_marketing_review_context` when sharing context is authorized. Send `baseRevision` from the latest read. A conflict returns both proposals; reconcile before retrying. Stored context is an assertion with references, not independent verification. CLI parity: `marketing-review context --app <slug>` reads, `--file <context.json>` imports `{baseRevision,context}`. Keep local private notes local.

Use `add_event` for confirmed product or marketing changes with the relevant areas and why. Save a completed review as an app-scoped `kind: "note"` event: label the review date and keep its conclusion, evidence references, coverage and next hypothesis in `meta`. Retrieve it through `list_events` in another client. `log_reflection` is specifically for a post's supplied performance statistics. Store no secrets or signed attachment URLs in either record.

Report the decision first, then the evidence, limitations and the observation that would change it. Keep failed provider reads separate from successful empty data. Read `next_actions` for the relevant shared follow-up. A missing credential goes to the secure App Profile form or CLI key-file command; no provider MCP installation is required for a supported Sprid query.

## Collection and coverage

The scheduler refreshes two rolling 30-day windows daily and re-reads late provider exports. Snapshots are private, app-scoped, configuration-bound and retained for 90 days; local evidence exports remain the durable report archive. Other windows are collected on demand. Missing days stay unknown, and incomplete store/GSC windows withhold percentage changes. Daily unique people must never be summed into a monthly population. Snapshot collection does not make unequal cohorts comparable or establish that a product change caused an outcome.

A `configuration_only` result proves saved identifiers and key presence, not access. Diagnostics return a safe code, HTTP status when known, retryability and an operation-specific next step. Retry transient errors before recommending reconnection. Unsupported metrics and provider privacy thresholds remain explicit investigation limits.
