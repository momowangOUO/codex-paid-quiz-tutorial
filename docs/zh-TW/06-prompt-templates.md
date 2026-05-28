# 06. 可複製提示詞模板

![Prompt templates chapter art](../../assets/chapters/chapter-06-prompts.webp)
**【本章核心】這裡收集可以直接貼給 Codex 的提示詞，用來建站、上傳 GitHub、部署 Zeabur、接 Paddle 和排查錯誤。 **

這一章是工具箱。你可以把下面的提示詞直接貼給 Codex，再把括號裡的內容換成自己的項目。

> 💡 **為什麼要這樣做？ **
> 對初學者來說，最難的常常不是“知道要做什麼”，而是“不知道該怎麼開口請 Codex 做”。模板可以減少表達成本，也能讓需求更穩定。

## 0. 讓 Codex 先讀項目

**【本節核心】任何修改前，先讓 Codex 理解專案結構。 **

```text
請先閱讀這個項目，不要急著修改。

請告訴我：
1. 前端入口在哪裡
2. 後端入口在哪裡
3. 支付配置在哪裡
4. 本地怎麼運行
5. 哪些文件不能提交到 GitHub

然後列出你建議的下一步改動計畫。
```

## 1. 從空目錄建立最小版本

**【本節核心】從空項目開始時，先要求 Codex 建立最小可運行版本。 **

```text
請在目前目錄建立一個付費測驗網站的最小可用版本。

技術要求：
- React + Vite 前端
- Node.js 後端
- 先用 mock 支付
- 不接真實 Paddle
- 不需要登入

產品流程：
首頁 -> 答案頁 -> 免費導言報告 -> 付款按鈕 -> mock 解鎖 -> 完整報告

請提供：
- package.json scripts
- 前端頁面
- 後端 API
- public/monetization.json
- .env.payment.example
- 本地運行說明
```

## 2. 加題目與結果頁

**【本節核心】流程跑通後，再擴充題目數和結果頁。 **

```text
請幫我把測驗題目擴展成 [題目數] 題。

要求：
- 每題有 3-5 個選項
- 用戶一次只看到一題
- 有進度提示
- 答完後產生 reportId
- 結果頁根據答案產生一個穩定結果
- 刷新後不要遺失目前報告

先用本地數據，不要接資料庫。
```

## 3. 優化免費導言版報告

**【本節核心】未付費頁面要建立信任，不要寫成誇張廣告。 **

```text
请优化未付费结果页。

風格：
- 专业、客观、可信
- 不要誇張行銷
- 不要“先透露一点”“精准打击痛点”这类话

內容結構：
1. 核心心理驅力
2. 行為傾向與潛在卡點
3. 自我認知與內外在表現調和
4. 完整报告会继续分析的方向

限制：
- 不顯示完整職業答案
- 不显示完整行动路线
- 不顯示完整報告保存入口
```

## 4. 加 mock 支付牆

**【本節核心】先用 mock 支付測試解鎖邏輯，不急著接真實收款。 **

```text
請新增 mock 支付牆。

要求：
- public/monetization.json 有 enabled 開關
- enabled=false 時方便開發，直接看完整報告
- enabled=true 時，未付款只能看免費導言
- 點選付款按鈕建立 payment session
- mock 付款成功後自動解鎖
- 前端不能靠 URL 參數假解鎖
```

## 5. 先上傳到 GitHub

**【本節核心】部署前先請 Codex 檢查 GitHub 上傳安全。 **

```text
請檢查這個專案是否適合上傳 GitHub。

要求：
- .gitignore 忽略 .env、.env.*、*.local、node_modules、dist、日誌、臨時文件
- 掃描項目，確認沒有 Paddle API key、webhook secret、admin token
- 確認 README 能說明專案用途和本地運作方式
- 告訴我第一次上傳 GitHub 要執行哪些指令
- 如果遠端 origin 不存在，請告訴我怎麼連接 GitHub repo
- 如果發現 secret，請列出檔案路徑，並提醒我撤銷或更換對應 key

請不要把本地密鑰、真實訂單資料或後台畫面資料提交進 Git。
```

## 6. 再部署到 Zeabur

**【本節核心】GitHub 倉庫準備好後，再請 Codex 檢查 Zeabur 部署條件。 **

```text
請檢查並調整項目，讓它可以部署到 Zeabur。

要求：
- npm run build 能產出前端文件
- npm run start 能啟動單 Node 服務
- 服務監聽 process.env.PORT
- host 可用 0.0.0.0
- 同一個服務提供前端 dist 和 /api
- 新增 /api/health
- .gitignore 忽略 .env、*.local、node_modules、dist、日誌、臨時文件
- 不提交任何 API key
- Paddle provider 沒啟用時，缺少 Paddle key 不應該導致服務崩潰

請告訴我 Zeabur Variables 該填什麼。
```

## 7. 有網域後接 Paddle

**【本節核心】Zeabur HTTPS 網域準備好後，再接 Paddle。 **

```text
我已經有 Zeabur HTTPS 域名，現在要接 Paddle。

請新增 Paddle provider。

環境變數：
- PADDLE_ENVIRONMENT
- PADDLE_API_KEY
- PADDLE_CNY_PRICE_ID
- PADDLE_USD_PRICE_ID
- PADDLE_WEBHOOK_SECRET
- PUBLIC_BASE_URL

後端要求：
- POST /api/payments/checkout 調 Paddle create transaction
- custom_data 寫入 reportId 和 payment_session_id
- POST /api/webhooks/paddle 驗證 Paddle-Signature
- 只接受 transaction.completed 解鎖
- 失敗、取消、過期不解鎖
- webhook 重複發送要冪等
- price id、金額、幣種不符不能解鎖
```

## 8. 檢查為什麼 Zeabur 502

**【本節核心】遇到 502 時，把 Zeabur 日誌貼給 Codex 定位。 **

```text
Zeabur 部署後開啟網站顯示 502。

這是 Zeabur log：
[貼日誌]

請檢查：
1. package.json start script
2. server 是否監聽 process.env.PORT
3. host 是否是 0.0.0.0
4. build 後靜態檔案路徑是否正確
5. 是否因為缺少環境變數導致進程退出

請直接修復。
```

## 9. 檢查為什麼 Paddle 付款後不解鎖

**【本節核心】付款後不解鎖時，同時檢查 Paddle webhook 和 Zeabur 日誌。 **

```text
Paddle 付款後頁面沒有解鎖。

我有這些資訊：
- Paddle transaction id: [填寫]
- payment session id: [填寫]
- reportId: [填寫]
- Zeabur log: [貼日誌]
- Paddle webhook log: [貼日誌]

請檢查：
1. webhook 是否收到
2. webhook 簽名是否驗證
3. event_type 是否是 transaction.completed
4. custom_data 是否包含 payment_session_id 和 reportId
5. store 檔案是否成功寫入
6. 前端輪詢是否拿到 paid
```

## 10. 上線前安全審計

**【本節核心】上線前集中檢查 secret、驗簽、權限和繞過風險。 **

```text
請做一次上線前安全審計。

重點：
- public 檔案是否洩漏 secret
- .env 是否被 git 追踪
- API key 是否只在後端 process.env
- webhook 是否驗簽
- 錯誤簽名不能解鎖
- 重複 webhook 不重複發放
- 未付款不能存取完整報告
- 同 access token 不能解鎖別人的 reportId

請列出問題並修復。
```

## 11. 讓報告更像產品

**【本節核心】基礎連結跑通後，再讓 Codex 優化報告體驗。 **

```text
請優化完整報告頁，讓它更像付費產品。

要求：
- 第一屏看到核心結論與雷達
- 心理側寫作為主賣點
- 多方向短模組，不要一篇長文
- 刪除薪資和就業市場說明
- 重點放在人格特質、適合職業類型、發展路線、風險邊界
- 備選職業能點選切換，但無法重新鎖定
- 儲存報告時排版不裁切
```

## 12. 請 Codex 不要過度發揮

**【本節核心】當你只想小改時，要明確限制 Codex 的修改範圍。 **

當你覺得 Codex 改太多，用這段：

```text
請暫停新增功能。
这次只修复我指出的问题。
不要重构无关文件。
不要改變視覺風格。
不要删除现有功能。
请先说明你会改哪些文件，再动手。
```

## 13. 每次結尾都要求驗證

**【本節核心】每次修改後都要求 Codex 運行檢查並說明結果。 **

每次任務最後加：

```text
完成後請運行：
- npm run typecheck
- npm run build

如果項目沒有這些命令，請說明替代驗證方式。
最後請總結改了什麼、我該怎麼手動測試。
```

## 使用建議

**【本節核心】一次只貼一個模板，等驗收通過後再進入下一步。 **

新手最穩定的方式是：

1. 一次只貼一個提示詞。
2. 等 Codex 改完。
3. 跑起來。
4. 描述畫面狀態或貼錯誤。
5. 再進入下一步。

不要一次要求「做完整網站 + 接支付 + 部署 + 多語言 + 美術升級」。那樣失敗時很難知道哪一步壞了。