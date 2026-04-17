const {
  isMainMenuText,
  mainKeyboard,
  languageKeyboard,
  getMenuLabels
} = require("../../keyboards/main.keyboard");
const { botService } = require("../../services/bot.service");
const {
  haircutCalendarService
} = require("../../services/haircut-calendar.service");
const { userService } = require("../../services/user.service");

async function replyWithMessages(ctx, messages, locale) {
  for (const [index, message] of messages.entries()) {
    await ctx.reply(
      message,
      index === messages.length - 1
        ? { ...mainKeyboard(locale), parse_mode: "HTML" }
        : { parse_mode: "HTML" }
    );
  }
}

async function handleTextMessage(ctx) {
  const userText = ctx.message.text.trim();
  const locale = await userService.getLocale(ctx);
  const labels = getMenuLabels(locale);

  if (isMainMenuText(userText, labels.help)) {
    await ctx.reply(botService.getHelpText(locale), { ...mainKeyboard(locale), parse_mode: "HTML" });
    return;
  }

  if (isMainMenuText(userText, labels.profile)) {
    const savedUser = await userService.getUserById(ctx.from?.id);
    const profile = botService.getUserProfile({ ...ctx.from, ...savedUser }, locale);
    await ctx.reply(profile, { ...mainKeyboard(locale), parse_mode: "HTML" });
    return;
  }

  if (isMainMenuText(userText, labels.about)) {
    await ctx.reply(botService.getAboutText(locale), { ...mainKeyboard(locale), parse_mode: "HTML" });
    return;
  }

  if (isMainMenuText(userText, labels.language)) {
    await ctx.reply(botService.getLanguagePrompt(locale), { ...languageKeyboard(locale), parse_mode: "HTML" });
    return;
  }

  if (isMainMenuText(userText, labels.russian)) {
    await userService.setLocale(ctx, "ru");
    await ctx.reply(botService.getLanguageChangedText("ru", "ru"), { ...mainKeyboard("ru"), parse_mode: "HTML" });
    return;
  }

  if (isMainMenuText(userText, labels.english)) {
    await userService.setLocale(ctx, "en");
    await ctx.reply(botService.getLanguageChangedText("en", "en"), { ...mainKeyboard("en"), parse_mode: "HTML" });
    return;
  }

  if (isMainMenuText(userText, labels.back)) {
    await ctx.reply(botService.getHelpText(locale), { ...mainKeyboard(locale), parse_mode: "HTML" });
    return;
  }

  if (isMainMenuText(userText, labels.today)) {
    const result = await haircutCalendarService.getTodaySummary(locale);
    await ctx.reply(result, { ...mainKeyboard(locale), parse_mode: "HTML" });
    return;
  }

  if (isMainMenuText(userText, labels.month)) {
    const messages = await haircutCalendarService.getMonthSummary(locale);
    await replyWithMessages(ctx, messages, locale);
    return;
  }

  await ctx.reply(botService.buildUnknownMessage(locale), { ...mainKeyboard(locale), parse_mode: "HTML" });
}

module.exports = {
  handleTextMessage
};
