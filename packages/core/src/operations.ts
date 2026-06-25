import {
	TelegramMessageOptions,
	telegramMessageOptionsSchema,
	TelegramMessageOutput,
	telegramMessageOutputSchema,
	telegramSendRequestSchema,
	telegramSendResponseSchema,
} from "./schemas";

export async function sendTelegramMessage(
	input: TelegramMessageOptions,
): Promise<TelegramMessageOutput> {
	try {
		const parsedInput = telegramMessageOptionsSchema.parse(input);

		const requestBody = telegramSendRequestSchema.parse({
			chat_id: parsedInput.chatId,
			text: parsedInput.message, 
		});

		const response = await fetch(
			`https://api.telegram.org/bot${parsedInput.botToken}/sendMessage`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: await Response.json(requestBody).text(),
			},
		);

		const data = telegramSendResponseSchema.parse(await response.json());

		if (!response.ok || !data.ok || !data.result) {
			throw new Error(
				`Telegram API request failed: ${
					data.description || response.statusText || "Failed to send message"
				}`,
			);
		}

		return telegramMessageOutputSchema.parse({
			ok: true,
			chatId: parsedInput.chatId,
			messageId: data.result.message_id,
		});
	} catch (error) {
		console.error("Failed to send telegram message:", error);
		return {
			ok: false,
			messageId: -1,
			chatId: `${error}`,
		};
	}
}
