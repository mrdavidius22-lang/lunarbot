const { handleStartCommand } = require("./start");
const { handleHelpCommand } = require("./help");
const { handleTodayHaircutCommand, handleMonthHaircutCommand } = require("./haircut");
const {
  handleLanguageCommand,
  handleSetRussianCommand,
  handleSetEnglishCommand
} = require("./language");

function registerCommandHandlers(bot) {
  bot.start(handleStartCommand);
  bot.help(handleHelpCommand);
  bot.command("menu", handleStartCommand);
  bot.command("today", handleTodayHaircutCommand);
  bot.command("month", handleMonthHaircutCommand);
  bot.command("language", handleLanguageCommand);
  bot.command("lang", handleLanguageCommand);
  bot.command("ru", handleSetRussianCommand);
  bot.command("en", handleSetEnglishCommand);
}

module.exports = {
  registerCommandHandlers
};
