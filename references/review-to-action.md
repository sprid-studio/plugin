# From diagnosis to an activity

Use this method for apps, shops, services and other businesses. Establish the business context before choosing metrics; return to sections 4–8 after explaining the evidence. The output is a concrete activity someone can carry forward. A review alone does not authorize execution.

## 1. Follow the money, then split volume from rate

Start with saved context and earlier reviews. Reuse the accepted goal, audience, offer and customer path. Read product material to fill a gap or investigate a relevant change; do not rediscover the business on every review. Establish missing facts about who buys, what is sold, how payment happens and what counts as delivered value. A business may combine several models.

| Example | Relevant path to verify | Outcome and economics to investigate |
|---|---|---|
| Mobile app | Website or listing → install → useful action → purchase, in the order the product supports | Meaningful use, paid conversion, renewals and retention; store exposure is relevant only for distributed apps. |
| Web shop | Product discovery → product page → checkout → paid order → fulfillment | New buyers, net sales, returns and repeat purchases where relevant; contribution needs product and fulfillment costs. |
| Subscription software | Discovery → signup or demo → useful result → subscription | Activation, paid accounts and mature renewal cohorts; signup is not delivered value. |
| Service business | Discovery → qualified enquiry → booking or agreement → paid delivery | Qualified opportunities, customers and delivered work; a submitted form is not a sale. |

These are examples, not compulsory funnels. Use each business's event definitions and buying cycle. Count people, accounts, orders and items separately. Do not invent identity joins between steps. Mark an irrelevant store, install or subscription metric not applicable; a relevant but inaccessible metric remains unknown.

Keep the business goal in existing `objective`/`audience` context, exact metric meanings in `definitions`, unresolved questions in `investigations`, and supporting facts in referenced material. Use the current schema and `baseRevision` when saving is authorized. Do not invent a business-type profile field or new connector. The existing App Profile and `--app` identifiers still select the business being reviewed; their names do not require a mobile app.

Find the paying segment using supported dimensions: market, product, device or sales channel, with platform/storefront for mobile apps. Compare its volume and conversion rates separately. Stable rates with falling volume suggest investigating reach; a falling rate suggests inspecting that step. Also check price/mix, renewals, refunds and fulfillment before attributing a revenue movement to acquisition. A storefront identifies where payment happened, not necessarily the acquisition source.

Use dated series when a holiday, campaign or release sits inside a comparison window. Keep source definitions and comparable populations intact.

## 2. Trace a volume change upstream before naming a cause

Follow the segment's volume back through referrers and the channel's own evidence. For search, compare impressions and position by country, page and date. Falling impressions at steady positions can reflect demand or query mix; worsening positions can reflect lost visibility. Disappearing pages warrant a technical investigation.

Check technical explanations two ways before calling a search decline demand: HTTP responses for affected URLs and index/canonical inspection where available. When access is missing, retain that explanation as unresolved. State what would overturn the reading; without a year-earlier baseline, seasonality remains uncertain.

## 3. Check a lever's history before recommending it

Search previous reviews, accepted decisions, the hypothesis ledger and available change history for prior tests or already completed work. Use repository diffs when accessible; otherwise use CMS history, published pages, campaign records or a supplied change log. Keep supplied and verified evidence distinct. A code comment or old report is a lead to investigate, not proof of a test result.

Look for natural experiments such as a capability switched off on a known date, while checking other changes and audience mix. A before/after comparison alone does not establish cause.

Treat broken measurement as a hypothesis. Where authorized, reproduce the relevant action and inspect the received event. Otherwise name the exact check needed and the access gap. An absent event may mean no traffic, failed tracking or an unavailable query.

## 4. Pick the kind of activity the evidence points to

| What the evidence suggests | Activity | Investigate with | Prepare with |
|---|---|---|---|
| Relevant audience volume fell while rates held | Reach that audience through another supported route | § 7 | `/sprid:post`, an email or outreach brief |
| An entry page fails to explain the offer or support a relevant next step | Improve that page and onward path | § 5 | `/sprid:landing-page` |
| Search visibility produces few qualified visits, or buying-intent queries lack a suitable destination | Improve search copy or create the missing page | § 6 | `/sprid:seo-pages` |
| Visitors cannot complete a useful step on their device or path | Repair the handoff, checkout or product behavior | § 5 | Page specification or a patch through an authorized coding agent |
| Copy, images or an offer contradict what customers can actually receive | Correct the product claim | § 5 | Relevant content skill; store skills only for app listings |
| Missing measurement prevents a consequential decision | Establish that measurement | Review checks | Exact event/query specification, with implementation only when authorized |

Several activities can apply. Available tools determine what can be delivered, not which business problem deserves attention. A missing code connection should leave a concrete handoff, not generate unrelated content in its place.

## 5. Convert the visitors you already have

Start with relevant entry pages after internal and bot exclusions. Inspect the actual page and supported onward path on the devices in question.

- **Next-step rate by source and device.** Choose the real step: store tap, useful action, checkout, purchase or qualified enquiry. Investigate audience and intent differences before attributing a rate gap to the page.
- **Exposure and action placement.** Read scroll or visibility evidence when available; distinguish never seeing an offer from seeing it and declining it. A rarely used placement may still serve a distinct audience.
- **Can this visitor finish?** Check phone handoff for apps, supported shipping/payment options for shops, or usable booking/contact routes for services. A page visit is not proof that the next step works.
- **After the click.** Follow downstream results only where campaign or identity evidence supports them. State attribution gaps instead of averaging them away. Keep failed payment, refunded order and fulfilled order distinct when those states matter.
- **Truth.** Compare the page with the available product or offer, including price, availability, images and supported claims. App screenshots require the released version; a shop's delivery promise requires its actual terms and capability.
- **Can the test be read?** Assess traffic, expected difference and observation window. If an experiment cannot distinguish the proposed effect, name that limit and use appropriate qualitative or technical verification. A before/after check must disclose confounds.

Rank changes against the business's downstream outcome, with a baseline, success criterion and observation that would change the decision. Unknown impact stays unknown.

## 6. Win the click in search

Choose pages with relevant impressions, accounting for position and query mix. Compare the title and destination with the intent that reaches them: a product category, a use case, a service area, an app or an alternative. A shop may need a category or product page rather than another article.

Check that the visitor can reach the promised offer from the destination. Measure fixed pages over comparable windows, with data lag and other changes recorded. Do not promise rankings from publishing content.

## 7. Reach the segment without the channel that fell

Inventory reachable audiences and suitable material:

- **Owned reach:** eligible email subscribers after suppressions, relevant customers, app push audiences where applicable, or a partner's verified audience. Give a count when measurable; state what an unknown count prevents. Use historical outcome rates only for comparable populations.
- **Moments:** verified dates, seasonal demand, a product release or a relevant partner window. A timely activity still needs a reason this audience would care.
- **Assets:** current product facts, usable photographs, accepted formats and existing pages. Check rights and factual accuracy before reuse.
- **Partners:** named recipients with a relevant reason to engage and a suitable contact route. Preparing a pitch does not authorize sending it.

## 8. Rank, then write one activity brief

Rank by the supported business problem, likely relevance to the objective and uncertainty. Show implementation dependencies and delivery constraints. A needed product or checkout repair may outrank another campaign; needing a release does not automatically put it last. Respect declined work and authorized scope.

The first agenda item includes:

- audience and its selection rule, with a measured count where available
- the concrete change or creative hypothesis and why now
- exact destination and usable assets; ready-to-review text where needed
- expected deliverable and an available executor, or the named handoff needed
- the downstream success measure, baseline, next observation and stop/reversal condition
- timing when relevant, with unsupported dates or impact estimates left unknown

Then hand off to the appropriate skill or customer workflow within existing authorization. A content recipe may produce the next finished piece; a new creative direction can first deliver a pilot. A website task may produce a CMS draft, a tested patch or a complete change brief, depending on actual access. Discover supported tools; never infer a CMS, order-data or coding integration from the business type.

Keep the original activity when handing work to a person or external issue tracker. Record the destination, requested change and expected verification in the artifact, using supported fields. Creating an issue is a handoff, not a website change. Confirm what reached customers before assessing its effect; retain unresolved work for the next review.

## 9. What execution teaches back

Save accepted examples and the corrections that made them useful, with their scope. An account's design choice is not a universal rule for every customer. Review images visually and re-check product facts before reuse; source material can itself be stale. Keep editorial acceptance separate from measured commercial results, and bring both back to the next activity.
