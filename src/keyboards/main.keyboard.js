const { Markup } = require("telegraf");

const MENU_LABELS = {
  today: "🌙 Сегодня",
  month: "✨ Календарь месяца",
  about: "🌸 О боте",
  profile: "👤 Профиль",
  help: "💡 Помощь"
};

function mainKeyboard() {
  return Markup.keyboard(
    [
      [MENU_LABELS.today, MENU_LABELS.month],
      [MENU_LABELS.about],
      [MENU_LABELS.profile, MENU_LABELS.help]
    ]
  ).resize();
}

function removeKeyboard() {
  return Markup.removeKeyboard();
}

function isMainMenuText(text, expectedLabel) {
  return text === expectedLabel;
}

module.exports = {
  MENU_LABELS,
  mainKeyboard,
  removeKeyboard,
  isMainMenuText
};
