import { Message, VoiceConnection } from "discord.js";
import { Bot } from "../";
import { TextCommand } from "../mixins";
import { ParsedMessage } from "../utils/parser";

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
  private tts: any;
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
          `TTS language is curently set to \`${bot.database.get(
            langKey,
            "de"
          )}\``
        );
      }
    }

    // dynamic import 'google-tts-api'
    try {
      this.tts = await import("google-tts-api");
    } catch (error) {
      console.log(
        "This command requires a peer dependency of 'google-tts-api'!"
      );
      return message.reply(
        "There was an error executing this command. Please look at the log for more information"
      );
    }

    const text = parsedMessage.rawArgs.join(" ");

    if (!text) {
      return message.channel.send("Please provide a message");
    }
    const locale: string = bot.database.get(langKey, "en");
    const url = await this.getTtsUrl(parsedMessage.rawArgs.join(" "), locale);

    const vc: VoiceConnection = await bot.registry.executeCommand(
      "join",
      bot,
      message,
      parsedMessage
    );

    if (vc) {
      const dispatcher = vc.playArbitraryInput(url);
      dispatcher.on("end", (_) => {
        vc.disconnect();
      });
    }
  }

  private async getTtsUrl(text: string, locale: string = "en") {
    text = this.truncateText(text);
    const url = await this.tts(text, locale, 1);
    return url;
  }

  private truncateText(text: string) {
    return text.trim().substr(0, 200);
  }
}
