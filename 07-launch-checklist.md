# 07. 上线检查清单

上线前不要只看“页面漂亮不漂亮”。付费网站最重要的是：用户能完成付款，付款后能拿到东西，没付款的人不能绕过。

按这份清单逐项检查。

## 一、基础功能

- [ ] 首页能打开。
- [ ] 用户能开始测验。
- [ ] 用户能完成所有题目。
- [ ] 答完后生成 `reportId`。
- [ ] 免费导言版报告能显示。
- [ ] 未付款时完整报告锁住。
- [ ] 付款按钮能创建 payment session。
- [ ] 付款成功后能自动解锁。
- [ ] 刷新页面后，已解锁报告还能打开。
- [ ] 换浏览器或无 token 时，不能看到别人的完整报告。

## 二、Codex 交付检查

让 Codex 跑：

```bash
npm run typecheck
npm run build
```

如果失败，不要硬上线。把错误贴回 Codex：

```text
这是 npm run build 的错误，请帮我修复。
[贴错误]
```

## 三、公开文件检查

这些文件可以被用户看到：

```text
public/*
dist/*
前端打包后的 js/css
```

确认里面没有：

- Paddle API key。
- Webhook secret。
- Admin token。
- `.env.payment.local` 内容。
- 你的私密测试订单资料。

可以让 Codex 检查：

```text
请扫描 public、dist 和前端源码，确认没有泄漏 API key、webhook secret、admin token。
```

## 四、Zeabur 检查

先做这一段，拿到可以公开访问的 HTTPS 域名。Paddle 的网站验证、default payment link 和 webhook 都需要这个域名。

- [ ] GitHub repo 是最新代码。
- [ ] Zeabur 连接正确 repo 和 branch。
- [ ] Build command 是 `npm run build`。
- [ ] Start command 是 `npm run start`。
- [ ] 服务监听 `process.env.PORT`。
- [ ] Host 使用 `0.0.0.0`。
- [ ] `/api/health` 可访问。
- [ ] `/monetization.json` 可访问。
- [ ] 已设置 `/data` volume。
- [ ] `PAYMENT_STORE_FILE=/data/payment-store.json`。
- [ ] 已拿到 Zeabur HTTPS 域名，例如 `https://你的项目.zeabur.app`。

## 五、Paddle 检查

Zeabur 网站能打开后，再做 Paddle。不要在还没有域名时硬接付款。

- [ ] Paddle onboarding 完成。
- [ ] 网站域名通过验证。
- [ ] Pricing page 填 Zeabur 域名下的公开页面。
- [ ] Terms of service / Privacy policy / Refund policy 都使用带路径的 URL。
- [ ] Default payment link 已设置为通过验证的域名。
- [ ] Product 已建立。
- [ ] One-time price 已建立。
- [ ] CNY price id 填到 Zeabur 环境变量。
- [ ] USD price id 填到 Zeabur 环境变量。
- [ ] API key 是正确环境：sandbox 或 live。
- [ ] Webhook destination 指向 `https://你的域名/api/webhooks/paddle`。
- [ ] Webhook secret 填到 Zeabur Variables。
- [ ] 已选择 `transaction.completed` 事件。
- [ ] sandbox 付款能触发 webhook。

## 六、环境变量检查

Zeabur Variables 至少要有。第一次只为了拿域名时，Paddle 相关变量可以先留空或用占位值；等 Paddle 建好 product、price、webhook 后再补齐：

```bash
PAYMENT_SERVER_HOST=0.0.0.0
PAYMENT_STORE_FILE=/data/payment-store.json
PUBLIC_BASE_URL=https://你的域名
CORS_ORIGIN=https://你的域名
PADDLE_ENVIRONMENT=sandbox
PADDLE_API_KEY=...
PADDLE_CNY_PRICE_ID=pri_...
PADDLE_USD_PRICE_ID=pri_...
PADDLE_WEBHOOK_SECRET=...
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

上线 live 时，把 sandbox 全部换成 live。不要混用。

## 七、付费安全检查

至少测试这些情况：

- [ ] URL 加 `?paid=true` 不会解锁。
- [ ] 随便改 session id 不会解锁。
- [ ] 错误 webhook secret 不会解锁。
- [ ] 重复 webhook 不会发放多次。
- [ ] `transaction.payment_failed` 不会解锁。
- [ ] `transaction.completed` 才会解锁。
- [ ] 同一订单不能解锁另一份 reportId。

## 八、真实用户体验检查

用手机和电脑各跑一次：

- [ ] 首页文案看得懂。
- [ ] 开始按钮明显。
- [ ] 答题页不需要一直滑动。
- [ ] 免费报告有专业感。
- [ ] 付费按钮清楚。
- [ ] 付款后有等待提示。
- [ ] 解锁后完整报告排版稳定。
- [ ] 保存报告不会失败或裁切。

## 九、上线前把测试入口关掉

如果你有这些测试功能，上线前确认关闭：

- [ ] 直接跳结果页按钮。
- [ ] 0 元测试解锁按钮。
- [ ] mock 支付按钮。
- [ ] admin 配置器入口。
- [ ] 任何 debug 面板。

如果你故意要保留，至少不要让普通用户看到。

## 十、上线后第一天看什么

上线后不要只看访问量。重点看：

- 有多少人开始测验。
- 有多少人完成测验。
- 有多少人点击付款。
- Paddle checkout 有没有打开。
- webhook 成功率。
- 支付成功后有没有解锁失败。
- 用户有没有反馈“付了但看不到”。

低价产品最怕支付链路出错。第一天请多看 logs。

## 一句话验收

当你可以稳定做到：

```text
陌生用户打开网站 -> 完成测验 -> 付款 -> 自动看到完整报告
```

才算真正上线。
