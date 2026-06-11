# English Tutorial Directory

[简体中文](../zh-CN/README.md) · [繁體中文](../zh-TW/README.md) · **English** · [日本語](../ja/README.md) · [한국어](../ko/README.md)

![Tutorial cover](../../assets/brand/tutorial-hero.webp)

This is the complete Markdown tutorial directory. Read the chapters in order when possible: the payment, deployment, and launch checks depend on the product flow, repository structure, and environment variable design established earlier.

## Chapters

| Order | Chapter | What you will finish |
| --- | --- | --- |
| 1 | [Dismantle the product flow](01-product-flow.md) | Break a paid website into user paths, pages, states, data, and unlock conditions. |
| 2 | [Let Codex build from zero](02-codex-build-workflow.md) | Use clear prompts to make Codex scaffold the project, then refine it through small iterations. |
| 3 | [Upload to GitHub](03-upload-to-github.md) | Create the repository, commit the code, and exclude secrets and local temporary files. |
| 4 | [Deploy to Zeabur](04-zeabur-deployment.md) | Configure build commands, start commands, environment variables, and a public domain. |
| 5 | [Connect Paddle payment and automatic unlock](05-payment-unlock.md) | Wire Paddle Checkout, webhooks, payment session lookup, and paid report unlock. |
| 6 | [Copyable Codex prompts](06-prompt-templates.md) | Use complete prompts for product design, development, debugging, safety review, and launch review. |
| 7 | [Pre-launch checklist](07-launch-checklist.md) | Check safety, payments, deployment, content, rollback, and user experience. |

## Recommended Reading Flow

1. Read chapter 1 first and confirm that your product fits a one-time paid unlock model.
2. Work through chapters 2 to 4 while building, so the site runs locally and then online.
3. In chapter 5, do not skip the webhook and secret-handling sections.
4. Use chapter 6 at any stage when you need Codex to design, implement, debug, or review.
5. Use chapter 7 as a real pre-launch checklist before publishing.

[Return to project home](../../README.en.md) · [Open the web tutorial](../../tutorial.en.html)
