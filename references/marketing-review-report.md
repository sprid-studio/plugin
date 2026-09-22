# Deliver a business review

The review answers: are we reaching the right people, delivering value and building a sustainable business, and what should change? Analytics checks support that judgment. Do not let an easy-to-prove instrumentation defect consume the conclusion or let connected providers define the strategy.

## Decision brief

Open with the commercial verdict and recommended direction. Name the consequential improvement, unresolved business problem and assumption worth challenging when the evidence supports them. Distinguish judgment from measured impact; never invent numerical impact scores.

Choose six to eight stable headline metrics appropriate to this app: eligible audience, acquired accounts, activation, return, paying conversion, period revenue, revenue per visitor, acquisition spend/return. Keep an unavailable headline slot with its reason. For each value record its source, population, dates and comparable-period change. Put detailed definitions in the evidence appendix. Show numerator and denominator for rates.

Use a small measured chart when it clarifies the decision. Comparable-period bars need a zero baseline, a consistent scale, exact values and units. Unknown is `?`, never a zero bar. Time series must use actual observations and mark incomplete dates. Display traffic and money in aligned panels with separate units. Releases and campaigns are candidate explanations; a marker does not establish attribution.

Show a compact channel/market table when it changes the decision. Include visitors, activated users, payers, attributed revenue and spend only where their joins support them. Keep an unattributed bucket. Give relevant rows a maintain, test, change or investigate decision. Separate provider populations instead of drawing an invented funnel through them.

## Explain changes and revisit hypotheses

For each consequential movement, give the observation and population, the supported explanation or competing hypotheses, and the decision with its reversal condition. Distinguish traffic growth from better conversion, and new customers from price/mix, renewals or refunds. Check seasonality, exposure and tracking changes.

Carry a dated hypothesis ledger with stable IDs, expected outcome, actual release/exposure, evidence since the last review, status and next observation. Statuses: proposed, running, supported, contradicted, inconclusive, invalidated by measurement, superseded. Preserve original dates. Do not silently discard an unresolved hypothesis or recommend an already shipped change again.

## Cover the decisions the business needs

Every review considers these areas. A quiet area gets a sentence; consequential findings earn detail. A failed source gets a precise limitation and the decision it prevents. Required investigations remain in this review, even when a deeper study could follow.

**Website and handoff.** Inspect actual landing pages and copy by entry intent, device and onward path. Judge promise, clarity and credibility. Name the page/template, reader problem, proposed behavior or copy and the success measure. Include draft copy when needed to evaluate the recommendation. Inspect search/indexing and technical performance where they explain a relevant problem; field impact and lab diagnosis are different evidence.

**Content and distribution.** Separate improving existing material from creating new material. Tie both to a reader need and a way to reach readers. Inspect search intent, thin or inaccurate content, packaging, localization and onward links. Compare posts at equal ages. Separate unavailable supply, failed delivery and weak packaging. Consider store listings, email, partnerships and community distribution when appropriate, including channels outside the current connectors.

**Strategy.** Challenge the audience, positioning, channel mix, geography and free/paid boundary. Consider a credible alternative explanation to the current strategy and give a recommendation. Use current external research to resolve a live question; generic benchmarks do not replace evidence about this app.

**Revenue and economics.** Always cover the business model's revenue, including relevant one-off, subscription, advertising or affiliate income. Keep period revenue separate from current MRR and gross amounts separate from refunds, commissions, tax and net proceeds. Reconcile overlapping rails before adding them. Inspect paid conversion, renewal and mature cohorts when history supports them. A current subscription snapshot cannot supply missing historical transitions.

Revenue per visitor requires revenue attributed to the same eligible visitor cohort. Customer CAC means acquisition spend per new paying customer; cost per signup or activation needs its own name. ROAS uses attributed revenue and the corresponding spend. Payback additionally needs contribution costs and cohort age. Preserve currencies; no conversion without a dated explicit exchange-rate policy. Missing spend data is unknown activity, not zero spend. Forecasts and budget proposals are hypotheses, not measured outcomes or authorization to spend.

Paid acquisition and publisher advertising get separate verdicts. When buying ads, connect audience, creative and landing path to downstream value before a scale/hold/change/stop recommendation. When no ads run, a specific learning experiment can still be justified by strategy: state audience, promise, outcome, proposed budget and stop rule. Publisher yield needs its precise denominator, such as pageviews or ad impressions, plus effects on reader experience and paid conversion.

**Product value and simplification.** Tie proposed development to the reader's task, audience promise and business outcome. Inspect existing capabilities before recommending another one. Compare discoverability, completion, repeat use and distinctive value among exposed, eligible people. Rare usage alone does not justify removal. A cut proposal identifies the lost task, alternative path and reversible test. New capabilities can be the right answer; do not default to minor interface edits.

## One ranked agenda

Rank decisions across these areas together. Each recommendation names what changes, where, the evidence strength, the outcome sought and what would stop or reverse it. Prioritize measurement work only when it can change a consequential decision. Maintain successful distribution when evidence supports it; a review need not manufacture a new direction.

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
