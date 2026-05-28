# 02. Build the Site with Codex

**Goal: use Codex as an engineering partner, not as a one-shot website generator.** Split the work into small passes that can be tested.

## First prompt

```text
I want to build a paid quiz website.

Users will:
1. open the landing page
2. complete a quiz
3. see a free intro report
4. click a payment button
5. automatically unlock the full report after payment succeeds

Please create a minimum viable version.
Requirements:
- React + Vite frontend
- Node.js backend
- mock payment first, no real Paddle yet
- no login required
- never put secrets in frontend code
- tell me how to run and verify each step locally
```

If you already have a project, add:

```text
Please inspect the existing project structure first. Do not rebuild the project from scratch. Reuse existing patterns where possible.
```

## Suggested structure

```text
paid-quiz-site/
  src/app/
  src/components/
  src/data/
  src/monetization/
  src/styles/
  server/payment-server.mjs
  public/monetization.json
  package.json
  .env.payment.example
```

The important rule is separation: UI in frontend files, payment verification in backend files, public config in `public/`, secrets in environment variables.

## Pass 1: quiz flow only

Ask Codex to implement only the basic path: landing page, one-question-at-a-time quiz, reportId generation, free report screen, and unlock button. Run it locally with `npm install` and `npm run dev`, then complete the quiz yourself.

## Pass 2: backend state and mock payment

```text
Add a Node backend with mock payment.

API:
- POST /api/payments/checkout creates a payment session for a reportId
- GET /api/payments/sessions/:id returns pending / paid / failed
- POST /api/payments/mock-paid marks a session paid for local testing

Requirements:
- payment status is stored on the backend
- frontend cannot decide paid status by itself
- paywall is disabled by default and can be enabled by config later
```

## Pass 3: safety before real payment

Ask Codex to verify that `.env.payment.local` is ignored, Paddle keys only exist on the server, `public/monetization.json` has no secret, and fake URL parameters cannot unlock the report.

## Working rhythm

Use this loop for every feature: ask for a file plan, implement, run typecheck/build, test in the browser, then paste the exact error or describe the visible state back to Codex. This is slower than a single prompt, but far more reliable for a paid product.
