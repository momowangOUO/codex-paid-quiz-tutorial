# 07. 公開前チェックリスト

## プロダクト

- [ ] 診断を開始できる。
- [ ] 最後まで回答できる。
- [ ] 無料導入レポートに実用的な内容がある。
- [ ] 未払いでは完全版が見えない。
- [ ] 支払い後に自動で解放される。

## Paddle

- [ ] Website approval が完了。
- [ ] Default payment link が設定済み。
- [ ] Product は one-time digital product。
- [ ] Price は subscription ではない。
- [ ] Webhook URL が正しい。
- [ ] failed / canceled / duplicate webhook で誤解放しない。

## Zeabur

- [ ] `PAYMENT_SERVER_HOST=0.0.0.0`。
- [ ] `/data` volume がある。
- [ ] `PUBLIC_BASE_URL` と `CORS_ORIGIN` が本番ドメイン。
- [ ] `/api/health` が secret を表示しない。

## 最後に

sandbox で通ってから live に切り替えます。live API key、live price id、live webhook secret、Paddle environment をまとめて確認してください。
