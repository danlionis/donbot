interface RuntimeConfig {
  aliases: Array<[string, string]>;
  disabled_users: string[];
  disabled_commands: string[];
}

// let x: RuntimeConfig = {
//   aliases: [["a", "b"], ["c", "d"]]
// };
