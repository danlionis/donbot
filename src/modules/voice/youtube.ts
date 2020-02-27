// import * as ytdl from "ytdl-core-discord";
// import ytdl from "ytdl-core-discord";
import ytdl from "ytdl-core";
import { handle_cmd } from "../../core/command.handler";
import { Module } from "../../core/module";
import { Arg, Command, CommandResult } from "../../parser";

const Youtube = new Command({
  name: "youtube",
  about: "Play a video from youtube",
  aliases: ["yt"],
  role: "DJ"
})
  .arg(
    new Arg({
      name: "URL",
      type: "string",
      help: "URL of the youtube video",
      positional: true,
      required: true
    })
  )
  .handler(async (bot, msg, matches, context) => {
    const res = await handle_cmd(bot, "join", msg, context);
    console.log(res);
    if (res !== CommandResult.Success) {
      return res;
    }

    const url: string = matches.value_of("URL");

    // msg.guild.voiceConnection.dispatcher.pause();

    try {
      const stream = ytdl(url, { filter: "audioonly" });
      // msg.guild.voiceConnection.playStream(await ytdl(url));
      msg.guild.voiceConnection.playStream(stream, { volume: 0.1 });
    } catch (e) {
      msg.reply("could not fetch video");
      return CommandResult.Error;
    }
  });

export const YoutubeModule: Module = {
  name: "youtube",
  commands: [Youtube]
};

export default YoutubeModule;
