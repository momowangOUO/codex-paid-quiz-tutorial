# 01. Product and flow design

Design the paid flow before you wire payments. Keep the first version small: a free quiz, a credible preview, and a paid full report.

## Flow

1. Landing page explains the value.
2. User completes the quiz.
3. Backend creates a reportId.
4. Preview builds trust without exposing the full answer.
5. Paddle Checkout handles payment.
6. Paddle webhook tells your backend to unlock the report.

## Codex prompt

```text
Design a paid quiz website flow with a free preview, a one-time payment, backend payment sessions, and automatic unlock after webhook confirmation. List pages, APIs, data models, and tests.
```
