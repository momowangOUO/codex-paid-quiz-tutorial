# 04. 部署到 Zeabur

先部署到 Zeabur，再去 Paddle。因为 Paddle 通常需要你提供可访问的 HTTPS 域名、价格页、条款页、隐私政策和退款政策。

![先拿到 Zeabur 域名，再配置 Paddle](../../assets/screenshots/07-domain-before-paddle.svg)

## Zeabur 是什么

Zeabur 可以把你的 GitHub 仓库自动部署成线上服务。对新手来说，你只需要关心三件事：

1. Build Command：怎么把网站打包。
2. Start Command：怎么启动 Node 服务。
3. Variables：线上环境变量，例如 Paddle API key。

## 创建服务

![Zeabur deploy flow](../../assets/screenshots/01-zeabur-deploy.svg)

1. 登录 Zeabur。
2. 创建 Project。
3. 选择从 GitHub 部署。
4. 选择你的仓库和 main 分支。
5. Region 优先选 Singapore 或 Hong Kong。
6. Build Command 填：

```text
npm run build
```

7. Start Command 填：

```text
npm run start
```

## 设置环境变量

![Zeabur variables](../../assets/screenshots/02-zeabur-variables.svg)

先填基础变量：

```bash
PAYMENT_SERVER_HOST=0.0.0.0
PAYMENT_STORE_FILE=/data/payment-store.json
PUBLIC_BASE_URL=https://你的-zeabur-域名
CORS_ORIGIN=https://你的-zeabur-域名
PADDLE_ENVIRONMENT=sandbox
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

说明：正式环境监听 `0.0.0.0` 是正确的。它不是让外界绕过安全，而是让 Zeabur 的代理能连到你的 Node 服务。

## 挂载 /data

![Zeabur volume](../../assets/screenshots/03-zeabur-volume.svg)

付款 session、解锁记录和报告访问 token 需要持久化。早期最简单的做法是挂载一个 volume：

```text
Mount path: /data
```

然后确认环境变量：

```bash
PAYMENT_STORE_FILE=/data/payment-store.json
```

## 部署后验收

打开这些地址：

- `https://你的域名/`
- `https://你的域名/api/health`
- `https://你的域名/monetization.json`

`/api/health` 应该能显示服务状态，但不能显示 secret。
