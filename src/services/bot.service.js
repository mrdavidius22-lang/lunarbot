const { BOT_NAME } = require("../config/env");
const { getDictionary, normalizeLocale } = require("../locales");

const botService = {
  getHelpText(locale = "ru") {
    return getDictionary(locale).help(BOT_NAME);
  },

  getAboutText(locale = "ru") {
    return getDictionary(locale).about(BOT_NAME);
  },

  getUserProfile(user, locale = "ru") {
    const dictionary = getDictionary(locale).profile;
    const currentLocale = normalizeLocale(user?.preferredLocale || user?.languageCode || locale);

    return [
      dictionary.title,
      "",
      `• <b>${dictionary.id}:</b> ${user?.id || "-"}`,
      `• <b>${dictionary.name}:</b> ${user?.first_name || user?.firstName || "-"}`,
      `• <b>${dictionary.username}:</b> ${user?.username ? `@${user.username}` : "-"}`,
      `• <b>${dictionary.language}:</b> ${currentLocale === "en" ? "English" : "Русский"}`
    ].join("\n");
  },

  buildUnknownMessage(locale = "ru") {
    return getDictionary(locale).unknown;
  },

  getStartText(firstName, locale = "ru") {
    return getDictionary(locale).start(BOT_NAME, firstName);
  },

  getLanguagePrompt(locale = "ru") {
    return getDictionary(locale).languagePrompt;
  },

  getLanguageChangedText(viewLocale = "ru", selectedLocale = "ru") {
    return getDictionary(viewLocale).languageChanged[selectedLocale];
  }
};

module.exports = {
  botService
};
