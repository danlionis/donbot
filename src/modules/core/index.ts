/**
 * This modules contains every command that is directly associated with the bot
 *
 * Commands: alias, perms, help
 */
import { Bot } from "../../core/bot";
import { Module } from "../../core/module";
import { getCommandsFromImport } from "../../utils/command_import";
import { ManageAlias } from "./alias";
import * as Cmds from "./commands";

const CoreModule: Module = {
  name: "core",
  commands: [...getCommandsFromImport(Cmds), ManageAlias],
  onRegister: (bot: Bot) => {},
};

export default CoreModule;
