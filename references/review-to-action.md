# From diagnosis to an activity

A review that ends at a ranked agenda has done half the job. This is the other
half: from what the data says to one marketing activity someone can run this
week, sized and dated. Follow it after the headline metrics and before the
agenda is written.

The activities differ by app; the path to them does not. Section 4 picks the
kind of activity the evidence points to, sections 5 to 7 are the investigation
for the three that come up most, and section 8 turns the chosen one into a brief.

## 1. Follow the money, then split volume from rate

Find the segment that actually pays: market × platform × storefront, from the
revenue source and the paywall events. Then ask, for that segment alone, whether
its *volume* (visitors, signups, paywall views) or its *rate* (store clicks per
visitor, purchases per paywall view) moved.

- Rates held and volume fell: the problem is reach in that segment. Do not
  redesign the paywall or the landing page to fix it.
- Volume held and a rate fell: look at the step that fell, and at releases and
  exposure in that window.
- A pooled number hides both. In one app every conversion step was flat while
  revenue halved, because the one storefront that bought lost 40% of its visitors.
  In another, the content group that sent the most people to the store was read
  in a market that produced almost no trials; its pages were worth keeping for
  search, not worth building new routes for.

Use weekly series wherever an event (a holiday, a press hit, a launch) sits in
one of the compared windows; a 30-day total turns it into a trend.

## 2. Trace a volume change upstream before naming a cause

Take the segment's falling volume one source back at a time, still scoped to
the segment: referrer, then the channel's own data.

For search, read impressions and average position together, by country and week:

| Impressions | Position | Reading |
|---|---|---|
| fall | steady or better | less demand (season, news cycle) |
| fall | worse | lost rankings |
| pages disappear | n/a | indexing or a technical break |

Rule out the technical reading two ways before calling it demand: an HTTP status
sample of the URLs that lost impressions, and an index inspection of a few of
them. Name the observation that would overturn the reading, and say when there
is no year-earlier baseline to separate season from decline.

## 3. Check a lever's history before recommending it

Before proposing a change, search the repository, earlier reports and the
hypothesis ledger for a previous test of the same lever: code comments that
record an experiment, reverted commits, a ledger entry marked contradicted. In
one app a proposed "move the install button up" had already shipped and lost,
and the evidence was a comment above the code. In another, the quiz-first hero a
competitor uses had been that app's own hero for a month, with the same tap rate
and no sales.

Look for natural experiments too: a feature switched off or a page replaced on a
known date gives a before and after for free.

Treat "this measurement is broken" as a hypothesis. Reproduce it in a real
client (a headless browser load, a device) and read the row back before it goes
on an agenda. A silent event usually means no traffic, not a dead beacon.

## 4. Pick the kind of activity the evidence points to

| What the evidence shows | Kind of activity | Investigate with | Execute with |
|---|---|---|---|
| The paying segment's volume fell and its rates held | Reach that segment without the channel that fell | § 7 | `/sprid:post`, outreach, the app's email or push |
| An entry page gets relevant visitors, but fewer take the next step than the page's best source does | Convert the visitors you already have | § 5 | `/sprid:landing-page` |
| Pages on the first results page get impressions and few clicks | Win the click in search | § 6 | `/sprid:seo-pages` |
| A group of visitors cannot complete the step on the device or path they arrive on | Build the missing handoff | § 5 | `/sprid:landing-page` or a site change |
| Search or AI answers send app-seekers to pages that do not lead to the app | Pages for app-seeking queries | § 6 | `/sprid:seo-pages` |
| The page, listing or screenshots describe a product version people cannot download, or make claims the app's positioning forbids | Truth pass; do it regardless of tests | § 5 | `/sprid:landing-page`, `/sprid:store-metadata`, `/sprid:screenshots` |
| A missing measurement hides the number that decides between these | Instrument first | the review checks | measurement patch |

Several rows can apply. Rank them in section 8, not here.

## 5. Convert the visitors you already have (entry pages)

Work page by page, starting with the entry pages that get the most real visitors
after bot and internal cuts, and only those whose readers can become customers
(section 1).

- **Next-step rate by source × device.** The step is a store tap, a signup or a
  trial start. A source that converts at half the rate of another on the same
  page is the finding; a single page-wide rate hides it.
- **What the visitor has seen.** Median scroll depth and time to the action. If
  the median phone visitor scrolls 3% and acts within 8 seconds, only the first
  screen matters, and copy further down cannot move the number.
- **Where the taps come from.** Hero, navigation, footer, inline cards. A
  placement that nobody uses is a candidate for removal, not for rewording.
- **Can this visitor finish here?** A desktop visitor cannot install a phone app
  from a store badge; give them a QR or send-to-phone path. An in-app browser,
  a locale without its store link and an old browser are the same class of
  problem.
- **Classify sources on more than the referrer.** AI assistants often arrive as
  "direct" with a `utm_source` of their own; in one app that undercounted them
  threefold, and they were the visitors converting worst.
- **After the tap.** Installs and trials by campaign or install referrer, per
  platform. Name the platform whose attribution is blind instead of averaging
  over it.
- **Truth.** Render the page at phone and desktop width and compare it with the
  released app: screenshots of an unreleased build, outcome claims, structured
  data that claims more ratings than the stores show. These are fixed whether
  or not they move conversion.
- **Visitors who were told about you.** Someone sent by a recommendation or an
  AI answer is checking what the app looks like, what it costs and whether it is
  safe. If the first screen answers none of that, that is the change to test.
- **Can a test read?** Compute the visitors per arm the expected difference
  needs. When that is months of traffic, plan a before/after on matched windows
  of at least eight weeks with a downstream measure, and say so.

Rank changes by expected installs or trials, each with its baseline, success
line, read date and the observation that would prove it wrong.

## 6. Win the click in search

- **Snippet candidates.** Pages on the first results page with meaningful
  impressions and a click-through rate well below other pages at the same
  position. Read by page, because most queries are anonymised.
- **Does the title lead with what people type?** Compare the title with the
  queries that reach the page: a name, a place, "app for …". Put that first and
  the brand last. Write the description as the answer to the query.
- **App-seeking queries.** Queries that ask for an app, a tool or an alternative,
  and AI-style follow-ups ("is there a free one?"), show where a page that leads
  straight to the app is missing.
- **Measure** the same fixed pages, within the same position band, over 28 days,
  with one change per page at a time. Search Console runs about two days behind.

## 7. Reach the segment without the channel that fell

List candidates under four headings and give each a number, never just a noun:

- **Owned reach.** People in the paying segment you can reach without the
  falling channel: mailable accounts minus suppressions (split dormant and
  active), push-enabled installs, followers, a partner's list. State the count
  and the expected outcome from it at the app's own historical rate. If the
  answer is "60 people, perhaps one to three sales", say so.
- **Moments.** Dated hooks in the segment's market in the next two to six weeks:
  public holidays, cultural days, events, seasons, funding or partner windows
  already recorded in the repository. Verify every date.
- **Inventory that fits the moment.** Existing content with good photographs and
  verified text. An activity that needs new content first is a different size.
- **Partners and institutions** with an open window and a reason to say yes.

## 8. Rank, then write one activity brief

Rank no-build activities (send, post, outreach, copy and page changes on the
web) above anything that needs a product change and a store release, and say
the release latency when you rank. If the person declines the build option, the
no-build list is the answer, not a consolation.

The first agenda item arrives as a brief, not a heading:

- audience, its count, and the rule that selected it
- the hook and why now
- assets: which existing pages, photographs, screens or posts
- channel and send or ship date
- success measure in the paying segment (store taps that become installs,
  trials, purchases), not opens, likes or sessions
- baseline, read date and stop rule

Then hand off to the execution skill named in section 4. Execution needs its own
approval; a brief authorises nothing. When a later review finds the change
shipped, check the published result and schedule the follow-up instead of
proposing the same task again.

## 9. What execution tends to teach back

These came back from running briefs, and belong in the next one:

- **Personalise only with the rule on the page.** "Near Gothenburg" tells the
  reader why they got these places and makes a wrong guess visible. IP-based
  location is right about the region and often wrong about the suburb; read
  known exchange towns as their city. Below a minimum, drop the section rather
  than pad it.
- **Choose images by eye from a contact sheet**, never the first-ingested cover.
  The pass doubles as a data audit: wrong buildings, mislabelled licences and
  names stored in the wrong language turn up here. Log them and fix them through
  the app's own correction tools; they affect every surface, not just this one.
- **Calm layouts have two type voices and two image sizes.** When a draft reads
  as busy, remove a style before adding space.
- **Every claim comes from the app's own source text**, quoted or paraphrased
  from what the product already says, and is re-read before a resend.
