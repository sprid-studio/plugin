# Deliver a business review

The review answers: are we reaching the right people, delivering value and building a sustainable business, and what should change? Analytics checks support that judgment. Do not let an easy-to-prove instrumentation defect consume the conclusion or let connected providers define the strategy.

## Decision brief

Open with the commercial verdict and recommended direction. Name the consequential improvement, unresolved business problem and assumption worth challenging when the evidence supports them. Distinguish judgment from measured impact; never invent numerical impact scores.

Choose a compact, stable scorecard for the business's actual customer path, using [business context and outcomes](review-to-action.md#1-follow-the-money-then-split-volume-from-rate). An app may need meaningful use and paid conversion; a shop new buyers, paid orders and net sales; a service qualified enquiries and paid delivery. Include downstream value and relevant economics alongside reach. Omit irrelevant metrics; keep a relevant but unavailable metric with its reason. For each value record its source, population, dates and comparable-period change. Show numerator and denominator for rates.

Use a small measured chart when it clarifies the decision. Comparable-period bars need a zero baseline, a consistent scale, exact values and units. Unknown is `?`, never a zero bar. Time series must use actual observations and mark incomplete dates. Display traffic and money in aligned panels with separate units. Releases and campaigns are candidate explanations; a marker does not establish attribution.

Show a compact channel/market table when it changes the decision. Include the applicable outcomes, attributed revenue and spend only where their joins support them. Keep an unattributed bucket. Give relevant rows a maintain, test, change or investigate decision. Separate provider populations instead of drawing an invented funnel through them; orders, people and items remain different units.

## Explain changes and revisit hypotheses

For each consequential movement, give the observation and population, the supported explanation or competing hypotheses, and the decision with its reversal condition. Distinguish traffic growth from better conversion, and new customers from price/mix, renewals or refunds. Check seasonality, exposure and tracking changes.

Carry a dated hypothesis ledger with stable IDs, expected outcome, actual release/exposure, evidence since the last review, status and next observation. Statuses: proposed, running, supported, contradicted, inconclusive, invalidated by measurement, superseded. Preserve original dates. Do not silently discard an unresolved hypothesis or recommend an already shipped change again.

Reconcile the ledger with what shipped before reading results. For each proposed or carried entry, search the window's commits, releases, CMS history or live product for the change. A change that reached customers becomes `running` with its ship date and build, even when nobody updated the ledger; one merged but not released stays proposed with that blocker named. Then read results only against the threshold and read date recorded before the change shipped. A threshold like "materially better" is not a threshold: give a number. Do not pick a comparison window after seeing the data. If no threshold was set, say so and set one now for the next read. On a read date, write the result into any results log the format or test keeps, so the rule it supports carries evidence.

Keep the ledger in Sprid with `update_review_hypotheses`, one entry per id: a `running` entry needs `threshold` (with a number), `readOn` and `shippedAt`, and its threshold, metric and read date cannot change afterwards; supersede it and add a new entry instead. A settled entry carries its `result`. The review packet's `context.dueReads` lists the reads that are due, and `next` raises them for the person until the result is written.

The app's Reviews page shows each entry as one row: the statement as its title, the number it is judged on over the last six weeks, and its target. Write the `statement` as one plain sentence saying what changes and what should move ("An earlier store button sends more readers to the store"). Give every entry a `measure` so the line is drawn from the app's own data: `posthog` with a HogQL SELECT returning one row per day as `(day, value)` or `(day, numerator, denominator)`, using `{from}` and `{to}` for the window; `insights` with one of the app's series; or `manual` with dated `readings` when the number is counted by hand. Give it a `label` of a few words for what the number counts ("bought", "clicked to the store") and put the threshold's number in `target` in the same unit (9 for 9%). Before saving a query, check that it reproduces the number this review reported for the same window. Every open agenda item that tests something names its entry in `hypothesisId`; an id the ledger lacks comes back as a warning.

## Cover the decisions the business needs

Every review considers these areas. A quiet area gets a sentence; consequential findings earn detail. A failed source gets a precise limitation and the decision it prevents. Required investigations remain in this review, even when a deeper study could follow.

**Website and handoff.** Inspect actual landing pages and copy by entry intent, device and onward path. Judge promise, clarity and credibility. Name the page/template, reader problem, proposed behavior or copy and the success measure. Include draft copy when needed to evaluate the recommendation. Inspect search/indexing and technical performance where they explain a relevant problem; field impact and lab diagnosis are different evidence. A page rewrite continues in `/sprid:landing-page`; a search finding continues in `/sprid:seo-pages`, whose brief and plan record the baseline and read date this review compares against.

**Content and distribution.** Separate improving existing material from creating new material. Tie both to a reader need and a way to reach readers. Inspect search intent, thin or inaccurate content, packaging, localization and onward links. Compare posts at equal ages; for Pinterest, at 30, 60 and 90 days of Pin age. Separate unavailable supply, failed delivery and weak packaging. Consider store listings, email, partnerships and community distribution when appropriate, including channels outside the current connectors.

**Strategy.** Challenge the audience, positioning, channel mix, geography and offer, including the free/paid boundary where applicable. Consider a credible alternative explanation to the current strategy and give a recommendation. Use current external research to resolve a live question; generic benchmarks do not replace evidence about this business.

**Revenue and economics.** Always cover the business model's revenue, including relevant one-off, subscription, advertising or affiliate income. Keep period revenue separate from current MRR and gross amounts separate from refunds, commissions, tax and net proceeds. Reconcile overlapping rails before adding them. Inspect paid conversion, renewal and mature cohorts when history supports them. A current subscription snapshot cannot supply missing historical transitions.

For commerce, distinguish ordered, paid, cancelled, returned and fulfilled purchases where those states affect the decision. Net sales do not establish contribution without product, payment and fulfillment costs. For services, distinguish enquiries, qualified opportunities, bookings and paid delivery. Evaluate repeat behavior against the actual buying cycle; a durable purchase need not recur like a subscription. Read supported order/customer records or scoped exports when available; payment totals alone do not supply those facts.

Revenue per visitor requires revenue attributed to the same eligible visitor cohort. Customer CAC means acquisition spend per new paying customer; cost per signup or activation needs its own name. ROAS uses attributed revenue and the corresponding spend. Payback additionally needs contribution costs and cohort age. Preserve currencies; no conversion without a dated explicit exchange-rate policy. Missing spend data is unknown activity, not zero spend. Forecasts and budget proposals are hypotheses, not measured outcomes or authorization to spend.

Paid acquisition and publisher advertising get separate verdicts. When buying ads, connect audience, creative and landing path to downstream value before a scale/hold/change/stop recommendation. When no ads run, a specific learning experiment can still be justified by strategy: state audience, promise, outcome, proposed budget and stop rule. Publisher yield needs its precise denominator, such as pageviews or ad impressions, plus effects on reader experience and paid conversion.

**Delivered value and product changes.** Judge whether customers receive what the offer promises. For software, inspect meaningful task completion and repeat use among eligible people; for commerce, consider fulfillment, returns and customer feedback; for services, completed delivery and customer outcomes. Propose a product, offer or operational change when evidence supports it. Rare use alone does not justify removal. A cut proposal identifies the lost task, alternative path and reversible test. Name the responsible system when repository access is unavailable.

## One ranked agenda

Rank decisions across these areas together. Each recommendation names what changes, where, the evidence strength, the outcome sought and what would stop or reverse it. Prioritize measurement work only when it can change a consequential decision. Maintain successful distribution when evidence supports it; a review need not manufacture a new direction.

Show each carried recommendation with the date it was first made. One carried unchanged through two earlier reviews cannot be carried a third time as it stands: rank it first with the blocker named and the smallest step that removes it, hand it to a named executor, or drop it with the reason. Repetition without action is itself a finding about the process.

When saving, give every agenda item a stable `id` (reuse the previous review's id for the same recommendation) and a `status`: `new`, `carried`, `escalated` (with `blocker`), `handed_off` (with `executor`), `dropped` (with `dropReason`) or `done`. Sprid dates each item from the first review that made it, counts the carries and refuses a third unchanged `carried`. An escalated item appears in the person's `next` list until it moves. List dropped and done items after the open ones so nothing disappears silently; the save response names open items from the last review that this one left out.

A defect claim (a broken link, an event that does not fire, a step that fails) enters the agenda only after a controlled check reproduced it on the live product, with the device, build and steps recorded. Until then it is an investigation, labelled unverified, and it does not displace a verified finding. Save it with `defect: true` and the check in `verifiedBy {checkedAt, how}`; without `verifiedBy` Sprid stores it as an unverified investigation.

The first item arrives as an activity brief from [diagnosis to an activity](review-to-action.md): audience and selection rule, the concrete change or hypothesis, assets, destination, downstream success measure and next observation. Include audience count and timing where supported and relevant. Name the deliverable and available executor or required handoff. A missing count does not invalidate a verified repair; inventing one does. Keep proposed work, prepared material, handed-off work and verified delivery distinct.

Optional investigations must go beyond completed required analysis. Select relevant named tracks with concrete deliverables, such as landing-page copy variants or reconciled acquisition-cost scenarios. Follow the user's preferred number and presentation. Do not label an essential unfinished revenue or activation read as optional.

## Evidence appendix and reproducibility

Store the exact inputs, returned packet/query references, retrieval time, definitions and failed checks locally beside the report. For headline metrics record:

- Stable metric name and definition/version where one exists; provider field and unit/currency.
- Population, exclusions, attribution scope, numerator/denominator and verified identity mapping.
- Period, timezone, cohort age, release exposure and completeness/backfill state.
- Calculation evidence and the observation that would change the interpretation.

Only derive a metric when inputs have compatible populations, observation windows and definitions. Percentage change and percentage-point change are different. Native daily calendars cannot always be rebinned. Similar totals do not create an identity join. Correct changed exclusions or provider backfills explicitly in the next review.

Sprid’s review packet includes a versioned metric dataset with checked results and source receipts. Read [metric evidence](metric-evidence.md) for coverage, blocked calculations and immutable local evidence files. Revenue and aggregate Search Console metrics use the shared contract; other provider results remain native investigative evidence. The agent verifies app-specific meaning. Hosted dataset history and automatic cross-provider identity joins are not supplied by this contract; do not upload local database results on that assumption.

## Deliver the report and a useful final response

Write the durable report with the brief, analysis, dated hypothesis ledger and evidence appendix. In the final response give a self-contained commercial verdict, a compact scorecard or chart of consequential movement, the interpretation and decisions, and a link to the full report. A completion notice and file link alone do not deliver the review.

Aim for about 200 words of prose, adapting to the user's preferences. Use portable ASCII bars in text-only clients. Generate charts from measured data with plotting tools when images are more useful, save an export and provide a text fallback. Use interaction only when selecting dates or cohorts helps answer the question. Never use image generation to fabricate an analytical chart, invent intermediate observations or build a dashboard when a compact comparison suffices.

Keep limitations that change a recommendation beside it. Finish with relevant optional investigation tracks only when useful and allowed by the user's preferences. Review authorization does not authorize publishing, ad spend, deployment or instrumentation changes.
