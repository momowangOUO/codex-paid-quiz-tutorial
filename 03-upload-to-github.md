# 03. 先上传到 GitHub，准备给 Zeabur 部署

这一章放在 Zeabur 前面。

**【本章核心】先把本机项目上传到 GitHub 仓库，因为 Zeabur 通常是从 GitHub 拉代码来部署。**

你可以把三者关系理解成：

```text
你的电脑：写代码和测试的地方
GitHub：存放代码的云端仓库
Zeabur：从 GitHub 取代码，并把它跑成网站
```

> 💡 **为什么这样做？**
> Zeabur 不是直接读取你电脑桌面的文件。它通常会连接你的 GitHub 仓库，然后每次你更新仓库，它再重新部署。GitHub 在这里像“项目中转站”，Zeabur 像“把中转站里的项目开机运行的人”。

### 第 1 步：确认你已经有 GitHub 账号

**【本步核心】你需要一个 GitHub 账号，用来保存项目代码。**

接下来是具体的执行步骤：

1. 打开 GitHub 官网。
2. 如果你已经登录，继续下一步。
3. 如果你还没有账号，注册一个账号。
4. 记住你的 GitHub 用户名，后面仓库地址会用到它。

> 💡 **为什么这样做？**
> GitHub 是程序员常用的代码仓库平台。仓库可以理解成“一个项目专用的云端资料夹”，里面保存每一次重要修改。

### 第 2 步：在 GitHub 建立一个新仓库

**【本步核心】建立一个专门存放网站代码的 repo。**

接下来是具体的执行步骤：

1. 打开 GitHub。
2. 点右上角的 `+`。
3. 选择 `New repository`。
4. 在 `Repository name` 填项目名称，例如：

```text
paid-quiz-site
```

5. `Description` 可以先写：

```text
A paid quiz website built with Codex.
```

6. Visibility 可以选 `Public` 或 `Private`。
7. 如果你还没有本地项目，可以勾选 `Add a README file`。
8. 如果你已经有本地项目，建议先不要勾选 README，避免和本机文件冲突。
9. 点 `Create repository`。

> 💡 **为什么这样做？**
> Repo 是 repository 的简称，意思是仓库。一个 repo 对应一个项目。你的网站代码、说明文件、部署配置，都会放在这个仓库里。

### 第 3 步：先检查不要上传 secret

**【本步核心】在第一次上传前，先确认密钥、订单、后台资料不会被推到 GitHub。**

不要上传这些内容：

- `.env`
- `.env.payment.local`
- Paddle API key
- Paddle webhook secret
- Admin token
- 真实订单资料
- 支付平台后台截图
- `node_modules`
- `dist`
- 日志文件

项目根目录应该有 `.gitignore`。建议至少包含：

```text
.env
.env.*
*.local
node_modules
dist
.logs
tmp-*
*.log
```

你可以让 Codex 帮你检查：

```text
请检查这个项目是否适合上传 GitHub。

要求：
1. .gitignore 必须排除 .env、.env.*、*.local、node_modules、dist、日志和临时文件。
2. 扫描项目，确认没有 Paddle API key、webhook secret、admin token。
3. 如果发现 secret，请告诉我文件路径，并建议我撤销或更换对应 key。
4. 不要删除我的业务代码。
```

> 💡 **为什么这样做？**
> GitHub 适合保存代码，不适合保存钥匙。API key 像后台钥匙，一旦进入公开仓库或提交历史，就应该当作已经暴露，后续需要重新生成。

### 第 4 步：确认本机已经安装 Git

**【本步核心】Git 是把本机项目提交到 GitHub 的工具。**

在终端执行：

```bash
git --version
```

如果看到类似：

```text
git version 2.x.x
```

说明已经安装。

如果系统提示找不到 `git`，请先安装 Git，再继续。

> 💡 **为什么这样做？**
> Git 是“版本记录工具”。它会记录你改了哪些文件，也能把本机代码推送到 GitHub。GitHub 是云端平台，Git 是你本机用来和 GitHub 沟通的工具。

### 第 5 步：在项目根目录初始化 Git

**【本步核心】如果你的项目还不是 Git 仓库，就先让它变成 Git 仓库。**

在项目根目录执行：

```bash
git status
```

如果看到文件状态，说明它已经是 Git 仓库。

如果看到类似：

```text
fatal: not a git repository
```

就执行：

```bash
git init
```

然后再执行：

```bash
git status
```

> 💡 **为什么这样做？**
> `git init` 像是在项目资料夹里放一本“修改记录簿”。从这一刻开始，Git 才知道要追踪这个项目。

### 第 6 步：把文件加入第一次提交

**【本步核心】把当前项目状态保存成一个 commit。**

执行：

```bash
git add .
git commit -m "Initial paid quiz website"
```

如果 Git 提示你设置姓名和邮箱，按它给出的提示设置，例如：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

然后再执行一次：

```bash
git commit -m "Initial paid quiz website"
```

> 💡 **为什么这样做？**
> Commit 可以理解成一次“存档”。你不是把文件散乱地丢给 GitHub，而是先在本机保存一个明确版本，再推送这个版本。

### 第 7 步：连接 GitHub 远端仓库

**【本步核心】告诉本机 Git：这个项目要推到哪个 GitHub 仓库。**

GitHub 建好仓库后，会给你一个地址，通常长这样：

```text
https://github.com/你的用户名/你的仓库名.git
```

在终端执行：

```bash
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
```

如果它提示 `origin already exists`，说明已经有远端地址。你可以查看：

```bash
git remote -v
```

如果地址错了，可以改成：

```bash
git remote set-url origin https://github.com/你的用户名/你的仓库名.git
```

> 💡 **为什么这样做？**
> `origin` 是本机 Git 对远端仓库的昵称。你告诉 Git：以后我说推到 origin，就是推到这个 GitHub 仓库。

### 第 8 步：推送到 GitHub

**【本步核心】把本机 commit 上传到 GitHub。**

执行：

```bash
git push -u origin main
```

第一次推送时，GitHub 可能会要求你登录或授权。

推送成功后：

1. 打开 GitHub 仓库页面。
2. 刷新网页。
3. 确认能看到你的项目文件。
4. 确认 README 正常显示。
5. 确认 `.env`、`.env.payment.local` 没有出现在仓库里。

> 💡 **为什么这样做？**
> `git push` 就是“把本机存档上传到云端仓库”。Zeabur 后面会读取 GitHub 上的这份代码，而不是读取你电脑里的资料夹。

### 第 9 步：之后每次改完都用三步更新

**【本步核心】以后修改网站后，用 add、commit、push 三步同步到 GitHub。**

每次改完后执行：

```bash
git status
git add .
git commit -m "Describe what changed"
git push
```

提交讯息可以写具体一点，例如：

```bash
git commit -m "Add Paddle webhook unlock flow"
```

或：

```bash
git commit -m "Improve unpaid report preview"
```

> 💡 **为什么这样做？**
> Zeabur 通常会监听 GitHub 仓库变化。你推送新 commit 后，Zeabur 才知道线上服务需要重新部署。

### 第 10 步：上传后再进入 Zeabur

**【本步核心】确认 GitHub 仓库已经有代码，再去 Zeabur 选择这个仓库部署。**

在进入下一章前，请确认：

1. GitHub 仓库页面能打开。
2. README 能显示。
3. 主要代码文件已经上传。
4. `.env`、`.local`、API key 没有上传。
5. 你知道仓库地址，例如：

```text
https://github.com/你的用户名/paid-quiz-site
```

下一章会在 Zeabur 里选择这个仓库。

> 💡 **为什么这样做？**
> Zeabur 的部署入口通常是“选择一个 GitHub repo”。如果仓库还没有代码，Zeabur 就没有东西可以部署。

### 本章完成标准

**【本章核心】你要能在 GitHub 上看到完整项目，并确认没有泄漏密钥。**

完成后请逐项确认：

1. GitHub 仓库已经建立。
2. 本机项目已经 `git commit`。
3. 本机项目已经 `git push`。
4. GitHub 页面能看到项目文件。
5. `.env` 没有上传。
6. `.env.payment.local` 没有上传。
7. API key、webhook secret、admin token 没有出现在仓库里。
8. 你已经准备好去 Zeabur 选择这个仓库部署。
