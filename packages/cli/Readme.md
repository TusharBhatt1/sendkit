# @tb-eng/sendkit

CLI for sending Telegram messages.

SendKit lets you send Telegram messages directly from your terminal.

## Installation

```bash
npm install -g @tb-eng/sendkit
```

Or run without installation:

```bash
npx @tb-eng/sendkit
```

## Setup

Configure your Telegram bot token once:

```bash
sendkit init --telegram-bot-token <botToken>
```

The token is stored locally in:

```txt
~/.config/sendkit/config.json
```

## Send a message

```bash
sendkit telegram <chatId> <message>
```

Example:

```bash
sendkit telegram 123456789 "Hello from SendKit 🚀"
```

Response:

```json
{
  "ok": true,
  "chatId": "123456789",
  "messageId": 42
}
```

## Commands

### Initialize configuration

```bash
sendkit init --telegram-bot-token <botToken>
```

### Send Telegram message

```bash
sendkit telegram <chatId> <message>
```

## Troubleshooting

### Telegram bot token is required

Run:

```bash
sendkit init --telegram-bot-token <botToken>
```

### Chat not found

Ensure:

* The chat ID is correct.
* The user has started the bot.
* The bot has permission to send messages.

## License

MIT