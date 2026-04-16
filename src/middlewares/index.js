const { createLoggerMiddleware } = require("./logger.middleware");
const { attachServices } = require("./services.middleware");

function registerMiddlewares(bot) {
  bot.use(createLoggerMiddleware());
  bot.use(attachServices);
}

module.exports = {
  registerMiddlewares
};
