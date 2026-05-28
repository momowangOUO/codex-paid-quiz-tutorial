# 05. 接 Paddle 收費與自動解鎖

![Paddle payment unlock chapter art](../../assets/chapters/chapter-05-paddle.webp)
**本章重點：Paddle 負責收款，你的後端負責建立交易、驗證 webhook、發放報告權限。**

這一章假設你已經有 Zeabur HTTPS 網域，例如：

```text
https://your-project.zeabur.app
```

## Paddle 在流程裡做什麼

```text
使用者點擊解鎖
  -> 後端建立 payment session
  -> 後端向 Paddle 建立 transaction checkout
  -> 使用者在 Paddle 付款
  -> Paddle webhook 通知後端
  -> 後端驗證簽章與 custom_data
  -> 後端發放 access token
  -> 前端自動顯示完整報告
```

不要讓前端自己判斷付款成功。真正可信的是 Paddle webhook。

## Onboarding 產品說明

Paddle 要你描述商品時，可以寫：

```text
We sell a one-time digital career assessment report. Users complete a quiz and receive a personalized online report. The product is digital content access, not employment placement, financial advice, medical advice, or guaranteed career outcome.
```

如果看到 `Checkout has not yet been enabled for this account`，優先檢查 onboarding、website approval、default payment link、product、price、審核狀態。

## Website approval

![Paddle domain](../../assets/diagrams/04-paddle-domain.svg)

建議填：

```text
Pricing page: https://你的網域/pricing
Terms: https://你的網域/terms
Privacy: https://你的網域/privacy
Refund: https://你的網域/refund
```

這些頁面要能直接打開，不要只填首頁。

## Default payment link

填你的已驗證網域，例如：

```text
https://你的-zeabur-網域/
```

它不是 webhook URL，也不是某一份報告的網址，而是 Paddle 建立付款頁時使用的預設網域。

## Product 與 Price

![Paddle product price](../../assets/diagrams/05-paddle-product-price.svg)

建立一個一次性數位產品：

| 欄位 | 建議 |
| --- | --- |
| Product name | AI Career Action Report，或你的報告名稱 |
| Description | One-time access to a personalized digital career assessment report. |
| Product type | Digital product |
| Price type | One-time |

再建立兩個 price：

- `PADDLE_CNY_PRICE_ID`：CNY 9.90。
- `PADDLE_USD_PRICE_ID`：USD 1.99。

## Webhook

![Paddle webhook](../../assets/diagrams/06-paddle-webhook.svg)

通知網址：

```text
https://你的網域/api/webhooks/paddle
```

至少訂閱：

- `transaction.completed`
- `transaction.payment_failed`
- `transaction.canceled`

後端只應該在 `transaction.completed` 且 `custom_data.payment_session_id`、`report_id` 都匹配時解鎖。

## Zeabur Variables 補齊

```bash
PADDLE_ENVIRONMENT=sandbox
PADDLE_API_KEY=你的_sandbox_api_key
PADDLE_CNY_PRICE_ID=pri_xxx
PADDLE_USD_PRICE_ID=pri_xxx
PADDLE_WEBHOOK_SECRET=你的_webhook_secret
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

## 驗收方式

1. 先用 0 元或 mock 解鎖測頁面流程。
2. 再用 Paddle sandbox 測 checkout。
3. 在 Paddle 後台確認 webhook 回 200。
4. 回到報告頁，確認不用手動刷新也能顯示完整報告。
5. 確認偽造網址參數不能解鎖。
