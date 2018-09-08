const { RichEmbed } = require("discord.js");

require("dotenv").config();

const { Bot, TextCommand } = require("./lib");

let client = new Bot({
  token: process.env.BOT_TOKEN, // login token for the bot
  prefix: ".", // perfix for all text commands
  notifyUnknownCommand: true,                                            // notify user when the command he typed is unknown
  buildInCommands: true,                                                 // load built in commnds
  builtInMusicCommands: true,
  owner: "",
  dataPath: "./data/db.json"
});

client.login();
