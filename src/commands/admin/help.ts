import * as Discord from 'discord.js';
import { Bot } from '../../';
import { TextCommand } from '../../mixins';
import { ParsedMessage } from '../../types';


export class Help extends TextCommand {

  constructor() {
    super({
      command: "help",
      aliases: [
        "h"
      ],
      description: "send a help message"
    });
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    let embed = new Discord.RichEmbed();

    if (parsedMessage.args) {
      let arg = parsedMessage.args[1];
      let command = bot.registry.getTextCommand(parsedMessage.args[0])
      if (arg === "-c") {
        console.log(command);
      } else if (!command) {
        this.sendHelp(bot, message)
      } else {
        this.sendHelpForCommand(bot, message, command);
      }
    } else {
      this.sendHelp(bot, message)
    }
  }

  sendHelp(bot: Bot, message: Discord.Message) {
    let embed = new Discord.RichEmbed();

    let commands;

    if (message.author.id === bot.settings.owner) {
      commands = bot.registry.textCommands;
    } else {
      commands = bot.registry.textCommands.filter(c => c.onwerOnly === false);
    }

    embed.setColor("#FAFAFA").setTitle("Commands")

    let text: string = "";
    for (var i = 0; i < commands.length; i++) {
      var command = commands[i];
      // embed.addField(`${bot.settings.prefix}${command.is}`, `${command.description}`, false);
      // embed.addField(`[${bot.settings.prefix}${command.is}](https://github.com/danlionis/donbot)`, `${command.description}`, true);
      text += `\`${bot.settings.prefix}${command.is}\` - ${command.description}\n\n`;
    }
    embed.setDescription(text);
    message.author.send(embed);
  }

  sendHelpForCommand(bot: Bot, message: Discord.Message, command: TextCommand) {
    let embed = new Discord.RichEmbed();
    let aliases = command.aliases.map(a => bot.settings.prefix + a);

    embed
      .setTitle(command.is);

    if (command.description) {
      embed.setDescription(command.description);
    }

    if (command.help) {
      embed.addField("Info", command.help)
    }

    if (aliases.length > 1) {
      embed.addField("Aliases", aliases.join(` `), true)
    }

    let color = '#' + Math.floor(Math.random() * 16777215).toString(16);

    embed.setColor(color);

    message.author.send(embed);
  }

}

export default Help;
