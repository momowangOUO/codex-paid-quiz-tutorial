# Codex로 유료 테스트 웹사이트를 처음부터 만들기

[简体中文](README.md) | [繁體中文](README.zh-TW.md) | [English](README.en.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

<p align="center">
  <img src="assets/brand/tutorial-mascot-logo-512.png" width="128" alt="Codex paid quiz tutorial logo" />
</p>

> 단순한 설문 페이지가 아니라, 응답, Zeabur HTTPS 배포, Paddle 결제, 리포트 자동 잠금 해제를 연결한 제품 흐름을 만드는 가이드입니다.

Static site: <https://momowangouo.github.io/codex-paid-quiz-tutorial/>

Live example: <https://callingdeconstructor.zeabur.app/>

이 튜토리얼은 테스트, 리포트, 컨설팅, 교육 콘텐츠를 유료 웹사이트로 만들고 싶은 크리에이터를 위한 실전 가이드입니다. 특정 제품의 채점 알고리즘이나 리포트 설계 방식은 공개하지 않고, 재사용 가능한 기술 구조만 정리합니다.

순서가 중요합니다. 먼저 로컬 mock 흐름을 완성하고, GitHub에 업로드한 뒤, 그 GitHub repo를 Zeabur에 배포해서 공개 HTTPS 도메인을 얻고, 그 도메인으로 Paddle website approval, default payment link, webhook을 설정합니다.

![Paid quiz architecture](assets/brand/tutorial-hero.webp)

## Live Example

실제 유료 테스트 웹사이트 예시는 여기에서 볼 수 있습니다.

[The Calling Deconstructor](https://callingdeconstructor.zeabur.app/)

이 링크는 제품 경험 참고용이며, 비공개 채점 방식이나 리포트 설계를 공개하는 템플릿은 아닙니다.

작은 안내: 개인 프로젝트라 서버 예산이 무한 리필은 아닙니다. 가끔 접속이 안 된다면 사라진 것이 아니라 잠시 "클라우드 겨울잠 모드"에 들어간 것일 수 있습니다.

## 대상 독자

- 테스트, 리포트, 교육, 커리어, 심리 콘텐츠 아이디어가 있는 사람.
- Codex를 쓰고 싶지만 개발 작업을 어떻게 나눌지 모르는 사람.
- 결제 후 페이지를 자동으로 잠금 해제하고 싶은 사람.
- 복잡한 SaaS를 만들기 전에 유료 수요를 검증하고 싶은 사람.

## 만들게 되는 것

- 테스트 흐름.
- 무료 미리보기 결과.
- 백엔드 payment session.
- HTTPS 공개 배포.
- Paddle, Stripe, Lemon Squeezy 등의 hosted checkout.
- Webhook 기반 자동 잠금 해제.
- 리포트 복구와 access token 모델.

## 비용과 대체 선택지

| 항목 | 추천 | 대체안 |
| --- | --- | --- |
| 프론트엔드 | React + Vite | Next.js, Vue, SvelteKit |
| 백엔드 | 작은 Node.js 서버 | Hono, Express, Fastify, Next.js API |
| 호스팅 | Zeabur | Render, Railway, Fly.io, Vercel, Cloudflare |
| 결제 | Paddle | Stripe, Lemon Squeezy, FastSpring, PayPal |
| 저장소 | JSON 파일부터 시작 | SQLite, Postgres, Supabase, Neon |

## 핵심 흐름

```text
테스트 답변
  -> 무료 미리보기
  -> GitHub에 업로드
  -> Zeabur에 배포하고 HTTPS 도메인 확보
  -> 백엔드가 payment session 생성
  -> Hosted checkout
  -> Webhook으로 결제 확인
  -> 백엔드가 access token 발급
  -> 전체 리포트 자동 잠금 해제
```

`paid=true` 같은 URL 파라미터를 결제 증거로 믿으면 안 됩니다. 결제 확인은 반드시 백엔드에서 처리해야 합니다.

## Chapters

1. [Product Flow](01-product-flow.md)
2. [Build Workflow with Codex](02-codex-build-workflow.md)
3. [Upload to GitHub Before Zeabur](03-upload-to-github.md)
4. [Deploy to Zeabur and Get a Verifiable Domain](04-zeabur-deployment.md)
5. [Connect Paddle Payment and Auto-Unlock](05-payment-unlock.md)
6. [Prompt Templates](06-prompt-templates.md)
7. [Launch Checklist](07-launch-checklist.md)
8. [Visual Walkthrough](08-visual-walkthrough.md)

## Contribute

번역, 결제 플랫폼 보충, 배포 플랫폼 보충, 스크린샷, 보안 개선, 오탈자 수정을 환영합니다. 자세한 내용은 [CONTRIBUTING.md](CONTRIBUTING.md)를 확인하세요.

## Author

The author works across cognitive psychology, gamified experience design, and AI product prototyping.

협업, 사례 공유, 구현 상담은 [협업 양식 입구](collaboration.html)를 먼저 확인해 주세요.

GitHub issue는 공개 오류 제보, 문서 보완, PR 논의에만 사용합니다. 공개 issue에는 개인 연락처, 결제 계정, API key, 관리자 화면 스크린샷, 실제 주문 데이터를 올리지 마세요.
