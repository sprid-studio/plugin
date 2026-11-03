# Ads: create, compare and manage campaigns

**What this guide does:** Explains how to organise campaigns across apps,
prepare creatives and ad sets, and read results with a shared Meta advertiser.

Choose a campaign from the audience you want to reach, the result you need and
what that result is worth. An organic post can supply a promising creative;
you can also test a new paid creative directly.

Need purchase or lead tracking first? Follow [Set up conversion tracking](https://sprid.studio/docs/tracking), with a prompt for your agent and checks for apps, websites and shops.

## Start with a business outcome

Open **Ads → New campaign**. Choose purchases, paying subscribers, qualified
leads, product use or app installs, then the website or store destination.
**Prepare with your agent** carries the selected product and any chosen post
into the same marketing plan. Your agent reads the product, audience, accepted
voice and previous results before proposing the campaign.

The setup shows missing connections and signal checks. **Fill in campaign details
myself** saves the audience, hypothesis, event owner, counting rule and markets.
**Save campaign brief** creates a plan only. It creates no platform campaign and
spends nothing. Continue the saved brief with your agent to prepare the assets and
delivery settings. Campaign briefs stay visible in Ads and the marketing plan.

A website sale uses a website conversion campaign, even if the business also has
an app. Native installs and in-app actions use an app campaign. A shop can reuse
its commerce integration; a service needs an actual qualified-lead definition.
Your agent keeps the business goal separate from an earlier event used for bidding.

**Use in campaign** on a published post carries its identity into this setup.
An organic winner supplies a creative hypothesis. Your agent checks that its CTA,
destination and format work with the campaign objective. If they do not, it can
prepare a new ad from the same material. Google App campaigns assemble assets;
Google Search uses keywords and search-ad copy. Neither needs an Instagram post.

**Boost for reach or engagement** is a separate choice at the bottom of setup.
Choose it when those are the results you intend to buy. It prepares a paused
promotion on the post's network; it does not establish purchase optimization.

## Find what is running

Open **Ads** and use the same product/account filter as other screens. Running
and finished ads show their current status. Open an ad to inspect the creative,
its campaign and ad set, destination, spend and named results. Use **Limits**
for spend caps and connections. Unknown or failed readings remain visible.

When readings exist, the overview shows spend, a named result and cost per
result, with daily minigraphs. One chart combines result bars with spend or cost
per result. With a shared saved target, it opens on **Cost per result**. A dashed
target line appears in both cost graphs; at or below it meets the cost goal.
Both axes are labelled and use different scales. Choose the app/result group to
inspect. Different events, currencies, datasets and attribution settings stay
separate. Missing readings leave gaps, and recent conversions can still change.

**Lowest cost** and **Most results** order observed ads within each ad set.
Small samples can change the order; this ranking is not an experiment verdict.

- A **campaign** defines the objective. Its budget can sit at campaign level
  when you deliberately choose Advantage campaign budget.
- An **ad set** defines the audience, optimisation goal, schedule and budget
  when the campaign does not share one. Its ads compete for delivery.
- An **ad** contains the creative, message, identity and destination people see.

**Created in Meta** identifies campaigns made outside Sprid. Those appear
alongside campaigns prepared here. A Page that identifies one connected account
can place an external campaign under that app. Missing or mixed identities stay
under **Unassigned campaigns**. In the campaign’s **Details**, a workspace
owner or admin can choose **Assign to app** or **Change app**. This changes organisation in Sprid only.

In **Details**, use **Manage campaign** or **Manage ad set** for Sprid’s controls.
An app’s **Settings → Creative library & tools** opens ad sets, creatives,
layouts, rules and experiments for the chosen account. **Open in Meta** reaches settings Sprid does not expose
and manages externally created objects. Viewing or assigning an external
campaign does not import it into Sprid’s launch, automation or budget controls.
Workspace membership is required to read a shared advertiser’s complete tree.

## Share one Meta ad account across apps

You can use the same advertiser for several apps in one Sprid workspace. Under
an app’s **Settings**, choose **Use shared Meta account**, select an existing connection and
choose this app’s Facebook Page. Choose its conversion dataset explicitly, or
leave it empty until the right source is available. The source app’s dataset
is never selected automatically. The Page supplies the linked Instagram identity.

Keep unrelated products in separate campaigns. Check each set’s dataset or
native application ID and conversion event. Separate datasets for unrelated
products make measurement easier to audit; that is a recommendation, not a
Meta requirement. Locales of the same product can use the same appropriate source.

Sharing an advertiser does not by itself change an ad set’s selected conversion
source. Sharing a dataset with unfiltered events can mix products’ signals.
Custom audiences and lookalikes are available across the advertiser: check their
source before using them. Advantage+ can treat audience inputs as suggestions;
read which controls are strict before calling a campaign retargeting.

Meta also learns patterns across campaigns and assets. Separate campaigns or
ad accounts do not promise isolated model learning. Billing currency and account
restrictions belong to the shared advertiser. Sprid’s shared spend limits cover
Sprid-managed commitments; campaigns and changes made in Meta remain outside
those limits. Check the advertiser’s full spend in Meta.

## Build the creatives

For Reels, prepare vertical 9:16 video with useful sound and keep important
content inside the placement’s safe area. Use speech, music or effects when they
help the idea. Add readable text or captions so the message also makes sense
without sound. Preview at phone size, both with sound and muted.

Make the opening immediately understandable. Putting the hook within two seconds
is a useful editorial target to test; Meta’s guidance says the first few seconds.
It is not a universal two-second cutoff or a reason to rush unreadable text.
There is no fixed winning duration. Show the product or benefit as soon as it
makes sense, then give people a clear next action.

Use genuinely different concepts and suitable formats, including images and
carousels. Video is useful for demonstration and Reels; it is not mandatory for
every ad. Meta recommends creative diversity across formats, visuals and messages.
There is no universal requirement for exactly three formats in each ad set.

## Create an ad set

Start with a saved campaign brief and verify its chosen signal. Your agent can
prepare a paused Meta campaign and ad set through the same tools. Inside a Sprid
campaign, choose **Add ad set**. Name the question you
are testing, select countries and a result, then set the run and target cost per
result. Add creatives from the library. They remain paused for review.
The ad-set composer asks for a hypothesis and target.
For an existing Sprid ad set, open **Details → Set a goal** or **Edit goal**.
Goal changes are recorded in its history. A target is a reporting estimate;
saving it changes no Meta bid or budget and does not enable automatic pausing.
Your agent can save the same fields with `set_ad_goal`.
Your agent can prepare Google Search and App campaign settings and Meta app
promotion through Sprid’s API and send you the review link. Google Search needs
keywords, language, search copy and explicit conversion actions. App campaigns
need one store destination, app assets and eligible imported app events. Setup
shows when provider creation is unavailable; validation can still prepare a
reviewable draft without creating advertising objects.

For a format comparison, hold the message and offer constant. To compare
messages, keep the format constant. When several elements change, the result
applies to the complete variant. Multiple ads in one ad set receive delivery
chosen by Meta; they do not receive equal spend. The ad receiving most spend
is not thereby a proven causal winner. A controlled A/B study is a separate
experiment under **Creative library & tools**. An ordinary ad set is not an A/B test.

## Review before spending

Everything prepared through Sprid starts paused. Only a signed-in person can
press Launch or Confirm in the app after reviewing creatives, identity,
audience and the financial commitment. Agents can prepare and pause ads.
They cannot start delivery or raise a budget through a token.

Check payment readiness, copy, destination, regulated categories and the
conversion event before launch. For signup or purchase goals, follow
[the conversion guide](https://sprid.studio/docs/meta-conversions).
A connected dataset alone does not prove events arrive or match the intended goal.

Promoted posts run through the network behind their published platform: Meta
for Instagram or Facebook, Google Ads for YouTube, TikTok Spark Ads for TikTok,
and Pinterest Ads for a Pin. TikTok requires the creator’s ad authorisation.
Each network’s connection and review requirements still apply.

## Read the result

Judge the outcome you bought: qualified leads, paid accounts or orders. Reconcile
platform attribution with business records before estimating acquisition value.
Views and clicks help diagnose the path; they do not establish profitable demand.
Wait for enough results and the relevant attribution period. Learning status and
an arbitrary number of elapsed days cannot establish a winner.

Campaign, ad-set and ad totals describe overlapping money. Never add parent and
child totals. Compare the same period and currency. Missing results remain
unavailable. Close a test with its question, evidence and remaining uncertainty.

## Sources and review date

Reviewed 2026-11-03 against Meta’s
[creative diversification guidance](https://www.facebookblueprint.com/student/activity/707402),
[Reels creative guidance](https://www.facebookblueprint.com/student/activity/641202),
[cross-campaign learning explanation](https://engineering.fb.com/2026/10/19/ml-applications/genrecs-tokenization-transforming-ads-recommendation-at-meta-with-stable-model-vocabulary/)
and [promoted-object fields](https://github.com/facebook/facebook-python-business-sdk/blob/main/facebook_business/adobjects/adpromotedobject.py).
These support the recommendations above; they do not predict results for your app.
