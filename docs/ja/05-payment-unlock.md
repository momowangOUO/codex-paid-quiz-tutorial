# 05. Paddle 決済と自動解放

**目的：Paddle が支払いを処理し、自分のバックエンドが webhook を検証してレポートを解放します。**

## 流れ

```text
解放ボタン -> payment session -> Paddle transaction checkout -> 支払い -> webhook -> 検証 -> access token -> 完全版表示
```

フロントエンドだけで支払い成功を判断してはいけません。信用するのは webhook です。

## 商品説明

```text
We sell a one-time digital career assessment report. Users complete a quiz and receive a personalized online report. The product is digital content access, not employment placement, financial advice, medical advice, or guaranteed career outcome.
```

`Checkout has not yet been enabled` が出た場合は、onboarding、website approval、default payment link、product、price、審査状態を確認します。

## Website approval

![Paddle domain](../../assets/diagrams/04-paddle-domain.svg)

```text
Pricing: https://your-domain/pricing
Terms: https://your-domain/terms
Privacy: https://your-domain/privacy
Refund: https://your-domain/refund
```

## Product と Price

![Paddle product price](../../assets/diagrams/05-paddle-product-price.svg)

一回払いのデジタル商品を作り、CNY 9.90 と USD 1.99 の one-time price を作ります。subscription は選びません。

## Webhook

![Paddle webhook](../../assets/diagrams/06-paddle-webhook.svg)

URL：

```text
https://your-domain/api/webhooks/paddle
```

`transaction.completed` だけで解放します。`custom_data.payment_session_id` と `report_id` が自分の記録と一致することも確認してください。

## Zeabur Variables

```bash
PADDLE_ENVIRONMENT=sandbox
PADDLE_API_KEY=your_sandbox_api_key
PADDLE_CNY_PRICE_ID=pri_xxx
PADDLE_USD_PRICE_ID=pri_xxx
PADDLE_WEBHOOK_SECRET=your_webhook_secret
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```
