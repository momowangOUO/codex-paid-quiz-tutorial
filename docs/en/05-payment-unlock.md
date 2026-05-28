# 05. Connect Paddle payments

![Paddle domain approval](../../assets/screenshots/04-paddle-domain.svg)

![Paddle product and price](../../assets/screenshots/05-paddle-product-price.svg)

![Paddle webhook](../../assets/screenshots/06-paddle-webhook.svg)


Paddle collects payment. Your backend creates transactions, receives webhooks, verifies them, and unlocks the report.

## Required setup

- Website domain approval.
- Pricing, terms, privacy, and refund pages.
- One-time product.
- CNY and USD prices.
- API key in Zeabur Variables.
- Webhook destination: `https://your-domain/api/webhooks/paddle`.

Only `transaction.completed` should unlock content.
