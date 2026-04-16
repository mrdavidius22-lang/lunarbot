const {
  isMainMenuText,
  mainKeyboard
} = require("../../keyboards/main.keyboard");
const { botService } = require("../../services/bot.service");
const {
  haircutCalendarService
} = require("../../services/haircut-calendar.service");
const { MENU_LABELS } = require("../../keyboards/main.keyboard");

async function replyWithMessages(ctx, messages) {
  for (const [index, message] of messages.entries()) {
    await ctx.reply(
      message,
      index === messages.length - 1
        ? { ...mainKeyboard(), parse_mode: "HTML" }
        : { parse_mode: "HTML" }
    );
  }
}

async function handleTextMessage(ctx) {
  const userText = ctx.message.text.trim();

  if (isMainMenuText(userText, MENU_LABELS.help)) {
    await ctx.reply(botService.getHelpText(), { ...mainKeyboard(), parse_mode: "HTML" });
    return;
  }

  if (isMainMenuText(userText, MENU_LABELS.profile)) {
    const profile = botService.getUserProfile(ctx.from);
    await ctx.reply(profile, { ...mainKeyboard(), parse_mode: "HTML" });
    return;
  }

  if (isMainMenuText(userText, MENU_LABELS.about)) {
    await ctx.reply(botService.getAboutText(), { ...mainKeyboard(), parse_mode: "HTML" });
    return;
  }

  if (isMainMenuText(userText, MENU_LABELS.today)) {
    const result = await haircutCalendarService.getTodaySummary();
    await ctx.reply(result, { ...mainKeyboard(), parse_mode: "HTML" });
    return;
  }

  if (isMainMenuText(userText, MENU_LABELS.month)) {
    const messages = await haircutCalendarService.getMonthSummary();
    await replyWithMessages(ctx, messages);
    return;
  }

  await ctx.reply(botService.buildUnknownMessage(), { ...mainKeyboard(), parse_mode: "HTML" });
}

module.exports = {
  handleTextMessage
};
