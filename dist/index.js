"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const message_parser_1 = require("./utils/message-parser");
const message_validator_1 = require("./utils/message-validator");
class Rainbot extends Discord.Client {
    constructor() {
        super();
        // this.LOGIN_TOKEN = BOT_TOKEN;
        // this.COMMAND_PREFIX = BOT_CMD_PREFIX;
        // this.login(BOT_TOKEN).then(() => {
        //   console.log(`Bot connected ${this.user.tag}`);
        // }).catch((error) => {
        //   console.log(error);
        // })
        this.on('message', (message) => {
            if (!message_validator_1.default(message))
                return;
            let command = message_parser_1.default(message);
            console.log(command);
        });
    }
    initialize({ BOT_LOGIN_TOKEN }) {
        console.log(BOT_LOGIN_TOKEN);
        this.login(BOT_LOGIN_TOKEN).then((_) => {
            console.log(`Rainbot connected with user ${this.user.tag}`);
        }).catch((err) => {
            console.log(err);
        });
    }
}
exports.Bot = Rainbot;
//# sourceMappingURL=index.js.map