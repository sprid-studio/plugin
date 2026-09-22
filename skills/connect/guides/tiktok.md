# TikTok

**What Sprid does with this:** Publish approved posts to TikTok, or send drafts to finish in the TikTok app.

## You need

A TikTok account you can sign in to. Make it public if you want to publish public posts.

## Then run

```
sprid connect tiktok --account <slug>
```

Replace `<slug>` with your Sprid account slug.

## Click path (the connect)

1. Sign in to TikTok in the browser that opens. You can scan the QR code with your phone.
2. Review Sprid’s requested access and click **Authorize**.
3. Return to Sprid and check the connected handle.

## How to check it worked

Run `sprid status` and check your TikTok handle. For a publishing check, choose **Only me** for a reviewed post, then find it on your TikTok profile.

## Before publishing

Choose the audience and whether to allow comments each time. Videos also offer Duet and Stitch where your account allows them.

If a post promotes your business or another brand, complete the commercial-content disclosure. Branded content cannot use **Only me**. Review the music and branded-content terms above the publish button.

These choices apply to every post shown in a batch. Rescheduling an existing booking keeps that booking’s choices.

## If it fails

- **A public post arrives as private:** use **Send as a draft** and finish publishing in TikTok. Contact [Sprid support](mailto:hello@sprid.studio) about the public-posting restriction.
- **A publishing limit is reached:** retry later, or use the draft option if available.
- **“Checking your TikTok account…” stays on screen:** select **Retry**. If it still fails, reconnect.
- **Publish stays disabled:** complete the audience and disclosure choices and resolve any message shown beside the button.

## Sources

- [Content Posting API](https://developers.tiktok.com/doc/content-posting-api-get-started)
- [Direct Post reference](https://developers.tiktok.com/doc/content-posting-api-reference-direct-post)
- [Query creator info](https://developers.tiktok.com/doc/content-posting-api-reference-query-creator-info)
- [Content Sharing Guidelines](https://developers.tiktok.com/doc/content-sharing-guidelines)
- [Login Kit for web](https://developers.tiktok.com/doc/login-kit-web)

## Investigate with this connection

Your agent can use `list_marketing_queries` and `query_marketing_source` for `posts`, `comments`. Discover the exact parameters and required setup with:

```sh
sprid marketing-review capabilities --app <slug> --source tiktok --json
```

Queries Sprid’s stored publishes, metric snapshots and inbox for the linked content account. No live platform sync or paid API read. Missing metrics are unmeasured; this does not expose the platform’s entire API. See [connected queries](https://sprid.studio/docs/queries) for the shared workflow. Extra operations may need additional read permissions; a stored key alone is not live verification.
