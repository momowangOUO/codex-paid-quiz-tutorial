# Codex で有料診断サイトをゼロから作る

[简体中文](README.md) | [繁體中文](README.zh-TW.md) | [English](README.en.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

<p align="center">
  <img src="assets/brand/tutorial-mascot-logo-512.png" width="128" alt="Codex paid quiz tutorial logo" />
</p>

> 単なるアンケートページではなく、回答、Zeabur での HTTPS 公開、Paddle 決済、自動レポート解放までをつなぐプロダクトの作り方です。

Static site: <https://momowangouo.github.io/codex-paid-quiz-tutorial/>

Live example: <https://callingdeconstructor.zeabur.app/>

このガイドは、診断、レポート、コンサルティング、教育コンテンツを有料サイトにしたいクリエイター向けの実践メモです。特定プロダクトの採点ロジックやレポート設計は公開せず、再利用できる技術ルートだけを整理しています。

順番が大切です。まずローカルの mock フローを通し、GitHub にアップロードし、その GitHub repo を Zeabur にデプロイして公開 HTTPS ドメインを取得し、そのドメインを使って Paddle の website approval、default payment link、webhook を設定します。

![Paid quiz architecture](assets/brand/tutorial-hero.webp)

## Live Example

実際の有料診断サイトの例はこちらです。

[The Calling Deconstructor](https://callingdeconstructor.zeabur.app/)

これは体験用の参考であり、採点ロジックやレポート設計を公開するテンプレートではありません。

補足：個人プロジェクトなので、サーバー代は無限ではありません。もし一時的に開けない場合は、消えたのではなく「クラウド冬眠モード」に入っているだけかもしれません。

## 対象読者

- 診断、レポート、教育、キャリア、心理系コンテンツのアイデアがある人。
- Codex を使いたいが、開発タスクの分解方法が分からない人。
- 支払い後にページを自動解放したい人。
- 本格的な SaaS を作る前に、有料需要を検証したい人。

## 作るもの

- 診断フロー。
- 無料プレビュー結果。
- バックエンドの payment session。
- HTTPS で公開されたデプロイ。
- Paddle、Stripe、Lemon Squeezy などの hosted checkout。
- Webhook による自動解放。
- レポート復元と access token モデル。

## コストと代替案

| 項目 | 推奨 | 代替案 |
| --- | --- | --- |
| フロントエンド | React + Vite | Next.js、Vue、SvelteKit |
| バックエンド | 小さな Node.js サーバー | Hono、Express、Fastify、Next.js API |
| ホスティング | Zeabur | Render、Railway、Fly.io、Vercel、Cloudflare |
| 決済 | Paddle | Stripe、Lemon Squeezy、FastSpring、PayPal |
| 保存 | JSON ファイルから開始 | SQLite、Postgres、Supabase、Neon |

## 基本フロー

```text
診断回答
  -> 無料プレビュー
  -> GitHub にアップロード
  -> Zeabur にデプロイして HTTPS ドメインを取得
  -> バックエンドが payment session を作成
  -> Hosted checkout
  -> Webhook で支払い確認
  -> バックエンドが access token を発行
  -> 完全版レポートを自動解放
```

`paid=true` のような URL パラメータを信用してはいけません。支払い確認は必ずバックエンドで行います。

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

翻訳、決済プラットフォームの補足、デプロイ手順、スクリーンショット、セキュリティ改善、誤字修正を歓迎します。詳しくは [CONTRIBUTING.md](CONTRIBUTING.md) を見てください。

## Author

The author works across cognitive psychology, gamified experience design, and AI product prototyping.

コラボレーション、事例共有、実装相談がある場合は、まず公開しても問題ない内容だけを [GitHub collaboration issue](https://github.com/momowangOUO/codex-paid-quiz-tutorial/issues/new?template=collaboration.yml) に投稿してください。

公開 issue には、個人の連絡先、決済アカウント、API key、管理画面スクリーンショット、実注文データを投稿しないでください。
