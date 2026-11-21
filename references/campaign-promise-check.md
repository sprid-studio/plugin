# Check a campaign's promise chain

Run this before preparing or launching an ad set, again when reading its results,
and whenever a landing page serves an ad. It judges the whole path a buyer walks,
not one asset. Each check is marked:

- **Process:** a quality check to adopt now. Failing it is a defect to fix before
  spending, whatever the results later say.
- **Hypothesis:** a belief about what sells. Keep it only while the customer's own
  paid outcomes support it, and write down what would show it wrong.

## 1. Lay the texts side by side

Copy the actual words, not a summary, into one table in the campaign brief:

| Step | Text the buyer sees | Price or condition shown |
|---|---|---|
| Ad hook (first card or first second) | | |
| Ad headline and primary text | | |
| Landing page hero and button | | |
| First screen after the action (submit, paste, sign-up) | | |
| Waiting, empty and error states | | |
| Follow-up email subject and button | | |
| Checkout line and preselected option | | |

Read it top to bottom as the buyer would. Every check below refers to this table.

When you ask the owner to keep or drop a variant, list every row it changes: the
page, the first screen, the email subject and body, the buttons. (Process) A
variant described by its most visible change gets judged smaller than it is.

## 2. The checks

1. **One promise per ad set.** (Process) Each ad set carries one promise and links
   to a page whose hero states that promise. Two promises split the learning and
   leave the page answering only one of them.
2. **Write the landing headline first.** (Process) Derive the ad's hook, headline
   and text from the page's headline, not the other way round. If the page cannot
   honestly say what the ad says, change the ad.
3. **Carry the same nouns.** (Process) The thing promised ("the fixes", "your
   weekly plan", "the questions to ask") appears by the same name in the
   ad, the hero, the first screen after the action, the email subject and the
   checkout line. A generic "Your analysis is ready" breaks the chain. Each button
   promises only what its tap does ("Open your plan", not "See everything" when
   the next screen shows part of it).
4. **The price in the ad is the price preselected at checkout.** (Process) No "from
   X" that only holds with a plan or a bundle. If several options exist, the one the
   ad quotes is preselected and its conditions are visible before paying.
5. **Personal value before the first paywall.** (Hypothesis) The buyer sees
   something real about the object they brought (their file, their numbers, one
   concrete finding) before being asked to pay. A generic list of features is not personal
   value. Record what the free part contains and what stays locked.
6. **Walk it as a first-time mobile visitor.** (Process) Open the ad's link in the
   social app's in-app browser on a phone and try: the button with an empty field,
   arriving without the input the page needs (no link or file at hand), an input the
   product cannot read, a daily cap or refusal reached, leaving and returning
   through the email link, and a reload mid-way. Each must lead somewhere useful;
   an error message alone is a dead end. Then try the wrong kind of input in the
   primary field: an email address where a link goes, a name where a number goes.
   Test the parser itself, not only the screen: a wrong input that parses as a
   valid one (an email read as a link to its domain) passes the form and fails
   later. Answer it with what the field wants, and keep what they typed for the
   later step that asks for it.
7. **An event for every step, failures included.** (Process) Track each row of the
   table, plus invalid input, refusals and the reason, and abandoned waits. A
   paywall event records every option it shows, with price and which one was
   preselected. Without these, a drop-off cannot be told from a measurement gap.
8. **Optimise for the deepest event with volume and intent.** (Hypothesis) Prefer an
   event that carries an identifier and a real commitment, for example an email
   given together with the object the user brought, over a cheap proxy such as a
   click or a save without contact details. Record why the chosen event should predict
   payment and how many occur per week.
9. **Gate free costly work.** (Process) When a free step costs money per use
   (inference, rendering, third-party lookups), run it only after an identity is
   given, behind caps per identity, per network address and per day, checked on
   the server. A refusal falls back to the paid path with an honest reason. Ship it
   behind a switch that can be turned off without a deploy.
10. **Words select the audience; visuals must not invite the wrong action.**
    (Hypothesis) A situation hook ("Job interview tomorrow?") draws people in that
    situation; a direct line ("Practise for your interview") draws a broader
    group. Test them as separate promises. An example shown large in the ad
    can read as the thing to act on: if visitors try to act on the example, label it
    or show the buyer's own input instead.
11. **Decide what the test can answer before launch.** (Process) At low volume a
    test can tell whether anyone completes the path, not which creative or price
    wins. Write the stop rule and the decision rule (for example "N previews with
    zero purchases means the free part does not show enough value") before
    spending. Run prices as sequential cohorts, not a split, until purchases per
    arm make a difference readable.
12. **One landing page per offer.** (Process) Before making a page for an ad,
    list the pages that already sell the same offer in that market: older paid
    landings, variants per audience or product type, the home page. Add a page only
    when it would differ from them in more than the headline; otherwise point the ad
    at the existing one. When merging pages, redirect the retired ones permanently
    and keep the query string, so the ad's tracking parameters survive. Whether
    carrying each ad's own wording past the click (a parameter from ad to page to
    email) earns its upkeep is a Hypothesis; at low volume a test cannot show it.
13. **The ad's price lives on one page.** (Process) The paid landing is the only
    page that shows the price the ad quotes. When the home page shows other prices,
    keep the paid landing apart from it: no site navigation that leads to them, and
    out of the search index. Fold it into the home page only when the ad's offer
    becomes the offer for everyone.

## 3. Before spending: prove the path live

Run these on the production product, after the checks above pass and before the
launch is approved. Code, mocks and a sandbox show what should happen; these show
what does.

14. **The money step works with the live key.** (Process) List every call the
    paid path makes to the payment provider (creating a customer, a checkout
    session, a price lookup) and confirm the live key the product uses has the
    permission each call needs. A restricted key missing one write permission fails
    the whole checkout; mocked tests never reach the provider, and a sandbox runs on
    a different key, so neither catches it. Confirm the live webhook endpoint
    exists and subscribes to the event the product fulfils on. Then the owner, on
    their own decision and with their own card, makes one real purchase on the live
    account and refunds it. This is the authorized production outcome the tracking
    setup waits for; an agent never charges a card or issues a refund itself. Mark
    that buyer internal so the purchase stays out of results.
15. **Every event has fired once in production.** (Process) Query the production
    analytics project's event list, or a count per event name over recent days,
    for every row of the table and every failure event. Read the data, not the
    code. An event that has never arrived is a broken step or a blind spot; fix it
    before spending, or the first read will not be able to tell which.
16. **Test as a stranger would arrive.** (Process) Know which identities the
    product excludes. An internal address is often kept out of ad signals and
    analytics but still receives transactional email, so a run with it tests the
    email and not the signal. Use a fresh plus-addressed identity
    (`name+run3@...`) for each run, in a private window, and mark it internal
    after the run. Repeated runs hit caps per network address on free work (check
    9): switch network, for example to mobile data, rather than raising the cap.

## 4. When reading results

Follow the same group of visitors along the table, step by step, before judging
the creative. Name the first step where most of them stop and check its events
first: a missing event is a measurement fault, not a verdict. If visitors reach
checkout and stop there, look at what the checkout actually showed before
replacing the hook. Record which hypotheses the read supports, contradicts or
cannot test yet.
