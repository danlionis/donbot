import ytdl from "ytdl-core-discord";
import { handle_cmd } from "../../core/command.handler";
import { Module } from "../../core/module";
import { Arg, Command, CommandResult } from "../../parser";

const Youtube = new Command({
  name: "youtube",
  about: "Play a video from youtube"
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
    if (res !== CommandResult.Success) {
      return res;
    }

    const url = matches.value_of("URL");

    msg.guild.voiceConnection.playOpusStream(await ytdl(url));
  });

export const YoutubeModule: Module = {
  name: "youtube",
  commands: [Youtube]
};

export default YoutubeModule;
