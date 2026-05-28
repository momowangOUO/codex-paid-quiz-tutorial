# 07. 출시 전 체크리스트

![Launch checklist chapter art](../../assets/chapters/chapter-07-launch.webp)
## 제품

- [ ] 퀴즈를 시작할 수 있다.
- [ ] 끝까지 답변할 수 있다.
- [ ] 무료 인트로 리포트에 실질적인 내용이 있다.
- [ ] 미결제 상태에서 전체 리포트가 보이지 않는다.
- [ ] 결제 후 자동으로 잠금 해제된다.

## Paddle

- [ ] Website approval 완료.
- [ ] Default payment link 설정.
- [ ] Product 는 one-time digital product.
- [ ] Price 는 subscription 이 아니다.
- [ ] Webhook URL 이 맞다.
- [ ] failed / canceled / duplicate webhook 으로 잘못 해제되지 않는다.

## Zeabur

- [ ] `PAYMENT_SERVER_HOST=0.0.0.0`.
- [ ] `/data` volume 이 있다.
- [ ] `PUBLIC_BASE_URL` 과 `CORS_ORIGIN` 이 운영 도메인이다.
- [ ] `/api/health` 가 secret 을 표시하지 않는다.

## 마지막

sandbox 에서 통과한 뒤 live 로 전환합니다. live API key, live price id, live webhook secret, Paddle environment 를 함께 확인하세요.
