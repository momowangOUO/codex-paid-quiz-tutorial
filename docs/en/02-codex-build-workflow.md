# 02. Build the site with Codex

Ask Codex to implement in small passes: UI first, backend second, mock payment third, Paddle last.

## Suggested stack

- React or Vite for the frontend.
- Node for the backend and static file serving.
- Mock provider for local unlock testing.
- Paddle provider for production payment.

```text
Implement a paywall prototype. Default it to disabled, add mock checkout for local testing, and make sure only the backend can mark a report as paid.
```
