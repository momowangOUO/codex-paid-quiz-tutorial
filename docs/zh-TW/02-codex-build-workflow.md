# 02. 怎麼讓 Codex 從 0 幫你建站

**本章重點：不要一次叫 Codex 做完整商業網站，而是把任務拆成可以驗收的小輪次。**

Codex 很適合當工程搭檔，但你要給它清楚的施工順序：先測驗流程，再後端狀態，再 mock 付款，最後才接 Paddle。

## 第一段提示詞

```text
我要做一個付費測驗網站。

使用者會：
1. 打開首頁
2. 完成一組測驗題
3. 看到免費導言版報告
4. 點擊付款按鈕
5. 付款成功後自動解鎖完整報告

請先幫我建立最小可用版本。
要求：
- 前端用 React + Vite
- 後端用 Node.js
- 先用 mock 付款，不接真實 Paddle
- 不需要登入帳號
- 不要把任何 secret 放進前端
- 每一步都要告訴我怎麼本機執行和驗收
```

如果你已經有專案，加一句：

```text
請先閱讀現有專案結構，不要重建專案；盡量沿用目前的程式風格。
```

## 建議專案結構

```text
paid-quiz-site/
  src/
    app/
    components/
    data/
    monetization/
    styles/
  server/
    payment-server.mjs
  public/
    monetization.json
  package.json
  .env.payment.example
```

原則很簡單：前端畫面、題目資料、公開設定、後端付款邏輯要分開。新手最常出錯的地方，就是把所有東西塞進同一個檔案。

## 第 1 輪：只做測驗流程

```text
請先實作測驗主流程，不要接付款。

需求：
- 首頁有開始測驗
- 作答頁一次顯示一題
- 使用者選答案後可以下一題
- 答完後產生 reportId
- 進入結果頁
- 結果頁顯示免費導言和解鎖完整報告按鈕

請同時提供 npm scripts、本機執行方式、最小測試方式。
```

驗收方式：跑 `npm install`、`npm run dev`，自己完整答一次。先確認路徑能走完，再調整視覺。

## 第 2 輪：新增後端與 mock 付款

```text
現在請新增 Node 後端，先做 mock 付款。

API：
- POST /api/payments/checkout：接收 reportId，建立 payment session
- GET /api/payments/sessions/:id：回傳 pending / paid / failed
- POST /api/payments/mock-paid：本機測試時把 session 標記為 paid

要求：
- 付款狀態存在後端
- 前端不能自己決定 paid
- 付費牆預設關閉，之後可以用設定打開
```

## 第 3 輪：接上真實金流前先做安全檢查

讓 Codex 檢查：

- `.env.payment.local` 是否被 `.gitignore` 忽略。
- Paddle API key 是否只在後端環境變數。
- `public/monetization.json` 是否沒有 secret。
- 偽造網址參數是否無法解鎖。

## 工作節奏

每一輪都照這個節奏：

1. 讓 Codex 說明要改哪些檔案。
2. 讓它實作。
3. 讓它跑 typecheck / build。
4. 你用瀏覽器測一次。
5. 把錯誤訊息或畫面狀態描述貼回去。

這樣比一次要求完整成品穩定很多。
