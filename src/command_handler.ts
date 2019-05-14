import * as Discord from "discord.js";
import { Bot } from "./bot";
import { log_cmd_exec } from "./logging";
import { Command, CommandResult } from "./parser";
import { parse_message } from "./parser/parser";
import { find_command } from "./utils/fuzzy_finder";
import { has_permission } from "./validator/permission";

export async function handle_cmd(
  bot: Bot,
  content: string,
  msg: Discord.Message,
  recursion_depth: number = 0
): Promise<CommandResult> {
  if (recursion_depth > 10) {
    return CommandResult.Error;
  }

  const parsed = await parse_message(bot, content, msg);
  const author = msg.author.tag;

  if (parsed === undefined) {
    const alternative = find_command(
      bot.registry.filter((c) => has_permission(bot, msg, c)[0]),
      content[0]
    );

    bot.reply_command_not_found(content, msg, alternative);
    return CommandResult.NotFound;
  }

  const [cmd, matches, error] = parsed;

  const [allowed, reason] = has_permission(bot, msg, cmd);

  if (matches.value_of("debug")) {
    const args = allowed ? matches.toObject(cmd) : {};
    msg.channel.send(
      JSON.stringify(
        {
          author,
          cmd: cmd.full_cmd_name,
          args: args,
          allowed: reason || allowed
        },
        null,
        2
      ),
      { code: "json" }
    );
    return CommandResult.Success;
  }

  if (!allowed) {
    bot.reply_permission_denied(content, msg);
    return CommandResult.PermissionDenied;
  }

  if (matches.value_of("help")) {
    // msg.channel.send(cmd.help(), { code: true });
    bot.reply_send_help(msg, cmd);
    return CommandResult.SendHelp;
  }

  if (error) {
    let error_text = "";
    for (const req_arg of error.missing_args) {
      error_text += `Missing required argument: ${req_arg}\n`;
    }
    for (const wrong_arg of error.wrong_args) {
      error_text += `Wrong value for: ${wrong_arg} (${cmd.args
        .find((a) => a.config.name === wrong_arg)
        .config.possible_values.join(", ")})\n`;
    }
    for (const wrong_type of error.wrong_type) {
      error_text += `Wrong type for: ${wrong_type} (${
        cmd.args.find((a) => a.config.name === wrong_type).config.type
      })\n`;
    }
    error_text += `See '${cmd.full_cmd_name} --help'`;
    msg.channel.send(error_text, { code: true });
    return CommandResult.Error;
  }

  const res =
    (await cmd.handler_fn.bind(cmd)(
      bot,
      msg,
      matches,
      cmd.context,
      recursion_depth
    )) || CommandResult.Success;

  if (res) {
    switch (res) {
      case CommandResult.PermissionDenied:
        bot.reply_permission_denied(content, msg);
        break;
      case CommandResult.SendHelp:
      case CommandResult.Unimplemented:
        bot.reply_send_help(msg, cmd);
        break;

      default:
        break;
    }
  }

  log_cmd_exec(
    bot,
    msg.guild.nameAcronym,
    author,
    bot.resolve_alias(content),
    res,
    recursion_depth
  );

  return res;
}
