# 07. Go Live Checklist

![Launch checklist chapter art](../../assets/chapters/chapter-07-launch.webp)
**【Core of this Chapter】Check the product process, GitHub, Zeabur, Paddle, environment variables and payment security one by one before going online. **

Don’t just look at “whether the page is beautiful or not” before going online. The most important thing about a paid website is that users can complete payment, get things after payment, and people who have not paid cannot bypass it.

Go through this list one by one.

> 💡 **Why do this#  **
> The risk of paid websites is not only the visual appearance of the page. If there is an error in any of the order, webhook, key, and unlocking permissions, users may encounter the problem of "paid but unable to see" or "not paid yet able to view".

## 1. Basic functions

**[Core of this section] First confirm that users can go from the home page to the report page. **

- [ ] Home page can be opened.
- [ ] User can start quizzes.
- [ ] User can complete all questions.
- [ ] Generate `reportId` after answering.
- [ ] Free introductory version of the report can be displayed.
- [ ] Full report locked in case of non-payment.
- [ ] Payment button can create payment session.
- [ ] It can be automatically unlocked after successful payment.
- [ ] After refreshing the page, the unlocked report can still be opened.
- [ ] When changing browsers or without token, you cannot see other people's complete reports.

## 2. Codex delivery inspection

**【Core of this section】Let Codex run basic checks and go online without errors. **

Let Codex run:```bash
npm run typecheck
npm run build
```If it fails, don't hard go online. Post the error back to the Codex:

```text
This is a bug with npm run build, please help me fix it.
[Posting error]
```

## 3. Public document inspection

**【Core of this section】Confirm that there is no secret in the files that users can see. **

These files can be seen by users:

```text
public/*
dist/*
Front-end packaged js/css
```Make sure it doesn't contain:

- Paddle API key.
- Webhook secret.
- Admin token.
- `.env.payment.local` content.
- Your private test order information.

You can ask Codex to check:

```text
Please scan the public, dist and front-end source code to confirm that the API key, webhook secret, and admin token are not leaked.
```

## 4. GitHub check

**【Core of this section】Confirm that Zeabur will get the latest security version on GitHub. **

Zeabur will pull the code from GitHub, so confirm the repository status before deploying.

- [ ] GitHub repo has been created.
- [ ] The latest modification of this machine has been committed.
- [ ] The latest modification of this machine has been pushed.
- [ ] The latest README and code can be seen on the GitHub page.
- [ ] .env is not uploaded.
- [ ] .env.payment.local is not uploaded.
- [ ] Paddle API key, webhook secret, and admin token do not appear in the warehouse.
- [ ] The GitHub warehouse address can be copied to Zeabur for use.

## 5. Zeabur inspection

**【Core of this section】Confirm that the online service can be started, accessed, and payment information can be saved. **

Do this first to get a publicly accessible HTTPS domain name. Paddle's website verification, default payment link and webhook all require this domain name.

- [ ] GitHub repo is the latest code.
- [ ] Zeabur connects correct repo and branch.
- [ ] Build command is `npm run build`.
- [ ] Start command is `npm run start`.
- [ ] Service listening `process.env.PORT`.
- [ ] Host uses `0.0.0.0`.
- [ ] `/api/health` is accessible.
- [ ] `/monetization.json` is accessible.
- [ ] `/data` volume set.
- [ ] `PAYMENT_STORE_FILE=/data/payment-store.json`.
- [ ] Got the Zeabur HTTPS domain name, such as `https://你的项目.zeabur.app`.

## 6. Paddle inspection

**【Core of this section】Confirm that the Paddle account, domain name, product, price and webhook are all ready. **

After the Zeabur website can be opened, do Paddle. Don’t force payment when you don’t have a domain name.

- [ ] Paddle onboarding completed.
- [ ] The website domain name is verified.
- [ ] Pricing page fill in the public page under the Zeabur domain name.
- [ ] Terms of service / Privacy policy / Refund policy all use URLs with paths.
- [ ] Default payment link is set to a verified domain name.
- [ ] Product created.
- [ ] One-time price established.
- [ ] CNY price id is filled in the Zeabur environment variable.
- [ ] USD price id is filled in the Zeabur environment variable.
- [ ] API key is the correct environment: sandbox or live.
- [ ] Webhook destination points to `https://你的域名/api/webhooks/paddle`.
- [ ] Webhook secret is filled in Zeabur Variables.
- [ ] `transaction.completed` event selected.
- [ ] sandbox payment can trigger webhook.

## 7. Environment variable check

**【Core of this section】Confirm that the variables on the deployment platform are complete and the environment is consistent. **

Zeabur Variables at least. When you just want to get a domain name for the first time, Paddle related variables can be left blank or use placeholder values; wait for Paddle to build product, price, and webhook before filling them in:```bash
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
```When going live, replace all sandboxes with live. Don't mix them.

## 8. Paid security inspection

**【Core of this section】Confirm that it will be unlocked only if the real payment is successful. **

Test at least these scenarios:

- [ ] URL plus `# paid=true` will not unlock.
- [ ] Changing the session id randomly will not unlock it.
- [ ] Error webhook secret will not be unlocked.
- [ ] Duplicate webhook will not be issued multiple times.
- [ ] `transaction.payment_failed` will not unlock.
- [ ] `transaction.completed` will be unlocked.
- [ ] Another reportId cannot be unlocked for the same order.

## 9. Real user experience check

**【Core of this section】Go through the complete process once with your mobile phone and computer. **

Run once on your phone and once on your computer:

- [ ] The homepage copy is understandable.
- [ ] Start button is obvious.
- [ ] There is no need to keep sliding on the answer page.
- [ ] Free reports with a professional feel.
- [ ] The payment button is clear.
- [ ] There is a waiting prompt after payment.
- [ ] The full report layout is stable after unlocking.
- [ ] Saving reports does not fail or get clipped.

## 10. Close the test entrance before going online

**【Core of this section】Close all test shortcuts before official launch. **

If you have these test features, be sure to turn them off before going live:

- [ ] button to jump directly to the results page.
- [ ] 0 yuan test unlock button.
- [ ] mock payment button.
- [ ] admin configurator entry.
- [ ] any debug panel.

If you want to keep it on purpose, at least keep it out of sight for regular users.

## 11. What to watch on the first day after going online

**【Core of this section】On the first day of launch, focus on payment links and unlocking failures. **

Don’t just look at the number of visits after going online. Highlights:

- How many people started the quiz.
- How many people completed the quiz.
- How many people clicked to pay.
- Is Paddle checkout turned on?
- webhook success rate.
- Is there any unlocking failure after successful payment?
- Have users reported "paid but can't see it"?
Low-priced products are most afraid of errors in the payment link. Please read more logs on the first day.

## Acceptance in one sentence

**【Core of this section】Unknown users can only be considered successful online if they can complete the test, pay and automatically see the complete report. **

When you can do it stably:

```text
Unknown users open the website -> complete the quiz -> make payment -> automatically see the full report
```That’s when it’s really online.