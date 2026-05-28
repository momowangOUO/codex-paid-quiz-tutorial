# 04. 部署到 Zeabur，拿到可驗證域名

![Zeabur deployment chapter art](../../assets/chapters/chapter-04-zeabur.webp)
這一章預設你已經完成上一章，把專案上傳到了 GitHub。現在要把 GitHub 倉庫部署到 Zeabur。

**【本章核心】先讓你的網站擁有一個可以公開訪問的 HTTPS 域名，再拿這個域名去 Paddle 做網站驗證、default payment link 和 webhook。 **

推薦順序是：

```text
本地 mock 流程跑通
  -> 上傳到 GitHub
  -> 部署到 Zeabur
  -> 拿到 HTTPS 域名
  -> 準備 pricing / terms / privacy / refund 頁面
  -> 再回 Paddle 做網站驗證與 checkout 設置
```

> 💡 **為什麼要這樣做？ **
> Paddle 在建立真實付款頁前，通常會檢查你的網站是否存在、是否能開啟、是否有條款和隱私權政策。你還沒公開網域時，就像還沒店面地址卻想申請收銀台，很多設定會卡在半路。

![部署到收款順序示意](../../assets/diagrams/07-domain-before-paddle.svg)

### 第 1 步：先確認你手上的項目可以在本機運行

**【本步核心】先確認專案在你電腦上能安裝、能 build，再拿去 Zeabur 部署。 **

接下來是具體的執行步驟：

1. 打開項目資料夾。
2. 在專案根目錄中開啟終端。
3. 執行：```bash
npm install
npm run build
```

4. 如果 `npm run build` 成功，繼續下一步。
5. 如果失敗，把完整錯誤貼給 Codex：

```text
npm run build 失敗了，這是錯誤日誌：
[貼上完整日誌]

請幫我修復到可以部署到 Zeabur。
修復後請再跑一次 npm run build。
```

> 💡 **為什麼要這樣做？ **
> Zeabur 部署時也會跑 build。本機 build 失敗，雲端通常也會失敗。先在自己電腦修好，可以減少來回猜錯的時間。

### 第 2 步：確認後端不是寫死端口

**【本步核心】Node 後端必須監聽 Zeabur 給它的 `PORT`，並使用 `0.0.0.0` 讓外部存取。 **

請讓 Codex 檢查後端啟動程式碼，目標寫法類似：```js
const port = Number(process.env.PORT ##  8080);
const serverHost = process.env.PAYMENT_SERVER_HOST ##  "0.0.0.0";

server.listen(port, serverHost, () => {
  console.log(`payment server: http://${serverHost}:${port}/api`);
});
```

你可以直接複製這段提示詞給 Codex：

```text
請檢查 server 啟動程式碼。

要求：
1. 連接埠必須優先讀取 process.env.PORT。
2. host 預設使用 0.0.0.0。
3. 不要寫死 localhost。
4. 保留本機開發可用的預設端口，例如 8080。
5. 修改後請說明 Zeabur 為什麼需要這樣設定。
```

> 💡 **為什麼要這樣做？ **
> 在自己電腦上，`localhost` 像是「只給自己開的門」。在 Zeabur 容器裡，如果服務只開給自己，外部用戶就進不來。 `0.0.0.0` 的意思是「這個服務可以被容器外部存取」。

### 第 3 步：確認專案有生產啟動指令

**【本步核心】Zeabur 需要知道怎麼 build、怎麼 start。 **

開啟 `package.json`，確認至少有：```json
{
  "scripts": {
    "build": "npm run build:runtime-careers && tsc --noEmit && node scripts/vite-build.mjs",
    "start": "node server/payment-server.mjs"
  }
}
```

不同項目的 `build` 內容可以不同，但原則相同：

1. `npm run build` 負責產生前端靜態檔。
2. `npm run start` 負責啟動線上服務。
3. 線上服務要同時提供前端頁面和 `/api/*`。

給 Codex 的提示詞：

```text
請檢查 package.json 是否適合 Zeabur 部署。

要求：
1. npm run build 可以產生生產文件。
2. npm run start 可以啟動單一 Node 服務。
3. 這個 Node 服務要同時提供前端 dist 和 /api/*。
4. 如果缺少 scripts，請直接補上。
```

> 💡 **為什麼要這樣做？ **
> Zeabur 不是在你的電腦裡點「預覽按鈕」。它只會按指令執行。 build 像是“把網站打包”，start 像是“把打包好的網站端出來給別人訪問”。

### 第 4 步：確認 GitHub 倉庫已經是最新版本

**【本步核心】進入 Zeabur 前，先確認 GitHub 上已經有你要部署的最新程式碼。 **

接下來是具體的執行步驟：

1. 開啟你的 GitHub 倉庫頁面。
2. 確認 README 能正常顯示。
3. 確認最新 commit 是你剛剛推播的版本。
4. 在本機終端機執行：```bash
git status
```

5. 如果有未提交修改，先回到上一章的流程 `git add`、`git commit`、`git push`。
6. 確認 `.env`、`.env.payment.local` 沒有出現在 GitHub 檔案清單裡。

再次確認不要提交這些文件：

- `.env`
- `.env.payment.local`
- `node_modules`
- `dist`
- 日誌檔案
- 真實訂單資料
- Paddle API key
- Webhook secret

> 💡 **為什麼要這樣做？ **
> Zeabur 會從 GitHub 拉程式碼。你電腦裡的修改如果還沒 push，Zeabur 就看不到。 GitHub 頁面顯示什麼，Zeabur 大多就會拿到什麼。

### 第 5 步：在 Zeabur 新建服務

**【本步核心】讓 Zeabur 連接你的 GitHub 倉庫，並把程式碼部署成網站。 **

接下來是具體的執行步驟：

1. 打開 Zeabur。
2. 新建 Project。
3. 選擇從 GitHub 部署。
4. 如果 Zeabur 要求授權 GitHub，請按頁面提示授權。
5. 在倉庫清單裡選擇上一章上傳的倉庫。
6. 選擇分支，通常是 `main`。
7. Region 優先選 Singapore 或 Hong Kong 附近地區。
8. 讓 Zeabur 自動偵測 Node 專案。
9. 如果它要求你填寫命令，填：

```text
Build Command: npm run build
Start Command: npm run start
```

![Zeabur 服務部署示意](../../assets/diagrams/01-zeabur-deploy.svg)

> 💡 **為什麼要這樣做？ **
> Region 是伺服器所在地區。你的用戶如果主要在亞洲，選擇新加坡或香港附近地區，訪問路徑通常會更短。這裡不需要大陸伺服器，也就不把 ICP 備案放在第一步。

### 第 6 步：先填最少環境變數

**【本步核心】第一輪部署只為了讓網站跑起來，不需要立刻填 Paddle live key。 **

在 Zeabur 的 Variables 先填：```bash
PAYMENT_SERVER_HOST=0.0.0.0
PAYMENT_STORE_FILE=/data/payment-store.json
PUBLIC_BASE_URL=https://你的-zeabur-域名
CORS_ORIGIN=https://你的-zeabur-域名
PADDLE_ENVIRONMENT=sandbox
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

如果你還沒有 Zeabur 域名，可以先部署一次，拿到域名後再回來把：```bash
PUBLIC_BASE_URL=
CORS_ORIGIN=
```

改成真正的網址。

![Zeabur 環境變數示意](../../assets/diagrams/02-zeabur-variables.svg)

> 💡 **為什麼要這樣做？ **
> 環境變數像是「部署平台幫你保管的小紙條」。程式碼可以讀取這些值，但它們不會被打包進前端公開檔案。 Paddle API key 以後也應該放在這裡，而不是寫進網頁程式碼。

### 第 7 步：掛載 `/data`

**【本步核心】給後端一個不會因為重啟就遺失的儲存位置。 **

接下來是具體的執行步驟：

1. 在 Zeabur 服務裡找到 Volume 或 Storage 設定。
2. 新增一個 volume。
3. Mount path 填：

```text
/data
```

4. 確認環境變數有：```bash
PAYMENT_STORE_FILE=/data/payment-store.json
```

![Zeabur Volume 示意](../../assets/diagrams/03-zeabur-volume.svg)

> 💡 **為什麼要這樣做？ **
> 如果訂單和解鎖記錄只存在服務臨時目錄，服務重新啟動後可能會消失。 `/data` volume 像是為服務接了一個可持續保存的小硬碟。

### 第 8 步：開啟線上網址並檢查三個頁面

**【本步驟核心】確認網站、API、公開設定都能被外部存取。 **

部署成功後，你會拿到類似：

```text
https://your-project.zeabur.app
```

請逐一打開：

```text
https://你的網域/
https://你的網域/api/health
https://你的網域/monetization.json
```

你要確認：

1. 首頁能打開。
2. `/api/health` 會回傳服務狀態。
3. `/api/health` 不顯示任何 secret。
4. `/monetization.json` 可以存取。
5. `/monetization.json` 不包含 Paddle API key 或 webhook secret。
6. mock 付款流程仍能測試。

> 💡 **為什麼要這樣做？ **
> Paddle 後面會從外部訪問你的網站。你自己能開啟本機網頁不夠，必須確認公開網址真的能被訪問。

### 第 9 步：準備 Paddle 所需的公開頁面

**【本步核心】先準備付款平台會看的基礎說明頁，避免進入 Paddle 後沒有 URL 可以填。 **

Paddle 可能會要求：

```text
/pricing
/terms
/privacy
/refund
```

這些頁面可以先很樸素，但至少要說明：

1. 你賣的是什麼。
2. 用戶付款後會得到什麼。
3. 價格是多少。
4. 是否一次性購買。
5. 退款規則是什麼。
6. 用戶遇到問題該從哪裡聯絡你。

給 Codex 的提示詞：

```text
請幫我新增 Paddle 審核需要的公開頁面：

1. /pricing
2. /terms
3. /privacy
4. /refund

要求：
- 文字清楚、保守、不要誇大效果。
- 不要承諾就業、收入或治療效果。
- 每個頁面都能透過 Zeabur 網域直接存取。
- 頁面中不要出現 API key、訂單資料或私人聯絡方式。
```

> 💡 **為什麼要這樣做？ **
> 付款平台需要判斷你賣的東西是否清楚、用戶是否知道自己買了什麼、出現爭議時有沒有規則。頁面可以簡潔，但不能空白或含糊。

### 第 10 步：把這個網域留給 Paddle

**【本步核心】把 Zeabur 網域當成下一章 Paddle 設定的基礎。 **

完成本章後，先記錄這三個值：

```text
網站首頁：https://你的網域/
Webhook URL：https://你的網域/api/webhooks/paddle
健康檢查：https://你的網域/api/health
```

下一章會把它們填進 Paddle。

> 💡 **為什麼要這樣做？ **
> 这一步像是在开店前先拿到门牌号。门牌号确定后，收银台、付款通知、用户回跳页面才有地方可去。

### 本章完成標準

**【本章核心】你要能证明网站已经在线，而不是只在本机能跑。 **

完成後請逐項確認：

1. GitHub 倉庫是最新程式碼。
2. Zeabur 部署成功。
3. 首頁能打開。
4. `/api/health` 能開啟。
5. `/monetization.json` 不含 secret。
6. `/data` volume 已掛載。
7. 你已經拿到一個 HTTPS 網域。
8. 你已經知道 webhook URL 應該是：

```text
https://你的網域/api/webhooks/paddle
```

下一章再回 Paddle，用這個網域完成網站驗證、default payment link、webhook 和 checkout。