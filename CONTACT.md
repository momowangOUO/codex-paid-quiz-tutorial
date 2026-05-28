# 合作与联系

这个仓库不直接公开私人微信、邮箱或付款后台信息。Git 没有私信功能，GitHub Issue / Discussion 也都是公开页面，所以合作与案例交流建议改用表单承接。

网站入口：[合作与案例交流](collaboration.html)

当前合作表单：[Codex 付费网站教程｜合作与案例交流](https://docs.google.com/forms/d/e/1FAIpQLSet3g2cL32ZElYICNwvxaq27R0pxqyoHw2AK5bQHjDzNQwlUg/viewform)

## 推荐联系流程

1. 先建立一个 Google 表单、Tally 或 Typeform。
2. 表单用于收集合作主题、项目阶段、希望交流的方向，以及对方自愿留下的回复方式。
3. 把表单公开链接填到 [collaboration.html](collaboration.html) 的主按钮里；当前已接入 Google 表单。
4. GitHub Issue 只保留给公开勘误、文档补充、截图补充和 PR 讨论。

如果想快速生成 Google 表单，可以使用 [tools/create-google-contact-form.gs](tools/create-google-contact-form.gs)：

1. 打开 <https://script.google.com/>。
2. 建立新项目，把脚本内容贴进去。
3. 执行 `createCollaborationContactForm()`，按 Google 提示授权。
4. 在执行日志里复制「公开填写链接」。
5. 把 [collaboration.html](collaboration.html) 里的按钮链接替换成这个公开填写链接。

## 中文 Google 表单建议内容

表单标题：

```text
Codex 付费网站教程｜合作与案例交流
```

表单说明：

```text
请简短说明你想做的产品、目前卡点和希望交流的方向。不要提交 API key、付款后台截图、订单资料或用户隐私资料。
```

建议字段：

1. 你的称呼或团队名称
2. 你想交流或合作的主题
3. 目前进度：想法阶段、开发中、已上线、想优化
4. 你希望得到什么帮助：技术建议、案例交流、共创、访谈、其他
5. 可公开查看的网址或 GitHub 仓库，如果有
6. 你愿意留下的回复方式
7. 补充说明

## 适合讨论的话题

- 用 Codex 从 0 搭建测验或报告网站。
- Paddle、Stripe、Lemon Squeezy 等付款平台接入。
- 付款后自动解锁报告、webhook、访问权限设计。
- Zeabur、Render、Railway、Fly.io 等部署平台。
- 付费墙、免费预览、报告保存、转化路径。
- 心理学、教育、职业咨询、游戏化机制与 AI 报告产品。

## 不适合公开提交的内容

- 私人联系方式。
- API key、webhook secret、admin token。
- 支付后台、订单后台、用户资料截图。
- 未公开的商业数据。
- 任何你不希望被搜索引擎收录的内容。

公开修正文档或补充教程时，可以使用 [GitHub Issue](https://github.com/momowangOUO/codex-paid-quiz-tutorial/issues/new?template=collaboration.yml)。
