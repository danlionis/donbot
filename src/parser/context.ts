export class CommandContext<T> {
  private _data: T;
  private timer: NodeJS.Timer;
  private _timer_length: number = 0;
  private _expire_callback: (data: T) => void;

  constructor() {}

  public expire_in(seconds: number, cb?: (data: T) => void) {
    this._timer_length = seconds;
    this._expire_callback = cb;
    this.timer = setTimeout(() => {
      if (this._expire_callback) {
        this._expire_callback(this.data);
      }
      this.reset_data();
    }, this._timer_length * 1000);
  }

  public get data(): T {
    return this._data;
  }

  public set data(d: T) {
    this._data = d;
  }

  public reset_timer() {
    clearTimeout(this.timer);
    this.expire_in(this._timer_length, this._expire_callback);
  }

  public reset() {
    clearTimeout(this.timer);
    this.reset_data();
  }

  public reset_data() {
    this.data = undefined;
  }
}
