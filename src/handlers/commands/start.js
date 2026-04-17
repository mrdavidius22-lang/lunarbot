const { mainKeyboard } = require("../../keyboards/main.keyboard");
const { userService } = require("../../services/user.service");
const { botService } = require("../../services/bot.service");

async function handleStartCommand(ctx) {
  const firstName = ctx.from?.first_name || "friend";

  await userService.upsertUser(ctx.from);
  const locale = await userService.getLocale(ctx);

  await ctx.reply(
    botService.getStartText(firstName, locale),
    {
      ...mainKeyboard(locale),
      parse_mode: "HTML"
    }
  );
}

module.exports = {
  handleStartCommand
};
