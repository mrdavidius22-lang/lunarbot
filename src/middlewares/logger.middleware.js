const { logger } = require("../utils/logger");

function createLoggerMiddleware() {
  return async (ctx, next) => {
    logger.info("Incoming update:", {
      updateType: ctx.updateType,
      fromId: ctx.from?.id,
      chatId: ctx.chat?.id
    });

    await next();
  };
}

module.exports = {
  createLoggerMiddleware
};
