import * as cfonts from "cfonts";
import * as Discord from "discord.js";
import * as fs from "fs";
import CoreModule from "../modules/core";
import StdModule from "../modules/std";
import VoiceModule from "../modules/voice";
import { CmdLog, Command, CommandContext, CommandResult } from "../parser";
import { command_valid } from "../validator/validator";
import { AliasHandler } from "./alias.handler";
import { handle_cmd } from "./command.handler";
import { Config, load_config } from "./config";
import { DatastoreManager } from "./datastore";
import { Module } from "./module";
import { PermissionHandler } from "./permissions.hanlder";
import { VoiceManager } from "./voice.manager";

export class Bot extends Discord.Client {
  public registry: Command[] = [];
  public readonly config: Config;

  public readonly perms: PermissionHandler;

  public readonly cmd_logs: CmdLog[] = [];

  public readonly voiceManager: VoiceManager;

  public readonly datastore: DatastoreManager;

  public readonly aliases: AliasHandler;

  constructor(config?: Config, clientOptions?: Discord.ClientOptions) {
    super(clientOptions);
    this.on("warn", (info) => {
      console.log(`[-] warning: ${info}`);
    });

    console.log(cfonts.render("donbot", { font: "simple3d" }).string);
    // read from the config files
    console.log("[*] loading: config");
    this.config = load_config();

    console.log("[*] init: datastore");
    this.datastore = new DatastoreManager();
    // this.aliases = this.datastore.namespace("alias");
    this.aliases = new AliasHandler(this);

    console.log("[*] init: permission handler");
    this.perms = new PermissionHandler(this);

    console.log("[*] init: voice manager");
    this.voiceManager = new VoiceManager(this);

    // overwrite with parameter config
    this.config = { ...this.config, ...config };

    this.registerModule(CoreModule);
    if (this.config.standard_module) {
      this.registerModule(StdModule);
    }

    if (this.config.voice_module) {
      this.registerModule(VoiceModule);
    }

    this.once("ready", this.onReady);
    this.on("voiceStateUpdate", this.onMemberUpdate);
    this.on("message", this.onMessage);
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
    console.log("[+] ready");
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

    const prefix = await this.getGuildPrefix(msg.guild.id);

    const firstMention = msg.mentions.members.first();
    let content: string;

    // Check if the first mention is the bot, to allow command invocation this way
    if (
      firstMention !== undefined &&
      msg.content.startsWith(firstMention.toString()) &&
      firstMention.user.id === this.user.id
    ) {
      content = msg.content.substr(firstMention.toString().length);

      if (content.length === 0) {
        await handle_cmd(this, "help", msg, new CommandContext());
        return;
      }
    } else if (msg.content.startsWith(prefix)) {
      content = msg.content.substr(prefix.length);

      if (content.length === 0) {
        return;
      }
    } else {
      return;
    }

    content = content
      .split(" ")
      .filter(Boolean)
      .join(" ");

    const cmds = content.split(";").map((c) => c.trim());

    for (let i = 0; i < cmds.length; i++) {
      const c = cmds[i];
      const res = await handle_cmd(this, c, msg, new CommandContext());
    }
  }

  public async login(token?: string): Promise<string> {
    console.log("[*] loggin in");
    return super.login(token || this.config.token);
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
    query = query.replace(/(?<!\\)\$GUILD/gi, msg.guild.id);

    return query;
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

  public replyResult(
    cmd: Command,
    msg: Discord.Message,
    res: CommandResult,
    context: CommandContext
  ) {
    if (context.flags.silent) {
      return;
    }

    // dont log successful commands &
    // errors / failures because it's very likely to be a problem within the command
    if (
      res === CommandResult.Success ||
      res === CommandResult.Failed ||
      res === CommandResult.Error
    ) {
      return;
    }

    let text = "";
    switch (res) {
      case CommandResult.PermissionDenied:
        text = `${cmd.full_cmd_name}: permission denied`;
        break;
      case CommandResult.SendHelp:
      case CommandResult.Unimplemented:
        text = cmd.help();
        break;
    }
    if (text) {
      msg.reply(text, { code: true });
    }
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

  public isOwner(id: string): boolean {
    return this.config.owner_id === id;
  }

  public async getGuildPrefix(guildId: string): Promise<string> {
    return (
      (await this.datastore.namespace("prefix").get(guildId)) ||
      this.config.prefix
    );
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
      `[+] module: ${parent + mod.name} - cmds: ${mod.commands.length}`
    );

    if (mod.commands.length > 0) {
      this.registerCommands(...mod.commands);
    }

    mod.submodules.forEach((m) => {
      this.registerSubModule(m, parent + mod.name + "::");
    });

    mod.onRegister(this);
  }
}
