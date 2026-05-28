# 02. How to let Codex help you build a website from 0

![Codex build workflow chapter art](../../assets/chapters/chapter-02-codex.webp)
**[Core of this chapter] Divide the website building task into multiple small rounds, and ask Codex to do something acceptable in each round. **

This chapter only talks about one thing: **How to command Codex when you don’t know how to write a website. **

Don’t just start by saying, “Help me build a complete commercial website.” This range is too large, and the Codex is easy to change too much at once. You need to break the website into a series of small tasks that can be accepted.

> 💡 **Why do this#  **
> Codex is more stable when handling small tasks. You can think of it like asking a construction partner to do the construction: first confirm the foundation, then build the walls, and then connect water and electricity, rather than saying "please build the entire building" at once.

## First tell Codex what product you want to make

**【Core of this section】First use a complete prompt word to let Codex understand the product goals and limitations. **

Copy this paragraph as the first prompt:

```text
I'm going to make a paid quiz site.

Target users will:
1. Open the homepage
2. Complete a set of test questions
3. See the free introductory version of the report
4. Click the payment button
5. The full report will be automatically unlocked after successful payment.

Please help me create a minimum usable version first.
Requirements:
- Front-end using React + Vite
- Backend using Node.js
- Use mock payment first, do not accept real Paddle
- No login account required
- Don't put any secrets into the frontend
- Tell me how to run and verify locally at every step
```If you already have a project, add this:

```text
Please read the existing project structure first and do not rebuild the project; try to stick to the existing coding style.
```

## The first time it is built, the things it builds must be small.

**[Core of this section] The first version only builds the smallest website that can run through the process. **

The first version only requires these pages:

| Page | Purpose | Minimum Requirements |
| --- | --- | --- |
| Home page | Let users start the quiz | A title, a start button |
| Answer page | Collect answers | At least 3-5 test questions, expand later |
| Free results page | Build trust | Show partial analysis, but not full career answers |
| Paywall | Bootstrap to Unlock | One payment button, one waiting state |
| Full report page | Verification unlock | Show full content after mock payment |

Don’t ask for it yet:

- Multilingual.
- Beautiful animations.
-Backend management.
- PDF/long image saving.
- Real Paddle.
- Complete question bank.

These can all be added later. The first step is as long as the process runs smoothly.

> 💡 **Why do this#  **
> The minimal version is not the final product, but is used to prove that the route is feasible. After the route is feasible, it will be more stable by adding visual, multi-language, report saving and real payment.

## Recommended project structure

**【Core of this section】Require Codex in advance to separate front-end, back-end, data and configuration. **

You can ask Codex to be built according to this structure:

```text
paid-quiz-site/
  src/
    app/
      App.tsx
    components/
    data/
      questions.ts
    monetization/
      config.ts
    styles/
      globals.css
  server/
    payment-server.mjs
  public/
    monetization.json
  package.json
  .env.payment.example
```The meaning of each directory:

| Table of Contents | Purpose |
| --- | --- |
| `src/app` | Page flow |
| `src/components` | Button, card, question, report module |
| `src/data` | Questions, result types, sample report materials |
| `src/monetization` | Front-end reads public paid configuration |
| `server` | Backend API, payment session, webhook |
| `public` | Files that can be exposed to browsers |

The most common mistake newbies make is cramming everything into one file. Let the Codex be split by directory, which will be easier to maintain later.

> 💡 **Why do this#  **
> The project structure is like a storage cabinet. The title, page, style, and payment interface are placed in their own places, so that when you need to modify a certain piece later, you don't have to rummage through a large file.

## Round 1: Quiz process only

**[Core of this section] First confirm that users can answer the questions from the home page to the results page. **

To Codex:

```text
Please complete the main test process first and do not accept payment.

Requirements:
- There is "Start Quiz" on the homepage
- The answer page displays one question at a time
- Users can move to the next question after selecting the answer
- Generate a reportId after answering
- Go to results page
- Results page shows free introduction and an "Unlock full report" button

Please also provide:
- npm scripts
- Local operation mode
- Minimal testing method
```acceptance:```bash
npm install
npm run dev
```Open the local website and answer it yourself. Don't rush to change the vision, first make sure the path can be completed.

## Round 2: Let the backend save payment status

**【Core of this section】Leave the payment status to the back-end to save it, rather than letting the front-end decide on its own. **

To Codex:

```text
Now please add the Node backend and make mock payment first.

Backend API:
- POST /api/payments/checkout
  Receive reportId, create payment session, return sessionId and checkoutUrl

- GET /api/payments/sessions/:id
  Return pending / paid / failed

- POST /api/payments/mock-complete
  Only for local testing, mark a session as paid

The data can be stored in the JSON file first.
Please make sure that the frontend cannot rely on URL parameters alone to unlock the report.
```Acceptance:

- Full report cannot be seen when payment is not made.
- Can be unlocked after mock complete.
- After refreshing the page, the backend still knows whether the report is unlocked or not.

## Round 3: Add paywall switch

**【Core of this section】Use public configuration to control the paywall switch to facilitate development and pre-launch testing. **

To Codex:

```text
Please add public/monetization.json to enable the paywall to be turned on and off.

Default:
{
  "enabled": false,
  "checkoutMode": "api",
  "apiBaseUrl": "/api",
  "provider": "mock"
}

Requirements:
- When enabled=false, it is convenient for me to develop and test, and I can directly view the full report
- When enabled=true, payment must be made before unlocking
- public files cannot contain API keys or secrets
```This step is important because you will be testing again and again before going live. Without a switch, you can easily push a half-baked paywall onto users.

## Round 4: Prepare to upload to GitHub first

**【Core of this section】Let Codex check the security and `.gitignore` of the warehouse before uploading. **

After the local mock process runs through, first organize the project into a state suitable for uploading to GitHub.

To Codex:

```text
Please check if this project is suitable for upload to GitHub.

Requirements:
- .gitignore must ignore .env, .env.*, *.local, node_modules, dist, logs and temporary files
- Scan the project to confirm that there is no Paddle API key, webhook secret, or admin token
- Confirm that the README allows others to understand the purpose of the project
- Tell me what git commands to execute when uploading to GitHub for the first time
- If a secret is found, please list the file path and remind me to revoke or replace the corresponding key
```During acceptance, you should be able to see the project files in the GitHub repository, but you cannot see `.env`, `.env.payment.local` or any API key.

## Round 5: Preparing for Zeabur deployment again

**【Core of this section】Let Codex organize the project into a form that Zeabur can build and start. **

After the GitHub repository is ready, don’t rush to pick up Paddle yet. Paddle will later ask you to fill in and verify the website domain name, and will also require the default payment link to use an HTTPS domain name that can be opened.

So the correct order is:

```text
Run local mock -> upload to GitHub -> deploy to Zeabur -> get HTTPS domain name -> then set up Paddle
```To Codex:

```text
Please organize this project into a structure that can be deployed to Zeabur.

Requirements:
- npm run build can generate front-end dist
- npm run start can start the same Node service
- The Node service must provide both dist static files and /api/*
- The server must listen to process.env.PORT
- host uses 0.0.0.0
- Added /api/health without leaking any secrets
- Do not submit .env, .local, node_modules, dist, and local data files to GitHub
- Don’t ask for the Paddle key yet, because now you just want to get the verifiable HTTPS domain name

Please also tell me:
1. What files should be submitted to GitHub?
2. Zeabur’s build command and start command
3. What variables should be set first on Zeabur?
4. How to confirm that both the website and /api/health can be accessed
```After this step is completed, you should have an official URL similar to this:

```text
https://your-project.zeabur.app
```This URL will then be filled in with Paddle’s website verification, pricing page, default payment link and webhook URL.

## Round 6: After you have an HTTPS domain name, replace mock with Paddle

**[Core of this section] After getting the Zeabur domain name, let the Codex connect to the real Paddle. **

Wait until the Zeabur website can be opened and `/api/health` is normal, then give Codex:

```text
Please add a new Paddle provider but keep the mock provider.

Requirements:
- POST /api/payments/checkout using Paddle create transaction API
- Use CNY price / USD price based on user region or button selection
- custom_data must contain reportId and payment_session_id
- Added POST /api/webhooks/paddle
- webhook must verify Paddle-Signature
- Only accept transaction.completed unlock
- webhook must be idempotent when sending repeatedly
- Wrong signature, inconsistent amount, and inconsistent price id cannot be unlocked
```After the Codex is implemented, you need to let it indicate where these fields are configured:

```text
PADDLE_ENVIRONMENT
PADDLE_API_KEY
PADDLE_CNY_PRICE_ID
PADDLE_USD_PRICE_ID
PADDLE_WEBHOOK_SECRET
PUBLIC_BASE_URL
```Note: `PUBLIC_BASE_URL` should be filled in with the HTTPS domain name given to you by Zeabur, for example:

```text
https://your-project.zeabur.app
```The Paddle webhook URL is:

```text
https://your-project.zeabur.app/api/webhooks/paddle
```

## Round 7: Let Codex do security checks before going live

**【Core of this Section】Let Codex check payments, keys, webhooks, and deployment risks before going live. **

To Codex:

```text
Please check if this project is suitable for launch.

Key points to check:
1. Are there API key, webhook secret, and admin token in the public file?
2. Whether payment unlocking can only be confirmed by the backend
3. Is the webhook verified?
4. Will repeated webhook grant permissions repeatedly?
5. Will Zeabur read PORT?
6. Whether to provide /api/health
7. Are build and start scripts available?
Please list the issues and fix them directly.
```

## How should you report errors to Codex

**[Core of this section] When reporting an error, you must provide actions, phenomena, expected results and logs. **

Don't just say "broken." Here are four things to post:

```text
What I did:
What error do I see:
How I expect it should be:
Related screen descriptions or logs:
```example:

```text
I see 502 when I open the website in Zeabur.
Zeabur logs show that npm run start is started, but the web page cannot be opened.
Please check whether the server is listening to process.env.PORT and whether the host is 0.0.0.0.
```Codex is best at handling specific errors. The more specific it is, the faster it is.

> 💡 **Why do this#  **
> "Broken" has no location information. Logs, screen status, and what you just did are Codex’s clues to determine the location of the problem.

## Newbies should not skip verification

**【Core of this section】Run typecheck and build after each round of changes. **

After each stage, let Codex run:```bash
npm run typecheck
npm run build
```If these scripts are not available, let Codex fill them in:

```text
Please add typecheck and build scripts to this project and make sure it can run locally.
```

## Completion criteria for this chapter

**【Core of this Section】After completing this chapter, you should have a locally runnable mock paid website. **

After completing this chapter, you should have:

- A quiz website that can be run locally.
- A Node backend.
- A mock payment unlocking process.
- A public profile.
- A clear set of Codex prompt words.

In the next chapter, upload the project to GitHub first; after the GitHub warehouse is ready, deploy it to Zeabur to get the HTTPS domain name.