import * as Discord from 'discord.js';
import Command from '../command';

export class Clear extends Command {

  constructor() {
    super();
  }

  static get is() {
    return "clear the window";
  }

  static get command() {
    return "clear"
  }

  static get args() {
    return [
      {
        name: "arg1",
        aliases: [
          "a"
        ]
      }
    ]
  }


  static run() {
    console.log("clear is running");
  }
}

export default Clear;
// export let Clear = {
//   name: "clear",
//   cmd: "",
//   run: (bot: Discord.Client, message: Discord.Message) => {

//   }
// }