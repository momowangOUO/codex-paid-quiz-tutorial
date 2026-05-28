# 04. Deploy to Zeabur

![Domain before Paddle](../../assets/screenshots/07-domain-before-paddle.svg)

![Zeabur deploy flow](../../assets/screenshots/01-zeabur-deploy.svg)

![Zeabur variables](../../assets/screenshots/02-zeabur-variables.svg)

![Zeabur volume](../../assets/screenshots/03-zeabur-volume.svg)


Deploy first, then configure Paddle. Paddle needs a real HTTPS domain for website approval and checkout settings.

## Zeabur settings

```text
Build Command: npm run build
Start Command: npm run start
```

## Variables

```bash
PAYMENT_SERVER_HOST=0.0.0.0
PAYMENT_STORE_FILE=/data/payment-store.json
PUBLIC_BASE_URL=https://your-zeabur-domain
CORS_ORIGIN=https://your-zeabur-domain
PADDLE_ENVIRONMENT=sandbox
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

Mount a volume at `/data` so sessions survive restarts.
