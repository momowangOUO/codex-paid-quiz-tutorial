# 06. Codex プロンプト集

![Prompt templates chapter art](../../assets/chapters/chapter-06-prompts.webp)
## 最小版を作る

```text
React + Vite と Node で、支払い後にレポートを解放する診断サイトの最小版を作ってください。まず mock 決済で、ログインなし、支払い状態はバックエンドだけが決める形にしてください。ファイル計画、実装、typecheck、build までお願いします。
```

## Paddle を追加する

```text
mock provider の横に Paddle provider を追加してください。checkout 作成、Paddle-Signature 検証、transaction.completed のみで解放、重複 webhook の冪等処理、reportId 不一致時の拒否を実装してください。
```

## Zeabur エラーを直す

```text
Zeabur の deploy が失敗しました。以下がログです。原因が build、start、PORT、環境変数、ファイル不足、メモリのどれかを判断し、修正してください。
```

## secret を確認する

```text
このプロジェクトに Paddle API key、webhook secret、.env.payment.local、注文データが GitHub に入るリスクがないか確認してください。
```
