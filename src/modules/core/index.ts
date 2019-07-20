/**
 * This modules contains every command that is directly associated with the bot
 *
 * Commands: alias, perms, help
 */
import { Bot } from "../../core/bot";
import { Module } from "../../core/module";
import { Command } from "../../parser";
import { getCommandsFromImport } from "../../utils/command_import";
import * as Cmds from "./commands";

const CoreModule: Module = {
  name: "core",
  commands: getCommandsFromImport(Cmds),
  onRegister: (bot: Bot) => {}
};

export default CoreModule;
