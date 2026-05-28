# 07. 上線前檢查清單

![Launch checklist chapter art](../../assets/chapters/chapter-07-launch.webp)
**本章重點：不要只檢查首頁能不能打開，要檢查付款、解鎖、安全、回訪和手機體驗。**

## 產品流程

- [ ] 首頁能清楚開始測驗。
- [ ] 使用者能完整作答。
- [ ] 免費導言版有內容，不是空白推銷。
- [ ] 未付費看不到完整職業答案和完整路線。
- [ ] 付款後完整報告會自動解鎖。
- [ ] 使用者關掉付款頁再回來，仍能查到正確狀態。

## Paddle

- [ ] Website approval 已通過。
- [ ] Default payment link 已設定。
- [ ] Product 是一次性數位產品。
- [ ] Price 是 one-time，不是 subscription。
- [ ] Webhook URL 是 `https://你的網域/api/webhooks/paddle`。
- [ ] `transaction.completed` 能解鎖。
- [ ] 失敗、取消、重複 webhook 不會錯誤解鎖。

## Zeabur

- [ ] `PAYMENT_SERVER_HOST=0.0.0.0`。
- [ ] `PAYMENT_STORE_FILE=/data/payment-store.json`。
- [ ] 已掛載 `/data` volume。
- [ ] `PUBLIC_BASE_URL` 和 `CORS_ORIGIN` 都是正式網域。
- [ ] `/api/health` 可開啟且不洩漏 secret。

## GitHub 與安全

- [ ] `.env.payment.local` 沒有出現在 GitHub。
- [ ] Paddle API key 沒有出現在 `public/` 或前端 bundle。
- [ ] `node_modules`、`dist`、log、付款資料沒有提交。
- [ ] README 或文件沒有直接寫出個人私密聯絡資訊。

## 手機與中國可訪問性

- [ ] 手機首頁不需要滑很久才看到開始按鈕。
- [ ] 作答頁按鈕不擠壓、不溢出。
- [ ] 微信/支付寶內建瀏覽器至少能正常瀏覽與跳轉。
- [ ] 中國網路環境下首頁能打開。

## 最後一步

先用 sandbox 跑通，再切 live。切 live 時重新檢查：API key、price id、webhook secret、Paddle environment、網站驗證狀態。
