# Cloudflare (optional)

**What Sprid does with this:** Read traffic reports for your website.

## You need

Access to your domain’s Cloudflare account and permission to create a token. Enable **Web Analytics** for visitor reports; basic request counts include bots.

## Click path (dash.cloudflare.com)

1. Open [Cloudflare](https://dash.cloudflare.com) → your profile icon → **My Profile → API Tokens**.
2. Click **Create Token → Custom token → Get started** and name it `Sprid`.
3. Add these **Permissions**:
   - **Zone → Analytics → Read**
   - **Account → Account Analytics → Read**
4. Set **Zone Resources → Include → Specific zone** to your domain.
5. Set **Account Resources → Include** to your account.
6. Leave **Client IP Address Filtering** and **TTL** empty. Click **Continue to summary → Create Token**.
7. Save the token to a private file, such as `~/keys/cloudflare-sprid.txt`. It is shown only once.

## Zone id

Open your domain → **Overview** and copy **Zone ID** and **Account ID** from the **API** card. Use the Zone ID below. Ask your agent to save the Account ID in your Sprid app profile.

## Then run

```
sprid connect cloudflare --token ~/keys/cloudflare-sprid.txt --zone 0123456789abcdef0123456789abcdef
```

Replace the file path and Zone ID with yours. Do not paste the token into chat.

## How to check it worked

Run `sprid status`, then ask your agent: “Check that Sprid can read recent Cloudflare traffic for this domain.”

The check should identify the domain and say whether visitor reports or only request counts are available.

## If it fails

- **Access denied:** open **API Tokens → ⋯ → Edit**. Check both Read permissions and the selected domain and account.
- **Domain not found:** use the copied Zone ID instead of the domain name.
- **Visitor reports are empty:** enable **Analytics & Logs → Web Analytics** and check that tracking is installed on your site.

## Token ownership and analytics permissions

For a connection that stays active when you leave the team, create an account-owned token under **Manage Account → Account API Tokens** with the same permissions.

## Sources

- [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)
- [GraphQL Analytics API token permissions](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/)
- [Find zone and account ids](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/)
- [Verify a token](https://developers.cloudflare.com/api/resources/user/subresources/tokens/methods/verify/)

## Investigate with this connection

Your agent can use `list_marketing_queries` and `query_marketing_source` for `rum`, `http`. Discover the exact parameters and required setup with:

```sh
sprid marketing-review capabilities --app <slug> --source cloudflare --json
```

RUM is pinned to the saved account and website hostname. Beacon traffic is sampled and is not verified human traffic. See [connected queries](https://sprid.studio/docs/queries) for the shared workflow. Extra operations may need additional read permissions; a stored key alone is not live verification.
