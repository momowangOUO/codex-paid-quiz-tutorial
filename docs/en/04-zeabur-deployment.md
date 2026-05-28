# 04. Deploy to Zeabur First

**Goal: get a real HTTPS domain before configuring Paddle. The order matters.**

```text
local mock flow -> GitHub -> Zeabur -> HTTPS domain -> Paddle website approval -> Paddle checkout
```

![Domain before Paddle](../../assets/diagrams/07-domain-before-paddle.svg)

## Why Zeabur first

Paddle often needs a pricing page, terms page, privacy policy, refund policy, default payment link, and approved domain. Without a public domain, you may be blocked by checkout-not-enabled errors even if your code is correct.

## Pre-deploy check

Run locally:

```bash
npm install
npm run build
```

If build fails locally, paste the full log to Codex and fix it before deploying.

## Listen on PORT and 0.0.0.0

Your Node server should look like:

```js
const port = Number(process.env.PORT ?? 8080);
const serverHost = process.env.PAYMENT_SERVER_HOST ?? "0.0.0.0";
server.listen(port, serverHost, () => {
  console.log(`payment server: http://${serverHost}:${port}/api`);
});
```

`0.0.0.0` is correct in production containers. It allows traffic from outside the container instead of only from inside localhost.

## Zeabur settings

![Zeabur deploy flow](../../assets/diagrams/01-zeabur-deploy.svg)

1. Create a project.
2. Connect your GitHub repository.
3. Pick Singapore or Hong Kong if your audience includes mainland China.
4. Build Command: `npm run build`.
5. Start Command: `npm run start`.

## Variables

![Zeabur variables](../../assets/diagrams/02-zeabur-variables.svg)

Start with:

```bash
PAYMENT_SERVER_HOST=0.0.0.0
PAYMENT_STORE_FILE=/data/payment-store.json
PUBLIC_BASE_URL=https://your-zeabur-domain
CORS_ORIGIN=https://your-zeabur-domain
PADDLE_ENVIRONMENT=sandbox
PADDLE_ALLOW_UNSIGNED_WEBHOOKS=false
```

Add Paddle API key and price IDs after Paddle setup is ready.

## Volume

![Zeabur volume](../../assets/diagrams/03-zeabur-volume.svg)

Mount a volume at `/data`. This prevents payment sessions and access tokens from disappearing when the service restarts.

## Verification

Open:

- `https://your-domain/`
- `https://your-domain/api/health`
- `https://your-domain/monetization.json`

`/api/health` should confirm service status and payment readiness, but it must not reveal secrets.
