# Run your first Meta conversion campaign.

**What this guide does:** Takes you from Meta account setup to a conversion campaign prepared in Sprid, with a real event checked before you approve spending.

A conversion campaign asks Meta to find people likely to complete an action in your app. Choose the action you want, prove that Meta receives it, then build the campaign. Your agent prepares the ads. You review the campaign and press Launch in Sprid.

## You need.

- Admin access to the Meta business portfolio and ad account that will pay for this app’s ads.
- A Facebook Page for the app, linked to its professional Instagram account if you want Instagram delivery.
- Access to your app’s server and domain DNS. A developer needs to send your conversion events to Meta.
- A Sprid account connected to Meta Ads, and a person signed in to Sprid to approve the reviewed budget.

## Set up Meta once.

1. **Create or choose the business portfolio.** Keep the app’s Page, ad account and dataset under the business that owns them. Your personal Facebook login administers those assets.
2. **Create the Page and link Instagram.** The Page supplies the identity for the ad, including ads that run only on Instagram. Check the linked handle before connecting Sprid.
3. **Choose or create the ad account and add billing.** Choose its currency and time zone carefully. Changing them creates a new ad account and closes the old one, stopping its ads. Sprid’s budget amounts use the connected ad account’s currency.
4. **Create the dataset in Events Manager.** This is where Meta receives conversion events. Keep its ID. A server-only Conversions API integration can use the dataset without installing browser pixel code.
5. **Verify the app’s domain.** In Meta’s business settings, follow domain verification and add the supplied DNS TXT record with your DNS provider. Verify the domain where your conversions happen.
6. **Create the Conversions API token.** Use the dataset’s direct integration setup in Events Manager. Save the token in your server’s secret settings. This token sends your app’s events; Sprid’s Meta Ads connection manages campaigns separately.
7. **Review account-level advertising settings.** Check any optional AI tests that change the destination or its presentation. Your agent’s creative settings cannot prove what an account-level test will do. If you use Meta’s audience-segment reports, define the engaged audience and existing customers there before interpreting those reports.
8. **Connect Meta Ads to Sprid.** Follow [Connect Meta Ads](https://sprid.studio/docs/connect/meta-ads), selecting this app’s Page, ad account and dataset. Set the daily, campaign and monthly spending caps in Sprid’s account settings. If several apps share the ad account, a workspace owner or admin also sets **Shared Meta limits** there. Each app keeps its own Page and dataset; the shared limits cover campaigns managed through Sprid.

## Prove the conversion signal.

1. In Events Manager, select the dataset and open **Test events**. Add its test code to your server’s Conversions API request as `test_event_code`.
2. Complete the chosen action through the app. Check that Events Manager receives the exact event name and reports a server connection. A successful HTTP request alone does not prove the expected event arrived.
3. Inspect the event details. Website events need `event_source_url` and the visitor’s `client_user_agent`. Send a stable `external_id` for matching. When a real Meta click supplies `fbclid`, preserve it through redirects and send the correctly formatted `fbc` value. Keep the click ID’s case unchanged.
4. Check `Purchase` with the actual paid amount and currency if the app sells something. Store the visitor’s user agent and click ID when they arrive, so a later payment webhook can use the original values.
5. Remove `test_event_code` for production. Complete another real action and check its arrival, then ask your agent to run `dataset_health` for the event you will optimize on.

Email and phone identifiers need Meta’s normalization and hashing. Hashing `external_id` is recommended; keep its representation consistent across integrations. `fbc` and `client_user_agent` must remain unhashed. See [customer information parameters](https://developers.facebook.com/documentation/ads-commerce/conversions-api/parameters/customer-information-parameters) when implementing the server call.

Test codes identify test payloads. Meta says those events still flow into Events Manager and can be used for targeting and measurement. Test only with actions you actually perform, then remove the code.

`dataset_health` checks recent event counts and, when Meta provides it, event match quality. Its count check covers seven days and Meta’s top 100 events per hour. An event absent from that response is unobserved. A match-quality score does not prove that a recent conversion happened.

## Choose an event that predicts payment.

Use `Purchase` when purchases happen often enough to give the campaign a useful signal. If purchases are sparse, choose a completed action in the same visit that customers take before paying. Check the connection to payment in your own analytics.

Meta says ad sets usually leave learning after about 50 results in the week following the last significant edit. This is guidance about stable delivery. Results below that volume can still tell you about a broken checkout or whether anyone paid.

Standard events use their exact names, such as `Purchase`, `Lead` or `CompleteRegistration`. For your own event, such as `RecipePlanCompleted`, ask your agent to:

1. Run `dataset_health` without a conversion selection and find the exact name in `datasetHealth.events`. Check that the returned `datasetId` is the connected dataset you intend to use. The readiness result may still ask you to select a conversion.
2. Run `list_custom_conversions` to check for an existing matching rule.
3. If needed, call `create_custom_conversion` with a name and the exact `eventName`. Keep the returned ID.
4. Complete the action again after creating the rule. The custom conversion itself must have a recent fire before launch; an earlier underlying event cannot prove a new rule worked.

A custom conversion is a named rule on events in your dataset. Sprid creates a case-sensitive event-name rule. The ad set selects that rule by `customConversionId`.

## Build the campaign through Sprid.

Give your agent the intended countries, total budget, run length, destination and hypothesis. State the regulated category before the campaign is created. Housing, employment, financial products and services have targeting restrictions; declare `NONE` only when no category applies. [Meta’s category guide](https://developers.facebook.com/docs/marketing-api/audiences/special-ad-category/) explains the scope.

Ask the agent to follow this order:

1. **Check readiness:** `ads_overview`, then `dataset_health` with the chosen `conversionEvent`. Fix missing connections or an unobserved event before creating ads.
2. **Create the paused campaign:** `create_ad_campaign` with an objective such as `OUTCOME_SALES` and explicit `specialAdCategories`. Political campaigns also need explicit `countries`. For housing, credit and employment, Sprid derives the campaign countries from the ad sets.
3. **Create the paused ad set:** `create_ad_set` with `OFFSITE_CONVERSIONS`, the chosen event, countries and reviewed budget. Use explicit Facebook and Instagram Feed, Stories and Reels placements for paired creatives. Set `targetCostPerEventCents` as the cost you will judge results against. This is a reporting target, not a bid. Use `startAt` if you want a later start.
4. **Prepare the creative:** `render_ad_creative` builds from a named template, or `create_ad_creative` accepts your own material. Ask for feed and vertical assets. An external pair must identify whether its assets are images or videos. Keep `destinationUrl` free of hand-written `utm_*` parameters; Sprid adds tracking.
5. **Attach and review:** use `create_ads` to attach the creatives, review each one with `review_ad_copy`, then run `ads_preflight`. Check previews for Feed, Stories and Reels. A passing comparison confirms the stored fields checked against Sprid’s intent; it does not guarantee Meta will approve delivery.
6. **Approve in Sprid:** `launch_ads` returns the reviewed commitment and an `approvalUrl`. Open that link, check the amount and end date, then press Launch. The agent cannot start spending or raise the budget.

The following is a fictional ad-set input for Pantry Note on a USD ad account. The IDs are examples. Choose your own budget and target cost before preparing a campaign.

```json
{
  "account": "pantrynote",
  "campaignId": "00000000-0000-4000-8000-000000000001",
  "name": "Completed recipe plan",
  "optimizationGoal": "OFFSITE_CONVERSIONS",
  "conversionEvent": { "customConversionId": "123456789" },
  "dailyBudgetCents": 1000,
  "durationDays": 7,
  "countries": ["US"],
  "targeting": {
    "publisher_platforms": ["facebook", "instagram"],
    "facebook_positions": ["feed", "story", "facebook_reels"],
    "instagram_positions": ["stream", "story", "reels"]
  },
  "targetCostPerEventCents": 500,
  "hypothesis": "Showing the completed meal plan brings customers who purchase."
}
```

For a standard event, use `"conversionEvent": {"standard": "Purchase"}`.

Sprid requests opt-outs for the documented creative enhancements it supports and checks Meta’s stored settings before launch. It supplies feed and vertical assets when paired material is available. Conversion ad sets store explicit attribution settings: seven-day click, one-day view and one-day engaged video view. A mismatch found by preflight blocks launch.

## Read where people stop.

Use `ad_status` to check delivery and rejection messages. Ask for `ad_council` to compare cost per optimized event with your target. Then compare Meta’s clicks with your app’s actual outcomes.

The stage-by-stage diagnosis below uses Meta reports and your own analytics. Verify each stage against its source and keep attribution gaps explicit.

| Stage | Compare | Investigate when that stage loses people |
|---|---|---|
| Ad | Link clicks per impression | The opening, image or promise |
| Page loads | Landing-page views per link click | Load errors, slow pages or redirects |
| App starts | Started actions per landing-page view | Message match and the first action |
| App completes | Completed actions per started action | Product failures or confusing steps |
| Customer pays | Paid customers per completed action | The offer, price presentation or checkout |

Compare a consistent cohort and period. Repeat actions by one person are different from independent potential buyers. Keep campaign totals separate from their ad-set totals, since they overlap.

With zero purchases, the table gives approximate one-sided 95% upper bounds on the purchase rate. It assumes independent comparable people, complete measurement and enough follow-up for them to purchase. Use it to decide what to investigate; a sample alone cannot prove an offer will fail.

| Completed actions from different people, with zero purchases | Approximate upper bound |
|---|---|
| 30 | 10% |
| 60 | 5% |
| 100 | 3% |

Compare that bound with the purchase rate your margins require. Confirm checkout and purchase tracking work before blaming the offer. [The statistical rule](https://jhanley.biostat.mcgill.ca/c607/ch08/zero_numerator.pdf) explains the approximation.

Changes to targeting, creative or the optimization event can restart learning. Budget changes depend on their size. Record each campaign change and its reason. Fix product and checkout bugs when you find them; changing page content alone is different from editing the ad’s destination or creative.

## If it fails.

- **No recent event observed:** check the dataset ID and server response, perform the action, then recheck Events Manager. Remove the test code before the production check.
- **Custom conversion has no recent fire:** confirm its dataset and exact event-name rule. Perform the action after the rule exists. Do not substitute an unrelated standard event to pass the check.
- **Match quality unavailable:** Meta may need dataset permission or an opt-in. Read the score in Events Manager while you resolve access. Missing quality does not turn an observed event into zero.
- **Preflight names a mismatch:** correct the named setting, or recreate the paused ad set or creative through Sprid when it cannot be edited. Run preflight again. Avoid changing tracked fields independently in Ads Manager.
- **Budget exceeds a cap:** review the daily and total commitment in Sprid’s account settings. A person must approve the spending limit or budget change in the app.
- **No purchases yet:** verify measurement, then read the completed-action count and follow-up period. A small cohort is inconclusive.

## Sources.

Meta references checked 14 October 2026. Account-specific acceptance still needs a paused create and readback on your connected account.

- [Meta Ads connection](https://sprid.studio/docs/connect/meta-ads) and [ad-account currency changes](https://www.facebook.com/business/help/291404291014138).
- [Conversions API: sending and testing events](https://developers.facebook.com/documentation/ads-commerce/conversions-api/using-the-api), [server event parameters](https://developers.facebook.com/documentation/ads-commerce/conversions-api/parameters/server-event), and [click ID handling](https://developers.facebook.com/documentation/ads-commerce/conversions-api/parameters/fbp-and-fbc).
- [Custom conversions](https://developers.facebook.com/docs/marketing-api/reference/custom-conversion/) and [dataset quality](https://developers.facebook.com/documentation/ads-commerce/conversions-api/dataset-quality-api).
- [Learning phase](https://www.facebook.com/business/help/112167992830700) and [significant edits](https://www.facebook.com/business/help/316478108955072).
