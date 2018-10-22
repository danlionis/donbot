import {
  Channel,
  GuildMember,
  Message,
  VoiceChannel
} from "discord.js";
import { Bot } from "../";
import { TextCommand } from "../mixins";
import { ParsedMessage } from "../utils/parser";
import { textToSpeech } from "../utils/texttospeech";

export class Yeet extends TextCommand {
  constructor() {
    super({
      command: "yeet",
      group: "fun",
      description: "Get YEETED into a random channel",
      permissions: ["MOVE_MEMBERS"]
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    let members: GuildMember[];
    if (message.mentions.members.array().length > 0) {
      members = message.mentions.members.array();
    } else {
      members = [message.member];
    }

    const channels = bot.channels
      .filter((c) => c.type === "voice")
      .array() as VoiceChannel[];

    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      const c = this.pickChannel(channels);
      const memberCanJoin = c.permissionsFor(m).has("CONNECT");
      const authorCanJoin = c.permissionsFor(message.member).has("CONNECT");

      // no user should yeet a user with a higher rolw
      const authorHigherThanMember =
        m.highestRole.position < message.member.highestRole.position;
      if (!memberCanJoin || !authorCanJoin) {
        // iterate over same index again
        i--;
      } else if (!authorHigherThanMember) {
        message.channel.send("Permission denied");
        continue;
      } else {
        m.setVoiceChannel(c);
      }
    }
  }

  /**
   * Picks a random channel
   * @param channels possible voice channels
   */
  private pickChannel<T extends Channel>(channels: T[]): T {
    const index = Math.floor(Math.random() * channels.length);
    return channels[index];
  }
}

export class MagischeMiesmuschel extends TextCommand {
  private answers: string[] = [
    "Frag doch einfach nochmal...",
    "Ja",
    "Nein",
    "Ich habe deine Frage leider nicht verstanden",
    "Was würde deine Großmutter dazu sagen"
  ];

  constructor() {
    super({
      command: "magischemiesmuschel",
      aliases: ["mm"],
      group: "fun",
      description: "Frag die Magische Miesmuschel etwas"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const index = Math.floor(Math.random() * this.answers.length);
    const text = this.answers[index];
    textToSpeech(bot, message, parsedMessage, text);
    // return message.channel.send(this.answers[index], { tts: true });
  }
}

export class AltF4 extends TextCommand {
  constructor() {
    super({
      command: "altf4",
      description: "surprise",
      permissions: [
        // "DEAFEN_MEMBERS"
      ],
      group: "fun"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    message.member.setDeaf(true);
    message.member.setMute(true);
    setTimeout(() => {
      message.member.setDeaf(false);
      message.member.setMute(false);
    }, 1000 * 60);
  }
}
export class TrollMove extends TextCommand {
  constructor() {
    super({
      command: "nerv",
      description: "Troll move",
      permissions: ["ADMINISTRATOR"],
      group: "fun"
      // minRole: "Mod"
    });
  }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const channels = message.guild.channels
      .filter((c) => c.type === "voice")
      .array();
    const member = message.mentions.members.first() || message.member;

    if (!member.voiceChannel) {
      return message.reply("User has to be connected to a voice channel");
    }

    const voiceChannel = member.voiceChannel;
    channels.push(voiceChannel);

    move();

    function move() {
      const c = channels.shift();

      if (!c) return;

      member.setVoiceChannel(c).then(() => {
        setTimeout(() => {
          move();
        }, 500);
      });
    }
  }
}

export class TextToSpeech extends TextCommand {
  private readonly langKey = "tts.lang";

  constructor() {
    super({
      command: "tts",
      description: "Join your channel and plays the text via TextToSpeech",
      usage: "tts <text>",
      permissions: ["SEND_TTS_MESSAGES"],
      args: [{ name: "lang", pattern: /^[a-z]{2}$/ }],
      flags: [
        {
          name: "lang",
          short: "l",
          long: "lang",
          description: "set the locale code to be used for tts"
        }
      ],
      group: "fun"
    });
  }

  // public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
  //   const langKey = message.guild.id + "." + this.langKey;

  //   if (parsedMessage.flags.lang) {
  //     if (parsedMessage.args.lang.exists) {
  //       bot.database.set(langKey, parsedMessage.args.lang.value);
  //       return message.channel.send(
  //         `TTS language set to \`${parsedMessage.args.lang.value}\``
  //       );
  //     } else {
  //       return message.channel.send(
  //         `TTS language is curently set to \`${bot.database.get(
  //           langKey,
  //           "de"
  //         )}\``
  //       );
  //     }
  //   }

  //   // dynamic import 'google-tts-api'
  //   try {
  //     this.tts = await import("google-tts-api");
  //   } catch (error) {
  //     console.log(
  //       "This command requires a peer dependency of 'google-tts-api'!"
  //     );
  //     return message.reply(
  //       "There was an error executing this command. Please look at the log for more information"
  //     );
  //   }

  //   const text = parsedMessage.rawArgs.join(" ");

  //   if (!text) {
  //     return message.channel.send("Please provide a message");
  //   }
  //   const locale: string = bot.database.get(langKey, "en");
  //   const url = await this.getTtsUrl(parsedMessage.rawArgs.join(" "), locale);

  //   const vc: VoiceConnection = await bot.registry.executeCommand(
  //     "join",
  //     bot,
  //     message,
  //     parsedMessage
  //   );

  //   if (vc) {
  //     console.log("vc", vc.channel.name);
  //     try {
  //       const dispatcher = vc.playArbitraryInput(url);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     // dispatcher.on("end", (_) => {
  //     //   vc.disconnect();
  //     // });
  //   }
  // }

  public async run(bot: Bot, message: Message, parsedMessage: ParsedMessage) {
    const langKey = message.guild.id + "." + this.langKey;

    if (parsedMessage.flags.lang) {
      if (parsedMessage.args.lang.exists) {
        bot.database.set(langKey, parsedMessage.args.lang.value);
        return message.channel.send(
          `TTS language set to \`${parsedMessage.args.lang.value}\``
        );
      } else {
        return message.channel.send(
          `TTS language is curently set to \`${bot.database.get(langKey, {
            defaultValue: "de"
          })}\``
        );
      }
    }

    await textToSpeech(
      bot,
      message,
      parsedMessage,
      parsedMessage.rawArgs.join(" ")
    );
  }
}
