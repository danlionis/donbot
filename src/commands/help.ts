import * as Discord from "discord.js";
import { Bot } from "../";
import { TextCommand } from "../mixins";
import { ParsedMessage } from "../utils/parser";

export class Help extends TextCommand {

  constructor() {
    super({
      command: "help",
      aliases: [
        "h",
      ],
      description: "send a help message",
      flags: [
        { name: "log", short: "c", long: "command-log" },
      ],
      args: [
        { name: "command", pattern: /\w+/ },
      ],
    });
  }

  public async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    const embed = new Discord.RichEmbed();

    if (parsedMessage.args.command.exists) {
      const command = bot.registry.getTextCommand(parsedMessage.args.command.value);
      if (parsedMessage.flags.log) {
        console.log(command);
      }
      this.sendHelpForCommand(bot, message, command);
    } else {
      this.sendHelp(bot, message);
    }
  }

  private sendHelp(bot: Bot, message: Discord.Message) {
    const embed = new Discord.RichEmbed();

    let commands: TextCommand[];

    if (message.author.id === bot.settings.owner) {
      commands = bot.registry.textCommands;
    } else {
      commands = bot.registry.textCommands.filter((c) => c.onwerOnly === false);
    }

    embed.setColor("#FAFAFA").setTitle("Commands");

    let text: string = "";

    for (const command of commands) {
      text += `\`${bot.settings.prefix}${command.is}\` - ${command.description}\n\n`;
    }
    embed.setDescription(text);
    message.author.send(embed);
  }

  private sendHelpForCommand(bot: Bot, message: Discord.Message, command: TextCommand) {
    const embed = new Discord.RichEmbed();
    const aliases = command.aliases.map((a) => bot.settings.prefix + a);

    embed
      .setTitle(command.is);

    if (command.description) {
      embed.setDescription(command.description);
    }

    if (command.help) {
      embed.addField("Info", command.help);
    }

    if (aliases.length > 1) {
      embed.addField("Aliases", aliases.join(` `), true);
    }

    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    embed.setColor(color);
    message.author.send(embed);
  }

}

export default Help;
