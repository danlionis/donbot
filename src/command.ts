export class Command {

  constructor() {
    console.log("constructor of a command");
  }

  static get is(): string {
    return null;
  }

  static get command(): string {
    return undefined;
  }

}

export default Command;