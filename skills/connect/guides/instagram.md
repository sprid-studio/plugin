# Instagram

**What Sprid does with this:** Publish approved posts to Instagram and see how they perform.

## You need

Creating a brand, creator or side account? Start with [Create your social accounts](https://sprid.studio/docs/connect/social-accounts).

- An Instagram **Business** or **Creator** account. A Facebook Page is optional.
- Your phone for any two-factor sign-in prompt.

### Create an account first

Open [Instagram signup](https://www.instagram.com/accounts/emailsignup/), enter the intended owner email and chosen handle, then complete verification yourself. Check the resulting profile before connecting it.

### Switch a personal account to professional

In Instagram, open your profile → **≡ → Settings and activity → For professionals → Account type and tools → Switch to professional account**. Pick a category, then **Creator** or **Business**. You can skip linking a Facebook Page.

## Then run

```
sprid connect instagram --account <slug>
```

Replace `<slug>` with your Sprid account slug. You can also connect from **Settings → Channels → Connect Instagram** in Sprid.

## Click path (the connect)

1. In the browser that opens, sign in to the Instagram account you want to use. If the wrong account is signed in, sign out first.
2. Review the access Sprid requests for publishing and reading results. Leave the requested permissions enabled.
3. Click **Allow** to return to Sprid.

For an agent-controlled browser session, add `--no-browser` to the command and open its returned authorization link in the session for the intended Instagram account. Check the handle in the consent dialog before selecting Allow. Keep the temporary link private.

## How to check it worked

Run `sprid status` and check that Instagram shows the right handle as connected. Before scheduling a batch, publish a post you have reviewed and check it on Instagram.

## If it fails

- **Account not eligible:** switch to Business or Creator, then reconnect.
- **Already connected elsewhere:** first check the handle. If another account is signed in, cancel and restart with the correct login. Move a connection only when you intend to change its Sprid destination.
- **Connection expired or permissions missing:** run the connect command again and approve the requested access.
- **App unavailable, “Invalid Scopes” or a redirect error:** contact [Sprid support](mailto:hello@sprid.studio) with the error message. Sprid needs to resolve this; changing your account will not help.

- **Long-lived token exchange fails after Allow:** authorization has not completed. Contact [Sprid support](mailto:hello@sprid.studio) with the error text. Sprid must check app access and any tester-role requirement. If Sprid invites your account, open Instagram Settings → Website permissions → Apps and websites → Tester Invites, accept Sprid-IG, then start a fresh connection. The Tester Invites tab may appear only after an invitation; do not create another Instagram account or your own Meta developer app. An error such as `Unsupported request - method type: get` does not, by itself, identify the cause.

## Sources

- [Instagram API with Instagram Login](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/)
- [Business Login for Instagram](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login)
- [Permission descriptions and App Review requirement](https://developers.facebook.com/docs/permissions)
- [App modes](https://developers.facebook.com/docs/development/build-and-test/app-modes)
- [Switch to a professional account](https://creatorsupport.creatoriq.com/hc/en-us/articles/13578083261709-How-do-I-switch-from-a-Personal-to-a-Professional-Instagram-account)

## Investigate with this connection

Your agent can use `list_marketing_queries` and `query_marketing_source` for `posts`, `comments`. Discover the exact parameters and required setup with:

```sh
sprid marketing-review capabilities --app <slug> --source instagram --json
```

Queries Sprid’s stored publishes, metric snapshots and inbox for the linked content account. No live platform sync or paid API read. Missing metrics are unmeasured; this does not expose the platform’s entire API. See [connected queries](https://sprid.studio/docs/queries) for the shared workflow. Extra operations may need additional read permissions; a stored key alone is not live verification.
