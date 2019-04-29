import * as Discord from "discord.js";
import { Arg, Command, CommandResult } from "../parser";
import { has_permission } from "../validator/permission";

export let Help = new Command({
  name: "help",
  about: "Shows a list of all commands"
})
  .arg(
    new Arg({
      name: "COMMAND",
      positional: true,
      help: "help for specific command"
    })
  )
  .handler(async (bot, msg, matches) => {
    if (matches.value_of("COMMAND")) {
      const cmd = bot.find_command(matches.value_of("COMMAND"));
      if (!cmd) {
        msg.reply("Unknown command");
        return CommandResult.Failed;
      }
      bot.reply_send_help(msg, cmd);
      return CommandResult.Success;
    }

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
