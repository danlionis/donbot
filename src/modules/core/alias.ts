import { Alias } from "../../core/alias.handler";
import { handle_cmd } from "../../core/command.handler";
import { Arg, Command, CommandResult } from "../../parser";
import { Namespace } from "../../utils/constants";

const AliasClear = new Command({
  name: "clear",
  owner_only: true,
  about: "clear all aliases",
}).handler(async (bot, msg, matches, context) => {
  await bot.aliases.clear();
});

const AliasSet = new Command({
  name: "set",
  about: "Set a new alias",
  aliases: ["add"],
  owner_only: true,
})
  .arg(
    new Arg({
      name: "SKIPPERMS",
      short: "s",
      long: "skip-permissions",
      help: "Allow the execution of this alias to everyone",
      default: false,
    })
  )
  .arg(
    new Arg({
      name: "ALIAS",
      positional: true,
      required: true,
      help: "New Alias",
    })
  )
  .arg(
    new Arg({
      name: "COMMAND",
      positional: true,
      required: true,
      take_multiple: true,
      help: "Command to execute when alias is called",
    })
  )
  .handler(async (bot, msg, matches) => {
    const key = matches.value_of("ALIAS");

    if (bot.registry.map((c) => c.config.name).indexOf(key) >= 0) {
      msg.channel.send(
        `Cannot set alias. Command with name ${key} already exists`
      );
      return CommandResult.Failed;
    }

    const cmd = (matches.value_of("COMMAND") as string[]).join(" ");
    const skipPermissions: boolean = matches.value_of("SKIPPERMS") || false;

    const alias: Alias = {
      key: key,
      expansion: cmd,
      flags: {
        skip_permission: skipPermissions,
      },
    };

    await bot.aliases.add(alias);
  });

const AliasList = new Command({
  name: "list",
  about: "List all aliases",
  aliases: ["ls"],
})
  .arg(
    new Arg({
      name: "JSON",
      long: "json",
      help: "Show aliases as json",
    })
  )
  .arg(
    new Arg({
      name: "EXPORT",
      long: "export",
      help: "Print all aliases as an executable command",
    })
  )
  .handler(async (bot, msg, matches) => {
    const aliases: Alias[] = await bot.datastore
      .namespace(Namespace.ALIAS)
      .values();
    if (matches.value_of("JSON")) {
      msg.reply(JSON.stringify(aliases, null, 2), { code: "json" });
      return CommandResult.Success;
    }

    if (matches.value_of("EXPORT")) {
      const commands = aliases.map((a) => {
        return `alias set ${a.flags.skip_permission ? "-s " : ""}${
          a.key
        } ${a.expansion.replace(/\$/g, "\\$")}`;
      });
      msg.reply(
        (await bot.getGuildPrefix(msg.guild.id)) + commands.join("; "),
        {
          code: true,
        }
      );
      return CommandResult.Success;
    }

    const longestAlias = Math.max(...aliases.map((a) => a.key.length));
    const res = aliases
      .map(
        (a) =>
          `${a.key}${" ".repeat(longestAlias - a.key.length)} -> ${a.expansion}`
      )
      .join("\n");
    msg.channel.send(res, { code: true });
  });

const AliasRemove = new Command({
  name: "remove",
  about: "Remove one or more aliases",
  aliases: ["delete", "rm"],
  owner_only: true,
})
  .arg(
    new Arg({
      name: "ALIAS",
      required: true,
      positional: true,
      take_multiple: true,
      help: "Alias(es) to remove",
    })
  )
  .handler(async (bot, msg, matches) => {
    const aliases: string[] = matches.value_of("ALIAS");

    aliases.forEach((alias) => {
      bot.aliases.remove(alias);
    });
  });

export const ManageAlias = new Command({
  name: "alias",
  about: "Alias Expansion Manager",
  aliases: ["aem"],
})
  .handler(AliasList.handler_fn)
  .subcommand(AliasClear)
  .subcommand(AliasSet)
  .subcommand(AliasList)
  .subcommand(AliasRemove);
