# Lemon Squeezy

**What Sprid does with this:** Read sales and subscriptions from your Lemon Squeezy store.

## You need

Access to your store’s **Settings → API** page.

## Click path (app.lemonsqueezy.com)

1. **Settings → API**: click **+** and name the key `Sprid`.
2. Copy the key and leave it on your clipboard. It is shown once.
3. **Settings → Stores**: select your store and copy its numeric id from the page address.

## Then run

```
sprid connect lemonsqueezy --app <slug> --key-from-clipboard --store 12345
```

Use your Sprid app slug and your store id. The store id is required.

Sprid reads the key from your clipboard, saves it and clears the clipboard, so it never shows on screen or lands in a file. Working with an agent? Tell it the key is copied and it runs this for you. Typing it yourself, copy the key last: paste the command into your terminal first, then copy the key, then press Enter. If the clipboard still holds the command, Sprid refuses it; copy the key and run it again. Without clipboard access (a remote shell), save the key to a file and pass `--key <file>` instead.

## How to check it worked

Ask your agent: “Read this store’s Lemon Squeezy sales through Sprid and confirm the store is correct.” A saved key alone does not confirm access.

## What the numbers mean

Revenue covers 28 complete calendar days: orders plus renewal and update invoices, without duplicate initial invoices, with refunds deducted on the original purchase date. Currencies stay separate. Incomplete pagination makes the total unavailable.

MRR stays unavailable until a complete priced billing schedule exists, because subscriptions carry price IDs, not prices.

## If it fails

- **Key rejected:** create a replacement and reconnect.
- **Store not found:** check the store id belongs to the account that created the key.
- **An unexpected error page appears:** retry. If it persists, send the message to [Sprid support](mailto:hello@sprid.studio).

## Investigate with this connection

Reads `orders`, `subscriptions` and `subscription-invoices` for the pinned store. Product and variant filters separate apps in the same store.

```sh
sprid marketing-review capabilities --app <slug> --source lemonsqueezy --json
```

See [connected queries](https://sprid.studio/docs/queries).

## Sources

- [The store object](https://docs.lemonsqueezy.com/api/stores/the-store-object)
- [Getting started with the API](https://docs.lemonsqueezy.com/guides/developer-guide/getting-started)
