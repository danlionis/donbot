import { Message } from "discord.js";
import { Bot } from "../bot";
import { TextCommand } from "../mixins";
import { ParsedMessage } from "../utils/parser";

export class ChangePrefix extends TextCommand {

  constructor() {
    super({
      command: "prefix",
      description: "set a new prefix for all commands",
      help: "prefix [new prefix]",
      ownerOnly: true,
    });
  }

  public async run(bot: Bot, messsage: Message, parsedMessage: ParsedMessage) {
    bot.settings.prefix = parsedMessage.rawArgs[0];
    messsage.reply(`Changed command prefix to ${bot.settings.prefix}`);
  }
}

export class Playing extends TextCommand {

  constructor() {
    super({
      command: "game",
      description: "set the current game",
      help: "game [game]",
      ownerOnly: true,
      aliases: [
        "playing",
      ],
    });
  }

  public async run(bot: Bot, messsage: Message, parsedMessage: ParsedMessage) {
    bot.user.setGame(parsedMessage.rawArgs.join(" ")).catch((err) => console.log(err));
  }
}

export class Servers extends TextCommand {
  constructor() {
    super({
      command: "servers",
      ownerOnly: true,
    });
  }

  public async run(bot: Bot, messsage: Message, parsedMessage: ParsedMessage) {

    if (parsedMessage.rawArgs[0] === "leave") {
      const guild = bot.guilds.find("id", parsedMessage.rawArgs[1]);
      guild.leave();
      messsage.delete();
    } else {

      let text: string = "\n";

      bot.guilds.forEach((g) => {
        text += `${g.id} : ${g.name}\n`;
      });

      console.log(text);

      messsage.reply(text);
    }
  }
}
