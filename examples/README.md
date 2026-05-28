# Examples

这个目录放可复制的配置样板。它们不是完整项目源码，而是给读者在自己的测验网站中参考。

| 文件 | 用途 |
| --- | --- |
| `public-monetization.example.json` | 前端可公开读取的付费配置 |
| `env.payment.example` | 后端私密环境变量模板 |
| `minimal-api-contract.md` | 最小付款与解锁 API 设计 |

使用方式：

1. 复制样板到你的项目。
2. 把占位值换成自己的域名、价格和付款平台 ID。
3. 确认 secret 只放在后端环境变量，不放进 `public`。

