# 07. 上線檢查清單

![Launch checklist chapter art](../../assets/chapters/chapter-07-launch.webp)
**【本章核心】上線前逐項檢視產品流程、GitHub、Zeabur、Paddle、環境變數和付費安全。 **

上線前不要只看「頁面漂亮不漂亮」。付費網站最重要的是：用戶能完成付款，付款後能拿到東西，沒付款的人不能繞過。

按這份清單逐項檢查。

> 💡 **為什麼要這樣做？ **
> 付費網站的風險不只在頁面視覺。訂單、webhook、密鑰、解鎖權限任一環出錯，用戶都可能遇到「付了但看不到」或「沒有付款也能看」的問題。

## 一、基礎功能

**【本節核心】先確認用戶能從首頁走到報告頁。 **

- [ ] 首頁能打開。
- [ ] 使用者能開始測驗。
- [ ] 使用者能完成所有題目。
- [ ] 答完後產生 `reportId`。
- [ ] 自由導言版報告能顯示。
- [ ] 未付款時完整報告鎖住。
- [ ] 付款按鈕能建立 payment session。
- [ ] 付款成功後能自動解鎖。
- [ ] 刷新頁面後，已解鎖報告還能開啟。
- [ ] 換瀏覽器或無 token 時，不能看到別人的完整報告。

## 二、Codex 交付檢查

**【本節核心】讓 Codex 跑基礎檢查，不帶錯誤上線。 **

讓 Codex 跑：```bash
npm run typecheck
npm run build
```

如果失敗，不要硬上線。把錯誤貼回 Codex：

```text
這是 npm run build 的錯誤，請幫我修復。
[貼錯誤]
```

## 三、公開文件檢查

**【本節核心】確認使用者能看到的檔案裡沒有 secret。 **

這些文件可以被使用者看到：

```text
public/*
dist/*
前端打包好的 js/css
```

確認裡面沒有：

- Paddle API key。
- Webhook secret。
- Admin token。
- `.env.payment.local` 內容。
- 你的私密測試訂單資料。

可以讓 Codex 檢查：

```text
請掃描 public、dist 和前端原始碼，確認沒有洩漏 API key、webhook secret、admin token。
```

## 四、GitHub 檢查

**【本節核心】確認 Zeabur 會拿到 GitHub 上的最新安全版本。 **

Zeabur 會從 GitHub 拉程式碼，所以部署前先確認倉庫狀態。

- [ ] GitHub repo 已建立。
- [ ] 本機最新修改已 commit。
- [ ] 本機最新修改已 push。
- [ ] GitHub 頁面能看到最新 README 和程式碼。
- [ ] .env 沒有上傳。
- [ ] .env.payment.local 沒有上傳。
- [ ] Paddle API key、webhook secret、admin token 沒有出現在倉庫。
- [ ] GitHub 倉庫地址可以複製給 Zeabur 使用。

## 五、Zeabur 檢查

**【本節核心】確認線上服務能啟動、能存取、能保存付款資料。 **

先做這一段，拿到可以公開存取的 HTTPS 網域。 Paddle 的網站驗證、default payment link 和 webhook 都需要這個網域。

- [ ] GitHub repo 是最新程式碼。
- [ ] Zeabur 連接正確 repo 和 branch。
- [ ] Build command 是 `npm run build`。
- [ ] Start command 是 `npm run start`。
- [ ] 服務監聽 `process.env.PORT`。
- [ ] Host 使用 `0.0.0.0`。
- [ ] `/api/health` 可存取。
- [ ] `/monetization.json` 可存取。
- [ ] 已設定 `/data` volume。
- [ ] `PAYMENT_STORE_FILE=/data/payment-store.json`。
- [ ] 已取得 Zeabur HTTPS 域名，例如 `https://你的项目.zeabur.app`。

## 六、Paddle 檢查

**【本節核心】確認 Paddle 帳戶、網域、產品、價格和 webhook 都已準備好。 **

Zeabur 網站打開後，再做 Paddle。不要在還沒有網域時硬接付款。

- [ ] Paddle onboarding 完成。
- [ ] 網站域名通過驗證。
- [ ] Pricing page 填入 Zeabur 網域下的公開頁面。
- [ ] Terms of service / Privacy policy / Refund policy 都使用帶有路徑的 URL。
- [ ] Default payment link 已設定為通過驗證的網域名稱。
- [ ] Product 已建立。
- [ ] One-time price 已建立。
- [ ] CNY price id 填入 Zeabur 環境變數。
- [ ] USD price id 填入 Zeabur 環境變數。
- [ ] API key 是正確環境：sandbox 或 live。
- [ ] Webhook destination 指向 `https://你的域名/api/webhooks/paddle`。
- [ ] Webhook secret 填入 Zeabur Variables。
- [ ] 已選擇 `transaction.completed` 事件。
- [ ] sandbox 付款能觸發 webhook。

## 七、環境變數檢查

**【本節核心】確認部署平台上的變數完整且環境一致。 **

Zeabur Variables 至少要有。第一次只為了拿域名時，Paddle 相關變數可以先留空或用佔位值；等 Paddle 建好 product、price、webhook 後再補齊：```bash
PAYMENT_SERVER_HOST=0.0.0.0
PAYMENT_STORE_FILE=/data/payment-store.json
PUBLIC_BASE_URL=https://你的域名
CORS_ORIGIN=https://你的域名
PADDLE_ENVIRONMENT=sandbox
PADDLE_API_KEY=...
PADDLE_CNY_PRICE_ID=pri_...
PADDLE_USD_PRICE_ID=pri_...
PADDLE_WEBHOOK_SECRET=...
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

上線 live 時，把 sandbox 全部換成 live。不要混用。

## 八、付費安全檢查

**【本節核心】確認只有真實支付成功才會解鎖。 **

至少測試這些情況：

- [ ] URL 加 `# paid=true` 不會解鎖。
- [ ] 隨便改 session id 不會解鎖。
- [ ] 錯誤 webhook secret 不會解鎖。
- [ ] 重複 webhook 不會發放多次。
- [ ] `transaction.payment_failed` 不會解鎖。
- [ ] `transaction.completed` 才會解鎖。
- [ ] 同一訂單不能解鎖另一份 reportId。

## 九、真實使用者體驗檢查

**【本節核心】用手機和電腦各走一次完整流程。 **

用手機和電腦各跑一次：

- [ ] 首頁文案看得懂。
- [ ] 開始按鈕明顯。
- [ ] 答題頁不需一直滑。
- [ ] 免費報告有專業感。
- [ ] 付費按鈕清楚。
- [ ] 付款後有等待提示。
- [ ] 解鎖後完整報告排版穩定。
- [ ] 保存報告不會失敗或裁切。

## 十、上線前把測試入口關掉

**【本節核心】正式上線前關閉所有測試捷徑。 **

如果你有這些測試功能，上線前確認關閉：

- [ ] 直接跳結果頁按鈕。
- [ ] 0 元測試解鎖按鈕。
- [ ] mock 支付按鈕。
- [ ] admin 配置器入口。
- [ ] 任何 debug 面板。

如果你故意要保留，至少不要讓一般使用者看到。

## 十一、上線後第一天看什麼

**【本節核心】上線第一天重點盯支付鏈路和解鎖失敗。 **

上線後不要只看訪問量。重點看：

- 有多少人開始測驗。
- 有多少人完成測驗。
- 有多少人點擊付款。
- Paddle checkout 有沒有打開。
- webhook 成功率。
- 付款成功後有沒有解鎖失敗。
- 用戶有沒有回饋「付了但看不到」。

低價產品最怕支付連結出錯。第一天請多看 logs。

## 一句話驗收

**【本節核心】陌生用戶能完成測驗、付款並自動看到完整報告，才算上線成功。 **

當你可以穩定做到：

```text
陌生用戶開啟網站 -> 完成測驗 -> 付款 -> 自動看到完整報告
```

才算真正上線。