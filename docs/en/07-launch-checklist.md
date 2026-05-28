# 07. Launch Checklist

![Launch checklist chapter art](../../assets/chapters/chapter-07-launch.webp)
**Goal: verify product flow, payment, unlock security, mobile behavior, and secrets before going live.**

## Product flow

- [ ] Landing page starts the quiz clearly.
- [ ] User can finish all questions.
- [ ] Free intro report provides real value without revealing the full answer.
- [ ] Paywall shows the correct single recommended price.
- [ ] Paid report unlocks automatically after payment.
- [ ] Returning users can reopen the correct report with the correct token.

## Paddle

- [ ] Website approval passed.
- [ ] Default payment link is set.
- [ ] Product is a one-time digital product.
- [ ] Prices are one-time, not subscriptions.
- [ ] Webhook URL is `https://your-domain/api/webhooks/paddle`.
- [ ] `transaction.completed` unlocks.
- [ ] Failed, canceled, and duplicate webhooks do not unlock incorrectly.

## Zeabur

- [ ] `PAYMENT_SERVER_HOST=0.0.0.0`.
- [ ] `PAYMENT_STORE_FILE=/data/payment-store.json`.
- [ ] `/data` volume is mounted.
- [ ] `PUBLIC_BASE_URL` and `CORS_ORIGIN` match the production domain.
- [ ] `/api/health` works and reveals no secrets.

## Security

- [ ] No `.env.payment.local` on GitHub.
- [ ] No Paddle API key in `public/` or frontend bundle.
- [ ] No `node_modules`, `dist`, logs, payment store, or private user data committed.

## Final switch to live

After sandbox works, switch to live carefully: live API key, live price IDs, live webhook secret, live Paddle environment, and verified production domain.
