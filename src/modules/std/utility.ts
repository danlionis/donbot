import { handle_cmd } from "../../core/command.handler";
import { Module } from "../../core/module";
import { Arg, Command, CommandContext, CommandResult } from "../../parser";
import { Duration } from "../../utils/duration";

/**
 * Usage:
 * [prefix]try [command to execute] catch [command to execute instead]
 */
export const TryCatch = new Command({
  name: "try",
  about:
    "try to execute a command, execute some other on failure (view source for explanation)",
  danger: true,
  hidden: true
})
  .arg(
    new Arg({
      name: "QUERY",
      positional: true,
      required: true,
      type: "string",
      take_multiple: true
    })
  )
  .handler(async (bot, msg, matches, context) => {
    const query: string[] = matches.value_of("QUERY");
    const catch_pos = query.indexOf("catch");

    let try_statement: string;
    if (catch_pos !== -1) {
      try_statement = query.slice(0, catch_pos).join(" ");
    } else {
      try_statement = query.join(" ");
    }

    let res: CommandResult;
    context.flags.no_log = true;
    context.flags.silent = true;
    res = await handle_cmd(bot, try_statement, msg, context);

    if (res === CommandResult.Success) {
      return CommandResult.Success;
    } else if (catch_pos !== -1) {
      const catch_statement = query.slice(catch_pos + 1).join(" ");
      context.flags.no_log = false;
      context.flags.silent = false;
      res = await handle_cmd(bot, catch_statement, msg, context);
      return res;
    }
  });

export const Async = new Command({
  name: "async",
  about: "Immediately return a Success result",
  danger: true,
  hidden: true
})
  .arg(
    new Arg({
      name: "COMMAND",
      required: true,
      positional: true,
      take_multiple: true,
      help: "command to execute asyncronously"
    })
  )
  .handler((bot, msg, matches, context) => {
    const cmd = (matches.value_of("COMMAND") as string[]).join(" ");
    handle_cmd(bot, cmd, msg, context);
  });

export let Chain = new Command({
  name: "chain",
  hidden: true,
  danger: true,
  about:
    "Splits and evaluates commands at execution time (for usage in aliases, use ';' in other cases)"
})
  .arg(
    new Arg({
      name: "RESUME",
      short: "r",
      long: "resume",
      help: "Resume execution after a failed command"
    })
  )
  .arg(
    new Arg({
      name: "COUNT",
      short: "c",
      long: "count",
      takes_value: true,
      type: "number",
      help: `The amount of commands included in the chain. Use to prevent command injection`
    })
  )
  .arg(
    new Arg({
      name: "SEPARATOR",
      help: "separate the following commands by this symbol",
      default: "+",
      long: "separator",
      short: "s",
      takes_value: true
    })
  )
  .arg(
    new Arg({
      name: "COMMANDS",
      help: "command to execute",
      positional: true,
      required: true,
      take_multiple: true
    })
  )
  .handler(async (bot, msg, matches, context) => {
    const input: string[] = matches.value_of("COMMANDS");
    const count: number = matches.value_of("COUNT");

    const commands: string[] = input
      .join(" ")
      .split(matches.value_of("SEPARATOR"));

    if (count !== undefined && count !== commands.length) {
      msg.reply(
        `given chain length not matching actual length: ${count} != ${
          commands.length
        }`,
        { code: true }
      );
      return CommandResult.Error;
    }

    for (let i = 0; i < commands.length; i++) {
      const content = commands[i].trim();

      const res = await handle_cmd(bot, content, msg, context.clone());

      // break if there was an error and the resume flag was not set
      if (!matches.value_of("RESUME") && res !== CommandResult.Success) {
        return res;
        break;
      }
    }
  });

export let Delay = new Command({
  name: "delay",
  about: "Delays a command for a given amount of seconds",
  danger: true
})
  .arg(
    new Arg({
      name: "TIME",
      positional: true,
      required: true,
      type: "duration",
      help: "Time to delay (in seconds)"
    })
  )
  .arg(
    new Arg({
      name: "COMMAND",
      // required: true,
      take_multiple: true,
      positional: true,
      help: "Command to execute after the time"
    })
  )
  .handler((bot, msg, matches, context) => {
    return new Promise((resolve, reject) => {
      const delay_cmd: string[] = matches.value_of("COMMAND") as string[];

      let delay_time = matches.value_of("TIME");

      delay_time = Math.min(120 * Duration.MINUTE, delay_time);

      setTimeout(() => {
        if (delay_cmd) {
          handle_cmd(bot, delay_cmd.join(" "), msg, context).then((res) => {
            resolve(res);
          });
        }
      }, delay_time);
    });
  });

export let Repeat = new Command({
  name: "repeat",
  about: "Repeats a command for a given amout of times",
  danger: true
})
  .arg(
    new Arg({
      name: "AMOUNT",
      positional: true,
      required: true,
      type: "number",
      help: "Amount of times the command should be repeated"
    })
  )
  .arg(
    new Arg({
      name: "COMMAND",
      take_multiple: true,
      positional: true,
      required: true,
      help: "This command gets repeated"
    })
  )
  .arg(
    new Arg({
      name: "FORCE",
      long: "force",
      short: "f",
      hidden: true,
      help:
        "bypass command limit and dangerous commands (requires owner permission)"
    })
  )
  .handler(async (bot, msg, matches, context) => {
    const repeat_cmd: string[] = matches.value_of("COMMAND") as string[];
    const force: boolean = matches.value_of("FORCE");

    let msg_content = repeat_cmd.join(" ");

    const alias = await bot.aliases.resolve(msg_content);

    if (alias !== null) {
      msg_content = alias.expansion;
    }

    const cmd = bot.findCommand(msg_content);

    if (!cmd) {
      bot.reply_command_not_found(repeat_cmd[0], msg);
      return CommandResult.Failed;
    }

    // if (repeat_cmd[0] === Repeat.config.name) {
    if (cmd.config.danger) {
      // if (!bot.is_owner(msg.author.id) && !force) {
      if (!(force && bot.isOwner(msg.author.id))) {
        msg.reply(
          `Cannot execute dangerous command '${
            cmd.full_cmd_name
          }' in conjunction with 'repeat'`,
          { code: true }
        );
        return CommandResult.Error;
      }
    }

    let repeat_amout: number = matches.value_of("AMOUNT");

    // limit the repeat amount to 20 repetitions to avoid spamming
    repeat_amout = Math.min(repeat_amout, 20);

    for (let i = 0; i < repeat_amout; i++) {
      let content = repeat_cmd.join(" ");
      content = content.replace(/{i}/g, i.toString());
      content = content.replace(/{i\+1}/g, (i + 1).toString());
      content = content.replace(/{i\-1}/g, (repeat_amout - i).toString());
      const res = await handle_cmd(bot, content, msg, context.clone());
      if (res !== CommandResult.Success) {
        return res;
      }
    }
  });

export let Delete = new Command({
  name: "delete",
  permissions: ["MANAGE_MESSAGES"],
  about: "Delete your message and still execute a command",
  danger: true,
  aliases: ["del"]
})
  .arg(
    new Arg({
      name: "COMMAND",
      take_multiple: true,
      required: true,
      help: "Command to execute",
      positional: true
    })
  )
  .handler(async (bot, msg, matches, context) => {
    if (msg.deletable) {
      msg.delete().catch(() => {});
    }
    const exec_cmd: string = (matches.value_of("COMMAND") as string[]).join(
      " "
    );

    await handle_cmd(bot, exec_cmd, msg, context);
  });

export let PermCheck = new Command({
  name: "permcheck",
  about:
    "Checks permission at runtime and execute following command with elevated permissions",
  danger: true,
  owner_only: true
})
  .arg(
    new Arg({
      name: "OWNER",
      short: "o",
      long: "owner",
      help: "Require owner permissions"
    })
  )
  .arg(
    new Arg({
      name: "ROLE",
      short: "r",
      long: "role",
      help: "Require a specific role",
      takes_value: true,
      type: "string"
    })
  )
  .arg(
    new Arg({
      name: "CMD",
      positional: true,
      required: true,
      take_multiple: true,
      type: "string",
      help: "Command to execute"
    })
  )
  .handler(async (bot, msg, matches, context) => {
    const checkOwner: boolean = matches.value_of("OWNER");
    const checkRole: string = matches.value_of("ROLE");

    let allowed = true;

    if (checkOwner) {
      allowed = allowed && bot.isOwner(msg.author.id);
    }

    if (checkRole) {
      allowed =
        allowed && msg.member.roles.map((r) => r.name).includes(checkRole);
    }

    if (!allowed) {
      return CommandResult.PermissionDenied;
    }

    const cmd: string[] = matches.value_of("CMD");

    context.flags.skip_permission = true;
    return handle_cmd(bot, cmd.join(" "), msg, context);
  });

export const UtilityModule: Module = {
  name: "utility",
  commands: [Async, Chain, Delay, Delete, Repeat, TryCatch, PermCheck]
};

export default UtilityModule;
