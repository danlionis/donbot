import * as http from "http";
import { handle_cmd } from "../../core/command.handler";
import { Arg, Command, CommandResult } from "../../parser";

export const Unpause = new Command({
  name: "unpause",
  about: "Pauses currently playing song",
  aliases: ["continue", "resume"]
})
  .arg(
    new Arg({
      name: "FORCE",
      long: "force",
      short: "f",
      help: "Force the unpause, even if the bot is not in your voice channel"
    })
  )
  .handler(async (bot, msg, matches) => {
    const connection = msg.guild.voiceConnection;

    if (!connection) {
      return CommandResult.Failed;
    }

    const force: boolean = matches.value_of("FORCE");
    const bot_channel = connection.channel;
    const member_channel = msg.member.voiceChannel;

    if (!force && (!member_channel || bot_channel.id !== member_channel.id)) {
      msg.reply("You have to be in the same voice channel as the bot");
      return CommandResult.Failed;
    }

    if (connection.dispatcher) {
      connection.dispatcher.resume();
    }
    bot.voiceManager.check();
  });

export const Pause = new Command({
  name: "pause",
  about: "Pauses currently playing song",
  aliases: ["stop"]
})
  .arg(
    new Arg({
      name: "FORCE",
      long: "force",
      short: "f",
      help: "Force the pause, even if the bot is not in your voice channel"
    })
  )
  .handler(async (bot, msg, matches) => {
    const connection = msg.guild.voiceConnection;

    if (!connection) {
      return CommandResult.Failed;
    }

    const force: boolean = matches.value_of("FORCE");
    const bot_channel = connection.channel;
    const member_channel = msg.member.voiceChannel;

    if (!force && (!member_channel || bot_channel.id !== member_channel.id)) {
      msg.reply("You have to be in the same voice channel as the bot");
      return CommandResult.Failed;
    }

    connection.dispatcher.pause();
    bot.voiceManager.startTimeout(connection);
  });

export const Disconnect = new Command({
  name: "disconnect",
  about: "Disconnect the bot",
  aliases: ["dc"]
})
  .arg(
    new Arg({
      name: "FORCE",
      long: "force",
      short: "f",
      help: "Force the disconnect, even if the bot is not in your voice channel"
    })
  )
  .handler(async (bot, msg, matches) => {
    const connection = msg.guild.voiceConnection;

    if (!connection) {
      return CommandResult.Failed;
    }

    const force: boolean = matches.value_of("FORCE");
    const bot_channel = connection.channel;
    const member_channel = msg.member.voiceChannel;

    if (!force && (!member_channel || bot_channel.id !== member_channel.id)) {
      msg.reply("You have to be in the same voice channel as the bot");
      return CommandResult.Failed;
    }

    connection.disconnect();
    bot.voiceManager.clearTimeout(connection.channel.guild);
  });

export const Join = new Command({
  name: "join",
  about: "Let the bot join your voice channel"
})
  .arg(
    new Arg({
      name: "FORCE",
      long: "force",
      short: "f",
      help: "Force the join, no matter if the bot is already connected"
    })
  )
  .handler(async (bot, msg, matches) => {
    if (!msg.member.voiceChannel) {
      msg.reply("You have to be in a voice channel to use this command", {
        code: true
      });
      return CommandResult.Failed;
    }

    const force = matches.value_of("FORCE");

    if (force) {
      msg.member.voiceChannel.join();
      return CommandResult.Success;
    }

    if (
      msg.guild.voiceConnection &&
      msg.guild.voiceConnection.channel.id !== msg.member.voiceChannel.id
    ) {
      msg.reply("Already connected to a voice channel");
      return CommandResult.Failed;
    }

    await msg.member.voiceChannel.join();
    bot.voiceManager.clearTimeout(msg.guild);
  });

export const Volume = new Command({
  name: "volume",
  about: "control current volume"
})
  .arg(
    new Arg({
      name: "VOLUME",
      positional: true,
      required: true,
      type: "number",
      default: 10,
      help: "new volume for current connection (in %)"
    })
  )
  .handler(async (bot, msg, matches) => {
    let vol: number = matches.value_of("VOLUME");

    // only allow values between 1 and 10
    vol = Math.max(vol, 1);
    vol = Math.min(vol, 200);

    if (msg.guild.voiceConnection) {
      msg.guild.voiceConnection.dispatcher.setVolume(vol / 100);
    }
  });

export const ILoveRadio = new Command({
  name: "iloveradio",
  about: "play the iloveradio.de livestream",
  aliases: ["ilr", "radio"]
})
  .arg(
    new Arg({
      name: "STREAMNR",
      positional: true,
      help: "Play a specific stream number",
      default: 1,
      type: "number"
    })
  )
  .arg(
    new Arg({
      name: "LIST",
      short: "l",
      long: "list",
      help: "List available streams"
    })
  )
  .arg(
    new Arg({
      name: "FORCE",
      short: "f",
      long: "force",
      help: "Start playing even if bot is already playing"
    })
  )
  .handler(async (bot, msg, matches, context) => {
    const streams = {
      ILOVERADIO: 1,
      DANCE: 2,
      MASHUP: 5,
      DEUTSCHRAP: 6,
      XMAS: 8,
      CHARTS100: 9,
      CHILL: 10,
      USRAP: 13,
      PARTY: 14,
      GREATEST_HITS: 16,
      CLUB: 20,
      HARDSTYLE: 21
    };

    if (matches.value_of("LIST")) {
      let text = "";
      for (const name in streams) {
        if (streams.hasOwnProperty(name)) {
          const element = streams[name];

          text += `${name}: ${element}\n`;
        }
      }

      msg.reply(text, { code: true });
      return CommandResult.Success;
    }

    const force: boolean = matches.value_of("FORCE");
    const res = await handle_cmd(
      bot,
      `join ${force ? "-f" : ""}`,
      msg,
      context
    );
    if (res !== CommandResult.Success) {
      return res;
    }

    const number = matches.value_of("STREAMNR");
    const url = `http://stream01.ilovemusic.de/iloveradio${number}.mp3`;

    return new Promise<CommandResult>((resolve) => {
      const req = http.request(url, { method: "HEAD" }, (response) => {
        if (response.statusCode !== 200) {
          msg.reply(
            "Stream id not found, see https://www.ilovemusic.de/streams for available streams"
          );
          resolve(CommandResult.Failed);
        } else {
          const dispatcher = msg.guild.voiceConnection.playArbitraryInput(url, {
            volume: 0.1
          });

          dispatcher.on("start", () => {
            resolve(CommandResult.Success);
          });
        }
      });

      req.on("error", (err) => {
        resolve(CommandResult.Failed);
      });

      req.end();
    });
  });
