# 05. 有網域後，再接 Paddle 付款與自動解鎖

![Paddle payment unlock chapter art](../../assets/chapters/chapter-05-paddle.webp)
這一章預設你已經完成上一章，並且拿到了一個 HTTPS 域名，例如：

```text
https://your-project.zeabur.app
```

**【本章核心】用 Zeabur 網域完成 Paddle 設置，再讓後端透過 Paddle webhook 自動解鎖報告。 **

這一章不要從程式碼開始，而是先把 Paddle 後台需要的東西補齊。

> 💡 **為什麼要這樣做？ **
> Paddle 不是單純給你一個按鈕。它會檢查你的帳戶、產品、網域、付款頁和通知地址。後台資料沒有完成時，程式碼就算寫對，也可能出現 `checkout not enabled` 之類的錯誤。

### 第 1 步：先理解 Paddle 在整個連結裡做什麼

**【本步核心】Paddle 負責收錢和通知付款結果，你的網站負責創建訂單和解鎖報告。 **

完整流程是：

```text
用戶點擊解鎖
  -> 你的網站後端創建 payment session
  -> 後端請求 Paddle 建立 checkout
  -> 用戶在 Paddle 頁面付款
  -> Paddle 用 webhook 通知你的後端
  -> 後端確認付款有效
  -> 後端解鎖對應 reportId
```

你的網站要做三件事：

1. 建立 checkout。
2. 接收並驗證 webhook。
3. 付款確認後發放存取權限。

Paddle 要做三件事：

1. 顯示付款頁面。
2. 處理信用卡、PayPal 或部分地區可用的本地付款方式。
3. 把付款結果發回你的後端。

> 💡 **為什麼要這樣做？ **
> 使用者付款這件事不能讓前端網頁自己判斷。前端像店展示區，後端像收銀系統，Paddle 像第三方收款台。只有收款台通知後端“這筆錢確認到了”，後端才應該開門交付報告。

### 第 2 步：完成 Paddle onboarding

**【本步核心】先讓 Paddle 帳戶具備創建 checkout 的資格。 **

進入 Paddle 後台，依頁面要求填寫：

1. 帳戶或公司資料。
2. 你銷售的產品類型。
3. 產品說明。
4. 年收入區間。
5. 收款方式。
6. 網站域名。
7. 是否遵守 Paddle acceptable use policy。

產品說明可以寫得保守、清楚，例如：

```text
We sell a one-time digital career assessment report.
Users complete a quiz and receive a personalized online report.
The product is digital content access, not employment placement, financial advice, medical advice, or guaranteed career outcome.
```

如果 Paddle 顯示：

```text
Checkout has not yet been enabled for this account
```

優先檢查：

1. Onboarding 是否完成。
2. Website approval 是否完成。
3. Default payment link 是否設定。
4. Product 和 price 是否存在。
5. 帳戶是否還在等待 Paddle 審核。

> 💡 **為什麼要這樣做？ **
> 這一步像是開通收銀台的商家審核。 Paddle 需要知道你賣什麼、用戶買到什麼、是否符合平台政策。它不只是一個技術 API。

### 第 3 步：提交網站驗證

**【本步核心】把上一章拿到的 Zeabur 網域填給 Paddle，請 Paddle 確認這是你的銷售網站。 **

在 Paddle 的 website approval 或 domain verification 頁面填寫：

```text
https://你的-zeabur-域名
```

如果 Paddle 要求 Pricing page，填：

```text
https://你的網域/pricing
```

如果 Paddle 要求 Terms、Privacy、Refund，分別填入：

```text
https://你的網域/terms
https://你的網域/privacy
https://你的網域/refund
```

注意這些 URL 要能直接打開，不能只填網站首頁。

![Paddle 網站驗證示意](../../assets/diagrams/04-paddle-domain.svg)

> 💡 **為什麼要這樣做？ **
> Paddle 需要從使用者視角看你的網站：價格在哪、規則在哪裡、隱私權說明在哪裡、退款說明在哪裡。路徑完整的 URL 比只填首頁更容易通過檢查。

### 第 4 步：設定 default payment link

**【本步核心】告訴 Paddle：以後創建 checkout 時，付款頁使用哪個已驗證網域。 **

Default payment link 建議填：

```text
https://你的-zeabur-域名/
```

這裡常見誤解：

1. 它不是你要貼給使用者的商品連結。
2. 它不是 webhook URL。
3. 它不是某個 reportId 的結果頁。
4. 它是 Paddle 創建 checkout 時使用的帳戶級付款域名。

如果沒有設定 default payment link，你的後端即使 API key 正確，也可能無法建立 transaction checkout。

> 💡 **為什麼要這樣做？ **
> 你可以把 default payment link 想成「付款系統預設使用的店面地址」。沒有這個地址，Paddle 不知道該把付款頁掛在哪個已批准的網站下面。

### 第 5 步：建立一次性產品

**【本步核心】在 Paddle 裡創造你要賣的數位報告產品。 **

建議填寫：

| 字段 | 建議寫法 |
| --- | --- |
| Product name | AI Career Action Report，或你的報告名稱 |
| Description | One-time access to a personalized digital career assessment report. |
| Product type | Digital product |
| Tax category | Digital goods、eBooks，或 Paddle 帳戶目前允許的最接近類別 |

不要寫成訂閱，不要寫成長期會員，除非你的產品真的要按月收費。

> 💡 **為什麼要這樣做？ **
> Product 是「你賣的東西」。對一次性報告來說，產品應該是一次性數位內容存取權，而不是課程班、就業服務或人工諮詢承諾。

### 第 6 步：建立兩個一次性價格

**【本步核心】為同一個產品建立國內和海外兩個 one-time price。 **

建議先建：

| 用途 | 幣種與價格 | 說明 |
| --- | --- | --- |
| 國內價格 | CNY 9.90 | 用於中國區或中文使用者 |
| 海外價格 | USD 1.99 | 用於海外信用卡 / PayPal 用戶 |

價格類型選擇：

```text
One-time
```

不要選擇 subscription。

建立後複製兩個 price id：```bash
PADDLE_CNY_PRICE_ID=pri_xxx
PADDLE_USD_PRICE_ID=pri_xxx
```

![Paddle 產品與價格示意](../../assets/diagrams/05-paddle-product-price.svg)

> 💡 **為什麼要這樣做？ **
> Product 是商品本體，Price 是這個商品的某個售價。一個商品可以有多個價格，例如人民幣價格和美元價格。後端創建 checkout 時，會用 price id 告訴 Paddle 這次應該收多少錢。

### 第 7 步：建立 API key，並放到 Zeabur Variables

**【本步核心】API key 只給後端使用，絕對不能放進前端公開檔案。 **

在 Paddle Developer tools 建立 API key。

然後進入 Zeabur 的 Variables，填寫：```bash
PADDLE_ENVIRONMENT=sandbox
PADDLE_API_KEY=你的_sandbox_api_key
PADDLE_CNY_PRICE_ID=pri_xxx
PADDLE_USD_PRICE_ID=pri_xxx
```

請注意：

1. Sandbox key 搭配 sandbox price。
2. Live key 搭配 live price。
3. 不要混用。
4. 不要把 API key 寫進 `public/monetization.json`。
5. 不要把 API key 寫進前端 `.tsx`、`.js`、`.html`。

正確概念是：

```text
瀏覽器前端：只知道“我要付款”
你的後端：拿 API key 去找 Paddle 創建 checkout
Paddle：返回付款頁 URL
```

> 💡 **為什麼要這樣做？ **
> API key 像收銀台後台鑰匙。使用者瀏覽器是公開場所，任何放到前端的內容都可能被看到。鑰匙只能放在後端或部署平台的環境變數裡。

### 第 8 步：設定 webhook

**【本步核心】讓 Paddle 知道付款完成後要通知你的網站哪個地址。 **

在 Paddle Notification destination 填：

```text
https://你的-zeabur-網域/api/webhooks/paddle
```

至少選擇這些事件：

```text
transaction.completed
transaction.payment_failed
transaction.canceled
transaction.past_due
```

然後複製 webhook secret，填到 Zeabur Variables：```bash
PADDLE_WEBHOOK_SECRET=你的_webhook_secret
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

![Paddle Webhook 示意](../../assets/diagrams/06-paddle-webhook.svg)

> 💡 **為什麼要這樣做？ **
> Webhook 像 Paddle 主動打給你後端的一通電話：「這筆交易完成了」。 Webhook secret 像雙方約好的暗號。沒有暗號，別人也可能偽造一通電話說自己付錢了。

### 第 9 步：讓後端建立 Paddle checkout

**【本步核心】使用者點擊付款按鈕時，前端只要求你的後端，不直接接觸 Paddle API key。 **

前端請求：```http
POST /api/payments/checkout
Content-Type: application/json

{
  "reportId": "rep_xxx",
  "region": "domestic"
}
```

後端要做：

1. 建立本地 payment session。
2. 根據地區選擇 `PADDLE_CNY_PRICE_ID` 或 `PADDLE_USD_PRICE_ID`。
3. 調 Paddle create transaction API。
4. 把 `reportId` 放進 `custom_data`。
5. 把 `payment_session_id` 放進 `custom_data`。
6. 儲存 Paddle transaction id。
7. 返回 Paddle checkout URL 給前端。

給 Codex 的提示詞：

```text
我已經有 Zeabur HTTPS 域名，現在要接 Paddle。

請新增 Paddle provider。

要求：
1. 保留 mock provider，方便測試。
2. POST /api/payments/checkout 調 Paddle create transaction。
3. 國內使用 PADDLE_CNY_PRICE_ID，海外使用 PADDLE_USD_PRICE_ID。
4. transaction custom_data 必須包含 reportId 和 payment_session_id。
5. 所有 secret 只能從 process.env 讀取。
6. public/monetization.json 不能包含任何 secret。
```

> 💡 **為什麼要這樣做？ **
> `custom_data` 是你放在 Paddle 訂單裡的「便籤」。 Webhook 回來時，後端要靠這張便條知道：這筆付款對應哪一份報告、哪一個 payment session。

### 第 10 步：只讓 webhook 解鎖報告

**【本步核心】不要因為使用者回到頁面、URL 多了參數、前端顯示成功，就直接解鎖。 **

Paddle 通知你的後端：

```text
POST /api/webhooks/paddle
```

後端必須做這些檢查：

1. 用 raw body 驗證 `Paddle-Signature`。
2. 只接受 `transaction.completed`。
3. 檢查 `custom_data.payment_session_id`。
4. 檢查 `custom_data.report_id`。
5. 檢查 price id。
6. 檢查金額。
7. 檢查幣種。
8. 重複 webhook 要冪等處理。
9. 所有檢查通過後，才寫入 `accessToken`。

給 Codex 的提示詞：

```text
請實作 POST /api/webhooks/paddle。

要求：
1. 必須使用 raw body 驗證 Paddle-Signature。
2. 只接受 transaction.completed 解鎖。
3. transaction.payment_failed / transaction.canceled / transaction.past_due 不解鎖。
4. custom_data 裡的 reportId 和 payment_session_id 必須符合本地 session。
5. price id、金額、幣種不匹配不能解鎖。
6. 重複 webhook 不能重複發放權限。
7. 任何錯誤都要寫入 payment_events，方便排查。
```

> 💡 **為什麼要這樣做？ **
> 使用者付款頁跳回你的網站，只代表瀏覽器回來了，不代表錢已經確認到帳。真正可靠的訊號是 Paddle 伺服器發送的、經過簽章驗證的 webhook。

### 第 11 步：以固定順序測試 sandbox

**【本步核心】先用 sandbox 證明整條連結能走通，再切 live。 **

接下來再按這個順序測：

1. Zeabur 環境變數填入 sandbox API key。
2. Zeabur 環境變數填入 sandbox price id。
3. Zeabur 環境變數填入 sandbox webhook secret。
4. 重新部署。
5. 打開線上域名。
6. 完成測驗。
7. 點選付款。
8. 跳到 Paddle sandbox checkout。
9. 用 Paddle 提供的測試卡付款。
10. 開啟 Paddle notification log。
11. 開啟 Zeabur logs。
12. 確認 webhook 返回成功。
13. 回到報告頁，確認自動解鎖。

> 💡 **為什麼要這樣做？ **
> Sandbox 是支付平台提供的測試環境。它讓你不用真實收錢，也能確認 API、webhook、解鎖邏輯是否正確。

### 第 12 步：常見錯誤排查

**【本步核心】看到錯誤時先判斷是帳戶設定、環境變數、程式碼還是 webhook 問題。 **

#### Checkout has not yet been enabled

優先檢查：

1. Paddle onboarding 是否完成。
2. 網站驗證是否通過。
3. Default payment link 是否設定。
4. Product 和 price 是否建立。
5. 帳戶是否還在 Paddle 審核中。

#### Authentication header incorrectly formatted

環境變數只放 key 本身：```bash
PADDLE_API_KEY=pdl_sdbx_xxx
```

請求 header 才是：

```text
Authorization: Bearer pdl_sdbx_xxx
```

不要在環境變數裡寫：```bash
PADDLE_API_KEY=Bearer pdl_sdbx_xxx
```

#### 付款後沒有解鎖

按順序查：

1. Paddle notification log 有沒有發出 webhook。
2. Zeabur logs 有沒有收到請求。
3. Webhook URL 是否是 `/api/webhooks/paddle`。
4. Webhook secret 是否一致。
5. 事件是不是 `transaction.completed`。
6. `custom_data` 是否有 `payment_session_id` 和 `report_id`。
7. `/data/payment-store.json` 是否寫入成功。

> 💡 **為什麼要這樣做？ **
> 付款失敗可能不是同一種原因。把問題拆成“Paddle 有沒有發出通知、Zeabur 有沒有收到、後端有沒有通過驗證、數據有沒有寫入”，就能快速定位卡在哪一段。

### 第 13 步：切換到 live 前做最後確認

**【本步核心】Sandbox 跑通後，再把 Paddle 的 live 資料換上去。 **

切 live 前確認：

1. Paddle live onboarding 已通過。
2. Live website approval 已通過。
3. Live default payment link 已設定。
4. Live product 已建立。
5. Live one-time price 已建立。
6. Zeabur Variables 已換成 live API key。
7. Zeabur Variables 已換成 live price id。
8. Zeabur Variables 已換成 live webhook secret。
9. `PADDLE_ENVIRONMENT=live`。
10. 測試入口、0 元解鎖、mock 按鈕都已關閉。

> 💡 **為什麼要這樣做？ **
> Sandbox 和 live 是兩組世界。 Sandbox key 不能收真錢，live key 不應該拿來亂測。切換時要成套替換，避免 key、price id、webhook secret 混在一起。

### 本章完成標準

**【本章核心】你要能證明用戶真實付款後，報告由後端自動解鎖。 **

完成後請逐項確認：

1. 用戶點選付款按鈕能開啟 Paddle checkout。
2. Paddle sandbox 付款後 webhook 回到 Zeabur 後端。
3. 後端只在 `transaction.completed` 後解鎖。
4. 錯誤簽名不會解鎖。
5. 錯誤金額不會解鎖。
6. 錯誤 price id 不會解鎖。
7. 重複 webhook 不會重複發放。
8. 用戶刷新報告頁後仍能看到已解鎖內容。
9. 換瀏覽器或沒有 access token 時，不能看到別人的完整報告。

當這些都成立，Paddle 接入才算真正跑通。