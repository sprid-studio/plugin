# Bing Webmaster Tools

**What Sprid does with this:** See which Bing searches bring people to your website, which pages they land on and how much of your site Bing has indexed.

## You need

A Microsoft account with your website verified in Bing Webmaster Tools. One API key covers every site verified in that account, so connect it once per app and reuse the same key.

## Click path

### A. Verify the site

1. Open [Bing Webmaster Tools](https://www.bing.com/webmasters) and sign in.
2. Already using Search Console? On **My Sites** choose **Import**, sign in with Google, then pick your sites. They arrive verified, with their sitemaps.
3. Otherwise **Add a site** and follow one of the verification methods shown.

### B. Create the API key

4. Click the **Settings** gear (top right), then **API Access**.
5. First time: accept the terms, then choose **API Key** and **Generate API Key**.
6. Copy the key. There is one per Microsoft account.

## Then run

```
sprid connect bing --app <slug> --key-from-clipboard --site https://example.com
```

`--site` is the address of this app’s website as verified in Bing. Leave it out when the app already has its website set in Sprid.

Typing the command yourself? Copy the key last, as [Keys from your clipboard](https://sprid.studio/docs/connect/posthog#keys-from-your-clipboard) explains, with the fallback for a shell without a clipboard.

## If Sprid cannot reach Bing

Sprid reads Bing on its servers. Should Bing ever refuse them, your agent’s marketing review can read Bing from your computer instead. Save the key in a private file and point the app’s local secrets at it:

```json
{ "bingWebmasterApiKeyPath": "~/.config/bing-webmaster/api_key" }
```

That line goes in `~/.sprid/secrets/<slug>.json`. One file serves every app on the same Bing account. Keep it out of any repository. Only the review on your computer reads it: `sprid connect --from-local` does not send it to Sprid, so `sprid connect bing` above stays the way Sprid gets the key.

## How to check it worked

Run `sprid status`, then ask your agent: “Read recent Bing search results for this website through Sprid.” A saved key confirms setup; only the live read confirms access. A newly verified site can take up to 48 hours to show traffic.

## If it fails

- **Invalid key:** generate a new one under **Settings → API Access** and connect again. Deleting a key in Bing stops every connection that used it.
- **Site not found or not verified:** the website saved in Sprid must match a verified site in the same Bing account, including `www` and `https`.
- **No traffic yet:** try again after 48 hours; Bing only reports days that had data.
- **Bing refuses Sprid’s servers (ThrottleIP):** set `bingWebmasterApiKeyPath` as above; the review then reads Bing locally until Sprid gets through again.

## Reading the numbers

Bing reports query and page rows in buckets of about a week, so a period’s edge is approximate, and a single query can show more clicks than impressions. Read click-through rate on the totals. Copilot citations are a separate Bing report that Sprid does not read yet.

## Sources

- [Getting access to the Bing Webmaster Tools API](https://learn.microsoft.com/en-ca/bingwebmaster/getting-access)
- [Import sites from Google Search Console](https://blogs.bing.com/webmaster/september-2019/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools)
