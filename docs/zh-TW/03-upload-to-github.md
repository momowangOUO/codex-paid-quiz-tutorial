# 03. 上傳到 GitHub

**本章重點：GitHub 是 Zeabur 讀取程式碼的地方。你電腦裡改好了，但沒 push，Zeabur 就看不到。**

## 先檢查不要上傳的東西

請確認 `.gitignore` 至少忽略：

```gitignore
node_modules
dist
.env
.env.*
*.local
.logs
tmp-*
```

真實 Paddle API key、webhook secret、付款資料、使用者資料，都不要提交到 GitHub。

## 建立 GitHub repo

1. 到 GitHub 建立新 repository。
2. 名稱可以用 `paid-quiz-site` 或你的產品名稱。
3. 如果你還不熟，先選 private；要分享教學再選 public。
4. 不要在 GitHub 網頁上另外建立 README，避免跟本機內容衝突。

## 本機第一次提交

```bash
git init
git status
git add .
git commit -m "Initial paid quiz site"
git branch -M main
git remote add origin https://github.com/你的帳號/你的倉庫.git
git push -u origin main
```

如果你不確定現在有沒有 secret，先問 Codex：

```text
請幫我檢查目前 git 即將提交的檔案，確認沒有 .env、API key、webhook secret、付款資料或使用者隱私。
不要刪我的檔案，只列出風險並建議 .gitignore。
```

## 推送後怎麼確認

- GitHub 頁面能看到 README。
- 最新 commit 是你剛剛的訊息。
- `server/`、`src/`、`public/` 都在。
- `.env.payment.local` 不在。

## 常見錯誤

### Zeabur 沒更新

通常是你還沒 push，或 Zeabur 沒連到正確分支。先確認 GitHub 頁面是否真的有最新 commit。

### 不小心提交 secret

不要只是刪掉檔案再 commit。已經推上公開 repo 的 secret 要視為外洩，應該立刻去 Paddle 重新產生 key。

## 本章完成標準

- GitHub 上有完整專案。
- 本機 `git status` 乾淨。
- repo 裡沒有 secret 或本機付款資料。
- 你知道 Zeabur 接下來會從這個 repo 部署。
