# Pinterest content and publishing

**What this guide does:** Plan searchable Pins, approve a useful batch, let Sprid publish the selected Pins on schedule and judge the result by qualified traffic and activation.

Checked against Pinterest’s guidance on 21 September 2026. Anything labelled a test is a starting hypothesis, not a claim about what will win for your account.

## How Pinterest discovery works

Pinterest is visual search and recommendation. A Pin can show up in search, home feeds and related Pins long after it is published, mostly regardless of followers.

Relevance comes from the Pin itself and how people interact with it: clear keywords, original imagery, link quality and board context. Pinterest publishes no weighting. Make the visual, title, description, board and landing page all answer the same “what is this about?”, in the words a person would search, without repeating a keyword unnaturally.

Because Pins keep getting found, compare them at equal ages and keep older Pins in the analysis.

## Start with the destination

Pick the page and the action before making the visual:

1. One useful guide, tool, feature page or store destination.
2. The concrete question it answers.
3. One next action that continues the same task, such as opening that feature.
4. Campaign parameters added without removing existing ones, with a stable Pin or creative ID so visits trace back to the exact Pin.

The page must deliver the pictured promise immediately and work on a phone. A specific Pin that lands on a generic homepage breaks the promise. A store visit is not an install, and an outbound click is not activation: report each step separately.

## Prepare the website

- **Claim your website** in Pinterest to link the profile to Pins from that domain and get website analytics. A website can be claimed by only one Pinterest account.
- **Rich Pins:** for articles, products or recipes, add Open Graph or Schema.org metadata. Pinterest syncs it from the page; it is not a Sprid export. Check how it appears before a batch, because editing a Pin by hand can override synced article or recipe details.
- Make sure Pinterestbot can read the page, links work and it loads fast on mobile.

## Choose topics and boards

Build the topic list from Pinterest Trends, Pinterest search suggestions, customer language and site queries that already work. Search Console is a useful seed, but Google demand doesn’t prove Pinterest demand.

Mix evergreen questions with relevant seasonal moments. Use focused boards whose name and description explain the topic: a Pin about apartment-viewing costs belongs on a board about buying an apartment, not a broad “Ideas” board. Only create a board when the topic can fill it.

## Build the Pin

| | Ratio | Ideal size | Notes |
|---|---|---|---|
| Image | 2:3 | 1000 × 1500 px | |
| Video | 9:16 | 1080 × 1920 px | 4 seconds to 5 minutes, H.264 or H.265 |

Sprid publishes one image or one finished video per Pin. It never turns an Instagram carousel into a Pin, so make a dedicated asset and check its crop in the preview.

At thumbnail size the subject and benefit should still be clear: one focus, strong contrast, short readable overlay copy. Check the real phone preview. The Pin must stand alone; an opener that only makes sense after swiping is incomplete here.

Formats worth testing:

- an editorial cover for a specific guide
- a reference card with a concrete checklist or answer
- a real app demo showing one task
- a coherent visual collection for design, travel or architecture
- a short captioned video when motion explains the task better

Pinterest can label detected or declared AI imagery. Keep provenance, use accurate licensed assets and disclose where required. Never publish an image that misrepresents the linked place, product or result.

## Write the metadata

| Field | Limit | Notes |
|---|---|---|
| Title | 100 characters | Put the subject early; feeds may cut it. |
| Description | 800 characters | Often hidden in feeds, but Pinterest reads it for relevance. |
| Alt text | 500 characters | Describe what the image shows. Not a keyword field. |

Write a natural title and description naming the topic, audience or situation and what the destination provides. Choose a relevant board, add a working destination, and set the AI disclosure in Sprid when it applies. No stuffed keyword variants, unrelated trends or promises the page doesn’t keep.

The visual earns attention, the metadata gives context, the destination completes the task. Keep all three aligned.

## Publish your first Pin

Publishing and scheduling need Sprid’s Pinterest app to have Standard access. With Trial access you can connect, browse boards and prepare drafts, but Sprid refuses to publish or schedule. That access belongs to Sprid’s integration; you don’t apply for a developer app.

1. Connect Pinterest, run `sprid status` and confirm the account.
2. Create or open a post with exactly one image (ideally 2:3) or one finished video (ideally 9:16).
3. Open **Publish**, select **Pinterest**, then pick a **Board** and optional section.
4. Add the title, description, destination, alt text and any AI disclosure.
5. Check the rendered creative and every public field. Publish now or pick a time.
6. After delivery, open the Pin signed out or from another account and follow its link.

**CLI:** `sprid pinterest boards --account <slug>` lists board IDs, or says there are none; create one with `sprid pinterest create --account <slug> --name <name> [--privacy public|secret]`. `sprid pinterest set <postId> --board <id> --link <url>` saves the draft (optional metadata flags in `sprid docs cli`); review and schedule it in Sprid. `sprid pinterest metrics <publishId> --account <slug>` reads results.

**MCP:** read `get_documentation` topic `pinterest-content`, pick the exact channel from `list_connections`, then `list_pinterest_boards`. If there are none, say so, and call `create_pinterest_board` only with a name and privacy the user approved. Save `pinterestOptions` with `update_post`, preferring `aspectRatio: "2:3"` for a new image Pin. Show the user the rendered Pin or dry-run batch, then call `schedule_post` or commit `schedule_batch` only for the Pins they chose. `get_pinterest_metrics` reads results.

## Choose a cadence to test

Start with **2 original Pins a day** in separate slots. With a broad catalog of useful destinations and genuinely distinct assets, test **5 a day** against that. These are Sprid’s proposed tests, not Pinterest limits or proven optimums. A small destination library needs more useful content, not cosmetic duplicates in the queue.

Rotate destinations and topics. Start with two distinct treatments per destination, on different days. No exact spacing or best hour is established.

What the evidence says: Pinterest recommends original content at least weekly. [Sarah Hanford](https://www.sarahhanford.com/blog/pinterest-growth-organically-60-days) went from three Pins a day to five alongside keyword research and a new website, so frequency isn’t isolated as the cause. [Tailwind’s benchmark](https://www.tailwindapp.com/pinterest-marketing/research/2025-benchmark-study-part-1) of about 1.2 million organic Pins (2024 data) found results concentrated in a small share of Pins; its English-speaking, observational sample can’t set a universal cadence.

## Review and schedule the batch

For a two-a-day test, choose **Daily** and two times in the batch scheduler, for example **09:00 and 17:00** (convenient, not researched best times). Check the account’s timezone and the actual dates before confirming; they may differ from your device. Keep a cadence the user already chose unless they ask to change it.

Order Pins so destinations alternate, and check the calendar preview for busy days, gaps and unplaced Pins. Preparing a large batch at once is fine; publication spreads across the schedule.

**MCP:** `schedule_batch` with `cadence: "daily"`, `times: ["09:00", "17:00"]`, the account/channel and the selected post IDs. Run `dryRun: true` first and check `placements`, `unplaced` and `timezone`. Busy days are skipped by default, so read the returned plan instead of promising an end date. Commit only the reviewed Pins and report what was booked. CLI users read this guide with `sprid docs pinterest-content` and the queue with `sprid queue`; place batches in the scheduling screen or over MCP.

Before approving, check every Pin’s creative, metadata, destination, board and time, plus factual claims, rights and disclosure. Pinterest’s developer guidelines require the user to choose each Pin that publishes: Sprid shows the concrete Pins and schedule and records the selection. Those Pins then publish on time without asking again.

- Moving only the time keeps the reviewed Pin. Changing content, board or link means reviewing and rescheduling it; changed drafts can be blocked at publish until reviewed.
- After an unclear publish failure, check Pinterest before retrying; the Pin may already exist.
- After the first Pin publishes, check it and its link from outside the connected account. A draft, preview or accepted schedule is not delivery.

## Measure what happened

- **Impressions:** times the Pin was on screen.
- **Saves:** times people saved it to a board.
- **Pin clicks:** opens of the Pin in close-up.
- **Outbound clicks:** clicks through to a destination outside Pinterest.
- **Video views:** at least 2 seconds with at least 50% of the video in view.

For app growth the path is **impression → outbound click → qualified visit → app action → activation**. Saves are a diagnostic, not the goal: a Pin with many saves and few outbound clicks may be a good reference on Pinterest and bring little acquisition.

Compare Pins of similar age within the same topic, language and market. Judge creative by outbound-click rate and qualified visits, the whole path by activations per Pin and revenue where available. Pinterest’s outbound clicks and your own site sessions are measured differently; show both rather than forcing them to match.

Review cohorts at 30, 60 and 90 days of Pin age. Report counts and coverage, including results with the top Pin removed, so one outlier can’t set the strategy. Keep a higher frequency while extra Pins keep adding qualified visits or activations; a lower click rate alone doesn’t cancel growth in total qualified traffic.

- Visits but no activation: check page speed, message match and the next app action before making more Pins.
- Low impressions: check topic relevance, board, metadata and visual clarity.
- Negligible qualified traffic and activation across repeated relevant cohorts: stop scaling Pinterest for that app.

## Improve the next batch

Change one meaningful thing per comparison (visual treatment, question, format or destination angle) and repeat across comparable destinations. Organic distribution isn’t randomized, so call it a directional test, not an A/B test.

Make fresh, useful treatments, not cosmetic duplicates. [Tailwind’s freshness study](https://www.tailwindapp.com/pinterest-marketing/research/2025-benchmark-study-part-three) found new images for an existing URL kept distribution better than reusing the same image and URL (an association, not a guaranteed lift). Pinterest advises against re-uploading the same Pin, and repetitive or irrelevant commercial content can be treated as spam. Space treatments of the same destination apart and keep every Pin on a relevant board.

For a worked example, [Elaine Timms’s recipe-client case](https://elainetimms.com/evergreen-growth-how-food-creator-pins-for-profit/) combines search-specific overlays, creative variants and email opt-ins. Its growth can’t be credited to cadence alone.

## Sources

- [How Pinterest discovery works](https://create.pinterest.com/blog/how-to-increase-discoverability-seo-pinterest/)
- [Growing through search, boards and keywords](https://create.pinterest.com/blog/best-ways-to-grow-on-pinterest/)
- [Pin specifications](https://help.pinterest.com/en/article/review-pin-specs)
- [Pin performance and distribution](https://help.pinterest.com/en/business/article/pin-performance-and-distribution)
- [Pinterest Analytics definitions](https://help.pinterest.com/en/business/article/pinterest-analytics)
- [Pinterest developer guidelines](https://policy.pinterest.com/en/developer-guidelines)
- [Pinterest API schema](https://github.com/pinterest/api-description/blob/main/v5/openapi.json)
- [Pinterest community guidelines](https://policy.pinterest.com/en/community-guidelines)
- [Pinterest labels for AI-generated or modified images](https://help.pinterest.com/en/article/gen-ai-labels)
- [Claim your website](https://help.pinterest.com/en/business/article/claim-your-website)
- [Rich Pins](https://help.pinterest.com/en-gb/business/article/rich-pins)
