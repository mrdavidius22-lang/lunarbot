const { removeKeyboard } = require("../../keyboards/main.keyboard");
const { BOT_NAME } = require("../../config/env");

async function handleHelpCommand(ctx) {
  await ctx.reply(
    [
      `💡 <b>${BOT_NAME} умеет:</b>`,
      "",
      "• <b>/start</b> - приветствие",
      "• <b>/today</b> - прогноз на сегодня",
      "• <b>/month</b> - полный календарь месяца",
      "• <b>/help</b> - эта справка",
      "• <b>/menu</b> - вернуть клавиатуру",
      "",
      "<b>Кнопки меню:</b>",
      "🌙 Сегодня - быстрый прогноз на день",
      "✨ Календарь месяца - все дни месяца",
      "🌸 О боте - красивое описание идеи бота",
      "👤 Профиль - твои данные Telegram",
      "💡 Помощь - подсказка по функциям"
    ].join("\n"),
    {
      ...removeKeyboard(),
      parse_mode: "HTML"
    }
  );
}

module.exports = {
  handleHelpCommand
};
