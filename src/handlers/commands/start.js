const { mainKeyboard } = require("../../keyboards/main.keyboard");
const { userService } = require("../../services/user.service");
const { BOT_NAME } = require("../../config/env");

async function handleStartCommand(ctx) {
  const firstName = ctx.from?.first_name || "друг";

  await userService.upsertUser(ctx.from);

  await ctx.reply(
    [
      `<b>Привет, ${firstName}!</b>`,
      "",
      `✨ <b>Я ${BOT_NAME}</b>`,
      "Подскажу, когда стрижка будет особенно удачной по лунному календарю.",
      "",
      "<b>Что я умею:</b>",
      "• /today - красивый прогноз на сегодня",
      "• /month - весь календарь стрижек на месяц",
      "• кнопка <b>🌸 О боте</b> - расскажет, зачем нужен MoonFade",
      "• /help - подсказка по командам",
      "• /menu - показать клавиатуру",
      "",
      "Нажми кнопку ниже и начнем ✂️"
    ].join("\n"),
    {
      ...mainKeyboard(),
      parse_mode: "HTML"
    }
  );
}

module.exports = {
  handleStartCommand
};
