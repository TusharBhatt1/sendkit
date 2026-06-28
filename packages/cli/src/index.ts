#!/usr/bin/env node
import { Command } from "commander";
import { sendTelegramMessage } from "@tb-eng/sendkit-core";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

const program = new Command();
const configPath = join(homedir(), ".config", "sednkit", "config.json");

function writeTelegramBotToken(token: string) {
  mkdirSync(dirname(configPath), { recursive: true });
  writeFileSync(configPath, `${JSON.stringify({ telegramBotToken: token }, null, 2)}\n`, {
    mode: 0o600,
  });
  console.log(`Telegram bot token saved successfully at ${configPath}`);
}
function getTelegramBotToken() {
  if (!existsSync(configPath)) {
    throw new Error("Telegram bot token is required. Run `sendkit init.`");
  }

  const config = JSON.parse(readFileSync(configPath, "utf8"));
  const token = config.telegramBotToken;

  if (!config || !token) {
    throw new Error("Telegram bot token is required. Run `sendkit init.`");
  }

  return token;
}

program.name("sendkit").description("SendKit CLI backed by sendkit-core.");
program
  .command("init")
  .description("Configure SendKit CLI local settings")
  .requiredOption("--telegram-bot-token <botToken>", "Telegram bot token")
  .action(async (options: { telegramBotToken: string }) => {
    writeTelegramBotToken(options.telegramBotToken);
  });

program
  .name("telegram")
  .description("SendKit send a message to Telegram groups and channels.")
  .command("telegram")
  .argument("<chatId>", "Telegram chatId")
  .argument("<message>", "Message text to send")
  .action(async (chatId: string, message: string) => {
    const token = getTelegramBotToken();

    if (!chatId || !message) {
      console.error("ChatId and message are required");
      process.exit(1);
    }

    try {
      const result = await sendTelegramMessage({
        botToken: token,
        chatId,
        message,
      });
      console.log(JSON.stringify(result));
    } catch (error) {
      console.error("Failed to send telegram message: ", error);
      process.exit(1);
    }
  });
await program.parseAsync(process.argv).catch((e) => {
  console.error(e instanceof Error ? e.message : String(e));
  process.exit(1);
});
