---
name: ads
description: Prepare, review and run paid campaigns on Meta through Sprid - campaigns, ad sets, creatives built from archetypes, the copy gate, the launch that spends, the weekly verdict and the post-mortem. Use when the user wants to run ads, boost a post, check how a campaign is doing, kill or scale an ad set, or asks what their competitors are paying to show. Requires the sprid MCP server and, to spend anything, a token holding ads:spend.
---

# /sprid:ads

Read [agent runtime](../../references/agent-runtime.md) first for Codex/Claude invocation, tool discovery, and script paths.
Read [one marketing plan](../../references/guided-marketing.md). An ad serves the plan's active goal; a campaign with no stated hypothesis is money spent on finding out nothing.

Everything here prepares. **Exactly one call spends money**, it needs the user to
say so, and it is the only call in this skill you may never make on your own
initiative. Everything before it is drafting, and everything after it is reading.

Ads are the surface where being wrong is most expensive. A post that breaks a
voice rule can be deleted. An ad that breaks one has already been shown to people
the user paid to reach.

## The order

1. **`ads_overview`** - what the account can actually do: the ad account, the
   page, the pixel, the caps, and `canRunAds`. If that is false, stop and fix the
   connection; nothing below will work and a half-built campaign is worse than
   none.
2. **`suggest_ad_categories`** - read the copy and declare the regulated
   category if there is one. See below; this is the step with legal consequences.
3. **`create_ad_campaign`** → **`create_ad_set`** → **`create_ad_creative`** →
   **`create_ad`**. Or **`create_ad_batch`** for one copy against several
   creatives, which is the normal shape of a test.
4. **`review_ad_copy`** on every piece of copy before it goes anywhere near the
   launch. Errors stop the launch; fix them rather than arguing with them.
5. **`launch_ads`** with `confirmed: true`, on the user's explicit word.
6. **`ad_council`** once a week. **`ad_post_mortem`** and **`close_ad_set`** when
   it ends.

## Declare the regulated category

`special_ad_categories` on the campaign. Housing, credit, employment and
political advertising have targeting restricted by law in several markets, and an
undeclared one does not get quietly rejected - it gets pulled, with the ad
account attached to it.

`suggest_ad_categories` reads the copy and guesses. Treat a guess as a prompt to
think, not as clearance. Anything about where people live, what they can borrow,
or who gets hired is in scope even when the product is not obviously one of those
things: an app that values apartments is housing-adjacent by construction.

If you are unsure, say so to the user and let them decide. That is a question
worth interrupting for.

## An ad creative must carry its archetype

`create_ad_creative` refuses without one, and the refusal is the point.

An archetype is a recipe, not a tag: what the shape is, which slots it takes,
what breaks it, and how long competitors' versions of it have been running.
Untagged creatives are how a system degrades into an ads dashboard with extra
steps - you keep the ability to launch and lose the ability to learn, because
afterwards an outcome can only be read as "ad 7 beat ad 3" rather than "the
shape that shows the product's verdict beat the shape that lists features".

Read [archetypes.md](archetypes.md) before building a creative. `ad_archetypes`
lists what an account has, `render_ad_creative` builds one from a recipe plus
slot values, and `archetype_standing` says how each shape is doing for this
account against the competitor baseline.

## The copy gate

`review_ad_copy` runs the shared vocabulary rules plus the account's own
never-say lists, each carrying the reason it exists - so a refusal cannot be
worked around by rephrasing until it passes. What it catches:

- **Forbidden vocabulary**, the same list the organic content runs against.
- **The account's never-say phrases**, one-offs and named presets. A phrase may
  be **quoted** and may not be **asserted**: a listing's own words printed over a
  photograph of what they describe is a quotation, and the reader draws the
  conclusion. The same words as our claim are something else.
- **Manufactured urgency.** State the real deadline or drop it.
- **An opening that names an identity rather than a moment.** "For anxious
  people" is a category; "You reread the message four times before sending it" is
  a moment, and the moment is what stops a scroll.
- **Length before the fold**, and headline truncation.

Warnings pass. Errors stop `launch_ads`. A draft is allowed to be wrong; an ad
about to be paid for is not.

## The one call that spends

`launch_ads` requires a token holding `ads:spend` **and** `confirmed: true`.
Preparation never launches. Every object you built before this is paused, and
staying paused costs nothing.

Never launch because it seemed like the obvious next step. Show the user what
will run, what it will cost a day, and for how long, and wait. If their token
lacks `ads:spend`, say so plainly: that scope is granted deliberately, on a token
minted for it, and quietly working around it is not an option.

The same rule governs `start_promotion`, which is the other way spend begins.

## Budgets, pauses and rules

- `update_ad_budget` changes a budget. **You do not move spend on your own.** An
  agent that reallocates a budget between reads is a worse failure than a
  campaign that runs three days too long, because the user can see the second one.
- `pause_ad` / `pause_ad_set` stop delivery, and a pause is only real once the
  platform confirms it. An unconfirmed compensating pause leaves the row needing
  attention: say that, rather than reporting a pause that may not have landed.
- `create_ad_rule` and `evaluate_ad_rules` express "if this, then that" as
  something the user approved once, which is the honest way to automate a pause.

## Reading results

**`ad_council` is the weekly judgement**, and it answers "did this work, why, and
what next" rather than printing a dashboard. It reads cost per optimised event
first and impressions last, on purpose: the order a report puts numbers in is the
order people believe them in.

It also says whether a set is **readable** at all. Below the learning phase,
nothing in it means anything - and the most common way to waste money on ads is
to kill a set before it has told you anything, then conclude the shape does not
work.

- `ad_metrics` and `ad_breakdown` for the detail. **Never sum a campaign row and
  its children**; they are independent reporting levels and adding them double
  counts everything.
- Paid numbers come from saved rows over a stated window, so a period that ends
  today and a period that ended last Tuesday are two different readings. Say
  which one you used.
- `report_ad_outcome` is where the product's own cohort read comes back - the
  install that became a subscriber, which the platform cannot see. When it is
  available it outranks every platform number in the same report.

## When something works, and when it doesn't

- **`iterate_winner`**: same copy, new creatives, behind the winner. One variable
  at a time or the result teaches nothing.
- **`ad_post_mortem`** then **`close_ad_set`**: write down what the hypothesis
  was, what happened, and which archetype carried it. An archetype standing is
  only as good as the post-mortems behind it.
- A losing set is data. Close it and say what it ruled out.

## Where the shapes come from

The archetype library was read off live competitor ads, and it can be refreshed
against the user's own market rather than inherited from ours - the `scout` skill
harvests the public ad library for exactly this. Two things travel with those
numbers and must travel with every sentence you write from them:

**Days live is the only performance signal the ad library gives**, outside EU
political ads. There is no spend, no impressions, no click-through rate. It means
somebody keeps paying, not that it is efficient. Never call a competitor's ad
"best-performing" on that evidence, and never let a baseline built from it be
quoted as a benchmark of results.
