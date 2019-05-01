import * as Discord from "discord.js";
import { Command } from "./parser";

export interface Perms {
  allowed: string[];
  denied: string[];
}
export class PermissionHandler {
  private readonly _explicit: { [user_id: string]: Perms } = {};
  private readonly _disabled_commands: string[] = [];

  public allow_user_cmd(member: Discord.GuildMember, cmd: Command) {
    if (!this._explicit[member.id]) {
      this._explicit[member.id] = {
        allowed: [],
        denied: []
      };
    }

    this.reset_user_cmd(member, cmd);
    this._explicit[member.id].allowed.push(cmd.config.name);
  }

  public deny_user_cmd(member: Discord.GuildMember, cmd: Command) {
    if (!this._explicit[member.id]) {
      this._explicit[member.id] = {
        allowed: [],
        denied: []
      };
    }

    this.reset_user_cmd(member, cmd);
    this._explicit[member.id].denied.push(cmd.config.name);
  }

  public reset_user_cmd(member: Discord.GuildMember, cmd: Command) {
    if (!this._explicit[member.id]) return;

    const ia = this._explicit[member.id].allowed.indexOf(cmd.full_cmd_name);
    const id = this._explicit[member.id].denied.indexOf(cmd.full_cmd_name);

    this._explicit[member.id].allowed.splice(ia);
    this._explicit[member.id].denied.splice(id);
  }

  public user_is_allowed(member: Discord.GuildMember, full_cmd_name: string) {
    if (!this._explicit[member.id]) return false;

    return this._explicit[member.id].allowed.indexOf(full_cmd_name) >= 0;
  }

  public user_is_denied(member: Discord.GuildMember, full_cmd_name: string) {
    if (!this._explicit[member.id]) return false;

    return this._explicit[member.id].denied.indexOf(full_cmd_name) >= 0;
  }

  public get_user_allowed(member: Discord.GuildMember): string[] {
    if (!this._explicit[member.id]) {
      return [];
    }

    return this._explicit[member.id].allowed;
  }

  public get_user_denied(member: Discord.GuildMember): string[] {
    if (!this._explicit[member.id]) {
      return [];
    }

    return this._explicit[member.id].denied;
  }

  public allow_cmd(cmd: Command) {
    const i = this._disabled_commands.indexOf(cmd.full_cmd_name);
    this._disabled_commands.splice(i);
  }

  public deny_cmd(cmd: Command) {
    this._disabled_commands.push(cmd.full_cmd_name);
  }

  public cmd_is_disabled(cmd: Command) {
    return this._disabled_commands.indexOf(cmd.full_cmd_name) >= 0;
  }

  public get_disabled_commands() {
    return this._disabled_commands;
  }
}
