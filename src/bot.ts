import * as Discord from "discord.js";
import * as fs from "fs";
import { handle_cmd } from "./command_handler";
import { Config, load_config } from "./config";
import { Command } from "./parser/command";
import { PermissionHandler, Perms } from "./permissions_hanlder";
import { command_valid } from "./validator/validator";

export class Bot extends Discord.Client {
  public registry: Command[] = [];
  public readonly config: Config;

  public readonly _aliases: Map<string, string> = new Map();
  public readonly _perms: { [user_id: string]: Perms } = {};
  public readonly perms: PermissionHandler = new PermissionHandler();

  private readonly cmd_logs: string[] = [];

  constructor(config?: Config, clientOptions?: Discord.ClientOptions) {
    super(clientOptions);
    // read from the config files
    this.config = load_config();

    // overwrite with parameter config
    this.config = { ...this.config, ...config };

    this.on("message", this.onMessage);
    this.load_default_commands();

    this.on("ready", this.on_ready);

    load_config();
  }

  public reload_commands() {
    this.registry = [];
    this.load_default_commands();
  }

  public register_commands(...commands: Command[]) {
    commands.forEach((c) => {
      const valid = command_valid(this, c);
      if (valid) {
        this.registry.push(...commands);
      }
    });
  }

  public find_command(query: string): Command {
    const stack = query.split(" ");
    let current = stack.shift();

    let base_cmd = this.registry.find((c) => {
      return c.config.name === current;
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

    // parse_command;

    // return this.registry.find((c) => c.config.name === cmd);
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
    return super.login(token || this.config.token);
  }

  public set_alias(key: string, value: string) {
    this._aliases.set(key, value);
  }

  public get_alias(key: string): string {
    return this._aliases.get(key) || key;
  }

  public get aliases(): Array<{ key: string; value: string }> {
    const res = [];

    this._aliases.forEach((value, key) => {
      res.push({ key, value });
    });

    return res;
  }

  public remove_alias(key: string) {
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

  public get_logs() {
    return this.cmd_logs;
  }

  public add_log(cmd: string) {
    this.cmd_logs.push(cmd);

    if (this.cmd_logs.length > 200) {
      this.cmd_logs.shift();
    }
  }

  public reply_permission_denied(cmd: string, msg: Discord.Message) {
    // msg.reply("Insufficient permission");
    msg.reply(`${cmd.split(" ")[0]}: permission denied`, { code: true });
  }

  public reply_command_not_found(
    cmd: string,
    msg: Discord.Message,
    alternative?: Command
  ) {
    // msg.reply("404: Command not found");
    let res = `${cmd.split(" ")[0]}: command not found`;
    if (alternative) {
      res += `\n\nDid you mean: ${alternative.full_cmd_name}`;
    }
    msg.reply(res, { code: true });
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
