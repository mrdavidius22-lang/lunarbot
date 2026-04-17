const {
  haircutCalendarService
} = require("../../services/haircut-calendar.service");
const { mainKeyboard } = require("../../keyboards/main.keyboard");
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

async function handleTodayHaircutCommand(ctx) {
  const locale = await userService.getLocale(ctx);
  const result = await haircutCalendarService.getTodaySummary(locale);
  await ctx.reply(result, { ...mainKeyboard(locale), parse_mode: "HTML" });
}

async function handleMonthHaircutCommand(ctx) {
  const locale = await userService.getLocale(ctx);
  const messages = await haircutCalendarService.getMonthSummary(locale);
  await replyWithMessages(ctx, messages, locale);
}

module.exports = {
  handleTodayHaircutCommand,
  handleMonthHaircutCommand
};
