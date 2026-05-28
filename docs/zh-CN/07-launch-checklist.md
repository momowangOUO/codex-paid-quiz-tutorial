# 07. 上线检查清单

上线前不要只看页面能不能打开。付费网站最容易出问题的是权限、secret、webhook 和部署状态。

## 网站

- 首页能打开。
- 测验能完成。
- 免费结果能显示。
- 付费墙默认状态符合预期。
- 手机端不会严重溢出。

## 后端

- `/api/health` 返回 200。
- `/api/health` 不泄漏 secret。
- `/monetization.json` 不含 Paddle API key。
- `PAYMENT_STORE_FILE` 指向 `/data/payment-store.json`。
- Zeabur volume 已挂载到 `/data`。

## Paddle

- Website domain 已通过。
- Default payment link 已设置。
- Product 是 one-time。
- CNY 和 USD price id 都填到 Zeabur。
- Webhook URL 是 `https://你的域名/api/webhooks/paddle`。
- Webhook secret 已填到 Zeabur。
- Sandbox 成功付款后能自动解锁。

## 安全

- GitHub 没有 `.env`、`.env.payment.local`。
- 没有把 API key 写到 README、截图或 issue。
- 前端不能靠 `paid=true` 解锁。
- 错误 webhook 签名不能解锁。
- 重复 webhook 不会重复发放。

## Live 切换

- `PADDLE_ENVIRONMENT=live`。
- API key 换成 live。
- Price id 换成 live。
- Webhook secret 换成 live。
- 关闭 0 元测试和 mock 入口。
