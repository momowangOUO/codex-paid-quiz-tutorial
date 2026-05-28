# 02. Codex 로 사이트 만들기

![Codex build workflow chapter art](../../assets/chapters/chapter-02-codex.webp)
**목표: Codex 에게 한 번에 모든 것을 맡기지 말고, 검증 가능한 작은 단계로 나눕니다.**

## 첫 프롬프트

```text
유료 퀴즈 사이트를 만들고 싶습니다.

사용자는:
1. 랜딩 페이지를 열고
2. 퀴즈를 완료하고
3. 무료 인트로 리포트를 보고
4. 결제 버튼을 누르고
5. 결제 성공 후 전체 리포트를 자동으로 봅니다.

최소 실행 버전을 만들어 주세요.
조건:
- 프론트엔드는 React + Vite
- 백엔드는 Node.js
- 먼저 mock 결제, 실제 Paddle 은 아직 연결하지 않음
- 로그인 불필요
- secret 을 프론트엔드에 넣지 않음
- 각 단계의 로컬 실행 및 검증 방법 설명
```

기존 프로젝트가 있다면 “기존 구조를 먼저 읽고, 새로 만들지 말고 이어서 작업해 주세요”라고 덧붙입니다.

## 추천 구조

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

화면, 데이터, 공개 설정, 결제 검증을 분리하면 나중에 수정하기 쉽습니다.

## 1단계: 퀴즈 흐름만 만들기

랜딩, 질문, 답변, reportId, 무료 리포트, 잠금 해제 버튼만 만듭니다. `npm install`, `npm run dev` 후 직접 한 번 답변합니다.

## 2단계: 백엔드와 mock 결제

```text
Node 백엔드를 추가하고 mock 결제를 먼저 만들어 주세요.

API:
- POST /api/payments/checkout
- GET /api/payments/sessions/:id
- POST /api/payments/mock-paid

결제 상태는 백엔드가 저장하고, 프론트엔드만으로 paid 가 될 수 없게 해 주세요.
```

## 3단계: 보안 점검

`.env.payment.local` 이 Git 에 들어가지 않는지, Paddle key 가 서버에만 있는지, URL 의 `paid=true` 로 잠금 해제가 되지 않는지 확인시킵니다.

## 작업 리듬

파일 계획, 구현, typecheck/build, 브라우저 테스트, 오류 공유를 반복하세요. 결제가 있는 제품은 이 방식이 훨씬 안전합니다.
