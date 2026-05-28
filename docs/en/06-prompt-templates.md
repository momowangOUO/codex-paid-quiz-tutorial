# 06. Copyable prompt word template

![Prompt templates chapter art](../../assets/chapters/chapter-06-prompts.webp)
**[Core of this chapter] Here is a collection of prompt words that can be directly posted to Codex for building a website, uploading to GitHub, deploying Zeabur, connecting to Paddle and troubleshooting errors. **

This chapter is a toolbox. You can paste the prompt words below directly to Codex, and then replace the content in brackets with your own project.

> 💡 **Why do this#  **
> For beginners, the most difficult thing is often not "knowing what to do", but "not knowing how to ask Codex to do it". Templates can reduce expression costs and make requirements more stable.

## 0. Let Codex read the project first

**[Core of this section] Before making any modifications, let Codex understand the project structure. **

```text
Please read this project first and do not rush to modify it.

Please tell me:
1. Where is the front-end entrance?
2. Where is the backend entrance?
3. Where is the payment configuration?
4. How to run it locally
5. Which files cannot be submitted to GitHub

Then list your proposed next steps for change.
```

## 1. Create a minimal version from an empty directory

**[Core of this section] When starting from an empty project, first ask Codex to create a minimum runnable version. **

```text
Please create a minimum usable version of a paid quiz site in the current directory.

Technical requirements:
- React + Vite frontend
- Node.js backend
- Pay with mock first
- Not connected to real Paddle
- No login required

Product process:
Home -> Answer page -> Free introduction report -> Payment button -> Mock unlock -> Full report

Please provide:
- package.json scripts
- Front-end page
- Backend API
- public/monetization.json
- .env.payment.example
- Local operation instructions
```

## 2. Add title and results page

**[Core of this section] After the process is completed, the number of questions and results page will be expanded. **

```text
Please help me expand the test questions into [number of questions] questions.

Requirements:
- Each question has 3-5 options
- Users only see one question at a time
- There are progress prompts
- Generate reportId after answering
- The results page generates a stable result based on the answer
- Don't lose current reports after refreshing

Use local data first, do not connect to the database.
```

## 3. Optimize the free introductory report

**【Core of this section】Unpaid pages should build trust and should not be written as exaggerated advertisements. **

```text
Please optimize the unpaid results page.

Style:
- Professional, objective and credible
- Don’t exaggerate your marketing
- Don’t say things like “reveal a little first” or “hit the pain points precisely”.

Content structure:
1. Core psychological driving force
2. Behavioral tendencies and potential stuck points
3. Reconciling self-awareness with internal and external performance
4. The complete report will continue the direction of analysis

Limitations:
- Does not show full career answers
- Does not show the complete route of action
-Do not display the complete report saving entrance
```

## 4. Add mock paywall

**【Core of this section】Use mock payment to test the unlocking logic first, and don’t rush to receive real payment. **

```text
Please add a mock paywall.

Requirements:
- public/monetization.json has enabled switch
- When enabled=false, it is convenient for development and you can view the complete report directly.
- When enabled=true, you can only watch the free introduction without paying.
-Click the payment button to create a payment session
- The mock is automatically unlocked after successful payment
- The front end cannot be fake unlocked by URL parameters.
```

## 5. Upload to GitHub first

**【Core of this section】Please Codex check GitHub upload security before deployment. **

```text
Please check if this project is suitable for upload to GitHub.

Requirements:
- .gitignore ignores .env, .env.*, *.local, node_modules, dist, logs, temporary files
- Scan the project to confirm that there is no Paddle API key, webhook secret, or admin token
- Confirm that the README can explain the purpose of the project and how to run it locally
-Tell me what commands to execute when uploading to GitHub for the first time
- If the remote origin does not exist, please tell me how to connect to the GitHub repo
- If a secret is found, please list the file path and remind me to revoke or replace the corresponding key

Please do not submit local keys, real order data or background screen data to Git.
```

## 6. Then deploy to Zeabur

**[Core of this section] After the GitHub repository is ready, let Codex check the Zeabur deployment conditions. **

```text
Please review and adjust the project so that it can be deployed to Zeabur.

Requirements:
- npm run build can produce front-end files
- npm run start can start single Node service
- Service listening process.env.PORT
- host available 0.0.0.0
- The same service provides front-end dist and /api
- Added /api/health
- .gitignore ignores .env, *.local, node_modules, dist, logs, temporary files
- Do not submit any API key
- When the Paddle provider is not enabled, missing Paddle key should not cause the service to crash

Please tell me what should be filled in Zeabur Variables.
```

## 7. Connect to Paddle after you have a domain name

**[Core of this section] After the Zeabur HTTPS domain name is ready, connect to Paddle. **

```text
I already have a Zeabur HTTPS domain name and now want to connect to Paddle.

Please add a new Paddle provider.

Environment variables:
-PADDLE_ENVIRONMENT
-PADDLE_API_KEY
- PADDLE_CNY_PRICE_ID
-PADDLE_USD_PRICE_ID
- PADDLE_WEBHOOK_SECRET
- PUBLIC_BASE_URL

Backend requirements:
- POST /api/payments/checkout call Paddle create transaction
- custom_data writes reportId and payment_session_id
- POST /api/webhooks/paddle verification Paddle-Signature
- Only accept transaction.completed unlock
- Failure, cancellation, expiration will not unlock
- Webhook repeated sending must be idempotent
- Price id, amount, and currency do not match and cannot be unlocked
```

## 8. Check why Zeabur 502

**【Core of this section】When encountering 502, post the Zeabur log to Codex for positioning. **

```text
After Zeabur is deployed, a 502 is displayed when opening the website.

This is the Zeabur log:
[post log]

Please check:
1. package.json start script
2. Whether the server listens to process.env.PORT
3. Whether host is 0.0.0.0
4. Is the static file path correct after build?
5. Whether the process exits due to lack of environment variables

Please fix it directly.
```

## 9. Check why Paddle is not unlocked after payment

**【Core of this Section】When it is not unlocked after payment, check the Paddle webhook and Zeabur logs at the same time. **

```text
Paddle page is not unlocked after payment.

I have this information:
- Paddle transaction id: [fill in]
- payment session id: [fill in]
- reportId: [fill in]
- Zeabur log: [Post log]
- Paddle webhook log: [post log]

Please check:
1. Whether the webhook is received
2. Is the webhook signature verified?
3. Whether event_type is transaction.completed
4. Whether custom_data contains payment_session_id and reportId
5. Whether the store file is successfully written
6. The front-end polls whether to get paid
```

## 10. Security audit before going online

**[Core of this section] Centrally check secrets, signature verification, permissions and bypass risks before going online. **

```text
Please do a security audit before going online.

Key points:
- Whether the public file leaks the secret
- Whether .env is tracked by git
- Whether the API key is only in the backend process.env
- Whether webhook verifies signature
- Wrong signature cannot be unlocked
- Duplicate webhooks are not issued repeatedly
- Full report cannot be accessed without payment
- The same access token cannot unlock other people's reportId

Please list the issues and fix them.
```

## 11. Make reports more like products

**【Core of this section】After the basic link is running through, let Codex optimize the reporting experience. **

```text
Please optimize the full report page to look more like a paid product.

Requirements:
- See the core conclusions and radar on the first screen
- Psychological profiling is the main selling point
- Multi-directional short modules, not a long article
- Removed salary and job market descriptions
- Focus on personality traits, suitable career types, development routes, and risk boundaries
- The alternative profession can be switched with one click, but cannot be re-locked.
- The layout is not cropped when saving the report
```

## 12. Please don’t overdo Codex

**【Core of this section】When you only want to make small changes, you must clearly limit the modification scope of the Codex. **

When you feel that the Codex has changed too much, use this paragraph:

```text
Please stop adding new features.
This time only the issues I pointed out will be fixed.
Don't refactor extraneous files.
Don’t change the visual style.
Don't remove existing functionality.
Please explain which files you will change before proceeding.
```

## 13. Require verification at the end of each time

**【Core of this section】After each modification, Codex is required to run a check and explain the results. **

Add at the end of each task:

```text
Once complete please run:
- npm run typecheck
- npm run build

If the project does not have these commands, please describe an alternative verification method.
Finally, please summarize what has been changed and how I should test it manually.
```

## Usage suggestions

**【Core of this section】Only paste one template at a time, and wait until the acceptance is passed before proceeding to the next step. **

The most stable way for novices is:

1. Post only one prompt word at a time.
2. Wait for the Codex to be modified.
3. Run.
4. Describe the screen status or post errors.
5. Go to the next step.

Don’t ask for “complete website + payment acceptance + deployment + multi-language + art upgrade” all at once. When it fails that way it's hard to know which step is broken.