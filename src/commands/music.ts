import { Message, VoiceConnection } from "discord.js";
import * as ytdl from "ytdl-core";
import { Bot } from "../";
import { TextCommand } from "../mixins";
import { ParsedMessage, parseYtURL } from "../utils/parser";

const roles = [
  "DJ",
];

export class Join extends TextCommand {

  constructor() {
    super({
      command: "join",
      description: "join your voice channel",
      roles,
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const con = message.guild.voiceConnection;

    if (!message.member.voiceChannel) {
      return message.reply("You have to be in a Voice Channel");
    }
    return message.member.voiceChannel.join();
  }
}

export class Disconenct extends TextCommand {
  constructor() {
    super({
      command: "disconnect",
      description: "disconnects from your channel",
      roles: roles,
      aliases: [
        "dc",
      ],
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const con = message.guild.voiceConnection;
    if (!con) {
      return;
    }
    if (con.player.dispatcher) con.player.dispatcher.end();
    con.disconnect();
  }
}

export class Stop extends TextCommand {
  constructor() {
    super({
      command: "stop",
      description: "stop streaming",
      roles,
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage): Promise<any> {
    const con = message.guild.voiceConnection;

    if (!con) {
      return message.reply("Es konnte keine Verbindung hergestellt werden");
    } else if (con.player.dispatcher) {
      return con.player.dispatcher.end();
    }
  }
}

export class Pause extends TextCommand {
  constructor() {
    super({
      command: "pause",
      description: "pauses stream",
      roles: roles,
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage): Promise<any> {
    const con = message.guild.voiceConnection;

    if (!con) {
      return message.reply("Es konnte keine Verbindung hergestellt werden");
    } else if (con.player.dispatcher) {
      return con.player.dispatcher.pause();
    }
  }
}

export class Resume extends TextCommand {
  constructor() {
    super({
      command: "resume",
      description: "resumes music",
      roles,
      aliases: [
        "unpause",
      ],
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage): Promise<any> {
    const con = message.guild.voiceConnection;

    if (!con) {
      message.reply("Es konnte keine Verbindung hergestellt werden");
    } else if (con.player.dispatcher) {
      con.player.dispatcher.resume();
    }
  }
}

export class Volume extends TextCommand {
  constructor() {
    super({
      command: "volume",
      description: "set the volume from 1-10",
      roles,
      args: [
        { name: "volume", pattern: /[0-10]/ },
        { name: "updown", pattern: /up|down/i },
      ],
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const con = message.guild.voiceConnection;

    if (!con) return;

    const volumeMultiplier = 10;

    let volume: number;

    console.log(parsedMessage.args);

    if (parsedMessage.args.volume.exists) {
      volume = +parsedMessage.args.volume.value;
      con.dispatcher.setVolume(volume / volumeMultiplier);
    } else if (parsedMessage.args.updown.exists) {
      const currvolume = con.dispatcher.volume * volumeMultiplier;
      if (parsedMessage.args.updown.value === "up") {
        volume = currvolume + 1;
      } else {
        volume = currvolume - 1;
      }
      con.dispatcher.setVolume(volume / volumeMultiplier);
    } else if (con.dispatcher) {
      message.reply(`Volume is set to ${con.dispatcher.volume * volumeMultiplier}`);
    }
  }
}

export class Youtube extends TextCommand {
  constructor() {
    super({
      command: "yt",
      aliases: [
        "ytdl",
        "youtube",
      ],
      args: [
        { name: "url", pattern: /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/ },
      ],
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {

    if (!message.member.voiceChannel) {
      return message.reply("you have to join a voice channel first");
    }

    bot.registry.executeCommand("join", bot, message, parsedMessage).then(() => {
      const stream = ytdl(parsedMessage.args.url.value || null);
      message.guild.voiceConnection.playStream(stream);
    });
  }
}
