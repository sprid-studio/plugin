# LinkedIn

**What Sprid does with this:** Publish approved carousels to LinkedIn as swipeable document posts.

## You need

A LinkedIn account. Check the connected destination before publishing: Company Page availability depends on Sprid’s LinkedIn approval. A Page also requires **Super admin** or **Content admin** access.

## Then run

```
sprid connect linkedin --account <slug>
```

Replace `<slug>` with your Sprid account slug.

## Click path (the connect)

1. Sign in to LinkedIn in the browser that opens.
2. Review the access Sprid requests and click **Allow**.
3. Return to Sprid and check the connected name.

## How to check it worked

Run `sprid status` and confirm the destination. After publishing a reviewed carousel, open LinkedIn and check the document post.

## If it fails

- **Company Page missing:** ask its Super admin to check your role under **Page → Settings → Manage admins**. Contact [Sprid support](mailto:hello@sprid.studio) if Page publishing is unavailable.
- **Access denied:** reconnect, then check you still have permission to publish to the destination.
- **Connection expiring or expired:** run the connect command again.

## Sources

- [Share on LinkedIn](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin)
- [Posts API permissions](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api)
- [Documents API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/documents-api)

## Investigate with this connection

Your agent can use `list_marketing_queries` and `query_marketing_source` for `posts`, `comments`. Discover the exact parameters and required setup with:

```sh
sprid marketing-review capabilities --app <slug> --source linkedin --json
```

Queries Sprid’s stored publishes, metric snapshots and inbox for the linked content account. No live platform sync or paid API read. Missing metrics are unmeasured; this does not expose the platform’s entire API. See [connected queries](https://sprid.studio/docs/queries) for the shared workflow. Extra operations may need additional read permissions; a stored key alone is not live verification.
