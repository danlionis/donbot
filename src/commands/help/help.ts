import * as Discord from 'discord.js';
import { TextCommand } from '../../mixins';
import { Bot, BotSettings } from '../../';
import { ParsedMessage } from '../../types';


export class Help extends TextCommand {

  constructor() {
    super();
  }

  static get is() {
    return "help";
  }

  static get description() {
    return "sends this help message"
  }


  static run(message: Discord.Message, parsedMessage: ParsedMessage, bot: Bot) {
    let commands;
    commands = bot.registry.getAllTextCommands();
    let embed = new Discord.RichEmbed();
    embed
      .setColor("#9c27b0");
    let text: string = "";
    for (var i = 0; i < commands.length; i++) {
      var command = commands[i];
      text += `${BotSettings.BOT_CMD_PREFIX}${command.is} - ${command.description}\n`;
    }
    embed.addField("Commands", text)
    message.author.send(embed);
  }

}

export default Help;
