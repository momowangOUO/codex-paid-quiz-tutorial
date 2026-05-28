# 04. 有域名后，再接 Paddle 付款与自动解锁

这一章默认你已经完成上一章，并拿到了一个 HTTPS 域名，例如：

```text
https://your-project.zeabur.app
```

现在再进入 Paddle 会顺很多，因为你已经有地方可以填写：

- Default payment link。
- Website approval domain。
- Pricing page。
- Terms / Privacy / Refund。
- Webhook URL。

## Paddle 在这里负责什么

Paddle 会做三件事：

1. 显示付款页面。
2. 处理信用卡、PayPal、部分地区可用的本地支付方式。
3. 付款完成后，用 webhook 通知你的后端。

你的网站要做三件事：

1. 向 Paddle 创建 checkout。
2. 接收并验证 Paddle webhook。
3. 确认付款后，把对应 `reportId` 解锁。

## 第 1 步：注册并完成 Paddle onboarding

进入 Paddle 后台，按流程填写：

- 你是谁。
- 你卖什么。
- 产品是否属于数字产品。
- 预计销售额。
- 收款方式。
- 网站域名。

如果 Paddle 显示：

```text
Checkout has not yet been enabled for this account
```

通常不是你的代码错，而是 onboarding、网站验证或 default payment link 还没完成。

## 第 2 步：提交网站验证

把上一章拿到的 Zeabur 域名填进去：

```text
https://你的-zeabur-域名
```

Paddle 可能会要求这些 URL：

```text
https://你的域名/pricing
https://你的域名/terms
https://你的域名/privacy
https://你的域名/refund
```

这些页面可以先做成简单文字页，重点是清楚、可访问、没有假内容。

![Paddle 网站验证示意](assets/screenshots/04-paddle-domain.svg)

## 第 3 步：设置 default payment link

Default payment link 不是你的商品页，也不是你要手动发给用户的链接。它是 Paddle 创建 transaction checkout 时需要的账户级付款域名。

建议填：

```text
https://你的-zeabur-域名/
```

没有这个设置时，你的后端即使 API key 正确，也可能无法创建 checkout。

## 第 4 步：创建一次性产品与价格

对一次性报告，建议：

| 项目 | 建议 |
| --- | --- |
| Product name | AI Career Action Report 或你的报告名称 |
| Product type | Digital product |
| Price type | One-time |
| Domestic price | CNY 9.90 |
| International price | USD 1.99 |
| Subscription | 不要开启 |

复制两个 price id：

```bash
PADDLE_CNY_PRICE_ID=pri_xxx
PADDLE_USD_PRICE_ID=pri_xxx
```

![Paddle 产品与价格示意](assets/screenshots/05-paddle-product-price.svg)

## 第 5 步：创建 API key

在 Paddle Developer tools 里创建 API key。

放到 Zeabur Variables：

```bash
PADDLE_ENVIRONMENT=sandbox
PADDLE_API_KEY=你的_sandbox_api_key
PADDLE_CNY_PRICE_ID=pri_xxx
PADDLE_USD_PRICE_ID=pri_xxx
```

注意：

- sandbox key 只能配 sandbox price。
- live key 只能配 live price。
- 不要把 API key 写进前端或 `public/monetization.json`。

## 第 6 步：设置 webhook

Paddle Notification destination 填：

```text
https://你的-zeabur-域名/api/webhooks/paddle
```

至少选择：

```text
transaction.completed
transaction.payment_failed
transaction.canceled
transaction.past_due
```

然后复制 webhook secret：

```bash
PADDLE_WEBHOOK_SECRET=你的_webhook_secret
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

![Paddle Webhook 示意](assets/screenshots/06-paddle-webhook.svg)

## 第 7 步：让后端创建 Paddle checkout

用户点击解锁按钮时，前端呼叫：

```http
POST /api/payments/checkout
Content-Type: application/json

{
  "reportId": "rep_xxx",
  "region": "domestic"
}
```

后端做：

1. 创建本地 payment session。
2. 根据地区选择 CNY 或 USD price。
3. 调 Paddle create transaction API。
4. 把 `reportId` 和 `payment_session_id` 放进 `custom_data`。
5. 保存 Paddle transaction id。
6. 返回 Paddle checkout URL。

## 第 8 步：webhook 才能解锁

Paddle 通知你的后端：

```text
POST /api/webhooks/paddle
```

后端必须：

1. 用 raw body 验证 `Paddle-Signature`。
2. 只接受 `transaction.completed`。
3. 检查 `custom_data.payment_session_id`。
4. 检查 `custom_data.report_id`。
5. 检查 price id、金额、币种。
6. 幂等处理重复 webhook。
7. 写入 `accessToken`，让报告解锁。

不要让前端自己决定已付款。

## 给 Codex 的接入提示词

```text
我已经有 Zeabur HTTPS 域名，现在要接 Paddle。

请新增 Paddle provider。

要求：
1. 保留 mock provider，方便测试。
2. POST /api/payments/checkout 调 Paddle create transaction。
3. 国内使用 PADDLE_CNY_PRICE_ID，海外使用 PADDLE_USD_PRICE_ID。
4. transaction custom_data 必须包含 reportId 和 payment_session_id。
5. POST /api/webhooks/paddle 必须验证 Paddle-Signature。
6. 只接受 transaction.completed 解锁。
7. transaction.payment_failed / transaction.canceled / transaction.past_due 不解锁。
8. 重复 webhook 要幂等。
9. price id、金额、币种不匹配不能解锁。
10. 所有 secret 只能从 process.env 读取。
11. public/monetization.json 不能包含任何 secret。
```

## 测试顺序

1. Zeabur 环境变量填 sandbox key。
2. 重新部署。
3. 打开线上域名。
4. 完成测验。
5. 点击付款。
6. 跳到 Paddle sandbox checkout。
7. 用测试卡付款。
8. 看 Paddle notification log。
9. 看 Zeabur logs。
10. 确认报告自动解锁。

## 常见错误

### Checkout has not yet been enabled

通常是：

- Paddle onboarding 未完成。
- 网站验证未完成。
- default payment link 未设置。
- 账户还不能创建 transaction checkout。

### Authentication header incorrectly formatted

通常是 API key 或 Authorization header 格式错。

环境变量只放 key 本身：

```bash
PADDLE_API_KEY=pdl_sdbx_xxx
```

请求 header 才是：

```text
Authorization: Bearer pdl_sdbx_xxx
```

### 付款后没有解锁

按顺序查：

1. Paddle notification log 有没有发出 webhook。
2. Zeabur logs 有没有收到请求。
3. webhook secret 是否一致。
4. 事件是不是 `transaction.completed`。
5. `custom_data` 是否有 `payment_session_id` 和 `report_id`。
6. `/data/payment-store.json` 是否写入成功。

## 本章完成标准

完成后你应该能做到：

- 用户点击付款按钮打开 Paddle checkout。
- Paddle sandbox 付款后 webhook 回到 Zeabur 后端。
- 后端确认 `transaction.completed` 后自动解锁报告。
- 假 URL、伪造 session、错误 webhook 都不能解锁。
