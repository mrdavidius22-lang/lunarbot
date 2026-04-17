const { languageKeyboard, mainKeyboard } = require("../../keyboards/main.keyboard");
const { botService } = require("../../services/bot.service");
const { userService } = require("../../services/user.service");

async function handleLanguageCommand(ctx) {
  const locale = await userService.getLocale(ctx);

  await ctx.reply(botService.getLanguagePrompt(locale), {
    ...languageKeyboard(locale),
    parse_mode: "HTML"
  });
}

async function handleSetRussianCommand(ctx) {
  await userService.setLocale(ctx, "ru");

  await ctx.reply(botService.getLanguageChangedText("ru", "ru"), {
    ...mainKeyboard("ru"),
    parse_mode: "HTML"
  });
}

async function handleSetEnglishCommand(ctx) {
  await userService.setLocale(ctx, "en");

  await ctx.reply(botService.getLanguageChangedText("en", "en"), {
    ...mainKeyboard("en"),
    parse_mode: "HTML"
  });
}

module.exports = {
  handleLanguageCommand,
  handleSetRussianCommand,
  handleSetEnglishCommand
};
