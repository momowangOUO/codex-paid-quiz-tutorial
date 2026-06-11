# Codex 有料サイト実践ガイド

[简体中文](README.md) · [繁體中文](README.zh-TW.md) · [English](README.en.md) · **日本語** · [한국어](README.ko.md)

![Codex paid site tutorial cover](assets/brand/tutorial-hero.webp)

これは、課金してコンテンツを解放する Web サイトを 0 から公開まで作るための実践ガイドです。例として「診断 / 有料レポート」型のプロダクトを扱いますが、レポート、テンプレート、講座、ツール、デジタルコンテンツの一回払いにも応用できます。

このガイドでは、プロダクト設計、Codex との開発、GitHub へのアップロード、Zeabur へのデプロイ、Paddle Checkout、サーバー側 Webhook、支払い後の自動解放、公開前チェックまでを一つの流れとして説明します。

## オンラインで読む

- [日本語の Web 版チュートリアルを開く](tutorial.ja.html)
- [日本語の Markdown チュートリアルを読む](docs/ja/README.md)
- [コピーして使えるサンプル設定を見る](examples/README.md)
- [協力、フィードバック、翻訳協力](collaboration.html)

## 作れるもの

手順に沿って進めると、次のような構成を持つプロジェクトを作れます。

- 無料入口、診断またはコンテンツ体験、ペイウォール、支払い後の解放を含む課金フロー。
- 安全に管理できる GitHub リポジトリ。
- Zeabur にデプロイできる Web サイトとバックエンドサービス。
- Paddle Checkout の支払いフロー。
- 支払いを確認し、解放状態を書き込むサーバー側 Webhook。
- API key、Webhook secret、admin token をフロントエンドや公開リポジトリに置かない設定方法。
- ドメイン、環境変数、支払い、解放、ロールバックを確認する公開前チェックリスト。

## 対象読者

- Codex や AI コーディングツールで最初の有料 Web プロダクトを公開したい人。
- フロントエンドを少し触れるが、GitHub、デプロイ、決済、Webhook に慣れていない個人開発者。
- 診断、レポート、テンプレート、講座、ツール、コンテンツを一回払いで販売したい人。
- AI が生成したコードを、保守できるプロジェクトへ整理する方法を学びたい人。

## 事前に必要なもの

- GitHub アカウント。
- Zeabur アカウント、または同種のデプロイ先。
- 国際決済用の Paddle アカウント。
- Codex を実行できるローカル環境。
- 有料コンテンツとして提供したいプロダクト案。

決済やデプロイ画面は時間とともに変わることがあります。画面が変わっても、次の原則は守ってください。フロントエンドには公開設定だけを置き、秘密情報はサーバー側の環境変数に置き、支払い後の解放は必ずサーバー側 Webhook で確認します。

## 学習ルート

| 章 | 内容 | 目的 |
| --- | --- | --- |
| 1 | [プロダクトフローを分解する](docs/ja/01-product-flow.md) | 「有料サイトを作りたい」を、ユーザー導線、ページ、データ、解放ロジックへ分解します。 |
| 2 | [Codex で 0 から構築する](docs/ja/02-codex-build-workflow.md) | 要件を Codex に渡し、小さな単位で確認しながら開発します。 |
| 3 | [GitHub へアップロードする](docs/ja/03-upload-to-github.md) | リポジトリ作成、コミット、アップロードしてはいけないファイルを理解します。 |
| 4 | [Zeabur にデプロイする](docs/ja/04-zeabur-deployment.md) | サイトとバックエンドを公開し、決済プロバイダーが検証できるドメインを用意します。 |
| 5 | [Paddle 決済と自動解放を接続する](docs/ja/05-payment-unlock.md) | Checkout、Webhook、支払い状態確認、有料レポート解放を作ります。 |
| 6 | [コピーできる Codex プロンプト](docs/ja/06-prompt-templates.md) | 設計、開発、デバッグ、レビューに使えるプロンプトを活用します。 |
| 7 | [公開前チェックリスト](docs/ja/07-launch-checklist.md) | 安全性、決済、デプロイ、コンテンツ、ロールバック、UX を確認します。 |

## リポジトリ構成

```text
codex-paid-quiz-tutorial/
  index.html                  言語選択ページ
  tutorial*.html              各言語の Web 版チュートリアル
  README*.md                  各言語のプロジェクト入口
  docs/
    zh-CN/                    簡体字中国語 Markdown チュートリアル
    zh-TW/                    繁体字中国語 Markdown チュートリアル
    en/                       English Markdown tutorial
    ja/                       日本語 Markdown チュートリアル
    ko/                       한국어 Markdown 튜토리얼
  examples/                   決済設定と API 契約のサンプル
  assets/                     ブランド画像、章画像、フロー図
  tools/                      協力フォーム保守用の補助スクリプト
```

## 安全ルール

- Paddle API key、Webhook secret、admin token、実ユーザーデータ、支払いログを GitHub にコミットしないでください。
- `public/monetization.json` のような公開ファイルには、価格、表示文言、決済方法名、公開フラグだけを置きます。
- 秘密情報は Zeabur Variables またはサーバー側 `.env` に置きます。
- URL の `paid=true` だけを購入証明として信用しないでください。最終的な解放はバックエンドで確認します。
- 本番環境では Webhook 署名検証を有効にしてください。

## サンプルファイル

- [public-monetization.example.json](examples/public-monetization.example.json): 公開決済設定の例。
- [env.payment.example](examples/env.payment.example): バックエンド環境変数テンプレート。
- [minimal-api-contract.md](examples/minimal-api-contract.md): 最小決済 API 契約。

## 貢献とフィードバック

- ドキュメント修正は [CONTRIBUTING.md](CONTRIBUTING.md) を確認してください。
- 非公開の協力、事例共有、翻訳協力は [CONTACT.md](CONTACT.md) または [協力フォーム](collaboration.html) を使ってください。
- 公開 issue に API key、決済画面、Webhook secret、ユーザーデータ、個人連絡先を書かないでください。

## 免責事項

このガイドはエンジニアリングとプロダクト実装の参考資料です。決済会社の審査通過、プラットフォーム承認、収益発生を保証するものではありません。決済、税務、返金、プライバシー、消費者保護の要件は地域によって異なります。本番運用前に、対象市場のルールを確認してください。
