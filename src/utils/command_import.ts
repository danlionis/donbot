import { Command } from "../parser";

export const getCommandsFromImport = (imp: any): Command[] => {
  const cmds: Command[] = [];

  for (const cmd in imp) {
    if (imp[cmd] instanceof Command) {
      cmds.push(imp[cmd]);
    }
  }

  return cmds;
};
