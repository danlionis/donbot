import * as Discord from "discord.js";
import { Bot } from "../bot";
import { Arg } from "./arg";
import { Matches } from "./matches";

export type HanlderFn = (
  bot: Bot,
  message: Discord.Message,
  matches: Matches
) => Promise<CommandResult | void> | void;

export enum CommandResult {
  Success,
  Error,
  Failed,
  SendHelp,
  PermissionDenied,
  NotFound
}

interface CommandConfig {
  name: string;
  about?: string;
  permissions?: Discord.PermissionResolvable[];
  owner_only?: boolean;
}

export class Command {
  public readonly config: CommandConfig;
  public readonly args: Arg[] = [];
  public readonly subcommands: Command[] = [];
  private _handler_fn: HanlderFn;

  private _parent_command: string = "";

  constructor(config: CommandConfig) {
    this._handler_fn = () => {
      console.log("unimplemented");
    };
    const default_config: Partial<CommandConfig> = {
      about: "No information",
      permissions: [],
      owner_only: false
    };
    this.config = { ...default_config, ...config };
    if (this.config.permissions === undefined) {
      this.config.permissions = [];
    }
    this.arg(
      new Arg({
        name: "help",
        long: "help",
        short: "h",
        help: "Prints help information"
      })
    );

    this.arg(
      new Arg({
        name: "debug",
        long: "debug",
        short: "dbg",
        help: "Print debug information",
        hidden: true
      })
    );
  }

  public arg(arg: Arg): Command {
    this.args.push(arg);
    return this;
  }

  public handler(fn: HanlderFn): Command {
    this._handler_fn = fn;
    return this;
  }

  public get handler_fn(): HanlderFn {
    return this._handler_fn;
  }

  public owner_only(owner_only: boolean = true): Command {
    this.config.owner_only = owner_only;
    return this;
  }

  public permissions(...permissions: Discord.PermissionResolvable[]): Command {
    this.config.permissions.push(...permissions);
    return this;
  }

  public subcommand(cmd: Command): Command {
    cmd.permissions(...this.config.permissions);
    this.subcommands.push(cmd);
    cmd.parent_command = this._parent_command + this.config.name + " ";
    return this;
  }

  public get full_cmd_name(): string {
    return this._parent_command + this.config.name;
  }

  /**
   * Get help information
   *
   * This function is ugly af, sorry for that
   */
  public help(): string {
    const args = this.args.filter((a) => !a.config.hidden);

    const flags = args.filter(
      (a) => !a.config.positional && !a.config.takes_value
    );
    const options = args.filter(
      (a) => !a.config.positional && a.config.takes_value
    );
    const pos_args = args.filter((a) => a.config.positional);

    // command name
    let usage = this.full_cmd_name + " ";
    // if there are options display the hint
    usage += options.length > 0 ? "[OPTIONS] " : "";

    // add positional args
    // usage += pos_args
    // .map((a) => `${a.config.take_multiple ? "..." : ""}[${a.config.name}] `)
    // .join("");

    for (const a of pos_args) {
      let p = "";
      const required = a.config.required;
      const multiple = Boolean(a.config.take_multiple);
      p += required ? "<" : "[";
      p += a.config.name;
      p += required ? ">" : "]";
      if (multiple) {
        p += "...";
      }
      p += " ";
      usage += p;
    }

    usage += this.subcommands.length > 0 ? "[SUBCOMMAND]" : "";

    let res = (this.config.about || "no description") + "\n\n";
    res += "USAGE:\n\t";
    res += usage;
    res += "\n\n";
    res += "FLAGS:\n";

    const longest_flag_name = Math.max(
      ...flags.map((a) => a.flat_format_length())
    );

    for (const a of flags) {
      res += format_flag(a, longest_flag_name);
    }

    if (options.length > 0) {
      res += "\nOPTIONS:\n";
      const longest_option_name = Math.max(
        ...options.map((a) => a.flat_format_length())
      );

      for (const a of options) {
        res += format_option(a, longest_option_name);
      }
    }

    if (pos_args.length > 0) {
      res += "\nARGS:\n";

      const longest_pos_name = Math.max(
        ...pos_args.map((a) => {
          const len = a.arg_format_length();
          return len;
        })
      );

      for (const a of pos_args) {
        res += format_pos_args(a, longest_pos_name);
      }
    }

    if (this.subcommands.length > 0) {
      res += "\n";
      res += "SUBCOMMANDS:\n";

      const longest_subcmd_name = Math.max(
        ...this.subcommands.map((s) => s.config.name.length)
      );

      for (let i = 0; i < this.subcommands.length; i++) {
        const sub = this.subcommands[i];
        res +=
          "\t" +
          sub.config.name +
          " ".repeat(longest_subcmd_name - sub.config.name.length) +
          "\t" +
          (sub.config.about || "no description") +
          "\n";
      }
    }

    return res;
  }

  private set parent_command(name: string) {
    this._parent_command = name;
  }
}

function format_flag(a: Arg, offset: number) {
  return (
    "\t" +
    (a.config.short ? "-" + a.config.short + ", " : " ".repeat(4)) +
    "--" +
    a.config.long +
    (a.config.takes_value ? " <" + a.config.name + ">" : "") +
    " ".repeat(offset - a.flat_format_length()) +
    "\t" +
    (a.config.help || "no description") +
    "\n"
  );
}

function format_option(a: Arg, offset: number) {
  return (
    "\t" +
    (a.config.short ? "-" + a.config.short + ", " : " ".repeat(4)) +
    "--" +
    a.config.long +
    (a.config.takes_value ? " <" + a.config.name + ">" : "") +
    " ".repeat(offset - a.flat_format_length()) +
    "\t" +
    (a.config.help || "no description") +
    " " +
    (a.config.default ? `[default: ${a.config.default}] ` : "") +
    (a.config.possible_values
      ? `[possible values: ${a.config.possible_values.toString()}]`
      : "") +
    "\n"
  );
}

function format_pos_args(a: Arg, offset: number) {
  return (
    "\t" +
    `<${a.config.name}>` +
    (a.config.take_multiple ? "..." : "") +
    " ".repeat(offset - a.arg_format_length()) +
    "\t" +
    (a.config.help || "no description") +
    " " +
    (a.config.default ? `[default: ${a.config.default}] ` : "") +
    (a.config.possible_values
      ? `[possible values: ${a.config.possible_values.toString()}]`
      : "") +
    "\n"
  );
}
