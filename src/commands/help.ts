import * as Discord from 'discord.js';
import { TextCommand } from '../types/command';
import { Registry } from '../registry';



export class Help extends TextCommand {

  constructor() {
    super();
  }

  static get is() {
    return "help";
  }

  static get command() {
    return "help"
  }

  static run(message: Discord.Message, parsedMessage: ParsedMessage) {
    let commands = Registry.getAllTextCommands();
    let embed = new Discord.RichEmbed();
    embed
      // .setTitle("Help")
      .setColor("#9c27b0");
    let text: string = "";
    for (var i = 0; i < commands.length; i++) {
      var command = commands[i];
      text += `${command.is} - ${command.description}\n`;
    }
    embed.addField("Commands", text)
    message.author.sendEmbed(embed);
    console.log(text);
  }

}

export default Help;
