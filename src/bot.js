const { createBot } = require("./app");
const { connectDatabase } = require("./database");
const { logger } = require("./utils/logger");

const bot = createBot();

async function startBot() {
  await connectDatabase();
  await bot.launch();
  logger.info("Bot started successfully in polling mode");
}

startBot().catch((error) => {
  logger.error("Failed to start bot:", error);
  process.exit(1);
});

function stopBot(signal) {
  bot.stop(signal);
}

process.once("SIGINT", () => stopBot("SIGINT"));
process.once("SIGTERM", () => stopBot("SIGTERM"));
