import * as Discord from "discord.js";
import * as fs from "fs";
import { handle_cmd } from "./command_handler";
import { Config, load_config } from "./config";
import { Command, CommandResult } from "./parser/command";
import { command_valid } from "./validator/validator";

interface BotConfig {
  prefix: string;
}

export class Bot extends Discord.Client {
  public readonly registry: Command[] = [];
  // public readonly config: BotConfig;
  public readonly config: Config;

  constructor() {
    super();
    // this.config = config;
    this.config = load_config();
    this.on("message", this.onMessage);
    this.load_default_commands();

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

  public reply_send_help(msg: Discord.Message, cmd: Command) {
    if (cmd) {
      msg.channel.send(cmd.help(), { code: true });
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
