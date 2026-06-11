# 繁體中文教學目錄

[简体中文](../zh-CN/README.md) · **繁體中文** · [English](../en/README.md) · [日本語](../ja/README.md) · [한국어](../ko/README.md)

![Tutorial cover](../../assets/brand/tutorial-hero.webp)

這是完整的 Markdown 版教學目錄。建議依序閱讀，因為後面的付款、部署與上線檢查會依賴前面已經建立好的產品流程、倉庫結構與環境變數設計。

## 章節

| 順序 | 章節 | 你會完成什麼 |
| --- | --- | --- |
| 1 | [產品流程怎麼拆](01-product-flow.md) | 把付費網站拆成使用者路徑、頁面、狀態、資料與解鎖條件。 |
| 2 | [怎麼讓 Codex 從 0 幫你建站](02-codex-build-workflow.md) | 用明確提示詞讓 Codex 生成專案骨架，並透過迭代修正。 |
| 3 | [上傳至 GitHub](03-upload-to-github.md) | 建倉庫、提交程式碼、排除密鑰與本地暫存檔。 |
| 4 | [部署到 Zeabur，拿到可驗證網域](04-zeabur-deployment.md) | 設定建置命令、啟動命令、環境變數與可公開訪問的網域。 |
| 5 | [有網域後，再接 Paddle 付款與自動解鎖](05-payment-unlock.md) | 連接 Paddle Checkout、Webhook、付款狀態查詢與報告解鎖。 |
| 6 | [可直接複製的 Codex 提示詞](06-prompt-templates.md) | 使用完整提示詞處理產品設計、開發、除錯、安全檢查與上線前審閱。 |
| 7 | [上線前檢查清單](07-launch-checklist.md) | 核對安全、付款、部署、內容、回滾與使用者體驗。 |

## 推薦讀法

1. 先完整讀第 1 章，確認你的產品是否適合一次性付費解鎖。
2. 第 2 到第 4 章可以邊讀邊做，先讓網站跑起來，再部署到線上。
3. 第 5 章處理付款時，不要跳過 Webhook 與密鑰安全說明。
4. 第 6 章可以在任何階段複製使用。
5. 第 7 章建議在真實發布前逐項勾選。

[返回專案首頁](../../README.zh-TW.md) · [打開網頁版教學](../../tutorial.zh-TW.html)
