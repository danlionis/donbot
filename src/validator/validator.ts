import { Bot } from "../bot";
import { Arg, Command } from "../parser";

export interface CommandValidator {
  cmd: string;
  errors: CommandError[];
  arg_erros: ArgValidator[];
  subcmd_errors: CommandValidator[];
}

export enum CommandError {
  NameTaken
}

export interface ArgValidator {
  arg: string;
  errors: ArgError[];
}

export enum ArgError {
  PositionalAndFlag,
  MissingLong,
  AlreadyRegistered
}

export function command_valid(bot: Bot, cmd: Command): boolean {
  let valid = true;
  if (
    bot.registry.map((c) => c.full_cmd_name).indexOf(cmd.full_cmd_name) >= 0
  ) {
    console.log(`[ERROR] ${cmd.full_cmd_name}: Command already registered`);
    valid = false;
  }

  if (!cmd.config.about) {
    console.log(`[WARNING] ${cmd.full_cmd_name}: no command description`);
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

  const is_flag = arg.config.long || arg.config.takes_value;
  const is_pos =
    arg.config.positional || arg.config.take_multiple || arg.config.required;

  if (is_flag && is_pos) {
    console.log(
      `[ERROR] ${cmd.full_cmd_name} / ${
        arg.config.name
      }: cannot be positional and flag at the same time`
    );
    valid = false;
  }

  return valid;
}

// export function command_valid(bot: Bot, cmd: Command): CommandValidator {
//   const cmd_error: CommandValidator = {
//     cmd: cmd.full_cmd_name,
//     errors: [],
//     arg_erros: [],
//     subcmd_errors: []
//   };

//   if (bot.registry.indexOf(cmd) >= 0) {
//     cmd_error.errors.push(CommandError.NameTaken);
//   }

//   cmd_error.arg_erros.push(
//     ...cmd.args.map((a) => arg_valid(a)).filter(Boolean)
//   );
//   cmd_error.subcmd_errors.push(
//     ...cmd.subcommands.map((c) => command_valid(bot, c)).filter(Boolean)
//   );

//   // console.log(cmd_error);
//   if (
//     cmd_error.errors.length ||
//     cmd_error.arg_erros.length ||
//     cmd_error.subcmd_errors.length
//   ) {
//     return cmd_error;
//   }

//   return undefined;
//   // return errors;
// }

// function arg_valid(arg: Arg): ArgValidator {
//   const errors: ArgError[] = [];
//   const flag = arg.config.long || arg.config.takes_value;
//   const pos = arg.config.positional || arg.config.take_multiple;

//   if (flag && pos) {
//     errors.push(ArgError.PositionalAndFlag);
//   }

//   if (flag) {
//     if (!arg.config.long) {
//       errors.push(ArgError.MissingLong);
//     }
//   }

//   if (errors.length) {
//     return { arg: arg.config.name, errors };
//   }

//   return undefined;
// }
