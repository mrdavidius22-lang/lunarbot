const { userService } = require("../services/user.service");
const { botService } = require("../services/bot.service");

async function attachServices(ctx, next) {
  ctx.services = {
    userService,
    botService
  };

  await next();
}

module.exports = {
  attachServices
};
