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

  bot.catch(async (error, ctx) => {
    logger.error("Bot error:", error);

    if (ctx?.reply) {
      try {
        await ctx.reply("Произошла ошибка. Попробуй еще раз чуть позже.");
      } catch (replyError) {
        logger.error("Failed to send fallback error message:", replyError);
      }
    }
  });

  return bot;
}

module.exports = {
  createBot
};
