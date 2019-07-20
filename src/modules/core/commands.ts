import * as Discord from "discord.js";
import { Arg, Command, CommandResult } from "../../parser";
import { has_permission } from "../../validator/permission";

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
          bot.perms.allow_user_cmd(member, cmd);
        } else if (status === "deny") {
          bot.perms.deny_user_cmd(member, cmd);
        } else {
          bot.perms.reset_user_cmd(member, cmd);
        }
      } else {
        if (status === "deny") {
          bot.perms.deny_user(member);
        } else {
          bot.perms.allow_user(member);
        }
      }
    }

    let res = `Explicit user permissions: ${member.displayName}\n`;
    res += "\nALLOWED:\n";
    res += bot.perms
      .get_user_allowed(member)
      .map((p) => "\t" + p)
      .join("\n");

    res += "\nDENIED:\n";
    if (bot.perms.user_is_disabled(member)) {
      res += "\t*\n";
    }
    res += bot.perms
      .get_user_denied(member)
      .map((p) => "\t" + p)
      .join("\n");

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

export const Alias = new Command({
  name: "alias",
  about: "Manage alias expansions"
})
  .subcommand(
    new Command({
      name: "set",
      about: "Set a new alias",
      aliases: ["add"],
      owner_only: true
    })
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
        const alias = matches.value_of("ALIAS");
        const cmd = (matches.value_of("COMMAND") as string[]).join(" ");

        if (bot.registry.map((c) => c.config.name).indexOf(alias) >= 0) {
          msg.channel.send(
            `Cannot set alias. Command with name ${alias} already exists`
          );
          return CommandResult.Failed;
        }

        bot.addAlias(alias, cmd);
      })
  )
  .subcommand(
    new Command({ name: "list", about: "List all aliases" }).handler(
      async (bot, msg) => {
        let res = "ALIASES:\n";
        res += bot.aliases.map((a) => `${a.key} -> ${a.value}`).join("\n");
        msg.channel.send(res, { code: true });
      }
    )
  )
  .subcommand(
    new Command({
      name: "remove",
      about: "Remove an alias",
      aliases: ["delete"],
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

        bot.removeAlias(alias);
      })
  );

export const Help = new Command({
  name: "help",
  about: "Shows a list of all commands"
  // aliases: ["h"]
})
  .alias("h")
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
  .handler(async (bot, msg, matches) => {
    let commands = bot.registry.sort();

    const texts: string[] = [];

    const longest_name = Math.max(...commands.map((c) => c.config.name.length));

    if (!matches.value_of("ALL")) {
      commands = commands.filter((c) => !c.config.hidden);
    }

    // dont show command the user doesn't have access to
    commands = commands.filter((c) => {
      const [allowed] = has_permission(bot, msg, c);
      return allowed;
    });

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
