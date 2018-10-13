import * as Discord from "discord.js";
import { Bot } from "../";
import { TextCommand } from "../mixins";
import { ParsedMessage } from "../utils/parser";
import { millisToTime } from "../utils/converter";

export class Help extends TextCommand {
  constructor() {
    super({
      command: "help",
      usage: "help <command?>",
      aliases: ["h"],
      description: "Send this Help Message",
      flags: [{ name: "log", short: "c", long: "command-log" }],
      args: [{ name: "command", pattern: /\w+/ }]
    });
  }

  public async run(
    bot: Bot,
    message: Discord.Message,
    parsedMessage: ParsedMessage
  ) {
    const embed = new Discord.RichEmbed();

    if (parsedMessage.args.command.exists) {
      const command = bot.registry.getTextCommand(
        parsedMessage.args.command.value
      );
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

    embed
      .setColor("#FAFAFA")
      .setTitle(`Commands for Server: ${message.guild.name}`);

    let text: string = "";

    for (const command of commands) {
      text += `\`${bot.settings.getGuildPrefix(message.guild.id)}${
        command.is
      }\` - ${command.description}\n\n`;
    }
    embed.setDescription(text);
    message.author.send(embed);
  }

  /**
   * send detailed help for a single command
   */
  private sendHelpForCommand(
    bot: Bot,
    message: Discord.Message,
    command: TextCommand
  ) {
    const embed = new Discord.RichEmbed();
    const aliases = command.aliases.map((a) => bot.settings.prefix + a);

    embed.setTitle(command.is);

    if (command.description) {
      embed.setDescription(command.description);
    }

    if (command.usage) {
      embed.addField("Usage", command.usage);
    }

    if (aliases.length > 1) {
      embed.addField("Aliases", aliases.join(` `), true);
    }

    if (command.flags.length > 0) {
      const flags = command.flags;
      let text = "";
      flags.forEach((f) => {
        text += `\`-${f.short}\`, \`--${f.long}\` \t\t\t\t ${f.description}\n`;
      });
      embed.addField("Flags", text);
    }

    console.log(command.color);
    embed.setColor(command.color);
    message.author.send(embed);
  }
}

export class Status extends TextCommand {
  constructor() {
    super({
      command: "status"
    });
  }

  public async run(
    bot: Bot,
    message: Discord.Message,
    parsedMessage: ParsedMessage
  ) {
    const embed = new Discord.RichEmbed()
      .setTitle("Bot Status")
      .setColor("#FF0000")
      .addField("Uptime", millisToTime(bot.uptime))
      .addField(
        "UserStats",
        `${bot.users.array().length} users on ${
          bot.guilds.array().length
        } servers`
      )
      .addField("Ping", Math.floor(bot.ping));
    message.channel.send(embed);
  }
}

export default Help;
