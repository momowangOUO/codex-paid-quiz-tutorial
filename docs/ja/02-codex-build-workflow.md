# 02. Codex にサイトを作らせる進め方

![Codex build workflow chapter art](../../assets/chapters/chapter-02-codex.webp)
**目的：Codex に一度で全部作らせず、検証できる小さな作業に分けます。**

## 最初のプロンプト

```text
有料診断サイトを作りたいです。

ユーザーは：
1. トップページを開く
2. 診断に回答する
3. 無料導入レポートを見る
4. 決済ボタンを押す
5. 支払い成功後に完全版レポートが自動で開く

最小実用版を作ってください。
条件：
- フロントエンドは React + Vite
- バックエンドは Node.js
- まず mock 決済。Paddle はまだ接続しない
- ログイン不要
- secret をフロントエンドに入れない
- 各ステップのローカル実行と検証方法も説明する
```

既存プロジェクトがある場合は、「既存構造を読んで、作り直さずに進めてください」と追加します。

## 推奨構成

```text
paid-quiz-site/
  src/app/
  src/components/
  src/data/
  src/monetization/
  src/styles/
  server/payment-server.mjs
  public/monetization.json
  package.json
  .env.payment.example
```

画面、データ、公開設定、支払い検証を分けると、後から修正しやすくなります。

## 第 1 パス：診断フローだけ

トップ、質問、回答、reportId、無料レポート、解放ボタンだけを作ります。`npm install` と `npm run dev` で動かし、自分で一度回答します。

## 第 2 パス：バックエンドと mock 決済

```text
Node バックエンドを追加し、まず mock 決済を作ってください。

API：
- POST /api/payments/checkout
- GET /api/payments/sessions/:id
- POST /api/payments/mock-paid

支払い状態はバックエンドが保持し、フロントエンドだけで paid にできないようにしてください。
```

## 第 3 パス：安全確認

`.env.payment.local` が Git に入らないこと、Paddle key がサーバーだけにあること、URL の `paid=true` で解放されないことを Codex に確認させます。

## 作業リズム

ファイル計画、実装、typecheck/build、ブラウザ確認、エラー共有。この小さなループを繰り返す方が、商用サイトでは安全です。
