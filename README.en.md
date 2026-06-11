# Codex Paid Site Hands-On Guide

[简体中文](README.md) · [繁體中文](README.zh-TW.md) · **English** · [日本語](README.ja.md) · [한국어](README.ko.md)

![Codex paid site tutorial cover](assets/brand/tutorial-hero.webp)

This is a practical, start-to-launch tutorial for building a website that can charge users and unlock paid content. The example product is a quiz / paid report site, but the same flow can be adapted to reports, templates, courses, tools, or other one-time purchase products.

The guide connects the whole path: product flow, Codex-assisted development, GitHub upload, Zeabur deployment, Paddle Checkout, server-side webhook confirmation, automatic unlock, and final launch checks.

## Read Online

- [Open the English web tutorial](tutorial.en.html)
- [Read the English Markdown tutorial](docs/en/README.md)
- [View copyable example files](examples/README.md)
- [Collaboration, feedback, and translation help](collaboration.html)

## What You Will Build

By following the tutorial, you should end up with a project that has:

- A clear paid product flow: free entry, quiz or content experience, paywall, and unlock after payment.
- A GitHub repository that can be maintained and shared safely.
- A website and backend service that can be deployed to Zeabur.
- A Paddle Checkout payment flow.
- A server-side webhook that confirms payment and writes the unlock state.
- A safe configuration pattern that keeps API keys, webhook secrets, and admin tokens out of the frontend and public repository.
- A launch checklist for domain setup, environment variables, payments, unlock behavior, and rollback planning.

## Who This Is For

- Builders who want to use Codex or AI coding tools to ship their first paid web product.
- Frontend beginners who need a practical bridge into GitHub, deployment, payments, and webhooks.
- Solo makers turning quizzes, reports, templates, lessons, utilities, or content products into one-time paid unlocks.
- Anyone learning how to turn AI-generated code into a maintainable project.

## What You Need

- A GitHub account.
- A Zeabur account, or a similar deployment platform you already know.
- A Paddle account for international payments.
- A local environment where you can run Codex.
- A product idea that can be packaged as paid content or a paid result.

Platform interfaces change over time, especially payment dashboards and deployment settings. When the UI changes, keep the core principles intact: the frontend only stores public configuration, secrets stay in server-side environment variables, and paid access is granted only after server-side webhook confirmation.

## Learning Path

| Chapter | Topic | Goal |
| --- | --- | --- |
| 1 | [Dismantle the product flow](docs/en/01-product-flow.md) | Convert “I want a paid website” into user paths, pages, data, and unlock logic. |
| 2 | [Let Codex build from zero](docs/en/02-codex-build-workflow.md) | Give Codex clear requirements and iterate in small, reviewable steps. |
| 3 | [Upload to GitHub](docs/en/03-upload-to-github.md) | Create the repository, commit the project, and understand what must not be uploaded. |
| 4 | [Deploy to Zeabur](docs/en/04-zeabur-deployment.md) | Deploy the site and backend so the payment provider can verify your domain. |
| 5 | [Connect Paddle payment and unlock](docs/en/05-payment-unlock.md) | Build Checkout, webhook handling, session lookup, and paid report unlock. |
| 6 | [Copyable Codex prompts](docs/en/06-prompt-templates.md) | Use reusable prompts for product design, development, debugging, and review. |
| 7 | [Pre-launch checklist](docs/en/07-launch-checklist.md) | Check safety, payments, deployment, content, rollback, and user experience. |

## Repository Structure

```text
codex-paid-quiz-tutorial/
  index.html                  Language selector
  tutorial*.html              Full web tutorial in each language
  README*.md                  Project home pages in each language
  docs/
    zh-CN/                    Simplified Chinese Markdown tutorial
    zh-TW/                    Traditional Chinese Markdown tutorial
    en/                       English Markdown tutorial
    ja/                       Japanese Markdown tutorial
    ko/                       Korean Markdown tutorial
  examples/                   Copyable payment config and API contract examples
  assets/                     Brand, chapter, and flow images
  tools/                      Helper script for maintaining the collaboration form
```

## Safety Rules

- Never commit Paddle API keys, webhook secrets, admin tokens, real user data, or payment logs to GitHub.
- Public files such as `public/monetization.json` may contain prices, labels, provider names, and public feature flags only.
- Real secrets belong in Zeabur Variables or server-side `.env` files.
- Do not trust `paid=true` in the URL as proof of purchase. Final unlock must be confirmed by the backend.
- Webhook signature verification should be enabled in production.

## Example Files

- [public-monetization.example.json](examples/public-monetization.example.json): public payment configuration example.
- [env.payment.example](examples/env.payment.example): backend environment variable template.
- [minimal-api-contract.md](examples/minimal-api-contract.md): minimal payment API contract.

## Contributing and Feedback

- Documentation fixes are covered in [CONTRIBUTING.md](CONTRIBUTING.md).
- Private collaboration, case sharing, and translation help are covered in [CONTACT.md](CONTACT.md) or the [collaboration form](collaboration.html).
- Do not post API keys, payment dashboard screenshots, webhook secrets, user data, or private contact details in public issues.

## Disclaimer

This tutorial is an engineering and product implementation guide. It does not guarantee payment provider approval, platform approval, or revenue. Payment, tax, refund, privacy, and consumer protection rules vary by region. Review the requirements for your own market before running a live paid product.
