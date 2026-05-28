# 03. 上传到 GitHub

GitHub 是 Zeabur 自动部署的来源。你不需要先会很多 Git，只要把项目整理干净再推上去。

![教程首页截图](../../assets/screenshots/00-tutorial-home.png)

## 上传前先检查

- `.env`、`.env.local`、`.env.payment.local` 不要上传。
- `node_modules`、`dist`、日志、临时截图不要上传。
- README 要告诉别人这个项目做什么、怎么开始、文档在哪里。

## 基本命令

```bash
git status
git add .
git commit -m "Initial paid website"
git branch -M main
git remote add origin https://github.com/你的帐号/你的仓库.git
git push -u origin main
```

## 如果 Codex 帮你推送

你可以直接说：

```text
请检查这个项目有没有不该提交的 secret、临时文件或构建产物。
确认安全后帮我 commit 并 push 到 GitHub。
```

## GitHub Pages

教程类仓库可以顺手开 GitHub Pages。这样别人不用 clone repo，就能直接打开静态教程页。
