import * as Discord from 'discord.js';
import { Bot } from '../../';
import { TextCommand } from '../../mixins';
import { ParsedMessage } from '../../types';


export class Help extends TextCommand {

  constructor() {
    super({
      command: "help",
      description: "sends this help message"
    });
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    let commands = bot.registry.getAllTextCommands();
    let embed = new Discord.RichEmbed();
    embed
      .setColor("#9c27b0");
    let text: string = "";
    for (var i = 0; i < commands.length; i++) {
      var command = commands[i];
      text += `${bot.settings.prefix}${command.is} - ${command.description}\n`;
    }
    embed.addField("Commands", text)
    message.author.send(embed);
  }

}

export default Help;
