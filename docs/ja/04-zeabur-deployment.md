# 04. 先に Zeabur へデプロイする

**目的：Paddle を設定する前に、公開 HTTPS ドメインを取得します。順番が重要です。**

```text
ローカル mock -> GitHub -> Zeabur -> HTTPS ドメイン -> Paddle 審査 -> Paddle checkout
```

![Domain before Paddle](../../assets/diagrams/07-domain-before-paddle.svg)

## なぜ先に Zeabur なのか

Paddle は pricing、terms、privacy、refund、default payment link、承認済みドメインを求めます。公開ドメインがないと、コードが正しくても checkout not enabled で止まることがあります。

## 事前確認

```bash
npm install
npm run build
```

ローカル build が失敗するなら、Zeabur でもほぼ失敗します。ログを Codex に渡して直します。

## PORT と 0.0.0.0

Node サーバーは次のようにします。

```js
const port = Number(process.env.PORT ?? 8080);
const serverHost = process.env.PAYMENT_SERVER_HOST ?? "0.0.0.0";
server.listen(port, serverHost, () => {
  console.log(`payment server: http://${serverHost}:${port}/api`);
});
```

本番コンテナでは `0.0.0.0` が正しい設定です。外部からコンテナ内のサービスに届くようにします。

## Zeabur 設定

![Zeabur deploy flow](../../assets/diagrams/01-zeabur-deploy.svg)

- GitHub repository を選ぶ。
- Region は Singapore または Hong Kong を優先。
- Build Command: `npm run build`。
- Start Command: `npm run start`。

## Variables と Volume

![Zeabur variables](../../assets/diagrams/02-zeabur-variables.svg)

```bash
PAYMENT_SERVER_HOST=0.0.0.0
PAYMENT_STORE_FILE=/data/payment-store.json
PUBLIC_BASE_URL=https://your-zeabur-domain
CORS_ORIGIN=https://your-zeabur-domain
PADDLE_ENVIRONMENT=sandbox
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

![Zeabur volume](../../assets/diagrams/03-zeabur-volume.svg)

`/data` に volume を mount し、payment session と access token が再起動で消えないようにします。
