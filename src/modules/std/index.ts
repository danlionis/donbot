import { Bot } from "../../core/bot";
import { Module } from "../../core/module";
import { Command } from "../../parser";
import AdminModule from "./admin";
import FunModule from "./fun";
import GeneralModule from "./general";
import ModerationModule from "./moderation";
import UtilityModule from "./utility";
import VoteModule from "./vote";

const Test = new Command({
  name: "test",
  owner_only: true
}).handler(async (bot, msg, matches, context) => {});

const StdModule: Module = {
  name: "std",
  submodules: [
    ModerationModule,
    UtilityModule,
    GeneralModule,
    VoteModule,
    FunModule,
    AdminModule
  ],
  commands: [Test],
  onRegister: (bot: Bot) => {}
};

export default StdModule;
