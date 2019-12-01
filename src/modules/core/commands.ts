import * as Discord from "discord.js";
import { Alias } from "../../core/alias.handler";
import { handle_cmd } from "../../core/command.handler";
import { Arg, Command, CommandContext, CommandResult } from "../../parser";
import { splitContent } from "../../utils/formatter";
import { has_permission } from "../../validator/permission";

export const Noop = new Command({
  name: "noop",
  about: "No operation. Passthrough commands",
  danger: true,
  hidden: true
})
  .arg(
    new Arg({
      name: "QUERY",
      positional: true,
      take_multiple: true,
      help: "Command to execute"
    })
  )
  .handler(async (bot, msg, matches, context) => {
    const query: string[] = matches.value_of("QUERY");
    if (query) {
      return handle_cmd(bot, query.join(" "), msg, context);
    }
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

  // only use Commands that could resolve to be successful
  const member_cmds = bot.cmd_logs.filter(
    (l) =>
      l.user === msg.author.tag &&
      (l.result === CommandResult.Success || l.result === CommandResult.Failed)
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
  about: "Permission Manager",
  owner_only: true
})
  .subcommand(PermsCommand)
  .subcommand(PermsUser);

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
      name: "MODULE",
      long: "module",
      short: "m",
      help: "Show the corresponding module for each command"
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

    const includeModule: boolean = matches.value_of("MODULE");

    const longest_name = Math.max(
      ...commands.map((c) => {
        return includeModule
          ? c.module.length + 1 + c.config.name.length
          : c.config.name.length;
      })
    );

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

    commands.sort((a, b) => {
      if (includeModule) {
        const fullName = a.module + a.config.name;
        return fullName.localeCompare(b.module + b.config.name);
      }
      return a.config.name.localeCompare(b.config.name);
    });

    if (matches.value_of("SHORT")) {
      texts.push(commands.map((c) => c.config.name).join(", "));
    } else {
      const t = commands
        .map((c) => {
          const name = includeModule
            ? c.module + "/" + c.config.name
            : c.config.name;
          const line = `\t${name} ${" ".repeat(longest_name - name.length)} ${
            c.config.about
          }`;
          return line;
        })
        .join("\n");
      texts.push(t);
    }

    const header = `${bot.config.botName}\n\nPREFIX: ${bot.config.prefix}\n\nCOMMANDS:\n`;

    const res = header + texts.join("");
    const truncated = splitContent(res);
    truncated.forEach(async (part, i) => {
      await msg.channel.send(part, { code: true });
    });
  });
