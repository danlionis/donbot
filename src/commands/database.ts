import { Message } from "discord.js";
import { Bot } from "../";
import { TextCommand } from "../mixins";
import { selfDestructMessage } from "../utils/callbacks";
import { ParsedMessage } from "../utils/parser";

export class SetDb extends TextCommand {
  constructor() {
    super({
      command: "setdb",
      ownerOnly: true,
      description: "Set a key:value in the database",
      usage: "setdb <key> <value>",
      group: "database"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const key = parsedMessage.rawArgs[0];
    const data = parsedMessage.rawArgs.slice(1).join(" ");
    const content = await bot.database.set(key, data);
    message.reply(`Value with key ${key} set to ${content}`);
  }
}

export class GetDb extends TextCommand {
  constructor() {
    super({
      command: "getdb",
      ownerOnly: true,
      description: "get a value from the database",
      usage: "getdb <key>",
      args: [{ name: "key", pattern: /^\w+(\.\w+)*$/, default: "" }],
      flags: [
        {
          name: "guild",
          short: "g",
          long: "guild",
          description: "Add the guild id as a prefix to your key"
        }
      ],
      group: "database"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    let key = parsedMessage.args.key.value;

    if (parsedMessage.flags.guild) {
      if (key) {
        key = message.guild.id + "." + key;
      } else {
        key = message.guild.id;
      }
    }

    const result = bot.database.get(key, {defaultValue: ""});
    return message.channel
      .send(JSON.stringify(result, null, 2), { code: "json" })
      .then(selfDestructMessage);
  }
}

export class ClearDb extends TextCommand {
  constructor() {
    super({
      command: "cleardb",
      ownerOnly: true,
      description: "Delete all values from the database",
      group: "database"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    return bot.database.clear();
  }
}

export class ReloadDb extends TextCommand {
  constructor() {
    super({
      command: "reloaddb",
      ownerOnly: true,
      description: "Reload the database",
      group: "database"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    return bot.database.reload();
  }
}
