# Codex로 유료 웹사이트 만들기

[简体中文](README.md) · [繁體中文](README.zh-TW.md) · [English](README.en.md) · [日本語](README.ja.md) · **한국어**

<p align="center">
  <img src="assets/brand/tutorial-mascot-logo-512.png" width="132" alt="Codex paid website tutorial logo" />
</p>

![Tutorial cover](assets/brand/tutorial-hero.webp)

> 0부터 GitHub, Zeabur, Paddle 결제, 자동 잠금 해제까지 따라 하는 실전 가이드.

- 이 튜토리얼은 이론 설명이 아니라 실제로 결제와 자동 잠금 해제가 되는 웹사이트를 만드는 절차에 집중합니다.
- 순서가 중요합니다. 먼저 동작하는 사이트를 만들고, Zeabur에 배포해 HTTPS 도메인을 받은 뒤 Paddle 사이트 승인과 결제를 설정합니다.
- 처음이라도 각 장을 따라가며 Codex에게 작업 분해, 구현, 검증을 맡기면 됩니다.

## 튜토리얼 목차

1. [제품과 흐름 설계](docs/ko/01-product-flow.md)
2. [Codex로 사이트 만들기](docs/ko/02-codex-build-workflow.md)
3. [GitHub에 올리기](docs/ko/03-upload-to-github.md)
4. [Zeabur에 배포하기](docs/ko/04-zeabur-deployment.md)
5. [Paddle 결제 연결](docs/ko/05-payment-unlock.md)
6. [프롬프트 템플릿](docs/ko/06-prompt-templates.md)
7. [출시 전 체크리스트](docs/ko/07-launch-checklist.md)

## 만들게 될 것

- 무료로 체험할 수 있는 퀴즈와 결과 미리보기를 만든다.
- URL 플래그가 아니라 백엔드에서 주문 상태를 관리한다.
- Zeabur에 배포해 Paddle이 검증할 수 있는 HTTPS 도메인을 얻는다.
- Paddle Checkout과 webhook으로 결제 후 자동 잠금 해제를 구현한다.
- 출시 전 체크리스트로 secret 유출을 막는다.

## 관련 링크

- [라이브 예제: The Calling Deconstructor](https://callingdeconstructor.zeabur.app/)
- [정적 튜토리얼 사이트](https://momowangouo.github.io/codex-paid-quiz-tutorial/)
- [GitHub 저장소](https://github.com/momowangOUO/codex-paid-quiz-tutorial)
- [협업 양식](https://docs.google.com/forms/d/e/1FAIpQLSet3g2cL32ZElYICNwvxaq27R0pxqyoHw2AK5bQHjDzNQwlUg/viewform)

라이브 예제가 잠시 잠들어 있다면 작은 서버 예산이 쉬는 중일 수 있습니다. 튜토리얼 자체는 그대로 사용할 수 있습니다.
