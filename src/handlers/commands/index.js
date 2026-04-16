const { handleStartCommand } = require("./start");
const { handleHelpCommand } = require("./help");
const { handleTodayHaircutCommand, handleMonthHaircutCommand } = require("./haircut");

function registerCommandHandlers(bot) {
  bot.start(handleStartCommand);
  bot.help(handleHelpCommand);
  bot.command("menu", handleStartCommand);
  bot.command("today", handleTodayHaircutCommand);
  bot.command("month", handleMonthHaircutCommand);
}

module.exports = {
  registerCommandHandlers
};
