import { handle_cmd } from "../command_handler";
import { Arg, Command, CommandResult } from "../parser";

export let Delay = new Command({
  name: "delay",
  about: "Delays a command vor a given amount of seconds"
})
  .arg(
    new Arg({
      name: "TIME",
      positional: true,
      required: true,
      help: "Time to delay (in seconds)"
    })
  )
  .arg(
    new Arg({
      name: "COMMAND",
      required: true,
      take_multiple: true,
      positional: true,
      help: "Command to execute after the time"
    })
  )
  .handler(async (bot, msg, matches) => {
    const delay_cmd: string[] = matches.value_of("COMMAND") as string[];

    const delay_time: number = parseInt(matches.value_of("TIME"), 10);

    setTimeout(() => {
      handle_cmd(bot, delay_cmd.join(" "), msg);
    }, delay_time * 1000);
  });

export let Echo = new Command({
  name: "echo",
  about: "echos what you said"
})
  .arg(
    new Arg({
      name: "MESSAGE",
      take_multiple: true,
      positional: true,
      help: "Message to echo"
    })
  )
  .handler((bot, msg, matches) => {
    msg.channel.send(
      (matches.value_of("MESSAGE") as string[]).join(" ").substr(0, 1000)
    );
  });

export let Choice = new Command({
  name: "choice",
  about: "Let the bot choose between some options"
})
  .arg(
    new Arg({
      name: "CHOICES",
      positional: true,
      take_multiple: true,
      required: true
    })
  )
  .handler(async (bot, msg, matches) => {
    const options: string[] = matches.value_of("CHOICES");

    if (!options || options.length <= 1) {
      msg.reply("Not enough options");
      return CommandResult.Failed;
    }

    const random = Math.floor(Math.random() * options.length);
    msg.reply("You choice is: " + options[random]);
    return CommandResult.Success;
  });

export let Repeat = new Command({
  name: "repeat",
  about: "Repeats a command for a given amout of times"
})
  .arg(
    new Arg({
      name: "AMOUNT",
      positional: true,
      required: true,
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
  .handler(async (bot, msg, matches) => {
    const repeat_cmd: string[] = matches.value_of("COMMAND") as string[];

    if (repeat_cmd[0] === Repeat.config.name) {
      return CommandResult.Error;
    }

    let repeat_amout: number = parseInt(matches.value_of("AMOUNT") || "1", 10);

    repeat_amout = Math.min(repeat_amout, 20);

    for (let i = 0; i < repeat_amout; i++) {
      let content = repeat_cmd.join(" ");
      content = content.replace("{i}", i.toString());
      content = content.replace("{i+1}", (i + 1).toString());
      const res = await handle_cmd(bot, content, msg);
      if (res > 0) {
        break;
      }
    }
  });
