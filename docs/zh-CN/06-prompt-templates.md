# 06. 提示词模板

这一章给你可以直接丢给 Codex 的提示词。建议一次只让 Codex 做一件明确的事。

## 做产品流程

```text
请帮我设计一个付费测验网站的最小可卖流程。
要求：免费作答、免费导言版结果、付费后自动解锁完整报告。
请列出页面、API、资料模型、错误状态和测试场景。
```

## 做后端支付

```text
请帮我实现 Paddle provider。
要求：
- POST /api/payments/checkout 创建 Paddle transaction
- custom_data 写入 reportId 和 payment_session_id
- POST /api/webhooks/paddle 验签
- 只有 transaction.completed 才解锁
- 重复 webhook 要幂等
- 错误签名、金额不符、price id 不符都不能解锁
```

## 做部署检查

```text
请检查这个项目是否适合部署到 Zeabur。
重点检查：
- package scripts
- PORT 和 0.0.0.0
- 静态文件服务
- /api/health
- .gitignore
- secret 是否可能进入 public 或 dist
```

## 做上线前测试

```text
请跑完整上线前测试：typecheck、build、支付 mock 流程、Paddle webhook 验签、未付款不能解锁、付款后刷新仍解锁。
如果失败，请先修复再汇总。
```
