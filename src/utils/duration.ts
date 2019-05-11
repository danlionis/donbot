export class Duration {
  public static readonly SECOND = 1000;
  public static readonly MINUTE = 60 * 1000;
  public static readonly HOUR = 60 * 60 * 1000;
  public static readonly DAY = 24 * 60 * 60 * 1000;

  private _millis = 0;

  constructor(duration: string) {
    let number_str = "";
    let res = 0;

    for (let i = 0; i < duration.length; i++) {
      const c = duration.charAt(i);

      const num = parseInt(c, 10);

      // check if c is a number
      if (num.toString() === c) {
        number_str += c;
        continue;
      }

      let mult = 0;

      switch (c) {
        case "m":
          mult = Duration.MINUTE;
          break;
        case "h":
          mult = Duration.HOUR;
          break;
        case "d":
          mult = Duration.DAY;
          break;
        default:
          mult = Duration.SECOND;
          break;
      }

      res += parseInt(number_str, 10) * mult;
      number_str = "";
    }

    this._millis = res;
  }

  public toString() {
    return this.millis.toString();
  }

  public get millis() {
    return this._millis;
  }
}
