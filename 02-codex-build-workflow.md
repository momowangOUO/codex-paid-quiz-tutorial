# 02. 怎么让 Codex 从 0 帮你建站

这一章只讲一件事：**你不会写网站时，应该怎样指挥 Codex。**

不要一上来就说“帮我做一个完整商业化网站”。这样范围太大，Codex 容易一次改太多。你要把网站拆成一连串可以验收的小任务。

## 先告诉 Codex 你要做什么产品

复制这段作为第一条提示词：

```text
我要做一个付费测验网站。

目标用户会：
1. 打开首页
2. 完成一组测验题
3. 看到免费导言版报告
4. 点击付款按钮
5. 付款成功后自动解锁完整报告

请先帮我建立一个最小可用版本。
要求：
- 前端用 React + Vite
- 后端用 Node.js
- 先用 mock 支付，不接真实 Paddle
- 不需要登录账号
- 不要把任何 secret 放进前端
- 每一步都要告诉我怎么本地运行和验证
```

如果你已经有项目，就加一句：

```text
请先阅读现有项目结构，不要重建项目；尽量沿用现有代码风格。
```

## 第一次让它建的东西要很小

第一版只需要这些页面：

| 页面 | 目的 | 最低要求 |
| --- | --- | --- |
| 首页 | 让用户开始测验 | 一个标题、一个开始按钮 |
| 答题页 | 收集答案 | 至少 3-5 道测试题，之后再扩展 |
| 免费结果页 | 建立信任 | 显示部分分析，但不显示完整职业答案 |
| 付费墙 | 引导解锁 | 一个付款按钮，一个等待状态 |
| 完整报告页 | 验证解锁 | mock 付款后显示完整内容 |

你先不要要求：

- 多语言。
- 精美动画。
- 后台管理。
- PDF/长图保存。
- 真实 Paddle。
- 完整题库。

这些都可以之后再加。第一步只要流程跑通。

## 推荐项目结构

你可以让 Codex 按这个结构建：

```text
paid-quiz-site/
  src/
    app/
      App.tsx
    components/
    data/
      questions.ts
    monetization/
      config.ts
    styles/
      globals.css
  server/
    payment-server.mjs
  public/
    monetization.json
  package.json
  .env.payment.example
```

各目录的意思：

| 目录 | 用途 |
| --- | --- |
| `src/app` | 页面流程 |
| `src/components` | 按钮、卡片、题目、报告模块 |
| `src/data` | 题目、结果类型、示例报告资料 |
| `src/monetization` | 前端读取公开付费配置 |
| `server` | 后端 API、支付 session、webhook |
| `public` | 可以公开给浏览器看的文件 |

新手最容易犯的错是把所有东西塞进一个文件。让 Codex 按目录拆开，后面比较好维护。

## 第 1 轮：只做测验流程

给 Codex：

```text
请先实现测验主流程，不要接支付。

需求：
- 首页有“开始测验”
- 答题页一次显示一题
- 用户选择答案后可以下一题
- 答完后生成一个 reportId
- 进入结果页
- 结果页显示免费导言和一个“解锁完整报告”的按钮

请同时提供：
- npm scripts
- 本地运行方式
- 最小测试方式
```

验收：

```bash
npm install
npm run dev
```

打开本地网址，自己答一遍。不要急着改视觉，先确认路径能走完。

## 第 2 轮：让后端保存付款状态

给 Codex：

```text
现在请新增 Node 后端，先做 mock 支付。

后端 API：
- POST /api/payments/checkout
  接收 reportId，创建 payment session，返回 sessionId 和 checkoutUrl

- GET /api/payments/sessions/:id
  返回 pending / paid / failed

- POST /api/payments/mock-complete
  仅本地测试使用，把某个 session 标记为 paid

数据先存在 JSON 文件即可。
请确保前端不能只靠 URL 参数解锁报告。
```

验收：

- 未付款时完整报告看不到。
- mock complete 后能解锁。
- 刷新页面后，后端仍知道这份报告有没有解锁。

## 第 3 轮：加付费墙开关

给 Codex：

```text
请新增 public/monetization.json，让付费墙可以开关。

默认：
{
  "enabled": false,
  "checkoutMode": "api",
  "apiBaseUrl": "/api",
  "provider": "mock"
}

要求：
- enabled=false 时，方便我开发测试，可以直接看完整报告
- enabled=true 时，必须付款后才解锁
- public 文件不能包含 API key 或 secret
```

这一步很重要，因为你上线前会反复测试。如果没有开关，你很容易把半成品付费墙推给用户。

## 第 4 轮：先准备 Zeabur 部署

本地 mock 流程跑通后，先不要急着接 Paddle。Paddle 后面会要求你填写并验证网站域名，也会要求 default payment link 使用一个已经能打开的 HTTPS 域名。

所以正确顺序是：

```text
本地 mock 跑通 -> 推到 GitHub -> 部署到 Zeabur -> 拿到 HTTPS 域名 -> 再设置 Paddle
```

给 Codex：

```text
请把这个项目整理成可以部署到 Zeabur 的结构。

要求：
- npm run build 可以生成前端 dist
- npm run start 可以启动同一个 Node 服务
- Node 服务要同时提供 dist 静态文件和 /api/*
- server 必须监听 process.env.PORT
- host 使用 0.0.0.0
- 新增 /api/health，不泄漏任何 secret
- .env、.local、node_modules、dist、本地数据文件都不要提交到 GitHub
- 先不要要求 Paddle key，因为现在只是为了拿到可验证的 HTTPS 域名

请同时告诉我：
1. GitHub 要提交哪些文件
2. Zeabur 的 build command 和 start command
3. Zeabur 上要先设置哪些变量
4. 怎么确认网站和 /api/health 都可以访问
```

这一步完成后，你应该拿到类似这样的正式网址：

```text
https://your-project.zeabur.app
```

这个网址之后会填进 Paddle 的 website verification、pricing page、default payment link 和 webhook URL。

## 第 5 轮：有 HTTPS 域名后，再把 mock 换成 Paddle

等 Zeabur 网站可以打开、`/api/health` 也正常，再给 Codex：

```text
请新增 Paddle provider，但保留 mock provider。

要求：
- POST /api/payments/checkout 使用 Paddle create transaction API
- 根据用户地区或按钮选择使用 CNY price / USD price
- custom_data 必须包含 reportId 和 payment_session_id
- 新增 POST /api/webhooks/paddle
- webhook 必须校验 Paddle-Signature
- 只接受 transaction.completed 解锁
- webhook 重复发送时必须幂等
- 错误签名、金额不符、price id 不符都不能解锁
```

Codex 实现后，你要让它说明这些字段在哪里配置：

```text
PADDLE_ENVIRONMENT
PADDLE_API_KEY
PADDLE_CNY_PRICE_ID
PADDLE_USD_PRICE_ID
PADDLE_WEBHOOK_SECRET
PUBLIC_BASE_URL
```

注意：`PUBLIC_BASE_URL` 应该填 Zeabur 给你的 HTTPS 域名，例如：

```text
https://your-project.zeabur.app
```

Paddle webhook URL 则是：

```text
https://your-project.zeabur.app/api/webhooks/paddle
```

## 第 6 轮：上线前让 Codex 做安全检查

给 Codex：

```text
请检查这个项目是否适合上线。

重点检查：
1. public 文件里有没有 API key、webhook secret、admin token
2. 付款解锁是否只能由后端确认
3. webhook 是否验签
4. 重复 webhook 是否会重复发放权限
5. Zeabur 是否会读取 PORT
6. 是否提供 /api/health
7. build 和 start scripts 是否可用

请列出问题并直接修复。
```

## 你应该怎样回报错误给 Codex

不要只说“坏了”。要贴这四件事：

```text
我做了什么：
我看到什么错误：
我期待它应该怎样：
相关截图或日志：
```

例子：

```text
我在 Zeabur 打开网站时看到 502。
Zeabur logs 显示 npm run start 有启动，但网页打不开。
请检查 server 是否监听 process.env.PORT，以及 host 是否是 0.0.0.0。
```

Codex 最擅长处理具体错误。越具体，它越快。

## 新手不要跳过的验证

每做完一个阶段，都让 Codex 跑：

```bash
npm run typecheck
npm run build
```

如果没有这些 scripts，就让 Codex 补：

```text
请为这个项目补上 typecheck 和 build scripts，并确保本地能跑。
```

## 本章完成标准

完成这一章后，你应该拥有：

- 一个可以本地运行的测验网站。
- 一个 Node 后端。
- 一个 mock 付款解锁流程。
- 一个公开配置文件。
- 一套清楚的 Codex 提示词。

下一章先把项目上传到 GitHub；GitHub 仓库准备好后，再部署到 Zeabur 拿 HTTPS 域名。
