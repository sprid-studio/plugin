---
name: measurement
description: Audit tracking and conversion evidence, prepare a tracking plan and verify event delivery through connected providers or supplied evidence.
---

# Measurement

Read [connection and approvals](../../references/runtime.md) first.

Read `get_documentation` for `tracking`, `queries` and `metrics`. Start with the decision the business needs to make and the actual customer path. Reuse its provider and existing event names.

Inspect authorized source files or supplied exports when available, then compare with real provider events. Installed SDKs, configured keys and successful uploads prove configuration only. Classify events as observed, broken, proposed or unverified.

For each required event, specify its meaning, successful trigger, identity, properties, consent rule, emitter and duplicate handling. Keep private text out of payloads. Record project, environment, build and evidence date.

Implementation needs the user's authorization and an appropriate coding environment. If that is unavailable here, deliver an exact implementation brief. Do not claim a plan changed the application.

Verify one action produces the intended event once, with identity and properties intact, in the intended destination. Check retry, sign-in and consent behavior. For ad conversions distinguish ingestion from attribution eligibility. Caller-recorded evidence never authorizes spending. State any test that remains unperformed.
