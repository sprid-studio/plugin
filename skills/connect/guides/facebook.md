# Facebook Page

**What Sprid does with this:** Publish approved posts to your Facebook Page and see their results.

## You need

A Facebook **Page** you can publish to. Check **Professional dashboard → Page access** for **Facebook access** or **task access** that includes **Content**. Personal profiles cannot be connected for publishing. Instagram does not need to be linked.

Need to create or organize Pages first? Follow [Create your social accounts](https://sprid.studio/docs/connect/social-accounts). Portfolio ownership is a separate check from a successful Sprid connection.

## Then run

```
sprid connect facebook --account <slug>
```

Replace `<slug>` with your Sprid account slug.

## Click path (the connect)

1. Sign in to Facebook with the profile that manages your Page.
2. Select the Page you want to connect and leave the requested permissions enabled.
3. Click **Continue / Done** to return to Sprid.
4. If Sprid lists several Pages, choose one by rerunning the command with `--page <id>`, using the id shown in the message.

## How to check it worked

Run `sprid status` and check the connected Page’s name. When you publish a reviewed post, check that it appears on that Page.

## If it fails

- **No Pages found:** check your Page access, reconnect and select the Page in Facebook’s chooser.
- **Permission missing:** reconnect and approve all requested permissions.
- **Page already connected:** check that you selected the intended Page. Each Page connects to one Sprid account; disconnect the existing connection only if you intentionally want to move that Page.
- **“Invalid Scopes”, app unavailable or “URL blocked”:** contact [Sprid support](mailto:hello@sprid.studio). These need a fix from Sprid.

## Sources

- [Pages API getting started](https://developers.facebook.com/docs/pages-api/getting-started)
- [Permission descriptions and review requirements](https://developers.facebook.com/docs/permissions)
- [App modes](https://developers.facebook.com/docs/development/build-and-test/app-modes)
- [Facebook access vs task access on the new Pages experience](https://www.facebook.com/business/help/582754542592549)

## Investigate with this connection

Your agent can use `list_marketing_queries` and `query_marketing_source` for `posts`, `comments`. Discover the exact parameters and required setup with:

```sh
sprid marketing-review capabilities --app <slug> --source facebook --json
```

Queries Sprid’s stored publishes, metric snapshots and inbox for the linked content account. No live platform sync or paid API read. Missing metrics are unmeasured; this does not expose the platform’s entire API. See [connected queries](https://sprid.studio/docs/queries) for the shared workflow. Extra operations may need additional read permissions; a stored key alone is not live verification.
