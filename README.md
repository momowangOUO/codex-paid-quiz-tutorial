# 用 Codex 从 0 做出一个可以收款的测验网站

[简体中文](README.md) | [繁體中文](README.zh-TW.md) | [English](README.en.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

<p align="center">
  <img src="assets/brand/tutorial-mascot-logo-512.png" width="128" alt="Codex 付费测验教程 logo" />
</p>

[![Tutorial](https://img.shields.io/badge/tutorial-Codex%20实作路线-111827?style=for-the-badge)](#你会实际做出什么)
[![GitHub](https://img.shields.io/badge/upload-GitHub%20先存代码-64748b?style=for-the-badge)](03-upload-to-github.md)
[![Deploy](https://img.shields.io/badge/deploy-Zeabur%20先拿域名-f43f5e?style=for-the-badge)](04-zeabur-deployment.md)
[![Payment](https://img.shields.io/badge/payment-Paddle%20Webhook-0ea5e9?style=for-the-badge)](05-payment-unlock.md)

> 这不是一份“架构原理课”。这是一份给 0 基础创作者的实作教程：你会照着步骤请 Codex 帮你做出一个测验网站，先上传到 GitHub，再部署到 Zeabur 拿 HTTPS 域名，最后用 Paddle 完成网站验证、收款和自动解锁。

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
5. 你把项目上传到 GitHub。
6. 你把 GitHub 仓库部署到 Zeabur，取得 HTTPS 域名。
7. 后端向 Paddle 创建 checkout。
8. 用户在 Paddle 付款。
9. Paddle 用 webhook 告诉你的后端“这笔真的付了”。
10. 后端发放访问权限。
11. 用户回到报告页，自动看到完整报告。

最重要的是：**前端不会因为 URL 上写了 `paid=true` 就解锁。只有后端收到支付平台确认，才解锁。**

## 先认识四个工具

### Codex 是什么

**【本节核心】Codex 是帮你读代码、改代码、跑检查的工程搭档。**

你不用一次把需求讲得很专业。第一次可以像这样跟它说：

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

> 💡 **为什么这样理解？**
> Codex 更像一位会写代码的协作者，不像一个一次性生成网站的按钮。你给它清楚的小任务，它改完后再验证；你看到问题，再把截图或日志贴回去继续修。

### GitHub 是什么

**【本节核心】GitHub 是放代码的云端仓库，Zeabur 会从这里读取你的项目。**

你可以把它想成：

```text
你的电脑负责写和测试
GitHub 负责保存项目版本
Zeabur 负责把 GitHub 上的版本部署成网站
```

在这份教程里，GitHub 主要负责：

- 保存项目代码。
- 保存 README 和教程说明。
- 记录每次重要修改。
- 让 Zeabur 找到你的项目。
- 让其他人可以阅读、协作或提出建议。

> 💡 **为什么这样理解？**
> GitHub 不是线上服务器本身。它更像一个放项目的云端资料夹。你把代码上传到 GitHub 后，Zeabur 才能从这个资料夹拿到代码并运行。

### Zeabur 是什么

**【本节核心】Zeabur 负责把 GitHub 里的代码跑成一个别人可以打开的网站。**

你可以把它想成：

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

> 💡 **为什么先用 Zeabur？**
> 你要接 Paddle 前，需要先有一个真实的 HTTPS 域名。Zeabur 可以先帮你把网站跑起来，给你一个公开地址；有了这个地址，Paddle 的网站验证和 webhook 才有地方可填。

### Paddle 是什么

**【本节核心】Paddle 负责显示付款页、处理付款，并把付款结果通知你的后端。**

对用户来说，Paddle 是付款页面。对你来说，Paddle 是收款平台和付款结果通知来源。

你在 Paddle 里会做这些事：

- 完成账户注册和审核。
- 建立一个产品，例如“Deep Report Access”。
- 建立一个一次性价格，例如 CNY 9.90 或 USD 1.99。
- 建立 API key，让你的后端能创建 checkout。
- 设置 default payment link，让 Paddle 知道付款页面挂在哪个域名。
- 设置 webhook，把付款完成通知发到你的网站。

Paddle 的 transaction checkout 需要账户可用、默认付款链接设置完成、域名通过验证。因此教程会先部署 Zeabur，再进入 Paddle 设置。官方说明见 [Paddle Quickstart](https://developer.paddle.com/get-started/quickstart/)、[Create a transaction](https://developer.paddle.com/api-reference/transactions/create-transaction/) 与 [Default payment link](https://developer.paddle.com/build/transactions/default-payment-link/)。

> 💡 **为什么不是前端直接接 Paddle？**
> 创建 checkout 需要用到 API key。API key 像后台钥匙，不能放进用户浏览器。正确做法是：前端请求你的后端，后端拿 API key 去找 Paddle 创建付款页。

## 从这里开始：六步实作路线

这条路线刻意先做本地可用版本，再部署拿域名，最后才接 Paddle。不要把 Paddle 放在第一步，因为 Paddle 后台需要你提供已经能打开的 HTTPS 网站。

### 第 1 步：先做免费版网站

**【本步核心】先让网站能打开、能答题、能看到结果页，不接真实支付。**

接下来是具体的执行步骤：

1. 打开你的项目资料夹。
2. 打开 Codex。
3. 把下面这段提示词贴给 Codex：

```text
请帮我做一个 React/Vite 测验网站。

先不要接真实支付。

需要：
1. 首页
2. 答题页
3. 免费结果页
4. 完整报告页

请先用 mock 数据跑通流程，并提供 npm scripts。
完成后请告诉我：
1. 怎么安装依赖
2. 怎么启动本地开发
3. 怎么从首页一路测试到结果页
```

4. 等 Codex 改完后，在终端执行：

```bash
npm install
npm run dev
```

5. 打开终端显示的本地网址。
6. 从首页开始，完整答一次题。
7. 确认答完后能进入结果页。

验收标准：

- `npm install` 能成功。
- `npm run dev` 能打开本地网页。
- 答完题能进结果页。
- 这一阶段没有任何真实 API key。

> 💡 **为什么这样做？**
> 第一个版本只验证“用户路径”是否存在。它像开店前先摆出动线：入口、货架、结账台位置都先确定，至于真正的收银系统，后面再接。

### 第 2 步：加后端和 mock 支付

**【本步核心】让付款状态由后端决定，前端不能自己假装已经付款。**

接下来是具体的执行步骤：

1. 把下面这段提示词贴给 Codex：

```text
请新增一个 Node 后端，先做 mock 支付。

后端需要：
1. POST /api/payments/checkout 创建 payment session
2. GET /api/payments/sessions/:id 查询付款状态
3. POST /api/payments/free-test-unlock 只在测试开关开启时解锁
4. 保存 reportId、sessionId、status、accessToken

要求：
- 先用 mock provider，不要接 Paddle。
- 前端不能只靠 URL 参数解锁报告。
- 刷新页面后，已解锁状态仍由后端资料判断。
- 请告诉我怎么本地测试未付款、付款中、已付款三种状态。
```

2. 启动后端和前端。
3. 先进入结果页，确认完整报告是锁住的。
4. 触发 mock 付款。
5. 确认报告自动解锁。
6. 刷新页面，再确认解锁状态仍正确。

验收标准：

- 未付款时完整报告锁住。
- mock 支付成功后自动解锁。
- 刷新页面不会靠前端假状态解锁。
- 随便在网址加 `paid=true` 不会解锁。

> 💡 **为什么这样做？**
> 前端网页在用户电脑里运行，用户有办法修改网址、按钮状态或浏览器资料。真正能判断付款的地方应该是后端，后端再等支付平台通知。

### 第 3 步：先上传到 GitHub

**【本步核心】先把本机代码放进 GitHub 仓库，因为 Zeabur 通常从 GitHub 读取代码部署。**

接下来是具体的执行步骤：

1. 在 GitHub 新建一个 repo。
2. 检查 `.gitignore`，确认 `.env`、`.local`、`node_modules`、`dist` 不会上传。
3. 在本机项目根目录执行：

```bash
git status
git add .
git commit -m "Initial paid quiz website"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

4. 打开 GitHub 仓库页面。
5. 确认代码文件已经出现。
6. 确认 `.env`、`.env.payment.local`、Paddle API key 没有出现在仓库里。

验收标准：

- GitHub 仓库能打开。
- README 能正常显示。
- 主要项目文件已经上传。
- 没有上传 secret。

> 💡 **为什么这样做？**
> GitHub 是 Zeabur 的代码来源。你电脑里的文件如果没有 push 到 GitHub，Zeabur 就看不到，也无法部署最新版本。

### 第 4 步：部署到 Zeabur，拿 HTTPS 域名

**【本步核心】先把网站放到线上，取得 Paddle 可以验证的公开 HTTPS 域名。**

接下来是具体的执行步骤：

1. 打开 Zeabur。
2. 新建项目。
3. 选择你的 GitHub 仓库。
4. Build command 填：

```text
npm run build
```

5. Start command 填：

```text
npm run start
```

6. 在 Zeabur Variables 填基础环境变量。
7. 挂载 `/data` volume。
8. 打开 Zeabur 提供的网址。
9. 打开 `/api/health` 检查后端是否活着。

![部署到收款顺序示意](assets/screenshots/07-domain-before-paddle.svg)

验收标准：

- 首页可打开。
- `/api/health` 可打开。
- `/monetization.json` 不含 Paddle secret。
- 你已经拿到 `https://你的域名`。

> 💡 **为什么这样做？**
> Paddle 后面会要求网站验证和 default payment link。你需要先有一个真实可打开的网址，才能告诉 Paddle：“这个就是我的销售网站。”

### 第 5 步：再接 Paddle sandbox

**【本步核心】用 Zeabur 域名完成 Paddle 网站验证，并在测试环境跑通 checkout 与 webhook。**

接下来是具体的执行步骤：

1. 在 Paddle 后台填写 Website domain：你的 Zeabur HTTPS 域名。
2. 设置 Default payment link：你的 Zeabur HTTPS 域名。
3. 创建 Product。
4. 创建 One-time price。
5. 创建 API key。
6. 创建 Webhook destination：

```text
https://你的域名/api/webhooks/paddle
```

7. 把 Paddle 相关资料填到 Zeabur Variables。
8. 重新部署 Zeabur。
9. 到网站里完成一次测验。
10. 点击付款，确认能跳到 Paddle sandbox checkout。
11. 用测试卡付款。
12. 确认 webhook 让报告自动解锁。

给 Codex 的提示词：

```text
我已经有 Zeabur HTTPS 域名，现在要接 Paddle。

请把支付 provider 从 mock 扩展成 paddle。

要求：
1. 创建 checkout 时调用 Paddle create transaction API。
2. 把 reportId 和 payment_session_id 写进 custom_data。
3. webhook 只接受 transaction.completed 后解锁。
4. 验签失败不能解锁。
5. 金额不符不能解锁。
6. price id 不符不能解锁。
7. 保留 mock provider，方便本地测试。
```

验收标准：

- 后端能返回 Paddle checkout URL。
- Paddle sandbox 付款后，webhook 能把 session 改成 `paid`。
- `transaction.paid` 不直接解锁，只用 `transaction.completed`。

> 💡 **为什么这样做？**
> Sandbox 是支付平台提供的测试环境。你可以验证完整付款流程，但不会真的向用户收钱。等 sandbox 跑通，再切 live。

### 第 6 步：切到 Paddle live

**【本步核心】把测试支付切换成真实收款前，确认账户、价格、Webhook 和安全开关都在正式环境。**

上线前逐项检查：

1. Paddle onboarding 已完成。
2. Default payment link 已设置并通过域名验证。
3. Product 是 live 环境建立的。
4. Price 是 live 环境建立的。
5. Zeabur 的 `PADDLE_API_KEY` 换成 live key。
6. Zeabur 的 price id 换成 live price id。
7. Zeabur 的 webhook secret 换成 live secret。
8. Webhook destination 指向正式域名。
9. 付费墙开关 `enabled` 才打开。
10. 0 元测试按钮、mock 按钮、直接跳结果页按钮都已关闭。

> 💡 **为什么这样做？**
> Sandbox 和 live 是两套资料。测试 key、测试 price、测试 webhook secret 不能混到正式环境里。切换 live 时要整套替换。

### 你需要填写哪些环境变量

**【本节核心】本地开发可以用 `.env.payment.local`，部署到 Zeabur 时要填到 Zeabur Variables。**

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

> 💡 **为什么这样做？**
> 环境变量像部署平台保管的后台设置。公开网页文件像展示柜，任何人都可能看到；后台设置则只给服务器读取。

### 你应该怎么使用 Codex

**【本节核心】每次只给 Codex 一个小目标，做完就运行和验收。**

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

> 💡 **为什么这样做？**
> Codex 很适合连续完成小任务。你给它一个明确目标、一个验收方式，它就比较容易交付可检查的结果。

## 章节目录

1. [产品流程怎么拆](01-product-flow.md)
2. [怎么让 Codex 从 0 帮你建站](02-codex-build-workflow.md)
3. [先上传到 GitHub，准备给 Zeabur 部署](03-upload-to-github.md)
4. [部署到 Zeabur，拿到可验证域名](04-zeabur-deployment.md)
5. [有域名后，再接 Paddle 付款与自动解锁](05-payment-unlock.md)
6. [可复制提示词模板](06-prompt-templates.md)
7. [上线检查清单](07-launch-checklist.md)
8. [内置界面截图图册](08-visual-walkthrough.md)

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
