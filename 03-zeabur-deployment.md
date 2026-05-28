# 03. 先部署到 Zeabur，拿到可验证域名

这一章要先做部署，不是先做 Paddle。

原因很简单：Paddle 通常会要求你提供可验证的网站域名、default payment link、条款页面、隐私政策和退款说明。你没有 HTTPS 域名时，很多 Paddle 设置只能停在半路。

所以正确顺序是：

```text
本地 mock 流程跑通
  -> 推到 GitHub
  -> 部署到 Zeabur
  -> 拿到 HTTPS 域名
  -> 准备 pricing / terms / privacy / refund 页面
  -> 再回 Paddle 做网站验证与 checkout 设置
```

## Zeabur 是什么

Zeabur 是一个把 GitHub 项目部署成线上服务的平台。你可以把它理解成：

```text
GitHub 放代码
Zeabur 帮你把代码跑起来
```

对这个教程，它负责：

- 从 GitHub 拉取你的项目。
- 执行 `npm run build`。
- 执行 `npm run start`。
- 给你一个 HTTPS 域名。
- 保存环境变量。
- 挂载 `/data`，保存订单和解锁记录。

## 这一章还不需要 Paddle key

这一章的目标只是让网站上线，并确认：

- 首页能打开。
- API 能打开。
- mock 支付还能跑。
- `/api/health` 能访问。
- 你拿到了一个 HTTPS 域名。

如果 Paddle 还没审核，不影响这一章。

## 第 1 步：确认项目能本地 build

在本机项目根目录跑：

```bash
npm install
npm run build
```

如果失败，把错误贴给 Codex：

```text
npm run build 失败了，这是错误日志：
[贴日志]
请修复到可以部署到 Zeabur。
```

## 第 2 步：确认 start 使用 Zeabur 的 PORT

Node 后端不要写死端口。推荐：

```js
const port = Number(process.env.PORT ?? 8080);
const serverHost = process.env.PAYMENT_SERVER_HOST ?? "0.0.0.0";

server.listen(port, serverHost, () => {
  console.log(`payment server: http://${serverHost}:${port}/api`);
});
```

在 Zeabur 这类容器环境，`0.0.0.0` 是正确的。它表示服务可以被容器外部访问。

## 第 3 步：推到 GitHub

```bash
git status
git add .
git commit -m "Prepare Zeabur deployment"
git push origin main
```

不要提交这些文件：

- `.env`
- `.env.payment.local`
- `node_modules`
- `dist`
- 日志文件
- 真实订单资料

## 第 4 步：在 Zeabur 新建服务

在 Zeabur：

1. New Project。
2. 选择 GitHub。
3. 选择你的仓库。
4. Region 优先选 Singapore 或 Hong Kong 附近地区。
5. 让 Zeabur 自动检测 Node 项目。

如果它要求你填命令：

```text
Build Command: npm run build
Start Command: npm run start
```

![Zeabur 服务部署示意](assets/screenshots/01-zeabur-deploy.svg)

## 第 5 步：先填 mock 可用的环境变量

先不要填 Paddle live key。第一轮只确认服务跑得起来。

Zeabur Variables 建议先填：

```bash
PAYMENT_SERVER_HOST=0.0.0.0
PAYMENT_STORE_FILE=/data/payment-store.json
PUBLIC_BASE_URL=https://你的-zeabur-域名
CORS_ORIGIN=https://你的-zeabur-域名
PADDLE_ENVIRONMENT=sandbox
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

如果你的后端要求 Paddle key 才能启动，让 Codex 调整：Paddle provider 未启用时，不应该因为缺少 key 导致整个服务崩掉。

![Zeabur 环境变量示意](assets/screenshots/02-zeabur-variables.svg)

## 第 6 步：挂载 `/data`

如果你用 JSON 文件保存 payment session 和 report access，就要挂载持久化目录。

在 Zeabur 新增 Volume：

```text
Mount path: /data
```

并确认：

```bash
PAYMENT_STORE_FILE=/data/payment-store.json
```

否则服务重启后，订单和解锁记录可能消失。

![Zeabur Volume 示意](assets/screenshots/03-zeabur-volume.svg)

## 第 7 步：取得 HTTPS 域名

部署成功后，你会拿到类似：

```text
https://your-project.zeabur.app
```

先打开：

```text
https://你的域名/
https://你的域名/api/health
https://你的域名/monetization.json
```

确认：

- 首页能打开。
- `/api/health` 不泄漏 secret。
- `/monetization.json` 不含 Paddle API key 或 webhook secret。
- mock 支付流程仍能测试。

## 第 8 步：准备 Paddle 需要的公开页面

Paddle 可能会要求你的网站包含：

```text
/pricing
/terms
/privacy
/refund
```

这些页面可以很简单，但要清楚：

- 你卖什么。
- 用户付款后得到什么。
- 价格是多少。
- 退款规则是什么。
- 怎么提出问题或合作讨论。

这一步放在 Paddle 前面，是为了避免你进 Paddle 后发现没有 URL 可以填。

## 给 Codex 的提示词

```text
请帮我检查项目是否可以部署到 Zeabur。

要求：
1. npm run build 可以成功
2. npm run start 可以启动单 Node 服务
3. 服务监听 process.env.PORT
4. host 使用 0.0.0.0
5. 同一个服务提供前端 dist 和 /api
6. 提供 /api/health，且不泄漏 secret
7. Paddle provider 没启用时，缺少 Paddle key 不应导致服务崩溃
8. PAYMENT_STORE_FILE 可以指向 /data/payment-store.json
9. public/monetization.json 不包含任何 secret

请直接修复，并告诉我 Zeabur Variables 应该填什么。
```

## 本章完成标准

完成后你应该有：

- 一个可以访问的 Zeabur HTTPS 域名。
- 一个稳定运行的 Node 服务。
- 一个可访问的 `/api/health`。
- 一个可挂到 Paddle 的 webhook 地址：

```text
https://你的域名/api/webhooks/paddle
```

下一章再回 Paddle，用这个域名完成网站验证、default payment link、webhook 和 checkout。
