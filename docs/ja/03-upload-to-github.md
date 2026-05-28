# 03. GitHub にアップロードする

**目的：Zeabur がデプロイする元になるコードを GitHub に置きます。**

## 先に除外するもの

`.gitignore` に次のような項目を入れます。

```gitignore
node_modules
dist
.env
.env.*
*.local
.logs
tmp-*
```

Paddle API key、webhook secret、注文データ、ユーザー情報は GitHub に入れません。

## 初回 push

```bash
git init
git status
git add .
git commit -m "Initial paid quiz site"
git branch -M main
git remote add origin https://github.com/your-name/your-repo.git
git push -u origin main
```

## push 前に Codex に確認させる

```text
これから commit するファイルを確認し、.env、API key、webhook secret、支払いデータ、ユーザーの個人情報が含まれていないか見てください。削除はせず、リスクと .gitignore の提案だけ出してください。
```

## 確認ポイント

- GitHub で README が読める。
- 最新 commit が反映されている。
- `src/`、`server/`、`public/` がある。
- `.env.payment.local` がない。

Zeabur が更新されない時は、まず GitHub に本当に最新 commit があるかを確認します。
