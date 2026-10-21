# Why a post travels

**What this guide does:** Helps choose where and how to publish, then evaluate
whether distribution serves the customer's business goal.

Use the account's audience, available formats and measured results. Treat claims
about algorithm weights, ideal slide counts or guaranteed reach as unverified
unless a current source supports them. A platform average is context for a test;
it does not establish what will work for this account.

## Choose the destination

Match the content to a real audience and a useful next step. An explainer might
answer a search question, demonstrate a product or help someone recognize a
problem. Choose its channel from evidence about that audience and the customer's
existing distribution, rather than making every business start with social posts.

For a connected channel, inspect publishing status and account restrictions
before preparing a schedule. A failed publish is different from a published post
with low reach. Respect the destination's current format requirements and the
customer's approved publishing scope.

## Build for the actual format

For an Instagram or TikTok carousel, make the opening understandable and let
each following slide advance the idea. Preview the full deck at its intended
size. Use enough slides to deliver the promise; a fixed slide count is not a
quality check or a guarantee of distribution.

For video, inspect the opening, pacing and delivered result using
[first seconds](../../reels/guides/first-seconds.md). A question, demonstration or
story can each work when it matches the purpose and the customer's voice.

For Pinterest, use the [Pinterest guide](pinterest.md). Prepare a standalone Pin
with a relevant destination, board and search wording. Evaluate it with its own
metrics and observation window rather than importing a reel's retention target.

## Decide what to measure

Record the intended outcome before publishing. Depending on the task, it can be
qualified visits, an order, an account signup or a useful audience response.
State how the content connects to that outcome and where attribution stops.

Read only metrics the connected tools actually provide. Keep views, reach,
comments, saves and outbound clicks distinct. Platform engagement does not by
itself establish visits or sales. A missing metric is unknown, not zero.

Compare content at similar ages and separate paid from organic distribution.
Include the sample size and spread, since one unusual post can dominate an average.
Avoid comparing different metric definitions as though they measured the same thing.

## Choose a workable cadence

Use the customer's objectives, production process and measured delivery to set
a schedule. The saved posting schedule is a preference to follow, not evidence of
an algorithmic advantage. Test timing when there is enough comparable activity
to learn from it.

Prepare a repeatable content process and keep the queue visible. Requested volume
and quality both matter; do not reduce the user's ambition to a fixed weekly
quota. Reply to relevant comments within the authorization the user has given.
A research or publishing request does not authorize unrelated likes or outreach.

## Learn from a result

When a post meets its intended outcome, identify what could explain it and test
that explanation with another example. Reuse a format when the evidence supports
it, while writing for the new topic and the account's voice.

Keep each experiment's hypothesis, publication references and results with the
customer's plan. If several variables change, attribute the outcome to the whole
variant until further evidence separates them. Preserve unsuccessful examples
as well as successful ones so later reviews can compare them.

Record a content test in Sprid so the app's Reviews page tracks it. Change one
thing (the format, the message or hook, or the visual), state what it should
beat, and save it with `update_review_hypotheses` as an entry whose `measure`
has `source: "posts"`, a short `label` and the ids of the posts made for the
test in `postIds`. Add each new test post to `postIds` as it is made. Sprid
reads each post at `ageDays` old (7 by default) against the app's other posts
of the same platform and kind from the last 90 days. The default metric is
saves and shares per reach, read on Instagram, where reach is reported; a test
with no Instagram posts reads views. Where the usual posts almost never get
saved or shared, the rate cannot tell formats apart: set `metric: "views"`.
Put the number to beat in `target`, in the metric's own unit.

When the test is read: if it held up, make 5 to 10 variants of the winner, each
changing one thing. If it did not hold, propose the next thing to change as a
new entry with `follows` set to this one's id, in the order format, then message,
then visual, and drop or settle this one with its result. If too few posts were
old enough to read, keep posting under the same entry.

## Recheck external claims when they matter

For a platform requirement or a claimed ranking mechanism, consult current
first-party documentation and retain the source and date. Separate a platform's
published explanation from third-party speculation and from this customer's
measured results. If the distinction could change the recommendation and the
claim cannot be verified, leave it out of the decision.
