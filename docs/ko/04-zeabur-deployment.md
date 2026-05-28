# 04. Zeabur에 배포하기

![Domain before Paddle](../../assets/screenshots/07-domain-before-paddle.svg)

![Zeabur deploy flow](../../assets/screenshots/01-zeabur-deploy.svg)

![Zeabur variables](../../assets/screenshots/02-zeabur-variables.svg)

![Zeabur volume](../../assets/screenshots/03-zeabur-volume.svg)


Paddle 설정 전에 Zeabur에 먼저 배포합니다. Paddle은 HTTPS 도메인을 요구합니다.

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

`/data` volume을 추가하세요.
