---
name: measurement
description: Make the numbers a business runs on trustworthy. Inventory what is tracked, write a tracking plan from the questions the business needs answered, implement it when asked, then fire each event and check that it arrived before anyone reads the numbers. Use when a marketing review or bootstrap finds missing or broken tracking, when a key event goes silent, or when the user says "tracking", "analytics", "events", "funnel", "PostHog", "GA4", "pixel", "conversion tracking", "UTM" or "this number looks wrong".
---

# /sprid:measurement

Read [agent runtime](../../references/agent-runtime.md) first for Codex/Claude invocation, tool discovery, and script paths, and run its [version check](../../references/agent-runtime.md#versions-at-the-start-of-a-job) once per session before anything else.
Read [one marketing plan](../../references/guided-marketing.md). Measurement earns its place when a decision depends on it; start from that decision.

The job is a number the next review can read at face value. A saved key, an
installed SDK or a dashboard is not that; an event observed arriving from the
deployed product, with the meaning the plan gives it, is.

## What this touches

Reads the repository's analytics code and configuration, the provider's event
definitions and recent volume (through Sprid's stored connection when
connected), and earlier reports. Writes `marketing/TRACKING_PLAN.md` and the
event map in `.sprid/app.json`. Changes app code only when the user asked for the
implementation or already authorized it. Never creates a provider account,
enables a paid feature or puts a read key in client code.

## 1. Inventory what exists

Follow [before connecting: can you measure product use?](../../references/marketing-review-checks.md#before-connecting-can-you-measure-product-use).
Find the provider, the shared analytics layer, router integration, onboarding and
purchase code, and any server that emits events. Then read what actually arrives:
with PostHog connected, `query_marketing_posthog` for the last 28 days of each
candidate event, counted in people, split by surface (`$lib`) and app version.

Give every event one status: `live` (arrives, means what its name says),
`rename` (arrives under a name or with properties the plan should change),
`broken` (expected and not arriving, or arriving twice) or `new` (not sent yet).
Configuration alone is `unverified`, never `live`.

## 2. Plan from the questions

List the decisions the business cannot make today and the question behind each:
where onboarding stops, whether people get value and return, whether use leads to
payment, which sources bring people who stay. For a shop: where carts are
abandoned and who buys again. For a service: which enquiries become paid work. Use the [question table](../../references/marketing-review-checks.md#instrument-the-questions-you-need-answered)
for what each needs.

Write `marketing/TRACKING_PLAN.md` with one row per event:

| Question | Event | Properties | Sent from | Status | Verified |
|---|---|---|---|---|---|
| Where does onboarding stop? | `onboarding_step_completed` | `step_id`, `flow_version` | onboarding screen, after success | new | |

Keep it to the events a decision needs. Preserve existing event names; a rename
keeps the old name readable across the build boundary and records the first
build that sends the new one.

## 3. Implement, when asked

Use the app's conventions and its shared analytics layer. Emit after success,
not on tap. Send durable outcomes (account created, payment confirmed) from the
server where one exists, with the same identity and a deduplication rule if the
client also sends them. Respect consent and opt-out on both paths. Keep private
text out of properties. The [instrumentation workflow](../../references/marketing-review-checks.md#instrument-the-questions-you-need-answered)
covers identity, surfaces, anonymous onboarding and website-to-app handoffs.

## 4. Fire each event and check it arrived

For every `new`, `rename` or `broken` row, use the live product (an app build on a
simulator or device, the website in a browser) as a test identity and trigger it. Then read the provider and check:

- it arrived in the intended project, within minutes;
- once per action, not on every render or retry;
- with its properties intact after ingestion (a property can be dropped by a
  validator after a successful client call);
- with the same identity before and after sign-in, and reset on sign-out;
- with surface, build and environment properties;
- with no private payload, and not before consent where consent applies;
- with the test identity excluded from customer metrics.

Run one pass that exits midway, so the funnel's non-completion is observable.
Write the date, build and result into the `Verified` column. If production cannot
be checked from here, say so and give the exact remaining check.

## 5. Register the key events

Put the app's actual names in `posthogEvents` in `.sprid/app.json` and, when
profile updates are authorized, on the App Profile: `signup`, `activation`,
`onboardingCompleted`, `paywallShown`, `purchase`, `trialStarted` as they apply.
A shop's `purchase` is the paid order and `signup` may be a newsletter or account;
a service business usually has an enquiry or booking event as its `activation`.
Sprid's daily measurement checks read these names; one is the alert when a key
event that arrived every week reaches nobody for seven days. Add funnel entry
pages to `entryUrls` so a dead entry is caught too.

## Links people write by hand

Sprid tags the links it publishes on Pins and ads. Links written by hand (email,
bio, partners, creators, community posts) need one convention, recorded in the
tracking plan: lowercase values, `utm_source` for the site or sender
(`instagram`, `newsletter`), `utm_medium` for the kind (`social`, `email`,
`referral`, `paid`), `utm_campaign` as a stable slug. Variants of one source
(`Facebook`, `facebook`, `fb`) split its numbers; the review flags them.

## Provider notes

- **PostHog:** pin every query to the project; tell surfaces apart by `$lib`
  and an explicit surface property; flag internal and test people and exclude
  them in queries.
- **RevenueCat:** money comes from RevenueCat or the store, not client events. Put
  price, currency, product, offering and whether it loaded on the paywall event.
- **GA4 / Firebase:** prefer the recommended event names (`sign_up`,
  `tutorial_complete`, `purchase` with `value` and `currency`) and mark the
  ones that matter as key events. Verify in DebugView.
- **Plausible, Umami and other cookieless tools:** goals and revenue goals count
  totals; there is no person, so no cohort or return rate.
- **Web shop pixel with a server-side Conversions API:** send both with the same
  `event_id` and event name so the platform deduplicates them. Platform-reported
  purchases above the shop's real orders mean deduplication is failing. For
  Sprid's own conversion setup read [Meta conversions](../ads/guides/meta-conversions.md).

## Report

The tracking plan's path, the events verified with build and date, the ones still
unverified with the exact check that remains, and which decisions the review can
now answer. Never present an unverified event as working.

## Then: what is next

Follow [agent runtime: next useful action](../../references/agent-runtime.md#end-with-the-next-useful-action). When the plan came from a review, the next review reads the verified rows; say when its first comparable read is.
