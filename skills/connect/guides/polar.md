# Polar

**What Sprid does with this:** Read revenue and subscriptions from your Polar account.

## You need

Access to your Polar organization’s developer settings.

## Click path (polar.sh)

1. Open your organization → **Settings → Developers**.
2. Click **New Organization Access Token** and name it `Sprid`.
3. Select **metrics:read** and leave other permissions off.
4. Create the token and save it to a private file such as `~/keys/polar-sprid.txt`. It is shown only once.

## Then run

```
sprid connect polar --app <slug> --key ~/keys/polar-sprid.txt
```

Replace `<slug>` with your Sprid app slug and use your own file path. If using a personal token that covers several organizations, add `--org <organization-id>` to select yours.

## How to check it worked

Ask your agent: “Check that Sprid can read revenue and subscriptions for this Polar organization.” A saved token alone does not confirm access.

## What the numbers mean

Sprid shows Polar’s daily revenue and current monthly recurring revenue. Polar does not supply a trial count, so that field stays blank.

## If it fails

- **Access denied:** create a replacement token with **metrics:read**, then reconnect.
- **Wrong or empty results with a personal token:** add `--org <organization-id>` to the connection command.

## Sources

- [Metrics endpoint](https://polar.sh/docs/api-reference/metrics/get)

## Investigate with this connection

Your agent can use `list_marketing_queries` and `query_marketing_source` for `metrics`, `orders`, `subscriptions`. Discover the exact parameters and required setup with:

```sh
sprid marketing-review capabilities --app <slug> --source polar --json
```

Pinned organization. Product filters distinguish apps sold through the same organization. See [connected queries](https://sprid.studio/docs/queries) for the shared workflow. Extra operations may need additional read permissions; a stored key alone is not live verification.
