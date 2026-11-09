---
name: connect
description: Guide a user through connecting a service to Sprid using secure setup forms and verify the selected property or account.
---

# Connect

Read [connection and approvals](../../references/runtime.md) first.

Read `get_documentation` without a topic for the service index, then fetch the chosen service's topic. Start from the task needing access; reuse a working authorized connection before suggesting setup.

Check the app, workspace and exact provider property or social destination. An app owns product data, a content account owns voice and media, and a channel is one social destination. Never choose a handle because it appears first.

Give the next concrete setup action from the returned guide and secure browser link. The person completes sign-in, consent and credential entry in the provider or Sprid form. Do not ask for secrets in chat or inspect local credentials.

After setup, perform the supported connection check and an actual read for the selected property. A saved connection alone does not verify access. State the exact missing permission when a read fails. Resume the original task once its required connection works.
