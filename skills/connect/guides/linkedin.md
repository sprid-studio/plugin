# LinkedIn

**What Sprid does with this:** Publish approved carousels to LinkedIn as swipeable document posts.

## You need

A LinkedIn account. Publishing to a Company Page needs **Super admin** or **Content admin** access on the Page.

## Then run

```
sprid connect linkedin --account <slug>
```

Replace `<slug>` with your Sprid account slug.

## Click path (the connect)

1. Sign in to LinkedIn in the browser that opens.
2. Review the requested access and click **Allow**.
3. Back in Sprid, check the connected name.

## How to check it worked

Run `sprid status` and confirm the destination. After publishing a reviewed carousel, check the document post on LinkedIn.

## If it fails

- **Company Page missing:** ask its Super admin to check your role under **Page → Settings → Manage admins**. If Page publishing is unavailable, contact [Sprid support](mailto:hello@sprid.studio).
- **Access denied:** reconnect and check you can still publish to the destination.
- **Connection expiring or expired:** run the connect command again.

## Investigate with this connection

Operations `posts` and `comments`, read from Sprid’s stored publishes, metric snapshots and inbox (no live platform read; missing metrics are unmeasured, not zero).

```sh
sprid marketing-review capabilities --app <slug> --source linkedin --json
```

See [connected queries](https://sprid.studio/docs/queries).

## Sources

- [Share on LinkedIn](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin)
- [Posts API permissions](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api)
- [Documents API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/documents-api)
