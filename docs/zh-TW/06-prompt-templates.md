# 06. 可直接複製的 Codex 提示詞

![Prompt templates chapter art](../../assets/chapters/chapter-06-prompts.webp)
**本章重點：你不需要一次寫完完美需求。把任務拆小，讓 Codex 每次做一件能驗收的事。**

## 建立最小產品

```text
請建立一個付費測驗網站的最小可用版本。

需求：
- React + Vite 前端
- Node 後端
- 首頁、作答頁、免費導言結果、付費牆、完整報告
- 先用 mock 付款
- 不需要登入
- 付款狀態只能由後端決定

請先列出檔案計畫，再實作，最後跑 typecheck 和 build。
```

## 加入 Paddle provider

```text
請在現有 mock provider 旁新增 Paddle provider。

要求：
- POST /api/payments/checkout 可根據 region 選 CNY 或 USD price id
- 建立 Paddle transaction 時寫入 custom_data：payment_session_id、report_id
- POST /api/webhooks/paddle 驗證 Paddle-Signature
- 只有 transaction.completed 可以解鎖
- 重複 webhook 要冪等處理
- 錯誤簽章、金額不符、reportId 不符都不能解鎖
```

## 修 Zeabur 部署錯誤

```text
Zeabur 部署失敗，以下是完整 log：
[貼上 log]

請幫我判斷是 build、start、PORT、環境變數、檔案缺失還是記憶體問題。
修復後請說明我在 Zeabur 後台需要怎麼設定。
```

## 檢查 secret 是否外洩

```text
請檢查這個專案是否可能把 Paddle API key、webhook secret、.env.payment.local 或付款資料提交到 GitHub。
請列出風險檔案、建議 .gitignore，並不要刪除我未要求刪除的檔案。
```

## 改善付費牆轉換

```text
請把免費結果頁改得更像專業導言版報告，而不是硬推銷。
免費版可以提供核心心理驅動、行為傾向、內外在落差與完整報告焦點。
但不要顯示完整職業答案、完整路線、薪資或可保存報告。
```

## 讓 Codex 自己驗收

```text
請完成修改後自己跑：
- npm run typecheck -- --pretty false
- npm run build
- 相關驗證腳本

如果有錯誤，請直接修到通過，再用簡短條列告訴我改了什麼。
```
