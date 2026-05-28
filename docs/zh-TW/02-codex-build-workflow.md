# 02. 用 Codex 做出網站

這一章的重點是把 Codex 當成實作夥伴，而不是只請它寫企劃。

## 推薦架構

- 前端：React 或 Vite。
- 後端：Node 服務，同時提供前端靜態檔與 `/api/*`。
- 支付：本機先用 mock，正式再接 Paddle。
- 權限：付款狀態由後端管理。

## 分段執行

1. 先做測驗頁與結果頁。
2. 加上 checkout、session 查詢、webhook API。
3. 加 mock 支付，確認流程能跑。
4. 接 Paddle provider。
5. 執行 typecheck、build 與流程測試。

```text
請實作一個付費牆原型：預設關閉、mock 支付可測、正式付款狀態只能由後端寫入，前端不能靠 paid=true 解鎖。
```
