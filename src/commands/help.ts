import * as Discord from "discord.js";
import { Arg, Command, CommandResult } from "../parser";
import { has_permission } from "../validator/permission";

export let Help = new Command({
  name: "help",
  about: "Shows a list of all commands"
}).handler(async (bot, msg, matches) => {
  const commands = bot.registry.sort();

  const texts: string[] = [];

  const longest_name = Math.max(...commands.map((c) => c.config.name.length));

  commands.sort((a, b) => a.config.name.localeCompare(b.config.name));

  for (const cmd of commands) {
    const [allowed] = has_permission(bot, msg, cmd);
    if (allowed) {
      texts.push(
        `\t${cmd.config.name} ${" ".repeat(
          longest_name - cmd.config.name.length
        )} ${cmd.config.about}`
      );
    }
  }

  const header = `${bot.config.bot_name}\n\nPREFIX: ${
    bot.config.prefix
  }\n\nCOMMANDS:\n`;

  const res = header + texts.join("\n");
  msg.channel.send(res, { code: true });
});
