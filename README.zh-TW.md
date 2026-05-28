# 用 Codex 做出可以收費的網站

[简体中文](README.md) · **繁體中文** · [English](README.en.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

<p align="center">
  <img src="assets/brand/tutorial-mascot-logo-512.png" width="132" alt="Codex paid website tutorial logo" />
</p>

![Tutorial cover](assets/brand/tutorial-hero.webp)

> 從 0 到上線：用 Codex 做出可以部署、可以收款、付款後能自動解鎖內容的網站。

- 這不是抽象架構課，而是實作路線。
- 建議順序：先做可執行網站，再上傳 GitHub，再部署 Zeabur 取得 HTTPS 網域，最後接 Paddle。
- 如果你是 0 基礎，照著章節走，請 Codex 拆任務、改程式、跑檢查。

## 教學目錄

1. [產品流程怎麼拆](docs/zh-TW/01-product-flow.md)
2. [怎麼讓 Codex 從 0 幫你建站](docs/zh-TW/02-codex-build-workflow.md)
3. [上傳到 GitHub](docs/zh-TW/03-upload-to-github.md)
4. [部署到 Zeabur，先取得 HTTPS 網域](docs/zh-TW/04-zeabur-deployment.md)
5. [接 Paddle 收費與自動解鎖](docs/zh-TW/05-payment-unlock.md)
6. [可直接複製的 Codex 提示詞](docs/zh-TW/06-prompt-templates.md)
7. [上線前檢查清單](docs/zh-TW/07-launch-checklist.md)

## 你會做出什麼

- 一個可以體驗的免費測驗與結果頁。
- 一個由後端保存付款狀態的解鎖流程。
- 一個部署在 Zeabur、可用於 Paddle 網站驗證的 HTTPS 網站。
- 一個透過 Paddle Checkout 與 webhook 自動解鎖的收費流程。

## 相關連結

- [示範網站：The Calling Deconstructor](https://callingdeconstructor.zeabur.app/)
- [靜態教學網站](https://momowangouo.github.io/codex-paid-quiz-tutorial/)
- [GitHub 倉庫](https://github.com/momowangOUO/codex-paid-quiz-tutorial)
- [合作表單](https://docs.google.com/forms/d/e/1FAIpQLSet3g2cL32ZElYICNwvxaq27R0pxqyoHw2AK5bQHjDzNQwlUg/viewform)

如果示範網站暫時醒不來，可能只是伺服器預算在小睡；教學內容仍然可以照著做。
