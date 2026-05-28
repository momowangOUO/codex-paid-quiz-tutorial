# 03. 上傳到 GitHub

GitHub 是 Zeabur 自動部署的來源。先整理乾淨，再推上去。

![教學首頁截圖](../../assets/screenshots/00-tutorial-home.png)

## 上傳前檢查

- 不上傳 `.env`、`.env.local`、`.env.payment.local`。
- 不上傳 `node_modules`、`dist`、暫存檔。
- README 只放入口與連結，詳細教學放在 docs。

```bash
git status
git add .
git commit -m "Initial paid website"
git push -u origin main
```
