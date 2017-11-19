import * as Discord from 'discord.js';
import { Bot } from '../';
import { TextCommand } from '../mixins';
import { ParsedMessage } from '../types';

let roles = [
  "DJ"
]

export class Join extends TextCommand {

  constructor() {
    super({
      command: "join",
      description: "join your voice channel",
      roles: roles
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    let con = bot.getVoiceConnection(message);

    if (!message.member.voiceChannel) {
      return message.reply("You have to be in a Voice Channel")
    }
    if (con && con.channel.id === message.member.voiceChannel.id) {
      return message.reply("The Bot is already connected to your VoiceChannel")
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
        "dc"
      ]
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    let con = bot.getVoiceConnection(message);
    if (!con) {
      return;
    }
    bot.registry.executeCommand("stop", bot, message, parsedMessage);
    con.disconnect();
  }
}

export class Stop extends TextCommand {
  constructor() {
    super({
      command: "stop",
      description: "stop streaming",
      roles: roles
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage): Promise<any> {
    let con = bot.getVoiceConnection(message);

    if (!con) {
      message.reply("Es konnte keine Verbindung hergestellt werden");
    } else if (con.player.dispatcher) {
      con.player.dispatcher.end();
    }
  }
}

export class Pause extends TextCommand {
  constructor() {
    super({
      command: "pause",
      description: "pauses stream",
      roles: roles
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage): Promise<any> {
    let con = bot.getVoiceConnection(message);

    if (!con) {
      message.reply("Es konnte keine Verbindung hergestellt werden");
    } else if (con.player.dispatcher) {
      con.player.dispatcher.pause();
    }
  }
}

export class Resume extends TextCommand {
  constructor() {
    super({
      command: "resume",
      description: "resumes music",
      roles: roles,
      aliases: [
        "unpause"
      ]
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage): Promise<any> {
    let con = bot.getVoiceConnection(message);

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
      roles: roles
    })
  }

  async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage) {
    let con = bot.getVoiceConnection(message);

    if (!con) return;

    let volumeMultiplier = 10
    let volume: number = parsedMessage.args[0];

    if (!volume) {
      message.reply(`Volume is set to ${con.dispatcher.volume * volumeMultiplier}`)
    } else if (volume >= 1 && volume <= volumeMultiplier && con.dispatcher) {
      con.dispatcher.setVolume(volume / volumeMultiplier);
      message.reply(`Changed volume to ${volume}`);
    }
    console.log(volume);
  }
}

