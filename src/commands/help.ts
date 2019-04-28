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

    const commands = bot.registry;

    const texts: string[] = [];

    for (const cmd of commands) {
      if (has_permission(bot, msg, cmd)) {
        texts.push(
          `\`${bot.config.prefix}${cmd.config.name}\` - ${cmd.config.about}\n`
        );
      }
    }

    const embed = new Discord.RichEmbed();

    embed.setDescription(texts.sort().join("\n"));
    msg.author.send(embed);
  });
