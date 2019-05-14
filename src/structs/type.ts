import { Guild } from "discord.js";
import { Bot } from "../bot";

export interface ArgType {
  name: string;
  resolve: (value: string, bot: Bot, guild: Guild) => Promise<any>;
}
