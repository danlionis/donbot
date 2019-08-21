import * as Discord from "discord.js";
import { Module } from "../../core/module";
import { Arg, ArgConfig, Command, CommandResult } from "../../parser";

const NamespaceArg: ArgConfig = {
  name: "NAMESPACE",
  positional: true,
  required: true,
  type: "string"
};

const KeyArg: ArgConfig = {
  name: "KEY",
  positional: true,
  type: "string"
};

const Get = new Command({ name: "get" })
  .arg(new Arg(NamespaceArg))
  .arg(new Arg(KeyArg))
  .handler(async (bot, msg, matches, values) => {
    const namespace: string = matches.value_of("NAMESPACE");
    const box = await bot.datastore.namespace(namespace);
    const key: string = matches.value_of("KEY");

    let res = "";

    if (key) {
      res = JSON.stringify(await box.get(key), null, 2);
    } else {
      const entries = (await box.entries()).map(([k, v]) => {
        return { key: k, value: v };
      });
      res = JSON.stringify(entries, null, 2);
    }

    msg.reply(res, { code: "json" });
  });

const Set = new Command({ name: "set" })
  .arg(new Arg(NamespaceArg))
  .arg(new Arg({ ...KeyArg, required: true }))
  .arg(
    new Arg({
      name: "VALUE",
      positional: true,
      required: true,
      take_multiple: true
    })
  )
  .arg(
    new Arg({
      name: "JSON",
      long: "json",
      help: "Parse the value as a JSON object"
    })
  )
  .handler(async (bot, msg, matches, values) => {
    const namespace: string = matches.value_of("NAMESPACE");
    const box = await bot.datastore.namespace(namespace);
    const key = matches.value_of("KEY");
    const value: string[] = matches.value_of("VALUE");
    const json: boolean = matches.value_of("JSON");

    let res = value.join("");

    if (json) {
      res = JSON.parse(value.join(""));
    }

    await box.set(key, res);
  });

const Delete = new Command({ name: "delete" })
  .arg(new Arg(NamespaceArg))
  .arg(new Arg({ ...KeyArg, required: true }))
  .handler(async (bot, msg, matches, context) => {
    const namespace: string = matches.value_of("NAMESPACE");
    const box = await bot.datastore.namespace(namespace);
    const key = matches.value_of("KEY");

    const res = await box.delete(key);
    if (!res) {
      return CommandResult.Failed;
    }
  });

const Clear = new Command({ name: "clear" })
  .arg(new Arg(NamespaceArg))
  .handler(async (bot, msg, matches, context) => {
    const namespace: string = matches.value_of("NAMESPACE");
    const box = await bot.datastore.namespace(namespace);

    await box.clear();
  });

const Database = new Command({
  name: "database",
  aliases: ["db"],
  about: "Access the database",
  owner_only: true
})
  .subcommand(Get)
  .subcommand(Set)
  .subcommand(Delete)
  .subcommand(Clear);

export const DatabaseModule: Module = {
  name: "admin",
  commands: [Database]
};

export default DatabaseModule;
