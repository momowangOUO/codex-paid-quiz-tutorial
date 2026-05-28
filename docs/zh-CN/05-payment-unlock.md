# 05. 串接 Paddle 收费

Paddle 是 Merchant of Record。它可以帮你处理信用卡、PayPal、部分地区的钱包支付、税务和收款。对这个教程来说，Paddle 的角色是：收钱、通知你的后端、让你的后端自动解锁报告。

## 为什么要先有 Zeabur 域名

Paddle 需要验证你的网站。你通常要提供：

- 网站域名。
- Pricing page。
- Terms of service。
- Privacy policy。
- Refund policy。

![Paddle domain approval](../../assets/screenshots/04-paddle-domain.svg)

## 建立产品和价格

![Paddle product and price](../../assets/screenshots/05-paddle-product-price.svg)

建议先做一个 one-time product：

- Product name: AI Career Action Report。
- Product type: Digital product。
- Price 1: CNY 9.90。
- Price 2: USD 1.99。
- Billing: one-time，不要选 subscription。

创建后保存两个 price id：

```bash
PADDLE_CNY_PRICE_ID=pri_xxx
PADDLE_USD_PRICE_ID=pri_xxx
```

## 建立 API key

API key 只放到 Zeabur Variables，不要写进前端文件。

```bash
PADDLE_API_KEY=pdl_sdbx_xxx
```

不要写成：

```bash
PADDLE_API_KEY=Bearer pdl_sdbx_xxx
```

Bearer 是请求 header 里的格式，不是环境变量的值。

## 设置 webhook

![Paddle webhook](../../assets/screenshots/06-paddle-webhook.svg)

Webhook URL：

```text
https://你的-zeabur-域名/api/webhooks/paddle
```

至少启用这些事件：

- `transaction.completed`
- `transaction.payment_failed`
- `transaction.canceled`
- `transaction.past_due`

把 webhook secret 放到 Zeabur：

```bash
PADDLE_WEBHOOK_SECRET=你的_webhook_secret
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

## 自动解锁逻辑

1. 用户点击付款。
2. 后端创建 payment session。
3. 后端调用 Paddle create transaction。
4. Paddle 返回 checkout URL。
5. 用户完成付款。
6. Paddle 发 webhook 到你的后端。
7. 后端验证签名、event type、price id、reportId、sessionId。
8. 确认 `transaction.completed` 后写入 access token。
9. 前端查询 session，看到 paid 后显示完整报告。

不要让前端自己决定是否付款成功。
