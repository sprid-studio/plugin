# Facebook Page

**What Sprid does with this:** Publish approved posts to your Facebook Page and see their results.

## You need

A Facebook **Page** you can publish to: **Professional dashboard → Page access** should show **Facebook access**, or **task access** that includes **Content**. Personal profiles cannot be connected, and Instagram does not need to be linked. To create a Page or add it to a business portfolio, see [Create your social accounts](https://sprid.studio/docs/connect/social-accounts).

## Then run

```
sprid connect facebook --account <slug>
```

Replace `<slug>` with your Sprid account slug.

## Click path (the connect)

1. Sign in with the Facebook profile that manages the Page.
2. Select the Page and leave the requested permissions enabled.
3. Click **Continue / Done** to return to Sprid.
4. If Sprid lists several Pages, rerun with `--page <id>` using the id in the message. The profile’s name is not the Page destination.

## How to check it worked

Run `sprid status` and check the Page name. After publishing a reviewed post, check it on that Page.

## If it fails

- **No Pages found:** check your Page access, reconnect and select the Page in Facebook’s chooser.
- **Permission missing:** reconnect and approve all requested permissions.
- **Page already connected:** check you picked the intended Page. A Page connects to one Sprid account; disconnect the old one only if you mean to move it.
- **“Invalid Scopes”, app unavailable or “URL blocked”:** contact [Sprid support](mailto:hello@sprid.studio). Only Sprid can fix these.

## Investigate with this connection

Operations `posts` and `comments`, read from Sprid’s stored publishes, metric snapshots and inbox (no live platform read; missing metrics are unmeasured, not zero).

```sh
sprid marketing-review capabilities --app <slug> --source facebook --json
```

See [connected queries](https://sprid.studio/docs/queries).

## Sources

- [Pages API getting started](https://developers.facebook.com/docs/pages-api/getting-started)
- [Permission descriptions and review requirements](https://developers.facebook.com/docs/permissions)
- [App modes](https://developers.facebook.com/docs/development/build-and-test/app-modes)
- [Facebook access vs task access on the new Pages experience](https://www.facebook.com/business/help/582754542592549)
