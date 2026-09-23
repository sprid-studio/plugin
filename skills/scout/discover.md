# Discovery: the flagship

`start_discovery` is what this tool is for. Everything else measures or downloads accounts you already have a reason to care about; discovery is how you find them. A run is minutes of the user's browser, and the difference between a mediocre run and a great one is almost entirely in the keywords and filters you hand it, which is your job rather than the tool's.

## What it actually does

Two phases, both of them a real browser loading real pages.

**Phase 1, search.** It works through your keywords one at a time, in the order you gave them. For each it loads TikTok's own search, the Top tab first and the Photo tab behind it when Top runs thin, scrolls, and collects every account posting a photo slideshow about that keyword. It also likes a slideshow now and then, which tells TikTok's algorithm what this session is into and shapes what it serves next. It keeps going, keyword after keyword, until it has a large enough pool of candidates.

**Phase 2, measure.** It visits each candidate profile one at a time and measures it: what share of their posts are slideshows, average and total views over the window, how often they post, how steady that is, their top hashtags. Every profile it opens is measured and kept, each carrying a verdict. An account either passed every filter, or failed one or more and the result says which and by what margin, or the window you chose held none of its posts so there was nothing to average, or it could not be read honestly at all.

The principle worth saying plainly: **your filters decide what counts as an answer, they never decide what you are allowed to see.** The accounts that passed are filed into the library automatically, so the moment the run is done they answer to `search_accounts` and `get_account`. The rejected ones are not filed, since the library is what qualified, but they stay in the run's own results for as long as you are working with it, which is where you go when a verdict tells you the filter was the problem rather than the niche.

## Keywords are searched in order, so order and count both matter

Phase 1 walks the keywords in sequence and stops once it has what it needs, so the earliest keywords get first pick and the order is yours to set. Not every candidate passes, so the search does not always spend every keyword: if enough pass early, later keywords are never run; if few pass and keywords remain, it keeps going down the list; if it runs out of keywords before reaching the count you asked for, the run returns fewer accounts than asked. That last case has its own section below.

This is why the length of the list is itself a lever. A short list gives Phase 1 little ground: when a strict filter passes only a small share of what it sees, a few keywords are spent long before the count is met. A long list keeps turning up fresh accounts even while a strict filter passes only a few of them, so it far more often returns the full count, at higher quality, because it searched across more ground. Judge the length against the niche and the strictness of the filters, not by habit.

## Writing keywords well

**Mix altitudes.** Pair broad umbrella terms with specific attack terms. The umbrella terms find the big accounts where slideshow volume lives; the specific terms name a sharp corner of the user's world and find the sub-niche accounts a broad search would bury. You want both, and the specific ones especially, because that is where replicable formats hide. Keep them anchored inside the user's own niche rather than merely narrow.

**Phrase them the way people search TikTok.** TikTok search is human. People type the short spoken phrase they would say out loud, not a padded one built for a search engine. If it sounds like SEO, rewrite it.

**Vary the intent behind each search.** The same niche is searched by someone fixing a problem, someone looking to buy, someone after a routine, someone wanting before-and-after proof. Spread across those rather than rephrasing one of them ten ways.

The language of the search is not tied to the language of the product. English usually surfaces the best accounts even for a Spanish product, and the user can take the inspiration and publish in Spanish. Reach for another language when you have a reason, not by reflex.

## The filters, as mechanisms

A filter set a little wrong is recoverable, because the accounts it marked as failing are still in the results with their margins. What a badly framed filter costs you is time, since the count you asked for is a count of accounts that *pass*, and a floor set where the niche does not live sends the run hunting for a number the niche cannot give.

- **`min_slideshow_pct`** is the share of an account's posts that must be slideshows for it to count as a slideshow account. It draws a line between two kinds of account: set high, only accounts that lean on the format pass; set low, accounts that post slideshows occasionally between videos pass too, and their slideshow numbers are a thinner guide because the format is a sideline for them. Ask how central slideshows are to this niche, and set the line to match.
- **`min_avg_views`** is a floor on average views per post over the window. Being a per-post average it means roughly the same thing whatever the window's length. Zero turns it off.
- **`min_total_views`** is a floor on total views across the window. Totals are cumulative, so they scale with the window: a longer window counts more posts and reports a larger total. A total-views floor therefore has to move with the window to keep meaning the same thing. Zero turns it off.
- **`avg_views_days`** is the window, and it governs both view measurements above. The per-post average is roughly stable as you change it; the cumulative total is not. An account that posted nothing inside it does not report a zero average, it reports that it had no posts in the window, which is a different and meaningful fact.
- **`min_followers`** is a floor on follower count, and it is the knob most able to mislead. A small account with very high views per post is exactly the find worth surfacing, and a follower floor is the thing that would drop it.
- **`max_accounts`** is the target: the run measures profiles until this many have passed, or the keywords are spent. Larger means longer.
- **`hashtag_pivot`** runs a second search pass over the hashtags the first pass turned up. It reaches accounts your wording never would, at the cost of another pass, so it earns its place when your keywords are good but the niche carries vocabulary you do not know.

## Where the knobs rest

Unless the user asks for something else, this is the stance a run starts from. It is a starting point, and the run's own verdicts will tell you soon enough if the niche wants them elsewhere.

- `min_slideshow_pct` at 50.
- `min_avg_views` off.
- `min_total_views` at 100,000, and this is what the tool falls back to when the field is left unset, so leaving it out and setting it to 100,000 are the same act. Moving it is a decision to make out loud: a wildly viral niche can carry a higher bar, a quieter one may need it lower, and turning it off means passing 0 on purpose, never by omission.
- `avg_views_days` at 30.
- `min_followers` off, for the reason above.
- `max_accounts` is the one knob never defaulted silently. When the user has named a count, that is the count. Only when they have not, ask, and offer 5 as the suggestion; if they leave it to you, run with 5.

## Reading a run while it works

A discovery does not go dark until it finishes. `job_results` answers mid-run, and the vitals are the run's own arithmetic about itself: profiles measured, how many passed, the pass rate it is observing, the seconds it spends per profile, keywords consumed and remaining, and the finish it projects from the rate actually measured. That projection is a computed estimate rather than a promise, and it is first of all a reading for you, a way to tell a healthy run from one worth steering. It reaches the user only when it changes what they would do: a run that will clearly take hours is worth telling them so they need not wait by the window, said as that plain consequence rather than a recited number.

The pass rate is the one to watch closest. A filter that tumbles almost everything is rarely a strict filter doing honest work; it is usually the wrong question. The rate alone will not tell you which. The verdicts already attached to the measured accounts will: read them to see whether accounts are failing on merit or on an accident of your framing.

The run also marks accounts as it goes, and the marks are arithmetic, never judgment. It measures each account's views per follower against this run's own distribution and flags the ones in the top of it, the accounts reaching far past their own audience. And it flags the near misses, the accounts that failed a single filter by a small margin. Both are marks handed to you to catch, not conclusions drawn. The sharpest case is the account that failed a follower floor while sitting at the top of views per follower: a small account reaching far past its audience, sorted out of the passing set without ever being hidden from you.

## Sleep through the work, wake for what matters

`await_job` with `wake_on` set to `events` sleeps until the run does something worth a look, then hands you a small summary of what changed. The events are mechanical: `account_passed` when a new account clears the filters, `mark_assigned` when an outlier or near-miss mark is newly made, `keywords_exhausted` when Phase 1 runs out of list, and `projection_jumped` when the projected finish climbs sharply. You get back which fired plus the same compact picture `job_results` gives, narrowed to what happened since you began waiting. Read it, decide, then either keep waiting or act. Bursts are gathered into one wakeup rather than one per account, so a summary usually carries several at once.

Left at `done`, `await_job` wakes only when the run settles, is challenged, or changes state, which is right when you have no reason to steer and only want the finished result.

## Retune in flight instead of starting over

When the summary says the question was wrong, you do not have to stop and start again. `tune_run` changes the filters, window, target or keywords of a run still in flight, and here is what makes it worth reaching for: the run already holds every account it measured with the raw posts behind each one, so a filter change is answered in memory and at once. **Nothing is browsed again.** Every account marked as failing is re-decided instantly; the ones that now clear the bar join the passing set, the ones that no longer clear it fall back out, and the vitals, marks and breakdown are rebuilt. Changing the window is exact too, recomputed from each account's own retained posts rather than guessed from an aggregate. From there the run carries the new numbers forward: every profile it measures next is judged by them, the stop condition uses the new target, and appended keywords extend what Phase 1 still has to draw on. Keywords are added to the end of the list, never removed.

The tool answers with the delta it caused, and the delta is the reading. A retune that loosens a floor and recovers a crowd of accounts is telling you the floor was the problem: those accounts were always there, and you have just taken them back for free. A retune that recovers nothing is telling you the opposite, that the niche is genuinely thin here, which is the moment for fresh keywords rather than a lower bar.

## Recover a short run instead of reporting it

If the user asked for a number of accounts and the run comes back under it, do not hand over what you have and call it done. Read why it fell short first. The verdicts tell you whether the niche ran dry or whether a filter set one notch too tight marked accounts as failing that you would gladly have taken. In the second case the answers are already in front of you as near misses, and re-running would only spend browser time to re-find what you can already read, so retune or read them straight from the results. When the niche truly lacked the accounts, run a follow-up discovery for the remainder with **fresh keywords**, since the same list would retread the same ground.

Expect overlap, and **dedupe** before you present anything: check new results against the first run's accounts and against the library. Present the combined, deduplicated set that actually meets the count they asked for.

Nothing here is a fixed script. Notice when a run underdelivered, when a filter was strangling it, when a niche wants a different angle, and squeeze the tools to give the user what they asked for and then some.

## Reading the result

`job_results` returns every account the run measured, each with its measurements and verdict, plus a `run_id` for the library. Read the verdict first, because it changes what a row means.

- An account that **passed** is an answer.
- An account that **failed** names each filter it missed and, for each, the value measured against the bar it was held to. A near miss that failed a single filter by a hair is often worth more than a comfortable pass, which is why those are marked.
- An account with **no posts in the window** is reported as exactly that, never as a zero average. An account that published a run of strong slideshows a while ago and then paused is a superb thing to study for format, and reporting it as a zero would bury it in silence.
- An account the run **could not measure**, usually because nothing loaded, is marked unmeasured rather than counted as though its blanks were real numbers.

The view fields carry the window's length in their names and read as null when the account posted nothing inside it, so a null there is the no-posts fact showing through rather than a measurement of zero. Read the slideshow ratio, the windowed average views, views per follower, the consistency of the cadence, and how often they post. Turn those into a table and a reading. analysis.md covers how.
