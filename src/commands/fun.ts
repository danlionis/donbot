import * as Discord from "discord.js";
import { Arg, Command, CommandResult } from "../parser";
import { can_modify } from "../validator/permission";

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
