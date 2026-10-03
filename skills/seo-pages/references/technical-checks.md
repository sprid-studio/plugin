# Technical checks for search pages

Each check below failed in a real site and looked fine in the code. Run them on the
built output and the deployed site, not on the source. Where a check can be a test
in the repo's build, make it one, so it cannot regress.

## URLs, canonicals and redirects

- **One URL form.** Pick trailing slash or not, and generate every canonical,
  internal link, sitemap entry and hreflang from one helper. A canonical that points
  at a URL which redirects is ignored.
- **Every redirect fires.** Request each old URL and check for a permanent redirect
  to the new one. Hosting rules that match the wrong form, or a fallback that serves
  the page with a 200, leave duplicate pages that the search engine picks between.
- **Old URLs that people or search engines still hold** keep redirecting after a
  rename, a merge or a page dropped by a quality threshold.

## Indexing

- **The sitemap lists only pages meant to be indexed.** No `noindex` pages, no
  redirects, no 404s. Generate it from the same rule that sets `noindex`, and test
  that the two agree.
- **Split sitemaps by page type** so the indexing report shows each type on its own.
- **`lastmod` changes only when the page did.**
- **Thin or empty pages** (no real content for this item yet) are `noindex` or not
  built at all. Set the threshold from what the page needs to be useful, write it
  down, and revisit it when the data grows.
- **App shells and parameter pages** that render nothing useful without
  JavaScript are `noindex, follow`, set on the page. Blocking them in `robots.txt`
  stops the crawler from ever reading that `noindex`.
- **Server HTML carries the content.** Fetch the page without JavaScript and check
  the text, headings and links are there.
- **Pages rendered on demand cost money when crawled.** Check what a crawler
  walking all of them does to the database and hosting bill.

## Languages and markets

- **hreflang names only pages the build actually wrote**, and every page in a set
  links back. Make the build fail when it names a missing page.
- **A language only gets pages where its content exists.** A language switcher that
  links to thousands of missing pages hands crawlers dead links.
- **Check where impressions come from.** A page in one language can rank in a
  market you never targeted; decide whether that is useful before building more.

## Links

- **No orphan pages.** Every page is reachable from a hub, a related list or the
  navigation, within a few clicks of the homepage. Run a link checker on the build.
- **Related links stay relevant** after slugs change; a rename can silently drop
  them.

## Structured data

- **Only true values.** Ratings, review counts, prices and currencies match what is
  public today, in the page's market. Invented or stale ratings are a policy risk.
- **Check what the search engine still shows.** Rich result types come and go (FAQ
  results, for example, were cut back sharply). Read the search engine's current
  documentation before promising a rich result.
- A plain HTTP fetch may strip structured data; check it in a rendered page or the
  search engine's own testing tool.

## Crawlers and AI assistants

- **Decide which bots may read the site:** search crawlers and the crawlers behind
  AI answers, separately from crawlers collecting training data. Write the choice in
  `robots.txt` and any edge rules, and check it is served.
- **The API host's `robots.txt` answers too.** An error there can block crawling of
  everything it serves.

## Measurement traps

- Search Console data runs about two days behind; exclude the last days from any
  comparison.
- A rising page count lowers average click rate even when every page improves.
  Compare a fixed set of pages, by position band.
- A big change in impressions can be a few pages or one query. Read medians and the
  top contributors before calling a trend.
- A claim like "type X earns more" needs the comparison that would break it: same
  positions, same markets, same period.
