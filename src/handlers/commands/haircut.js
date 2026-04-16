const {
  haircutCalendarService
} = require("../../services/haircut-calendar.service");
const { mainKeyboard } = require("../../keyboards/main.keyboard");

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

async function handleTodayHaircutCommand(ctx) {
  const result = await haircutCalendarService.getTodaySummary();
  await ctx.reply(result, { ...mainKeyboard(), parse_mode: "HTML" });
}

async function handleMonthHaircutCommand(ctx) {
  const messages = await haircutCalendarService.getMonthSummary();
  await replyWithMessages(ctx, messages);
}

module.exports = {
  handleTodayHaircutCommand,
  handleMonthHaircutCommand
};
