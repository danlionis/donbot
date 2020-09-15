import * as Discord from "discord.js";
import { Command, CommandContext, CommandResult } from "../parser";
import { Bot } from "./bot";

export function log_cmd_exec(
  bot: Bot,
  guild: string,
  author: string,
  content: string,
  cmd_res: CommandResult,
  context: CommandContext
) {
  if (context.flags.no_log) {
    return;
  }

  if (
    context.callstack.length !== 1 &&
    cmd_res === CommandResult.ExceededDepth
  ) {
    return;
  }

  if (context.callstack.length === 1 || cmd_res !== CommandResult.Success) {
    const time = new Date();

    let res = `[+] cmd: ${time.toISOString()} ${guild} - ${author}: ${content} - `;

    res += CommandResult[cmd_res];

    bot.addLog({
      user: author,
      content: content,
      timestamp: time.getTime(),
      result: cmd_res,
    });

    console.log(res);
  }
}
