const { logger } = require("../utils/logger");
const { getDictionary, normalizeLocale } = require("../locales");

const MONTH_SLUGS = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentyabr",
  "oktyabr",
  "noyabr",
  "dekabr"
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function translateDynamicText(value, locale) {
  if (normalizeLocale(locale) === "ru") {
    return value;
  }

  return String(value)
    .replace("января", "January")
    .replace("февраля", "February")
    .replace("марта", "March")
    .replace("апреля", "April")
    .replace("мая", "May")
    .replace("июня", "June")
    .replace("июля", "July")
    .replace("августа", "August")
    .replace("сентября", "September")
    .replace("октября", "October")
    .replace("ноября", "November")
    .replace("декабря", "December")
    .replace(", Пн", ", Mon")
    .replace(", Вт", ", Tue")
    .replace(", Ср", ", Wed")
    .replace(", Чт", ", Thu")
    .replace(", Пт", ", Fri")
    .replace(", Сб", ", Sat")
    .replace(", Вс", ", Sun")
    .replace("лунный день", "lunar day")
    .replace("Луна в ", "Moon in ")
    .replace("Луна во ", "Moon in ")
    .replace("Растущая Луна", "Waxing Moon")
    .replace("Убывающая Луна", "Waning Moon")
    .replace("Полнолуние", "Full Moon")
    .replace("Новолуние", "New Moon")
    .replace("Первая четверть", "First Quarter")
    .replace("Последняя четверть", "Last Quarter")
    .replace("Очень благоприятный день для стрижки и окрашивания волос", "A very favorable day for haircut and hair coloring")
    .replace("Благоприятный день для стрижки и окрашивания волос", "A favorable day for haircut and hair coloring")
    .replace("Неблагоприятный день для стрижки и окрашивания волос", "An unfavorable day for haircut and hair coloring");
}

function getMoscowDateParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const parts = formatter.formatToParts(date);
  const getPart = (type) => parts.find((item) => item.type === type)?.value;

  return {
    year: Number(getPart("year")),
    month: Number(getPart("month")),
    day: Number(getPart("day"))
  };
}

function buildMonthUrl(year, month) {
  const monthSlug = MONTH_SLUGS[month - 1];

  if (!monthSlug) {
    throw new Error(`Unsupported month index: ${month}`);
  }

  return `https://astrosfera.ru/lunnyj-kalendar-strizhek/lunnyj-kalendar-strizhek-na-${monthSlug}-${year}.html`;
}

function decodeHtml(html) {
  return html
    .replace(/&nbsp;/g, " ")
    .replace(/&ndash;/g, "-")
    .replace(/&mdash;/g, "-")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\r/g, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<[^>]+>/g, "\n");
}

function normalizeLines(text) {
  return text
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function isDateLine(line) {
  return /^\d{1,2} [а-яё]+ \d{4},/i.test(line);
}

function isStatusLine(line) {
  return /день для стрижки и окрашивания волос/i.test(line);
}

function isPhaseLine(line) {
  return /растущая луна|убывающая луна|полнолуние|новолуние|первая четверть|последняя четверть/i.test(line);
}

function isZodiacLine(line) {
  return /луна в|луна во/i.test(line);
}

function isTimeLine(line) {
  return /^\d{1,2}:\d{2}$/.test(line);
}

function extractEntries(text) {
  const lines = normalizeLines(text);
  const entries = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (!isDateLine(line)) {
      continue;
    }

    const details = [];
    let cursor = index + 1;

    while (cursor < lines.length && !isDateLine(lines[cursor])) {
      details.push(lines[cursor]);
      cursor += 1;
    }

    const lunarDay = details.find((item) => /лунный день/i.test(item)) || "Нет данных";
    const zodiacIndex = details.findIndex((item) => isZodiacLine(item));
    const zodiac = zodiacIndex >= 0 ? details[zodiacIndex] : "Нет данных";
    const zodiacTime =
      zodiacIndex >= 0 && isTimeLine(details[zodiacIndex + 1])
        ? details[zodiacIndex + 1]
        : "Нет данных";
    const phase = details.find((item) => isPhaseLine(item)) || "Нет данных";
    const recommendation =
      details.find((item) => isStatusLine(item)) || "Нет данных";

    entries.push({
      dateLabel: line,
      day: Number(line.split(" ")[0]),
      lunarDay,
      zodiac,
      zodiacTime,
      phase,
      recommendation
    });

    index = cursor - 1;
  }

  return entries;
}

async function loadMonthEntries(date = new Date()) {
  const { year, month, day } = getMoscowDateParts(date);
  const url = buildMonthUrl(year, month);

  logger.info("Loading haircut calendar:", url);

  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 MoonFadeBot/1.0"
    }
  });

  if (!response.ok) {
    throw new Error(`Astrosfera returned status ${response.status}`);
  }

  const html = await response.text();
  const text = decodeHtml(html);
  const entries = extractEntries(text);

  if (!entries.length) {
    throw new Error("Could not parse haircut calendar page");
  }

  return {
    year,
    month,
    day,
    url,
    entries
  };
}

function formatEntry(entry, locale = "ru") {
  const calendar = getDictionary(locale).calendar;
  const recommendationText = escapeHtml(translateDynamicText(entry.recommendation, locale));
  const timeLine = entry.zodiacTime !== "Нет данных"
    ? `${calendar.zodiacTime} ${escapeHtml(entry.zodiacTime)}`
    : null;
  const haircutLine = /неблагоприятный/i.test(entry.recommendation)
    ? `${calendar.haircutBad}\n${calendar.forecast} ${recommendationText}`
    : /очень благоприятный|благоприятный/i.test(entry.recommendation)
      ? `${calendar.haircutGood}\n${calendar.forecast} ${recommendationText}`
      : `${calendar.haircutNeutral}\n${calendar.forecast} ${recommendationText}`;

  return [
    `📅 <b>${escapeHtml(translateDynamicText(entry.dateLabel, locale))}</b>`,
    "",
    `${calendar.lunarDay} ${escapeHtml(translateDynamicText(entry.lunarDay, locale))}`,
    `${calendar.zodiac} ${escapeHtml(translateDynamicText(entry.zodiac, locale))}`,
    timeLine,
    `${calendar.phase} ${escapeHtml(translateDynamicText(entry.phase, locale))}`,
    haircutLine
  ]
    .filter(Boolean)
    .join("\n");
}

function splitMonthEntriesIntoMessages(entries, title, url, locale = "ru") {
  const calendar = getDictionary(locale).calendar;
  const maxLength = 3500;
  const messages = [];
  let currentMessage = `${title}\n\n`;

  for (const entry of entries) {
    const block = `${formatEntry(entry, locale)}\n\n`;

    if ((currentMessage + block + `\n${calendar.source} ${url}`).length > maxLength) {
      messages.push(currentMessage.trim());
      currentMessage = `${title}\n\n${block}`;
      continue;
    }

    currentMessage += block;
  }

  currentMessage += `${calendar.source} ${url}`;
  messages.push(currentMessage.trim());

  return messages;
}

const haircutCalendarService = {
  async getTodaySummary(locale = "ru") {
    const calendar = getDictionary(locale).calendar;
    try {
      const { day, month, year, entries, url } = await loadMonthEntries();
      const todayEntry = entries.find((entry) => entry.day === day);

      if (!todayEntry) {
        return calendar.notFound(day, month, year);
      }

      return [
        calendar.todayTitle,
        formatEntry(todayEntry, locale),
        "",
        `${calendar.source} ${url}`
      ].join("\n");
    } catch (error) {
      logger.error("Failed to load today haircut summary:", error);
      return calendar.todayError;
    }
  },

  async getMonthSummary(locale = "ru") {
    const calendar = getDictionary(locale).calendar;
    try {
      const { month, year, entries, url } = await loadMonthEntries();
      return splitMonthEntriesIntoMessages(
        entries,
        calendar.monthTitle(String(month).padStart(2, "0"), year),
        url,
        locale
      );
    } catch (error) {
      logger.error("Failed to load month haircut summary:", error);
      return [calendar.monthError];
    }
  }
};

module.exports = {
  haircutCalendarService
};
