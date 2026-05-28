# Codex で課金サイトを作る

[简体中文](README.md) · [繁體中文](README.zh-TW.md) · [English](README.en.md) · **日本語** · [한국어](README.ko.md)

<p align="center">
  <img src="assets/brand/tutorial-mascot-logo-512.png" width="132" alt="Codex paid website tutorial logo" />
</p>

![Tutorial cover](assets/brand/tutorial-hero.webp)

> 0 から GitHub、Zeabur、Paddle 決済、自動アンロックまで進める実践ガイド。

- このチュートリアルは抽象論ではなく、本当に課金できるサイトを作るための実践手順です。
- 順番が大切です。まず動くサイトを作り、Zeabur にデプロイして HTTPS ドメインを取得し、その後 Paddle のサイト審査と決済設定を進めます。
- 初心者でも、章ごとに Codex に作業分解、実装、検証を任せながら進められます。

## チュートリアル一覧

1. [商品と導線を設計する](docs/ja/01-product-flow.md)
2. [Codex でサイトを作る](docs/ja/02-codex-build-workflow.md)
3. [GitHub にアップロードする](docs/ja/03-upload-to-github.md)
4. [Zeabur にデプロイする](docs/ja/04-zeabur-deployment.md)
5. [Paddle 決済を接続する](docs/ja/05-payment-unlock.md)
6. [プロンプト集](docs/ja/06-prompt-templates.md)
7. [公開前チェックリスト](docs/ja/07-launch-checklist.md)

## 作るもの

- 無料で試せる診断と結果プレビューを作る。
- URL パラメータではなく、バックエンドで注文状態を管理する。
- Zeabur にデプロイし、Paddle が確認できる HTTPS ドメインを取得する。
- Paddle Checkout と webhook で支払い後に自動アンロックする。
- 公開前チェックで secret の漏えいを防ぐ。

## 関連リンク

- [ライブ例：The Calling Deconstructor](https://callingdeconstructor.zeabur.app/)
- [静的チュートリアルサイト](https://momowangouo.github.io/codex-paid-quiz-tutorial/)
- [GitHub リポジトリ](https://github.com/momowangOUO/codex-paid-quiz-tutorial)
- [協力フォーム](https://docs.google.com/forms/d/e/1FAIpQLSet3g2cL32ZElYICNwvxaq27R0pxqyoHw2AK5bQHjDzNQwlUg/viewform)

ライブ例が一時的に眠っていても、たいていは小さなサーバー予算の昼寝です。チュートリアル自体はそのまま使えます。
