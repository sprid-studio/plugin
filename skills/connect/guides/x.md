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
2. Review the requested access and click **Authorize app**.
3. Back in Sprid, check the connected handle.

## How to check it worked

Run `sprid status` and confirm the handle. After publishing a reviewed post, check it on X.

## The caption is its own field

The **X caption** has a **280-character** limit. Left empty, it uses your shared caption, which must then fit too. Carousels over four images publish as a thread, with the caption on the first post.

## If it fails

- **Connection expired or refresh failed:** run the connect command again.
- **Access denied after reconnecting:** send the error to [Sprid support](mailto:hello@sprid.studio).
- **Publishing limit reached:** check the post’s status and retry when the limit resets.

## Investigate with this connection

Operations `posts` and `comments`, read from Sprid’s stored publishes, metric snapshots and inbox (no live platform read; missing metrics are unmeasured, not zero).

```sh
sprid marketing-review capabilities --app <slug> --source x --json
```

See [connected queries](https://sprid.studio/docs/queries).

## Sources

- [OAuth 2.0 authorization code with PKCE](https://docs.x.com/resources/fundamentals/authentication/oauth-2-0/authorization-code)
- [Create a Post](https://docs.x.com/x-api/posts/create-post)
- [Chunked media upload](https://docs.x.com/x-api/media/quickstart/media-upload-chunked)
