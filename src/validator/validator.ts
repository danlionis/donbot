import { Arg, Command } from "../parser";

export interface CommandError {
  cmd: string;
  errors: ValidatorError[];
  arg_erros: ArgError[];
  subcmd_errors: CommandError[];
}

export interface ArgError {
  arg: string;
  errors: ValidatorError[];
}

export enum ValidatorError {
  PositionalAndFlag,
  MissingLong,
  AlreadyRegistered
}

export function command_valid(cmd: Command): CommandError {
  const cmd_error: CommandError = {
    cmd: cmd.full_cmd_name,
    errors: [],
    arg_erros: [],
    subcmd_errors: []
  };

  cmd_error.arg_erros.push(
    ...cmd.args.map((a) => arg_valid(a)).filter(Boolean)
  );
  cmd_error.subcmd_errors.push(
    ...cmd.subcommands.map((c) => command_valid(c)).filter(Boolean)
  );

  // console.log(cmd_error);
  if (
    cmd_error.errors.length ||
    cmd_error.arg_erros.length ||
    cmd_error.subcmd_errors.length
  ) {
    return cmd_error;
  }

  return undefined;
  // return errors;
}

function arg_valid(arg: Arg): ArgError {
  const errors: ValidatorError[] = [];
  const flag = arg.config.long || arg.config.takes_value;
  const pos = arg.config.positional || arg.config.take_multiple;

  if (flag && pos) {
    errors.push(ValidatorError.PositionalAndFlag);
  }

  if (flag) {
    if (!arg.config.long) {
      errors.push(ValidatorError.MissingLong);
    }
  }

  if (errors.length) {
    return { arg: arg.config.name, errors };
  }

  return undefined;
}
