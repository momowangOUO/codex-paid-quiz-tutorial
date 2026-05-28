# Minimal API Contract

这是收费测验网站最小 API 设计。无论你用 Paddle、Stripe、Lemon Squeezy 还是其他平台，核心接口都可以保持类似。

## Create Checkout

```http
POST /api/payments/checkout
Content-Type: application/json
```

```json
{
  "reportId": "rep_123",
  "provider": "paddle",
  "priceKind": "international"
}
```

Response:

```json
{
  "sessionId": "ps_123",
  "status": "pending",
  "checkoutUrl": "https://checkout.example/..."
}
```

## Query Session

```http
GET /api/payments/sessions/ps_123
```

Response:

```json
{
  "sessionId": "ps_123",
  "reportId": "rep_123",
  "status": "paid",
  "accessToken": "rat_random_unpredictable_token"
}
```

## Payment Webhook

```http
POST /api/webhooks/paddle
Paddle-Signature: ...
```

Webhook rules:

- Read raw body for signature verification.
- Reject invalid signatures.
- Ignore duplicate event IDs.
- Only unlock on the payment platform's final success event.
- Confirm `paymentSessionId`, `reportId`, price ID, amount and currency.

## Report Access

```http
GET /api/reports/rep_123/access?token=rat_random_unpredictable_token
```

Response:

```json
{
  "reportId": "rep_123",
  "unlocked": true
}
```

Never use `paid=true` in a URL as proof of payment.

