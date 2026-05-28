# 05. Connect Paddle and Unlock Reports

![Paddle payment unlock chapter art](../../assets/chapters/chapter-05-paddle.webp)
**Goal: Paddle collects money; your backend verifies the payment and unlocks the correct report.**

This chapter assumes you already have a Zeabur HTTPS domain.

## The payment flow

```text
user clicks unlock
  -> backend creates payment session
  -> backend creates Paddle transaction checkout
  -> user pays on Paddle
  -> Paddle sends webhook to backend
  -> backend verifies signature and custom_data
  -> backend issues access token
  -> frontend shows full report
```

The frontend should never decide that a payment succeeded. Trust the webhook.

## Product description for onboarding

You can describe the product conservatively:

```text
We sell a one-time digital career assessment report. Users complete a quiz and receive a personalized online report. The product is digital content access, not employment placement, financial advice, medical advice, or guaranteed career outcome.
```

If Paddle says checkout is not enabled, check onboarding, website approval, default payment link, product, price, and review status before debugging code.

## Website approval

![Paddle domain](../../assets/diagrams/04-paddle-domain.svg)

Use real URLs:

```text
Pricing page: https://your-domain/pricing
Terms: https://your-domain/terms
Privacy: https://your-domain/privacy
Refund: https://your-domain/refund
```

## Default payment link

Use the verified domain root:

```text
https://your-zeabur-domain/
```

This is not a customer-facing product link and not a webhook URL. It is the account-level domain Paddle uses for checkout.

## Product and prices

![Paddle product price](../../assets/diagrams/05-paddle-product-price.svg)

Create one one-time digital product, then two one-time prices:

- `PADDLE_CNY_PRICE_ID`: CNY 9.90.
- `PADDLE_USD_PRICE_ID`: USD 1.99.

Do not choose subscription unless the product truly charges monthly.

## Webhook

![Paddle webhook](../../assets/diagrams/06-paddle-webhook.svg)

Webhook URL:

```text
https://your-domain/api/webhooks/paddle
```

Subscribe to at least `transaction.completed`, `transaction.payment_failed`, and `transaction.canceled`. Unlock only on `transaction.completed` when `custom_data.payment_session_id` and `report_id` match your backend records.

## Zeabur variables

```bash
PADDLE_ENVIRONMENT=sandbox
PADDLE_API_KEY=your_sandbox_api_key
PADDLE_CNY_PRICE_ID=pri_xxx
PADDLE_USD_PRICE_ID=pri_xxx
PADDLE_WEBHOOK_SECRET=your_webhook_secret
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

## Test sequence

First test mock or free unlock, then Paddle sandbox checkout, then confirm webhook returns 200, then confirm the report unlocks automatically after payment. Finally verify that fake URL parameters still cannot unlock.
