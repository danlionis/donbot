const { Bot } = require("./lib");

let client = new Bot();

async function main() {
  await client.login();
}

main();
