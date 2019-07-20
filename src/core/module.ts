import { Command } from "../parser";
import { Bot } from "./bot";

export interface Module {
  name: string;
  commands?: Command[];
  submodules?: Module[];
  onRegister?: (bot: Bot) => void;
}
