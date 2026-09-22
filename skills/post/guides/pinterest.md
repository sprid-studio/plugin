# Pinterest content and publishing

**What this guide does:** Plan searchable Pins, approve a useful batch, let Sprid publish the selected Pins on schedule and judge the result by qualified traffic and activation.

Checked against Pinterest’s current guidance on 21 September 2026. Recommendations labelled as tests are starting hypotheses, not claims about what will win for your account.

## How Pinterest discovery works

Pinterest works as a visual search and recommendation system. A Pin can appear in search, home feeds and related recommendations long after publication. Discovery does not depend primarily on followers.

Pinterest says relevance comes from signals in the Pin and how people interact with it. Clear keywords, original imagery, link quality and relevant board context help Pinterest understand the subject; Pinterest does not publish a fixed weighting for them. Give one coherent answer to “what is this about?” across the visual, title, description, board and landing page. Use the language a person would search, without repeating a keyword unnaturally.

Pins can remain discoverable after publication. Compare results at equal Pin ages, and keep older useful Pins in the analysis instead of treating the first day as the full result.

## Start with the destination

Choose the page and desired user action before making the visual:

1. Pick one useful guide, tool, feature page or store destination.
2. State the concrete question it answers.
3. Choose one action that continues the same task, such as opening the relevant feature or starting its setup.
4. Add campaign parameters without deleting existing URL parameters. Use a stable Pin or creative identifier so visits can be traced back to the exact Pin.

The destination must deliver the pictured promise immediately and work well on a phone. A specific Pin leading to a generic homepage usually breaks that promise. A store visit is not an install, and an outbound click is not activation; keep each step separate in reporting.

## Choose topics and boards

Use Pinterest Trends, Pinterest search suggestions, customer language and proven site queries to build a topic list. Search Console is a useful seed, but Google demand does not prove Pinterest demand.

Mix evergreen questions with relevant seasonal moments. Use a focused board whose name and description explain the topic. A Pin about apartment-viewing costs belongs on a board about buying an apartment, not a broad “Ideas” board. Create a new board only when the topic will support a useful collection.

## Choose a cadence to test

Sprid recommends **2 original Pins per day as an initial experiment**, spread across separate slots. With a broad catalog of useful destinations and genuinely distinct assets, test **5 per day** against that baseline. These are proposed test settings, not Pinterest limits or proven optima. A limited destination library calls for expanding useful content, not filling the queue with cosmetic duplicates.

Create and review batches together, then spread publication across the calendar. Rotate destination pages and topics. Start with two distinct creative treatments per destination; space those treatments across different days. Neither an exact spacing interval nor a universal best hour is established by the evidence reviewed.

Pinterest itself recommends original content at least weekly. Marketer examples range from one daily Pin to several: [Sarah Hanford](https://www.sarahhanford.com/blog/pinterest-growth-organically-60-days) reports moving from three daily to five, alongside keyword research and a new website. That does not isolate frequency as the cause of growth.

[Tailwind’s benchmark](https://www.tailwindapp.com/pinterest-marketing/research/2025-benchmark-study-part-1) covered approximately 1.2 million organic Pins, using 2024 data. Results were concentrated in a small share of Pins. Its English-speaking customer sample and observational design cannot establish a universal cadence or predict another market’s conversions.

Review cohorts at 30, 60 and 90 days of Pin age. Change one variable per test and repeat across comparable destinations. Keep higher frequency when additional Pins repeatedly produce additional qualified visits or activations; a lower click rate alone does not invalidate growth in total qualified traffic. Report counts and coverage, including results with the leading Pin removed, so one outlier cannot determine the strategy.

## Build the Pin

For an image Pin, use **2:3**, ideally **1000 × 1500 px**. For full-screen video, use **9:16**, ideally **1080 × 1920 px**. Pinterest currently allows organic video from **4 seconds to 5 minutes** with H.264 or H.265 encoding.

Sprid publishes one selected image or one finished video per Pin. It does not silently turn a multi-slide Instagram carousel into a Pinterest Pin. Prepare a dedicated Pinterest asset and inspect its crop in the preview.

At feed-thumbnail size, the subject and benefit should still be clear. Use one visual focus, strong contrast and brief readable overlay copy. Check the real phone preview. The Pin must stand alone; an Instagram opener that only makes sense after swiping to slide two is incomplete here.

Useful formats to test include:

- an editorial cover for a specific guide;
- a reference card with a concrete checklist or answer;
- a real product or app demonstration showing one task;
- a coherent visual collection for design, travel or architecture;
- a short captioned video when motion explains the task better than a still.

Pinterest can label detected or declared AI imagery. Preserve provenance, use accurate licensed assets and make any required disclosure. Never publish an image that misrepresents the linked place, product or result.

## Write the metadata

Organic Pin titles allow **100 characters**. Put the useful subject early because only part of the title may appear in a feed. Descriptions allow **800 characters**. Descriptions may be hidden in home and search feeds, but Pinterest uses them to understand relevance.

Alt text allows **500 characters** in the Pinterest API. Describe what the visual shows for someone who cannot see it; do not use alt text as another keyword field. Choose an AI disclosure in Sprid when it applies to the asset.

Write a natural title and description that name the topic, audience or situation and what the destination provides. Choose a relevant board and add a working destination. Do not stuff variants of the same keyword, use unrelated trends or promise something the page does not deliver.

The visual earns attention; metadata supplies context; the destination completes the task. Keep all three aligned.

## Publish your first Pin

Publishing and scheduling require Sprid’s Pinterest app to have Standard access. With Trial access, you can connect the account, browse boards and prepare drafts, but Sprid will refuse the publish or schedule request. This access tier belongs to Sprid’s integration; the customer does not apply for a developer app.

1. Connect Pinterest, then run `sprid status` and confirm the intended account.
2. Create or open a post with exactly one image, preferably at 2:3, or one finished video, preferably at 9:16.
3. Open **Publish**, select **Pinterest**, then choose a **Board** and optional section.
4. Add the Pin title, description, destination, alt text and any AI disclosure.
5. Inspect the rendered creative and every public field. Publish now or choose a future time.
6. After delivery, open the Pin while signed out or from another account and follow its destination.

In the CLI, use `sprid pinterest boards --account <slug>` to find board IDs. If there are none, it says so; create one with `sprid pinterest create --account <slug> --name <name> [--privacy public|secret]`. Then use `sprid pinterest set <postId> --board <id> --link <url>` with the optional metadata flags shown by `sprid docs cli`. The command saves the draft; review and schedule it in Sprid. Later, `sprid pinterest metrics <publishId> --account <slug>` reads a bounded results window.

With MCP, read `get_documentation` topic `pinterest-content`, select the exact channel from `list_connections`, then call `list_pinterest_boards`. If it returns no boards, say so and call `create_pinterest_board` only with a user-approved name and privacy. Save `pinterestOptions` with `update_post`. Prefer `aspectRatio: "2:3"` for a new image Pin. Render the preview, show the user the specific Pin or dry-run batch, then call `schedule_post` or commit `schedule_batch` only for the Pins they selected. Use `get_pinterest_metrics` for results.

## Review and schedule in Sprid

For a two-Pin daily test, choose **Daily** and two separate times in the batch scheduler. For example, **09:00 and 17:00** are convenient slots, not researched best posting times. Check the returned account timezone and the actual dates before confirming; do not assume they match your device. Keep an existing user-chosen cadence unless they ask to change it.

Order the selected Pins so different destinations alternate. Review the calendar preview for occupied days, gaps and any unplaced Pins. A large batch is fine to prepare at once; its publication can be spread across the schedule.

For MCP, use `schedule_batch` with `cadence: "daily"`, `times: ["09:00", "17:00"]`, the chosen account/channel and selected post IDs. Start with `dryRun: true`, then inspect `placements`, `unplaced` and `timezone`. Busy days are skipped by default, so check the returned plan rather than promising a fixed completion date. Commit only the reviewed selections and report what was actually booked. CLI users can read this guide with `sprid docs pinterest-content` and review the queue with `sprid queue`; use the scheduling UI or connected MCP tools to place the batch.

A time-only move keeps the reviewed creative and destination. If you change a scheduled Pin’s content, board or link, review and reschedule the updated Pin. Changed drafts can be blocked at publication until reviewed again. After an ambiguous publishing failure, check Pinterest before retrying because the original Pin may already exist.

Review every selected Pin’s rendered creative, public metadata, destination, board and scheduled time. Check factual claims, rights and disclosure before approving the batch.

Pinterest’s published developer guidelines require the user to choose each Pin that will be published. Sprid implements that rule by showing the concrete Pins and their schedule, then recording the user’s batch selection. Those selected Pins publish automatically at their scheduled times; the user does not return to approve the same unchanged schedule again. Review any new or edited Pin before adding it to a schedule.

After the first scheduled Pin publishes, verify its public visibility and destination from outside the connected Pinterest account. A draft, preview or accepted schedule is not proof of delivery.

## Measure what happened

Keep Pinterest’s metrics distinct:

- **Impressions:** times the Pin was on screen.
- **Saves:** times people saved it to a board.
- **Pin clicks:** clicks that opened the Pin in close-up.
- **Outbound clicks:** actions leading to a destination outside Pinterest.
- **Video views:** at least 2 seconds with at least 50% of the video in view.

For app growth, the useful path is **impression → outbound click → qualified landing visit → app action → activation**. Use saves as a diagnostic, not the final success metric. A Pin with many saves and few outbound clicks may be valuable as an on-platform reference while contributing little acquisition.

Compare Pins of similar age within the same topic, language and market. Judge creative using outbound-click rate and qualified visits; judge the whole path using activations per Pin and, where available, revenue. Pinterest-reported outbound clicks and first-party website sessions use different measurement methods, so show both rather than forcing them to match.

If visits arrive but activation does not, inspect page speed, message match and the next app action before making more Pins. If impressions are low, inspect topic relevance, board context, metadata and visual clarity. If qualified traffic and activation remain negligible across repeated relevant cohorts, stop scaling that app’s Pinterest output.

## Improve the next batch

Change one meaningful element within a comparison: visual treatment, question, format or destination angle. Organic distribution is not randomized, so call the result a directional test, not a controlled A/B experiment.

Create fresh, useful treatments rather than cosmetic duplicates. [Tailwind’s freshness study](https://www.tailwindapp.com/pinterest-marketing/research/2025-benchmark-study-part-three) found stronger retained distribution from new images for an existing URL than from repeatedly reusing the same image and URL; this is association, not a guaranteed lift. Pinterest advises against repeatedly uploading the same Pin, and repetitive or irrelevant commercial content can be treated as spam. Spread treatments of the same destination apart and keep every Pin on a relevant board.

Use the next review to choose topics and destinations for another test. For example, [Elaine Timms’s recipe-client case](https://elainetimms.com/evergreen-growth-how-food-creator-pins-for-profit/) combines search-specific overlays, creative variants and email opt-ins. Adopt the connected workflow; its reported growth cannot be attributed to cadence alone.

## Prepare the website

Claim an owned website in Pinterest to associate the profile with Pins from that domain and expand website analytics. One website can be claimed by only one Pinterest account.

For eligible articles, products or recipes, add the relevant Open Graph or Schema.org metadata for Rich Pins. Rich Pins synchronize information from the page; they are website metadata, not a separate Sprid export. Check how that metadata appears before publishing a batch because a manual Pin edit can override synced article or recipe information.

Make sure Pinterestbot can read the destination, links work and pages load quickly on mobile. Preserve any existing URL parameters when adding attribution.

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
