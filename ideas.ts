interface Base {
  index?: number;
  about?: string;
}

class Bot {
  private commands: Command[] = [];

  constructor(public botid: number) {}

  public register_cmds(...cmds: Command[]) {
    this.commands.push(...cmds);
  }

  public parse_msg(msg: string) {
    let parts = msg.split(" ");

    let is = parts[0];
    console.log(parts);

    let cmd = this.find_cmd(is);
    if (cmd) {
      console.log(cmd.base.about);
    } else {
      console.log("Command not found");
    }
  }

  public find_cmd(is: string): Command {
    return this.commands.find((c) => c.is === is);
  }

  // public run(cmd: Command) {
  //   cmd.exec_fn(this);
  // }

  public test() {
    console.log("test from bot");
  }
}

class Arg {
  private _name: string;
  private _index: number;

  constructor(name: string) {
    this._name = name;
  }

  public index(index: number): Arg {
    this._index = index;
    return this;
  }
}

type ExecFn = (bot: Bot, matches?: string[]) => string | void;

class Command {
  public base: Base = {};
  private _about: string;
  private args: Arg[] = [];
  private _exec_fn: ExecFn;

  constructor(public readonly is: string) {}

  public about(about: string): Command {
    this.base.about = about;
    return this;
  }

  public arg(arg: Arg): Command {
    this.args.push(arg);
    return this;
  }

  public exec(fn: ExecFn): Command {
    // fn();
    this._exec_fn = fn;
    return this;
  }

  public run(bot: Bot, message: string) {
    this.exec_fn(bot);
  }

  public get exec_fn(): ExecFn {
    return this._exec_fn;
  }
}

let test = new Command("test")
  .about("this is a test command")
  .arg(new Arg("pos1").index(1))
  .exec((bot) => {
    bot.test();
  });

let help = new Command("help")
  .about("this is a help command")
  .arg(new Arg("irgendwas"))
  .exec((bot) => {
    console.log(bot.find_cmd("help"));
  });

let b = new Bot(2);
b.register_cmds(test, help);
// b.run(test);
b.parse_msg("help was geht");
