export class CommandContext {
  public readonly callstack: string[] = [];

  constructor() {}

  public clone(): CommandContext {
    const cloned = new CommandContext();
    cloned.callstack.push(...this.callstack);
    return cloned;
  }
}
