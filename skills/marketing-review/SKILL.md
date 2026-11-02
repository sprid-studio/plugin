---
name: marketing-review
description: Review marketing and business results for apps, web shops, software and services, and end with a plan: the direction, up to five steps in order with who does each and when it is done. Compares connected evidence across periods, verifies the customer path and outcome definitions, and names measurement where evidence is missing. Use for marketing reviews, funnel analysis, campaign assessment or evaluating a delivered change.
---

# Marketing review [period]

A review ends in a plan the business acts on: one line of direction, then the steps in order, each with who does it and what closes it. The evidence serves that plan. The steps below are the order of the job; each names the reference that holds its rules. Nothing here authorizes publishing, spending, deploying or instrumenting: a review prepares, and work continues within what the person already allowed.

Run [agent runtime](../../references/agent-runtime.md)'s [version check](../../references/agent-runtime.md#versions-at-the-start-of-a-job) once per session first. Without a repository or terminal, follow the [portable connected review](../post/guides/marketing-review.md) (`get_documentation` with `topic: "marketing-review"`): the same steps through MCP alone, with repository and private-database evidence labelled missing. In a repo the report goes to `marketing-reports/<YYYY-MM-DD>.md`.

## 1. Start from the last plan

Read `.sprid/app.json` and repository instructions. A profile with `enabled: false` or `review.enabled: false` is paused: stop and say why. Read the newest saved review (`list_marketing_reviews {profile}` / `sprid marketing-review history --app <slug>`) and the shared context (`get_marketing_review_context` / `sprid marketing-review context --app <slug> --json`): definitions, corrections, surfaces, the hypothesis ledger. Treat what the person closed on the Plans page as decided. The latest local report carries same-day corrections; read it too.

Which steps of the last plan happened? Check the live product, the queue and the window's changes, not the agenda's wording. A step that shipped becomes a running hypothesis with its ship date; one still open is carried with its first-made date, or escalated with the blocker named. A recommendation nobody acted on twice is a finding about the process; the server refuses a third unchanged carry.

Reuse the saved business goal, payment model and customer path ([business context and outcomes](../../references/review-to-action.md#1-follow-the-money-then-split-volume-from-rate)); fill only what is missing or changed. A migrated local review keeps its event map, identity basis, exclusions and investigations ([repository review sources](../../references/repository-review-sources.md)); `node "<plugin>/tools/migrate-review.mjs" --from <old-mapping.json> --app <slug>` previews and `--write` writes. Keep local `review` settings when reconciling the profile; never let a server response erase a populated local event map.

## 2. Pull the evidence and label how complete it is

Default window: the last 30 complete days ending today, exclusive, against the 30 before (`--since`, `--end` for custom windows). Provider calendars stay as they are: GSC is Pacific, PostHog its project zone.

```sh
node "<plugin>/tools/review.mjs" --check
node "<plugin>/tools/review.mjs" --days 30
```

The runner reads Sprid first with the CLI's login, runs local collectors only for sources Sprid cannot supply, adds the window's git history, and saves a packet under `marketing-reports/evidence/`. Over MCP alone, `get_marketing_review` returns the same packet; `get_marketing_review_evidence` re-reads a saved one. `--refresh` / `refresh: true` queues collection; read again while it runs. Never bypass a cooldown with local keys. Keys connected on Sprid are not local keys; a missing local key is not a disconnected source.

Before reading a number, label the packet: **complete**, **provisional** (a source still collecting), **partial** (a source failed or a window has missing dates) or **insufficient** (the sources that matter for the decision are missing), with the failed sources named. This label leads the report. Each source's nested `status`, `coverage`, `dataThrough` and `collection` say which; a missing date is unknown, never zero, and an incomplete window gets no percentage change. The packet's `dataset` carries validated calculations with `blocked` reasons; follow [metric evidence](../../references/metric-evidence.md) before combining anything.

Then read the PostHog source's measurement `checks` ([review checks](../../references/marketing-review-checks.md)): each one says a number cannot be read at face value. Carry each into the appendix until a later reading clears it.

Rules that hold on every read: the same explicit dates on every call, never a rolling-window delta spliced into a calendar comparison; a source's `diagnostic.code`, `httpStatus` and `retryable` tell a permission problem from a transient one, and a reconnect is recommended only when the evidence says the credential failed; a social account resolves by `accountId`, then a same-workspace slug, and missing social linkage does not block the sensors; `get_app_profile` reconciles identifiers, `sprid init` syncs verified profile fields when authorized; an older server without `get_marketing_review` falls back to `get_insights` plus publishing reads, with the reduced coverage named. Platform, account or competitor benchmarks for Pinterest need Pinterest's written permission.

## 3. Count the people on the path, then choose the mode

Count the people on the relevant path in the window: signups, first orders, enquiries, trials, whatever the business's path is. The count sets the method.

**Few (roughly under 50).** Read them one by one: who they are (never named in the report), what they did, where they stopped, and whether they can be contacted. Rates over this population are noise; say so and do not rank them. Talking to them, or keeping a lapsing cohort reachable, usually beats any automated change. The useful evidence is often in durable records (accounts, orders, tool calls) rather than analytics; use the repository's reads when available ([repository review sources](../../references/repository-review-sources.md)).

**Many.** Establish each metric's usual range over the trailing periods before calling a move a change; a move inside that range gets one line, "normal variation". Exclude internal people and automation first ([traffic and acquisition](../../references/marketing-review-checks.md#traffic-and-acquisition)). Use cohorts of equal age and fixed windows for return and conversion ([connected investigations](../../references/connected-queries.md)).

Either way: count people, not events; keep orders, items and people apart; never invent an identity join between providers.

## 4. The scorecard: outcomes and the inputs the business controls

A stable scorecard for the business's own path. Outcomes: the people reaching each relevant step through purchase and delivered value, and revenue (period revenue apart from current MRR, gross apart from refunds, rails reconciled before adding; see [store coverage and money](../../references/marketing-review-checks.md#store-coverage-and-money)). Inputs: what the business did in the window and the one before (posts published, pages shipped, mails sent, releases, spend). Every value carries its source, population, dates and comparable period; a rate shows numerator and denominator. A relevant metric that is unavailable keeps its slot with the reason. An irrelevant one (installs for a shop, a paywall for a service) is left out.

The packet's `social.publishes`, queue and channel health are the distribution inputs: drafted supply, scheduled posts, failed publishes and measured results answer different questions. Read them before proposing more content. Post metrics are cumulative snapshots sampled before the end; Pins are summed daily activity with their observed-day coverage ([Pinterest](../post/guides/pinterest.md#measure-what-happened)). A null metrics row is unmeasured, not zero performance. Compare posts at equal ages before declaring a format winner.

Where coverage on the path is missing, name the exact event or record that would answer the question, the emitting file or responsible system, and the verification ([product instrumentation workflow](../../references/marketing-review-checks.md#product-instrumentation-workflow)). `/sprid:measurement` carries that out when authorized. Continue the review with the sources that work; unknown drop-off stays unknown. Do not end at "connect PostHog".

## 5. Find the story

One sentence that explains the period, before any recommendation. Test it against a competing explanation (tracking change, exclusion change, seasonality, audience mix, a release) and a second read of the same number where one exists ([evidence and decisions](../../references/marketing-review-checks.md#evidence-and-decisions)). Patterns that hold for any business:

- Growth that does not survive removing the top mover (one post, one customer, one page, one referrer) is fragile growth, and the review says so.
- Spend up while cost per result rises is saturation, not scale.
- Volume up while the next-step rate falls points at who is arriving, not at the page.
- Sentiment, ratings or support load falling while revenue holds is next quarter's revenue.
- One step losing most of the people is worth more than any new campaign.
- Something stopped: a channel silent, an event gone quiet, a page gone. Check what shipped before reading it as behaviour.

Then follow [from diagnosis to an activity](../../references/review-to-action.md) sections 2 to 7: trace a volume change upstream, check a lever's history before recommending it again, pick the kind of activity the evidence points to. Audit the surfaces that are due (`context.dueSurfaces`; locally `review.surfaces`), even when their numbers did not move, and record each with `update_review_surfaces`. Complete each investigation the profile lists, or name its gap.

## 6. Write the plan

Up to five numbered steps in the order to do them ([the plan](../../references/marketing-review-report.md#the-plan)). A step that unblocks or informs another comes first; a deadline in the evidence (a cohort that lapses, a season, a read date) sets the order and appears on the step. Each step:

- **The action**, concrete enough to start without asking how.
- **Who**: `agent` (you, now, within what the person allowed), `person` (only they can: send as themselves, approve, run a check on their own device or account), or `handoff` with the executor named.
- **Why**, in one number from this review.
- **Done when**: the observable result, with the date when the evidence gives one.

Name what to stop or pause and why. When nothing needs to change, the direction is "hold course" and the plan has fewer steps or none; a review that manufactures work every period trains the reader to ignore it. Steps you own and can start now, start in this session. Prepare the person's steps as far as you can (the text to send, the exact check, the link) so what is left for them is small.

Other findings that earn a place but not a step stay on the agenda without one, each with its evidence line. A defect goes on the agenda only after a controlled check reproduced it (`defect: true`, `verifiedBy`); until then it is an investigation.

## 7. Save, report, hand off

Save the review so the Plans page, `status`, `next_actions`, the Monday mail and the next review start from it. Direction, verdict and agenda only; the report and evidence stay where the review ran:

```sh
sprid marketing-review save --app <slug> --file <review.json>
# {"direction": "...", "verdict": "...", "period": {"start": "YYYY-MM-DD", "end": "YYYY-MM-DD"}, "reportPath": "marketing-reports/<YYYY-MM-DD>.md",
#  "agenda": [{"id": "ask-signups", "title": "...", "why": "...", "status": "new", "step": 1, "owner": "person", "due": "YYYY-MM-DD", "doneWhen": "..."}, ...]}
```

Over MCP: `save_marketing_review {profile, direction, verdict, agenda, period, reportPath, surface: "repo"}`. Reuse each item's `id` from the last review; statuses and their exits follow the [report contract](../../references/marketing-review-report.md#one-ranked-agenda). In the same run: `update_review_hypotheses` (threshold, measure and read date set before a change ships; results written on the read date), `update_review_surfaces`, and `save_marketing_review_context` for corrected definitions and decisions at `baseRevision`. Write the JSON to a scratch location. A same-day re-save replaces that day's review, so a correction never sits beside the old text.

Write the report ([report contract](../../references/marketing-review-report.md)): direction and plan first, then the completeness label, the scorecard, the story and its competing explanations, the ledger, the evidence appendix with definitions and exact sources. A report that already carries same-day corrections is not overwritten by an unqualified re-run; the correction wins. Evidence packets hold commercial analytics: they stay local unless sharing was asked for, and product documentation gets a short index, never the raw output. When instrumentation ships after a review named the gap, record its verified release boundary and revisit the gap in the next report. Never in a report or a saved review: a named customer, an email address, a device name, a private note, an internal id without its meaning, tool noise as a finding, or a sibling product's numbers.

The final message leads with the direction and the plan, says which steps you are starting and which wait on the person, gives the few numbers behind it, and links the report. A list of findings without steps is not a finished review.

Then read `next_actions` once, reusing this run's result, and follow [keep setup current](../../references/setup-continuation.md#keep-setup-current) only for gaps that affect the plan. Do not restart completed setup or repeat declined connections. A separately authorized change that ships gets an `add_event` with its `areas` and `why`.

## Investigations between reviews

`list_marketing_queries` lists supported reads; `query_marketing_source` and `query_marketing_posthog` run them with Sprid's credentials ([connected investigations](../../references/connected-queries.md)). The CLI: `sprid marketing-review capabilities|query --app <slug>`. Individual local pulls stay available for a repo investigation:

```sh
node "<plugin>/tools/gsc.mjs" --days 30 --pages 10000
node "<plugin>/tools/cf-analytics.mjs" --days 30
node "<plugin>/tools/store.mjs" --days 30
node "<plugin>/tools/posthog.mjs" --days 30
```

Local scripts read `~/.sprid/secrets/<slug>.json` themselves; never print it. ASC reads existing report requests; `--request-reports` creates one only with authorization. A pending report is not zero downloads.
