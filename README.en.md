# Build a Paid Quiz Website from Zero with Codex

[简体中文](README.md) | [繁體中文](README.zh-TW.md) | [English](README.en.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

<p align="center">
  <img src="assets/brand/tutorial-mascot-logo-512.png" width="128" alt="Codex paid quiz tutorial logo" />
</p>

> Not just another questionnaire page. Build a complete product loop that can collect answers, deploy to Zeabur for a real HTTPS domain, connect Paddle, and automatically unlock a paid report.

Static site: <https://momowangouo.github.io/codex-paid-quiz-tutorial/>

Live example: <https://callingdeconstructor.zeabur.app/>

This is a practical guide for creators who want to turn a quiz, assessment, report, consulting product, or educational product into a paid website. It focuses on the reusable engineering path, not on any specific product's private scoring model, report framework, or design method.

Important order: build the local mock flow first, upload the project to GitHub, deploy that GitHub repo to Zeabur, get a public HTTPS domain, then use that domain for Paddle website approval, default payment link, and webhook setup.

![Paid quiz architecture](assets/brand/tutorial-hero.webp)

## Live Example

You can try a live paid-quiz website here:

[The Calling Deconstructor](https://callingdeconstructor.zeabur.app/)

It is a reference product experience, not a public template for its private scoring method or report design.

Small note: this is a personal project, and the server budget is not an infinite refill cup. If the site is temporarily unavailable, it may simply be in "cloud hibernation mode" until the hosting wallet recovers.

## Who This Is For

- Creators with quiz, report, consulting, education, career, or psychology product ideas.
- People who want to use Codex but do not know how to break down the build.
- Anyone who wants payment to unlock a page automatically instead of sending coupon codes manually.
- Indie builders who want to validate payment demand before building a full SaaS.

## What You Will Build

- A quiz flow.
- A free preview report.
- A backend payment session.
- A public deployment with HTTPS.
- A hosted checkout through Paddle, Stripe, Lemon Squeezy, or another provider.
- A webhook-based unlock flow.
- A report restore and access-token model.

## Cost and Replaceable Choices

| Part | Recommended | Alternatives |
| --- | --- | --- |
| Frontend | React + Vite | Next.js, Vue, SvelteKit |
| Backend | Small Node.js server | Hono, Express, Fastify, Next.js API |
| Hosting | Zeabur | Render, Railway, Fly.io, Vercel, Cloudflare |
| Payment | Paddle | Stripe, Lemon Squeezy, FastSpring, PayPal, local creator platforms |
| Storage | JSON file first | SQLite, Postgres, Supabase, Neon |

## The Core Flow

```text
Quiz answers
  -> Free preview
  -> Upload the project to GitHub
  -> Deploy to Zeabur and get an HTTPS domain
  -> Backend creates payment session
  -> Hosted checkout
  -> Webhook confirms payment
  -> Backend issues access token
  -> Full report unlocks automatically
```

If your system trusts a frontend URL like `paid=true`, it can be bypassed. Payment must be confirmed by the backend.

## Chapters

1. [Product Flow](01-product-flow.md)
2. [Build Workflow with Codex](02-codex-build-workflow.md)
3. [Upload to GitHub Before Zeabur](03-upload-to-github.md)
4. [Deploy to Zeabur and Get a Verifiable Domain](04-zeabur-deployment.md)
5. [Connect Paddle Payment and Auto-Unlock](05-payment-unlock.md)
6. [Prompt Templates](06-prompt-templates.md)
7. [Launch Checklist](07-launch-checklist.md)
8. [Visual Walkthrough](08-visual-walkthrough.md)

## Contribute

Contributions are welcome. You can help with translations, payment-provider notes, deployment-platform notes, screenshots, security checks, and corrections. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Author and Collaboration

The author works across cognitive psychology, gamified experience design, and AI product prototyping. For collaboration, case sharing, or practical questions, please open a public-safe [GitHub collaboration issue](https://github.com/momowangOUO/codex-paid-quiz-tutorial/issues/new?template=collaboration.yml).

Do not post private contact details, payment accounts, API keys, admin screenshots, or real order data in public issues.
