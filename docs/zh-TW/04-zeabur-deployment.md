# 04. 部署到 Zeabur，先取得 HTTPS 網域

**本章重點：先部署網站拿到公開 HTTPS 網域，再回 Paddle 做網站驗證。順序不要反。**

```text
本機 mock 流程跑通 -> GitHub -> Zeabur -> HTTPS 網域 -> Paddle website approval -> Paddle checkout
```

![先有 Zeabur 網域，再申請 Paddle](../../assets/diagrams/07-domain-before-paddle.svg)

## 為什麼先部署

Paddle 會要求你提供 pricing、terms、privacy、refund 等可開啟的網址。沒有正式網域時，你會卡在 checkout not enabled、default payment link、website approval 這些設定。

## 部署前檢查

在本機先跑：

```bash
npm install
npm run build
```

如果 build 失敗，把完整錯誤交給 Codex 修。雲端部署時也會跑 build，本機失敗通常代表 Zeabur 也會失敗。

## 重要：Node 必須監聽 PORT 與 0.0.0.0

線上服務應該類似：

```js
const port = Number(process.env.PORT ?? 8080);
const serverHost = process.env.PAYMENT_SERVER_HOST ?? "0.0.0.0";
server.listen(port, serverHost, () => {
  console.log(`payment server: http://${serverHost}:${port}/api`);
});
```

`0.0.0.0` 在正式環境是正確的。它代表服務在容器內對外開放，而不是只聽自己。

## Zeabur 設定

![Zeabur deploy flow](../../assets/diagrams/01-zeabur-deploy.svg)

1. 建立 Project。
2. 選 GitHub repository。
3. Region 優先選 Singapore 或 Hong Kong。
4. Build Command：`npm run build`。
5. Start Command：`npm run start`。

## Variables

![Zeabur variables](../../assets/diagrams/02-zeabur-variables.svg)

先放部署必需的公開設定：

```bash
PAYMENT_SERVER_HOST=0.0.0.0
PAYMENT_STORE_FILE=/data/payment-store.json
PUBLIC_BASE_URL=https://你的-zeabur-網域
CORS_ORIGIN=https://你的-zeabur-網域
PADDLE_ENVIRONMENT=sandbox
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

Paddle API key 和 price id 可以等 Paddle 設好後再回來補。

## Volume

![Zeabur volume](../../assets/diagrams/03-zeabur-volume.svg)

請掛載：

```text
Mount path: /data
```

這樣付款 session、解鎖 token 才不會在服務重啟後消失。

## 驗收

部署後打開：

- `https://你的網域/`
- `https://你的網域/api/health`
- `https://你的網域/monetization.json`

`/api/health` 應該顯示服務狀態與 Paddle 設定是否齊全，但不應該顯示 secret。
