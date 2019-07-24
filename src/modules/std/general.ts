import { GuildMember } from "discord.js";
import { Module } from "../../core/module";
import { Arg, Command, CommandResult } from "../../parser";

const Ping = new Command({
  name: "ping",
  about: "Check the bot's response time"
}).handler((bot, msg) => {
  msg.reply(bot.ping, { code: true });
});

const Echo = new Command({
  name: "echo",
  about: "Display a line of text"
})
  .arg(
    new Arg({
      name: "REPLY",
      long: "reply",
      short: "r",
      help: "Echo as a reply"
    })
  )
  .arg(
    new Arg({
      name: "DIRECT",
      short: "dm",
      long: "direct",
      takes_value: true,
      help: "Send as a direct message",
      type: "member"
    })
  )
  .arg(
    new Arg({
      name: "MESSAGE",
      take_multiple: true,
      positional: true,
      help: "Message to echo",
      required: true
    })
  )
  .handler(async (bot, msg, matches) => {
    const res = (matches.value_of("MESSAGE") as string[])
      .join(" ")
      .substr(0, 1990);

    if (res.length === 0) {
      msg.reply("Cannot send empty message");
      return CommandResult.Failed;
    }

    if (matches.value_of("DIRECT")) {
      const direct: GuildMember = matches.value_of("DIRECT");
      direct.send(`Message from ${msg.member.toString()}: ${res}`, {
        disableEveryone: true
      });
    } else if (matches.value_of("REPLY")) {
      await msg.reply(res, { disableEveryone: true });
    } else {
      await msg.channel.send(res, { disableEveryone: true });
    }
  });

const Choice = new Command({
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
    msg.reply(options[random], { disableEveryone: true });
    return CommandResult.Success;
  });

export const GeneralModule: Module = {
  name: "general",
  commands: [Choice, Echo, Ping]
};

export default GeneralModule;
