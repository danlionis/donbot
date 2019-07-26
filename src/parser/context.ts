export class CommandContext {
  public readonly callstack: string[] = [];
  public flags = {
    skip_permission: false
  };

  constructor() {}

  public clone(): CommandContext {
    const cloned = new CommandContext();
    cloned.callstack.push(...this.callstack);
    cloned.flags = { ...this.flags };
    return cloned;
  }
}
