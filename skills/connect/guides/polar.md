# Polar

**What Sprid does with this:** Read revenue and subscriptions from your Polar account.

## You need

Access to your Polar organization’s developer settings.

## Click path (polar.sh)

1. Open your organization → **Settings → Developers → New Organization Access Token**, and name it `Sprid`.
2. Select **metrics:read** only.
3. Create the token and save it to a private file such as `~/keys/polar-sprid.txt`. It is shown once.

## Then run

```
sprid connect polar --app <slug> --key ~/keys/polar-sprid.txt
```

Use your Sprid app slug and your own file path. A personal token covering several organizations also needs `--org <organization-id>`.

## How to check it worked

Ask your agent: “Check that Sprid can read revenue and subscriptions for this Polar organization.” A saved token alone does not confirm access.

## What the numbers mean

Polar’s daily revenue and current monthly recurring revenue. Polar supplies no trial count, so that field stays blank.

## If it fails

- **Access denied:** create a replacement token with **metrics:read**, then reconnect.
- **Wrong or empty results with a personal token:** add `--org <organization-id>`.

## Investigate with this connection

Reads `metrics`, `orders` and `subscriptions` for the pinned organization. Product filters separate apps sold through the same organization.

```sh
sprid marketing-review capabilities --app <slug> --source polar --json
```

See [connected queries](https://sprid.studio/docs/queries).

## Sources

- [Metrics endpoint](https://polar.sh/docs/api-reference/metrics/get)
