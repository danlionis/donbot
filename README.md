# donbot

discord bot framework based on discord.js

- [Features](#Features)
- [Installation](#Installation)
- [Usage](#Usage)
- [First Command](#First_Command)

## Features

- automatic command and argument parsing
- easy permission validation
- persistent datastore
- built-in commands


## Installation

Install donbot via npm

`npm install --save donbot`

## Usage

Import the base client

```js
const { Bot } = require("donbot");
```

Provide the bot with login data and connect. The `Bot` class extends the [discordjs.Client](#https://discord.js.org/#/docs/main/stable/class/Client) so all methods and properties can be found in an bot object. 

```js
const bot = new Bot({
  token: "LOGIN_TOKEN",
  prefix: "+",
  owner: "OWNER_ID",
});

bot.login();
```

`token` is the login token obtained from the [discord dev website](#https://discordapp.com/developers)

`prefix` is the prefix each command must have to be recognized as one. For this example we will pe using `+` as our prefix.

`onwer` is the id of the user who owns the server. This user will always be allowed to execute commands

### First Command

Let's try to make a simple command that replies with the users name

First we have to import the class each command is based on
```js
const { TextCommand } = require("donbot");
```

Then we make a new class extending `TextCommand`.
In the constructor we have to call the `super()` method and pass it an object with command specific arguments

```js
class EchoUsername extends TextCommand {
  constructor() {
    super({
      command: "username"
    });
  }
}
```

The functionality is made with a `run()`. The method takes the bot, the original message and a parsedMessage which has all arguments parsed out of the message and ready to use in your code;

```js
public async run(bot, message, parsedMessage) {
    message.reply(message.member.displayName);
}
```

The full code will look something like this

```js
const { Bot, TextCommand } = require("donbot");

const client = new Bot({
  token: "YOUR_TOKEN",
  prefix: "+",
  owner: "YOUR_ID"
});

client.connect()

class EchoUsername extends TextCommand {
  constructor() {
    super({
      command: "username"
    })
  }

  public async run(bot, message, parsedMessage) {
    message.reply(message.member.displayName);
  }
}
```
