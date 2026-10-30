# Review marketing from connected evidence

**What this guide does:** Review marketing and business outcomes for an app, shop or service through connected evidence, using its actual customer path and stating what remains unknown.

## Start with the question

Name the app, the date range and the decision the review should inform.

The App Profile selects the business; it does not require a mobile app. Reuse the saved goal, audience and customer path; investigate only missing or changed parts. For an app, use its meaningful-use and purchase definitions; for a shop, the product-page → checkout → paid-order path and relevant fulfillment/returns; for a service, qualified enquiry → paid delivery. These are examples, not compulsory funnels. Mark irrelevant metrics not applicable and relevant missing evidence unknown. Keep orders, items and people separate. Full method: [business context and outcomes](../../../references/review-to-action.md#1-follow-the-money-then-split-volume-from-rate).

1. `list_apps` and `list_app_profiles` to find the app.
2. Reuse complete context already returned by `get_marketing_plan`, `get_marketing_review_session` or a full review packet for this app. Otherwise call `get_marketing_review_context` for definitions, investigations, decisions and corrections. A compact summary is not complete context; keep the loaded revision until a reported change or conflict.
3. `get_marketing_review` for the app over two comparable periods. The summary links to full evidence per source (`view: "full", sources: [<source>]`); omit `sources` to include social history, store reviews and milestones.
4. Re-read an exact saved packet with `get_marketing_review_evidence` and its `evidence.id` (CLI: `sprid marketing-review evidence --id <id> --app <slug>`). It still works after a connection changes.

`refresh: true` queues background collection and joins work already running; it does not wait for providers. Inspect each source's `collection.state`, `retryAt` and `freshness.fetchedAt`, read again without `refresh` while it runs, and stop on completion, a reported failure or cooldown, or paused collection. Pending collection is not a broken connection. `cachedOnly: true` reads only stored evidence. Keep returned errors, coverage, population definitions and sample counts in the report.

In a browser chat there is no repository. Use available public pages and campaign/CMS history; ask for a change summary only when it would affect the decision and label it as supplied. Never claim to have read a repository or private database. Local users can add repo diffs and database reads through their own tools.

## Follow the evidence

`list_marketing_queries` lists supported reads and their schemas; `query_marketing_source` runs them with Sprid’s saved credentials. Follow pagination and keep truncation visible. `get_documentation` with `metrics` covers definitions and refused calculations; with `queries`, source-specific reads.

- Read the PostHog source's measurement `checks` before any rate. Each one (a platform whose paywall never sells, purchase events with suspect geography, concentrated traffic that needs investigation, possible store-review activity, a signup surface the registration event misses, a dead funnel entry) says a number cannot be read at face value. A platform at zero revenue is not zero demand until its paywall is known to sell.
- Store impressions by source are listing exposure; downloads by source are acquisition. Do not quote one as the other, and treat every store referrer as a last-click floor.
- Many email opens with no recorded clicks warrants checking both tracking and actual engagement; it does not establish either explanation.
- Keep acquisition apart from activation, and people apart from events. A post impression is not an install; a download is not an activated user.
- Read Pins as [Pinterest content and publishing](pinterest.md#measure-what-happened) describes. The `pinterest` source has `posts` only, with no comments.
- Compare equal windows and comparable populations.
- Missing events on the relevant path require a concrete measurement check or proposal; they do not supply an inferred funnel. App onboarding is relevant only when it exists.
- Keep revenue sources separate until the overlap check says they can be added.
- Payment totals do not supply a shop's order states or contribution costs, or a service's qualified leads. Use supported records or scoped exports where available and label unsupported connections. Do not invent profile fields or assume a commerce integration.

For each finding, test another explanation: tracking changes, traffic exclusions, attribution window, seasonality, a different audience mix. A before/after comparison doesn’t prove cause. If a difference is within normal variation or the sample is small, say so and don’t rank it.

## Report and save

Choose a concrete activity from the business evidence. Prepare further material only within the user's authorization. Match the deliverable to actual access: ready-to-review content, a supported CMS draft, a tested repo patch or a change brief with exact destination, proposed copy/behavior and verification. A needed checkout or product repair can outrank more content. Creating an external issue is a handoff; verify the actual delivery before following its effect.

Lead with the decision, then the evidence, the limits and what would change the answer. Keep failed reads apart from reads that returned nothing. Read `next_actions` once in scope, reusing a current result. Check [remaining setup](../../../references/setup-continuation.md#keep-setup-current) for gaps that affect the review or requested unfinished setup; do not restart completed identity/icon/voice work or repeat declined connections. A missing credential goes to the secure App Profile form or a CLI key-file command; no provider MCP is needed for a supported query.

- **Shared context:** when authorized, save selected non-secret goals, definitions, investigations, decisions, corrections and release references with `save_marketing_review_context`, merging with the context at `baseRevision`. If context is empty, derive the proposed summary from existing material and verify the saved result. Saving a review verdict does not save these fields. Accepted goals need no independent research; factual claims and definitions need rechecking when relevant changes, contradictory evidence or a recorded revisit condition call for it. Keep required investigations, and audit the pages and flows the packet's `context.dueSurfaces` lists even when their numbers did not move; record each with `update_review_surfaces` (`audited`, with the date and a one-line finding), and add or retire entries with `upsert` and `remove`. Keep the hypothesis ledger with `update_review_hypotheses`: the threshold and read date are set before a change ships, `context.dueReads` lists what is due. A conflict returns both versions; reconcile before retrying. CLI: `sprid marketing-review context --app <slug>` reads, `--file <context.json>` imports `{baseRevision,context}`. Private notes stay local.
- **Changes:** log confirmed product or marketing changes with `add_event`, naming the areas they affect and why.
- **The review itself:** end every review with `save_marketing_review {profile, verdict, agenda: [{id, title, why, status}], period: {start, end}, surface: "chat"}`: the commercial verdict in a sentence or two and the ranked agenda, most consequential first. It appears on the app’s Reviews page in Sprid and is where the next review starts; `list_marketing_reviews` reads past ones. Send the verdict and agenda only, never the full report or raw customer rows. Agenda items follow the [report contract](../../../references/marketing-review-report.md#one-ranked-agenda): reuse each item's `id` from the last review, and a refused save names the item and the exits it has. A second save the same day replaces that day’s review.

Never store secrets or signed attachment URLs in any of these.

## Collection and coverage

- Sprid refreshes two rolling 30-day windows daily for configured services on active plans, and re-reads late provider exports. No model calls, Apple report requests, publishing or paid social reads. Other windows are read on demand.
- Pause with the App Profile’s `metricsCollectionEnabled: false` or `sprid marketing-review collection --enabled false`. Stored evidence stays readable.
- Snapshots are private to the app, tied to its configuration and kept 90 days. Save local evidence exports for a lasting archive.
- Missing days stay unknown. Incomplete store or Search Console windows get no percentage change. Never sum daily unique people into a monthly count.
- `configuration_only` means identifiers and a key are saved, not that access works. Errors return a safe code, the HTTP status when known, whether to retry and the next step. Retry transient errors before recommending a reconnect. Unsupported metrics and provider privacy thresholds are stated as limits.
