# 02. 用 Codex 搭出网站

这一章的目标是让 Codex 真的开始写代码，而不是停留在规划。

## 推荐技术形态

- 前端：React 或 Vite。
- 后端：Node 服务，同时提供前端静态文件和 `/api/*`。
- 支付：先保留 mock provider，本地可以测试解锁；正式再切 Paddle。
- 数据：早期可用 JSON 文件或轻量数据库，重点是不要把付款状态放在前端。

## 分阶段让 Codex 做

1. 先生成测验页面、题目状态、结果页。
2. 再加后端 API：checkout、session 查询、webhook。
3. 加 mock 支付，确认付费墙和解锁逻辑能跑通。
4. 加 Paddle provider。
5. 跑 typecheck、build、基本流程测试。

## 可直接复制的提示词

```text
请在当前项目实现一个付费墙原型。
要求：
1. 默认关闭付费墙。
2. mock 支付可以本地测试。
3. 真实付款状态只能由后端写入。
4. 前端不能靠 paid=true 解锁。
5. 加上 checkout、session 查询、webhook 的最小 API。
完成后请运行 typecheck 和 build。
```

## 检查重点

- secret 只放后端环境变量。
- 前端只知道公开配置和价格。
- 付费后刷新页面仍能保持解锁。
- 未付费用户不能靠改 URL 看完整内容。
