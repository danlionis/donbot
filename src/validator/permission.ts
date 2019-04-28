import * as Discord from "discord.js";
import { Bot } from "../bot";
import { Command } from "../parser";

export function has_permission(
  bot: Bot,
  msg: Discord.Message,
  cmd: Command
): [boolean, string] {
  let allowed: boolean;
  let reason: string;
  // TODO: bot owner, perm set (explicitly allow a command)

  // if (!msg.member.hasPermission(cmd.config.permission, false, false, false)) {
  //   console.log("permission denied");
  //   return;
  // }

  if (bot.is_owner(msg.author.id)) {
    return [true, "owner"];
  }

  if (cmd.config.owner_only) {
    return [false, undefined];
  }

  // console.log("has permissions");
  allowed = msg.member.hasPermission(
    cmd.config.permissions as Discord.PermissionResolvable,
    false,
    false,
    false
  );
  if (allowed) {
    reason = "server_perms";
  }

  return [allowed, reason];
}
