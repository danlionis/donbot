import * as Discord from "discord.js";
import { Bot } from "../bot";
import { Command } from "../parser";

export interface Perms {
  allowed: string[];
  denied: string[];
}

export function can_modify(
  bot: Bot,
  self: Discord.GuildMember,
  other: Discord.GuildMember,
  opts: { ignore_owner?: boolean; same_role?: boolean } = {}
) {
  const { ignore_owner = false, same_role = true } = opts;

  if (bot.is_owner(self.id)) {
    return true;
  }

  if (!ignore_owner && bot.is_owner(other.id)) {
    return false;
  }

  if (same_role) {
    return self.highestRole.position >= other.highestRole.position;
  }

  return self.highestRole.position > other.highestRole.position;
}

export function has_permission(
  bot: Bot,
  msg: Discord.Message,
  cmd: Command
): [boolean, string] {
  let allowed: boolean;
  let reason: string;

  if (bot.is_owner(msg.author.id)) {
    return [true, "owner"];
  }

  if (bot.is_denied(msg.member, cmd.full_cmd_name)) {
    return [false, "explicit_denied"];
  }

  if (bot.has_perm(msg.member, cmd.full_cmd_name)) {
    return [true, "explicit_allowed"];
  }

  if (cmd.config.owner_only) {
    return [false, "no_owner"];
  }

  // console.log("has permissions");
  allowed = msg.member.hasPermission(cmd.config
    .permissions as Discord.PermissionResolvable);
  if (allowed) {
    reason = "server_perms";
  }

  return [allowed, reason];
}
