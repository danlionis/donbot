import { Message } from "discord.js";
import { Bot } from "../";
import { TextCommand } from "../mixins";
import { ParsedMessage } from "../utils/parser";

export class Test extends TextCommand {
  constructor() {
    super({
      command: "test",
      aliases: ["testing"],
      description: "Testnachricht senden",
      ownerOnly: true
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    bot.logger.logToChannel(message.guild, "test");

    const commands = [];
    bot.registry.textCommands.map((c) => {
      if (!commands[c.group]) commands[c.group] = [];
      commands[c.group].push(c.is);
    });
    console.log(commands);

    return message.reply("Pong");
  }
}

export class Ping extends TextCommand {
  constructor() {
    super({
      command: "ping",
      description: "Get bots ping to the server"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    return message.channel.send(`My ping is: ${Math.floor(bot.ping)}`);
  }
}
