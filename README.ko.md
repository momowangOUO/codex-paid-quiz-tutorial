# Codex 로 유료 웹사이트 만들기

[简体中文](README.md) · [繁體中文](README.zh-TW.md) · [English](README.en.md) · [日本語](README.ja.md) · **한국어**

<p align="center">
  <img src="assets/brand/tutorial-mascot-logo-512.png" width="132" alt="Codex paid website tutorial logo" />
</p>

![Tutorial cover](assets/brand/tutorial-hero.webp)

> 0에서 GitHub, Zeabur, Paddle Checkout, 결제 후 자동 잠금 해제까지 이어지는 실전 가이드입니다.

- 추상적인 아키텍처 설명이 아니라 실제로 따라 만드는 튜토리얼입니다.
- 권장 순서: 먼저 작동하는 사이트를 만들고, GitHub 에 올리고, Zeabur 에 배포해 HTTPS 도메인을 얻은 뒤 Paddle 을 연결합니다.
- 처음이어도 장별로 Codex 에게 작은 작업을 맡기고, 구현과 검증을 반복할 수 있습니다.

## 튜토리얼 목차

1. [제품 흐름 나누기](docs/ko/01-product-flow.md)
2. [Codex 로 사이트 만들기](docs/ko/02-codex-build-workflow.md)
3. [GitHub 에 업로드하기](docs/ko/03-upload-to-github.md)
4. [먼저 Zeabur 에 배포하기](docs/ko/04-zeabur-deployment.md)
5. [Paddle 결제와 자동 잠금 해제](docs/ko/05-payment-unlock.md)
6. [Codex 프롬프트 모음](docs/ko/06-prompt-templates.md)
7. [출시 전 체크리스트](docs/ko/07-launch-checklist.md)

## 만들게 되는 것

- 무료로 체험할 수 있는 퀴즈와 결과 미리보기.
- 백엔드가 결제 상태를 관리하는 잠금 해제 흐름.
- Paddle 이 검증할 수 있는 Zeabur HTTPS 사이트.
- Paddle Checkout 과 webhook 기반 자동 잠금 해제.

## 링크

- [데모 사이트: The Calling Deconstructor](https://callingdeconstructor.zeabur.app/)
- [정적 튜토리얼 사이트](https://momowangouo.github.io/codex-paid-quiz-tutorial/)
- [GitHub 저장소](https://github.com/momowangOUO/codex-paid-quiz-tutorial)
- [협업 폼](https://docs.google.com/forms/d/e/1FAIpQLSet3g2cL32ZElYICNwvxaq27R0pxqyoHw2AK5bQHjDzNQwlUg/viewform)

데모 사이트가 잠시 잠들어 있다면 서버 예산이 낮잠 중일 수 있습니다. 튜토리얼은 그대로 사용할 수 있습니다.
