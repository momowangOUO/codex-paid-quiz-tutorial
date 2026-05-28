# 05. 有域名后，再接 Paddle 付款与自动解锁

![Paddle payment unlock chapter art](../../assets/chapters/chapter-05-paddle.webp)
这一章默认你已经完成上一章，并拿到了一个 HTTPS 域名，例如：

```text
https://your-project.zeabur.app
```

**【本章核心】用 Zeabur 域名完成 Paddle 设置，再让后端通过 Paddle webhook 自动解锁报告。**

这一章不要从代码开始，而是先把 Paddle 后台需要的东西补齐。

> 💡 **为什么这样做？**
> Paddle 不是单纯给你一个按钮。它会检查你的账户、产品、域名、付款页和通知地址。后台资料没有完成时，代码就算写对，也可能出现 `checkout not enabled` 之类的错误。

### 第 1 步：先理解 Paddle 在整条链路里做什么

**【本步核心】Paddle 负责收钱和通知付款结果，你的网站负责创建订单和解锁报告。**

完整流程是：

```text
用户点击解锁
  -> 你的网站后端创建 payment session
  -> 后端请求 Paddle 创建 checkout
  -> 用户在 Paddle 页面付款
  -> Paddle 用 webhook 通知你的后端
  -> 后端确认付款有效
  -> 后端解锁对应 reportId
```

你的网站要做三件事：

1. 创建 checkout。
2. 接收并验证 webhook。
3. 付款确认后发放访问权限。

Paddle 要做三件事：

1. 显示付款页面。
2. 处理信用卡、PayPal 或部分地区可用的本地支付方式。
3. 把付款结果发回你的后端。

> 💡 **为什么这样做？**
> 用户付款这件事不能让前端网页自己判断。前端像店面展示区，后端像收银系统，Paddle 像第三方收款台。只有收款台通知后端“这笔钱确认到了”，后端才应该开门交付报告。

### 第 2 步：完成 Paddle onboarding

**【本步核心】先让 Paddle 账户具备创建 checkout 的资格。**

进入 Paddle 后台，按页面要求填写：

1. 账户或公司资料。
2. 你销售的产品类型。
3. 产品说明。
4. 年收入区间。
5. 收款方式。
6. 网站域名。
7. 是否遵守 Paddle acceptable use policy。

产品说明可以写得保守、清楚，例如：

```text
We sell a one-time digital career assessment report.
Users complete a quiz and receive a personalized online report.
The product is digital content access, not employment placement, financial advice, medical advice, or guaranteed career outcome.
```

如果 Paddle 显示：

```text
Checkout has not yet been enabled for this account
```

优先检查：

1. Onboarding 是否完成。
2. Website approval 是否完成。
3. Default payment link 是否设置。
4. Product 和 price 是否存在。
5. 账户是否还在等待 Paddle 审核。

> 💡 **为什么这样做？**
> 这一步像是开通收银台的商户审核。Paddle 需要知道你卖什么、用户买到什么、是否符合平台政策。它不只是一个技术 API。

### 第 3 步：提交网站验证

**【本步核心】把上一章拿到的 Zeabur 域名填给 Paddle，让 Paddle 确认这是你的销售网站。**

在 Paddle 的 website approval 或 domain verification 页面填写：

```text
https://你的-zeabur-域名
```

如果 Paddle 要求 Pricing page，填：

```text
https://你的域名/pricing
```

如果 Paddle 要求 Terms、Privacy、Refund，分别填：

```text
https://你的域名/terms
https://你的域名/privacy
https://你的域名/refund
```

注意这些 URL 要能直接打开，不能只填网站首页。

![Paddle 网站验证示意](../../assets/diagrams/04-paddle-domain.svg)

> 💡 **为什么这样做？**
> Paddle 需要从用户视角看你的网站：价格在哪、规则在哪、隐私说明在哪、退款说明在哪。路径完整的 URL 比只填首页更容易通过检查。

### 第 4 步：设置 default payment link

**【本步核心】告诉 Paddle：以后创建 checkout 时，付款页使用哪个已验证域名。**

Default payment link 建议填：

```text
https://你的-zeabur-域名/
```

这里常见误解：

1. 它不是你要贴给用户的商品链接。
2. 它不是 webhook URL。
3. 它不是某个 reportId 的结果页。
4. 它是 Paddle 创建 checkout 时使用的账户级付款域名。

如果没有设置 default payment link，你的后端即使 API key 正确，也可能无法创建 transaction checkout。

> 💡 **为什么这样做？**
> 你可以把 default payment link 想成“付款系统默认使用的店面地址”。没有这个地址，Paddle 不知道该把付款页挂在哪个已批准的网站下面。

### 第 5 步：创建一次性产品

**【本步核心】在 Paddle 里创建你要卖的数字报告产品。**

建议填写：

| 字段 | 建议写法 |
| --- | --- |
| Product name | AI Career Action Report，或你的报告名称 |
| Description | One-time access to a personalized digital career assessment report. |
| Product type | Digital product |
| Tax category | Digital goods、eBooks，或 Paddle 账户当前允许的最接近类别 |

不要写成订阅，不要写成长期会员，除非你的产品真的要按月收费。

> 💡 **为什么这样做？**
> Product 是“你卖的东西”。对一次性报告来说，产品应该是一次性数字内容访问权，而不是课程班、就业服务或人工咨询承诺。

### 第 6 步：创建两个一次性价格

**【本步核心】为同一个产品建立国内和海外两个 one-time price。**

建议先建：

| 用途 | 币种与价格 | 说明 |
| --- | --- | --- |
| 国内价格 | CNY 9.90 | 用于中国区或中文用户 |
| 海外价格 | USD 1.99 | 用于海外信用卡 / PayPal 用户 |

价格类型选择：

```text
One-time
```

不要选择 subscription。

创建后复制两个 price id：

```bash
PADDLE_CNY_PRICE_ID=pri_xxx
PADDLE_USD_PRICE_ID=pri_xxx
```

![Paddle 产品与价格示意](../../assets/diagrams/05-paddle-product-price.svg)

> 💡 **为什么这样做？**
> Product 是商品本体，Price 是这个商品的某个售价。一个商品可以有多个价格，例如人民币价格和美元价格。后端创建 checkout 时，会用 price id 告诉 Paddle 这次应该收多少钱。

### 第 7 步：创建 API key，并放到 Zeabur Variables

**【本步核心】API key 只给后端使用，绝不能放进前端公开文件。**

在 Paddle Developer tools 创建 API key。

然后进入 Zeabur 的 Variables，填写：

```bash
PADDLE_ENVIRONMENT=sandbox
PADDLE_API_KEY=你的_sandbox_api_key
PADDLE_CNY_PRICE_ID=pri_xxx
PADDLE_USD_PRICE_ID=pri_xxx
```

请注意：

1. Sandbox key 搭配 sandbox price。
2. Live key 搭配 live price。
3. 不要混用。
4. 不要把 API key 写进 `public/monetization.json`。
5. 不要把 API key 写进前端 `.tsx`、`.js`、`.html`。

正确概念是：

```text
浏览器前端：只知道“我要付款”
你的后端：拿 API key 去找 Paddle 创建 checkout
Paddle：返回付款页 URL
```

> 💡 **为什么这样做？**
> API key 像收银台后台钥匙。用户浏览器是公开场所，任何放到前端的内容都可能被看到。钥匙只能放在后端或部署平台的环境变量里。

### 第 8 步：设置 webhook

**【本步核心】让 Paddle 知道付款完成后要通知你的网站哪个地址。**

在 Paddle Notification destination 填：

```text
https://你的-zeabur-域名/api/webhooks/paddle
```

至少选择这些事件：

```text
transaction.completed
transaction.payment_failed
transaction.canceled
transaction.past_due
```

然后复制 webhook secret，填到 Zeabur Variables：

```bash
PADDLE_WEBHOOK_SECRET=你的_webhook_secret
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

![Paddle Webhook 示意](../../assets/diagrams/06-paddle-webhook.svg)

> 💡 **为什么这样做？**
> Webhook 像 Paddle 主动打给你后端的一通电话：“这笔交易完成了”。Webhook secret 像双方约好的暗号。没有暗号，别人也可能伪造一通电话说自己付钱了。

### 第 9 步：让后端创建 Paddle checkout

**【本步核心】用户点击付款按钮时，前端只请求你的后端，不直接接触 Paddle API key。**

前端请求：

```http
POST /api/payments/checkout
Content-Type: application/json

{
  "reportId": "rep_xxx",
  "region": "domestic"
}
```

后端要做：

1. 创建本地 payment session。
2. 根据地区选择 `PADDLE_CNY_PRICE_ID` 或 `PADDLE_USD_PRICE_ID`。
3. 调 Paddle create transaction API。
4. 把 `reportId` 放进 `custom_data`。
5. 把 `payment_session_id` 放进 `custom_data`。
6. 保存 Paddle transaction id。
7. 返回 Paddle checkout URL 给前端。

给 Codex 的提示词：

```text
我已经有 Zeabur HTTPS 域名，现在要接 Paddle。

请新增 Paddle provider。

要求：
1. 保留 mock provider，方便测试。
2. POST /api/payments/checkout 调 Paddle create transaction。
3. 国内使用 PADDLE_CNY_PRICE_ID，海外使用 PADDLE_USD_PRICE_ID。
4. transaction custom_data 必须包含 reportId 和 payment_session_id。
5. 所有 secret 只能从 process.env 读取。
6. public/monetization.json 不能包含任何 secret。
```

> 💡 **为什么这样做？**
> `custom_data` 是你放在 Paddle 订单里的“便签”。Webhook 回来时，后端要靠这张便签知道：这笔付款对应哪一份报告、哪一个 payment session。

### 第 10 步：只让 webhook 解锁报告

**【本步核心】不要因为用户回到页面、URL 多了参数、前端显示成功，就直接解锁。**

Paddle 通知你的后端：

```text
POST /api/webhooks/paddle
```

后端必须做这些检查：

1. 用 raw body 验证 `Paddle-Signature`。
2. 只接受 `transaction.completed`。
3. 检查 `custom_data.payment_session_id`。
4. 检查 `custom_data.report_id`。
5. 检查 price id。
6. 检查金额。
7. 检查币种。
8. 重复 webhook 要幂等处理。
9. 所有检查通过后，才写入 `accessToken`。

给 Codex 的提示词：

```text
请实现 POST /api/webhooks/paddle。

要求：
1. 必须使用 raw body 验证 Paddle-Signature。
2. 只接受 transaction.completed 解锁。
3. transaction.payment_failed / transaction.canceled / transaction.past_due 不解锁。
4. custom_data 里的 reportId 和 payment_session_id 必须匹配本地 session。
5. price id、金额、币种不匹配不能解锁。
6. 重复 webhook 不能重复发放权限。
7. 任何错误都要写入 payment_events，方便排查。
```

> 💡 **为什么这样做？**
> 用户付款页跳回你的网站，只代表浏览器回来了，不代表钱已经确认到账。真正可靠的信号是 Paddle 服务器发来的、经过签名验证的 webhook。

### 第 11 步：按固定顺序测试 sandbox

**【本步核心】先用 sandbox 证明整条链路能走通，再切 live。**

接下来按这个顺序测：

1. Zeabur 环境变量填 sandbox API key。
2. Zeabur 环境变量填 sandbox price id。
3. Zeabur 环境变量填 sandbox webhook secret。
4. 重新部署。
5. 打开线上域名。
6. 完成测验。
7. 点击付款。
8. 跳到 Paddle sandbox checkout。
9. 用 Paddle 提供的测试卡付款。
10. 打开 Paddle notification log。
11. 打开 Zeabur logs。
12. 确认 webhook 返回成功。
13. 回到报告页，确认自动解锁。

> 💡 **为什么这样做？**
> Sandbox 是支付平台提供的测试环境。它让你不用真实收钱，也能确认 API、webhook、解锁逻辑是否正确。

### 第 12 步：常见错误排查

**【本步核心】看到错误时先判断是账户设置、环境变量、代码还是 webhook 问题。**

#### Checkout has not yet been enabled

优先检查：

1. Paddle onboarding 是否完成。
2. 网站验证是否通过。
3. Default payment link 是否设置。
4. Product 和 price 是否建立。
5. 账户是否还在 Paddle 审核中。

#### Authentication header incorrectly formatted

环境变量只放 key 本身：

```bash
PADDLE_API_KEY=pdl_sdbx_xxx
```

请求 header 才是：

```text
Authorization: Bearer pdl_sdbx_xxx
```

不要在环境变量里写：

```bash
PADDLE_API_KEY=Bearer pdl_sdbx_xxx
```

#### 付款后没有解锁

按顺序查：

1. Paddle notification log 有没有发出 webhook。
2. Zeabur logs 有没有收到请求。
3. Webhook URL 是否是 `/api/webhooks/paddle`。
4. Webhook secret 是否一致。
5. 事件是不是 `transaction.completed`。
6. `custom_data` 是否有 `payment_session_id` 和 `report_id`。
7. `/data/payment-store.json` 是否写入成功。

> 💡 **为什么这样做？**
> 付款失败可能不是同一种原因。把问题拆成“Paddle 有没有发出通知、Zeabur 有没有收到、后端有没有通过验证、数据有没有写入”，就能快速定位卡在哪一段。

### 第 13 步：切换到 live 前做最后确认

**【本步核心】Sandbox 跑通后，再把 Paddle 的 live 资料换上去。**

切 live 前确认：

1. Paddle live onboarding 已通过。
2. Live website approval 已通过。
3. Live default payment link 已设置。
4. Live product 已建立。
5. Live one-time price 已建立。
6. Zeabur Variables 已换成 live API key。
7. Zeabur Variables 已换成 live price id。
8. Zeabur Variables 已换成 live webhook secret。
9. `PADDLE_ENVIRONMENT=live`。
10. 测试入口、0 元解锁、mock 按钮都已关闭。

> 💡 **为什么这样做？**
> Sandbox 和 live 是两套世界。Sandbox key 不能收真钱，live key 不应该拿来乱测。切换时要成套替换，避免 key、price id、webhook secret 混在一起。

### 本章完成标准

**【本章核心】你要能证明用户真实付款后，报告由后端自动解锁。**

完成后请逐项确认：

1. 用户点击付款按钮能打开 Paddle checkout。
2. Paddle sandbox 付款后 webhook 回到 Zeabur 后端。
3. 后端只在 `transaction.completed` 后解锁。
4. 错误签名不会解锁。
5. 错误金额不会解锁。
6. 错误 price id 不会解锁。
7. 重复 webhook 不会重复发放。
8. 用户刷新报告页后仍能看到已解锁内容。
9. 换浏览器或没有 access token 时，不能看到别人的完整报告。

当这些都成立，Paddle 接入才算真正跑通。
