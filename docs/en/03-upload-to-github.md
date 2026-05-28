# 03. Upload to GitHub

![GitHub upload chapter art](../../assets/chapters/chapter-03-github.webp)
**Goal: GitHub becomes the source that Zeabur deploys from. If the code is only on your computer, Zeabur cannot see it.**

## Check what must not be committed

Your `.gitignore` should cover:

```gitignore
node_modules
dist
.env
.env.*
*.local
.logs
tmp-*
```

Never commit Paddle API keys, webhook secrets, order data, user data, or local payment store files.

## Create the repository

Create a GitHub repository, preferably without generating an extra README online. Then run:

```bash
git init
git status
git add .
git commit -m "Initial paid quiz site"
git branch -M main
git remote add origin https://github.com/your-name/your-repo.git
git push -u origin main
```

## Ask Codex to audit before pushing

```text
Please inspect the files I am about to commit. Confirm that no .env file, API key, webhook secret, payment record, or user private data will be pushed. Do not delete files unless I ask; only list risks and .gitignore recommendations.
```

## Confirm after push

- GitHub displays the README correctly.
- The latest commit is the one you just pushed.
- `src/`, `server/`, and `public/` are present.
- `.env.payment.local` is not present.

## Common mistakes

If Zeabur does not redeploy, first check whether GitHub actually has the new commit. If a secret was pushed to a public repository, treat it as leaked and rotate it in Paddle immediately.

## Completion standard

You have a clean Git status locally, a readable GitHub repository remotely, and no secrets in the public code.
