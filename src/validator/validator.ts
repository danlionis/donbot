import { Bot } from "../core/bot";
import { Arg, Command } from "../parser";

export interface CommandValidator {
  cmd: string;
  errors: CommandError[];
  arg_erros: ArgValidator[];
  subcmd_errors: CommandValidator[];
}

export enum CommandError {
  NameTaken,
}

export interface ArgValidator {
  arg: string;
  errors: ArgError[];
}

export enum ArgError {
  PositionalAndFlag,
  MissingLong,
  AlreadyRegistered,
}

export function command_valid(bot: Bot, cmd: Command): boolean {
  let valid = true;
  if (
    bot.registry.map((c) => c.full_cmd_name).indexOf(cmd.full_cmd_name) >= 0
  ) {
    console.log(`[ERROR] ${cmd.full_cmd_name}: Command already registered`);
    valid = false;
  }

  bot.registry.forEach((c) => {
    const aliases = c.config.aliases;
    if (aliases.indexOf(cmd.full_cmd_name) >= 0) {
      console.log(
        `[ERROR] ${cmd.full_cmd_name}: Already registered as alias for '${c.full_cmd_name}'`
      );
      valid = false;
    }
  });

  if (!cmd.config.about) {
    console.log(`[-] ${cmd.full_cmd_name}: no command description`);
  }

  cmd.args.forEach((a) => {
    if (!arg_valid(cmd, a)) {
      valid = false;
    }
  });

  cmd.subcommands.forEach((c) => {
    if (!command_valid(bot, c)) {
      valid = false;
    }
  });

  return valid;
}

function arg_valid(cmd: Command, arg: Arg): boolean {
  let valid = true;
  const reasons: string[] = [];

  const is_flag = arg.config.long || arg.config.takes_value;
  const is_pos =
    arg.config.positional || arg.config.take_multiple || arg.config.required;

  if (is_flag && is_pos) {
    valid = false;
    reasons.push("cannot be positional and flag at the same time");
  }

  if (!is_flag && !is_pos) {
    valid = false;
    reasons.push("has to be either positional or flag");
  }

  if (is_flag && arg.config.short && arg.config.short.length > 1) {
    valid = false;
    reasons.push("short flag has to be of length 1");
  }
  if (!valid) {
    reasons.forEach((reason) => {
      console.log(
        `[ERROR] ${cmd.full_cmd_name} / ${arg.config.name}: ${reason}`
      );
    });
  }
  return valid;
}
