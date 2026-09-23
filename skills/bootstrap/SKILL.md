---
name: bootstrap
description: Read this repo and its relevant public surfaces, reconcile existing marketing work, recommend one evidence-based route, and prepare its first inspectable artifact. Proposes the App Profile without requiring an account. Use when the user says "bootstrap", "where do I start with marketing", "what should I post", or installs the plugin in an app repo for the first time.
---

# /sprid:bootstrap

Read [agent runtime](../../references/agent-runtime.md) first for Codex/Claude invocation, tool discovery, and script paths.
Read [one marketing plan](../../references/guided-marketing.md) before discovery. Bootstrap updates that plan; it does not create a parallel checklist.

The free door. Nothing here needs a Sprid token; the output is files in the repo and a plan the user can read in two minutes. The one job is a **diagnosis the user can screenshot**: what the app is, what useful marketing work already exists, which route fits the evidence, and one inspectable artifact. A post is one possible artifact. If the run ends with a generic checklist it failed.

## What this touches

Reads: the repo (config, existing marketing material, relevant public product surfaces, `git log`). Writes only the missing artifact and plan under `marketing/`, plus `.sprid/app.json` when an App Profile draft is useful. Sends nothing anywhere. Never reads `.env` values into the conversation; it only notes which keys exist.

## 1. Find the app

- Detect the existing stack before selecting files. Bundle/package ids may live in Xcode build settings and `Info.plist`, Gradle files (`build.gradle` or `build.gradle.kts`), Flutter platform directories, Expo `app.json` / `app.config.*`, fastlane metadata or release config. Web-only products may have no store ids. Reuse existing tooling; missing Expo files are not a setup failure.
- Store metadata in-repo: `fastlane/metadata/`, `store/`, `metadata/`, any `*.strings` with a subtitle or keywords.
- Landing site: `apps/site`, `web/`, `www/`, a root `index.html`, an Astro/Next project. Read the H1, the sub, the first paragraph.
- Analytics and revenue ids, by name only: PostHog (`POSTHOG_KEY`, `posthog.init`), RevenueCat (`REVENUECAT`, `Purchases.configure`), Cloudflare (`wrangler.toml` zone), Search Console (`sc-domain:` in a config).
- `git log --since="90 days ago" --pretty="%ad %s" --date=short`: what shipped, and whether any of it was marketing (copy, screenshots, listing, pricing).

When the app has a store listing and store discovery or conversion is relevant, fetch `https://apps.apple.com/app/id<APP_STORE_ID>` and `https://play.google.com/store/apps/details?id=<PACKAGE>`. Read the name, subtitle, first screenshot's headline, description's first two lines, rating count. A web-only product does not fail this check.

If the repo is not a product people use (an app, website or service), say so in one line and stop.

## Check whether product use is measurable

Read [product measurement coverage](../../references/marketing-review-checks.md#product-instrumentation-workflow) and [instrumentation checks](../../references/marketing-review-checks.md#instrumentation-checks). Inspect analytics dependencies and actual emitting code, including wrappers, router integration, onboarding steps and core feature success. Check the existing provider, including alternatives to PostHog. List what is observed, missing or unverified; configuration alone does not verify delivery. Use an available authorized live read to check recent events, but bootstrap still works without provider access.

If product analytics is absent or incomplete, include a concrete instrumentation recommendation in `marketing/PLAN.md`: which screens/actions to measure, where code should emit, the real activation definition and how to verify an ordered onboarding funnel. Follow [service selection and access](../../references/marketing-review-checks.md#choose-services-by-the-question): reuse existing providers, recommend by capability when something is missing, and distinguish a Sprid connection from an agent tool or export. Check other measurement categories only where the diagnosis needs them. If events already arrive and only access is missing, recommend the verified read path. Do not turn a missing key into a claim that the app has no analytics, or silently implement app changes during bootstrap.

## Discover the app's own review data

Follow [repository review sources](../../references/repository-review-sources.md). Inspect earlier reports, repository instructions and reporting scripts for data the connected sensors cannot answer: durable product actions, lifecycle messages, demand ledgers or app-specific cohorts. Preserve their definitions and read paths in local `review.investigations` entries in `.sprid/app.json`.

After discovery, ask once whether future reviews should include other app-specific data. Name what you found so the user can add only what is missing; ask about the product question, never for credentials or a database dump. Continue the diagnosis while waiting. Preserve a previous answer, and record an unanswered question as pending rather than as a refusal. Existing app migrations get this discovery too, without repeating listing, voice or first-post work the user did not request.

## 2. Grade a relevant listing

Run this section only for an app with a store listing when listing quality can
change the selected route. Otherwise record “not applicable” and inspect the
actual acquisition destination instead.

Five checks, each pass/fail with the evidence quoted:

1. **The name follows the brand’s naming constraints and makes the product identifiable.** (Apple 30 chars, Play 30.) Quote the current name. Treat category terms as an evidence-based option, not a pass/fail requirement.
2. **The subtitle explains a concrete benefit.** Check it against the app’s audience and positioning.
3. **Screenshot one carries the reason to install.** Quote its headline if the repo has the source; otherwise say it could not be read.
4. **The description's first line survives the fold** (about 170 chars on iOS before "more").
5. **Ratings.** Count and average from the listing page. Under 20 ratings is a fact, not a failure; say it plainly.

Score as `n of 5`, never a percentage.

## 3. Read the voice

Read and preserve an existing voice guide first. Create `marketing/VOICE.md`
only when no usable guide exists; update an existing guide only when the user
asked for that change or accepted a clearly scoped standing preference. When a
guide is missing, derive it from what the repo already says, not from a template:

- Three lines lifted verbatim from the repo's own copy (onboarding strings, landing page, README) that sound like a person.
- The words the app uses for its user's problem and for the relief. If the repo has user reviews or a `reviews/` export, prefer those.
- A never-say list derived from the customer’s instructions and existing copy. Separate explicit prohibitions from inferred preferences.
- Register: preserve the account’s perspective, formality, punctuation and use of calls to action. If these are unclear, propose a voice appropriate to its audience and mark it as a draft.

If the repo has no copy at all, say so and write the guide from the listing plus one question for the user: "who is this for, in one sentence, without the word 'anyone'."

## 4. Prepare the first artifact

Choose the route from the observed product, audience and existing distribution. A product demo, useful search page, store-listing change, profile package, measurement patch or outreach draft can be a better first artifact than a social post. Social-account creation never blocks another supported route. Preserve an explicit artifact the user asked for.

When content is the recommended route, draft the first post:

Draft one carousel in `marketing/posts/001-<slug>.md`, unless the user has requested
another format. Use the account's existing templates where available; otherwise choose
an appropriate structure for the app and explain that choice briefly.

When Pinterest is the recommended or requested channel, read [Pinterest content and publishing](../post/guides/pinterest.md) and draft one standalone image Pin, preferably 2:3, or a finished video concept, preferably 9:16, instead of a carousel. Start from a matching destination page, and include its board, title, description, URL, alt text and measurement plan. Instagram/TikTok open-loop and slide-completion rules do not apply.

- State the opening promise clearly and deliver on it in the following slides.
- Give each slide a distinct role and keep text readable at the intended size.
- Choose educational, narrative, demonstration or other framing from the brief.
- Place the app mention and any call to action where they serve the post's purpose.
- Use the customer's voice for headlines, captions, punctuation and imagery.

Add a caption and relevant hashtags when they suit the destination. Keep factual
claims sourced. Do not invent testimonials, usage figures or customer outcomes.

Then run the voice's never-say list over it. Fix, do not explain.

## 5. Say what Tuesday is

`marketing/PLAN.md`, one page:

- Recommend a channel and explain how its audience and format fit this app. Use
  existing results where available; label an untested choice as a hypothesis.
- Define the content or listing work, the outcome to observe and the next review
  point. Match cadence to the customer's objectives and ability to publish.
- Name measurement gaps that limit the recommendation. Paid experiments require
  a budget and approval; a missing benchmark does not prevent preparing drafts.
- If the app's market needs capabilities outside Sprid, state that gap and still
  deliver the useful local diagnosis.

## 6. Propose the App Profile

Write `.sprid/app.json` with every identifier found (no secrets), in the App Profile's own field names:

```json
{ "slug": "<slug>", "name": "<name>", "appStoreId": "...", "playPackageName": "...",
  "gscProperty": "sc-domain:...", "posthogProjectId": "...", "posthogHost": "https://eu.posthog.com",
  "revenuecatProjectId": "...", "cloudflareZoneId": "...", "repoUrl": "...", "websiteUrl": "..." }
```

Tell the user which identifiers matter for the chosen plan and where to find the missing ones. Preserve any existing `.sprid/app.json` fields you did not infer again.

Find the existing app icon in the config: Expo `icon`, `AppIcon.appiconset`, Android launcher assets or the site's touch icon. After authorized setup, follow [keep setup current](../../references/setup-continuation.md#keep-setup-current). Verify the saved avatar; a store or website URL is only a possible import source. Preserve any custom avatar.

After delivering the first result, save its continuation using
[resuming setup](../../references/setup-continuation.md). Keep the exact artifact,
app and task through signup. Choose `publish` for a content draft, `review` for a
question that needs connected evidence, or `repo` for a local improvement. Respect
an entry source supplied by the website prompt; otherwise use `installed-skill`.
Continue authorized setup, then return to that same work for review. A declined
connection leaves the draft local. Do not start a second generic draft after login.
Link an existing shared action with `sprid plan link-local --id <action-id>
--app <slug>`. When the local text artifact must enter the shared plan, use
`sprid plan prepare-local --file <action.json> --app <slug>` once; the original
task ID makes retries idempotent and the imported body must match the local file.

## 6b. Continue integration

Once connected, follow [keep setup current](../../references/setup-continuation.md#keep-setup-current). Read the shared `next_actions` list and verify app identity, saved icon and voice, then the publishing and measurement setup the route needs. Continue authorized setup without asking again for routine steps; provider consent stays with the user.

Name the publishing destinations already connected and the next missing destination when the route uses content. If the provider account does not exist, follow [account creation](../connect/guides/social-accounts.md). For measurement, distinguish a source Sprid can read from a local-only read and an unavailable source; cite local evidence on its own merits. Offer the next useful connection through [connect](../connect/SKILL.md), with what it unlocks. A declined connection leaves the prepared work usable and does not trigger another setup pitch.

## 7. Report

Under 200 words: lead with the recommended route and why, then name the prepared
artifact path and the evidence or uncertainty that matters. Include a listing
grade only when section 2 applied, and name only profile fields relevant to this
work. End with the one action that continues the prepared result - and if that
result has no connected destination or no connected evidence, the missing
connection is that action. Never close on a draft without saying where it can go.

Never invent a number. If the listing could not be fetched, say "listing not read" and grade what the repo holds.

## Then: what is next

Follow [agent runtime: next useful action](../../references/agent-runtime.md#end-with-the-next-useful-action). Prefer the saved artifact or decision that advances the recommended route. Setup appears only when that exact action needs persistence, connected evidence or execution; a missing account or CLI is not itself the next marketing move.
