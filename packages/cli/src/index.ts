import { Command } from "commander";
import { sendTelegramMessage } from "sendkit-core";
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
		const token = process.env.TELEGRAM_BOT_TOKEN;
		if (!token) {
			console.error("TELEGRAM_BOT_TOKEN is not set");
			process.exit(1);
		}
		if (!chatId || !message) {
			console.error("ChatId and message are required");
			process.exit(1);
		}

		console.log(token,chatId,message)

		try {
			const output = await sendTelegramMessage({
				botToken: token,
				chatId,
				message
			});
		} catch (error) {
			console.error("Failed to send telegram message: ", error);
			process.exit(1);
		}
	});
program.parseAsync(process.argv);
