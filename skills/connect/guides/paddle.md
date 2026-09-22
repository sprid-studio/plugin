# Paddle

**What Sprid does with this:** Read revenue and subscriptions from your Paddle account.

## You need

Access to **Paddle Billing**. Paddle Classic keys cannot be used for this connection. Know whether you are using your live account or sandbox.

## Click path (vendors.paddle.com)

1. Open **Developer tools → Authentication → New API key** and name it `Sprid`.
2. Select **transaction.read** and **subscription.read**. Leave other permissions off.
3. Create the key and save it to a private file such as `~/keys/paddle-sprid.txt`. It is shown only once.

## Then run

```
sprid connect paddle --app <slug> --key ~/keys/paddle-sprid.txt
```

Replace `<slug>` with your Sprid app slug and use your own file path. For a sandbox key, add `--env sandbox`.

## How to check it worked

Ask your agent: “Check that Sprid can read this Paddle account’s completed sales and active subscriptions.” A saved key alone does not confirm access.

## What the numbers mean

Revenue covers 28 complete days of gross completed transactions, including tax and before refunds, credits, chargebacks and Paddle’s fees. It will differ from your payout. MRR estimates current active subscription prices over their billing periods. Currencies remain separate; incomplete pagination makes a total unavailable.

## If it fails

- **Access denied:** check whether the key is for sandbox. If so, reconnect with `--env sandbox`.
- **A permission is missing:** create a replacement key with both permissions above, then reconnect.
- **Revenue exceeds your payout:** compare customer payments, rather than the amount left after tax and fees.

## Sources

- [List transactions](https://developer.paddle.com/api-reference/transactions/list-transactions)
- [API authentication](https://developer.paddle.com/api-reference/about/authentication)

## Investigate with this connection

Your agent can use `list_marketing_queries` and `query_marketing_source` for `transactions`, `subscriptions`. Discover the exact parameters and required setup with:

```sh
sprid marketing-review capabilities --app <slug> --source paddle --json
```

Credential-scoped merchant account, with sandbox/live from the profile. Dates filter billed or created time as described; monetary values are minor-unit strings. See [connected queries](https://sprid.studio/docs/queries) for the shared workflow. Extra operations may need additional read permissions; a stored key alone is not live verification.

Subscription investigations need `subscription.read` in addition to `transaction.read` for transaction pages. Creation-date filtering on subscriptions happens per page in Sprid; continue pagination even if a page contains no matches.
