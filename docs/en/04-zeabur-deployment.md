# 04. Deploy to Zeabur and get a verifiable domain name

![Zeabur deployment chapter art](../../assets/chapters/chapter-04-zeabur.webp)
This chapter assumes that you have completed the previous chapter and uploaded the project to GitHub. Now it’s time to deploy the GitHub repository to Zeabur.

**[Core of this chapter] First, let your website have a publicly accessible HTTPS domain name, and then use this domain name to Paddle for website verification, default payment link and webhook. **

The recommended order is:

```text
Local mock process runs smoothly
  -> Upload to GitHub
  -> Deploy to Zeabur
  -> Get HTTPS domain name
  -> Prepare pricing / terms / privacy / refund page
  -> Go back to Paddle to do website verification and checkout settings
```

> 💡 **Why do this#  **
> Paddle usually checks whether your website exists, can be opened, and has terms and privacy policy before creating a real payment page. When you haven't made your domain name public yet, just like you want to apply for a cashier without a store address, many settings will get stuck halfway.

![Deployment to payment sequence instructions](../../assets/diagrams/07-domain-before-paddle.svg)

### Step 1: First confirm that the project you have can run on this machine

**【Core of this step】First confirm that the project can be installed and built on your computer, and then deploy it to Zeabur. **

Next are the specific execution steps:

1. Open the project folder.
2. Open a terminal in the project root directory.
3. Execute:```bash
npm install
npm run build
```

4. If `npm run build` is successful, continue to the next step.
5. If it fails, post the complete error to Codex:

```text
npm run build failed, this is the error log:
[Post full log]

Please help me fix it so it can be deployed to Zeabur.
After repairing, please run npm run build again.
```

> 💡 **Why do this#  **
> Zeabur will also run build when deployed. The local build fails, and the cloud usually fails too. Fixing it on your own computer first can reduce the time spent guessing mistakes.

### Step 2: Confirm that the backend is not a hard-coded port

**[Core of this step] The Node backend must listen to the `PORT` given to it by Zeabur, and use `0.0.0.0` to allow external access. **

Please let Codex check the backend startup code. The target is written like this:```js
const port = Number(process.env.PORT ##  8080);
const serverHost = process.env.PAYMENT_SERVER_HOST ##  "0.0.0.0";

server.listen(port, serverHost, () => {
  console.log(`payment server: http://${serverHost}:${port}/api`);
});
```You can copy this prompt directly to Codex:

```text
Please check the server startup code.

Requirements:
1. The port must read process.env.PORT first.
2. The host uses 0.0.0.0 by default.
3. Don’t hardcode localhost.
4. Keep the default port available for local development, such as 8080.
5. After modification, please explain why Zeabur needs to be set like this.
```

> 💡 **Why do this#  **
> On my own computer, `localhost` is like a "door only opened to myself". In the Zeabur container, if the service is only opened to yourself, external users will not be able to enter. `0.0.0.0` means "this service can be accessed outside the container".

### Step 3: Confirm that the project has a production startup command

**【Core of this step】Zeabur needs to know how to build and how to start. **

Open `package.json` and confirm that at least:```json
{
  "scripts": {
    "build": "npm run build:runtime-careers && tsc --noEmit && node scripts/vite-build.mjs",
    "start": "node server/payment-server.mjs"
  }
}
```The `build` content of different projects can be different, but the principles are the same:

1. `npm run build` is responsible for generating front-end static files.
2. `npm run start` is responsible for launching online services.
3. Online services must provide both front-end pages and `/api/*`.

Tip words for Codex:

```text
Please check if package.json is suitable for Zeabur deployment.

Requirements:
1. npm run build can generate production files.
2. npm run start can start a single Node service.
3. This Node service should provide both front-end dist and /api/*.
4. If scripts are missing, please fill them in directly.
```

> 💡 **Why do this#  **
> Zeabur does not click the "preview button" on your computer. It will only execute on command. Build means "packaging the website", and start means "exporting the packaged website for others to access".

### Step 4: Confirm that the GitHub repository is the latest version

**【Core of this step】Before entering Zeabur, first confirm that the latest code you want to deploy is already available on GitHub. **

Next are the specific execution steps:

1. Open your GitHub repository page.
2. Confirm that README can be displayed normally.
3. Confirm that the latest commit is the version you just pushed.
4. Execute in the local terminal:```bash
git status
```

5. If there are unsubmitted modifications, go back to the process `git add`, `git commit`, and `git push` in the previous chapter.
6. Confirm that `.env` and `.env.payment.local` do not appear in the GitHub file list.

Again, confirm not to submit these files:

-`.env`
-`.env.payment.local`
-`node_modules`
-`dist`
- log file
- Real order information
-Paddle API key
- Webhook secret

> 💡 **Why do this#  **
> Zeabur will pull code from GitHub. If the modifications on your computer have not been pushed yet, Zeabur will not be able to see them. Zeabur will mostly get whatever is displayed on the GitHub page.

### Step 5: Create a new service in Zeabur

**【Core of this step】Let Zeabur connect to your GitHub repository and deploy the code into a website. **

Next are the specific execution steps:

1. Open Zeabur.
2. Create a new Project.
3. Select Deploy from GitHub.
4. If Zeabur requires authorization for GitHub, follow the page prompts for authorization.
5. Select the warehouse uploaded in the previous chapter in the warehouse list.
6. Select the branch, usually `main`.
7. Region gives priority to areas near Singapore or Hong Kong.
8. Let Zeabur automatically detect Node projects.
9. If it asks you to fill in a command, fill in:

```text
Build Command: npm run build
Start Command: npm run start
```

![Zeabur service deployment instructions](../../assets/diagrams/01-zeabur-deploy.svg)

> 💡 **Why do this#  **
> Region is the region where the server is located. If your users are mainly in Asia, the access path will usually be shorter if they choose areas near Singapore or Hong Kong. There is no need for a mainland server here, so ICP filing is not the first step.

### Step 6: Fill in the minimum environment variables first

**[Core of this step] The first round of deployment is just to get the website running, there is no need to fill in the Paddle live key immediately. **

First fill in the Variables of Zeabur:```bash
PAYMENT_SERVER_HOST=0.0.0.0
PAYMENT_STORE_FILE=/data/payment-store.json
PUBLIC_BASE_URL=https://你的-zeabur-域名
CORS_ORIGIN=https://你的-zeabur-域名
PADDLE_ENVIRONMENT=sandbox
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```If you don’t have a Zeabur domain name yet, you can deploy it first and come back after you get the domain name:```bash
PUBLIC_BASE_URL=
CORS_ORIGIN=
```Change it to the real URL.

![Zeabur environment variable indication](../../assets/diagrams/02-zeabur-variables.svg)

> 💡 **Why do this#  **
> Environment variables are like "little notes that the deployment platform keeps for you". Code can read these values, but they are not packaged into the front-end public files. The Paddle API key should be placed here in the future instead of being written into the web page code.

### Step 7: Mount `/data`

**【Core of this step】Give the backend a storage location that will not be lost due to restarting. **

Next are the specific execution steps:

1. Find the Volume or Storage setting in the Zeabur service.
2. Add a new volume.
3. Fill in Mount path:

```text
/data
```

4. Confirm that the environment variables include:```bash
PAYMENT_STORE_FILE=/data/payment-store.json
```

![Zeabur Volume Signal](../../assets/diagrams/03-zeabur-volume.svg)

> 💡 **Why do this#  **
> If order and unlock records only exist in the service temporary directory, they may disappear after the service is restarted. `/data` volume is like connecting a small hard disk that can be saved continuously to the service.

### Step 8: Open the online URL and check the three pages

**【Core of this step】Confirm that the website, API, and public configuration can be accessed externally. **

After successful deployment, you will get something like:

```text
https://your-project.zeabur.app
```Please open one by one:

```text
https://yourdomain/
https://yourdomain/api/health
https://yourdomain/monetization.json
```You need to confirm:

1. The homepage can be opened.
2. `/api/health` will return the service status.
3. `/api/health` does not display any secret.
4. `/monetization.json` is accessible.
5. `/monetization.json` does not contain Paddle API key or webhook secret.
6. The mock payment process can still be tested.

> 💡 **Why do this#  **
> Paddle will later access your website from the outside. It is not enough that you can open the local web page yourself. You must confirm that the public URL can really be accessed.

### Step 9: Prepare the public pages required by Paddle

**【Core of this step】First prepare the basic instruction page that the payment platform will read to avoid having no URL to fill in after entering Paddle. **

Paddle may ask for:

```text
/pricing
/terms
/privacy
/refund
```These pages can be very plain at first, but they should at least state:

1. What are you selling?
2. What users will get after paying.
3. What’s the price?
4. Whether it is a one-time purchase.
5. What are the refund rules.
6. Where should users contact you if they encounter problems?
Tip words for Codex:

```text
Please help me add the public pages required for Paddle review:

1. /pricing
2./terms
3./privacy
4./refund

Requirements:
- Write clearly, conservatively, and don’t exaggerate for effect.
- Do not promise employment, income, or therapeutic results.
- Every page can be accessed directly through the Zeabur domain name.
- Do not include API keys, order information or personal contact information on the page.
```

> 💡 **Why do this#  **
> The payment platform needs to determine whether what you are selling is clear, whether users know what they bought, and whether there are rules when disputes arise. Pages can be concise, but they cannot be blank or vague.

### Step 10: Leave this domain name to Paddle

**[Core of this step] Use the Zeabur domain name as the basis for the Paddle settings in the next chapter. **

After completing this chapter, record these three values:

```text
Website homepage: https://yourdomainname/
Webhook URL: https://yourdomain/api/webhooks/paddle
Health check: https://yourdomain/api/health
```The next chapter will fill them in Paddle.

> 💡 **Why do this#  **
> This step is like getting the house number before opening a store. After the house number is determined, the cashier, payment notification, and user bounce page have places to go.

### Completion criteria for this chapter

**[Core of this chapter] You need to be able to prove that the website is online, not that it can only run on this machine. **

After completion, please confirm item by item:

1. The GitHub repository contains the latest code.
2. Zeabur is deployed successfully.
3. The home page can be opened.
4. `/api/health` can be opened.
5. `/monetization.json` does not contain secret.
6. `/data` volume is mounted.
7. You’ve got an HTTPS domain name.
8. You already know that the webhook URL should be:

```text
https://yourdomain/api/webhooks/paddle
```Return to Paddle in the next chapter and use this domain name to complete website verification, default payment link, webhook and checkout.