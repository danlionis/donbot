import * as Discord from "discord.js";
import { Bot } from "./bot";
import { Command, CommandResult } from "./parser";
import { parse_message } from "./parser/parser";
import { has_permission } from "./validator/permission";

export async function handle_cmd(
  bot: Bot,
  content: string,
  msg: Discord.Message
) {
  const parsed = await parse_message(bot, content, msg);

  // console.log("on_message: parsed", parsed);

  if (parsed === undefined) {
    console.log("command not found");
    bot.reply_command_not_found(msg);
    return CommandResult.NotFound;
  }

  const [cmd, matches, error] = parsed;

  const [allowed, reason] = has_permission(bot, msg, cmd);

  if (matches.value_of("debug")) {
    const args = allowed ? matches.toObject(cmd) : {};
    msg.channel.send(
      JSON.stringify(
        { cmd: cmd.full_cmd_name, args: args, allowed: reason || allowed },
        null,
        2
      ),
      { code: "json" }
    );
    return CommandResult.Success;
  }

  if (!allowed) {
    bot.reply_permission_denied(msg);
    return CommandResult.PermissionDenied;
  }

  if (matches.value_of("help")) {
    msg.channel.send(cmd.help(), { code: true });
    return CommandResult.SendHelp;
  }

  console.log("on_message: error", error);

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
    error_text += `See '${cmd.full_cmd_name} --help'`;
    msg.channel.send(error_text, { code: true });
    return CommandResult.Error;
  }

  const res = await cmd.handler_fn(bot, msg, matches);

  if (res) {
    switch (res) {
      case CommandResult.PermissionDenied:
        bot.reply_permission_denied(msg);
        break;
      case CommandResult.SendHelp:
        bot.reply_send_help(msg, cmd);
        break;

      default:
        break;
    }
  }

  return res || CommandResult.Success;
}
