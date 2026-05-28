# 06. 可复制提示词模板

这一章是工具箱。你可以把下面的提示词直接贴给 Codex，再把括号里的内容换成自己的项目。

## 0. 让 Codex 先读项目

```text
请先阅读这个项目，不要急着修改。

请告诉我：
1. 前端入口在哪里
2. 后端入口在哪里
3. 支付配置在哪里
4. 本地怎么运行
5. 哪些文件不能提交到 GitHub

然后列出你建议的下一步改动计划。
```

## 1. 从空目录建立最小版本

```text
请在当前目录建立一个付费测验网站的最小可用版本。

技术要求：
- React + Vite 前端
- Node.js 后端
- 先用 mock 支付
- 不接真实 Paddle
- 不需要登录

产品流程：
首页 -> 答题页 -> 免费导言报告 -> 付款按钮 -> mock 解锁 -> 完整报告

请提供：
- package.json scripts
- 前端页面
- 后端 API
- public/monetization.json
- .env.payment.example
- 本地运行说明
```

## 2. 加题目和结果页

```text
请帮我把测验题目扩展成 [题目数量] 题。

要求：
- 每题有 3-5 个选项
- 用户一次只看到一题
- 有进度提示
- 答完后生成 reportId
- 结果页根据答案生成一个稳定结果
- 刷新后不要丢失当前报告

先用本地数据，不要接数据库。
```

## 3. 优化免费导言版报告

```text
请优化未付费结果页。

风格：
- 专业、客观、可信
- 不要夸张营销
- 不要“先透露一点”“精准打击痛点”这类话

内容结构：
1. 核心心理驱动力
2. 行为倾向与潜在卡点
3. 自我认知与内外在表现调和
4. 完整报告会继续分析的方向

限制：
- 不显示完整职业答案
- 不显示完整行动路线
- 不显示完整报告保存入口
```

## 4. 加 mock 支付墙

```text
请新增 mock 支付墙。

要求：
- public/monetization.json 有 enabled 开关
- enabled=false 时方便开发，直接看完整报告
- enabled=true 时，未付款只能看免费导言
- 点击付款按钮创建 payment session
- mock 支付成功后自动解锁
- 前端不能靠 URL 参数假解锁
```

## 5. 先部署到 Zeabur

```text
请检查并调整项目，让它可以部署到 Zeabur。

要求：
- npm run build 能产出前端文件
- npm run start 能启动单 Node 服务
- 服务监听 process.env.PORT
- host 可用 0.0.0.0
- 同一个服务提供前端 dist 和 /api
- 新增 /api/health
- .gitignore 忽略 .env、*.local、node_modules、dist、日志、临时文件
- 不提交任何 API key
- Paddle provider 没启用时，缺少 Paddle key 不应导致服务崩溃

请告诉我 Zeabur Variables 应该填什么。
```

## 6. 再接 Paddle

```text
我已经有 Zeabur HTTPS 域名，现在要接 Paddle。

请新增 Paddle provider。

环境变量：
- PADDLE_ENVIRONMENT
- PADDLE_API_KEY
- PADDLE_CNY_PRICE_ID
- PADDLE_USD_PRICE_ID
- PADDLE_WEBHOOK_SECRET
- PUBLIC_BASE_URL

后端要求：
- POST /api/payments/checkout 调 Paddle create transaction
- custom_data 写入 reportId 和 payment_session_id
- POST /api/webhooks/paddle 验证 Paddle-Signature
- 只接受 transaction.completed 解锁
- 失败、取消、过期不解锁
- webhook 重复发送要幂等
- price id、金额、币种不匹配不能解锁
```

## 7. 检查为什么 Zeabur 502

```text
Zeabur 部署后打开网站显示 502。

这是 Zeabur log：
[贴日志]

请检查：
1. package.json start script
2. server 是否监听 process.env.PORT
3. host 是否是 0.0.0.0
4. build 后静态文件路径是否正确
5. 是否因为缺少环境变量导致进程退出

请直接修复。
```

## 8. 检查为什么 Paddle 付款后不解锁

```text
Paddle 付款后页面没有解锁。

我有这些信息：
- Paddle transaction id: [填写]
- payment session id: [填写]
- reportId: [填写]
- Zeabur log: [贴日志]
- Paddle webhook log: [贴日志]

请检查：
1. webhook 是否收到
2. webhook 签名是否验证
3. event_type 是否是 transaction.completed
4. custom_data 是否包含 payment_session_id 和 reportId
5. store 文件是否成功写入
6. 前端轮询是否拿到 paid
```

## 9. 上线前安全审计

```text
请做一次上线前安全审计。

重点：
- public 文件是否泄漏 secret
- .env 是否被 git 追踪
- API key 是否只在后端 process.env
- webhook 是否验签
- 错误签名不能解锁
- 重复 webhook 不重复发放
- 未付款不能访问完整报告
- 同一 access token 不能解锁别人的 reportId

请列出问题并修复。
```

## 10. 让报告更像产品

```text
请优化完整报告页，让它更像一份付费产品。

要求：
- 第一屏看到核心结论和雷达
- 心理侧写作为主卖点
- 多方向短模块，不要一篇长文
- 删除薪资和就业市场说明
- 重点放在人格特质、适合职业类型、发展路线、风险边界
- 备选职业能点击切换，但不能重新锁定
- 保存报告时排版不裁切
```

## 11. 请 Codex 不要过度发挥

当你觉得 Codex 改太多，用这段：

```text
请暂停新增功能。
这次只修复我指出的问题。
不要重构无关文件。
不要改视觉风格。
不要删除现有功能。
请先说明你会改哪些文件，再动手。
```

## 12. 每次结尾都要求验证

每次任务最后加：

```text
完成后请运行：
- npm run typecheck
- npm run build

如果项目没有这些命令，请说明替代验证方式。
最后请总结改了什么、我应该怎么手动测试。
```

## 使用建议

新手最稳定的方式是：

1. 一次只贴一个提示词。
2. 等 Codex 改完。
3. 跑起来。
4. 截图或贴错误。
5. 再进入下一步。

不要一次要求“做完整网站 + 接支付 + 部署 + 多语言 + 美术升级”。那样失败时很难知道是哪一步坏了。
