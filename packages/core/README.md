# @tb-eng/sendkit-core

Core library for sending Telegram messages.

`@tb-eng/sendkit-core` provides a simple, framework-agnostic API for interacting with the Telegram Bot API. It powers both the SendKit CLI and MCP server.

## Installation

```bash
npm install @tb-eng/sendkit-core
```

## Usage

```ts
import { sendTelegramMessage } from "@tb-eng/sendkit-core";

const result = await sendTelegramMessage({
  botToken: process.env.TELEGRAM_BOT_TOKEN!,
  chatId: "123456789",
  message: "Hello from SendKit 🚀",
});

console.log(result);
```

## API

### `sendTelegramMessage(options)`

#### Parameters

| Field      | Type   | Required | Description        |
| ---------- | ------ | -------- | ------------------ |
| `botToken` | string | ✓        | Telegram bot token |
| `chatId`   | string | ✓        | Telegram chat ID   |
| `message`  | string | ✓        | Message text       |

#### Returns

```ts
{
  ok: true,
  chatId: string,
  messageId: number
}
```

## Errors

Errors returned by the Telegram API are surfaced directly.

Example:

```txt
Bad Request: chat not found
```

## License

MIT