# TikTok comments

**What Sprid does with this:** Read the comments on your TikTok posts into the Inbox next to Instagram and YouTube, and send the replies you approve. With TikTok Ads connected too, comments on a post you promote are read from the ad account and marked as an ad; replying to them still needs this connection.

## You need

- The TikTok account that publishes your posts, and its login. Sign in as that account, not as a TikTok for Business or ad account user.
- TikTok publishing already connected in Sprid, so Sprid knows which posts are yours. Sprid only reads comments on posts it published.

This is a separate connection from TikTok publishing and from TikTok Ads. The publishing connection cannot read comments. TikTok only allows comment access through its business tools.

## Then run

```sh
sprid connect tiktok-comments --account <slug>
```

Replace `<slug>` with your Sprid account slug. You can also use **Settings → Accounts → [account] → TikTok comments** in Sprid.

## Click path (the connect)

1. Sign in to TikTok with the account that publishes the posts.
2. Review the requested access (your profile and your comments) and click **Authorize**.
3. Back in Sprid, check the connected handle.

With several brands, connect each Sprid account separately, signed in as that brand's TikTok account.

## How to check it worked

Run `sprid status` and check that TikTok comments shows the right handle. New comments appear in the Inbox within about an hour. A comment on a promoted post is marked as an ad.

## What Sprid does and does not do

- It reads comments hourly for posts from the last 3 days, and every 6 hours for posts from the last 30.
- A reply goes out only when you send it from the Inbox. Sprid never replies on its own.
- Sprid never hides or deletes a TikTok comment. Filing a comment as done only changes the Inbox.
- It sees at most three replies under each comment, the limit TikTok sets.

## If it fails

- **“TikTok comments are not switched on in Sprid yet”:** Sprid has not enabled TikTok's business tools on this server. Contact [Sprid support](mailto:hello@sprid.studio).
- **The Inbox shows no TikTok comments:** check that the handle under TikTok comments is the account that published the posts. Posts sent to your TikTok drafts, or still in TikTok's review, have no public post yet and are skipped until they do.
- **“Sprid answers TikTok comments through the account that posted them”:** a comment on a promoted post can only be answered with TikTok comments connected. Connect it, or reply in the TikTok app.
- **TikTok comments shows “Reconnect”:** TikTok's access lasts about a year and then needs one new sign-in. Run the connect command again.

## Sources

- [TikTok API for Business: TikTok account authorization](https://business-api.tiktok.com/portal/docs?id=1738083939371009)
- [TikTok API for Business: get comments](https://business-api.tiktok.com/portal/docs?id=1760232109619202)
- [TikTok API for Business: reply to a comment](https://business-api.tiktok.com/portal/docs?id=1762228448779266)
