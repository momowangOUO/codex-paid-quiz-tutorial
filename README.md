# 用 Codex 做出可收费网站

**简体中文** · [繁體中文](README.zh-TW.md) · [English](README.en.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

<p align="center">
  <img src="assets/brand/tutorial-mascot-logo-512.png" width="132" alt="Codex paid website tutorial logo" />
</p>

![Tutorial cover](assets/brand/tutorial-hero.webp)

> 从 0 到上线：测验产品、GitHub、Zeabur、Paddle 与自动解锁。

- 这份教程不是讲抽象原理，而是带你做出一个真的能收款、能自动解锁内容的网站。
- 顺序很重要：先做可运行网站，再部署到 Zeabur 拿到 HTTPS 域名，最后再去 Paddle 申请网站验证与付款。
- 如果你是 0 基础，照着章节走，把每一步交给 Codex 拆任务、改代码、检查结果。

## 教程目录

1. [产品与流程设计](docs/zh-CN/01-product-flow.md)
2. [用 Codex 搭出网站](docs/zh-CN/02-codex-build-workflow.md)
3. [上传到 GitHub](docs/zh-CN/03-upload-to-github.md)
4. [部署到 Zeabur](docs/zh-CN/04-zeabur-deployment.md)
5. [串接 Paddle 收费](docs/zh-CN/05-payment-unlock.md)
6. [提示词模板](docs/zh-CN/06-prompt-templates.md)
7. [上线检查清单](docs/zh-CN/07-launch-checklist.md)

## 你会做出什么

- 先做出一个可体验的免费测验与结果页。
- 用后端保存订单状态，避免靠 URL 参数假解锁。
- 把网站部署到 Zeabur，取得 Paddle 可验证的 HTTPS 域名。
- 用 Paddle Checkout 与 webhook 完成付款后自动解锁。
- 用检查清单确认上线前不会泄漏 secret。

## 相关链接

- [示范网站：The Calling Deconstructor](https://callingdeconstructor.zeabur.app/)
- [静态教程网站](https://momowangouo.github.io/codex-paid-quiz-tutorial/)
- [GitHub 仓库](https://github.com/momowangOUO/codex-paid-quiz-tutorial)
- [合作表单](https://docs.google.com/forms/d/e/1FAIpQLSet3g2cL32ZElYICNwvxaq27R0pxqyoHw2AK5bQHjDzNQwlUg/viewform)

If the live example is asleep, it may simply be taking a tiny server-budget nap. The tutorial itself still works.
