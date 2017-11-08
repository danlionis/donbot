import * as Discord from 'discord.js';
import { Bot } from '../../';
import { TextCommand } from '../../mixins';
import { ParsedMessage } from '../../types';

export class Game extends TextCommand {

  constructor() {
    super({
      command: "game",
      description: "set the current game",
      help: "game [game]",
      ownerOnly: true,
      aliases: [
        "playing"
      ]
    })
  }
  
  async run(bot: Bot, messsage: Discord.Message, parsedMessage: ParsedMessage) {
    bot.user.setGame(parsedMessage.args.join(" ")).catch(err => console.log(err))
  }
}

export default Game;