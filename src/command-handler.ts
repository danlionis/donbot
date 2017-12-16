import { Message, PermissionResolvable } from "discord.js";
import { Bot } from "./bot";
import { BotSettings } from "./bot-settings";
import { TextCommand } from "./mixins/text-command";
import { Registry } from "./Registry";
import { ParsedMessage, parseArguments, parseFlags, parseMessage } from "./utils/parser";

export class CommandHandler {

  constructor(private bot: Bot, private settings: BotSettings, private registry: Registry) {

  }

  /**
   * Handles an incoming command
   * @param message recieved discord message
   */
  public handleCommand(message: Message) {

    // let parsedMessage = parseMessage(message, this.settings.prefix);
    const parsedMessage = parseMessage(message, this.settings.prefix);

    // get command from the registry
    const command: TextCommand = this.registry.getTextCommand(parsedMessage.is);

    // if the command wasn't found or a normal user tried to execute an ownerOnly command
    if (!command || (command.onwerOnly && message.author.id !== this.settings.owner)) {
      if (this.settings.notifyUnknownCommand) {
        return message.reply(`404 Command not found. Type ${this.settings.prefix}help for a list of commands`);
      }
      return;
    }

    // parse args and flags
    const args = parseArguments(command.args, parsedMessage.rawArgs);
    const flags = parseFlags(command.flags, parsedMessage.rawArgs);
    parsedMessage.args = args;
    parsedMessage.flags = flags;

    let allowed = false;

    // allow for bot owner
    if (message.author.id === this.settings.owner) {
      allowed = true;
    }

    // allow if user has required permissions
    if (command.permissions.length > 0 && message.member.hasPermission(command.permissions as PermissionResolvable[])) {
      allowed = true;
    }

    // allow if user has at least the min role
    if (command.permissions.length === 0 && command.roles.length === 0 && !command.minRole) {
      allowed = true;
    }

    // allow if the user has some of the allowed roles
    if (message.member.roles.some((r) => command.roles.indexOf(r.name) !== -1)) {
      allowed = true;
    }

    if (command.minRole) {
      const minRole = message.guild.roles.find("name", command.minRole) || message.guild.defaultRole;
      if (message.member.highestRole.comparePositionTo(minRole) >= 0) {
        allowed = true;
      }
    }

    if (!allowed) {
      return message.reply("You don't have permission to execute this command");
    }
    this.prerun(command, this.bot, message, parsedMessage);
  }

  private async prerun(command, bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    let run;
    if (parsedMessage.flags.help) {
      message.author.send(command.help);
    } else {
      run = command.run(bot, message, parsedMessage);
    }

    return run;
  }

}
