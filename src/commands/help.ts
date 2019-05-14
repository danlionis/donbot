import * as Discord from "discord.js";
import { Arg, Command, CommandResult } from "../parser";
import { has_permission } from "../validator/permission";

export let Help = new Command({
  name: "help",
  about: "Shows a list of all commands"
})
  .arg(
    new Arg({
      name: "ALL",
      hidden: true,
      short: "a",
      long: "all",
      help: "Show all commands"
    })
  )
  .handler(async (bot, msg, matches) => {
    let commands = bot.registry.sort();

    const texts: string[] = [];

    const longest_name = Math.max(...commands.map((c) => c.config.name.length));

    if (!matches.value_of("ALL")) {
      commands = commands.filter((c) => !c.config.hidden);
    }
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

export const Info = new Command({
  name: "info",
  about: "Get infos about a command"
})
  .arg(
    new Arg({
      name: "COMMAND",
      positional: true,
      required: true,
      take_multiple: true
    })
  )
  .handler(async (bot, msg, matches) => {
    const parts = matches.value_of("COMMAND") as string[];
    const is_alias = bot.is_alias(parts[0]);

    if (is_alias) {
      msg.reply(is_alias);
      return CommandResult.Success;
    }

    const cmd = bot.find_command(parts.join(" "));

    if (cmd) {
      // msg.reply(cmd.full_cmd_name);
      const res = new Discord.RichEmbed();
      res
        .setTitle(cmd.full_cmd_name)
        .addField("PERMISSIONS", cmd.config.permissions.toString());
      msg.reply(res);
    } else {
      return bot.reply_command_not_found(parts.join(" "), msg);
    }
  });
