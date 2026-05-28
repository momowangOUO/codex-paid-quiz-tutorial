# 03. GitHub 에 업로드하기

![GitHub upload chapter art](../../assets/chapters/chapter-03-github.webp)
**목표: Zeabur 가 배포할 코드를 GitHub 에 둡니다. 로컬에만 있으면 Zeabur 는 볼 수 없습니다.**

## 커밋하면 안 되는 것

`.gitignore` 에 다음을 넣습니다.

```gitignore
node_modules
dist
.env
.env.*
*.local
.logs
tmp-*
```

Paddle API key, webhook secret, 주문 데이터, 사용자 정보는 GitHub 에 올리지 않습니다.

## 첫 push

```bash
git init
git status
git add .
git commit -m "Initial paid quiz site"
git branch -M main
git remote add origin https://github.com/your-name/your-repo.git
git push -u origin main
```

## push 전 Codex 점검

```text
커밋할 파일을 확인해서 .env, API key, webhook secret, 결제 데이터, 사용자 개인정보가 포함되어 있지 않은지 봐 주세요. 파일을 삭제하지 말고 위험과 .gitignore 제안만 알려 주세요.
```

## 확인

- GitHub 에서 README 가 읽힌다.
- 최신 commit 이 반영되어 있다.
- `src/`, `server/`, `public/` 이 있다.
- `.env.payment.local` 이 없다.

Zeabur 가 갱신되지 않으면 먼저 GitHub 에 정말 최신 commit 이 있는지 확인합니다.
