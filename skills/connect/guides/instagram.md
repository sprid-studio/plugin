# Instagram

**What Sprid does with this:** Publish approved posts to Instagram and see how they perform.

## You need

- An Instagram **Business** or **Creator** account. A Facebook Page is optional. No account yet? Start with [Create your social accounts](https://sprid.studio/docs/connect/social-accounts).
- Your phone for any two-factor prompt.

To switch a personal account: profile → **≡ → Settings and activity → For professionals → Account type and tools → Switch to professional account** → pick a category → **Creator** or **Business**. You can skip linking a Facebook Page.

## Then run

```
sprid connect instagram --account <slug>
```

Replace `<slug>` with your Sprid account slug, or use **Settings → Channels → Connect Instagram** in Sprid. In an agent-controlled browser, add `--no-browser` and open the returned link in the session for the intended account. Keep that link private.

## Click path (the connect)

1. Sign in to the Instagram account you want. If another account is signed in, sign out first.
2. Check the handle in the consent dialog and leave the requested permissions enabled.
3. Click **Allow** to return to Sprid.

## How to check it worked

Run `sprid status` and check that Instagram shows the right handle. Before scheduling a batch, publish one reviewed post and check it on Instagram.

## If it fails

- **Account not eligible:** switch to Business or Creator, then reconnect.
- **Already connected elsewhere:** check the handle. If the wrong account was signed in, cancel and restart. Move a connection only if you mean to change its Sprid destination.
- **Connection expired or permissions missing:** run the connect command again and approve all requested access.
- **App unavailable, “Invalid Scopes” or a redirect error:** send the error to [Sprid support](mailto:hello@sprid.studio). Only Sprid can fix these.
- **Long-lived token exchange fails after Allow:** authorization did not complete. Send the error text to [Sprid support](mailto:hello@sprid.studio). If Sprid invites your account as a tester, open Instagram **Settings → Website permissions → Apps and websites → Tester Invites**, accept Sprid-IG, then start a fresh connection. The tab may only appear after an invitation. Do not create another Instagram account or your own Meta developer app. `Unsupported request - method type: get` alone does not identify the cause.

## Investigate with this connection

Operations `posts` and `comments`, read from Sprid’s stored publishes, metric snapshots and inbox (no live platform read; missing metrics are unmeasured, not zero).

```sh
sprid marketing-review capabilities --app <slug> --source instagram --json
```

See [connected queries](https://sprid.studio/docs/queries).

## Sources

- [Instagram API with Instagram Login](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/)
- [Business Login for Instagram](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login)
- [Permission descriptions and App Review requirement](https://developers.facebook.com/docs/permissions)
- [App modes](https://developers.facebook.com/docs/development/build-and-test/app-modes)
- [Switch to a professional account](https://creatorsupport.creatoriq.com/hc/en-us/articles/13578083261709-How-do-I-switch-from-a-Personal-to-a-Professional-Instagram-account)
