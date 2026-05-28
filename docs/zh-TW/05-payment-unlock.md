# 05. 串接 Paddle 收費

Paddle 負責收款與付款頁，你的後端負責建立 transaction、接 webhook、確認付款後解鎖。

## 先完成網站驗證

![Paddle domain approval](../../assets/screenshots/04-paddle-domain.svg)

需要準備網域、價格頁、服務條款、隱私權政策與退款政策。

## 建立產品與價格

![Paddle product and price](../../assets/screenshots/05-paddle-product-price.svg)

- Product type：Digital product。
- Billing：One-time。
- CNY 9.90 與 USD 1.99 各建立一個 price。

## Webhook

![Paddle webhook](../../assets/screenshots/06-paddle-webhook.svg)

```text
https://你的-zeabur-網域/api/webhooks/paddle
```

只在 `transaction.completed` 後解鎖。失敗、取消、簽名錯誤都不能解鎖。
