# SendKit

Send Telegram messages from code, the terminal, or AI agents.

SendKit is an ecosystem for sending Telegram messages through a simple, unified interface.

<img width="460" height="247" alt="image" src="https://github.com/user-attachments/assets/42fa48cc-511f-4506-836e-77cc1db699a2" />


## Packages

| Package                | Description                                |
| ---------------------- | ------------------------------------------ |
| `@tb-eng/sendkit-core` | Core library for sending Telegram messages |
| `@tb-eng/sendkit`      | Command-line interface                     |
| `@tb-eng/sendkit-mcp`  | Local MCP server (stdio + Streamable HTTP) |

## Features

* 🚀 Send Telegram messages in one line
* 🤖 Works with AI agents through MCP
* 🖥️ CLI for scripts and terminals
* 🌐 Deployable as a remote MCP server
* 📦 Framework-agnostic core library
* 🔒 Input validation powered by Zod

## Architecture

```text
                    Telegram Bot API
                             ▲
                             │
               ┌─────────────┴─────────────┐
               │ @tb-eng/sendkit-core      │
               └───────┬───────────┬───────┘
                       │           │
                  CLI │           │ MCP
                       │           │
             ┌─────────▼───┐ ┌─────▼─────────────┐
             │ sendkit CLI │ │ sendkit MCP      │
             └─────────────┘ └──────┬───────────┘
                                    │
                    ┌───────────────┴──────────────┐
                    │ Local (stdio) / Remote HTTP │
                    └──────────────────────────────┘
```

## Usage Options

### 1. Core Library

Install:

```bash
npm install @tb-eng/sendkit-core
```

```ts
import { sendTelegramMessage } from "@tb-eng/sendkit-core";

await sendTelegramMessage({
  botToken: process.env.TELEGRAM_BOT_TOKEN!,
  chatId: "123456789",
  message: "Hello from SendKit 🚀"
});
```

---

### 2. CLI

Install globally:

```bash
npm install -g @tb-eng/sendkit
```

Configure:

```bash
sendkit init --telegram-bot-token <BOT_TOKEN>
```

Send:

```bash
sendkit telegram 123456789 "Hello from SendKit 🚀"
```

---

### 3. Local MCP Server

Configure your MCP client:

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

Example prompt:

> Send "Hello" to Telegram chat `123456789`.

---

### 4. Remote MCP Server

SendKit can also be deployed as a hosted Remote MCP server using Streamable HTTP.

Example server:

```text
https://remote-mcp-production-1544.up.railway.app/{BOT_TOKEN}/mcp
```

Example:

```text
https://remote-mcp-production-1544.up.railway.app/123456:ABCDEF/mcp
```

Remote MCP servers expose tools over HTTP and can be consumed by MCP-compatible clients supporting Streamable HTTP transport. Streamable HTTP is the recommended transport for remote MCP deployments.

## Example Response

```json
{
  "ok": true,
  "chatId": "123456789",
  "messageId": 42
}
```

## Monorepo Structure

```text
.
├── packages/
│   ├── sendkit-core/
│   ├── sendkit/
│   └── sendkit-mcp/
├── apps/
│   └── remote-mcp/
└── README.md
```

## Development

Install dependencies:

```bash
bun install
```

Build everything:

```bash
bun run build
```

## License

MIT
