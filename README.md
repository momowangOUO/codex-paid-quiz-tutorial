# 用 Codex 从 0 做出一个可以收款的测验网站

[简体中文](README.md) | [繁體中文](README.zh-TW.md) | [English](README.en.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

<p align="center">
  <img src="assets/brand/tutorial-mascot-logo-512.png" width="128" alt="Codex 付费测验教程 logo" />
</p>

[![Tutorial](https://img.shields.io/badge/tutorial-Codex%20实作路线-111827?style=for-the-badge)](#你会实际做出什么)
[![Deploy](https://img.shields.io/badge/deploy-Zeabur%20先拿域名-f43f5e?style=for-the-badge)](03-zeabur-deployment.md)
[![Payment](https://img.shields.io/badge/payment-Paddle%20Webhook-0ea5e9?style=for-the-badge)](04-payment-unlock.md)

> 这不是一份“架构原理课”。这是一份给 0 基础创作者的实作教程：你会照着步骤请 Codex 帮你做出一个测验网站，先部署到 Zeabur 拿 HTTPS 域名，再用 Paddle 完成网站验证、收款和自动解锁。

静态展示页：<https://momowangouo.github.io/codex-paid-quiz-tutorial/>

在线案例：<https://callingdeconstructor.zeabur.app/>

欢迎协作：如果你跑通了其他支付平台、其他部署平台、或能补充更好的无隐私示意图，请看 [CONTRIBUTING.md](CONTRIBUTING.md)。

![付费测验网站教程总览](assets/brand/tutorial-hero.webp)

## 这份教程适合谁

- 你有一个测验、报告、咨询、教育、心理、职涯、占卜、游戏化问卷、AI 报告类想法。
- 你不会写完整网站，但愿意让 Codex 帮你改代码。
- 你想做“付款后自动解锁页面”，而不是手动发兑换码。
- 你想先用低成本上线，验证有没有人愿意付费。
- 你不想一开始就学一大堆服务器、数据库、支付专业词。

如果你已经是工程师，也可以看，但这份教程会刻意用“怎么做”的语言，而不是先讲抽象架构。

## 你会实际做出什么

最终你会做出一个这样的产品：

1. 用户打开网站，看到测验首页。
2. 用户完成题目。
3. 网站生成一份免费导言版报告。
4. 用户点击“解锁完整报告”。
5. 你先把项目部署到 Zeabur，取得 HTTPS 域名。
6. 后端向 Paddle 创建 checkout。
7. 用户在 Paddle 付款。
8. Paddle 用 webhook 告诉你的后端“这笔真的付了”。
9. 后端发放访问权限。
10. 用户回到报告页，自动看到完整报告。

最重要的是：**前端不会因为 URL 上写了 `paid=true` 就解锁。只有后端收到支付平台确认，才解锁。**

## 先认识三个工具

### Codex 是什么

Codex 是你写网站时的工程搭档。你不用一次把需求讲得很专业，你可以像这样跟它说：

```text
我想做一个测验网站，用户答完 48 题后看到免费预览。
完整报告需要付款后自动解锁。
请先帮我建立 React/Vite 前端、Node 后端、mock 支付流程，并告诉我怎么本地运行。
```

你的工作不是“自己写完所有代码”，而是：

- 把产品流程说清楚。
- 让 Codex 一步一步实现。
- 每一步跑起来、截图、指出哪里不对。
- 不把 API key、webhook secret 这类密钥放进前端。

### Zeabur 是什么

Zeabur 是一个把 GitHub 项目部署成网站的云平台。你可以把它想成：

```text
GitHub 负责放代码
Zeabur 负责把代码跑成网站
```

你一般不需要自己买服务器、进 Linux、配 Nginx。对这个教程来说，Zeabur 主要负责：

- 从 GitHub 拉你的代码。
- 执行 `npm run build`。
- 执行 `npm run start`。
- 给你一个 HTTPS 网址。
- 存环境变量，例如 `PADDLE_API_KEY`。
- 挂载 `/data`，保存订单和解锁记录。

Zeabur 官方 Node.js 指南也提醒：Node 服务要监听平台注入的 `PORT`，而不是自己写死端口。见 [Zeabur Node.js Guide](https://zeabur.com/docs/en-US/guides/nodejs) 与 [Public Networking](https://zeabur.com/docs/en-US/deploy/networking/public-networking)。

### Paddle 是什么

Paddle 是一个收款平台。对你的用户来说，它负责显示付款页面；对你来说，它负责收钱、税务处理、发付款结果通知。

你在 Paddle 里会做这些事：

- 完成账户注册和审核。
- 建立一个产品，例如“Deep Report Access”。
- 建立一个一次性价格，例如 CNY 9.90 或 USD 1.99。
- 建立 API key，让你的后端能创建 checkout。
- 设置 default payment link，让 Paddle 知道付款页面挂在哪个域名。
- 设置 webhook，把付款完成通知发到你的网站。

Paddle 的 transaction checkout 需要账户可用、默认付款链接设置完成、域名通过验证。因此教程会先部署 Zeabur，再进入 Paddle 设置。官方说明见 [Paddle Quickstart](https://developer.paddle.com/get-started/quickstart/)、[Create a transaction](https://developer.paddle.com/api-reference/transactions/create-transaction/) 与 [Default payment link](https://developer.paddle.com/build/transactions/default-payment-link/)。

## 最短实作路线

不要一开始就追求完美。建议按这个顺序做：

### 第 1 步：先做免费版网站

目标：网站能打开，题目能作答，结果页能出现。

你让 Codex 做：

```text
请帮我做一个 React/Vite 测验网站。
先不要接真实支付。
需要：首页、答题页、免费结果页、完整报告页。
请用 mock 数据跑通流程，并提供 npm scripts。
```

验收：

- `npm install` 能成功。
- `npm run dev` 能打开本地网页。
- 答完题能进结果页。
- 没有任何真实 API key。

### 第 2 步：加后端和 mock 支付

目标：前端不能自己决定已付款，必须问后端。

你让 Codex 做：

```text
请新增一个 Node 后端。
后端需要：
- POST /api/payments/checkout 创建 payment session
- GET /api/payments/sessions/:id 查询付款状态
- POST /api/payments/free-test-unlock 只在测试开关开启时解锁
- 保存 reportId、sessionId、status、accessToken
先用 mock provider，不要接 Paddle。
```

验收：

- 未付款时完整报告锁住。
- mock 支付成功后自动解锁。
- 刷新页面不会靠前端假状态解锁。

### 第 3 步：先部署到 Zeabur，拿 HTTPS 域名

目标：让你的网站先有一个 Paddle 可以验证的公开地址。

你需要做：

1. 把代码推到 GitHub。
2. 在 Zeabur 新增项目，选择你的 GitHub repo。
3. 设置 build command：`npm run build`。
4. 设置 start command：`npm run start`。
5. 设置环境变量。
6. 挂载 `/data` volume。
7. 打开 Zeabur 提供的网址。

![部署到收款顺序示意](assets/screenshots/07-domain-before-paddle.svg)

验收：

- 首页可打开。
- `/api/health` 可打开。
- `/monetization.json` 不含 Paddle secret。
- 你已经拿到 `https://你的域名`。

### 第 4 步：再接 Paddle sandbox

目标：用 Zeabur 域名完成 Paddle 网站验证，并跑通真实 checkout。

你需要在 Paddle 后台设置：

- Website domain：你的 Zeabur HTTPS 域名。
- Default payment link：你的 Zeabur HTTPS 域名。
- Product 和 one-time price。
- API key。
- Webhook URL：`https://你的域名/api/webhooks/paddle`。

你让 Codex 做：

```text
我已经有 Zeabur HTTPS 域名，现在要接 Paddle。
请把支付 provider 从 mock 扩展成 paddle。
创建 checkout 时调用 Paddle create transaction API。
把 reportId 和 payment_session_id 写进 custom_data。
webhook 只接受 transaction.completed 后解锁。
验签失败、金额不符、price id 不符都不能解锁。
```

验收：

- 后端能返回 Paddle checkout URL。
- Paddle sandbox 付款后，webhook 能把 session 改成 `paid`。
- `transaction.paid` 不直接解锁，只用 `transaction.completed`。

### 第 5 步：切到 Paddle live

目标：正式收钱。

上线前不要只看页面能不能跳转，要检查：

- Paddle onboarding 完成。
- Default payment link 已设置并通过域名验证。
- Product 和 Price 是 live 环境建立的，不是 sandbox。
- Zeabur 的环境变量换成 live key。
- Webhook destination 指向正式域名。
- 付费墙开关 `enabled` 才打开。

## 你需要填写哪些环境变量

本地开发可以放在 `.env.payment.local`，部署到 Zeabur 时要填到 Zeabur Variables。

```bash
PAYMENT_SERVER_HOST=0.0.0.0
PAYMENT_STORE_FILE=/data/payment-store.json
PUBLIC_BASE_URL=https://你的-zeabur-域名
CORS_ORIGIN=https://你的-zeabur-域名

PADDLE_ENVIRONMENT=sandbox
PADDLE_API_KEY=你的_paddle_api_key
PADDLE_CNY_PRICE_ID=pri_xxx
PADDLE_USD_PRICE_ID=pri_xxx
PADDLE_WEBHOOK_SECRET=你的_webhook_secret
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

注意：

- `PAYMENT_SERVER_HOST=0.0.0.0` 在 Zeabur 这类容器环境是正常的，代表服务对容器外可访问。
- API key 和 webhook secret 只能放后端环境变量，不能写进 `public/monetization.json`。
- `PUBLIC_BASE_URL` 一定要是 HTTPS 域名，不要用本机 `localhost` 或服务器 IP 做正式支付。

## 你应该怎么使用 Codex

每次只给 Codex 一个小目标，不要一次丢完整商业计划。

推荐节奏：

1. 先让 Codex 读项目结构。
2. 让它列出它打算改哪些文件。
3. 让它实现一个小功能。
4. 让它跑 typecheck/build。
5. 你打开网页试。
6. 你把截图或错误贴回来。

可以直接复制这个提示词：

```text
请先阅读这个项目，告诉我：
1. 前端入口在哪里
2. 后端入口在哪里
3. 支付配置在哪里
4. 当前怎么本地运行

然后帮我实现一个最小可用版本：
- 用户答完题后进入结果页
- 未付款显示免费导言
- 点击付款按钮创建 payment session
- mock 付款成功后自动解锁

请保持改动小，每次修改后运行 typecheck 和 build。
```

## 章节目录

1. [产品流程怎么拆](01-product-flow.md)
2. [怎么让 Codex 从 0 帮你建站](02-codex-build-workflow.md)
3. [先部署到 Zeabur，拿到可验证域名](03-zeabur-deployment.md)
4. [有域名后，再接 Paddle 付款与自动解锁](04-payment-unlock.md)
5. [可复制提示词模板](05-prompt-templates.md)
6. [上线检查清单](06-launch-checklist.md)
7. [内置界面截图图册](07-visual-walkthrough.md)

## 常见卡点

| 问题 | 通常原因 | 怎么处理 |
| --- | --- | --- |
| Paddle checkout failed: checkout not enabled | Paddle 账户或 default payment link 还没完成 | 先完成 Paddle onboarding、域名验证、default payment link |
| Paddle webhook 没有解锁 | webhook URL 不对、secret 不对、事件没选 | 到 Paddle notification logs 看请求记录 |
| Zeabur 502 | 服务没监听正确端口或进程崩了 | 确认 `process.env.PORT`、看 Zeabur logs |
| 重启后订单消失 | 没有挂载持久化 volume | Zeabur 增加 `/data` volume，并设置 `PAYMENT_STORE_FILE` |
| 前端看得到 API key | 把 secret 写进 public 文件 | 立刻撤销 key，改放后端环境变量 |

## 在线案例

[The Calling Deconstructor](https://callingdeconstructor.zeabur.app/) 是一个已经上线的付费测验网站案例。你可以先体验完整用户路径，再回到教程拆自己的版本。

![The Calling Deconstructor 案例](assets/brand/tutorial-og-cover.png)

小提醒：这是个人项目，服务器经费不是无限续杯。如果哪天打不开，可能不是产品消失了，只是它暂时进入省电冬眠模式，等云端小金库回血后再醒来。

## 官方资料

- [Zeabur Platform Overview](https://zeabur.com/docs/en-US/get-started/platform-overview)
- [Zeabur Node.js Guide](https://zeabur.com/docs/en-US/guides/nodejs)
- [Zeabur Public Networking](https://zeabur.com/docs/en-US/deploy/networking/public-networking)
- [Paddle Quickstart](https://developer.paddle.com/get-started/quickstart/)
- [Paddle Create Transaction](https://developer.paddle.com/api-reference/transactions/create-transaction/)
- [Paddle Default Payment Link](https://developer.paddle.com/build/transactions/default-payment-link/)
- [Paddle Webhook Signature Verification](https://developer.paddle.com/webhooks/signature-verification)

## 合作与交流

如果你想补充其他平台路线、翻译、截图、部署踩坑记录，欢迎一起改。

请通过 [GitHub Issue 合作入口](https://github.com/momowangOUO/codex-paid-quiz-tutorial/issues/new?template=collaboration.yml) 联系。公开 issue 里请不要留下私人联系方式、付款账号、API key、后台截图或真实订单资料。

更完整的合作说明看 [CONTACT.md](CONTACT.md)。
