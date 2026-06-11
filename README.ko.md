# Codex 유료 사이트 실전 가이드

[简体中文](README.md) · [繁體中文](README.zh-TW.md) · [English](README.en.md) · [日本語](README.ja.md) · **한국어**

![Codex paid site tutorial cover](assets/brand/tutorial-hero.webp)

이 문서는 결제를 받고 콘텐츠를 자동으로 해제하는 웹사이트를 0부터 출시까지 만들어 보는 실전 튜토리얼입니다. 예시는 퀴즈 / 유료 리포트 제품이지만, 리포트, 템플릿, 강의, 도구, 디지털 콘텐츠의 1회 결제 모델에도 응용할 수 있습니다.

튜토리얼은 제품 흐름 설계, Codex와의 개발 협업, GitHub 업로드, Zeabur 배포, Paddle Checkout, 서버 측 Webhook 확인, 자동 잠금 해제, 출시 전 점검까지 하나의 흐름으로 연결합니다.

## 온라인으로 읽기

- [한국어 웹 튜토리얼 열기](tutorial.ko.html)
- [한국어 Markdown 튜토리얼 읽기](docs/ko/README.md)
- [복사해서 쓸 수 있는 예시 파일 보기](examples/README.md)
- [협업, 피드백, 번역 참여](collaboration.html)

## 무엇을 만들게 되나요

튜토리얼을 따라가면 다음 기능을 갖춘 프로젝트를 만들 수 있습니다.

- 무료 진입, 퀴즈 또는 콘텐츠 경험, 페이월, 결제 후 잠금 해제를 포함한 유료 제품 흐름.
- 안전하게 관리할 수 있는 GitHub 저장소.
- Zeabur에 배포할 수 있는 웹사이트와 백엔드 서비스.
- Paddle Checkout 결제 흐름.
- 결제를 확인하고 잠금 해제 상태를 기록하는 서버 측 Webhook.
- API key, Webhook secret, admin token을 프론트엔드나 공개 저장소에 넣지 않는 설정 방식.
- 도메인, 환경 변수, 결제, 잠금 해제, 롤백을 확인하는 출시 전 체크리스트.

## 이런 분께 적합합니다

- Codex 또는 AI 코딩 도구로 첫 유료 웹 제품을 출시하고 싶은 사람.
- 프론트엔드는 조금 알지만 GitHub, 배포, 결제, Webhook이 아직 익숙하지 않은 개인 개발자.
- 퀴즈, 리포트, 템플릿, 강의, 도구, 콘텐츠를 1회 결제 상품으로 만들고 싶은 사람.
- AI가 생성한 코드를 유지보수 가능한 프로젝트로 정리하는 방법을 배우고 싶은 사람.

## 준비물

- GitHub 계정.
- Zeabur 계정 또는 비슷한 배포 플랫폼.
- 국제 결제를 위한 Paddle 계정.
- Codex를 실행할 수 있는 로컬 환경.
- 유료 콘텐츠로 만들 제품 아이디어.

결제 플랫폼과 배포 플랫폼의 화면은 시간이 지나면 바뀔 수 있습니다. 화면이 달라져도 핵심 원칙은 유지하세요. 프론트엔드에는 공개 설정만 두고, 비밀 값은 서버 측 환경 변수에 두며, 유료 접근 권한은 서버 측 Webhook 확인 이후에만 부여해야 합니다.

## 학습 경로

| 장 | 내용 | 목표 |
| --- | --- | --- |
| 1 | [제품 흐름 분해하기](docs/ko/01-product-flow.md) | “유료 사이트를 만들고 싶다”를 사용자 경로, 페이지, 데이터, 잠금 해제 로직으로 나눕니다. |
| 2 | [Codex로 0부터 구축하기](docs/ko/02-codex-build-workflow.md) | 요구사항을 Codex에 전달하고 작은 단위로 검토하며 개발합니다. |
| 3 | [GitHub에 업로드하기](docs/ko/03-upload-to-github.md) | 저장소를 만들고 커밋하며 업로드하면 안 되는 파일을 이해합니다. |
| 4 | [Zeabur에 배포하기](docs/ko/04-zeabur-deployment.md) | 결제 제공자가 검증할 수 있도록 사이트와 백엔드를 공개합니다. |
| 5 | [Paddle 결제와 자동 잠금 해제 연결하기](docs/ko/05-payment-unlock.md) | Checkout, Webhook, 결제 상태 조회, 유료 리포트 잠금 해제를 구현합니다. |
| 6 | [복사 가능한 Codex 프롬프트](docs/ko/06-prompt-templates.md) | 설계, 개발, 디버깅, 리뷰에 쓸 수 있는 프롬프트를 활용합니다. |
| 7 | [출시 전 체크리스트](docs/ko/07-launch-checklist.md) | 보안, 결제, 배포, 콘텐츠, 롤백, 사용자 경험을 확인합니다. |

## 저장소 구조

```text
codex-paid-quiz-tutorial/
  index.html                  언어 선택 페이지
  tutorial*.html              각 언어의 전체 웹 튜토리얼
  README*.md                  각 언어의 프로젝트 홈
  docs/
    zh-CN/                    Simplified Chinese Markdown tutorial
    zh-TW/                    Traditional Chinese Markdown tutorial
    en/                       English Markdown tutorial
    ja/                       Japanese Markdown tutorial
    ko/                       한국어 Markdown 튜토리얼
  examples/                   결제 설정과 API 계약 예시
  assets/                     브랜드 이미지, 장 이미지, 흐름도
  tools/                      협업 폼 유지보수용 보조 스크립트
```

## 보안 원칙

- Paddle API key, Webhook secret, admin token, 실제 사용자 데이터, 결제 로그를 GitHub에 커밋하지 마세요.
- `public/monetization.json` 같은 공개 파일에는 가격, 표시 문구, 결제 방식 이름, 공개 플래그만 넣어야 합니다.
- 실제 비밀 값은 Zeabur Variables 또는 서버 측 `.env`에 둡니다.
- URL의 `paid=true`만으로 구매를 증명했다고 믿으면 안 됩니다. 최종 잠금 해제는 백엔드가 확인해야 합니다.
- 프로덕션에서는 Webhook 서명 검증을 켜야 합니다.

## 예시 파일

- [public-monetization.example.json](examples/public-monetization.example.json): 공개 결제 설정 예시.
- [env.payment.example](examples/env.payment.example): 백엔드 환경 변수 템플릿.
- [minimal-api-contract.md](examples/minimal-api-contract.md): 최소 결제 API 계약.

## 기여와 피드백

- 문서 수정은 [CONTRIBUTING.md](CONTRIBUTING.md)를 확인하세요.
- 비공개 협업, 사례 공유, 번역 참여는 [CONTACT.md](CONTACT.md) 또는 [협업 폼](collaboration.html)을 사용하세요.
- 공개 issue에 API key, 결제 대시보드 화면, Webhook secret, 사용자 데이터, 개인 연락처를 올리지 마세요.

## 면책 조항

이 튜토리얼은 엔지니어링과 제품 구현을 위한 안내서입니다. 결제 플랫폼 승인, 플랫폼 심사 통과, 수익 발생을 보장하지 않습니다. 결제, 세금, 환불, 개인정보, 소비자 보호 규정은 지역마다 다릅니다. 실제 유료 제품을 운영하기 전에 대상 시장의 규칙을 직접 확인하세요.
