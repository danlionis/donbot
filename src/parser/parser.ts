import * as Discord from "discord.js";
import { Bot } from "../bot";
import { Arg } from "./arg";
import { Command } from "./command";
import { Matches } from "./matches";

interface MatchError {
  missing_args: string[];
  wrong_args: string[];
}

// enum MatchError {
//   MissingRequiredArg
// }

/**
 * Parses a message and returns the command with argument matches
 *
 * returns 'undefined' if no command was found
 *
 * @param bot
 * @param msg_content
 */
export async function parse_message(
  bot: Bot,
  msg_content: string,
  msg: Discord.Message
): Promise<[Command, Matches, MatchError] | undefined> {
  const content = msg_content.split(" ");

  let cmd = bot.find_command(content.shift());

  if (!cmd) {
    console.log("parse_message: [ERROR] command not found");
    return undefined;
  }
  console.log("parse_message: command found", cmd.config.name);

  let matches = parse_command(cmd, content);

  while (matches.subcommand_matches[0]) {
    const [c, m] = matches.subcommand_matches;
    matches = m;
    cmd = c;
    console.log("parse_message: sub match", matches, cmd);
  }

  // convert mentions in to GuildMembers
  const mention_regex = /<@!?\d+>/;
  cmd.args
    .filter((a) => a.config.can_mention)
    .forEach((a) => {
      if (!matches.value_of(a.config.name)) {
        return;
      }

      const m = matches.value_of(a.config.name);
      let values: string[];

      if (!a.config.take_multiple) {
        values = [m];
      } else {
        values = m;
      }

      values.forEach(async (v) => {
        const reg_match = v.match(mention_regex);
        if (reg_match) {
          const first_match = reg_match[0];
          const start_index = v.indexOf("!") >= 0 ? 3 : 2;
          v = v.substr(start_index, v.length - (start_index + 1));
          const member = await msg.guild.fetchMember(v);
          matches.set_arg_match(a.config.name, member);
        }
      });
    });

  const missing_args: string[] = [];

  const required_args = cmd.args.filter((a) => a.config.required);
  for (const a of required_args) {
    if (!matches.value_of(a.config.name)) {
      console.log("missing required arg");
      missing_args.push(a.config.name);
    }
  }

  const wrong_args: string[] = [];

  const possible_args = cmd.args.filter((a) => a.config.possible_values);
  for (const a of possible_args) {
    const value = matches.value_of(a.config.name);
    console.log("parser: value", value);
    if (value) {
      if (a.config.possible_values.indexOf(value) < 0) {
        wrong_args.push(a.config.name);
      }
    }
  }

  const default_args = cmd.args.filter((a) => a.config.default);
  for (const a of default_args) {
    const value = matches.value_of(a.config.name);
    if (value === undefined) {
      matches.set_arg_match(a.config.name, a.config.default);
    }
  }

  let match_error: MatchError = null;

  if (missing_args.length || wrong_args.length) {
    match_error = {
      missing_args: missing_args,
      wrong_args: wrong_args
    };
  }

  return [cmd, matches, match_error];

  // console.log(matches);
}

export function parse_command(cmd: Command, content: string[]): Matches {
  // console.log(cmd);
  const matches: Matches = new Matches();

  let flag_take_value = false;
  let pos_arg_index = 0;
  let take_multiple: Arg = null;

  for (let i = 0; i < content.length; i++) {
    const word = content[i];
    // if word
    console.log("parse_command: word", word);

    if (cmd.subcommands.length) {
      // parse subcommands
      const sub_cmd = find_sub_cmd(cmd, word);
      if (sub_cmd) {
        console.log("parse_command: found sub command:", sub_cmd.config.name);
        const sub_matches = parse_command(sub_cmd, content.slice(i + 1));
        matches.set_subcommand_match(sub_cmd, sub_matches);
        break;
      }
    }

    if (take_multiple) {
      matches.set_arg_match(take_multiple.config.name, word, true);
      continue;
    }

    if (flag_take_value) {
      console.log("parse_command: take value from flag command");
      const prev = content[i - 1];
      const key = find_flag_argument(cmd, prev);
      matches.set_arg_match(key.config.name, word);
      flag_take_value = false;

      continue;
    }

    if (word.startsWith("-") && word.length > 1) {
      // parse all flag arguments
      const flag_arg = find_flag_argument(cmd, word);
      if (flag_arg) {
        console.log("parse_command: found flag arg:", flag_arg.config.name);
        if (flag_arg.config.takes_value) {
          flag_take_value = true;
        } else {
          matches.set_arg_match(flag_arg.config.name, true);
        }
      }

      continue;
    }

    // parse positional arguments
    const pos_arg = cmd.args.filter((a) => a.config.positional)[pos_arg_index];

    if (pos_arg) {
      if (pos_arg.config.take_multiple) {
        matches.set_arg_match(pos_arg.config.name, word, true);
        take_multiple = pos_arg;
      } else {
        matches.set_arg_match(pos_arg.config.name, word);
        pos_arg_index += 1;
      }
    }
  }

  return matches;
}

function find_sub_cmd(cmd: Command, subcmd: string) {
  return cmd.subcommands.find((s) => {
    return s.config.name === subcmd;
  });
}

function find_flag_argument(cmd: Command, flag: string) {
  return cmd.args.find((a) => {
    const is_long = flag === "--" + a.config.long;
    const is_short = flag === "-" + a.config.short;
    return is_long || is_short;
  });
}

function get_flag_arguments(cmd: Command): Arg[] {
  return cmd.args.filter((a) => {
    return a.config.takes_value && a.config.long;
  });
}
