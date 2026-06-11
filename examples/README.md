# Examples

These files are copyable references for a paid quiz or paid report website. They are intentionally small, so you can compare them with your own project and adapt only the parts you need.

Do not treat these files as production secrets. They show shape and naming conventions, not real credentials.

## Files

| File | Purpose | Where it belongs |
| --- | --- | --- |
| [public-monetization.example.json](public-monetization.example.json) | Public payment display and provider configuration. | A public frontend config file such as `public/monetization.json`. |
| [env.payment.example](env.payment.example) | Backend environment variable template for Paddle and payment storage. | Zeabur Variables or a private server-side `.env` file. |
| [minimal-api-contract.md](minimal-api-contract.md) | Minimal API contract for checkout creation, payment session lookup, and webhooks. | Backend implementation notes or project documentation. |

## How to Use

1. Copy the public configuration shape into your frontend project.
2. Copy the environment variable names into your deployment platform.
3. Implement the API contract on the server side.
4. Test with a mock payment provider before switching to Paddle sandbox or live mode.
5. Confirm that paid access is unlocked only after the backend verifies the payment state.

## Safety Rules

- Keep Paddle API keys and webhook secrets in server-side environment variables.
- Do not commit `.env.payment.local`, real `.env` files, payment logs, or screenshots from payment dashboards.
- Public JSON can include price display, provider names, product IDs, and public feature flags, but not tokens or secrets.
- Do not rely on `paid=true` in the URL as proof of purchase.
- In production, enable webhook signature verification and test failed-payment paths as well as successful-payment paths.

[Return to project home](../README.en.md)
