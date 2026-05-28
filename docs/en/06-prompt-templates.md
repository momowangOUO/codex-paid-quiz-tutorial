# 06. Prompt Templates

![Prompt templates chapter art](../../assets/chapters/chapter-06-prompts.webp)
**Goal: copy small, testable prompts instead of asking Codex to build everything at once.**

## Minimum product

```text
Build a minimum paid quiz website.

Requirements:
- React + Vite frontend
- Node backend
- landing page, quiz page, free intro report, paywall, full report
- mock payment first
- no login
- backend is the only authority for paid status

Please output a file plan first, implement it, then run typecheck and build.
```

## Add Paddle

```text
Add a Paddle provider beside the mock provider.

Requirements:
- POST /api/payments/checkout chooses CNY or USD price by region
- create Paddle transaction with custom_data: payment_session_id and report_id
- POST /api/webhooks/paddle verifies Paddle-Signature
- only transaction.completed unlocks
- duplicate webhooks are idempotent
- bad signature, wrong reportId, or wrong amount never unlocks
```

## Fix Zeabur deployment

```text
Zeabur deployment failed. Here is the full log:
[paste log]

Please determine whether this is a build script, start script, PORT, environment variable, missing file, or memory issue. Fix the code and tell me what to configure in Zeabur.
```

## Audit secrets

```text
Inspect this project for possible secret leaks: Paddle API key, webhook secret, .env.payment.local, order data, or user private data. List risky files and .gitignore recommendations. Do not delete files unless I ask.
```

## Improve conversion without hype

```text
Make the locked report feel like a professional intro report, not a hard-sell page. It may show core motivation, behavioral tendency, self-perception gap, and full-report focus areas. It must not reveal the full career answer, route, salary, or saved report.
```
