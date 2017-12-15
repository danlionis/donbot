import { Message } from "discord.js";
import { Bot } from "../";
import { TextCommand } from "../mixins";
import { ParsedMessage } from "../utils/parser";

export class Test extends TextCommand {

  constructor() {
    super({
      command: "test",
      aliases: [
        "testing",
      ],
      description: "Testnachricht senden",
      permissions: [
        // "ADMINISTRATOR"
      ],
      // minRole: "Mod"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    message.reply("Test Command");
  }
}
