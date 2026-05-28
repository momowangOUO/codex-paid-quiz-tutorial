# 05. Paddle 決済を接続する

![Paddle domain approval](../../assets/screenshots/04-paddle-domain.svg)

![Paddle product and price](../../assets/screenshots/05-paddle-product-price.svg)

![Paddle webhook](../../assets/screenshots/06-paddle-webhook.svg)


Paddle は決済ページと支払い処理を担当し、あなたのバックエンドは webhook を検証してレポートをアンロックします。

- one-time product を作る。
- CNY と USD の price を作る。
- API key と webhook secret を Zeabur Variables に入れる。
- webhook URL は `https://your-domain/api/webhooks/paddle`。
- `transaction.completed` のみアンロックする。
