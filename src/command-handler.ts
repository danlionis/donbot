import * as colors from "colors/safe";
import {
  Message,
  PermissionResolvable,
  RichEmbed,
  TextChannel
} from "discord.js";
import { Bot } from "./bot";
import { TextCommand } from "./mixins/text-command";
import {
  parseArguments,
  ParsedMessage,
  parseFlags,
  parseMessage
} from "./utils/parser";

export class CommandHandler {
  constructor(private bot: Bot) {}

  /**
   * Handles an incoming command
   * @param message recieved discord message
   */
  public process(message: Message) {
    // let parsedMessage = parseMessage(message, this.settings.prefix);
    const parsedMessage = parseMessage(
      message,
      this.bot.settings.getGuildPrefix(message.guild.id)
    );

    // get command from the registry
    const command: TextCommand = this.bot.registry.getTextCommand(
      parsedMessage.is
    );

    // if the command wasn't found or a normal user tried to execute an ownerOnly command
    if (
      !command ||
      (command.onwerOnly && message.author.id !== this.bot.settings.owner)
    ) {
      if (this.bot.settings.notifyUnknownCommand) {
        this.logCmd(message, parsedMessage, "UNKNOWN");
        return message.reply(
          `404 Command not found. Type ${
            this.bot.settings.prefix
          }help for a list of commands`
        );
      }
      return;
    }

    // parse args and flags
    const args = parseArguments(command.args, parsedMessage.rawArgs);
    const flags = parseFlags(command.flags, parsedMessage.rawArgs);
    parsedMessage.args = args;
    parsedMessage.flags = flags;

    let allowed = false;

    // allow if user has required permissions
    if (
      command.permissions.length > 0 &&
      message.member.hasPermission(
        command.permissions as PermissionResolvable[]
      )
    ) {
      allowed = true;
    }

    // allow if user has at least the min role
    if (
      command.permissions.length === 0 &&
      command.roles.length === 0 &&
      !command.minRole
    ) {
      allowed = true;
    }

    // allow if the user has some of the allowed roles
    if (
      message.member.roles.some((r) => command.roles.indexOf(r.name) !== -1)
    ) {
      allowed = true;
    }

    if (command.minRole) {
      const minRole =
        message.guild.roles.find("name", command.minRole) ||
        message.guild.defaultRole;
      if (message.member.highestRole.comparePositionTo(minRole) >= 0) {
        allowed = true;
      }
    }

    let owner = false;
    // allow for bot owner
    if (message.author.id === this.bot.settings.owner) {
      allowed = true;
      owner = true;
    }

    if (!allowed) {
      this.logCmd(message, parsedMessage, "DENIED");
      return message.reply("You don't have permission to execute this command");
    } else if (!command.enabled && !owner) {
      this.logCmd(message, parsedMessage, "DISABLED");
      return message.reply("This command was temporarily disabled");
    }
    this.logCmd(message, parsedMessage);
    this.prerun(command, this.bot, message, parsedMessage);
  }

  private async prerun(
    command: TextCommand,
    bot: Bot,
    message: Message,
    parsedMessage: ParsedMessage
  ) {
    let run;
    if (parsedMessage.flags.help) {
      parsedMessage.args.command = {
        name: "command",
        value: parsedMessage.is,
        values: [parsedMessage.is],
        default: false,
        exists: true
      };
      bot.registry.executeCommand("help", bot, message, parsedMessage);
    } else if (parsedMessage.flags.stats) {
      message.channel.send(
        new RichEmbed({
          title: "Command Stats: " + command.is,
          fields: [{ name: "Counter", value: command.counter.toString() }]
        })
      );
    } else {
      run = command.run(bot, message, parsedMessage);
    }

    if (run) {
      command.increaseCounter();
    }

    return run;
  }
  private logCmd(
    message: Message,
    parsedMessage: ParsedMessage,
    opt?: "DENIED" | "UNKNOWN" | "DISABLED"
  ) {
    const tag = message.author.tag;
    const guild = message.guild.name;
    const cmd = parsedMessage.is;
    const args = parsedMessage.rawArgs.map((a) => a.toString()).join(", ");

    // let send = `${colors.yellow("[C]")} ${colors.blue(tag)} @ ${colors.green(guild)}: ${cmd} [${args}] `;
    let send = `${colors.yellow("[C]")} ${colors.blue(tag)} @ ${colors.green(
      guild
    )}#${colors.grey(
      (message.channel as TextChannel).name
    )}: ${cmd} [${args}] `;

    if (opt === "DENIED") {
      send += colors.red("~ DENIED");
    } else if (opt === "UNKNOWN") {
      send += colors.red("~ UNKNOWN");
    } else if (opt === "DISABLED") {
      send += colors.red("~ DISABLED");
    }

    console.log(send);
  }
}
