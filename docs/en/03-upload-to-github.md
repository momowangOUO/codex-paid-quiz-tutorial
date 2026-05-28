# 03. Upload to GitHub

![Tutorial home screenshot](../../assets/screenshots/00-tutorial-home.png)


GitHub is the source Zeabur deploys from. Keep the repo clean before pushing.

## Check before push

- Do not commit .env, .env.local, or .env.payment.local.
- Do not commit node_modules, dist, logs, or temporary screenshots.
- Keep root READMEs short and link to docs.

```bash
git status
git add .
git commit -m "Initial paid website"
git push -u origin main
```
