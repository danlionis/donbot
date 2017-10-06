const { Bot } = require('./dist/index.js');
const botSettings = require('./bot-settings.json')

let bot = new Bot();



bot.initialize(botSettings)