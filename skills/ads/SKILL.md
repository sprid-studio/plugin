---
name: ads
description: Prepare and manage campaigns around purchases, subscriptions, qualified leads or meaningful product use. Start with the business goal, customer path and verified conversion signal; use a successful organic post or new creative inside that campaign. Covers Meta campaigns, ad sets, creatives, Google Search and App campaigns, keyword research, results and iteration. Boosting a published post is a secondary, explicit reach or engagement task. Requires Sprid MCP; spending is approved in the Sprid app.
---

# /sprid:ads

Read [agent runtime](../../references/agent-runtime.md) and run its version check once per session.
Read [one marketing plan](../../references/guided-marketing.md). Continue the accepted goal, audience, voice and unfinished work. A product can be an app, website, shop or service; social posts and a repository are optional.

## Start with the result

1. Read `ad_campaign_context` for the explicit account. It joins the product's marketing context, saved campaign briefs, destination capabilities and purchase-tracking evidence. Read `get_marketing_plan` for the supporting research and accepted guidance. Missing data is unknown, never zero.
2. Name the business outcome and the actual customer path: ad → destination → useful action → payment or qualified lead. Distinguish a new paying customer, a first purchase and renewal revenue. An install, trial, saved item or checkout click is not a paid purchase.
3. Select the outcome used for bidding and record its meaning, sender and counting rule. Use a paid outcome when that signal is usable. A more frequent upstream action needs evidence of a relationship to payment and an explicit learning hypothesis. Never silently substitute clicks, impressions or engagement for a purchase goal.
4. Read `ad_measurement` and the event-specific provider evidence. Read the shared [tracking setup guide](../measurement/guides/tracking.md), then follow [measurement](../measurement/SKILL.md) to repair missing instrumentation. A connected ad account, dataset ID, primary conversion action or successful upload does not establish attribution eligibility or deduplication.
5. Save a campaign brief with `prepare_ad_campaign`: goal, destination, audience, countries, hypothesis, funnel, optimization event, counting rule and conversion lag. Include economics when known and mark assumptions. This saves a draft in the same marketing plan, creates no platform campaign and starts no delivery. Keep its request key on retry. Read the returned action and readiness before continuing.

Prepare useful copy and assets while setup is incomplete. Show the exact missing setup step beside the blocked action; never replace the business goal to bypass it. Do not require users to recreate existing analytics or accounts.

## Choose the campaign from the destination

| Customer path | Campaign | Measurement |
|---|---|---|
| Website purchase or subscription | Meta Sales; Google Search where queries express the need | Confirmed paid outcome from the commerce owner; website matching and consent |
| Qualified enquiry or booking | Meta Leads or suitable Google Search | Lead submission plus an explicit qualification definition; later revenue separately |
| Native app install and use | Meta App Promotion; Google App campaigns | Store/app identity, install/activation SDK or supported measurement partner, eligible app event |
| Online shop | Purchase campaign with the product destination | Existing commerce integration first; order ID, value, currency and refund treatment |

Heard “promote this post”? Treat the post as proposed creative for the business goal. Read the context and prepare that campaign. Ask only for information that changes the draft. Organic response suggests an angle worth testing; it does not establish paid conversion performance.

An eligible existing Meta post can retain its social engagement. Verify identity, destination, CTA and placement compatibility with the chosen objective. If the original post cannot support it, prepare a new ad using the material and say which engagement will carry over. Google App campaigns assemble text, image and video assets; an Instagram post is not itself a Google app ad. Search uses search terms and search-ad copy. Never make an organic winner a prerequisite for either.

Read [Ads: create, compare and manage campaigns](guides/ads.md) for the user flow and [Meta conversions](guides/meta-conversions.md) before event setup. Use `google_ad_research` for keyword ideas, actual search terms and campaign results. Pin market, language and advertiser. API access restrictions are provider capability gaps; reconnecting the customer's login does not fix them.

## Prepare, inspect, then approve

For Meta: `ads_overview` → `suggest_ad_categories` → `create_ad_campaign` → `create_ad_set` → creatives → `create_ads`. The brief supplies the goal; these tools prepare delivery objects. Choose `OUTCOME_SALES`, `OUTCOME_LEADS` or `OUTCOME_APP_PROMOTION` from the actual path. App promotion is an ordinary path, not an advanced exception.

For Google: discover `create_google_campaign` and its current schema. Search and App campaigns use their own input and assets; a YouTube post promotion uses Demand Gen. Do not call these interchangeable. Check which conversion actions the campaign actually bids toward; two primary purchase actions are not evidence that one payment should be counted twice.

Google preparation defaults to `validateOnly:true`, which creates no objects. Read actual Search terms and keywords with `google_ad_research`; `update_google_keywords` changes keywords only while the campaign is paused. Keep the expected update timestamp. After an uncertain response, use `reconcile_google_campaign` to compare provider state before retrying; never create a replacement campaign to bypass an unresolved write. The CLI exposes `ads google prepare|research|keywords|reconcile --file`.

For standalone server purchase uploads, `prepare_google_conversion_action` validates or creates a secondary `UPLOAD_CLICKS` purchase action; validation is the default. It does not send purchases or change account bidding goals. Verify Data Manager access, event ownership and receipts separately. A `WEBPAGE` action's multi-source ingestion needs its own supported tag setup and access; do not substitute a website or Play action ID. Select the prepared action explicitly in the intended Search campaign after verification. CLI: `ads google conversion --file`.

For every campaign:

- Propose a hypothesis and target cost per optimized event from the customer's economics. `create_ad_set` requires both. A missing margin or trial-to-paid rate stays a labelled assumption; never fabricate one to complete setup.
- State countries, identity, destination, optimization event, attribution window, revenue basis, budget and run. Store business outcome and bidding event separately when they differ.
- Declare `special_ad_categories`. Housing, financial products/services, employment, gambling and political advertising need review. `suggest_ad_categories` is a prompt to investigate, never policy clearance. Clarify uncertain classification before platform creation.
- Use the accepted voice. For a fictional person read [AI people](../../references/writing-gate.md#ai-people-reactions-and-general-copy); never invent personal testimony. Review every copy with `review_ad_copy`; fix errors, then review again.
- Every Meta creative carries an archetype. Read [archetypes](archetypes.md), then `ad_archetypes`, `render_ad_creative` or `create_ad_creative`. `create_carousel_ad_creative` uses 2–10 cards from a 1:1 or 4:5 post. Dynamic creative requires a compatible ad set. Preview the actual placements with `preview_ads` and run `ads_preflight` before requesting launch.

**Money starts from a press in the app.** `launch_ads`, `start_promotion`, `update_ad_budget` and `change_promotion_budget` return the commitment and an `approvalUrl`. They do not authorize a token to spend. Show the exact material, identity, amount and duration before handing off. A user's request to prepare tracking or draft a campaign grants no launch permission. Do not report it live until the provider read confirms delivery.

A preparation call can create paused platform objects. If the user said no campaigns at all, stop at the saved brief and local assets. Neither a draft nor permission for one public change grants permission for another.

## Measurement ownership

Use one authoritative sender for each source → destination → event. RevenueCat can own purchases it processes, including Web Billing; Stripe being its processor does not make a second Stripe purchase feed necessary. Direct Stripe Checkout purchases use the confirmed-payment webhook. An existing shop integration can own its orders.

Keep native install/activation signals separate from purchase delivery. For RevenueCat → Meta, disable overlapping SDK purchase logging: the SDK and RevenueCat do not share a purchase event ID. A Meta app is needed for native app promotion; a website purchase does not become a native event because its product also has an app.

Verify a test payment and replay at the authoritative source and destination. Preserve the payment ID, original timestamp, value and currency on retry. Distinct renewals need distinct payment IDs. Meta browser/server duplicates need the same event name and event ID. Google deduplicates a transaction ID within one conversion action, not across different actions. Consent, matching and optimization eligibility need their own checks.

`send_conversion_events` is for authorized server-event delivery, never for fabricated conversions, cohort aggregates or historical replays just to make the dataset look healthy. `report_ad_outcome` records the business's cohort evidence separately. See the measurement skill for receipts and verification scope.

## Boost only when that is the task

Reach, video views, engagement and traffic can be legitimate goals when explicitly requested. Say the exact result being bought. Use `promotion_connection`, then `create_promotion` with the selected network's request key, currency and explicit goal. Keep the request key on retry. `start_promotion` returns the approval link.

The promotion network follows the published post: Instagram/Facebook → Meta, YouTube → Google Demand Gen, TikTok → Spark, Pinterest → Pinterest Ads. A TikTok post marked `needsAuthorization` needs the creator's own authorization code. Pinterest needs a public Pin owned by the advertiser and explicit `maxBidCents`; its run uses UTC days. Read [Pinterest Ads](../connect/guides/pinterest-ads.md).

## Read results and continue

Read source purchases/revenue and platform-attributed results as separate measures. Never add Meta and Google attributed purchases together as unique customers, or add parent campaign rows to their child rows. Match dates, currency, conversion lag and revenue basis; refunds and renewals must retain their meanings. Missing or failed reads stay unknown.

`ad_council` judges cost per optimized event first. `ad_metrics`, `ad_breakdown` and `google_ad_research` supply detail. The council's readable flag is review guidance, not platform learning status or proof of a conclusive sample. Check outcome volume and time to purchase before judging. Ordinary ad-set allocation is not a randomized experiment.

- `iterate_winner` prepares another creative under the winning hypothesis. Change one testable variable where possible. Keep the original comparison and observation that would change the recommendation.
- `ad_post_mortem` then `close_ad_set` records what happened and what was learned. A campaign is judged against its original goal; do not move the bar after seeing results.
- `pause_ads` stops an ad/set; `pause_promotion` stops a promotion. Confirm the provider's receipt before saying it stopped. Failed or uncertain pauses remain unresolved.
- `create_ad_rule`/`evaluate_ad_rules` flag a threshold for human review, never automatically pause. Meta hard-stop rules, resume, changes to budgets and studies over delivering sets retain their approval gates. Propose budget changes only when asked. Archive by default; delete only on request.

Save the conclusion, artifact and next action in the existing marketing plan. Reuse actual audience language, accepted corrections and previous tests for the next creative. Competitor-library days live show that an ad remains active, not its spend, conversion rate or profitability.

## Shared accounts and advanced controls

`ads_inventory` includes external Meta objects; uncertain ownership stays unassigned. `assign_meta_campaign` only changes Sprid organization. `connect_shared_meta_ads` requires owner/admin and explicit Page/dataset selection. Never borrow another product's dataset. External campaigns remain outside Sprid's launch controls and spend caps.

Keep advanced targeting/bidding deliberate. `search_ad_targeting`, `estimate_ad_audience` and custom audiences serve the hypothesis. Advantage+ audience inputs can be suggestions; special categories restrict ages, gender, radii and lookalikes. Taiwan/Singapore require advertiser identity settings. `bidStrategy`, lifetime/campaign budgets, placements and attribution stay visible in review. Lead forms require the customer's privacy policy and correct permissions; never fetch personal leads into chat.
