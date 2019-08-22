import * as Discord from "discord.js";
import { Bot } from "../core/bot";
import { Duration } from "../utils/duration";
import { Arg } from "./arg";
import { Command } from "./command";
import { CommandContext } from "./context";
import { Matches } from "./matches";

interface MatchError {
  missing_args: string[];
  wrong_args: string[];
  wrong_type: string[];
}

/**
 * Convert the arg values to their specified type
 * @param cmd
 * @param matches
 * @param guild
 */
async function convert_arg_values(
  arg: Arg,
  matches: Matches,
  guild: Discord.Guild
) {
  if (!matches.value_of(arg.config.name)) return matches;

  const m = matches.value_of(arg.config.name);
  let values: string[];

  if (arg.config.take_multiple) {
    values = m;
    // reset matches to set again later with appropriate type
    matches.set_arg_match(arg.config.name, []);
  } else {
    values = [m];
  }

  const merge = arg.config.take_multiple;

  for (let i = 0; i < values.length; i++) {
    const v = values[i];

    // remove empty values
    if (!v) continue;

    if (arg.config.type === "boolean") {
      matches.set_arg_match(arg.config.name, v === "true", merge);
    } else if (arg.config.type === "number") {
      matches.set_arg_match(arg.config.name, parseFloat(v), merge);
    } else if (arg.config.type === "member") {
      // convert  <@!364727850923982849>
      // to       364727850923982849
      // remove <> @ !
      let id = v.substring(2, v.length - 1);
      if (id[0] === "!") {
        id = id.substr(1);
      }

      const member = (await guild.fetchMember(id).catch((e) => {})) || v;
      matches.set_arg_match(arg.config.name, member, merge);
    } else if (arg.config.type === "duration") {
      matches.set_arg_match(arg.config.name, new Duration(v).millis, merge);
    } else {
      matches.set_arg_match(arg.config.name, v, merge);
    }
  }

  return matches;
}

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
  const content = bot.replaceVariables(msg_content, { msg: msg }).split(" ");

  let cmd = bot.findCommand(content.shift());

  if (!cmd) {
    return undefined;
  }

  let matches = parse_command(cmd, content);

  // check if any subcommand matches
  // if so shift the matches to the subcommand matches
  // repeat for every found subcommand
  // like this only the most nested matches are returned
  while (matches.subcommand_matches[0]) {
    const [c, m] = matches.subcommand_matches;
    matches = m;
    cmd = c;
  }

  const convert_args = cmd.args.filter(
    (c) => c.config.positional || c.config.takes_value
  );
  // dont use cmd.args.forEach() -> async breaks everything
  for (let i = 0; i < convert_args.length; i++) {
    const arg = convert_args[i];
    matches = await convert_arg_values(arg, matches, msg.guild);
  }

  const missing_args: string[] = [];
  const required_args = cmd.args.filter((a) => a.config.required);
  for (const a of required_args) {
    if (matches.value_of(a.config.name) === undefined) {
      // console.log("missing required arg");
      missing_args.push(a.config.name);
    }
  }

  const wrong_args: string[] = [];
  const possible_args = cmd.args.filter((a) => a.config.possible_values);
  for (const a of possible_args) {
    const value = matches.value_of(a.config.name);
    if (value) {
      if (a.config.possible_values.indexOf(value) < 0) {
        wrong_args.push(a.config.name);
      }
    }
  }

  // Check if some arguments are of the wrong type
  // if so set the errors appropriately
  const wrong_type: string[] = [];
  for (const a of cmd.args) {
    const m = matches.value_of(a.config.name);

    if (m === undefined) continue;

    let values: any[];

    if (a.config.take_multiple) {
      values = m;
    } else {
      values = [m];
    }

    values.forEach((v) => {
      if (a.config.type === "number") {
        if (isNaN(v)) {
          wrong_type.push(a.config.name);
        }
      } else if (a.config.type === "member") {
        if (!(v instanceof Discord.GuildMember)) {
          wrong_type.push(a.config.name);
        }
      } else if (a.config.type === "boolean") {
      }
    });
  }

  const default_args = cmd.args.filter((a) => a.config.default);
  for (const a of default_args) {
    const value = matches.value_of(a.config.name);
    if (value === undefined) {
      matches.set_arg_match(a.config.name, a.config.default);
    }
  }

  let match_error: MatchError = null;

  if (missing_args.length || wrong_args.length || wrong_type.length) {
    match_error = {
      missing_args,
      wrong_args,
      wrong_type
    };
  }

  return [cmd, matches, match_error];
}

export function parse_command(cmd: Command, content: string[]): Matches {
  const matches: Matches = new Matches();

  let flag_take_value = false;
  let pos_arg_index = 0;
  let take_multiple: Arg;

  outer: for (let i = 0; i < content.length; i++) {
    const word = content[i];

    if (cmd.subcommands.length) {
      // parse subcommands
      const sub_cmd = find_sub_cmd(cmd, word);
      if (sub_cmd) {
        // console.log("parse_command: found sub command:", sub_cmd.config.name);
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
      let prev = content[i - 1];

      if (isLongFlag(prev)) {
        prev = content[i - 1].substring(2);
      } else if (isShortFlag(prev)) {
        prev = content[i - 1].substring(1);
      }

      const key = find_flag_argument(cmd, prev);
      matches.set_arg_match(key.config.name, word);
      flag_take_value = false;

      continue;
    }

    // parse flags
    if (isLongFlag(word) || isShortFlag(word)) {
      let flags = [];
      if (isLongFlag(word)) {
        flags = [word.substring(2)];
      } else if (isShortFlag(word)) {
        flags = word.substring(1).split("");
      }

      // parse all flag arguments
      for (const f of flags) {
        const flag_arg = find_flag_argument(cmd, f);
        if (flag_arg) {
          // console.log("parse_command: found flag arg:", flag_arg.config.name);
          if (flag_arg.config.takes_value) {
            flag_take_value = true;
            continue outer;
          } else {
            matches.set_arg_match(flag_arg.config.name, true);
          }
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
    return s.config.name === subcmd || s.config.aliases.includes(subcmd);
  });
}

function find_flag_argument(cmd: Command, flag: string) {
  return cmd.args.find(
    (a) => a.config.long === flag || a.config.short === flag
  );
}

function isShortFlag(word: string) {
  return word.startsWith("-") && word.length > 1;
}

function isLongFlag(word: string) {
  return word.startsWith("--") && word.length > 2;
}
