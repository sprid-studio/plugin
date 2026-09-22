# TikTok

**What Sprid does with this:** Publish approved posts to TikTok, or send drafts to finish in the TikTok app.

## You need

A TikTok account you can sign in to, set to public if you want public posts.

## Then run

```
sprid connect tiktok --account <slug>
```

Replace `<slug>` with your Sprid account slug.

## Click path (the connect)

1. Sign in to TikTok in the browser that opens, or scan the QR code with your phone.
2. Review the requested access and click **Authorize**.
3. Back in Sprid, check the connected handle.

## How to check it worked

Run `sprid status` and check the handle. To test publishing, post a reviewed post as **Only me** and find it on your profile.

## Before publishing

TikTok requires you to choose these on every post, with nothing pre-filled:

- Audience (privacy) and whether to allow comments. Videos also offer Duet and Stitch where your account allows them.
- The commercial-content disclosure, if the post promotes your business or another brand. Branded content cannot use **Only me**.
- The music and branded-content terms shown above the publish button.

In a batch, your choices apply to every post shown. Rescheduling a booking keeps its original choices.

## If it fails

- **A public post arrives as private:** use **Send as a draft** and finish in TikTok, and tell [Sprid support](mailto:hello@sprid.studio) about the public-posting restriction.
- **Publishing limit reached:** retry later, or send as a draft.
- **“Checking your TikTok account…” stays on screen:** select **Retry**, then reconnect if it still fails.
- **Publish stays disabled:** complete the audience and disclosure choices and resolve any message beside the button.

## Investigate with this connection

Operations `posts` and `comments`, read from Sprid’s stored publishes, metric snapshots and inbox (no live platform read; missing metrics are unmeasured, not zero).

```sh
sprid marketing-review capabilities --app <slug> --source tiktok --json
```

See [connected queries](https://sprid.studio/docs/queries).

## Sources

- [Content Posting API](https://developers.tiktok.com/doc/content-posting-api-get-started)
- [Direct Post reference](https://developers.tiktok.com/doc/content-posting-api-reference-direct-post)
- [Query creator info](https://developers.tiktok.com/doc/content-posting-api-reference-query-creator-info)
- [Content Sharing Guidelines](https://developers.tiktok.com/doc/content-sharing-guidelines)
- [Login Kit for web](https://developers.tiktok.com/doc/login-kit-web)
