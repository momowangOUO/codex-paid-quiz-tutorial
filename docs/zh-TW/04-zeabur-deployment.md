# 04. 部署到 Zeabur

要先部署到 Zeabur，取得 HTTPS 網域，再去 Paddle 做網站驗證與付款設定。

![先拿到 Zeabur 網域，再設定 Paddle](../../assets/screenshots/07-domain-before-paddle.svg)

## 建立服務

![Zeabur deploy flow](../../assets/screenshots/01-zeabur-deploy.svg)

- 從 GitHub 選擇 repo。
- Region 優先選 Singapore 或 Hong Kong。
- Build Command：

```text
npm run build
```

- Start Command：

```text
npm run start
```

## Variables

![Zeabur variables](../../assets/screenshots/02-zeabur-variables.svg)

```bash
PAYMENT_SERVER_HOST=0.0.0.0
PAYMENT_STORE_FILE=/data/payment-store.json
PUBLIC_BASE_URL=https://你的-zeabur-網域
CORS_ORIGIN=https://你的-zeabur-網域
PADDLE_ENVIRONMENT=sandbox
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

正式環境使用 `0.0.0.0` 是正確的，這樣 Zeabur 的代理才能連到你的 Node 服務。

## Volume

![Zeabur volume](../../assets/screenshots/03-zeabur-volume.svg)

建立 volume，掛載到：

```text
/data
```
