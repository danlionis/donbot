import * as Discord from "discord.js";
import { CommandContext, CommandResult } from "../parser";
import { parse_message } from "../parser/parser";
import Constants from "../utils/constants";
import { find_command } from "../utils/fuzzy_finder";
import { has_permission } from "../validator/permission";
import { Alias } from "./alias.handler";
import { Bot } from "./bot";
import { log_cmd_exec } from "./logging";

export async function handle_cmd(
  bot: Bot,
  content: string,
  msg: Discord.Message,
  context: CommandContext
): Promise<CommandResult> {
  if (context.callstack.length > bot.config.commandDepth) {
    msg.reply("error: Maximum command depth reached", { code: true });
    return CommandResult.ExceededDepth;
  }

  // check if the message starts with an alias and resolve the alias until a command is found
  let alias: Alias = await bot.aliases.resolve(content);
  const aliasStack = [];
  while (alias !== undefined) {
    // prevent circular alias resolving
    if (aliasStack.includes(alias.key)) {
      msg.reply(
        `Error: Detected circular alias reference: ${aliasStack.join(
          " -> "
        )} -> ${alias.key}`,
        {
          code: true,
        }
      );
      return CommandResult.ExceededDepth;
    }

    content = alias.expansion;
    context.flags.skip_permission = alias.flags.skip_permission;
    aliasStack.push(alias.key);
    alias = await bot.aliases.resolve(content);
  }

  content = bot.replaceVariables(content, { msg: msg });
  const parsed = await parse_message(bot, content, msg);
  const author = msg.author.tag;

  if (parsed === undefined) {
    const alternative = find_command(
      bot.registry.filter(
        async (c) => await has_permission(bot, msg, c, context)[0]
      ),
      content[0]
    );

    bot.reply_command_not_found(content, msg, alternative);
    return CommandResult.NotFound;
  }

  const [cmd, matches, error] = parsed;

  const [allowed, reason] = await has_permission(bot, msg, cmd, context);

  context.callstack.push(cmd.full_cmd_name);

  let res: CommandResult;

  if (matches.value_of(Constants.ArgNames.DEBUG)) {
    // if debug flag is set
    const args = allowed ? matches.toObject(cmd) : {};
    msg.channel.send(
      JSON.stringify(
        {
          author,
          cmd: cmd.full_cmd_name,
          args: args,
          allowed: reason || allowed,
          context: context,
        },
        null,
        2
      ),
      { code: "json" }
    );

    res = CommandResult.Success;
  } else if (!allowed) {
    // if user has no permission for the command
    bot.replyResult(cmd, msg, CommandResult.PermissionDenied, context);

    res = CommandResult.PermissionDenied;

    // return CommandResult.PermissionDenied;
  } else if (matches.value_of(Constants.ArgNames.HELP)) {
    // if help flag is set
    bot.replyResult(cmd, msg, CommandResult.SendHelp, context);

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

    if (!context.flags.silent) {
      msg.reply(error_text, { code: true });
    }

    res = CommandResult.Error;
  } else {
    // parsing successful, execute command
    res =
      (await cmd.handler_fn.bind(cmd)(bot, msg, matches, context.clone())) ||
      CommandResult.Success;

    bot.replyResult(cmd, msg, res, context);
  }

  if (!cmd.config.no_log) {
    log_cmd_exec(bot, msg.guild.nameAcronym, author, content, res, context);
  }

  return res;
}
