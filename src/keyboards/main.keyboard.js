const { Markup } = require("telegraf");
const { getDictionary } = require("../locales");

function getMenuLabels(locale = "ru") {
  return getDictionary(locale).buttons;
}

function mainKeyboard(locale = "ru") {
  const buttons = getMenuLabels(locale);
  return Markup.keyboard(
    [
      [buttons.today, buttons.month],
      [buttons.about, buttons.language],
      [buttons.profile, buttons.help]
    ]
  ).resize();
}

function languageKeyboard(locale = "ru") {
  const buttons = getMenuLabels(locale);
  return Markup.keyboard([[buttons.russian, buttons.english], [buttons.back]]).resize();
}

function removeKeyboard() {
  return Markup.removeKeyboard();
}

function isMainMenuText(text, expectedLabel) {
  return text === expectedLabel;
}

module.exports = {
  getMenuLabels,
  mainKeyboard,
  languageKeyboard,
  removeKeyboard,
  isMainMenuText
};
