import * as cfonts from "cfonts";
import * as Discord from "discord.js";
import * as fs from "fs";
import CoreModule from "../modules/core";
import StdModule from "../modules/std";
import VoiceModule from "../modules/voice";
import { CmdLog, Command } from "../parser/command";
import { format_string } from "../utils/formatter";
import { command_valid } from "../validator/validator";
import { handle_cmd } from "./command_handler";
import { Config, load_config } from "./config";
import { Module } from "./module";
import { PermissionHandler } from "./permissions_hanlder";

export class Bot extends Discord.Client {
  public registry: Command[] = [];
  public readonly config: Config;

  public readonly _aliases: Map<string, string> = new Map();
  public readonly perms: PermissionHandler = new PermissionHandler();

  public readonly cmd_logs: CmdLog[] = [];

  constructor(config?: Config, clientOptions?: Discord.ClientOptions) {
    super(clientOptions);
    console.log(cfonts.render("donbot", { font: "simple3d" }).string);
    // read from the config files
    console.log("[INFO] loading config");
    this.config = load_config();

    // overwrite with parameter config
    this.config = { ...this.config, ...config };

    this.registerModule(CoreModule);
    if (this.config.standard_module) {
      this.registerModule(StdModule);
    }

    if (this.config.voice_module) {
      this.registerModule(VoiceModule);
    }

    // console.log("[INFO] loading default commands");
    // this.load_default_commands();
    // TODO: migrate to modules

    this.on("ready", this.onReady);
    this.on("voiceStateUpdate", this.onMemberUpdate);
    this.on("message", this.onMessage);

    process.on("SIGINT", async () => {
      // notify the owner that the process was terminated
      const owner = await this.fetchUser(this.config.owner_id);
      await owner.send(`[INFO] recieved SIGINT`);
      process.exit(0);
    });
  }

  public registerModule(mod: Module) {
    this.registerSubModule(mod);
  }

  public registerCommands(...commands: Command[]) {
    commands.forEach((c) => {
      const valid = command_valid(this, c);
      if (valid) {
        this.registry.push(c);
      }
    });
  }

  public hasBotRole(member: Discord.GuildMember): boolean {
    if (!this.config.role) {
      return true;
    }

    return member.roles.map((r) => r.name).indexOf(this.config.role) >= 0;
  }

  public findCommand(query: string): Command {
    const stack = query.split(" ");
    let current = stack.shift();

    let base_cmd = this.registry.find((c) => {
      return (
        c.config.name === current || c.config.aliases.indexOf(current) >= 0
      );
    });

    if (!base_cmd) {
      return undefined;
    }

    while (base_cmd.subcommands.length && stack.length) {
      current = stack.shift();
      const tmp = base_cmd.subcommands.find((c) => c.config.name === current);
      if (tmp) {
        base_cmd = tmp;
      }
    }

    return base_cmd;
  }

  public async onReady() {
    console.log("[INFO] ready");
  }

  public async onMemberUpdate(
    old_member: Discord.GuildMember,
    new_member: Discord.GuildMember
  ) {
    if (this.isOwner(new_member.id)) {
      if (new_member.serverMute || new_member.serverDeaf) {
        new_member.setMute(false);
        new_member.setDeaf(false);
      }
    }
  }

  public async onMessage(msg: Discord.Message) {
    // dont allow bots to interact with the bot
    if (msg.author.bot) return;

    // ignore dm messagess
    if (msg.channel.type === "dm") return;

    if (!msg.content.startsWith(this.config.prefix)) {
      return;
    }

    let content = msg.content.substr(this.config.prefix.length);
    content = content
      .split(" ")
      .filter(Boolean)
      .join(" ");

    const cmds = content.split(";").map((c) => c.trim());

    for (let i = 0; i < cmds.length; i++) {
      const c = cmds[i];
      const res = await handle_cmd(this, c, msg);
    }
  }

  public async login(token?: string): Promise<string> {
    console.log("[INFO] loggin in");
    return super.login(token || this.config.token);
  }

  public addAlias(key: string, value: string) {
    this._aliases.set(key, value);
  }

  /**
   * Expands the alias and replaces placeholders
   * @param query
   */
  public resolveAlias(query: string): string {
    const keys = query.split(" ");
    const key = keys.shift();
    const a = this._aliases.get(key);

    if (!a) {
      return query;
    }

    return format_string(a, ...keys);
  }

  /**
   * Replace the following variables with their corresponding values:
   *
   * $ME    a mention to yourself
   *
   * $BOT   a mention to the bot
   *
   * $OWNER a mention to the bot owner
   *
   * @param query string where the values should be replaced
   * @param param1 opts
   */
  public replaceVariables(
    query: string,
    { msg }: { msg: Discord.Message }
  ): string {
    const member = msg.member;
    query = query.replace(/(?<!\\)\$ME/gi, member.toString());
    query = query.replace(/(?<!\\)\$BOT/gi, this.user.toString());
    query = query.replace(/(?<!\\)\$OWNER/gi, `<@${this.config.owner_id}>`);

    return query;
  }

  public isAlias(key: string): boolean {
    return this._aliases.has(key);
  }

  public get aliases(): Array<{ key: string; value: string }> {
    const res = [];

    this._aliases.forEach((value, key) => {
      res.push({ key, value });
    });

    return res;
  }

  public removeAlias(key: string) {
    this._aliases.delete(key);
  }

  public reply_send_help(msg: Discord.Message, cmd: Command) {
    if (cmd) {
      const mins = 1;
      msg.channel.send(cmd.help(), { code: true });
      // .then(async (m: Discord.Message) => await m.delete(mins * 60 * 1000));

      // msg.delete(mins * 10 * 1000);
    }
  }

  public getLogs() {
    return this.cmd_logs;
  }

  public addLog(log: CmdLog) {
    this.cmd_logs.push(log);

    if (this.cmd_logs.length > 200) {
      this.cmd_logs.shift();
    }
  }

  public reply_permission_denied(cmd: string, msg: Discord.Message) {
    msg.reply(`${cmd.split(" ")[0]}: permission denied`, { code: true });
  }

  public reply_command_not_found(
    cmd: string,
    msg: Discord.Message,
    alternative?: Command
  ) {
    let res = `${cmd.split(" ")[0]}: command not not found`;
    if (alternative) {
      res += `\n\nDid you mean: ${alternative.full_cmd_name}`;
    }
    msg.reply(res, { code: true });
  }

  public reply_error(msg: Discord.Message) {
    msg.reply("500: There was an error");
  }

  public isOwner(id: string): boolean {
    return this.config.owner_id === id;
  }

  private registerSubModule(module: Module, parent: string = "") {
    // set default for optional arguments
    const mod: Module = {
      commands: [],
      submodules: [],
      onRegister: () => {},
      ...module
    };

    console.log(
      `[MODULE] '${parent + mod.name}' - ${mod.commands.length} command(s) - ${
        mod.submodules.length
      } submodule(s)`
    );

    if (mod.commands.length > 0) {
      this.registerCommands(...mod.commands);
    }

    mod.submodules.forEach((m) => {
      this.registerSubModule(m, parent + mod.name + "::");
    });

    mod.onRegister(this);
  }

  private load_default_commands() {
    const command_dir = __dirname + "/../commands/";
    fs.readdir(command_dir, (err, files) => {
      if (err) throw err;

      files.forEach((f) => {
        // Dynamically import every command out of the commands folder
        import(command_dir + f).then((imp) => {
          for (const cmd in imp) {
            if (imp[cmd] instanceof Command) {
              const element = imp[cmd];
              this.registerCommands(element);
            }
          }
        });
      });
    });
  }
}
