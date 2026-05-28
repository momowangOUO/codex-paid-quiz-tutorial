# 05. Paddle 결제 연결

![Paddle domain approval](../../assets/screenshots/04-paddle-domain.svg)

![Paddle product and price](../../assets/screenshots/05-paddle-product-price.svg)

![Paddle webhook](../../assets/screenshots/06-paddle-webhook.svg)


Paddle은 결제를 처리하고, 백엔드는 webhook을 검증해 리포트를 해제합니다.

- one-time product를 만든다.
- CNY와 USD price를 만든다.
- API key와 webhook secret은 Zeabur Variables에 넣는다.
- webhook URL은 `https://your-domain/api/webhooks/paddle`.
- `transaction.completed`만 잠금 해제한다.
