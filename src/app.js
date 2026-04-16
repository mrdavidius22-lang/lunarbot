const { Telegraf, session } = require("telegraf");
const { BOT_TOKEN } = require("./config/env");
const { registerMiddlewares } = require("./middlewares");
const { registerCommandHandlers } = require("./handlers/commands");
const { registerMessageHandlers } = require("./handlers/messages");
const { logger } = require("./utils/logger");

function createBot() {
  const bot = new Telegraf(BOT_TOKEN);

  bot.use(session());
  registerMiddlewares(bot);
  registerCommandHandlers(bot);
  registerMessageHandlers(bot);

  bot.catch((error, ctx) => {
    logger.error("Bot error:", error);

    if (ctx?.reply) {
      return ctx.reply("Something went wrong. Please try again later.");
    }
  });

  return bot;
}

module.exports = {
  createBot
};
