export interface ArgConfig {
  name: string;
  help?: string;
  long?: string;
  short?: string;
  takes_value?: boolean;
  positional?: boolean;
  take_multiple?: boolean;
  hidden?: boolean;
  required?: boolean;
  possible_values?: any[];
  default?: any;
  type?: "string" | "number" | "boolean" | "member" | "duration";
}

export class Arg {
  public readonly config: ArgConfig;

  constructor(config: ArgConfig) {
    const default_config: Partial<ArgConfig> = {
      required: false,
      hidden: false,
      takes_value: false,
      type: "string"
    };
    this.config = { ...default_config, ...config };
  }

  public help(help: string): Arg {
    this.config.help = help;
    return this;
  }

  public default(def: any): Arg {
    this.config.default = def;
    return this;
  }

  public possible_values(possible_values: string[]): Arg {
    this.config.possible_values = possible_values;
    return this;
  }

  public required(required: boolean = true): Arg {
    this.config.required = required;
    return this;
  }

  public hidden(hidden: boolean = true): Arg {
    this.config.hidden = hidden;
    return this;
  }

  public long(long: string): Arg {
    this.config.long = long;
    return this;
  }

  public short(short: string): Arg {
    this.config.short = short;
    return this;
  }

  public takes_value(takes_value: boolean = true): Arg {
    this.config.takes_value = takes_value;
    return this;
  }

  public positional(positional: boolean = true): Arg {
    this.config.positional = positional;
    return this;
  }

  public take_multiple(take_multiple: boolean = true): Arg {
    this.config.take_multiple = take_multiple;
    return this;
  }

  public flat_format_length(): number {
    if (this.config.takes_value) {
      return (this.config.long + " <" + this.config.name + ">").length;
    }

    return this.config.long.length;
  }

  public arg_format_length(): number {
    return this.config.name.length + (this.config.take_multiple ? 3 : 0);
  }
}
