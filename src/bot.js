const { createBot } = require("./app");
const { BOT_MODE } = require("./config/env");
const { connectDatabase } = require("./database");
const { startWebhookServer } = require("./server");
const { logger } = require("./utils/logger");

const bot = createBot();
let webhookServer;

async function startBot() {
  await connectDatabase();

  if (BOT_MODE === "webhook") {
    webhookServer = await startWebhookServer(bot);
    logger.info("Bot started successfully in webhook mode");
    return;
  }

  await bot.launch();
  logger.info("Bot started successfully in polling mode");
}

startBot().catch((error) => {
  logger.error("Failed to start bot:", error);
  process.exit(1);
});

function stopBot(signal) {
  if (webhookServer) {
    webhookServer.close();
  }

  bot.stop(signal);
}

process.once("SIGINT", () => stopBot("SIGINT"));
process.once("SIGTERM", () => stopBot("SIGTERM"));
