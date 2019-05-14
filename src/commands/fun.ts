import * as cfonts from "cfonts";
import * as Discord from "discord.js";
import fetch from "node-fetch";
import { Arg, Command, CommandResult } from "../parser";
import { can_modify } from "../validator/permission";

export let Random = new Command({
  name: "random",
  about: "Super random command"
}).subcommand(
  new Command({
    name: "user",
    about: "get a random user from the server"
  }).handler((bot, msg, matches) => {
    const rand = msg.guild.members.random();
    msg.reply(rand.toString());
  })
);
export let Font = new Command({
  name: "font",
  about: "Print BIG"
  // permissions: ["MANAGE_MESSAGES"]
})
  .arg(
    new Arg({
      name: "STYLE",
      long: "style",
      short: "s",
      takes_value: true,
      default: "block",
      possible_values: ["block", "shade", "chrome", "simple", "3d", "huge"]
    })
  )
  .arg(
    new Arg({
      name: "INPUT",
      positional: true,
      required: true,
      take_multiple: true,
      help: "Input to transform"
    })
  )
  .handler(async (bot, msg, matches) => {
    const input = (matches.value_of("INPUT") as string[]).join(" ");

    const pretty = cfonts.render(input, {
      font: matches.value_of("STYLE")
    });

    if (pretty.string.length >= 2000) {
      msg.reply("Message to long, cannot send");
      return CommandResult.Failed;
    }

    await msg.channel.send(pretty.string, { code: true });
  });

export let YesNo = new Command({ name: "yesno", about: "Yes or no?" })
  .arg(new Arg({ name: "NOGIF", long: "gif", short: "g", help: "exclude gif" }))
  .handler((bot, msg, matches) => {
    const url = "https://yesno.wtf/api/";
    if (matches.value_of("GIF")) {
      if (Math.random() > 0.5) {
        msg.reply("yes");
      } else {
        msg.reply("no");
      }
    } else {
      fetch(url)
        .then((res) => res.json())
        .then((body) => {
          msg.channel.send(body.answer, { file: body.image });
        });
    }
  });

export let InspiroBot = new Command({
  name: "inspire",
  about: "get some inspiration",
  danger: true
}).handler(async (bot, msg, matches) => {
  fetch("https://inspirobot.me/api?generate=true")
    .then((res) => res.text())
    .then((body) => msg.channel.send(body));
});

export let Yeet = new Command({
  name: "yeet",
  about: "YEET",
  permissions: ["MOVE_MEMBERS"]
})
  .arg(
    new Arg({
      name: "TARGET",
      type: "member",
      positional: true,
      required: true
    })
  )
  .handler(async (bot, msg, matches) => {
    const m = matches.value_of("TARGET") as Discord.GuildMember;

    if (!can_modify(bot, msg.member, m)) {
      return CommandResult.PermissionDenied;
    }

    let channels = bot.channels
      .filter((_c) => _c.type === "voice")
      .array() as Discord.VoiceChannel[];

    channels = channels.filter(
      (_c) =>
        _c.permissionsFor(m).has("CONNECT") &&
        _c.permissionsFor(msg.member).has("CONNECT") &&
        _c.members.array().length === 0
    );

    const c = channels[Math.floor(Math.random() * channels.length)];

    await m.setVoiceChannel(c);
  });
