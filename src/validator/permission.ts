import * as Discord from "discord.js";
import { Bot } from "../core/bot";
import { Command, CommandContext } from "../parser";

export function can_modify(
  bot: Bot,
  self: Discord.GuildMember,
  other: Discord.GuildMember,
  opts: { ignore_owner?: boolean; same_role?: boolean } = {}
) {
  const { ignore_owner = false, same_role = true } = opts;

  if (bot.isOwner(self.id)) {
    return true;
  }

  if (!ignore_owner && bot.isOwner(other.id)) {
    return false;
  }

  if (same_role) {
    return self.highestRole.position >= other.highestRole.position;
  }

  return self.highestRole.position > other.highestRole.position;
}

export async function has_permission(
  bot: Bot,
  msg: Discord.Message,
  cmd: Command,
  context: CommandContext
): Promise<[boolean, string]> {
  let allowed: boolean;
  let reason: string;

  // directly allow if user is the owner
  if (bot.isOwner(msg.author.id)) {
    return [true, "owner"];
  }

  // deny if user is disabled
  if (bot.perms.user_is_disabled(msg.member)) {
    return [false, "user_disabled"];
  }

  if (context.flags.skip_permission) {
    return [true, "skip_permission"];
  }

  // deny if command is disabled
  if (bot.perms.cmd_is_disabled(cmd)) {
    return [false, "cmd_disabled"];
  }

  // deny if command was explicitly denied for user
  if (await bot.perms.user_is_denied(msg.member, cmd.full_cmd_name)) {
    return [false, "explicit_denied"];
  }

  // allow if command was explicitly allowed for user
  if (await bot.perms.user_is_allowed(msg.member, cmd.full_cmd_name)) {
    return [true, "explicit_allowed"];
  }

  // deny if owner only (allowed if explicitly allowed)
  if (cmd.config.owner_only) {
    return [false, "no_owner"];
  }

  if (!bot.hasBotRole(msg.member)) {
    return [false, "missing_role"];
  }

  if (
    cmd.config.role &&
    msg.member.roles.map((r) => r.name).indexOf(cmd.config.role) < 0
  ) {
    return [false, "missing_command_role"];
  }

  allowed = msg.member.hasPermission(cmd.config
    .permissions as Discord.PermissionResolvable);
  if (allowed) {
    reason = "server_perms";
  }

  return [allowed, reason];
}
