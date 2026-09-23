# Review marketing from connected evidence

**What this guide does:** Investigate acquisition, activation, retention and revenue through the services connected to Sprid, and say plainly what evidence is missing.

## Start with the question

Name the app, the date range and the decision the review should inform.

1. `list_apps` and `list_app_profiles` to find the app.
2. `get_marketing_review_context` for shared definitions, required investigations, earlier decisions and corrections.
3. `get_marketing_review` for the app over two comparable periods. The summary links to full evidence per source (`view: "full", sources: [<source>]`); omit `sources` to include social history, store reviews and milestones.
4. Re-read an exact saved packet with `get_marketing_review_evidence` and its `evidence.id` (CLI: `sprid marketing-review evidence --id <id> --app <slug>`). It still works after a connection changes.

`refresh: true` asks for live reads; `cachedOnly: true` reads only stored evidence. Keep returned errors, coverage, population definitions and sample counts in the report.

In a browser chat there is no repository. For a question about a shipped change, ask for a release summary or public changelog and label it as supplied. Never claim to have read a repository or private database. Local users can add repo diffs and database reads through their own tools.

## Follow the evidence

`list_marketing_queries` lists supported reads and their schemas; `query_marketing_source` runs them with Sprid’s saved credentials. Follow pagination and keep truncation visible. `get_documentation` with `metrics` covers definitions and refused calculations; with `queries`, source-specific reads.

- Keep acquisition apart from activation, and people apart from events. A post impression is not an install; a download is not an activated user.
- Compare equal windows and comparable populations.
- No onboarding events means recommending instrumentation, not guessing a funnel.
- Keep revenue sources separate until the overlap check says they can be added.

For each finding, test another explanation: tracking changes, traffic exclusions, attribution window, seasonality, a different audience mix. A before/after comparison doesn’t prove cause. If a difference is within normal variation or the sample is small, say so and don’t rank it.

## Report and save

Lead with the decision, then the evidence, the limits and what would change the answer. Keep failed reads apart from reads that returned nothing. `next_actions` gives the follow-up. A missing credential goes to the secure App Profile form or a CLI key-file command; no provider MCP is needed for a supported query.

- **Shared context:** when authorized, save non-secret definitions, investigations, decisions, corrections and release references with `save_marketing_review_context`, sending `baseRevision` from the latest read. A conflict returns both versions; reconcile before retrying. Saved context is a claim with references, not verification. CLI: `sprid marketing-review context --app <slug>` reads, `--file <context.json>` imports `{baseRevision,context}`. Private notes stay local.
- **Changes:** log confirmed product or marketing changes with `add_event`, naming the areas they affect and why.
- **The review itself:** save it as an app-scoped `kind: "note"` event with the date, conclusion, evidence references, coverage and next hypothesis in `meta`. Other clients read it with `list_events`.

Never store secrets or signed attachment URLs in any of these.

## Collection and coverage

- Sprid refreshes two rolling 30-day windows daily for configured services on active plans, and re-reads late provider exports. No model calls, publishing or paid social reads. Other windows are read on demand.
- Pause with the App Profile’s `metricsCollectionEnabled: false` or `sprid marketing-review collection --enabled false`. Stored evidence stays readable.
- Snapshots are private to the app, tied to its configuration and kept 90 days. Save local evidence exports for a lasting archive.
- Missing days stay unknown. Incomplete store or Search Console windows get no percentage change. Never sum daily unique people into a monthly count.
- `configuration_only` means identifiers and a key are saved, not that access works. Errors return a safe code, the HTTP status when known, whether to retry and the next step. Retry transient errors before recommending a reconnect. Unsupported metrics and provider privacy thresholds are stated as limits.
