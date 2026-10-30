# Cloudflare (optional)

**What Sprid does with this:** Read traffic reports for your website.

## You need

Access to your domain’s Cloudflare account and permission to create a token. Enable **Web Analytics** for visitor reports; basic request counts include bots.

## Click path (dash.cloudflare.com)

1. Open [Cloudflare](https://dash.cloudflare.com) → profile icon → **My Profile → API Tokens**.
2. **Create Token → Custom token → Get started**, named `Sprid`.
3. **Permissions**:
   - **Zone → Analytics → Read**
   - **Account → Account Analytics → Read**
4. **Zone Resources → Include → Specific zone**: your domain.
5. **Account Resources → Include**: your account.
6. Leave **Client IP Address Filtering** and **TTL** empty. **Continue to summary → Create Token**.
7. Copy the token and leave it on your clipboard. It is shown once.

For a connection that survives you leaving the team, create an account-owned token instead under **Manage Account → Account API Tokens**, with the same permissions.

## Find your Account ID

Your domain → **Overview** → **API** card: copy **Account ID**. Visitor reports need it and your website’s address saved in Sprid. Copy **Zone ID** too if you also want the domain’s request counts.

## Then run

```
sprid connect cloudflare --app <slug> --key-from-clipboard --account-id 0123456789abcdef0123456789abcdef
```

Use your own app slug and Account ID. Add `--zone <Zone ID>` for request counts. Keep the token out of chat.

Cloudflare answers your website traffic only when no other analytics provider is connected; see [Only one provider answers](https://sprid.studio/docs/connect/google-analytics#only-one-provider-answers).

Typing the command yourself? Copy the token last, as [Keys from your clipboard](https://sprid.studio/docs/connect/posthog#keys-from-your-clipboard) explains, with the fallback for a shell without a clipboard.

## How to check it worked

Run `sprid status`, then ask your agent: “Check that Sprid can read recent Cloudflare traffic for this domain.” The check names the domain and says whether visitor reports or only request counts are available.

## If it fails

- **Access denied:** **API Tokens → ⋯ → Edit**. Check both Read permissions and the selected domain and account.
- **Domain not found:** use the Zone ID, not the domain name.
- **Visitor reports are empty:** enable **Analytics & Logs → Web Analytics** and check the tracking snippet is on your site.

## Investigate with this connection

Reads `rum` and `http`. RUM is pinned to the saved account and hostname; beacon traffic is sampled and not verified human.

```sh
sprid marketing-review capabilities --app <slug> --source cloudflare --json
```

See [connected queries](https://sprid.studio/docs/queries).

## Sources

- [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)
- [GraphQL Analytics API token permissions](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/)
- [Find zone and account ids](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/)
- [Verify a token](https://developers.cloudflare.com/api/resources/user/subresources/tokens/methods/verify/)
