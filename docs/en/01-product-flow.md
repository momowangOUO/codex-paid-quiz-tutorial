# 01. Design the Product Flow

**Goal: define the user journey before asking Codex to write code.** A paid quiz site is much easier to build when every screen has one job.

The shortest useful path is:

```text
Landing page -> quiz -> free intro report -> payment -> full report -> save or revisit report
```

Do not begin with accounts, subscriptions, coupon systems, or dashboards. First prove that one person can answer the quiz, pay once, and unlock the right report.

## Screen responsibilities

| Screen | What the user sees | Main job | Backend needed? |
| --- | --- | --- | --- |
| Landing page | Value proposition and start button | Start the quiz | Usually no |
| Quiz | Question, options, progress | Collect answers | Usually no |
| Free intro report | Partial professional analysis | Build trust | Needs a reportId |
| Paywall | Price, payment button, waiting state | Create payment session | Yes |
| Full report | Radar, profile, career directions, routes | Deliver paid value | Yes, via access token |

## What the free report should contain

The free report should not feel like a trick. It should provide real but partial value: core motivation, behavioral tendency, self-perception gap, and what the full report will analyze next. It should not reveal the full career answer, full action plan, downloadable report, or every matching rule.

## Three objects to define early

### reportId

`reportId` identifies one quiz result. Answers, payments, unlocks, and revisits should all point to the same report.

### payment session

A `payment_session` records one payment attempt. A user may close checkout, retry, or pay successfully while the frontend never returns. This state belongs on the backend.

```json
{
  "sessionId": "pay_xxx",
  "reportId": "rep_xxx",
  "provider": "paddle",
  "status": "pending"
}
```

### access token

An `accessToken` is the key to the paid report. Do not unlock a report merely because a reportId was paid once; otherwise another user who finds the reportId may see the paid content.

## Prompt for Codex

```text
I want to build a one-time paid quiz report website.

User path: landing page -> quiz -> free intro report -> payment -> full report.

First version: no login, no subscription, no coupons.

Please design:
1. frontend page states
2. reportId generation and storage
3. payment session model
4. access token unlock logic
5. mock payment flow for local testing

Output the file plan first, then implement the minimum version.
```

## Completion standard

You should be able to explain which screens exist, which step needs the backend, why URL parameters cannot unlock paid content, and what `reportId`, `payment_session`, and `accessToken` each do.
