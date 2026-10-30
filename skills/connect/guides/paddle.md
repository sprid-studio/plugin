# Paddle

**What Sprid does with this:** Read revenue and subscriptions from your Paddle account.

## You need

**Paddle Billing** access (Paddle Classic keys do not work), and whether the key is for your live account or sandbox.

## Click path (vendors.paddle.com)

1. **Developer tools → Authentication → New API key**, named `Sprid`.
2. Select **transaction.read** and **subscription.read** only.
3. Create the key. It is shown once.
4. Copy the key and leave it on your clipboard.

## Then run

```
sprid connect paddle --app <slug> --key-from-clipboard
```

Use your Sprid app slug. Add `--env sandbox` for a sandbox key.

Typing the command yourself? Copy the key last, as [Keys from your clipboard](https://sprid.studio/docs/connect/posthog#keys-from-your-clipboard) explains, with the fallback for a shell without a clipboard.

## How to check it worked

Ask your agent: “Check that Sprid can read this Paddle account’s completed sales and active subscriptions.” A saved key alone does not confirm access.

## What the numbers mean

Revenue covers 28 complete days of gross completed transactions: tax included, before refunds, credits, chargebacks and Paddle’s fees, so it will exceed your payout. MRR is current active subscription prices over their billing periods. Currencies stay separate; incomplete pagination makes a total unavailable.

## If it fails

- **Access denied:** a sandbox key needs `--env sandbox`.
- **A permission is missing:** create a replacement key with both permissions, then reconnect.
- **Revenue exceeds your payout:** expected. Compare against customer payments, not what is left after tax and fees.

## Investigate with this connection

Reads `transactions` and `subscriptions` for the key’s merchant account, live or sandbox as saved. Amounts are minor-unit strings. Subscription creation-date filters apply per page, so keep paginating past pages with no matches.

```sh
sprid marketing-review capabilities --app <slug> --source paddle --json
```

See [connected queries](https://sprid.studio/docs/queries).

## Sources

- [List transactions](https://developer.paddle.com/api-reference/transactions/list-transactions)
- [API authentication](https://developer.paddle.com/api-reference/about/authentication)
