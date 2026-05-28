# 用 Codex 從 0 搭建一個可以收費的測驗網站

[简体中文](README.md) | [繁體中文](README.zh-TW.md) | [English](README.en.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

<p align="center">
  <img src="assets/brand/tutorial-mascot-logo-512.png" width="128" alt="Codex 收費測驗教程 logo" />
</p>

> 不是再做一個問卷頁面，而是做出「能作答、先部署拿到 HTTPS 網域、再串 Paddle 收款、自動交付報告」的完整產品閉環。

靜態展示頁：<https://momowangouo.github.io/codex-paid-quiz-tutorial/>

線上案例：<https://callingdeconstructor.zeabur.app/>

這是一份給創作者的實戰教程：從一個測驗想法開始，用 Codex 協助你搭建網頁、保存測驗結果、串接付款、付款後自動解鎖報告，並部署成可以公開存取的網站。

本教程刻意不展開任何具體產品的測驗演算法、報告文案結構或視覺設計方法。你可以把它當成一套通用工程路線：換成你的題目、結果頁、定價和品牌，就能做出自己的收費測驗網站。

順序很重要：先把本機 mock 流程跑通，部署到 Zeabur 取得公開 HTTPS 網域，再用這個網域去做 Paddle 網站驗證、default payment link 與 webhook 設定。

![收費測驗網站總覽](assets/brand/tutorial-hero.webp)

## 線上案例

如果你想先看收費測驗網站可以長成什麼樣，可以體驗：

[The Calling Deconstructor](https://callingdeconstructor.zeabur.app/)

它是可體驗的產品參考，不是公開模板，也不會公開具體測驗演算法或報告設計。

小提醒：這是個人專案，伺服器經費不是無限續杯。如果哪天暫時打不開，可能不是產品消失了，只是它進入「雲端冬眠模式」，等小金庫回血後再醒來。

## 適合誰

- 有測驗、報告、諮詢、教育、職涯或心理學內容產品想法的人。
- 想用 Codex 輔助開發，但不知道怎麼拆需求的人。
- 想讓使用者付款後自動解鎖頁面，而不是手動發兌換碼的人。
- 想先用低成本方式驗證付費意願的人。
- 不想一開始就做複雜 SaaS 後台的人。

## 你會做出什麼

- 測驗流程。
- 免費導言版結果。
- 後端 payment session。
- HTTPS 公開部署。
- Paddle、Stripe、Lemon Squeezy 或其他平台的付款頁。
- 透過 webhook 自動解鎖。
- 報告恢復與 access token 權限模型。

## 成本與可替代流程

| 項目 | 推薦選擇 | 可替代方案 |
| --- | --- | --- |
| 前端 | React + Vite | Next.js、Vue、SvelteKit |
| 後端 | Node.js 小服務 | Hono、Express、Fastify、Next.js API |
| 部署 | Zeabur | Render、Railway、Fly.io、Vercel、Cloudflare |
| 收款 | Paddle | Stripe、Lemon Squeezy、FastSpring、PayPal、內容平台 |
| 儲存 | JSON 檔案起步 | SQLite、Postgres、Supabase、Neon |

## 核心流程

```text
測驗答案
  -> 免費導言版結果
  -> 部署到 Zeabur 並取得 HTTPS 網域
  -> 後端建立 payment session
  -> 付款平台 hosted checkout
  -> webhook 通知後端
  -> 後端發放 access token
  -> 完整報告自動解鎖
```

如果你的系統相信 `paid=true` 這類前端 URL 參數，就很容易被繞過。付款必須由後端確認。

## 教程章節

1. [產品流程設計](01-product-flow.md)
2. [讓 Codex 幫你從 0 建站](02-codex-build-workflow.md)
3. [先部署到 Zeabur，取得可驗證網域](03-zeabur-deployment.md)
4. [有網域後，再串 Paddle 付款與自動解鎖](04-payment-unlock.md)
5. [提示詞模板庫](05-prompt-templates.md)
6. [上線檢查清單](06-launch-checklist.md)
7. [內建介面截圖圖冊](07-visual-walkthrough.md)

## 一起協作

歡迎一起補充翻譯、支付平台差異、部署平台差異、後台截圖、安全建議或勘誤。請先看 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 作者與合作

作者關注認知心理學、遊戲化體驗設計與 AI 產品原型。若你想交流收費測驗、AI 輔助報告、付款解鎖流程或 Codex MVP 開發，請先透過 [GitHub Issue 合作入口](https://github.com/momowangOUO/codex-paid-quiz-tutorial/issues/new?template=collaboration.yml) 留下公開安全的合作主題。

請不要在公開 issue 留下私人聯絡方式、付款帳號、API key、後台截圖或真實訂單資料。
