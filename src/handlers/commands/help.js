const { removeKeyboard } = require("../../keyboards/main.keyboard");
const { userService } = require("../../services/user.service");
const { botService } = require("../../services/bot.service");

async function handleHelpCommand(ctx) {
  const locale = await userService.getLocale(ctx);

  await ctx.reply(
    botService.getHelpText(locale),
    {
      ...removeKeyboard(),
      parse_mode: "HTML"
    }
  );
}

module.exports = {
  handleHelpCommand
};
