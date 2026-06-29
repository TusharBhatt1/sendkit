# @tb-eng/sendkit-mcp

Model Context Protocol (MCP) server for sending Telegram messages.

SendKit MCP exposes Telegram messaging tools to AI agents such as Claude Code, Cursor, Cline, and ChatGPT.

## Installation

```bash
npm install -g @tb-eng/sendkit-mcp
```

## Features

* Send Telegram messages from AI agents.
* Works with any MCP-compatible client.
* Uses the Telegram Bot API.
* Built on top of `@tb-eng/sendkit-core`.

## Available Tools

### `telegram`

Send a Telegram message.

#### Input

```json
{
  "chatId": "123456789",
  "message": "Hello from MCP"
}
```

#### Response

```json
{
  "ok": true,
  "chatId": "123456789",
  "messageId": 42
}
```

## Configuration

Set the Telegram bot token in the MCP server environment.

Example `.mcp.json`:

```json
{
  "mcpServers": {
    "sendkit": {
      "command": "npx",
      "args": ["-y", "@tb-eng/sendkit-mcp"],
      "env": {
        "TELEGRAM_BOT_TOKEN": "YOUR_BOT_TOKEN"
      }
    }
  }
}
```

## Example Usage

User:

> Send "Hello" to Telegram chat 123456789.

Agent:

Uses the `telegram` MCP tool automatically.

## Supported Clients

* Claude Code
* Cursor
* Cline
* GitHub Copilot
* Gemini CLI
* OpenCode
* Warp

## License

MIT