# Examples

These files are copyable references for a paid quiz website. They are intentionally small and should be adapted before production use.

| File | Purpose |
| --- | --- |
| `public-monetization.example.json` | Public monetization config example. Never put secrets here. |
| `env.payment.example` | Backend environment variable template. Copy values into your deployment platform, not GitHub. |
| `minimal-api-contract.md` | Minimal API contract for checkout, sessions, and webhooks. |

## Safety

- Keep Paddle API keys and webhook secrets in server-side environment variables.
- Do not commit `.env.payment.local`.
- Public JSON can include price display and provider names, but not tokens.
