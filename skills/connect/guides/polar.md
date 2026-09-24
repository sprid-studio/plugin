# Polar

**What Sprid does with this:** Read revenue and subscriptions from your Polar account.

## You need

Access to your Polar organization’s developer settings.

## Click path (polar.sh)

1. Open your organization → **Settings → Developers → New Organization Access Token**, and name it `Sprid`.
2. Select **metrics:read** only.
3. Create the token. It is shown once.
4. Copy the token and leave it on your clipboard.

## Then run

```
sprid connect polar --app <slug> --key-from-clipboard
```

Use your Sprid app slug. A personal token covering several organizations also needs `--org <organization-id>`.

Sprid reads the token from your clipboard, saves it and clears the clipboard, so it never shows on screen or lands in a file. Working with an agent? Tell it the token is copied and it runs this for you. Typing it yourself, copy the token last: paste the command into your terminal first, then copy the token, then press Enter. If the clipboard still holds the command, Sprid refuses it; copy the token and run it again. Without clipboard access (a remote shell), save the token to a file and pass `--key <file>` instead.

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
