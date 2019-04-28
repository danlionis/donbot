import * as Discord from "discord.js";
import { handle_cmd } from "../command_handler";
import { Arg, Command, CommandResult } from "../parser";

export let Delete = new Command({
  name: "delete",
  permissions: ["MANAGE_MESSAGES"],
  about: "Delete your message and still execute a command"
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
  .handler(async (bot, msg, matches) => {
    msg.delete();

    const exec_cmd: string = (matches.value_of("COMMAND") as string[]).join(
      " "
    );

    const res = await handle_cmd(bot, exec_cmd, msg);
    return res;
  });

export let Eval = new Command({
  name: "eval",
  about: "Execute javascript",
  owner_only: true
})
  .arg(
    new Arg({
      name: "INPUT",
      positional: true,
      take_multiple: true,
      required: true
    })
  )
  .handler(async (bot, msg, matches) => {
    const input = (matches.value_of("INPUT") as string[]).join(" ");
    const res = isolate_eval(input);
    console.log("eval: ", res);

    msg.channel.send(JSON.stringify(res), { code: "json" });
  });

const isolate_eval = (input: string) => {
  try {
    // tslint:disable-next-line: no-eval
    return eval(input);
  } catch (err) {
    return err.toString();
  }
};

export let Game = new Command({
  name: "game",
  about: "Set the current game"
  // owner_only: true
})
  .arg(
    new Arg({
      name: "RESET",
      long: "reset",
      short: "r",
      help: "Resets the game"
    })
  )
  .arg(
    new Arg({
      name: "GAME",
      positional: true,
      take_multiple: true
    })
  )
  .arg(
    new Arg({
      name: "TYPE",
      long: "type",
      short: "t",
      takes_value: true,
      possible_values: ["WATCHING", "PLAYING", "LISTENING", "STREAMING"],
      default: "PLAYING"
    })
  )
  .handler(async (bot, msg, matches) => {
    if (matches.value_of("RESET")) {
      // bot.user.setPresence({ game: {} });
      bot.user.setGame("");
      console.log("reset");
      return CommandResult.Success;
    } else if (matches.value_of("GAME")) {
      const game = (matches.value_of("GAME") as string[]).join(" ");
      const type = matches.value_of("TYPE");
      bot.user.setPresence({ game: { name: game, type: type } });
      return CommandResult.Success;
    } else if (matches.value_of("TYPE")) {
      if (!bot.user.presence.game) {
        return CommandResult.Error;
      }
      const current = bot.user.presence.game.name;
      bot.user.setPresence({
        game: { name: current, type: matches.value_of("TYPE") }
      });
      return CommandResult.Success;
    }

    return CommandResult.SendHelp;
  });
