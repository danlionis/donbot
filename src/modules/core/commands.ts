import * as Discord from "discord.js";
import { Alias } from "../../core/alias_handler";
import { handle_cmd } from "../../core/command_handler";
import { Arg, Command, CommandContext, CommandResult } from "../../parser";
import { has_permission } from "../../validator/permission";

export const Noop = new Command({
  name: "noop",
  about: "This command just executes the following command",
  danger: true,
  hidden: true
})
  .arg(
    new Arg({
      name: "QUERY",
      positional: true,
      take_multiple: true,
      required: true,
      help: "Command to execute"
    })
  )
  .handler(async (bot, msg, matches, context) => {
    const query: string[] = matches.value_of("QUERY");
    return handle_cmd(bot, query.join(" "), msg, context);
  });

export const Settings = new Command({
  name: "settings",
  about: "Change the bots settings",
  owner_only: true
}).subcommand(
  new Command({
    name: "prefix",
    about: "Change the prefix for the bot"
  })
    .arg(
      new Arg({
        name: "PREFIX",
        help: "New prefix",
        positional: true,
        type: "string"
      })
    )
    .handler(async (bot, msg, matches, context) => {
      const newPrefix: string = matches.value_of("PREFIX");
      const prefixes = bot.datastore.namespace("prefix");
      if (newPrefix === undefined) {
        msg.reply(
          "prefix:" + ((await prefixes.get(msg.guild.id)) || bot.config.prefix),
          { code: true }
        );
        return;
      }

      await prefixes.set(msg.guild.id, newPrefix);
    })
);

export const RerunLast = new Command({
  name: "rerun",
  about: "rerun last successfull command",
  danger: true,
  hidden: true,
  no_log: true,
  aliases: ["!"]
}).handler(async (bot, msg, matches, context) => {
  // this is necessary to prevent deadlocks
  if (context.callstack.length > 1) {
    msg.reply(
      "rerun: you can only execute this command by itself, not nested inside other commands",
      { code: true }
    );
    return CommandResult.Error;
  }

  // only use own succcessful commands
  const member_cmds = bot.cmd_logs.filter(
    (l) => l.user === msg.author.tag && l.result === CommandResult.Success
  );

  if (member_cmds.length === 0) {
    msg.reply("No recent commands");
    return CommandResult.Failed;
  }

  const last_cmd = member_cmds[member_cmds.length - 1].content;

  return handle_cmd(bot, last_cmd, msg, new CommandContext());
});

const PermsCommand = new Command({
  name: "command",
  about: "Enable/Disable a command",
  aliases: ["cmd"]
})
  .arg(
    new Arg({
      name: "STATUS",
      positional: true,
      help: "New command status",
      possible_values: ["allow", "deny"]
    })
  )
  .arg(
    new Arg({
      name: "COMMAND",
      positional: true,
      help: "Command you want to manage",
      take_multiple: true
    })
  )
  .handler(async (bot, msg, matches) => {
    const cmd_match: string[] = matches.value_of("COMMAND");
    if (cmd_match) {
      const cmd = bot.findCommand(cmd_match.join(" "));
      const status = matches.value_of("STATUS");

      if (cmd) {
        if (status === "allow") {
          bot.perms.allow_cmd(cmd);
        } else if (status === "deny") {
          bot.perms.deny_cmd(cmd);
        }
      }
    }

    let res = `DISABLED COMMANDS:\n`;
    res += bot.perms
      .get_disabled_commands()
      .map((c) => "\t" + c)
      .join("\n");

    msg.channel.send(res, { code: true });
  });

const PermsUser = new Command({
  name: "user",
  about: "Manage explicit user permissions"
})
  .arg(
    new Arg({
      name: "MEMBER",
      positional: true,
      required: true,
      type: "member",
      help: "User that should be managed"
    })
  )
  .arg(
    new Arg({
      name: "STATUS",
      positional: true,
      possible_values: ["allow", "deny", "reset"],
      help: "Allow, deny or reset explicit permission"
    })
  )
  .arg(
    new Arg({
      name: "COMMAND",
      positional: true,
      take_multiple: true,
      help: "Command / Subcommands (if not set deny all commands)"
    })
  )
  .handler(async (bot, msg, matches) => {
    const member = matches.value_of("MEMBER") as Discord.GuildMember;
    const status = matches.value_of("STATUS");
    const cmd_str = matches.value_of("COMMAND");

    if (!(member instanceof Discord.GuildMember)) {
      msg.reply("MEMBER has to be a Mention");
      return CommandResult.Failed;
    }

    if (status) {
      if (cmd_str) {
        const cmd = bot.findCommand(cmd_str.join(" "));

        if (status === "allow") {
          await bot.perms.allow_user_cmd(member, cmd);
        } else if (status === "deny") {
          await bot.perms.deny_user_cmd(member, cmd);
        } else {
          await bot.perms.reset_user_cmd(member, cmd);
        }
      } else {
        if (status === "deny") {
          bot.perms.deny_user(member);
        } else {
          bot.perms.allow_user(member);
        }
      }
    }
    const denied = await bot.perms.get_user_denied(member);
    const allowed = await bot.perms.get_user_allowed(member);

    let res = `Explicit user permissions: ${member.displayName}\n`;
    res += "\nALLOWED:\n";
    res += allowed.map((p) => "\t" + p).join("\n");

    res += "\nDENIED:\n";
    if (bot.perms.user_is_disabled(member)) {
      res += "\t*\n";
    }
    res += denied.map((p) => "\t" + p).join("\n");

    msg.channel.send(res, { code: true });
    return CommandResult.Success;
  });

export const Perms = new Command({
  name: "perms",
  about: "Manage Command permissions",
  owner_only: true
})
  .subcommand(PermsCommand)
  .subcommand(PermsUser);

export const ManageAlias = new Command({
  name: "alias",
  about: "Alias Expansion Manager"
})
  .subcommand(
    new Command({
      name: "clear",
      owner_only: true,
      about: "clear all aliases"
    }).handler(async (bot, msg, matches, context) => {
      await bot.aliases.clear();
    })
  )
  .subcommand(
    new Command({
      name: "set",
      about: "Set a new alias",
      aliases: ["add"],
      owner_only: true
    })
      .arg(
        new Arg({
          name: "SKIPPERMS",
          short: "s",
          long: "skip-permissions",
          help: "Allow the execution of this alias to everyone",
          default: false
        })
      )
      .arg(
        new Arg({
          name: "ALIAS",
          positional: true,
          required: true,
          help: "New Alias"
        })
      )
      .arg(
        new Arg({
          name: "COMMAND",
          positional: true,
          required: true,
          take_multiple: true,
          help: "Command to execute when alias is called"
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
            skip_permission: skipPermissions
          }
        };

        await bot.aliases.add(alias);
      })
  )
  .subcommand(
    new Command({
      name: "list",
      about: "List all aliases",
      aliases: ["ls"]
    })
      .arg(
        new Arg({
          name: "JSON",
          long: "json",
          help: "Show aliases as json"
        })
      )
      .arg(
        new Arg({
          name: "EXPORT",
          long: "export",
          help: "Print all aliases as an executable command"
        })
      )
      .handler(async (bot, msg, matches) => {
        const aliases: Alias[] = await bot.datastore
          .namespace("alias")
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
              code: true
            }
          );
          return CommandResult.Success;
        }

        let res = "ALIASES:\n";
        res += aliases.map((a) => `${a.key} -> ${a.expansion}`).join("\n");
        msg.channel.send(res, { code: true });
      })
  )
  .subcommand(
    new Command({
      name: "remove",
      about: "Remove an alias",
      aliases: ["delete", "rm"],
      owner_only: true
    })
      .arg(
        new Arg({
          name: "ALIAS",
          required: true,
          positional: true,
          help: "Alias to remove"
        })
      )
      .handler(async (bot, msg, matches) => {
        const alias = matches.value_of("ALIAS");

        bot.aliases.remove(alias);
      })
  );

export const Help = new Command({
  name: "help",
  about: "Shows a list of all commands",
  aliases: ["h"]
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
  .arg(
    new Arg({
      name: "SHORT",
      long: "short",
      short: "s",
      help: "only show command names"
    })
  )
  .handler(async (bot, msg, matches, context) => {
    let commands = bot.registry.sort();

    const texts: string[] = [];

    const longest_name = Math.max(...commands.map((c) => c.config.name.length));

    if (!matches.value_of("ALL")) {
      commands = commands.filter((c) => !c.config.hidden);
    }

    // dont show command the user doesn't have access to
    // commands = commands.filter(async (c) => {
    //   const [allowed] = await has_permission(bot, msg, c);
    //   console.log(allowed);
    //   return allowed;
    // });

    const tmp: Command[] = [];

    for (const c of commands) {
      const [allowed] = await has_permission(bot, msg, c, context);
      if (allowed) {
        tmp.push(c);
      }
    }

    commands = tmp;

    commands.sort((a, b) => a.config.name.localeCompare(b.config.name));

    if (matches.value_of("SHORT")) {
      texts.push(commands.map((c) => c.config.name).join(", "));
    } else {
      const t = commands
        .map((c) => {
          const line = `\t${c.config.name} ${" ".repeat(
            longest_name - c.config.name.length
          )} ${c.config.about}`;
          return line;
        })
        .join("\n");
      texts.push(t);
    }

    const header = `${bot.config.bot_name}\n\nPREFIX: ${
      bot.config.prefix
    }\n\nCOMMANDS:\n`;

    const res = header + texts.join("");
    msg.channel.send(res, { code: true });
  });
