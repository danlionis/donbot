import * as Discord from "discord.js";
import * as fs from "fs";
import { handle_cmd } from "./command_handler";
import { Config, load_config } from "./config";
import { Command, CommandResult } from "./parser/command";
import { Perms } from "./validator/permission";
import { command_valid } from "./validator/validator";

interface BotConfig {
  prefix: string;
}

export class Bot extends Discord.Client {
  public readonly registry: Command[] = [];
  public readonly config: Config;

  public readonly _aliases: Map<string, string> = new Map();
  public readonly _perms: { [user_id: string]: Perms } = {};

  constructor() {
    super();
    // this.config = config;
    this.config = load_config();
    this.on("message", this.onMessage);
    this.load_default_commands();

    this.on("ready", this.on_ready);

    load_config();
  }

  public register_commands(...commands: Command[]) {
    commands.forEach((c) => {
      const valid = command_valid(c);
      if (valid) {
        console.log(JSON.stringify(valid, null, 2));
      }
    });
    this.registry.push(...commands);
  }

  public find_command(name: string): Command {
    return this.registry.find((c) => c.config.name === name);
  }

  public async on_ready() {
    console.log("ready");
  }

  public async onMessage(msg: Discord.Message) {
    // dont allow bots to interact with the bot
    if (msg.author.bot) return;

    // ignore dm messagess
    if (msg.channel.type === "dm") return;

    if (!msg.content.startsWith(this.config.prefix)) {
      return;
    }

    const content = msg.content.substr(this.config.prefix.length);

    handle_cmd(this, content, msg);
  }

  public async login(token?: string): Promise<string> {
    return super.login(token || this.config.token);
  }

  public set_alias(key: string, value: string) {
    this._aliases.set(key, value);
  }

  public get_alias(key: string): string {
    return this._aliases.get(key) || key;
  }

  public set_perm(member: Discord.GuildMember, cmd: Command, allow: boolean) {
    if (!this._perms[member.id]) {
      this._perms[member.id] = {
        allowed: [],
        denied: []
      };
    }

    if (allow) {
      this._perms[member.id].allowed.push(cmd.config.name);
    } else {
      this._perms[member.id].denied.push(cmd.config.name);
    }
  }

  public has_perm(member: Discord.GuildMember, full_cmd_name: string) {
    if (!this._perms[member.id]) {
      return false;
    }
    return this._perms[member.id].allowed.indexOf(full_cmd_name) >= 0
      ? true
      : false;
  }

  public is_denied(member: Discord.GuildMember, full_cmd_name: string) {
    if (!this._perms[member.id]) {
      return false;
    }

    return this._perms[member.id].denied.indexOf(full_cmd_name) >= 0
      ? true
      : false;
  }

  public reset_perm(member: Discord.GuildMember, cmd: Command) {
    if (!this._perms[member.id]) {
      return;
    }

    const ia = this._perms[member.id].allowed.indexOf(cmd.full_cmd_name);
    const id = this._perms[member.id].denied.indexOf(cmd.full_cmd_name);

    this._perms[member.id].allowed.splice(ia);
    this._perms[member.id].denied.splice(id);
  }

  public get aliases(): Array<{ key: string; value: string }> {
    const res = [];

    this._aliases.forEach((value, key) => {
      res.push({ key, value });
    });

    return res;
  }

  public remove_alias(key: string) {}

  public reply_send_help(msg: Discord.Message, cmd: Command) {
    if (cmd) {
      const mins = 1;
      msg.channel.send(cmd.help(), { code: true });
      // .then(async (m: Discord.Message) => await m.delete(mins * 60 * 1000));

      // msg.delete(mins * 10 * 1000);
    }
  }

  // public reply_cmd_help(msg: Discord.Message, cmd: Command) {}

  public reply_permission_denied(msg: Discord.Message) {
    msg.reply("Insufficient permission");
  }

  public reply_command_not_found(msg: Discord.Message) {
    msg.reply("404: Command not found");
  }

  public reply_error(msg: Discord.Message) {
    msg.reply("500: There was an error");
  }

  public is_owner(id: string): boolean {
    return this.config.owner_id === id;
  }

  private load_default_commands() {
    const command_dir = __dirname + "/commands/";
    fs.readdir(command_dir, (err, files) => {
      if (err) throw err;

      files.forEach((f) => {
        // Dynamically import every command out of the commands folder
        import(command_dir + f).then((imp) => {
          for (const cmd in imp) {
            if (imp[cmd] instanceof Command) {
              const element = imp[cmd];
              this.register_commands(element);
            }
          }
        });
      });
    });
  }
}
