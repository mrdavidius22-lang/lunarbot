const dictionaries = {
  ru: {
    buttons: {
      today: "🌙 Сегодня",
      month: "✨ Календарь месяца",
      about: "🌸 О боте",
      language: "🌐 Язык",
      profile: "👤 Профиль",
      help: "💡 Помощь",
      russian: "🇷🇺 Русский",
      english: "🇬🇧 English",
      back: "⬅️ Назад"
    },
    start: (botName, firstName) => [
      `<b>Привет, ${firstName}!</b>`,
      "",
      `✨ <b>Я ${botName}</b>`,
      "Подскажу, когда стрижка будет особенно удачной по лунному календарю.",
      "",
      "<b>Что я умею:</b>",
      "• /today - красивый прогноз на сегодня",
      "• /month - весь календарь стрижек на месяц",
      "• кнопка <b>🌸 О боте</b> - расскажет, зачем нужен MoonFade",
      "• кнопка <b>🌐 Язык</b> - переключит язык бота",
      "• /help - подсказка по командам",
      "",
      "Нажми кнопку ниже и начнем ✂️"
    ].join("\n"),
    help: (botName) => [
      `💡 <b>${botName}</b> подсказывает удачные дни для стрижки по лунному календарю.`,
      "",
      "<b>Команды:</b>",
      "• <b>/start</b> - приветствие",
      "• <b>/today</b> - прогноз на сегодня",
      "• <b>/month</b> - полный календарь месяца",
      "• <b>/language</b> - выбор языка",
      "• <b>/help</b> - помощь",
      "• <b>/menu</b> - показать меню",
      "",
      "<b>Кнопки:</b>",
      "🌙 Сегодня - текущий день",
      "✨ Календарь месяца - все дни месяца",
      "🌸 О боте - зачем нужен MoonFade",
      "🌐 Язык - выбрать язык",
      "👤 Профиль - данные Telegram",
      "💡 Помощь - краткая инструкция"
    ].join("\n"),
    about: (botName) => [
      `🌸 <b>О боте ${botName}</b>`,
      "",
      `✨ <b>${botName}</b> создан для тех, кто любит ухаживать за собой красиво, мягко и с ощущением правильного момента.`,
      "",
      "Иногда хочется не просто записаться на стрижку, а выбрать день, который ощущается особенно удачным и легким:",
      "🌙 когда настроение спокойнее",
      "✨ когда хочется обновления",
      "💫 когда тянет к переменам",
      "🪞 когда хочется почувствовать себя еще красивее",
      "🌿 когда хочется попасть в более гармоничный ритм",
      "",
      "💎 <b>Чем полезен этот бот:</b>",
      "✂️ показывает, насколько день благоприятен для стрижки и окрашивания",
      "🌒 подсказывает лунный день, знак Зодиака и фазу Луны",
      "📅 помогает быстро посмотреть весь месяц и выбрать самый приятный момент",
      "🔮 добавляет ощущение ритуала, красоты и внимания к себе",
      "",
      "🌸 Это не просто сухой календарь, а маленький красивый помощник, который помогает выбирать с настроением, вниманием к себе и каплей магии."
    ].join("\n"),
    profile: {
      title: "👤 <b>Твой профиль</b>",
      id: "ID",
      name: "Имя",
      username: "Username",
      language: "Язык"
    },
    unknown: [
      "✨ <b>Я пока не понял это сообщение</b>",
      "",
      "Попробуй одну из команд:",
      "• <b>/today</b>",
      "• <b>/month</b>",
      "• <b>/help</b>",
      "• <b>/language</b>",
      "",
      "Или просто нажми кнопку на клавиатуре ниже."
    ].join("\n"),
    languagePrompt: "🌐 <b>Выбери язык бота</b>\n\nПосле выбора все кнопки и тексты переключатся на выбранный язык.",
    languageChanged: {
      ru: "🇷🇺 <b>Готово!</b>\nЯзык переключен на русский.",
      en: "🇬🇧 <b>Готово!</b>\nЯзык переключен на English."
    },
    calendar: {
      todayTitle: "🌙 <b>Прогноз на сегодня</b>",
      monthTitle: (month, year) => `✨ <b>Лунный календарь стрижек на ${month}.${year}</b>`,
      source: "🔗 <b>Источник:</b>",
      lunarDay: "🌒 <b>Лунный день:</b>",
      zodiac: "♎ <b>Луна в знаке:</b>",
      zodiacTime: "• <b>Время перехода:</b>",
      phase: "🌗 <b>Фаза Луны:</b>",
      haircutGood: "✅ <b>Стрижка:</b> можно смело стричься",
      haircutBad: "❌ <b>Стрижка:</b> лучше отложить",
      haircutNeutral: "☑️ <b>Стрижка:</b> день нейтральный",
      forecast: "✂️ <b>Прогноз:</b>",
      notFound: (day, month, year) => `Не удалось найти прогноз на ${day}.${month}.${year}.`,
      todayError: "Не удалось получить календарь стрижек с сайта прямо сейчас. Попробуй чуть позже.",
      monthError: "Не удалось получить календарь месяца с сайта прямо сейчас. Попробуй чуть позже."
    }
  },
  en: {
    buttons: {
      today: "🌙 Today",
      month: "✨ Monthly calendar",
      about: "🌸 About bot",
      language: "🌐 Language",
      profile: "👤 Profile",
      help: "💡 Help",
      russian: "🇷🇺 Русский",
      english: "🇬🇧 English",
      back: "⬅️ Back"
    },
    start: (botName, firstName) => [
      `<b>Hello, ${firstName}!</b>`,
      "",
      `✨ <b>I am ${botName}</b>`,
      "I can tell you when a haircut day looks especially good according to the lunar calendar.",
      "",
      "<b>What I can do:</b>",
      "• /today - today's forecast",
      "• /month - the full haircut calendar for the month",
      "• <b>🌸 About bot</b> - explains what MoonFade is for",
      "• <b>🌐 Language</b> - switches the bot language",
      "• /help - quick help",
      "",
      "Tap a button below and let's begin ✂️"
    ].join("\n"),
    help: (botName) => [
      `💡 <b>${botName}</b> shows lucky haircut days using the lunar calendar.`,
      "",
      "<b>Commands:</b>",
      "• <b>/start</b> - greeting",
      "• <b>/today</b> - forecast for today",
      "• <b>/month</b> - full monthly calendar",
      "• <b>/language</b> - choose language",
      "• <b>/help</b> - help",
      "• <b>/menu</b> - show menu",
      "",
      "<b>Buttons:</b>",
      "🌙 Today - current day forecast",
      "✨ Monthly calendar - all days of the month",
      "🌸 About bot - why MoonFade is useful",
      "🌐 Language - choose the interface language",
      "👤 Profile - your Telegram data",
      "💡 Help - quick guide"
    ].join("\n"),
    about: (botName) => [
      `🌸 <b>About ${botName}</b>`,
      "",
      `✨ <b>${botName}</b> is made for people who enjoy self-care with a sense of timing, beauty and a little ritual.`,
      "",
      "Sometimes you do not just want a haircut appointment. You want a day that feels right:",
      "🌙 when your mood feels calmer",
      "✨ when you want a refresh",
      "💫 when you are ready for a change",
      "🪞 when you want to feel even more beautiful",
      "🌿 when you want to move with a more harmonious rhythm",
      "",
      "💎 <b>Why this bot is useful:</b>",
      "✂️ it shows whether a day looks good or bad for a haircut and coloring",
      "🌒 it shows the lunar day, zodiac sign and moon phase",
      "📅 it helps you scan the whole month and choose the nicest moment",
      "🔮 it adds a sense of ritual, beauty and attention to yourself",
      "",
      "🌸 This is not just a dry calendar. It is a small beautiful helper that lets you choose with mood, intention and a little magic."
    ].join("\n"),
    profile: {
      title: "👤 <b>Your profile</b>",
      id: "ID",
      name: "Name",
      username: "Username",
      language: "Language"
    },
    unknown: [
      "✨ <b>I did not understand that message yet</b>",
      "",
      "Try one of these commands:",
      "• <b>/today</b>",
      "• <b>/month</b>",
      "• <b>/help</b>",
      "• <b>/language</b>",
      "",
      "Or just tap one of the buttons below."
    ].join("\n"),
    languagePrompt: "🌐 <b>Choose the bot language</b>\n\nAfter selection, all buttons and texts will switch to that language.",
    languageChanged: {
      ru: "🇷🇺 <b>Done!</b>\nThe language is now Russian.",
      en: "🇬🇧 <b>Done!</b>\nThe language is now English."
    },
    calendar: {
      todayTitle: "🌙 <b>Today's forecast</b>",
      monthTitle: (month, year) => `✨ <b>Lunar haircut calendar for ${month}.${year}</b>`,
      source: "🔗 <b>Source:</b>",
      lunarDay: "🌒 <b>Lunar day:</b>",
      zodiac: "♎ <b>Moon sign:</b>",
      zodiacTime: "• <b>Transition time:</b>",
      phase: "🌗 <b>Moon phase:</b>",
      haircutGood: "✅ <b>Haircut:</b> a good day to go for it",
      haircutBad: "❌ <b>Haircut:</b> better postpone it",
      haircutNeutral: "☑️ <b>Haircut:</b> the day is neutral",
      forecast: "✂️ <b>Forecast:</b>",
      notFound: (day, month, year) => `Could not find a forecast for ${day}.${month}.${year}.`,
      todayError: "Could not load the haircut calendar from the site right now. Please try again a bit later.",
      monthError: "Could not load the monthly calendar from the site right now. Please try again a bit later."
    }
  }
};

function normalizeLocale(locale) {
  return String(locale || "ru").toLowerCase().startsWith("en") ? "en" : "ru";
}

function getDictionary(locale) {
  return dictionaries[normalizeLocale(locale)];
}

module.exports = {
  getDictionary,
  normalizeLocale
};
