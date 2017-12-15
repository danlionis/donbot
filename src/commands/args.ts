import { Message } from "discord.js";
import { Bot } from "../index";
import { TextCommand } from "../mixins/text-command";
import { ParsedMessage } from "../utils/parser";

export class Arg extends TextCommand {

  constructor() {
    super({
      command: "arg",
      aliases: [
        "args",
      ],
      args: [
        { name: "zahl", pattern: /^\d*$/ },
        { name: "range", pattern: /\d-\d/, default: "0-10" },
      ],
      flags: [
        { name: "silent", short: "s", long: "silent" },
      ],
      help: "Test Command for Args",
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    console.log(parsedMessage.args.range);
    console.log(parsedMessage.flags);
  }
}
