# Codex 付費網站實作教學

[简体中文](README.md) · **繁體中文** · [English](README.en.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

![Codex paid site tutorial cover](assets/brand/tutorial-hero.webp)

這是一套從 0 到上線的實作教學，目標是帶你做出一個可以收費解鎖內容的網站。教學以「測驗 / 付費報告」產品為例，把產品設計、Codex 協作、GitHub 上傳、Zeabur 部署、Paddle 付款、Webhook 自動解鎖與上線檢查串成一條完整路徑。

如果你覺得「會寫網頁」和「能讓網頁真的收錢上線」之間隔著一段很模糊的距離，這份教學就是用來補上那段距離的。

## 線上閱讀

- [打開繁體中文網頁版教學](tutorial.zh-TW.html)
- [查看繁體中文 Markdown 教學](docs/zh-TW/README.md)
- [查看範例設定檔](examples/README.md)
- [合作、回饋與翻譯協作](collaboration.html)

## 你會完成什麼

照著教學完成後，你應該能得到一個具備這些能力的專案：

- 清楚的付費產品流程：免費入口、測驗或內容體驗、付費牆、付款後解鎖。
- 可以放到 GitHub 的專案倉庫。
- 可以部署到 Zeabur 的網站與後端服務。
- Paddle Checkout 付款流程。
- 服務端 Webhook，用來確認付款並寫入解鎖狀態。
- 安全的設定方式，避免把 API key、Webhook secret、admin token 放進前端或公開倉庫。
- 上線前檢查清單，協助你檢查網域、環境變數、付款、解鎖與回滾方案。

## 適合誰

- 想用 Codex 或 AI 程式工具做出第一個可上線產品的人。
- 已經會一點前端，但還不熟 GitHub、部署、付款與 Webhook 的個人開發者。
- 想把測驗、報告、模板、課程、工具或內容產品做成一次性付費解鎖的人。
- 想學習如何把 AI 生成程式碼整理成可維護專案的人。

## 你需要準備

- GitHub 帳號。
- Zeabur 帳號，或你熟悉的同類部署平台。
- Paddle 帳號，用於接入國際付款。
- 可以執行 Codex 的本地環境。
- 一個準備做成付費內容的產品想法。

教學會盡量從零開始說明，但付款平台、網域驗證與部署後台的介面可能會隨時間變化。遇到介面變化時，請優先保持本教學的原則：前端只放公開設定，密鑰只放服務端環境變數，付款成功必須由服務端 Webhook 確認。

## 學習路線

| 章節 | 內容 | 目標 |
| --- | --- | --- |
| 1 | [產品流程怎麼拆](docs/zh-TW/01-product-flow.md) | 把「我要做一個付費網站」拆成使用者路徑、頁面、資料與解鎖邏輯。 |
| 2 | [怎麼讓 Codex 從 0 幫你建站](docs/zh-TW/02-codex-build-workflow.md) | 學會把需求交給 Codex，並透過小步迭代把專案搭起來。 |
| 3 | [上傳至 GitHub](docs/zh-TW/03-upload-to-github.md) | 建倉庫、提交程式碼、理解哪些檔案不能上傳。 |
| 4 | [部署到 Zeabur，拿到可驗證網域](docs/zh-TW/04-zeabur-deployment.md) | 把專案部署成可訪問的網站，並準備給付款平台驗證。 |
| 5 | [有網域後，再接 Paddle 付款與自動解鎖](docs/zh-TW/05-payment-unlock.md) | 建立 Checkout、Webhook、付款狀態查詢與報告解鎖流程。 |
| 6 | [可直接複製的 Codex 提示詞](docs/zh-TW/06-prompt-templates.md) | 使用可複用提示詞，讓 Codex 幫你設計、開發、除錯與檢查。 |
| 7 | [上線前檢查清單](docs/zh-TW/07-launch-checklist.md) | 檢查安全、付款、部署、內容、回滾與使用者體驗。 |

## 倉庫結構

```text
codex-paid-quiz-tutorial/
  index.html                  多語言入口頁
  tutorial*.html              各語言完整網頁版教學
  README*.md                  各語言專案首頁
  docs/
    zh-CN/                    簡體中文 Markdown 教學
    zh-TW/                    繁體中文 Markdown 教學
    en/                       English Markdown tutorial
    ja/                       日本語 Markdown チュートリアル
    ko/                       한국어 Markdown 튜토리얼
  examples/                   可複製的付款設定與 API 契約範例
  assets/                     品牌圖、章節圖、流程圖
  tools/                      維護協作表單的輔助腳本
```

## 安全原則

- 不要把 Paddle API key、Webhook secret、admin token、真實使用者資料或付款日誌提交到 GitHub。
- `public/monetization.json` 這類公開設定只能放價格、展示文字、付款方式名稱與公開開關。
- 真正的密鑰應該放在 Zeabur Variables 或服務端 `.env` 中。
- 不要只相信 URL 裡的 `paid=true`，最終解鎖必須由服務端確認付款狀態。
- Webhook 簽名驗證應該在正式環境開啟。

## 範例檔案

- [public-monetization.example.json](examples/public-monetization.example.json)：公開付款設定範例。
- [env.payment.example](examples/env.payment.example)：服務端環境變數模板。
- [minimal-api-contract.md](examples/minimal-api-contract.md)：最小付款 API 契約。

## 貢獻與回饋

- 文檔修正請看 [CONTRIBUTING.md](CONTRIBUTING.md)。
- 私人合作、案例分享、翻譯協作請看 [CONTACT.md](CONTACT.md) 或打開 [合作表單](collaboration.html)。
- 公開 issue 裡不要貼 API key、付款後台截圖、Webhook secret、使用者資料或私人聯絡方式。

## 免責聲明

本教學是工程與產品實作指南，不保證任何平台審核一定通過，也不保證上線後一定產生收入。付款、稅務、退款、隱私政策與消費者保護要求會因地區而異，正式營運前請依照你的市場與平台規則自行核對。
