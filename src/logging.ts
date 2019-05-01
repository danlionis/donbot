import * as Discord from "discord.js";
import { Bot } from "./bot";
import { Command, CommandResult } from "./parser";

export function log_cmd_exec(
  guild: string,
  author: string,
  content: string,
  cmd_res: CommandResult
) {
  let res = `cmd: ${guild} - ${author}: ${content} - `;

  switch (cmd_res) {
    case CommandResult.Unimplemented:
      res += "unimplemented";
      break;
    case CommandResult.Error:
      res += "error";
      break;
    case CommandResult.Failed:
      res += "failed";
      break;
    case CommandResult.NotFound:
      res += "unknown";
      break;
    case CommandResult.PermissionDenied:
      res += "denied";
      break;
    default:
      res += "success";
      break;
  }

  res += console.log(res);
}
