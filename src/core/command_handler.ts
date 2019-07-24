import * as Discord from "discord.js";
import { CommandContext, CommandResult } from "../parser";
import { parse_message } from "../parser/parser";
import { find_command } from "../utils/fuzzy_finder";
import { has_permission } from "../validator/permission";
import { Bot } from "./bot";
import { log_cmd_exec } from "./logging";

export async function handle_cmd(
  bot: Bot,
  content: string,
  msg: Discord.Message,
  context: CommandContext
): Promise<CommandResult> {
  if (context.callstack.length > bot.config.command_depth) {
    // if (recursion_depth > bot.config.command_depth) {
    msg.reply("Maximum command depth reached");
    return CommandResult.Error;
  }

  const parsed = await parse_message(bot, content, msg);
  const author = msg.author.tag;

  if (parsed === undefined) {
    const alternative = find_command(
      bot.registry.filter(async (c) => await has_permission(bot, msg, c)[0]),
      content[0]
    );

    bot.reply_command_not_found(content, msg, alternative);
    return CommandResult.NotFound;
  }

  const [cmd, matches, error] = parsed;

  const [allowed, reason] = await has_permission(bot, msg, cmd);

  context.callstack.push(cmd.full_cmd_name);

  let res: CommandResult;

  if (matches.value_of("debug")) {
    // if debug flag is set
    const args = allowed ? matches.toObject(cmd) : {};
    msg.channel.send(
      JSON.stringify(
        {
          author,
          cmd: cmd.full_cmd_name,
          args: args,
          allowed: reason || allowed,
          context: context
        },
        null,
        2
      ),
      { code: "json" }
    );

    res = CommandResult.Success;
  } else if (!allowed) {
    // if user has no permission for the command
    bot.reply_permission_denied(content, msg);

    res = CommandResult.PermissionDenied;

    // return CommandResult.PermissionDenied;
  } else if (matches.value_of("help")) {
    // if help flag is set
    // msg.channel.send(cmd.help(), { code: true });
    bot.reply_send_help(msg, cmd);

    res = CommandResult.SendHelp;
    // return CommandResult.SendHelp;
  } else if (error) {
    // if there was an error parsing
    let error_text = "";

    const required_missing = [];
    for (const req_arg of error.missing_args) {
      required_missing.push(req_arg);
    }
    if (required_missing.length > 0) {
      error_text += `Missing required argument${
        required_missing.length > 1 ? "s" : "" // plural "s"
      }: ${required_missing.join(", ")}\n`;
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

    res = CommandResult.Error;
    // return CommandResult.Error;
  } else {
    // parsing successful, execute command
    res =
      (await cmd.handler_fn.bind(cmd)(bot, msg, matches, context.clone())) ||
      CommandResult.Success;

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

  if (!cmd.config.no_log) {
    log_cmd_exec(
      bot,
      msg.guild.nameAcronym,
      author,
      await bot.resolveAlias(content),
      res,
      context
    );
  }

  return res;
}
