# Google Search Console

**What Sprid does with this:** See which Google searches bring people to your website.

## You need

**Owner** access to your website’s Search Console property. You can reuse the Google service account created for Sprid’s Play connection.

## Click path

### A. Google Cloud

1. Open [Google Cloud](https://console.cloud.google.com) and select the project for your service account.
2. Under **APIs & Services → Library**, find **Google Search Console API** and click **Enable**.
3. If you need a service account, open **IAM & Admin → Service Accounts → Create service account**, name it `sprid-gsc`, then click **Done**.
4. Open the account → **Keys → Add key → Create new key → JSON**. Save the file as `gsc-sa.json` and copy the account’s email. If reusing an account, use its existing key file and email.

### B. Search Console

5. Open [Search Console](https://search.google.com/search-console) and select your website in the top-left dropdown.
6. Open **Settings → Users and permissions → Add user**.
7. Enter the service account’s email, choose **Restricted**, then click **Add**.

## Domain property vs URL prefix, and the property string

Use the property you just granted access to:

| Property shown in Search Console | Value to use below |
|---|---|
| Domain, such as `example.com` | `sc-domain:example.com` |
| URL prefix, such as `https://www.example.com/` | The exact URL, including its final slash |

A domain property covers all versions of your domain. Check **Settings → Property settings** if unsure which kind you have.

## Then run

```
sprid connect gsc --key ~/Downloads/gsc-sa.json --property sc-domain:example.com
```

Replace the file path and property with yours. Keep the downloaded file private.

## How to check it worked

Run `sprid status`, then ask your agent: “Read recent Google search results for this website through Sprid and check that the property is correct.”

A saved key confirms setup; the live read confirms access. The newest dates may be missing because Google’s reports arrive late.

## If it fails

- **Access denied:** check the service account’s email was added to the exact property in your command. If both match, try **Full** permission. Do not grant Owner.
- **Property not found:** check the domain or URL, including `www`, `https` and the final slash.
- **Recent dates are empty:** try an earlier period; the latest few days may still be processing.

## Sources

- [Permission levels and Add user path](https://support.google.com/webmasters/answer/7687615)
- [`siteUrl` formats](https://developers.google.com/webmaster-tools/v1/searchanalytics/query)
- [Service account rights vs Owner](https://www.indexernow.com/fix/service-account-owner-gsc)

## Investigate with this connection

Your agent can use `list_marketing_queries` and `query_marketing_source` for `search`. Discover the exact parameters and required setup with:

```sh
sprid marketing-review capabilities --app <slug> --source gsc --json
```

Pinned Search Console property. Dates use Pacific time; anonymized queries and top-row limits affect coverage. See [connected queries](https://sprid.studio/docs/queries) for the shared workflow. Extra operations may need additional read permissions; a stored key alone is not live verification.
