interface CommandContextFlags {
  /**
   * Set this flag to skip permission checks on all following commands
   */
  skip_permission: boolean;
  /**
   * Set this flag to pervent builtin messages to be sent (command could still send messages) (not yet implemented)
   */
  silent: boolean;
  /**
   * Set this flag to prevent following commands to be logged
   */
  no_log: boolean;
}

export class CommandContext {
  public readonly callstack: string[] = [];
  public flags: CommandContextFlags = {
    skip_permission: false,
    silent: false,
    no_log: false
  };

  constructor() {}

  public clone(): CommandContext {
    const cloned = new CommandContext();
    cloned.callstack.push(...this.callstack);
    cloned.flags = { ...this.flags };
    return cloned;
  }

  public cloneWith(flags: Partial<CommandContextFlags>): CommandContext {
    const cloned = new CommandContext();
    cloned.callstack.push(...this.callstack);
    cloned.flags = { ...this.flags, ...flags };
    return cloned;
  }
}
