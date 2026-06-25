import { Command } from "commander";

const program = new Command();

type TelegramResponse = {
	ok: boolean;
	result?: {
		message_id?: number;
	};
	description?: string;
};

program
	.name("sendkit")
	.description(
		"SendKit is a CLI tool for sending messages to Telegram groups and channels.",
	)
	.command("telegram")
	.argument("<chatId>", "Telegram chatId")
	.argument("<message>", "Message text to send")
	.action(async (chatId: string, message: string) => {
		try {
			const token = process.env.TELEGRAM_BOT_TOKEN;
			if (!token) {
				console.error("TELEGRAM_BOT_TOKEN is not set");
				process.exit(1);
			}
			if (!chatId || !message) {
				console.error("ChatId and message are required");
				process.exit(1);
			}
			const response = await fetch(
				`https://api.telegram.org/bot${token}/sendMessage`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						chat_id: chatId,
						text: message,
					}),
				},
			);

			const data = (await response.json()) as TelegramResponse;

			if (!response.ok || !data.ok) {
				console.error(
					`Telegram API request failed: ${
						data.description || response.statusText || "Failed to send message"
					}`,
				);
				process.exit(1);
			}
			const messageId = data.result?.message_id;

			if (messageId !== undefined) {
				console.log(`Message sent, messageId: ${messageId}`);
			}
		} catch (error) {
			console.error(`Error sending message: ${error}`);
			process.exit(0);
		}
	});
program.parseAsync(process.argv);

async function sendMessage() {}
