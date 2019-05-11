import * as Discord from "discord.js";
import fetch from "node-fetch";
import { Arg, Command, CommandResult } from "../parser";
import { can_modify } from "../validator/permission";

export let YesNo = new Command({ name: "yesno", about: "Yes or no?" })
  .arg(new Arg({ name: "GIF", long: "gif", short: "g", help: "include gif" }))
  .handler((bot, msg, matches) => {
    const url = "https://yesno.wtf/api/";
    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        if (matches.value_of("GIF")) {
          msg.channel.send(body.answer, { file: body.image });
        } else {
          msg.reply(body.answer);
        }
      });
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

    m.setVoiceChannel(c);
  });
