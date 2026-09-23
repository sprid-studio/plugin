# Analyze, pull evidence, the library, and presenting results

Discovery finds accounts. This is everything you do with them: reading one in depth, pulling its content down as evidence, working the library, and turning any of it into advice the user can act on.

## `analyze_account`: one account, in depth

It reads a single named account's posts and returns a full report: the share that are slideshows, average views, likes, comments, shares and saves, how often and how steadily they post, their top hashtags, and their best posts. `top_posts` is ordered by views, highest first, with slideshows and videos ranked together in one list and each entry saying which it is. It reads a recent window (`days`); pass `all_videos: true` to read the whole account, which is slower on a big one.

Reach for it in two situations:

- **The user names an account.** "What is @someone doing?" is an analyze call.
- **A discovered account deserves a closer look.** When a row is overperforming and you are about to work out how they do it, analyze it first to see the real posts, captions, hooks and top slideshows behind the summary numbers.

Know the tradeoff: **this is a fresh browser read, not a library lookup.** `get_account` answers instantly from what the library holds, while this spends a minute or three opening Chrome. But an account's numbers go stale within hours, so for a single account the fresh read is both cheap and current, and often right even when a library copy exists. Library-first is the reflex for discovery-scale questions, where re-running would spend real browser time across many accounts.

Only one analysis runs at a time, but discovery and analysis are independent, so a deep read of one account can run alongside a discovery already in flight. That is a good use of a long run's waiting.

`analyze_account` writes nothing to the library; its report lives in `job_results`. It is also the bridge to pulling evidence: each `top_posts` entry carries a `type` and a `url`, and the slideshow entries are the ones `start_download` takes as links. The videos cannot be pulled; leave them.

## `start_download`: slideshows to disk, as evidence

Read the rights rule in SKILL.md before the first call. What comes down is someone else's work, held so a format can be taken apart and rebuilt in the user's own voice and images. It is never material to post, to re-upload, or to place in a draft.

Give it **either accounts or links, never both** (call it twice if you need both).

**By account.** Give handles and let the tool choose which slideshows to pull. Three choices per account:
- `count`: how many slideshows to take once sorted.
- `sort`: what counts as best. Six options: `views`, `likes`, `comments`, `shares`, `favorites`, `engagement`. The first five rank on that raw number as the platform reports it; `engagement` ranks on (likes + comments + shares + favorites) divided by views, which favours posts that got a reaction over posts that merely got seen.
- `max_days`: ignore slideshows older than this before ranking. At zero, no age limit. This is the window the ranking happens inside rather than a filter applied after, so the order of work is: read the posts, drop anything older than `max_days`, sort what is left, take the first `count`.

Set these at the top level to move the whole call, and any single account may carry its own to be treated differently in the same run.

**By links.** Give the URLs of particular posts (`https://www.tiktok.com/@handle/photo/...`) and it pulls exactly those. This is where `analyze_account`'s slideshow urls go.

**When to pull at all:** when the structure is the question and the summary numbers cannot answer it. How many slides before the turn, where the hook lands, whether the caption carries the promise or the first card does, what the last card asks for. Pull a few strong examples of one format, not an account's whole output; a teardown needs enough to see the pattern and nothing more.

Every slideshow arrives with a `metadata.json` beside its images carrying views, likes, comments, shares, favorites, engagement rate, slide count, hashtags and published date, so any ranking the six sorts do not offer can be computed from what came down. The files stay on disk under the downloads directory `status` reports. Nothing is cleaned up behind the user, and nothing is uploaded anywhere unless the user asks for these to be pushed into Sprid as inspirations, where they become reference for analysis and never a source of artwork.

## The library: the user's own memory

Everything discovery has ever found persists locally, and reading it is instant, needs no session, and risks no run. Everything in it is something the user has already seen, and that single fact tells you when it answers and when it cannot. A question about research they already have is answered here in an instant. A request for *new* accounts can never be met from it, because handing its contents back is returning the user their own notebook. What it can still do for a fresh search is inform it quietly: the vocabulary and hashtags that already proved out are there to draw on again, and what the user already holds is there to dedupe against. Consulting it is internal work, not an event to narrate.

- `list_runs` gives every past discovery run, its keywords, and its `run_id`.
- `search_accounts` searches the whole library. `query` matches handles, display names, bios and hashtags; `run_id` narrows to one run. Sort with one of seven orders: `found` (newest first), `avg_views`, `followers`, `slideshow_ratio`, `view_follower_ratio`, `consistency_score`, `last_post_days_ago`. It returns one page and a `total`, so a search that is too broad can be tightened before you read any of it.
- `get_account` returns one account in full: bio, sample captions, top hashtags, every measurement.

## Reading the metrics

- **`slideshow_ratio`**: how slideshow-first the account is. Low means a video account that occasionally posts photos, and its slideshow numbers are a weaker guide.
- **`view_follower_ratio`**: views per follower, and the single clearest sign of an account working. Above one means each post is seen more times than the account has followers, so the content is travelling well past their own audience. That is the account worth learning from, especially at a small follower count.
- **the windowed average views** (the field carries the window's length in its name): raw reach per post. Read it against the niche rather than in the abstract, and remember one viral post can drag an average up on its own, so open the spread when the figure carries weight.
- **`consistency_score`**: how evenly they post, higher being steadier. High consistency alongside high views is a repeatable machine worth understanding; high views with low consistency may be one viral fluke wearing a machine's clothes.
- **`posts_per_week`**: cadence, the effort behind the results.
- **`last_post_days_ago`**: whether they are still active. A brilliant account that stopped posting is a weaker model to follow than a good one still going, though its format can still be worth taking apart.

The strongest thing you can find and flag is the small account with an outsized `view_follower_ratio` and a steady cadence: proof the format works on its own merits rather than on an existing audience.

## Presenting like a strategist, not a database

A raw JSON blob is the tool talking, not you. Picture what a founder wants out of a set of results: the shape of what you found at a glance, the accounts that matter pulled out and read for them, and a clear sense of what to do next.

A compact table of the few columns that carry the decision lands the first part: handle as a clickable `https://www.tiktok.com/@username` link, followers, slideshow %, avg views, views per follower, cadence. Not every metric. A couple of sentences of genuine reading lands the rest: name the one or two accounts doing the most with the least and say their formats are the ones to take apart first, flag the account with reach but erratic posting so its numbers are read with that caveat, and close on the next move, an offer to analyze the strongest account's top slideshows and pull a few so the structure behind them can be worked out and rebuilt.

That is the feel to aim for rather than a template to fill. How much table, how much prose, and how pointed a recommendation a given moment wants is yours to read. What stays constant: link handles so the user can click through, surface the accounts that matter instead of leaving them to find them, explain your reasoning from the numbers on the table rather than from anything in these pages, and end on a next move. You are steering the research, not just reporting it.
