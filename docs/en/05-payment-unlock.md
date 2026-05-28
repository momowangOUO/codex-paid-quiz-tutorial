# 05. After you have a domain name, accept Paddle payment and automatically unlock it.

![Paddle payment unlock chapter art](../../assets/chapters/chapter-05-paddle.webp)
This chapter assumes that you have completed the previous chapter and obtained an HTTPS domain name, for example:

```text
https://your-project.zeabur.app
```

**【Core of this Chapter】Use the Zeabur domain name to complete the Paddle settings, and then let the backend automatically unlock the report through the Paddle webhook. **

This chapter does not start with the code, but first completes the things that Paddle needs in the background.

> 💡 **Why do this#  **
> Paddle doesn’t just give you a button. It checks your account, products, domains, payment pages, and notification addresses. When the background data is not completed, even if the code is written correctly, errors such as `checkout not enabled` may occur.

### Step 1: First understand what Paddle does in the entire link

**【Core of this step】Paddle is responsible for collecting money and notifying payment results, and your website is responsible for creating orders and unlocking reports. **

The complete process is:

```text
User clicks to unlock
  -> Your website backend creates a payment session
  -> The backend requests Paddle to create a checkout
  -> User pays on Paddle page
  -> Paddle uses webhooks to notify your backend
  -> The backend confirms that the payment is valid
  -> Backend unlock corresponding reportId
```Your website needs to do three things:

1. Create a checkout.
2. Receive and verify the webhook.
3. Access rights will be issued after payment is confirmed.

Paddle does three things:

1. Display the payment page.
2. Process credit card, PayPal or local payment methods available in some areas.
3. Send payment results back to your backend.

> 💡 **Why do this#  **
> User payment cannot be left to the front-end web page to judge. The front end is like a store display area, the back end is like a cashier system, and Paddle is like a third-party checkout counter. Only when the checkout desk notifies the backend that "the money has been confirmed" should the backend open the door and deliver the report.

### Step 2: Complete Paddle onboarding

**【Core of this step】First make the Paddle account eligible to create a checkout. **

Enter the Paddle backend and fill in the following pages as required:

1. Account or company information.
2. The type of product you sell.
3. Product description.
4. Annual income range.
5. Payment method.
6. Website domain name.
7. Comply with Paddle acceptable use policy.

Product descriptions can be written conservatively and clearly, for example:

```text
We sell a one-time digital career assessment report.
Users complete a quiz and receive a personalized online report.
The product is digital content access, not employment placement, financial advice, medical advice, or guaranteed career outcome.
```If Paddle displays:

```text
Checkout has not yet been enabled for this account
```Priority checks:

1. Whether Onboarding is completed.
2. Is Website approval completed?
3. Whether the Default payment link is set.
4. Whether Product and price exist.
5. Is the account still waiting for Paddle review?
> 💡 **Why do this#  **
> This step is like a merchant review to open a cashier. Paddle needs to know what you sell, what users buy, and whether it complies with platform policies. It's not just a technical API.

### Step 3: Submit website verification

**[Core of this step] Fill in the Zeabur domain name obtained in the previous chapter to Paddle, and let Paddle confirm that this is your sales website. **

Fill in the following on Paddle’s website approval or domain verification page:

```text
https://your-zeabur-domain name
```If Paddle requires a Pricing page, fill in:

```text
https://yourdomain/pricing
```If Paddle requires Terms, Privacy, and Refund, fill in respectively:

```text
https://yourdomain/terms
https://yourdomain/privacy
https://yourdomain/refund
```Note that these URLs must be able to be opened directly and cannot just fill in the homepage of the website.

![Paddle website verification instructions](../../assets/diagrams/04-paddle-domain.svg)

> 💡 **Why do this#  **
> Paddle needs to look at your website from the user's perspective: where are the prices, where are the rules, where are the privacy instructions, and where are the refund instructions. A URL with a complete path is easier to pass than just the home page.

### Step 4: Set default payment link

**[Core of this step] Tell Paddle: Which verified domain name should be used for the payment page when creating a checkout in the future. **

Default payment link It is recommended to fill in:

```text
https://your-zeabur-domain/
```Common misunderstandings here:

1. It is not a product link you want to post to users.
2. It is not a webhook URL.
3. It is not a result page for a certain reportId.
4. It is the account-level payment domain name used by Paddle when creating checkout.

If the default payment link is not set, your backend may not be able to create a transaction checkout even if the API key is correct.

> 💡 **Why do this#  **
> You can think of default payment link as "the store address used by the payment system by default". Without this address, Paddle doesn't know which approved website to host the payment page on.

### Step 5: Create a one-time product

**【Core of this step】Create the digital reporting product you want to sell in Paddle. **

It is recommended to fill in:

| Field | Suggested writing |
| --- | --- |
| Product name | AI Career Action Report, or your report name |
| Description | One-time access to a personalized digital career assessment report. |
| Product type | Digital product |
| Tax category | Digital goods, eBooks, or the closest category currently allowed for your Paddle account |

Don’t write it as a subscription, don’t write it as a long-term membership, unless your product really charges a monthly fee.

> 💡 **Why do this#  **
> Product is “what you sell”. For a one-time report, the product should be a one-time access to digital content, not a class, career services or human consulting commitment.

### Step 6: Create two one-time prices

**【Core of this step】Establish two one-time prices, domestic and overseas, for the same product. **

It is recommended to build first:

| Purpose | Currency and Price | Description |
| --- | --- | --- |
| Domestic price | CNY 9.90 | For China area or Chinese users |
| Overseas Price | USD 1.99 | For Overseas Credit Card / PayPal Users |

Price type selection:

```text
One-time
```Do not select subscription.

After creation, copy the two price ids:```bash
PADDLE_CNY_PRICE_ID=pri_xxx
PADDLE_USD_PRICE_ID=pri_xxx
```

![Paddle product and price description](../../assets/diagrams/05-paddle-product-price.svg)

> 💡 **Why do this#  **
> Product is the product itself, and Price is a certain selling price of this product. A product can have multiple prices, such as RMB price and USD price. When the backend creates a checkout, it will use the price id to tell Paddle how much it should charge this time.

### Step 7: Create API key and put it in Zeabur Variables

**【Core of this step】API key is only used by the backend and must not be put into the front-end public files. **

Create an API key in Paddle Developer tools.

Then enter Zeabur's Variables and fill in:```bash
PADDLE_ENVIRONMENT=sandbox
PADDLE_API_KEY=你的_sandbox_api_key
PADDLE_CNY_PRICE_ID=pri_xxx
PADDLE_USD_PRICE_ID=pri_xxx
```Please note:

1. Sandbox key matches sandbox price.
2. Live key is paired with live price.
3. Don’t mix.
4. Do not write the API key into `public/monetization.json`.
5. Do not write the API key into the front-end `.tsx`, `.js`, and `.html`.

The correct concept is:

```text
Browser front-end: only knows "I want to pay"
Your backend: Take the API key to Paddle to create a checkout
Paddle: Return to payment page URL
```

> 💡 **Why do this#  **
> API key is like a checkout backend key. The user's browser is a public place, and anything put on the front end may be seen. The key can only be placed in the environment variables of the backend or deployment platform.

### Step 8: Set up webhook

**【Core of this step】Let Paddle know which address to notify your website after payment is completed. **

Fill in Paddle Notification destination:

```text
https://your-zeabur-domain/api/webhooks/paddle
```Select at least these events:

```text
transaction.completed
transaction.payment_failed
transaction.canceled
transaction.past_due
```Then copy the webhook secret and fill it in Zeabur Variables:```bash
PADDLE_WEBHOOK_SECRET=你的_webhook_secret
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

![Paddle Webhook signal](../../assets/diagrams/06-paddle-webhook.svg)

> 💡 **Why do this#  **
> Webhook is like Paddle proactively making a call to your backend: "This transaction is completed." Webhook secret is like the password agreed by both parties. Without a secret code, someone could also fake a phone call and say they paid.

### Step 9: Let the backend create the Paddle checkout

**[Core of this step] When the user clicks the payment button, the front end only requests your back end and does not directly contact the Paddle API key. **

Front-end request:```http
POST /api/payments/checkout
Content-Type: application/json

{
  "reportId": "rep_xxx",
  "region": "domestic"
}
```The backend needs to do:

1. Create a local payment session.
2. Select `PADDLE_CNY_PRICE_ID` or `PADDLE_USD_PRICE_ID` according to the region.
3. Call Paddle create transaction API.
4. Put `reportId` into `custom_data`.
5. Put `payment_session_id` into `custom_data`.
6. Save the Paddle transaction id.
7. Return the Paddle checkout URL to the front end.

Tip words for Codex:

```text
I already have a Zeabur HTTPS domain name and now want to connect to Paddle.

Please add a new Paddle provider.

Requirements:
1. Keep the mock provider to facilitate testing.
2. POST /api/payments/checkout calls Paddle create transaction.
3. Use PADDLE_CNY_PRICE_ID domestically and PADDLE_USD_PRICE_ID overseas.
4. transaction custom_data must contain reportId and payment_session_id.
5. All secrets can only be read from process.env.
6. public/monetization.json cannot contain any secrets.
```

> 💡 **Why do this#  **
> `custom_data` is the "sticky note" you put in your Paddle order. When the webhook comes back, the backend relies on this note to know: which report and payment session this payment corresponds to.

### Step 10: Only let the webhook unlock the report

**【Core of this step】Do not unlock directly just because the user returns to the page, the URL has more parameters, or the front-end display is successful. **

Paddle notifies your backend:

```text
POST /api/webhooks/paddle
```The backend must do these checks:

1. Verify `Paddle-Signature` with raw body.
2. Only `transaction.completed` is accepted.
3. Check `custom_data.payment_session_id`.
4. Check `custom_data.report_id`.
5. Check the price id.
6. Check the amount.
7. Check the currency.
8. Repeated webhooks must be idempotent.
9. Write `accessToken` only after all checks pass.

Tip words for Codex:

```text
Please implement POST /api/webhooks/paddle.

Requirements:
1. Raw body must be used to verify Paddle-Signature.
2. Only transaction.completed unlocks are accepted.
3. transaction.payment_failed / transaction.canceled / transaction.past_due are not unlocked.
4. The reportId and payment_session_id in custom_data must match the local session.
5. The price id, amount, and currency cannot be unlocked if they do not match.
6. Repeated webhook permissions cannot be issued repeatedly.
7. Any errors must be written to payment_events to facilitate troubleshooting.
```

> 💡 **Why do this#  **
> The user's payment page jumps back to your website. It only means that the browser has returned, but it does not mean that the money has been confirmed. The truly reliable signal is the signature-verified webhook sent from the Paddle server.

### Step 11: Test the sandbox in a fixed order

**[Core of this step] First use sandbox to prove that the entire link can go through, and then switch to live. **

Next, test in this order:

1. Fill in the sandbox API key for Zeabur environment variables.
2. Fill in the sandbox price id in the Zeabur environment variable.
3. Fill in the Zeabur environment variable with sandbox webhook secret.
4. Redeploy.
5. Open the online domain name.
6. Complete the quiz.
7. Click Pay.
8. Jump to the Paddle sandbox checkout.
9. Pay with the test card provided by Paddle.
10. Open the Paddle notification log.
11. Open Zeabur logs.
12. Confirm that the webhook returns successfully.
13. Return to the report page and confirm automatic unlocking.

> 💡 **Why do this#  **
> Sandbox is a testing environment provided by the payment platform. It allows you to confirm whether the API, webhook, and unlocking logic are correct without actually collecting money.

### Step 12: Troubleshoot common errors

**【Core of this step】When you see an error, first determine whether it is an issue with account settings, environment variables, code or webhook. **

#### Checkout has not yet been enabled

Priority checks:

1. Whether Paddle onboarding is completed.
2. Whether the website verification is passed.
3. Whether the Default payment link is set.
4. Whether Product and price are established.
5. Whether the account is still under review by Paddle.

#### Authentication header incorrectly formatted

The environment variable only contains the key itself:```bash
PADDLE_API_KEY=pdl_sdbx_xxx
```The request header is:

```text
Authorization: Bearer pdl_sdbx_xxx
```Do not write in environment variables:```bash
PADDLE_API_KEY=Bearer pdl_sdbx_xxx
```

#### Not unlocked after payment

Check in order:

1. Does Paddle notification log send webhook?
2. Has Zeabur logs received the request?
3. Whether the Webhook URL is `/api/webhooks/paddle`.
4. Whether the Webhook secret is consistent.
5. Is the event `transaction.completed`?
6. Does `custom_data` have `payment_session_id` and `report_id`.
7. Whether `/data/payment-store.json` is written successfully.

> 💡 **Why do this#  **
> Payment failure may not be due to the same reason. By splitting the question into "Did Paddle send a notification, did Zeabur receive it, did the backend pass the verification, and did the data get written," you can quickly locate which section is stuck.

### Step 13: Make final confirmation before switching to live

**【Core of this step】After the Sandbox is run through, replace the live data of Paddle. **

Confirm before switching to live:

1. Paddle live onboarding passed.
2. Live website approval has been passed.
3. Live default payment link has been set.
4. Live product has been created.
5. Live one-time price has been established.
6. Zeabur Variables have been replaced by live API keys.
7. Zeabur Variables have been replaced by live price id.
8. Zeabur Variables have been replaced by live webhook secret.
9. `PADDLE_ENVIRONMENT=live`.
10. The test entrance, 0 yuan unlock, and mock buttons are all closed.

> 💡 **Why do this#  **
> Sandbox and live are two different worlds. Sandbox keys cannot accept real money, and live keys should not be used for random testing. When switching, replace them in sets to avoid mixing key, price id, and webhook secret.

### Completion criteria for this chapter

**[Core of this Chapter] You must be able to prove that the user actually paid, and the report will be automatically unlocked by the backend. **

After completion, please confirm item by item:

1. The user clicks the payment button to open the Paddle checkout.
2. After Paddle sandbox pays, the webhook returns to the Zeabur backend.
3. The backend is only unlocked after `transaction.completed`.
4. Wrong signature will not be unlocked.
5. Wrong amount will not be unlocked.
6. Wrong price id will not be unlocked.
7. Duplicate webhooks will not be issued repeatedly.
8. Users can still see the unlocked content after refreshing the report page.
9. When changing browsers or without access token, you cannot see other people’s complete reports.

When all of these are established, Paddle access is truly successful.