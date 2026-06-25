import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { sendTelegramMessage } from "sendkit-core";
import { telegramMessageInputSchema } from "sendkit-core/schemas";

const token = process.env.TELEGRAM_BOT_TOKEN;

const server = new McpServer({
	name: "Sendkit",
	version: "1.0.0",
});

server.registerTool(
	"telegram",
	{
		description: "Send a message to telegram",
		inputSchema: telegramMessageInputSchema.shape,
	},
	async ({ chatId, message }) => {
		if (!token) {
			throw new Error("TELEGRAM_BOT_TOKEN is not set");
		}
		if (!chatId || !message) {
			throw new Error("ChatId and message are required");
		}
		try {
			const result = await sendTelegramMessage({
				chatId,
				botToken: token,
				message,
			});

			return {
				content: [
					{
						type: "text",
						text: `Message sent to telegram, messageId:${result.chatId} and chatId: ${result.messageId}`,
					},
				],
				structuredContent:result
			};
		} catch (error) {
			return {
				content: [
					{
						type: "text",
						text: `Failed to send message to telegram ${error instanceof Error ? error.message : String(error)}`,
					},
				],
			};
		}
	},
);

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);

	console.error("Sendkit MCP Server running on stdio");
}

main().catch((error) => {
	console.error("Fatal error in main():", error);
	process.exit(1);
});
