import { Hono } from "hono";
import { cors } from "hono/cors";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

import { sendTelegramMessage } from "sendkit-core";
import { telegramMessageInputSchema } from "sendkit-core/schemas";

const app = new Hono();
// Enable CORS for all origins
app.use(
	"*",
	cors({
		origin: "*",
		allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
		allowHeaders: [
			"Content-Type",
			"mcp-session-id",
			"Last-Event-ID",
			"mcp-protocol-version",
		],
		exposeHeaders: ["mcp-session-id", "mcp-protocol-version"],
	}),
);

const getServer = (token: string) => {
	const server = new McpServer({
		name: "Sendkit-Remote",
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
					structuredContent: result,
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

	return server;
};

app.all("/:botToken/mcp", async (c) => {
	const botToken = c.req.param("botToken");

	const transport = new WebStandardStreamableHTTPServerTransport({
		enableJsonResponse: true,
		sessionIdGenerator: undefined,
	});
	const server = getServer(botToken);
	await server.connect(transport);
	try {
		return transport.handleRequest(c.req.raw);
	} catch (error) {
		await server.close();
	}
});

app.get("/health", (c) => c.json({ status: "ok" }));

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.notFound((c) => {
	return c.json({ error: "Not found" }, 404);
});

export default app;
