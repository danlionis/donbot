import * as Discord from "discord.js";
import { Command, CommandResult } from "../parser";
import { Bot } from "./bot";

export function log_cmd_exec(
  bot: Bot,
  guild: string,
  author: string,
  content: string,
  cmd_res: CommandResult,
  recursion_depth: number = 0
) {
  if (recursion_depth <= 0 || cmd_res !== CommandResult.Success) {
    const time = new Date();

    let res = `[CMD] ${time.toISOString()} ${guild} - ${"- ".repeat(
      recursion_depth
    )}${author}: ${content} - `;

    res += CommandResult[cmd_res];

    bot.addLog({
      user: author,
      content: content,
      timestamp: time.getTime(),
      result: cmd_res
    });

    console.log(res);
  }
}
