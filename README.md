# Codex 付费网站实作教程

**简体中文** · [繁體中文](README.zh-TW.md) · [English](README.en.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

![Codex paid site tutorial cover](assets/brand/tutorial-hero.webp)

这是一套从 0 到上线的实作教程，目标是带你做出一个可以收费解锁内容的网站。教程以「测验 / 付费报告」产品为例，把产品设计、Codex 协作、GitHub 上传、Zeabur 部署、Paddle 付款、Webhook 自动解锁和上线检查串成一条完整路径。

如果你觉得「会写网页」和「能让网页真的收钱上线」之间隔着一段很模糊的距离，这份教程就是用来补上那段距离的。

## 在线阅读

- [打开简体中文网页版教程](tutorial.html)
- [查看简体中文 Markdown 教程](docs/zh-CN/README.md)
- [查看示例配置文件](examples/README.md)
- [合作、反馈与翻译协作](collaboration.html)

## 你会完成什么

读完并照做以后，你应该能得到一个具备这些能力的项目：

- 一个清楚的付费产品流程：免费入口、测验或内容体验、付费墙、付款后解锁。
- 一个可以放到 GitHub 的项目仓库。
- 一个可以部署到 Zeabur 的网站和后端服务。
- 一个 Paddle Checkout 付款流程。
- 一个服务端 Webhook，用来确认付款并写入解锁状态。
- 一组安全的配置方式，避免把 API key、Webhook secret、admin token 放进前端或公开仓库。
- 一份上线前检查清单，帮助你检查域名、环境变量、付款、解锁和回滚方案。

## 适合谁

- 想用 Codex 或 AI 编程工具做出第一个可上线产品的人。
- 已经会一点前端，但还不熟 GitHub、部署、付款和 Webhook 的个人开发者。
- 想把测验、报告、模板、课程、工具或内容产品做成一次性付费解锁的人。
- 想学习如何把 AI 生成代码变成可维护项目的人。

## 你需要准备

- 一个 GitHub 账号。
- 一个 Zeabur 账号，或你熟悉的同类部署平台。
- 一个 Paddle 账号，用于接入国际付款。
- 一个可以运行 Codex 的本地环境。
- 一个准备做成付费内容的产品想法。

教程会尽量从零开始解释，但付款平台、域名验证和部署后台的界面可能会随时间变化。遇到界面变化时，请优先保持本教程讲的原则：前端只放公开配置，密钥只放服务端环境变量，付款成功必须由服务端 Webhook 确认。

## 学习路线

| 章节 | 内容 | 目标 |
| --- | --- | --- |
| 1 | [产品流程怎么拆](docs/zh-CN/01-product-flow.md) | 把「我要做一个付费网站」拆成用户路径、页面、数据和解锁逻辑。 |
| 2 | [怎么让 Codex 从 0 帮你建站](docs/zh-CN/02-codex-build-workflow.md) | 学会把需求交给 Codex，并通过小步迭代把项目搭起来。 |
| 3 | [上传到 GitHub](docs/zh-CN/03-upload-to-github.md) | 建仓库、提交代码、理解哪些文件不能上传。 |
| 4 | [部署到 Zeabur，拿到可验证域名](docs/zh-CN/04-zeabur-deployment.md) | 把项目部署成可访问的网站，并准备给付款平台验证。 |
| 5 | [有域名后，再接 Paddle 付款与自动解锁](docs/zh-CN/05-payment-unlock.md) | 建立 Checkout、Webhook、付款状态查询和报告解锁流程。 |
| 6 | [可直接复制的 Codex 提示词](docs/zh-CN/06-prompt-templates.md) | 使用可复用提示词，让 Codex 帮你设计、开发、排错和检查。 |
| 7 | [上线前检查清单](docs/zh-CN/07-launch-checklist.md) | 检查安全、付款、部署、内容、回滚和用户体验。 |

## 仓库结构

```text
codex-paid-quiz-tutorial/
  index.html                  多语言入口页
  tutorial*.html              各语言完整网页版教程
  README*.md                  各语言项目首页
  docs/
    zh-CN/                    简体中文 Markdown 教程
    zh-TW/                    繁体中文 Markdown 教程
    en/                       English Markdown tutorial
    ja/                       日本語 Markdown チュートリアル
    ko/                       한국어 Markdown 튜토리얼
  examples/                   可复制的付款配置与 API 契约示例
  assets/                     品牌图、章节图、流程图
  tools/                      维护协作表单的辅助脚本
```

## 安全原则

- 不要把 Paddle API key、Webhook secret、admin token、真实用户资料或付款日志提交到 GitHub。
- `public/monetization.json` 这类公开配置只能放价格、展示文字、付款方式名称和公开开关。
- 真正的密钥应该放在 Zeabur Variables 或服务端 `.env` 中。
- 不要只相信 URL 里的 `paid=true`，最终解锁必须由服务端确认付款状态。
- Webhook 签名验证应该在正式环境开启。

## 示例文件

- [public-monetization.example.json](examples/public-monetization.example.json)：公开付款配置示例。
- [env.payment.example](examples/env.payment.example)：服务端环境变量模板。
- [minimal-api-contract.md](examples/minimal-api-contract.md)：最小付款 API 契约。

## 贡献与反馈

- 文档修正请看 [CONTRIBUTING.md](CONTRIBUTING.md)。
- 私人合作、案例分享、翻译协作请看 [CONTACT.md](CONTACT.md) 或打开 [合作表单](collaboration.html)。
- 公开 issue 里不要贴 API key、付款后台截图、Webhook secret、用户资料或私人联系方式。

## 免责声明

本教程是工程与产品实作指南，不保证任何平台审核一定通过，也不保证上线后一定产生收入。付款、税务、退款、隐私政策和消费者保护要求会因地区而异，正式运营前请按你的市场和平台规则自行核对。
