# 02. 怎麼讓 Codex 從 0 幫你建站

![Codex build workflow chapter art](../../assets/chapters/chapter-02-codex.webp)
**【本章核心】把建站任務拆成多個小輪次，每一輪都讓 Codex 做一件能驗收的事。 **

這一章只講一件事：**你不會寫網站時，你應該怎麼指揮 Codex。 **

不要一上來就說「幫我做一個完整商業化網站」。這樣範圍太大，Codex 容易一次改太多。你要把網站拆成一連串可以驗收的小任務。

> 💡 **為什麼要這樣做？ **
> Codex 處理小任務時較穩定。你可以把它想成請一位工程搭檔施工：先確認地基，再做牆面，再接水電，而不是一次說「請蓋好整棟大樓」。

## 先告訴 Codex 你要做什麼產品

**【本節核心】先用一段完整提示詞，讓 Codex 理解產品目標和限制。 **

複製這段作為第一條提示詞：

```text
我要做一個付費測驗網站。

目標用戶會：
1. 開啟首頁
2. 完成一組測驗題
3. 看到免費導言版報告
4. 點選付款按鈕
5. 付款成功後自動解鎖完整報告

請先幫我建立一個最小可用版本。
要求：
- 前端用 React + Vite
- 後端用 Node.js
- 先用 mock 支付，不接真實 Paddle
- 不需要登入帳號
- 不要把任何 secret 放進前端
- 每一步都要告訴我怎麼會本地運行和驗證
```

如果你已經有項目，就加一句：

```text
請先閱讀現有專案結構，不要重建專案；盡量沿用現有程式碼風格。
```

## 第一次讓它建造的東西要很小

**【本節核心】第一版只做能跑通流程的最小網站。 **

第一版只需要這些頁面：

| 頁面 | 目的 | 最低要求 |
| --- | --- | --- |
| 首頁 | 讓使用者開始測驗 | 一個標題、一個開始按鈕 |
| 答案頁 | 收集答案 | 至少 3-5 題測驗題，之後再擴充 |
| 免費結果頁 | 建立信任 | 顯示部分分析，但不顯示完整職業答案 |
| 付費牆 | 引導解鎖 | 一個付款按鈕，一個等待狀態 |
| 完整報告頁 | 驗證解鎖 | mock 付款後顯示完整內容 |

你先不要要求：

- 多語言。
- 精美動畫。
- 後台管理。
- PDF/長圖保存。
- 真實 Paddle。
- 完整題庫。

這些都可以之後再加。第一步只要流程跑通。

> 💡 **為什麼要這樣做？ **
> 最小版本不是最終成品，而是用來證明路線可行。路線可行後，再加視覺、多語言、報告保存和真實支付會更穩。

## 推薦專案結構

**【本節核心】事先要求 Codex 把前端、後端、資料和配置分開放。 **

你可以讓 Codex 依照這個結構建造：

```text
paid-quiz-site/
  src/
    app/
      App.tsx
    components/
    data/
      questions.ts
    monetization/
      config.ts
    styles/
      globals.css
  server/
    payment-server.mjs
  public/
    monetization.json
  package.json
  .env.payment.example
```

各目錄的意思：

| 目錄 | 用途 |
| --- | --- |
| `src/app` | 頁面流程 |
| `src/components` | 按鈕、卡片、題目、報告模組 |
| `src/data` | 題目、結果類型、範例報告資料 |
| `src/monetization` | 前端讀取公開付費配置 |
| `server` | 後端 API、支付 session、webhook |
| `public` | 可以公開給瀏覽器看的檔案 |

新手最容易犯的錯是把所有東西塞進一個檔案。讓 Codex 按目錄拆開，後面比較好維護。

> 💡 **為什麼要這樣做？ **
> 項目結構像收納櫃。題目、頁面、樣式、付款介面各放各的位置，後面要修改某一塊時，才不用在一個大文件裡翻找。

## 第 1 輪：只做測驗流程

**【本節核心】先確認用戶能從首頁答到結果頁。 **

給 Codex：

```text
請先實現測驗主流程，不要接付款。

需求：
- 首頁有“開始測驗”
- 答案頁一次顯示一題
- 使用者選擇答案後可下一題
- 答完後產生一個 reportId
- 進入結果頁
- 結果頁顯示免費導言和一個「解鎖完整報告」的按鈕

請同時提供：
- npm scripts
- 本地運作方式
- 最小測試方式
```

驗收：```bash
npm install
npm run dev
```

打開本地網址，自己答一遍。不要急著改視覺，先確認路徑能走完。

## 第 2 輪：讓後端保存付款狀態

**【本節核心】把付款狀態交給後端保存，不讓前端自己決定。 **

給 Codex：

```text
現在請新增 Node 後端，先做 mock 付款。

後端 API：
- POST /api/payments/checkout
  接收 reportId，建立 payment session，回傳 sessionId 和 checkoutUrl

- GET /api/payments/sessions/:id
  返回 pending / paid / failed

- POST /api/payments/mock-complete
  僅本地測試使用，把某個 session 標記為 paid

資料先存在 JSON 檔案即可。
請確保前端不能只靠 URL 參數解鎖報告。
```

驗收：

- 未付款時完整報告看不到。
- mock complete 後能解鎖。
- 刷新頁面後，後端仍知道這份報告有沒有解鎖。

## 第 3 輪：加付費牆開關

**【本節核心】以公開配置控制付費牆開關，方便開發和上線前測試。 **

給 Codex：

```text
請新增 public/monetization.json，讓付費牆可以開關。

預設：
{
  "enabled": false,
  "checkoutMode": "api",
  "apiBaseUrl": "/api",
  "provider": "mock"
}

要求：
- enabled=false 時，方便我開發測試，可以直接看完整報告
- enabled=true 時，必須付款後才解鎖
- public 檔案不能包含 API key 或 secret
```

這一步很重要，因為你會在上線前反覆測試。如果沒有開關，你很容易把半成品付費牆推給用戶。

## 第 4 輪：先準備上傳到 GitHub

**【本節核心】讓 Codex 檢查倉庫上傳前的安全性和 `.gitignore`。 **

本地 mock 流程跑通後，先把專案整理成適合上傳 GitHub 的狀態。

給 Codex：

```text
請檢查這個專案是否適合上傳 GitHub。

要求：
- .gitignore 必須忽略 .env、.env.*、*.local、node_modules、dist、日誌和臨時文件
- 掃描項目，確認沒有 Paddle API key、webhook secret、admin token
- 確認 README 能讓別人看懂專案用途
- 告訴我第一次上傳 GitHub 要執行哪些 git 指令
- 如果發現 secret，請列出檔案路徑，並提醒我撤銷或更換對應 key
```

驗收時，GitHub 倉庫裡應該可以看到專案文件，但看不到 `.env`、`.env.payment.local` 或任何 API key。

## 第 5 輪：再準備 Zeabur 部署

**【本節核心】請 Codex 把專案整理成 Zeabur 能 build、能 start 的形式。 **

GitHub 倉庫準備好後，先不要急著接 Paddle。 Paddle 後面會要求你填寫並驗證網站域名，也會要求 default payment link 使用一個已經能開啟的 HTTPS 域名。

所以正確順序是：

```text
本地 mock 跑通 -> 上傳到 GitHub -> 部署到 Zeabur -> 拿到 HTTPS 網域 -> 再設定 Paddle
```

給 Codex：

```text
請把這個專案整理成可以部署到 Zeabur 的結構。

要求：
- npm run build 可以產生前端 dist
- npm run start 可以啟動同一個 Node 服務
- Node 服務要同時提供 dist 靜態檔案和 /api/*
- server 必須監聽 process.env.PORT
- host 使用 0.0.0.0
- 新增 /api/health，不洩漏任何 secret
- .env、.local、node_modules、dist、本地資料檔案都不要提交到 GitHub
- 先不要要求 Paddle key，因為現在只是為了拿到可驗證的 HTTPS 域名

請同時告訴我：
1. GitHub 要提交哪些文件
2. Zeabur 的 build command 和 start command
3. Zeabur 上要先設定哪些變數
4. 怎麼確認網站和 /api/health 都可以訪問
```

這一步完成後，你應該會拿到類似這樣的正式網址：

```text
https://your-project.zeabur.app
```

這個網址之後會填入 Paddle 的 website verification、pricing page、default payment link 和 webhook URL。

## 第 6 輪：有 HTTPS 網域後，再把 mock 換成 Paddle

**【本節核心】拿到 Zeabur 網域後，再讓 Codex 接真實 Paddle。 **

等 Zeabur 網站可以開啟、`/api/health` 也正常，再給 Codex：

```text
請新增 Paddle provider，但保留 mock provider。

要求：
- POST /api/payments/checkout 使用 Paddle create transaction API
- 根據使用者地區或按鈕選擇使用 CNY price / USD price
- custom_data 必須包含 reportId 和 payment_session_id
- 新增 POST /api/webhooks/paddle
- webhook 必須校驗 Paddle-Signature
- 只接受 transaction.completed 解鎖
- webhook 重複發送時必須冪等
- 錯誤簽名、金額不符、price id 不符都不能解鎖
```Codex 實作後，你要讓它說明這些欄位在哪裡配置：

```text
PADDLE_ENVIRONMENT
PADDLE_API_KEY
PADDLE_CNY_PRICE_ID
PADDLE_USD_PRICE_ID
PADDLE_WEBHOOK_SECRET
PUBLIC_BASE_URL
```

注意：`PUBLIC_BASE_URL` 應該填寫 Zeabur 給你的 HTTPS 域名，例如：

```text
https://your-project.zeabur.app
```Paddle webhook URL 是：

```text
https://your-project.zeabur.app/api/webhooks/paddle
```

## 第 7 輪：上線前請 Codex 做安全檢查

**【本節核心】上線前請 Codex 檢查付款、金鑰、webhook 和部署風險。 **

給 Codex：

```text
請檢查這個項目是否適合上線。

重點檢查：
1. public 檔案裡有沒有 API key、webhook secret、admin token
2. 付款解鎖是否只能由後端確認
3. webhook 是否驗簽
4. 重複 webhook 是否會重複發放權限
5. Zeabur 是否會讀取 PORT
6. 是否提供 /api/health
7. build 和 start scripts 是否可用

請列出問題並直接修復。
```

## 你應該怎樣回報錯誤給 Codex

**【本節核心】回報錯誤時要給動作、現象、期待結果和日誌。 **

不要只說「壞了」。要貼這四件事：

```text
我做了什麼：
我看到什麼錯誤：
我期待它應該怎樣：
相關畫面描述或日誌：
```

例子：

```text
我在 Zeabur 打開網站時看到 502。
Zeabur logs 顯示 npm run start 有啟動，但網頁打不開。
請檢查 server 是否監聽 process.env.PORT，以及 host 是否為 0.0.0.0。
```Codex 最擅長處理具體錯誤。越具體，它越快。

> 💡 **為什麼要這樣做？ **
> 「壞了」沒有定位資訊。日誌、畫面狀態、你剛剛做了什麼，才是 Codex 判斷問題位置的線索。

## 新手不要跳過的驗證

**【本節核心】每輪改完都跑 typecheck 和 build。 **

每做完一個階段，都讓 Codex 跑：```bash
npm run typecheck
npm run build
```

如果沒有這些 scripts，就讓 Codex 補：

```text
請為這個項目補上 typecheck 和 build scripts，並確保本地能跑。
```

## 本章完成標準

**【本節核心】完成本章後，你應該擁有本地可運行的 mock 付費網站。 **

完成這一章後，你應該擁有：

- 一個可以本地運行的測驗網站。
- 一個 Node 後端。
- 一個 mock 付款解鎖流程。
- 一個公開設定檔。
- 一套清楚的 Codex 提示詞。

下一章先把專案上傳到 GitHub；GitHub 倉庫準備好後，再部署到 Zeabur 拿 HTTPS 網域。