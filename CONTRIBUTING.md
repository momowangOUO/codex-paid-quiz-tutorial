# Contributing

欢迎一起把这份教程变成更好用的开源资料。你可以贡献：

- 翻译：繁中、英文、日文、韩文或其他语言。
- 支付平台补充：Stripe、Lemon Squeezy、FastSpring、PayPal、爱发电、小报童等。
- 部署平台补充：Zeabur、Render、Railway、Fly.io、Vercel、Cloudflare。
- 截图：Paddle、Zeabur、GitHub Pages、Webhook 设置等。
- 勘误：错字、坏链接、过期后台路径、配置遗漏。
- 安全建议：Webhook 验签、secret 管理、访问权限、订单恢复。

## 协作原则

- 不要提交真实 API key、订单、客户资料或私人截图。
- 不要把某一个支付平台写成唯一答案。
- 如果你补充的是平台后台截图，请打码账号、订单、密钥、邮箱。
- 如果你改的是付款流程，请说明适用平台和限制。
- 如果你翻译文档，请保持术语一致，不要删掉安全提醒。

## 语言文件

当前入口文件：

- `README.md`: 简体中文
- `README.zh-TW.md`: 繁體中文
- `README.en.md`: English
- `README.ja.md`: 日本語
- `README.ko.md`: 한국어

章节目前以简体中文为主。如果你愿意翻译完整章节，可以新增：

```text
i18n/en/
i18n/zh-TW/
i18n/ja/
i18n/ko/
```

## 提交建议

Issue 标题示例：

```text
[Payment] Add Stripe checkout notes
[Docs] Fix Zeabur volume instructions
[i18n] Translate README to Spanish
[Security] Clarify webhook signature check
```

Pull Request 建议包含：

1. 你改了什么。
2. 适用的平台或语言。
3. 是否需要截图。
4. 是否涉及安全或付款逻辑。

谢谢你的贡献。

