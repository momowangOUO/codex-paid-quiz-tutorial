# 04. 部署到 Zeabur，拿到可验证域名

这一章默认你已经完成上一章，把项目上传到了 GitHub。现在要把 GitHub 仓库部署到 Zeabur。

**【本章核心】先让你的网站拥有一个可以公开访问的 HTTPS 域名，再拿这个域名去 Paddle 做网站验证、default payment link 和 webhook。**

推荐顺序是：

```text
本地 mock 流程跑通
  -> 上传到 GitHub
  -> 部署到 Zeabur
  -> 拿到 HTTPS 域名
  -> 准备 pricing / terms / privacy / refund 页面
  -> 再回 Paddle 做网站验证与 checkout 设置
```

> 💡 **为什么这样做？**
> Paddle 在创建真实付款页前，通常会检查你的网站是否存在、是否能打开、是否有条款和隐私政策。你还没有公开域名时，就像还没有店面地址却想申请收银台，很多设置会卡在半路。

![部署到收款顺序示意](../../assets/diagrams/07-domain-before-paddle.svg)

### 第 1 步：先确认你手上的项目可以在本机运行

**【本步核心】先确认项目在你电脑上能安装、能 build，再拿去 Zeabur 部署。**

接下来是具体的执行步骤：

1. 打开项目资料夹。
2. 在项目根目录打开终端。
3. 执行：

```bash
npm install
npm run build
```

4. 如果 `npm run build` 成功，继续下一步。
5. 如果失败，把完整错误贴给 Codex：

```text
npm run build 失败了，这是错误日志：
[贴上完整日志]

请帮我修复到可以部署到 Zeabur。
修复后请再跑一次 npm run build。
```

> 💡 **为什么这样做？**
> Zeabur 部署时也会跑 build。本机 build 失败，云端通常也会失败。先在自己电脑修好，可以减少来回猜错的时间。

### 第 2 步：确认后端不是写死端口

**【本步核心】Node 后端必须监听 Zeabur 给它的 `PORT`，并使用 `0.0.0.0` 让外部访问。**

请让 Codex 检查后端启动代码，目标写法类似这样：

```js
const port = Number(process.env.PORT ?? 8080);
const serverHost = process.env.PAYMENT_SERVER_HOST ?? "0.0.0.0";

server.listen(port, serverHost, () => {
  console.log(`payment server: http://${serverHost}:${port}/api`);
});
```

你可以直接复制这段提示词给 Codex：

```text
请检查 server 启动代码。

要求：
1. 端口必须优先读取 process.env.PORT。
2. host 默认使用 0.0.0.0。
3. 不要写死 localhost。
4. 保留本地开发可用的默认端口，例如 8080。
5. 修改后请说明 Zeabur 为什么需要这样设置。
```

> 💡 **为什么这样做？**
> 在自己电脑上，`localhost` 像是“只给自己开的门”。在 Zeabur 容器里，如果服务只开给自己，外部用户就进不来。`0.0.0.0` 的意思是“这个服务可以被容器外部访问”。

### 第 3 步：确认项目有生产启动命令

**【本步核心】Zeabur 需要知道怎么 build、怎么 start。**

打开 `package.json`，确认至少有：

```json
{
  "scripts": {
    "build": "npm run build:runtime-careers && tsc --noEmit && node scripts/vite-build.mjs",
    "start": "node server/payment-server.mjs"
  }
}
```

不同项目的 `build` 内容可以不同，但原则相同：

1. `npm run build` 负责生成前端静态文件。
2. `npm run start` 负责启动线上服务。
3. 线上服务要同时提供前端页面和 `/api/*`。

给 Codex 的提示词：

```text
请检查 package.json 是否适合 Zeabur 部署。

要求：
1. npm run build 可以生成生产文件。
2. npm run start 可以启动单个 Node 服务。
3. 这个 Node 服务要同时提供前端 dist 和 /api/*。
4. 如果缺少 scripts，请直接补上。
```

> 💡 **为什么这样做？**
> Zeabur 不是在你的电脑里点“预览按钮”。它只会按命令执行。build 像是“把网站打包”，start 像是“把打包好的网站端出来给别人访问”。

### 第 4 步：确认 GitHub 仓库已经是最新版本

**【本步核心】进入 Zeabur 前，先确认 GitHub 上已经有你要部署的最新代码。**

接下来是具体的执行步骤：

1. 打开你的 GitHub 仓库页面。
2. 确认 README 能正常显示。
3. 确认最新 commit 是你刚刚推送的版本。
4. 在本机终端执行：

```bash
git status
```

5. 如果有未提交修改，先回到上一章的流程 `git add`、`git commit`、`git push`。
6. 确认 `.env`、`.env.payment.local` 没有出现在 GitHub 文件列表里。

再次确认不要提交这些文件：

- `.env`
- `.env.payment.local`
- `node_modules`
- `dist`
- 日志文件
- 真实订单资料
- Paddle API key
- Webhook secret

> 💡 **为什么这样做？**
> Zeabur 会从 GitHub 拉代码。你电脑里的修改如果还没 push，Zeabur 就看不到。GitHub 页面显示什么，Zeabur 大多就会拿到什么。

### 第 5 步：在 Zeabur 新建服务

**【本步核心】让 Zeabur 连接你的 GitHub 仓库，并把代码部署成网站。**

接下来是具体的执行步骤：

1. 打开 Zeabur。
2. 新建 Project。
3. 选择从 GitHub 部署。
4. 如果 Zeabur 要求授权 GitHub，按页面提示授权。
5. 在仓库列表里选择上一章上传的仓库。
6. 选择分支，通常是 `main`。
7. Region 优先选 Singapore 或 Hong Kong 附近地区。
8. 让 Zeabur 自动检测 Node 项目。
9. 如果它要求你填写命令，填：

```text
Build Command: npm run build
Start Command: npm run start
```

![Zeabur 服务部署示意](../../assets/diagrams/01-zeabur-deploy.svg)

> 💡 **为什么这样做？**
> Region 是服务器所在地区。你的用户如果主要在亚洲，选择新加坡或香港附近地区，访问路径通常会更短。这里不需要大陆服务器，也就不把 ICP 备案放在第一步。

### 第 6 步：先填最少环境变量

**【本步核心】第一轮部署只为了让网站跑起来，不需要立刻填 Paddle live key。**

在 Zeabur 的 Variables 里先填：

```bash
PAYMENT_SERVER_HOST=0.0.0.0
PAYMENT_STORE_FILE=/data/payment-store.json
PUBLIC_BASE_URL=https://你的-zeabur-域名
CORS_ORIGIN=https://你的-zeabur-域名
PADDLE_ENVIRONMENT=sandbox
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

如果你还没有 Zeabur 域名，可以先部署一次，拿到域名后再回来把：

```bash
PUBLIC_BASE_URL=
CORS_ORIGIN=
```

改成真正的网址。

![Zeabur 环境变量示意](../../assets/diagrams/02-zeabur-variables.svg)

> 💡 **为什么这样做？**
> 环境变量像是“部署平台帮你保管的小纸条”。代码可以读取这些值，但它们不会被打包进前端公开文件。Paddle API key 以后也应该放在这里，而不是写进网页代码。

### 第 7 步：挂载 `/data`

**【本步核心】给后端一个不会因为重启就丢失的存储位置。**

接下来是具体的执行步骤：

1. 在 Zeabur 服务里找到 Volume 或 Storage 设置。
2. 新增一个 volume。
3. Mount path 填：

```text
/data
```

4. 确认环境变量有：

```bash
PAYMENT_STORE_FILE=/data/payment-store.json
```

![Zeabur Volume 示意](../../assets/diagrams/03-zeabur-volume.svg)

> 💡 **为什么这样做？**
> 如果订单和解锁记录只存在服务临时目录，服务重启后可能消失。`/data` volume 像是给服务接了一个可持续保存的小硬盘。

### 第 8 步：打开线上网址并检查三个页面

**【本步核心】确认网站、API、公开配置都能被外部访问。**

部署成功后，你会拿到类似：

```text
https://your-project.zeabur.app
```

请逐一打开：

```text
https://你的域名/
https://你的域名/api/health
https://你的域名/monetization.json
```

你要确认：

1. 首页能打开。
2. `/api/health` 会返回服务状态。
3. `/api/health` 不显示任何 secret。
4. `/monetization.json` 可以访问。
5. `/monetization.json` 不包含 Paddle API key 或 webhook secret。
6. mock 付款流程仍能测试。

> 💡 **为什么这样做？**
> Paddle 后面会从外部访问你的网站。你自己能打开本机网页不够，必须确认公开网址真的能被访问。

### 第 9 步：准备 Paddle 需要的公开页面

**【本步核心】先准备付款平台会看的基础说明页，避免进入 Paddle 后没有 URL 可以填。**

Paddle 可能会要求：

```text
/pricing
/terms
/privacy
/refund
```

这些页面可以先很朴素，但至少要说明：

1. 你卖的是什么。
2. 用户付款后会得到什么。
3. 价格是多少。
4. 是否一次性购买。
5. 退款规则是什么。
6. 用户遇到问题该从哪里联系你。

给 Codex 的提示词：

```text
请帮我新增 Paddle 审核需要的公开页面：

1. /pricing
2. /terms
3. /privacy
4. /refund

要求：
- 文字清楚、保守、不要夸大效果。
- 不要承诺就业、收入或治疗效果。
- 每个页面都能通过 Zeabur 域名直接访问。
- 页面中不要出现 API key、订单资料或私人联系方式。
```

> 💡 **为什么这样做？**
> 付款平台需要判断你卖的东西是否清楚、用户是否知道自己买了什么、出现争议时有没有规则。页面可以简洁，但不能空白或含糊。

### 第 10 步：把这个域名留给 Paddle

**【本步核心】把 Zeabur 域名当成下一章 Paddle 设置的基础。**

完成本章后，先记录这三个值：

```text
网站首页：https://你的域名/
Webhook URL：https://你的域名/api/webhooks/paddle
健康检查：https://你的域名/api/health
```

下一章会把它们填进 Paddle。

> 💡 **为什么这样做？**
> 这一步像是在开店前先拿到门牌号。门牌号确定后，收银台、付款通知、用户回跳页面才有地方可去。

### 本章完成标准

**【本章核心】你要能证明网站已经在线，而不是只在本机能跑。**

完成后请逐项确认：

1. GitHub 仓库是最新代码。
2. Zeabur 部署成功。
3. 首页能打开。
4. `/api/health` 能打开。
5. `/monetization.json` 不含 secret。
6. `/data` volume 已挂载。
7. 你已经拿到一个 HTTPS 域名。
8. 你已经知道 webhook URL 应该是：

```text
https://你的域名/api/webhooks/paddle
```

下一章再回 Paddle，用这个域名完成网站验证、default payment link、webhook 和 checkout。
