const { handleTextMessage } = require("./text");

function registerMessageHandlers(bot) {
  bot.on("text", handleTextMessage);
}

module.exports = {
  registerMessageHandlers
};
