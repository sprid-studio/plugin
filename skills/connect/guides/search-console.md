# Google Search Console

**What Sprid does with this:** See which Google searches bring people to your website.

## You need

**Owner** access to your website’s Search Console property. You can reuse the service account from Sprid’s Play connection.

## Click path

### A. Google Cloud

1. Open [Google Cloud](https://console.cloud.google.com) and select your service account’s project.
2. **APIs & Services → Library**: enable **Google Search Console API**.
3. No service account yet? **IAM & Admin → Service Accounts → Create service account**, name it `sprid-gsc`, then **Done**.
4. Open the account → **Keys → Add key → Create new key → JSON**. Save it as `gsc-sa.json` and copy the account’s email. Reusing an account? Use its existing key file and email.

### B. Search Console

5. Open [Search Console](https://search.google.com/search-console) and select your website in the top-left dropdown.
6. **Settings → Users and permissions → Add user**.
7. Enter the service account’s email, choose **Restricted**, then **Add**.

## Domain property vs URL prefix, and the property string

| Property shown in Search Console | Value to use |
|---|---|
| Domain, such as `example.com` | `sc-domain:example.com` |
| URL prefix, such as `https://www.example.com/` | The exact URL, including its final slash |

A domain property covers every version of your domain. **Settings → Property settings** shows which kind you have.

## Then run

```
sprid connect gsc --key ~/Downloads/gsc-sa.json --property sc-domain:example.com
```

Use your own file path and property. Keep the file private.

## How to check it worked

Run `sprid status`, then ask your agent: “Read recent Google search results for this website through Sprid and check that the property is correct.” A saved key confirms setup; only the live read confirms access. The newest few days may be missing because Google reports late.

## If it fails

- **Access denied:** check the service account’s email was added to the exact property in your command. If both match, try **Full** permission. Do not grant Owner.
- **Property not found:** check the domain or URL, including `www`, `https` and the final slash.
- **Recent dates are empty:** try an earlier period; the latest days may still be processing.

## Investigate with this connection

Reads `search` for the pinned property. Dates are Pacific time; anonymized queries and top-row limits reduce coverage.

```sh
sprid marketing-review capabilities --app <slug> --source gsc --json
```

See [connected queries](https://sprid.studio/docs/queries).

## Sources

- [Permission levels and Add user path](https://support.google.com/webmasters/answer/7687615)
- [`siteUrl` formats](https://developers.google.com/webmaster-tools/v1/searchanalytics/query)
- [Service account rights vs Owner](https://www.indexernow.com/fix/service-account-owner-gsc)
