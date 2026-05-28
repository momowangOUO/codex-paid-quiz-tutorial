# 03. 先上傳到 GitHub，準備給 Zeabur 部署

![GitHub upload chapter art](../../assets/chapters/chapter-03-github.webp)
這一章放在 Zeabur 前面。

**【本章核心】先把本機專案上傳到 GitHub 倉庫，因為 Zeabur 通常是從 GitHub 拉程式碼來部署。 **

你可以把三者關係理解成：

```text
你的電腦：寫程式碼和測試的地方
GitHub：存放程式碼的雲端倉庫
Zeabur：從 GitHub 取程式碼，並把它跑成網站
```

> 💡 **為什麼要這樣做？ **
> Zeabur 不是直接讀你電腦桌面的檔案。它通常會連接你的 GitHub 倉庫，然後每次你更新倉庫，它再重新部署。 GitHub 在這裡像“專案中轉站”，Zeabur 像“把中轉站裡的專案開機運行的人”。

### 第 1 步：確認你已經有 GitHub 帳號

**【本步驟核心】你需要一個 GitHub 帳號，用來儲存專案代碼。 **

接下來是具體的執行步驟：

1. 開啟 GitHub 官網。
2. 如果你已經登錄，繼續下一步。
3. 如果你還沒有帳號，註冊一個帳號。
4. 記住你的 GitHub 用戶名，後面倉庫地址會用到它。

> 💡 **為什麼要這樣做？ **
> GitHub 是程式設計師常用的程式碼倉庫平台。倉庫可以理解成“一個專案專用的雲端資料夾”，裡面保存每一個重要修改。

### 第 2 步：在 GitHub 建立一個新倉庫

**【本步核心】建立一個專門存放網站程式碼的 repo。 **

接下來是具體的執行步驟：

1. 開啟 GitHub。
2. 點右上角的 `+`。
3. 選擇 `New repository`。
4. 在 `Repository name` 填入項目名稱，例如：

```text
paid-quiz-site
```

5. `Description` 可以先寫：

```text
A paid quiz website built with Codex.
```

6. Visibility 可以選 `Public` 或 `Private`。
7. 如果你還沒有本地項目，你可以勾選 `Add a README file`。
8. 如果你已經有本地項目，建議先不要勾選 README，避免和本機文件衝突。
9. 點 `Create repository`。

> 💡 **為什麼要這樣做？ **
> Repo 是 repository 的簡稱，意思是倉庫。一個 repo 對應一個項目。你的網站程式碼、說明文件、部署配置，都會放在這個倉庫裡。

### 第 3 步：先檢查不要上傳 secret

**【本步核心】在第一次上傳前，先確認金鑰、訂單、後台資料不會被推到 GitHub。 **

不要上傳這些內容：

- `.env`
- `.env.payment.local`
- Paddle API key
- Paddle webhook secret
- Admin token
- 真實訂單資料
- 支付平台後台畫面
- `node_modules`
- `dist`
- 日誌檔案

專案根目錄應該有 `.gitignore`。建議至少包含：

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

你可以請 Codex 幫你檢查：

```text
請檢查這個專案是否適合上傳 GitHub。

要求：
1. .gitignore 必須排除 .env、.env.*、*.local、node_modules、dist、日誌和臨時檔案。
2. 掃描項目，確認沒有 Paddle API key、webhook secret、admin token。
3. 如果發現 secret，請告訴我文件路徑，並建議我撤銷或更換對應 key。
4. 不要删除我的业务代码。
```

> 💡 **為什麼要這樣做？ **
> GitHub 適合保存程式碼，不適合保存鑰匙。 API key 像後台鑰匙，一旦進入公開倉庫或提交歷史，就應該當作已經暴露，後續需要重新生成。

### 第 4 步：確認本機已經安裝 Git

**【本步核心】Git 是把本機專案提交到 GitHub 的工具。 **

在終端執行：```bash
git --version
```

如果看到類似：

```text
git version 2.x.x
```

說明已經安裝。

如果系統提示找不到 `git`，請先安裝 Git，再繼續。

> 💡 **為什麼要這樣做？ **
> Git 是「版本記錄工具」。它會記錄你改了哪些文件，也能把本機程式碼推送到 GitHub。 GitHub 是雲端平台，Git 是你本機用來和 GitHub 溝通的工具。

### 第 5 步：在專案根目錄初始化 Git

**【本步核心】如果你的專案還不是 Git 倉庫，就先讓它變成 Git 倉庫。 **

在專案根目錄執行：```bash
git status
```

如果看到文件狀態，表示它已經是 Git 倉庫。

如果看到類似：

```text
fatal: not a git repository
```

就執行：```bash
git init
```

然後再執行：```bash
git status
```

> 💡 **為什麼要這樣做？ **
> `git init` 像是在專案資料夾裡放一本「修改記錄簿」。從這一刻開始，Git 才知道要追蹤這個專案。

### 第 6 步：把文件加入第一次提交

**【本步核心】把目前專案狀態保存成一個 commit。 **

執行：```bash
git add .
git commit -m "Initial paid quiz website"
```

如果 Git 提示你設定姓名和郵箱，按它給出的提示設置，例如：```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

然後再執行一次：```bash
git commit -m "Initial paid quiz website"
```

> 💡 **為什麼要這樣做？ **
> Commit 可以理解成一次「存檔」。你不是把檔案散亂地丟給 GitHub，而是先在本機保存一個明確版本，再推送這個版本。

### 第 7 步：連接 GitHub 遠端倉庫

**【本步核心】告訴本機 Git：這個專案要推到哪個 GitHub 倉庫。 **

GitHub 蓋好倉庫後，會給你一個地址，通常長這樣：

```text
https://github.com/你的使用者名稱/你的倉庫名稱.git
```

在終端執行：```bash
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
```

如果它提示 `origin already exists`，表示已經有遠端位址。你可以查看：```bash
git remote -v
```

如果地址錯了，可以改成：```bash
git remote set-url origin https://github.com/你的用户名/你的仓库名.git
```

> 💡 **為什麼要這樣做？ **
> `origin` 是本機 Git 對遠端倉庫的暱稱。你告訴 Git：以後我說要推到 origin，就是推到這個 GitHub 倉庫。

### 第 8 步：推送到 GitHub

**【本步核心】把本機 commit 上傳到 GitHub。 **

執行：```bash
git push -u origin main
```

第一次推播時，GitHub 可能會要求你登入或授權。

推送成功後：

1. 開啟 GitHub 倉庫頁面。
2. 刷新網頁。
3. 確認能看到你的專案文件。
4. 確認 README 正常顯示。
5. 確認 `.env`、`.env.payment.local` 沒有出現在倉庫。

> 💡 **為什麼要這樣做？ **
> `git push` 就是「把本機存檔上傳到雲端倉庫」。 Zeabur 後面會讀取 GitHub 上的這份程式碼，而不是讀取你電腦裡的資料夾。

### 第 9 步：之後每次改完都用三步驟更新

**【本步核心】以後修改網站後，用 add、commit、push 三步驟同步到 GitHub。 **

每次改完後執行：```bash
git status
git add .
git commit -m "Describe what changed"
git push
```

提交訊息可以寫具體一點，例如：```bash
git commit -m "Add Paddle webhook unlock flow"
```

或：```bash
git commit -m "Improve unpaid report preview"
```

> 💡 **為什麼要這樣做？ **
> Zeabur 通常會監聽 GitHub 倉庫變更。你推新 commit 後，Zeabur 才知道線上服務需要重新部署。

### 第 10 步：上傳後再進入 Zeabur

**【本步核心】確認 GitHub 倉庫已經有程式碼，再去 Zeabur 選擇這個倉庫部署。 **

在進入下一章前，請確認：

1. GitHub 倉庫頁面能開啟。
2. README 能顯示。
3. 主要程式碼檔案已經上傳。
4. `.env`、`.local`、API key 沒有上傳。
5. 你知道倉庫地址，例如：

```text
https://github.com/你的使用者名稱/paid-quiz-site
```

下一章會在 Zeabur 裡選擇這個倉庫。

> 💡 **為什麼要這樣做？ **
> Zeabur 的部署入口通常是「選擇一個 GitHub repo」。如果倉庫還沒有程式碼，Zeabur 就沒有東西可以部署。

### 本章完成標準

**【本章核心】你要能在 GitHub 上看到完整項目，並確認沒有洩漏密鑰。 **

完成後請逐項確認：

1. GitHub 倉庫已經建立。
2. 本機專案已經 `git commit`。
3. 本機專案已經 `git push`。
4. GitHub 頁面能看到專案文件。
5. `.env` 沒有上傳。
6. `.env.payment.local` 沒有上傳。
7. API key、webhook secret、admin token 沒有出現在倉庫裡。
8. 你已經準備好去 Zeabur 選擇這個倉庫部署。