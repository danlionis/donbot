import * as Discord from "discord.js";
import { Command } from "./command";

export type ArgMatches = Map<string, any>;

export class Matches {
  private _arg_matches: ArgMatches = new Map();
  private _subcommand: Command;
  private _subcommand_matches: Matches;

  constructor() {}

  public toObject(cmd: Command): object {
    const res = {};

    for (const a of cmd.args) {
      const k = a.config.name;
      const v = this._arg_matches.get(k);
      if (v instanceof Discord.GuildMember) {
        res[k] = v.user.tag;
      } else if (typeof v === "object") {
        res[k] = v.toString();
      } else {
        res[k] = v !== undefined ? v : null;
      }
    }
    return res;
  }

  public set_arg_match(key: string, value: any, merge: boolean = false) {
    if (value === undefined) return;

    // used for multiple input
    if (merge) {
      const old: any[] = this._arg_matches.get(key);
      if (old === undefined) {
        this._arg_matches.set(key, [value]);
      } else {
        old.push(value);
        this._arg_matches.set(key, old);
      }
    } else {
      this._arg_matches.set(key, value);
    }
  }

  public set_subcommand_match(sub_cmd: Command, matches: Matches) {
    this._subcommand = sub_cmd;
    this._subcommand_matches = matches;
  }

  public value_of(key: string): any {
    return this._arg_matches.get(key);
  }

  public get subcommand_matches(): [Command, Matches] {
    return [this._subcommand, this._subcommand_matches];
  }
}

class MatchesBuilder {}
