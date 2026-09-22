# X

**What Sprid does with this:** Publish approved posts to X and see how they perform.

## You need

An X account you can sign in to. Sprid handles the developer connection.

## Then run

```
sprid connect x --account <slug>
```

Replace `<slug>` with your Sprid account slug.

## Click path (the connect)

1. Sign in to the X account you want to use.
2. Review Sprid’s requested access and click **Authorize app**.
3. Return to Sprid and check the connected handle.

## How to check it worked

Run `sprid status` and confirm the handle. After publishing a reviewed post, check it on X.

## The caption is its own field

Keep the **X caption** within **280 characters**. If the box is empty, Sprid uses your shared caption. An overlong caption must be shortened before publishing.

Carousels with more than four images publish as a thread, with the caption on the first post.

## If it fails

- **Connection expired or refresh failed:** run the connect command again.
- **Access denied after reconnecting:** contact [Sprid support](mailto:hello@sprid.studio) with the error message.
- **Publishing limit reached:** check the post’s status and retry when the limit resets.

## Sources

- [OAuth 2.0 authorization code with PKCE](https://docs.x.com/resources/fundamentals/authentication/oauth-2-0/authorization-code)
- [Create a Post](https://docs.x.com/x-api/posts/create-post)
- [Chunked media upload](https://docs.x.com/x-api/media/quickstart/media-upload-chunked)

## Investigate with this connection

Your agent can use `list_marketing_queries` and `query_marketing_source` for `posts`, `comments`. Discover the exact parameters and required setup with:

```sh
sprid marketing-review capabilities --app <slug> --source x --json
```

Queries Sprid’s stored publishes, metric snapshots and inbox for the linked content account. No live platform sync or paid API read. Missing metrics are unmeasured; this does not expose the platform’s entire API. See [connected queries](https://sprid.studio/docs/queries) for the shared workflow. Extra operations may need additional read permissions; a stored key alone is not live verification.
