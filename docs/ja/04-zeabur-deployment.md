# 04. Zeabur にデプロイする

![Domain before Paddle](../../assets/screenshots/07-domain-before-paddle.svg)

![Zeabur deploy flow](../../assets/screenshots/01-zeabur-deploy.svg)

![Zeabur variables](../../assets/screenshots/02-zeabur-variables.svg)

![Zeabur volume](../../assets/screenshots/03-zeabur-volume.svg)


Paddle より先に Zeabur へデプロイします。Paddle には HTTPS ドメインが必要です。

```text
Build Command: npm run build
Start Command: npm run start
```

```bash
PAYMENT_SERVER_HOST=0.0.0.0
PAYMENT_STORE_FILE=/data/payment-store.json
PUBLIC_BASE_URL=https://your-zeabur-domain
CORS_ORIGIN=https://your-zeabur-domain
PADDLE_ENVIRONMENT=sandbox
```

`/data` に volume を追加します。
