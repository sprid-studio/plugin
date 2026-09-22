# Lemon Squeezy

**What Sprid does with this:** Read sales and subscriptions from your Lemon Squeezy store.

## You need

Access to your store’s **Settings → API** page.

## Click path (app.lemonsqueezy.com)

1. Open **Settings → API** and click **+** to create a key. Name it `Sprid`.
2. Copy the key and save it to a private file such as `~/keys/lemonsqueezy-sprid.txt`. It is shown only once.
3. Open **Settings → Stores**, select your store and copy its numeric id from the page address.

## Then run

```
sprid connect lemonsqueezy --app <slug> --key ~/keys/lemonsqueezy-sprid.txt --store 12345
```

Replace `<slug>` with your Sprid app slug. Use your own file path and store id; both are required.

## How to check it worked

Ask your agent: “Read this store’s Lemon Squeezy sales through Sprid and confirm the store is correct.” A saved key alone does not confirm access.

## What the numbers mean

Revenue covers 28 complete calendar days. Sprid combines orders with renewal/update invoices, excludes duplicate initial invoices and deducts refunds on the original purchase date. Currencies remain separate. Incomplete pagination makes the total unavailable.

MRR is unavailable until a complete priced billing schedule can be established; subscription objects supply price IDs rather than the prices needed for that calculation.

## If it fails

- **Key rejected:** create a replacement and reconnect.
- **Store not found:** check the store id belongs to the account that created the key.
- **An unexpected error page appears:** retry the connection. If it continues, send the message to [Sprid support](mailto:hello@sprid.studio).

## Sources

- [The store object](https://docs.lemonsqueezy.com/api/stores/the-store-object)
- [Getting started with the API](https://docs.lemonsqueezy.com/guides/developer-guide/getting-started)

## Investigate with this connection

Your agent can use `list_marketing_queries` and `query_marketing_source` for `orders`, `subscriptions` and `subscription-invoices`. Discover the exact parameters and required setup with:

```sh
sprid marketing-review capabilities --app <slug> --source lemonsqueezy --json
```

Pinned store. Product/variant filters distinguish apps in the same store. Preserve provider amounts and currencies. See [connected queries](https://sprid.studio/docs/queries) for the shared workflow. Extra operations may need additional read permissions; a stored key alone is not live verification.
