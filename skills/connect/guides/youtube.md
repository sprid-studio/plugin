# YouTube

**What Sprid does with this:** Upload approved videos to your YouTube channel and read their results.

## You need

A Google account with a YouTube channel. To create a channel, open [YouTube](https://youtube.com) → your profile picture → **Create a channel**.

## Set up additional channels

Open [your channel list](https://www.youtube.com/channel_switcher) and verify the Google account that should own the new channels. Reuse existing channels or choose **Create a channel** for a separate brand, creator, topic or audience. See [Create your social accounts](https://sprid.studio/docs/connect/social-accounts).

If YouTube requires advanced-feature verification, the owner completes the offered video, ID or channel-history route. Submission can remain pending review. Continue other platforms, then recheck eligibility before retrying. This is separate from authorizing Sprid and was observed when creating additional channels in September 2026.

## Then run

```
sprid connect youtube --account <slug>
```

Replace `<slug>` with your Sprid account slug.

## Click path (the connect)

1. Sign in with your Google account.
2. Choose the channel you want to upload to, including the Brand Account channel if you use one.
3. Review Sprid’s requested access and click **Continue**.

## How to check it worked

Run `sprid status` and check the channel name. Upload a reviewed reel as private, then check **YouTube Studio → Content**.

## If it fails

- **Google blocks sign-in or says Sprid is unverified:** contact [Sprid support](mailto:hello@sprid.studio) with the message.
- **An upload is private although you chose Public:** check its visibility in **YouTube Studio → Content**. If YouTube will not let you change it, contact Sprid support.
- **Upload limit reached:** wait before retrying. Check the post’s status in Sprid before submitting it again.

- **Channel creation asks for verification:** follow YouTube Studio’s instructions as the primary owner. Keep the channel pending until approval is confirmed; repeated Sprid authorization cannot create it.

## Sources

- [Feature eligibility and owner verification](https://support.google.com/youtube/answer/9891124?hl=en)
- [Getting started](https://developers.google.com/youtube/v3/getting-started)
- [`videos.insert` reference](https://developers.google.com/youtube/v3/docs/videos/insert)
- [Quota and compliance audits](https://developers.google.com/youtube/v3/guides/quota_and_compliance_audits)
- [Revision history](https://developers.google.com/youtube/v3/revision_history)

## Investigate with this connection

Your agent can use `list_marketing_queries` and `query_marketing_source` for `posts`, `comments`. Discover the exact parameters and required setup with:

```sh
sprid marketing-review capabilities --app <slug> --source youtube --json
```

Queries Sprid’s stored publishes, metric snapshots and inbox for the linked content account. No live platform sync or paid API read. Missing metrics are unmeasured; this does not expose the platform’s entire API. See [connected queries](https://sprid.studio/docs/queries) for the shared workflow. Extra operations may need additional read permissions; a stored key alone is not live verification.
