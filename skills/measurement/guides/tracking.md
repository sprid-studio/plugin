# Set up conversion tracking.

**What this guide does:** Helps you and your agent connect real purchases or qualified leads to Meta and Google, check for duplicate events, and save the setup for future campaigns. Covers apps, websites and online shops.

## Start with your agent.

Paste this into your connected agent. Replace the bracketed text with your product and the result you want:

```text
Use Sprid’s measurement skill for [product].
Help Meta and Google optimize for [purchases / subscriptions / qualified leads].
Reuse existing integrations and implement missing events.
Verify delivery, consent and duplicate handling.
Save evidence and unresolved checks in our marketing plan.
Do not create campaigns or start spending.
```

With the skills installed, you can also invoke `/sprid:measurement`. In a connected chat without skills, ask the agent to read Sprid’s `tracking` guide and follow it. Need to connect the agent first? Follow [Install the skills](https://sprid.studio/docs/install) or [Use Sprid in chat](https://sprid.studio/docs/chat).

Your agent inspects the existing product and connections before asking for missing information. You supply the intended outcome and any account access it cannot obtain. A chat agent can guide setup and read connected evidence; changes to your app or website need a coding agent or developer with access to its code. Setup does not authorize publishing a release, making a real payment or launching ads.

## Choose where the customer acts.

Choose from the place where the advertised action happens. One product may need separate web and native paths.

| Customer path | What your agent sets up |
|---|---|
| Website purchase or paid subscription | The confirmed payment as a website conversion, with consent and the original visitor’s matching information. A native Meta app is not needed solely for a website purchase. |
| iOS or Android app | Store identity and app measurement for installs or meaningful use, plus the paid event. For Meta, check the chosen SDK or measurement partner. If RevenueCat sends purchases, follow its integration requirements. For Google, check Firebase/GA4, Play or a supported measurement partner for the intended platform and event. Verify iOS and Android separately. |
| Online shop | Audit the existing shop integration first. Reuse its paid order and order ID; check browser and server delivery together before adding another purchase sender. |
| Enquiry, booking or service | Define what makes a lead qualified. Record submission and qualification separately, then return the appropriate signal to the ad platform. Payment remains a separate outcome. |

The useful action should match your product: saving a property before buying an analysis, finishing a guide sample before subscribing, or completing a paid order. Record the business outcome and the event used for bidding separately. An earlier action can be a testable proxy when purchase volume is sparse; it needs evidence that it predicts payment.

## Choose who sends each purchase.

Connecting RevenueCat or Stripe to Sprid lets your agent **read revenue**. Sending a conversion back to Meta or Google needs its own integration and verification.

- **RevenueCat purchases, including Web Billing:** prefer RevenueCat’s supported integration for the chosen destination and payment type, after checking consent behavior. Stripe processing a RevenueCat charge does not require a second Stripe purchase sender. For native Meta purchases, disable overlapping SDK purchase logging. Install and activation measurement still needs its own setup. Follow [RevenueCat’s Meta guide](https://www.revenuecat.com/docs/integrations/attribution/meta-ads).
- **Direct Stripe Checkout:** use the server’s confirmed-payment webhook, including delayed-payment success. Keep delivery retryable and identify the same payment consistently. A success-page visit alone cannot prove payment. Follow [Stripe’s fulfillment guide](https://docs.stripe.com/checkout/fulfillment).
- **Existing commerce integration:** inspect which events it already sends and to which ad accounts. Keep it as the purchase sender when it supports the intended outcome and can be verified.

Your agent records one owner for each payment source → destination → event. When browser and server both report an event, they must deliberately share the provider’s duplicate-handling identifiers. Keep new paying customers, individual purchases and renewals distinct. A free trial, entitlement grant or checkout click is not a purchase. Record value, currency and how refunds affect revenue.

RevenueCat’s **Ads** area measures money earned from ads shown inside your app. Acquisition tracking uses the integrations and event setup described here.

## Set up only the missing parts.

1. **Inspect the product and accounts.** The agent reads the existing marketing plan, payment flow and connected providers. It confirms the product, advertiser and environment. A shared ad account still needs the right product’s app or dataset selected.
2. **Write the event map.** For each outcome, save its meaning, sender, destination and counting rule. Include the actual event name and any steps before purchase that answer a useful funnel question. Reuse existing event names when their meaning is correct.
3. **Complete account access.** Follow the relevant [Meta Ads](https://sprid.studio/docs/connect/meta-ads), [Google Ads](https://sprid.studio/docs/connect/google-ads), [RevenueCat](https://sprid.studio/docs/connect/revenuecat) or [Stripe](https://sprid.studio/docs/connect/stripe) guide. You handle login confirmations and enter secrets directly into the secure form. Never paste a key into chat. A saved revenue connection does not configure the purchase sender.
4. **Implement the event and consent path.** The coding agent adds missing events after successful actions, preserves matching information only with the required consent, and handles retries. Check refusal and withdrawal on both browser/app and server delivery. Clearing a browser cookie alone may leave identifiers at the payment provider. Keep an integration disabled if its withdrawal behavior cannot be verified.
5. **Check the intended bidding event.** Confirm that the selected campaign type can use it. Google transaction IDs deduplicate within one conversion action; duplicate purchase actions need separate review. An extra action must not silently become an account-wide bidding goal. For native apps, verify the chosen platform’s install and conversion setup as well as server purchase delivery.

The agent should show one actionable blocker at a time: what needs doing, who can do it, and what result closes it. An unavailable provider API is an access limitation; repeatedly reconnecting your login will not repair it. Work that does not depend on the blocker can continue.

## Verify delivery and duplicate handling.

Ask the agent to keep a short evidence record for each destination:

| Check | Evidence to keep |
|---|---|
| Meaning and source | A redacted source receipt for an authorized action, its stable ID, original time, value and currency. |
| Delivery | The expected event observed in the intended provider and environment. An accepted HTTP request alone is insufficient. |
| Duplicate handling | Replay the same source event with its original identifiers and confirm one counted outcome. A new renewal gets its own payment ID. |
| Matching | Confirm the allowed matching identifiers reach the intended destination, with the required consent. Keep their values out of the evidence record. |
| Consent | Check opt-in, refusal and withdrawal, including queued server events and identifiers stored by integrations. |
| Bidding eligibility | Confirm the event is selectable for the intended campaign and inspect the actual conversion goals when preparing it. |

For Meta browser/server pairs, use the same event name and event ID. RevenueCat and the Meta SDK do not coordinate purchase event IDs, so overlapping purchase logging can double count. For Google, the same transaction ID only prevents duplicates within the same conversion action. [Google’s transaction ID guide](https://support.google.com/google-ads/answer/6386790) explains the scope.

Use the integration’s supported test environment and actions you actually perform. Do not fabricate production purchases, charge a card or issue a refund just to complete verification. Sandbox evidence proves the sandbox path only. Production delivery remains unverified until an authorized production outcome can be observed; record its build and date. Missing per-event diagnostics means duplicate handling stays unverified, even when local retry tests pass.

The result should say **configured**, **observed in test**, or **observed in production**, with separate evidence for duplicate handling and bidding eligibility. These are report descriptions, not automatic certifications from Sprid’s tracking overview. A green connection badge cannot replace the checks above.

## Save the knowledge and use it.

Keep the event map, receipt references and unresolved checks in the product’s existing marketing plan so another agent can continue. With a code repository, maintain `marketing/TRACKING_PLAN.md` and the actual key-event names in `.sprid/app.json`. Save only redacted evidence; no keys, personal customer data or raw payment payloads.

Agent: when available, use `record_ad_measurement_evidence` to persist this record, then read `ad_measurement` to confirm it. Discover the current schema before writing. Scope it to the selected product account, network, channel, dataset/app/conversion target, event, build and environment. Include the observation date and redacted source and destination references, with separate delivery, duplicate handling, consent, matching and bidding-eligibility checks. Use a UUID `requestKey` on retry and set `expiresAt` within 30 days of `checkedAt`. Each check has `status` (`passed`, `failed` or `not_tested`), `summary` and `references`; the bidding-eligibility check is named `optimization`. Passed duplicate handling needs passed delivery plus original and replay/count references. The record is caller-attested; saving it performs no live verification, sends no conversion and grants no launch permission. Preserve local test evidence separately from provider observations. Recheck evidence after a destination or instrumentation change. A dataset read cannot confirm a native Meta app target; that record remains `target_unconfirmed`. Fully passed production checks can make a matching campaign ready for review, and never authorize launch.

For each unresolved check, record the next action and the evidence that will close it. This lets the agent distinguish a connection problem from missing instrumentation without repeating setup next time.

Once the intended signal is verified, follow [Campaigns in Sprid](https://sprid.studio/docs/ads). A successful organic post can supply creative for that campaign. You review the destination, bidding event and budget before launch in Sprid. Setup alone starts no delivery.

Read business purchases and each platform’s attributed purchases separately. Meta and Google may both claim the same sale, so their attributed totals cannot be added as unique customers. Compare like dates, currency and revenue definitions when deciding what to keep or change.

## If a check fails.

- **Connected, but no purchases:** check the actual sender, environment, event name and destination. Reading revenue in Sprid does not send it to an ad platform.
- **Purchases appear twice:** trace one payment across senders and conversion actions. Check automatic SDK logging, an existing shop integration and webhook retries before adding more tracking.
- **Events arrive but cannot be selected:** inspect campaign type, platform eligibility and provider diagnostics. Do not relabel a native event as a website event to bypass setup.
- **The agent cannot access code or receipts:** keep that check unverified and provide a developer handoff with the event map, exact missing access and acceptance check. The setup can continue from that saved record.

## Read this guide through your tools.

The website, MCP and CLI use the same source. Ask MCP for `get_documentation` with `topic: "tracking"`, or run:

```sh
sprid docs tracking
```

`measurement` and `conversion-tracking` are aliases. `sprid docs tracking --offline` reads the installed copy; check its revision before treating it as current.

Agent: read the existing marketing plan first. Discover `ad_campaign_context` and `ad_measurement` when available, then inspect event-specific source receipts and provider diagnostics. Those tools show context and configuration; they do not certify delivery. If this connection lacks a tool or permission, name the gap and preserve the handoff. Follow the [Meta conversion guide](https://sprid.studio/docs/meta-conversions) for provider-specific setup.
