import * as Discord from "discord.js";
import Datastore from "kvbox";
import { Command } from "../parser";
import { Bot } from "./bot";

export interface Perms {
  allowed: string[];
  denied: string[];
}

export class PermissionHandler {
  // private readonly _explicit: { [user_id: string]: Perms } = {};
  private readonly explicit: Datastore;
  private readonly _disabled_commands: string[] = [];
  private readonly _disabled_users: string[] = [];

  constructor(private bot: Bot) {
    this.explicit = bot.datastore.namespace("explicit");
  }

  public deny_user(member: Discord.GuildMember) {
    if (this._disabled_users.indexOf(member.id) >= 0) {
      return;
    }

    this._disabled_users.push(member.id);
  }

  public allow_user(member: Discord.GuildMember) {
    const i = this._disabled_users.indexOf(member.id);
    this._disabled_users.splice(i);
  }

  /**
   * Explicitly allow a single command to a member
   *
   * @param member
   * @param cmd
   */
  public async allow_user_cmd(member: Discord.GuildMember, cmd: Command) {
    if (!(await this.explicit.has(member.id))) {
      await this.explicit.set(member.id, {
        allowed: [],
        denied: []
      });
    }

    await this.reset_user_cmd(member, cmd);

    const tmp: Perms = await this.explicit.get(member.id);
    tmp.allowed.push(cmd.full_cmd_name);
    return this.explicit.set(member.id, tmp);
  }

  /**
   * Explicitly deny a single command to a member
   *
   * @param member
   * @param cmd
   */
  public async deny_user_cmd(member: Discord.GuildMember, cmd: Command) {
    if (!(await this.explicit.has(member.id))) {
      await this.explicit.set(member.id, {
        allowed: [],
        denied: []
      });
    }

    await this.reset_user_cmd(member, cmd);

    const tmp: Perms = await this.explicit.get(member.id);
    tmp.denied.push(cmd.config.name);
    return this.explicit.set(member.id, tmp);
  }

  public async reset_user_cmd(member: Discord.GuildMember, cmd: Command) {
    if (!(await this.explicit.has(member.id))) return;

    const tmp: any = await this.explicit.get(member.id);

    const ia = tmp.allowed.indexOf(cmd.full_cmd_name);
    const id = tmp.denied.indexOf(cmd.full_cmd_name);

    if (ia >= 0) {
      tmp.allowed.splice(ia);
    }

    if (id >= 0) {
      tmp.denied.splice(id);
    }

    return this.explicit.set(member.id, tmp);
  }

  public user_is_disabled(member: Discord.GuildMember): boolean {
    return this._disabled_users.indexOf(member.id) >= 0;
  }

  public async user_is_allowed(
    member: Discord.GuildMember,
    full_cmd_name: string
  ) {
    if (!(await this.explicit.has(member.id))) return false;

    const tmp: any = await this.explicit.get(member.id);
    return tmp.allowed.indexOf(full_cmd_name) >= 0;
  }

  public async user_is_denied(
    member: Discord.GuildMember,
    full_cmd_name: string
  ) {
    if (!(await this.explicit.has(member.id))) return false;

    const tmp: any = await this.explicit.get(member.id);
    return tmp.denied.indexOf(full_cmd_name) >= 0;
  }

  public async get_user_allowed(
    member: Discord.GuildMember
  ): Promise<string[]> {
    if (!(await this.explicit.has(member.id))) {
      return [];
    }

    const tmp: any = await this.explicit.get(member.id);
    return tmp.allowed;
  }

  public async get_user_denied(member: Discord.GuildMember): Promise<string[]> {
    if (!(await this.explicit.has(member.id))) {
      return [];
    }

    const tmp: any = await this.explicit.get(member.id);
    return tmp.denied;
  }

  public allow_cmd(cmd: Command) {
    const i = this._disabled_commands.indexOf(cmd.full_cmd_name);
    this._disabled_commands.splice(i);
  }

  public deny_cmd(cmd: Command) {
    if (this._disabled_commands.indexOf(cmd.full_cmd_name) >= 0) {
      return;
    }

    this._disabled_commands.push(cmd.full_cmd_name);
  }

  public cmd_is_disabled(cmd: Command) {
    const subcommands = cmd.full_cmd_name.trim().split(" ");
    // console.log("cmd_is_disabled: cmd", subcommands);

    let current = "";
    for (const subcmd of subcommands) {
      current += subcmd;

      if (this._disabled_commands.indexOf(current) >= 0) {
        return true;
      }

      current += " ";
    }

    return false;
  }

  public get_disabled_commands() {
    return this._disabled_commands;
  }
}
