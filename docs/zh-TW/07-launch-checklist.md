# 07. 上線檢查清單

## 網站

- 首頁可開啟。
- 測驗可完成。
- 免費結果可顯示。
- 手機版不嚴重溢出。

## 後端

- `/api/health` 回傳 200。
- `/api/health` 不顯示 secret。
- `/monetization.json` 不含 Paddle API key。
- `/data` volume 已掛載。

## Paddle

- 網站已通過驗證。
- Default payment link 已設定。
- Product 是 one-time。
- Webhook URL 正確。
- Sandbox 付款後可自動解鎖。

## Live

- 換成 live API key。
- 換成 live price id。
- 換成 live webhook secret。
- 關閉 0 元測試與 mock 入口。
