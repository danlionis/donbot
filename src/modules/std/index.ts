import { Bot } from "../../core/bot";
import { Module } from "../../core/module";
import AdminModule from "./admin";
import DatabaseModule from "./database";
import FunModule from "./fun";
import GeneralModule from "./general";
import ModerationModule from "./moderation";
import UtilityModule from "./utility";
import VoteModule from "./vote";

const StdModule: Module = {
  name: "std",
  submodules: [
    ModerationModule,
    UtilityModule,
    GeneralModule,
    VoteModule,
    FunModule,
    AdminModule,
    DatabaseModule
  ],
  commands: [],
  onRegister: (bot: Bot) => {}
};

export default StdModule;
