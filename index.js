const { Bot } = require('./dist/bot.js');
const botSettings = require('./bot-settings.json')

console.log(botSettings.WATCHTOGETHER_LINK);

let bot = new Bot(botSettings.BOT_LOGIN_TOKEN, botSettings.BOT_CMD_PREFIX, {WATCHTOGETHER_LINK: botSettings.WATCHTOGETHER_LINK});

bot.connect();