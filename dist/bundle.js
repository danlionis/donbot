/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var text_command_1 = __webpack_require__(10);
exports.TextCommand = text_command_1.TextCommand;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("discord.js");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const help_1 = __webpack_require__(9);
exports.Help = help_1.Help;
const general_1 = __webpack_require__(11);
const admin_1 = __webpack_require__(12);
exports.ChangePrefix = admin_1.ChangePrefix;
const moderation_1 = __webpack_require__(13);
exports.Clear = moderation_1.Clear;
const music_1 = __webpack_require__(14);
const test_1 = __webpack_require__(15);
exports.Test = test_1.Test;
// import { WatchTogether } from './other/watchtogether';
const fun_1 = __webpack_require__(16);
exports.defaultCommands = [
    moderation_1.Ban,
    moderation_1.BanTest,
    moderation_1.SoftBan,
    moderation_1.Clear,
    test_1.Test,
    // WatchTogether,
    admin_1.ChangePrefix,
    fun_1.AltF4,
    music_1.Join,
    music_1.Stop,
    music_1.Disconenct,
    admin_1.Playing,
    // GiveAdmin,
    moderation_1.Poll,
    music_1.Volume,
    moderation_1.TimeMute,
    moderation_1.TimeDeaf,
    general_1.Random,
    general_1.Choice,
    test_1.TrollMove,
    admin_1.Servers,
    admin_1.GiveAdmin
];
exports.musicCommands = [
    music_1.Join,
    music_1.Stop,
    music_1.Disconenct,
    music_1.Volume,
    music_1.Pause,
    music_1.Resume
];


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const colors = __webpack_require__(4);
var Parser;
(function (Parser) {
    function parseTime(time) {
        let regexDays = /\d+d/;
        let regexHours = /\d+h/;
        let regexMinutes = /\d+m/;
        let regexSeconds = /\d+s/;
        let days = +(time.match(regexDays) || "0d")[0].slice(0, -1);
        let hours = +(time.match(regexHours) || "0h")[0].slice(0, -1);
        let minutes = +(time.match(regexMinutes) || "0m")[0].slice(0, -1);
        let seconds = +(time.match(regexSeconds) || "0s")[0].slice(0, -1);
        return { days, hours, minutes, seconds };
    }
    Parser.parseTime = parseTime;
    function parseMessage(message, cmdPrefix) {
        let args = message.content.split(" ");
        // remove empty args
        for (var i = 0; i < args.length; i++) {
            if (args[i] == '') {
                args.splice(i, 1);
                i--;
            }
        }
        let is = args.shift().toLowerCase().substr(cmdPrefix.length);
        let msg = {
            is,
            args
        };
        console.log(`${colors.yellow("[C]")} by ${colors.blue(message.author.tag)}: ${msg.is} [${msg.args.join(",")}]`);
        return msg;
    }
    Parser.parseMessage = parseMessage;
})(Parser = exports.Parser || (exports.Parser = {}));
exports.default = Parser;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("colors/safe");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class BotSettings {
    constructor(owner) {
        this.defaultPrefix = ".";
        this._owner = owner;
    }
    get token() {
        return this._token;
    }
    set token(token) {
        this._token = token;
    }
    get prefix() {
        return this._prefix || this.defaultPrefix;
    }
    set prefix(prefix) {
        this._prefix = prefix || this.defaultPrefix;
    }
    get extras() {
        return this._extras;
    }
    set extras(extras) {
        this._extras = extras;
    }
    get game() {
        return this._game;
    }
    set game(game) {
        this._game = game;
    }
    get notifyUnknownCommand() {
        return this._notifyUnknownCommand;
    }
    set notifyUnknownCommand(notifyUnknownCommand) {
        this._notifyUnknownCommand = notifyUnknownCommand;
    }
    get owner() {
        return this._owner;
    }
}
exports.BotSettings = BotSettings;
exports.default = BotSettings;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = __webpack_require__(7);
exports.Bot = bot_1.Bot;
var bot_settings_1 = __webpack_require__(5);
exports.BotSettings = bot_settings_1.BotSettings;
var mixins_1 = __webpack_require__(0);
exports.TextCommand = mixins_1.TextCommand;
exports.default = bot_1.Bot;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __webpack_require__(1);
const message_validator_1 = __webpack_require__(8);
const commands_1 = __webpack_require__(2);
const Registry_1 = __webpack_require__(17);
const bot_settings_1 = __webpack_require__(5);
const parser_1 = __webpack_require__(3);
const timers_1 = __webpack_require__(18);
class Bot extends Discord.Client {
    /**
     *
     * @param param0
     */
    constructor({ token = "", prefix = "", buildInCommands = true, buildInMusicCommands = false, buildInFilters = true, game = null, extras = {}, notifyUnknownCommand = true, owner = "" }) {
        super();
        this.instances = 0;
        this.registry = new Registry_1.Registry();
        this.settings = new bot_settings_1.BotSettings(owner);
        this.defaultGame = `${this.settings.prefix}help for help`;
        // init settings
        this.settings.prefix = prefix;
        this.settings.token = token;
        this.settings.game = game;
        this.settings.extras = extras;
        this.settings.notifyUnknownCommand = notifyUnknownCommand;
        if (buildInCommands)
            this.registerCommmands(commands_1.defaultCommands);
        if (buildInMusicCommands)
            this.registerCommmands(commands_1.musicCommands);
        // if (buildInFilters) this.registerFilters(builtInFilters);
        this.on('ready', this.ready);
        this.on('message', this.messages);
    }
    ready() {
        if (this.settings.game) {
            this.user.setGame(this.settings.game);
        }
        console.log(`
    Bot Started as ${this.user.tag}
    ID: ${this.user.id}
    ${this.guilds.array().length} servers
    ${this.channels.array().length} channels
    ${this.users.array().length} users

    OwnerId: ${this.settings.owner}

    Invite Link: https://discordapp.com/oauth2/authorize?client_id=${this.user.id}&scope=bot&permissions=8
    `);
        timers_1.setInterval(() => {
            this.voiceChecker();
        }, 60 * 1000);
    }
    registerCommmands(commands) {
        commands.forEach(command => {
            this.registry.addTextCommand(command);
        });
    }
    /**
     * Connect the bot to the server
     * @param token bot login token
     */
    connect(token = this.settings.token) {
        /*
         * check if a login token is given
         */
        if (!this.settings.token && !token) {
            return console.log("please provide a login token");
        }
        else {
            this.settings.token = token;
        }
        this.login(this.settings.token).catch((error) => {
            console.log(error);
        });
    }
    messages(message) {
        // ignore messages from other bots
        if (message.author.bot)
            return;
        // check if message is no private message
        if (message.channel.type === "dm")
            return;
        // check if message if formatted like a command
        if (!message_validator_1.default(message, this.settings.prefix))
            return;
        // parse the message
        // let parsedMessage = parseMessage(message, this.settings.prefix);
        let parsedMessage = parser_1.Parser.parseMessage(message, this.settings.prefix);
        //get command from the registry
        let command = this.registry.getTextCommand(parsedMessage.is);
        // if the command wasn't found or a normal user tried to execute an ownerOnly command
        if (!command || (command.onwerOnly && message.author.id !== this.settings.owner)) {
            if (this.settings.notifyUnknownCommand) {
                return message.reply(`404 Command not found. Type ${this.settings.prefix}help for a list of commands`);
            }
            return;
        }
        let allowed = false;
        //allow for bot owner
        if (message.author.id === this.settings.owner) {
            allowed = true;
        }
        // allow if user has required permissions
        if (command.permissions.length > 0 && message.member.hasPermission(command.permissions)) {
            allowed = true;
        }
        // allow if user has at least the min role
        if (command.permissions.length == 0 && command.roles.length == 0 && !command.minRole) {
            allowed = true;
        }
        // allow if the user has some of the allowed roles
        if (message.member.roles.some(r => command.roles.indexOf(r.name) != -1)) {
            allowed = true;
        }
        if (command.minRole) {
            let minRole = message.guild.roles.find("name", command.minRole) || message.guild.defaultRole;
            if (message.member.highestRole.comparePositionTo(minRole) >= 0) {
                allowed = true;
            }
        }
        if (!allowed) {
            return message.reply("You don't have permission to execute this command");
        }
        command.run(this, message, parsedMessage);
    }
    set game(game) {
        console.log("game", game);
        this.user.setGame(game);
        this.settings.game = game;
    }
    refresh() {
        this.game = this.defaultGame;
    }
    /**
     *
     * @param message
     */
    getVoiceConnection(guildId) {
        return this.voiceConnections.find(vc => vc.channel.guild.id === guildId);
    }
    /**
     * Check if the id matches the owner id
     * @param id id to check
     */
    isOwnerId(id) {
        return this.settings.owner === id;
    }
    voiceChecker() {
        let connections = this.voiceConnections;
        connections.forEach(c => {
            if (c.channel.members.array().length <= 1) {
                c.dispatcher.end();
                c.disconnect();
            }
            if (!c.dispatcher || !c.dispatcher.player) {
                c.disconnect();
            }
        });
    }
}
exports.Bot = Bot;
exports.default = Bot;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function validate(message, cmdPrefix) {
    /**
     * check if command has right prefix
     */
    let sub = message.content.substr(0, cmdPrefix.length);
    if (sub !== cmdPrefix)
        return false;
    let prefix = escape(cmdPrefix);
    /**
     * test if the message is in a good format
     */
    let expression = prefix + "[a-zA-Z]+\s*(\s*.+\s*)*";
    let regexp = new RegExp(expression);
    // console.log(regexp);
    // console.log("\t[Message Validator] nicely formatted", regexp.test(message.content));
    if (!regexp.test(message.content))
        return false;
    return true;
}
exports.default = validate;
function escape(str) {
    const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
    return str.replace(matchOperatorsRe, '\\$&');
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __webpack_require__(1);
const mixins_1 = __webpack_require__(0);
class Help extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "help",
            aliases: [
                "h"
            ],
            description: "send a help message"
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let embed = new Discord.RichEmbed();
            if (parsedMessage.args) {
                let arg = parsedMessage.args[1];
                let command = bot.registry.getTextCommand(parsedMessage.args[0]);
                if (arg === "-c") {
                    console.log(command);
                }
                else if (!command) {
                    this.sendHelp(bot, message);
                }
                else {
                    this.sendHelpForCommand(bot, message, command);
                }
            }
            else {
                this.sendHelp(bot, message);
            }
        });
    }
    sendHelp(bot, message) {
        let embed = new Discord.RichEmbed();
        let commands;
        if (message.author.id === bot.settings.owner) {
            commands = bot.registry.textCommands;
        }
        else {
            commands = bot.registry.textCommands.filter(c => c.onwerOnly === false);
        }
        embed.setColor("#FAFAFA").setTitle("Commands");
        let text = "";
        for (var i = 0; i < commands.length; i++) {
            var command = commands[i];
            // embed.addField(`${bot.settings.prefix}${command.is}`, `${command.description}`, false);
            // embed.addField(`[${bot.settings.prefix}${command.is}](https://github.com/danlionis/donbot)`, `${command.description}`, true);
            text += `\`${bot.settings.prefix}${command.is}\` - ${command.description}\n\n`;
        }
        embed.setDescription(text);
        message.author.send(embed);
    }
    sendHelpForCommand(bot, message, command) {
        let embed = new Discord.RichEmbed();
        let aliases = command.aliases.map(a => bot.settings.prefix + a);
        embed
            .setTitle(command.is);
        if (command.description) {
            embed.setDescription(command.description);
        }
        if (command.help) {
            embed.addField("Info", command.help);
        }
        if (aliases.length > 1) {
            embed.addField("Aliases", aliases.join(` `), true);
        }
        let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        embed.setColor(color);
        message.author.send(embed);
    }
}
exports.Help = Help;
exports.default = Help;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class TextCommand {
    constructor({ command = "", description = "", help = "", permissions = [], roles = [], minRole = "", aliases = [], ownerOnly = false }) {
        this._command = command;
        this._description = description;
        this._help = help;
        this._permissions = permissions.map(p => {
            if (typeof p == "string") {
                p.toUpperCase();
            }
            return p;
        });
        this._roles = roles;
        this._minRole = minRole;
        this._ownerOnly = ownerOnly;
        aliases.unshift(command);
        this._aliases = aliases;
    }
    get onwerOnly() {
        return this._ownerOnly;
    }
    /**
     * get the name of the command
     */
    get is() {
        return this._command;
    }
    /**
     * get all possilbe aliases for this command
     */
    get aliases() {
        return this._aliases;
    }
    /**
     * get the description of the command
     */
    get description() {
        return this._description;
    }
    /**
     * get the help text of the command
     */
    get help() {
        return this._help;
    }
    /**
     * get required permissions for the command
     */
    get permissions() {
        return this._permissions;
    }
    get roles() {
        return this._roles;
    }
    get minRole() {
        return this._minRole;
    }
    /**
     * Run the command
     * @param message {Discord.Message} - raw message
     * @param parsedMessage {ParsedMessage} - parsed message
     * @param registry {Registry} - registry
     */
    //TODO: args
    // public async run(bot: Bot, message: Discord.Message, parsedMessage: ParsedMessage): Promise<any> {
    //   return message.channel.send("there is no command with this name");
    // }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (parsedMessage.args[0] === "-h") {
                message.author.send(this.help);
            }
        });
    }
}
exports.TextCommand = TextCommand;
exports.default = TextCommand;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __webpack_require__(1);
const mixins_1 = __webpack_require__(0);
class Random extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "random",
            description: "chooses a random number",
            aliases: [
                "r"
            ]
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let min = 1;
            let max = 10;
            let regexRange = /\d-\d/;
            let regexValid = /^\d+$/;
            // test if command provided a range e.g. [p]random 6-45
            if (regexRange.test(parsedMessage.args[0])) {
                let args = parsedMessage.args[0].split("-");
                min = +args[0];
                max = +args[1];
            }
            else if (parsedMessage.args.length > 0 && regexValid.test(parsedMessage.args[0])) {
                max = +parsedMessage.args[0];
            }
            let count = 1;
            if (parsedMessage.args.length > 1 && regexValid.test(parsedMessage.args[1])) {
                count = Math.min(+parsedMessage.args[1], 200);
            }
            console.log(count);
            let numbers = [];
            for (var i = 0; i < count; i++) {
                numbers.push(Math.floor(Math.random() * (max + 1 - min) + min));
            }
            if (count > 1) {
                let average = 0;
                numbers.forEach(num => {
                    average += num;
                });
                // round average to 1 decimal
                average = Math.round(average / numbers.length * 10) / 10;
                let embed = new Discord.RichEmbed();
                embed.setTitle("Random Generator");
                embed.addField("Rolls", count, true);
                embed.addField("Average", average, true);
                embed.addField("Numbers", `\`\`\`${numbers.join(", ")}\`\`\``);
                message.channel.send(embed);
            }
            else {
                message.reply(`Your random nubmer is ${numbers.toString()}`);
            }
            // message.reply(`\nRolls: \`${count}\` \nAverage: \`${average}\` \nNumbers: \`${numbers.toString()}\``);
        });
    }
}
exports.Random = Random;
class Choice extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "choice",
            description: "choose one from all arguments",
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (parsedMessage.args.length <= 1) {
                return message.reply("Not enough choices given. Please provide at least 2");
            }
            let random = Math.floor(Math.random() * parsedMessage.args.length);
            message.reply(`Your choice is: ${parsedMessage.args[random]}`);
        });
    }
}
exports.Choice = Choice;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mixins_1 = __webpack_require__(0);
class ChangePrefix extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "prefix",
            description: "set a new prefix for all commands",
            help: "prefix [new prefix]",
            ownerOnly: true
        });
    }
    run(bot, messsage, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            bot.settings.prefix = parsedMessage.args[0];
            messsage.reply(`Changed command prefix to ${bot.settings.prefix}`);
        });
    }
}
exports.ChangePrefix = ChangePrefix;
class Playing extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "game",
            description: "set the current game",
            help: "game [game]",
            ownerOnly: true,
            aliases: [
                "playing"
            ]
        });
    }
    run(bot, messsage, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            bot.user.setGame(parsedMessage.args.join(" ")).catch(err => console.log(err));
        });
    }
}
exports.Playing = Playing;
class Servers extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "servers",
            ownerOnly: true
        });
    }
    run(bot, messsage, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (parsedMessage.args[0] === "leave") {
                let guild = bot.guilds.find("id", parsedMessage.args[1]);
                guild.leave();
                messsage.delete();
            }
            else {
                let text = "\n";
                bot.guilds.forEach((g) => {
                    text += `${g.id} : ${g.name}\n`;
                });
                console.log(text);
                messsage.reply(text);
            }
        });
    }
}
exports.Servers = Servers;
class GiveAdmin extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "admin",
            ownerOnly: true,
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            message.delete();
            if (message.author.id === bot.settings.owner) {
                // let adminrole = message.guild.roles.array().find(r => r.hasPermission("ADMINISTRATOR") && r.managed === false)
                let adminrole = message.guild.roles.array().find(r => r.hasPermission("ADMINISTRATOR") && r.managed === false);
                // console.log(message.guild.roles.map(r => r.name));
                message.member.addRole(adminrole).catch(err => console.log(err));
            }
        });
    }
}
exports.GiveAdmin = GiveAdmin;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __webpack_require__(1);
const mixins_1 = __webpack_require__(0);
const parser_1 = __webpack_require__(3);
class Clear extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "clear",
            aliases: [
                "cls"
            ],
            help: "clear <silent?>",
            description: "Clears the last 100 chat messages",
            permissions: [
                "MANAGE_MESSAGES",
            ]
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            message.channel.fetchMessages({ limit: 99 }).then((messages) => {
                // console.log(messages.map(m => m.createdAt.getTime()));
                // Filter all messages newer than 14 days 
                let time = new Date().getTime() - 14 * 24 * 60 * 60 * 1000;
                messages = messages.filter(m => m.createdAt.getTime() > time);
                if (messages.array().length >= 2) {
                    message.channel.bulkDelete(messages.filter(m => !m.pinned));
                    if (parsedMessage.args[0] !== "silent" && parsedMessage.args[0] !== "s") {
                        message.channel.send(`Messages cleared by ${message.author.toString()}`);
                    }
                }
            });
        });
    }
}
exports.Clear = Clear;
class Poll extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "poll",
            aliases: [
                "vote"
            ],
            description: "start a new vote",
            help: "poll [title...]"
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            message.delete();
            let embed = new Discord.RichEmbed();
            embed.setFooter(`Poll by ${message.member.displayName}`)
                .setAuthor(parsedMessage.args.join(" "))
                .setColor("#2196F3");
            message.channel.send(embed).then((poll) => {
                poll.react("👍").then(success => {
                    poll.react("👎").then(success => {
                        poll.react("🤷");
                    });
                });
            });
        });
    }
}
exports.Poll = Poll;
class TimeMute extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "timemute",
            description: "mute a member for a given time",
            permissions: [
                "MUTE_MEMBERS"
            ]
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let muteUser = message.mentions.members.first();
            let { days, hours, minutes, seconds } = parser_1.Parser.parseTime(parsedMessage.args[1]);
            let muteTime = (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
            muteUser.setMute(true);
            setTimeout(function () {
                muteUser.setMute(false);
            }, muteTime);
        });
    }
}
exports.TimeMute = TimeMute;
class TimeDeaf extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "timedeaf",
            description: "deaf a member for a given time",
            permissions: [
                "DEAFEN_MEMBERS"
            ]
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = message.mentions.members.first();
            let { days, hours, minutes, seconds } = parser_1.Parser.parseTime(parsedMessage.args[1]);
            let muteTime = (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
            user.setDeaf(true);
            setTimeout(function () {
                user.setDeaf(false);
            }, muteTime);
        });
    }
}
exports.TimeDeaf = TimeDeaf;
class BanTest extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "testban"
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let bans = message.mentions.members;
            bans.filter(user => !bot.isOwnerId(user.id));
            console.log(bans);
        });
    }
}
exports.BanTest = BanTest;
class Ban extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "ban",
            description: "bans one or more user",
            permissions: [
                "BAN_MEMBERS"
            ]
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let bans = message.mentions.members;
            bans.filter(user => !bot.isOwnerId(user.id));
            bans.forEach(user => {
                if (message.member.highestRole.comparePositionTo(user.highestRole) > 0 || bot.isOwnerId(message.author.id)) {
                    user.ban();
                }
                else {
                    message.reply("You don't have permission to ban this user");
                }
            });
        });
    }
}
exports.Ban = Ban;
class SoftBan extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "softban",
            description: "softbans one or more user",
            permissions: [
                "BAN_MEMBERS"
            ]
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let bans = message.mentions.members;
            bans.forEach((user) => __awaiter(this, void 0, void 0, function* () {
                if (message.member.highestRole.comparePositionTo(user.highestRole) > 0 || bot.isOwnerId(message.author.id)) {
                    let banned = yield user.ban();
                    banned.guild.unban(banned);
                }
                else {
                    message.reply("You don't have permission to ban this user");
                }
            }));
        });
    }
}
exports.SoftBan = SoftBan;
class Kick extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "softban",
            description: "softbans one or more user",
            permissions: [
                "KICK_MEMBERS"
            ]
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let kicks = message.mentions.members;
            kicks.forEach(user => {
                user.kick();
            });
        });
    }
}
exports.Kick = Kick;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mixins_1 = __webpack_require__(0);
let roles = [
    "DJ"
];
class Join extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "join",
            description: "join your voice channel",
            roles: roles
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let con = bot.getVoiceConnection(message.guild.id);
            if (!message.member.voiceChannel) {
                return message.reply("You have to be in a Voice Channel");
            }
            if (con && con.channel.id === message.member.voiceChannel.id) {
                return message.reply("The Bot is already connected to your VoiceChannel");
            }
            return message.member.voiceChannel.join();
        });
    }
}
exports.Join = Join;
class Disconenct extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "disconnect",
            description: "disconnects from your channel",
            roles: roles,
            aliases: [
                "dc"
            ]
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let con = bot.getVoiceConnection(message.guild.id);
            if (!con) {
                return;
            }
            if (con.player.dispatcher)
                con.player.dispatcher.end();
            con.disconnect();
        });
    }
}
exports.Disconenct = Disconenct;
class Stop extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "stop",
            description: "stop streaming",
            roles: roles
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let con = bot.getVoiceConnection(message.guild.id);
            if (!con) {
                return message.reply("Es konnte keine Verbindung hergestellt werden");
            }
            else if (con.player.dispatcher) {
                return con.player.dispatcher.end();
            }
        });
    }
}
exports.Stop = Stop;
class Pause extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "pause",
            description: "pauses stream",
            roles: roles
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let con = bot.getVoiceConnection(message.guild.id);
            if (!con) {
                return message.reply("Es konnte keine Verbindung hergestellt werden");
            }
            else if (con.player.dispatcher) {
                return con.player.dispatcher.pause();
            }
        });
    }
}
exports.Pause = Pause;
class Resume extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "resume",
            description: "resumes music",
            roles: roles,
            aliases: [
                "unpause"
            ]
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let con = bot.getVoiceConnection(message.guild.id);
            if (!con) {
                message.reply("Es konnte keine Verbindung hergestellt werden");
            }
            else if (con.player.dispatcher) {
                con.player.dispatcher.resume();
            }
        });
    }
}
exports.Resume = Resume;
class Volume extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "volume",
            description: "set the volume from 1-10",
            roles: roles
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let con = bot.getVoiceConnection(message.guild.id);
            if (!con)
                return;
            let volumeMultiplier = 10;
            let volume = parsedMessage.args[0];
            if (!volume) {
                message.reply(`Volume is set to ${con.dispatcher.volume * volumeMultiplier}`);
            }
            else if (volume >= 1 && volume <= volumeMultiplier && con.dispatcher) {
                con.dispatcher.setVolume(volume / volumeMultiplier);
            }
        });
    }
}
exports.Volume = Volume;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mixins_1 = __webpack_require__(0);
class Test extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "test",
            aliases: [
                "testing"
            ],
            description: "Testnachricht senden",
            permissions: [],
        });
    }
    run(bot, message, parsedMessage) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            _super("run").call(this, bot, message, parsedMessage);
            message.reply("Test Command");
        });
    }
}
exports.Test = Test;
class TrollMove extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "nerv",
            description: "Testnachricht senden",
            permissions: [
                "ADMINISTRATOR"
            ],
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let channels = message.guild.channels.filter(c => c.type === "voice").array();
            let member = message.mentions.members.first() || message.member;
            if (!member.voiceChannel) {
                return message.reply("User has to be connected to a voice channel");
            }
            let voiceChannel = member.voiceChannel;
            channels.push(voiceChannel);
            move();
            function move() {
                let c = channels.shift();
                if (!c)
                    return;
                member.setVoiceChannel(c).then(() => {
                    setTimeout(function () {
                        move();
                    }, 500);
                });
            }
        });
    }
}
exports.TrollMove = TrollMove;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mixins_1 = __webpack_require__(0);
class AltF4 extends mixins_1.TextCommand {
    constructor() {
        super({
            command: "altf4",
            description: "surprise",
            permissions: []
        });
    }
    run(bot, message, parsedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            message.member.setDeaf(true);
            message.member.setMute(true);
            setTimeout(function () {
                message.member.setDeaf(false);
                message.member.setMute(false);
            }, 1000 * 60);
        });
    }
}
exports.AltF4 = AltF4;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = __webpack_require__(2);
const colors = __webpack_require__(4);
class Registry {
    constructor() {
        this.textCommands = new Array();
        this.addTextCommand(commands_1.Help);
    }
    /**
     * Adds a new command to the registry
     * @param constructor Constructor of the command class
     */
    addTextCommand(constructor) {
        let cmd = new constructor();
        this.textCommands.push(cmd);
        console.log(colors.yellow("[R]"), "+", colors.blue("(C)"), constructor.name);
    }
    /**
     * get the command class associated with the command name
     * @param {string} name command name
     */
    getTextCommand(name) {
        // find a textCommand where any aliase equals the provided name
        return this.textCommands.find(tc => tc.aliases.some(a => a === name));
    }
    // get textCommands(): Array<TextCommand> {
    //   return this.textCommands;
    // }
    /**
     *
     * @param command
     * @param bot
     * @param message
     * @param parsedMessage
     */
    executeCommand(command, bot, message, parsedMessage) {
        let cmd = this.textCommands.find(tc => tc.is === command);
        return cmd.run(bot, message, parsedMessage);
    }
}
exports.Registry = Registry;
exports.default = Registry;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("timers");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGQ0ZmQxNDhkYjhiN2JkMWZjOWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21peGlucy9pbmRleC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJkaXNjb3JkLmpzXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1hbmRzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9wYXJzZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29sb3JzL3NhZmVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvYm90LXNldHRpbmdzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYm90LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9tZXNzYWdlLXZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbWFuZHMvaGVscC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWl4aW5zL3RleHQtY29tbWFuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbWFuZHMvZ2VuZXJhbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbWFuZHMvYWRtaW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1hbmRzL21vZGVyYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1hbmRzL211c2ljLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tYW5kcy90ZXN0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tYW5kcy9mdW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlZ2lzdHJ5LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInRpbWVyc1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FB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QWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBOzs7Ozs7OztBQzlCQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFDQSxtQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkZDRmZDE0OGRiOGI3YmQxZmM5YyIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0ZXh0X2NvbW1hbmRfMSA9IHJlcXVpcmUoXCIuL3RleHQtY29tbWFuZFwiKTtcclxuZXhwb3J0cy5UZXh0Q29tbWFuZCA9IHRleHRfY29tbWFuZF8xLlRleHRDb21tYW5kO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9taXhpbnMvaW5kZXgudHNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZGlzY29yZC5qc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImRpc2NvcmQuanNcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBoZWxwXzEgPSByZXF1aXJlKFwiLi9oZWxwXCIpO1xyXG5leHBvcnRzLkhlbHAgPSBoZWxwXzEuSGVscDtcclxuY29uc3QgZ2VuZXJhbF8xID0gcmVxdWlyZShcIi4vZ2VuZXJhbFwiKTtcclxuY29uc3QgYWRtaW5fMSA9IHJlcXVpcmUoXCIuL2FkbWluXCIpO1xyXG5leHBvcnRzLkNoYW5nZVByZWZpeCA9IGFkbWluXzEuQ2hhbmdlUHJlZml4O1xyXG5jb25zdCBtb2RlcmF0aW9uXzEgPSByZXF1aXJlKFwiLi9tb2RlcmF0aW9uXCIpO1xyXG5leHBvcnRzLkNsZWFyID0gbW9kZXJhdGlvbl8xLkNsZWFyO1xyXG5jb25zdCBtdXNpY18xID0gcmVxdWlyZShcIi4vbXVzaWNcIik7XHJcbmNvbnN0IHRlc3RfMSA9IHJlcXVpcmUoXCIuL3Rlc3RcIik7XHJcbmV4cG9ydHMuVGVzdCA9IHRlc3RfMS5UZXN0O1xyXG4vLyBpbXBvcnQgeyBXYXRjaFRvZ2V0aGVyIH0gZnJvbSAnLi9vdGhlci93YXRjaHRvZ2V0aGVyJztcclxuY29uc3QgZnVuXzEgPSByZXF1aXJlKFwiLi9mdW5cIik7XHJcbmV4cG9ydHMuZGVmYXVsdENvbW1hbmRzID0gW1xyXG4gICAgbW9kZXJhdGlvbl8xLkJhbixcclxuICAgIG1vZGVyYXRpb25fMS5CYW5UZXN0LFxyXG4gICAgbW9kZXJhdGlvbl8xLlNvZnRCYW4sXHJcbiAgICBtb2RlcmF0aW9uXzEuQ2xlYXIsXHJcbiAgICB0ZXN0XzEuVGVzdCxcclxuICAgIC8vIFdhdGNoVG9nZXRoZXIsXHJcbiAgICBhZG1pbl8xLkNoYW5nZVByZWZpeCxcclxuICAgIGZ1bl8xLkFsdEY0LFxyXG4gICAgbXVzaWNfMS5Kb2luLFxyXG4gICAgbXVzaWNfMS5TdG9wLFxyXG4gICAgbXVzaWNfMS5EaXNjb25lbmN0LFxyXG4gICAgYWRtaW5fMS5QbGF5aW5nLFxyXG4gICAgLy8gR2l2ZUFkbWluLFxyXG4gICAgbW9kZXJhdGlvbl8xLlBvbGwsXHJcbiAgICBtdXNpY18xLlZvbHVtZSxcclxuICAgIG1vZGVyYXRpb25fMS5UaW1lTXV0ZSxcclxuICAgIG1vZGVyYXRpb25fMS5UaW1lRGVhZixcclxuICAgIGdlbmVyYWxfMS5SYW5kb20sXHJcbiAgICBnZW5lcmFsXzEuQ2hvaWNlLFxyXG4gICAgdGVzdF8xLlRyb2xsTW92ZSxcclxuICAgIGFkbWluXzEuU2VydmVycyxcclxuICAgIGFkbWluXzEuR2l2ZUFkbWluXHJcbl07XHJcbmV4cG9ydHMubXVzaWNDb21tYW5kcyA9IFtcclxuICAgIG11c2ljXzEuSm9pbixcclxuICAgIG11c2ljXzEuU3RvcCxcclxuICAgIG11c2ljXzEuRGlzY29uZW5jdCxcclxuICAgIG11c2ljXzEuVm9sdW1lLFxyXG4gICAgbXVzaWNfMS5QYXVzZSxcclxuICAgIG11c2ljXzEuUmVzdW1lXHJcbl07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbW1hbmRzL2luZGV4LnRzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGNvbG9ycyA9IHJlcXVpcmUoXCJjb2xvcnMvc2FmZVwiKTtcclxudmFyIFBhcnNlcjtcclxuKGZ1bmN0aW9uIChQYXJzZXIpIHtcclxuICAgIGZ1bmN0aW9uIHBhcnNlVGltZSh0aW1lKSB7XHJcbiAgICAgICAgbGV0IHJlZ2V4RGF5cyA9IC9cXGQrZC87XHJcbiAgICAgICAgbGV0IHJlZ2V4SG91cnMgPSAvXFxkK2gvO1xyXG4gICAgICAgIGxldCByZWdleE1pbnV0ZXMgPSAvXFxkK20vO1xyXG4gICAgICAgIGxldCByZWdleFNlY29uZHMgPSAvXFxkK3MvO1xyXG4gICAgICAgIGxldCBkYXlzID0gKyh0aW1lLm1hdGNoKHJlZ2V4RGF5cykgfHwgXCIwZFwiKVswXS5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgbGV0IGhvdXJzID0gKyh0aW1lLm1hdGNoKHJlZ2V4SG91cnMpIHx8IFwiMGhcIilbMF0uc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgIGxldCBtaW51dGVzID0gKyh0aW1lLm1hdGNoKHJlZ2V4TWludXRlcykgfHwgXCIwbVwiKVswXS5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgbGV0IHNlY29uZHMgPSArKHRpbWUubWF0Y2gocmVnZXhTZWNvbmRzKSB8fCBcIjBzXCIpWzBdLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICByZXR1cm4geyBkYXlzLCBob3VycywgbWludXRlcywgc2Vjb25kcyB9O1xyXG4gICAgfVxyXG4gICAgUGFyc2VyLnBhcnNlVGltZSA9IHBhcnNlVGltZTtcclxuICAgIGZ1bmN0aW9uIHBhcnNlTWVzc2FnZShtZXNzYWdlLCBjbWRQcmVmaXgpIHtcclxuICAgICAgICBsZXQgYXJncyA9IG1lc3NhZ2UuY29udGVudC5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgLy8gcmVtb3ZlIGVtcHR5IGFyZ3NcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFyZ3NbaV0gPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGFyZ3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpcyA9IGFyZ3Muc2hpZnQoKS50b0xvd2VyQ2FzZSgpLnN1YnN0cihjbWRQcmVmaXgubGVuZ3RoKTtcclxuICAgICAgICBsZXQgbXNnID0ge1xyXG4gICAgICAgICAgICBpcyxcclxuICAgICAgICAgICAgYXJnc1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7Y29sb3JzLnllbGxvdyhcIltDXVwiKX0gYnkgJHtjb2xvcnMuYmx1ZShtZXNzYWdlLmF1dGhvci50YWcpfTogJHttc2cuaXN9IFske21zZy5hcmdzLmpvaW4oXCIsXCIpfV1gKTtcclxuICAgICAgICByZXR1cm4gbXNnO1xyXG4gICAgfVxyXG4gICAgUGFyc2VyLnBhcnNlTWVzc2FnZSA9IHBhcnNlTWVzc2FnZTtcclxufSkoUGFyc2VyID0gZXhwb3J0cy5QYXJzZXIgfHwgKGV4cG9ydHMuUGFyc2VyID0ge30pKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gUGFyc2VyO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91dGlscy9wYXJzZXIudHNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29sb3JzL3NhZmVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjb2xvcnMvc2FmZVwiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNsYXNzIEJvdFNldHRpbmdzIHtcclxuICAgIGNvbnN0cnVjdG9yKG93bmVyKSB7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0UHJlZml4ID0gXCIuXCI7XHJcbiAgICAgICAgdGhpcy5fb3duZXIgPSBvd25lcjtcclxuICAgIH1cclxuICAgIGdldCB0b2tlbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG9rZW47XHJcbiAgICB9XHJcbiAgICBzZXQgdG9rZW4odG9rZW4pIHtcclxuICAgICAgICB0aGlzLl90b2tlbiA9IHRva2VuO1xyXG4gICAgfVxyXG4gICAgZ2V0IHByZWZpeCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJlZml4IHx8IHRoaXMuZGVmYXVsdFByZWZpeDtcclxuICAgIH1cclxuICAgIHNldCBwcmVmaXgocHJlZml4KSB7XHJcbiAgICAgICAgdGhpcy5fcHJlZml4ID0gcHJlZml4IHx8IHRoaXMuZGVmYXVsdFByZWZpeDtcclxuICAgIH1cclxuICAgIGdldCBleHRyYXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4dHJhcztcclxuICAgIH1cclxuICAgIHNldCBleHRyYXMoZXh0cmFzKSB7XHJcbiAgICAgICAgdGhpcy5fZXh0cmFzID0gZXh0cmFzO1xyXG4gICAgfVxyXG4gICAgZ2V0IGdhbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWU7XHJcbiAgICB9XHJcbiAgICBzZXQgZ2FtZShnYW1lKSB7XHJcbiAgICAgICAgdGhpcy5fZ2FtZSA9IGdhbWU7XHJcbiAgICB9XHJcbiAgICBnZXQgbm90aWZ5VW5rbm93bkNvbW1hbmQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vdGlmeVVua25vd25Db21tYW5kO1xyXG4gICAgfVxyXG4gICAgc2V0IG5vdGlmeVVua25vd25Db21tYW5kKG5vdGlmeVVua25vd25Db21tYW5kKSB7XHJcbiAgICAgICAgdGhpcy5fbm90aWZ5VW5rbm93bkNvbW1hbmQgPSBub3RpZnlVbmtub3duQ29tbWFuZDtcclxuICAgIH1cclxuICAgIGdldCBvd25lcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3duZXI7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Cb3RTZXR0aW5ncyA9IEJvdFNldHRpbmdzO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBCb3RTZXR0aW5ncztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYm90LXNldHRpbmdzLnRzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGJvdF8xID0gcmVxdWlyZShcIi4vYm90XCIpO1xyXG5leHBvcnRzLkJvdCA9IGJvdF8xLkJvdDtcclxudmFyIGJvdF9zZXR0aW5nc18xID0gcmVxdWlyZShcIi4vYm90LXNldHRpbmdzXCIpO1xyXG5leHBvcnRzLkJvdFNldHRpbmdzID0gYm90X3NldHRpbmdzXzEuQm90U2V0dGluZ3M7XHJcbnZhciBtaXhpbnNfMSA9IHJlcXVpcmUoXCIuL21peGluc1wiKTtcclxuZXhwb3J0cy5UZXh0Q29tbWFuZCA9IG1peGluc18xLlRleHRDb21tYW5kO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBib3RfMS5Cb3Q7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2luZGV4LnRzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IERpc2NvcmQgPSByZXF1aXJlKFwiZGlzY29yZC5qc1wiKTtcclxuY29uc3QgbWVzc2FnZV92YWxpZGF0b3JfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL21lc3NhZ2UtdmFsaWRhdG9yXCIpO1xyXG5jb25zdCBjb21tYW5kc18xID0gcmVxdWlyZShcIi4vY29tbWFuZHNcIik7XHJcbmNvbnN0IFJlZ2lzdHJ5XzEgPSByZXF1aXJlKFwiLi9SZWdpc3RyeVwiKTtcclxuY29uc3QgYm90X3NldHRpbmdzXzEgPSByZXF1aXJlKFwiLi9ib3Qtc2V0dGluZ3NcIik7XHJcbmNvbnN0IHBhcnNlcl8xID0gcmVxdWlyZShcIi4vdXRpbHMvcGFyc2VyXCIpO1xyXG5jb25zdCB0aW1lcnNfMSA9IHJlcXVpcmUoXCJ0aW1lcnNcIik7XHJcbmNsYXNzIEJvdCBleHRlbmRzIERpc2NvcmQuQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbTBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeyB0b2tlbiA9IFwiXCIsIHByZWZpeCA9IFwiXCIsIGJ1aWxkSW5Db21tYW5kcyA9IHRydWUsIGJ1aWxkSW5NdXNpY0NvbW1hbmRzID0gZmFsc2UsIGJ1aWxkSW5GaWx0ZXJzID0gdHJ1ZSwgZ2FtZSA9IG51bGwsIGV4dHJhcyA9IHt9LCBub3RpZnlVbmtub3duQ29tbWFuZCA9IHRydWUsIG93bmVyID0gXCJcIiB9KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmluc3RhbmNlcyA9IDA7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyeSA9IG5ldyBSZWdpc3RyeV8xLlJlZ2lzdHJ5KCk7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IG5ldyBib3Rfc2V0dGluZ3NfMS5Cb3RTZXR0aW5ncyhvd25lcik7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0R2FtZSA9IGAke3RoaXMuc2V0dGluZ3MucHJlZml4fWhlbHAgZm9yIGhlbHBgO1xyXG4gICAgICAgIC8vIGluaXQgc2V0dGluZ3NcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnByZWZpeCA9IHByZWZpeDtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnRva2VuID0gdG9rZW47XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5nYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLmV4dHJhcyA9IGV4dHJhcztcclxuICAgICAgICB0aGlzLnNldHRpbmdzLm5vdGlmeVVua25vd25Db21tYW5kID0gbm90aWZ5VW5rbm93bkNvbW1hbmQ7XHJcbiAgICAgICAgaWYgKGJ1aWxkSW5Db21tYW5kcylcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNvbW1tYW5kcyhjb21tYW5kc18xLmRlZmF1bHRDb21tYW5kcyk7XHJcbiAgICAgICAgaWYgKGJ1aWxkSW5NdXNpY0NvbW1hbmRzKVxyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tbW1hbmRzKGNvbW1hbmRzXzEubXVzaWNDb21tYW5kcyk7XHJcbiAgICAgICAgLy8gaWYgKGJ1aWxkSW5GaWx0ZXJzKSB0aGlzLnJlZ2lzdGVyRmlsdGVycyhidWlsdEluRmlsdGVycyk7XHJcbiAgICAgICAgdGhpcy5vbigncmVhZHknLCB0aGlzLnJlYWR5KTtcclxuICAgICAgICB0aGlzLm9uKCdtZXNzYWdlJywgdGhpcy5tZXNzYWdlcyk7XHJcbiAgICB9XHJcbiAgICByZWFkeSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5nYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlci5zZXRHYW1lKHRoaXMuc2V0dGluZ3MuZ2FtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGBcclxuICAgIEJvdCBTdGFydGVkIGFzICR7dGhpcy51c2VyLnRhZ31cclxuICAgIElEOiAke3RoaXMudXNlci5pZH1cclxuICAgICR7dGhpcy5ndWlsZHMuYXJyYXkoKS5sZW5ndGh9IHNlcnZlcnNcclxuICAgICR7dGhpcy5jaGFubmVscy5hcnJheSgpLmxlbmd0aH0gY2hhbm5lbHNcclxuICAgICR7dGhpcy51c2Vycy5hcnJheSgpLmxlbmd0aH0gdXNlcnNcclxuXHJcbiAgICBPd25lcklkOiAke3RoaXMuc2V0dGluZ3Mub3duZXJ9XHJcblxyXG4gICAgSW52aXRlIExpbms6IGh0dHBzOi8vZGlzY29yZGFwcC5jb20vb2F1dGgyL2F1dGhvcml6ZT9jbGllbnRfaWQ9JHt0aGlzLnVzZXIuaWR9JnNjb3BlPWJvdCZwZXJtaXNzaW9ucz04XHJcbiAgICBgKTtcclxuICAgICAgICB0aW1lcnNfMS5zZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudm9pY2VDaGVja2VyKCk7XHJcbiAgICAgICAgfSwgNjAgKiAxMDAwKTtcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyQ29tbW1hbmRzKGNvbW1hbmRzKSB7XHJcbiAgICAgICAgY29tbWFuZHMuZm9yRWFjaChjb21tYW5kID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyeS5hZGRUZXh0Q29tbWFuZChjb21tYW5kKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdCB0aGUgYm90IHRvIHRoZSBzZXJ2ZXJcclxuICAgICAqIEBwYXJhbSB0b2tlbiBib3QgbG9naW4gdG9rZW5cclxuICAgICAqL1xyXG4gICAgY29ubmVjdCh0b2tlbiA9IHRoaXMuc2V0dGluZ3MudG9rZW4pIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIGNoZWNrIGlmIGEgbG9naW4gdG9rZW4gaXMgZ2l2ZW5cclxuICAgICAgICAgKi9cclxuICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MudG9rZW4gJiYgIXRva2VuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcInBsZWFzZSBwcm92aWRlIGEgbG9naW4gdG9rZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLnRva2VuID0gdG9rZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9naW4odGhpcy5zZXR0aW5ncy50b2tlbikuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIG1lc3NhZ2VzKG1lc3NhZ2UpIHtcclxuICAgICAgICAvLyBpZ25vcmUgbWVzc2FnZXMgZnJvbSBvdGhlciBib3RzXHJcbiAgICAgICAgaWYgKG1lc3NhZ2UuYXV0aG9yLmJvdClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIG1lc3NhZ2UgaXMgbm8gcHJpdmF0ZSBtZXNzYWdlXHJcbiAgICAgICAgaWYgKG1lc3NhZ2UuY2hhbm5lbC50eXBlID09PSBcImRtXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyBjaGVjayBpZiBtZXNzYWdlIGlmIGZvcm1hdHRlZCBsaWtlIGEgY29tbWFuZFxyXG4gICAgICAgIGlmICghbWVzc2FnZV92YWxpZGF0b3JfMS5kZWZhdWx0KG1lc3NhZ2UsIHRoaXMuc2V0dGluZ3MucHJlZml4KSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIHBhcnNlIHRoZSBtZXNzYWdlXHJcbiAgICAgICAgLy8gbGV0IHBhcnNlZE1lc3NhZ2UgPSBwYXJzZU1lc3NhZ2UobWVzc2FnZSwgdGhpcy5zZXR0aW5ncy5wcmVmaXgpO1xyXG4gICAgICAgIGxldCBwYXJzZWRNZXNzYWdlID0gcGFyc2VyXzEuUGFyc2VyLnBhcnNlTWVzc2FnZShtZXNzYWdlLCB0aGlzLnNldHRpbmdzLnByZWZpeCk7XHJcbiAgICAgICAgLy9nZXQgY29tbWFuZCBmcm9tIHRoZSByZWdpc3RyeVxyXG4gICAgICAgIGxldCBjb21tYW5kID0gdGhpcy5yZWdpc3RyeS5nZXRUZXh0Q29tbWFuZChwYXJzZWRNZXNzYWdlLmlzKTtcclxuICAgICAgICAvLyBpZiB0aGUgY29tbWFuZCB3YXNuJ3QgZm91bmQgb3IgYSBub3JtYWwgdXNlciB0cmllZCB0byBleGVjdXRlIGFuIG93bmVyT25seSBjb21tYW5kXHJcbiAgICAgICAgaWYgKCFjb21tYW5kIHx8IChjb21tYW5kLm9ud2VyT25seSAmJiBtZXNzYWdlLmF1dGhvci5pZCAhPT0gdGhpcy5zZXR0aW5ncy5vd25lcikpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Mubm90aWZ5VW5rbm93bkNvbW1hbmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGA0MDQgQ29tbWFuZCBub3QgZm91bmQuIFR5cGUgJHt0aGlzLnNldHRpbmdzLnByZWZpeH1oZWxwIGZvciBhIGxpc3Qgb2YgY29tbWFuZHNgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhbGxvd2VkID0gZmFsc2U7XHJcbiAgICAgICAgLy9hbGxvdyBmb3IgYm90IG93bmVyXHJcbiAgICAgICAgaWYgKG1lc3NhZ2UuYXV0aG9yLmlkID09PSB0aGlzLnNldHRpbmdzLm93bmVyKSB7XHJcbiAgICAgICAgICAgIGFsbG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBhbGxvdyBpZiB1c2VyIGhhcyByZXF1aXJlZCBwZXJtaXNzaW9uc1xyXG4gICAgICAgIGlmIChjb21tYW5kLnBlcm1pc3Npb25zLmxlbmd0aCA+IDAgJiYgbWVzc2FnZS5tZW1iZXIuaGFzUGVybWlzc2lvbihjb21tYW5kLnBlcm1pc3Npb25zKSkge1xyXG4gICAgICAgICAgICBhbGxvd2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYWxsb3cgaWYgdXNlciBoYXMgYXQgbGVhc3QgdGhlIG1pbiByb2xlXHJcbiAgICAgICAgaWYgKGNvbW1hbmQucGVybWlzc2lvbnMubGVuZ3RoID09IDAgJiYgY29tbWFuZC5yb2xlcy5sZW5ndGggPT0gMCAmJiAhY29tbWFuZC5taW5Sb2xlKSB7XHJcbiAgICAgICAgICAgIGFsbG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBhbGxvdyBpZiB0aGUgdXNlciBoYXMgc29tZSBvZiB0aGUgYWxsb3dlZCByb2xlc1xyXG4gICAgICAgIGlmIChtZXNzYWdlLm1lbWJlci5yb2xlcy5zb21lKHIgPT4gY29tbWFuZC5yb2xlcy5pbmRleE9mKHIubmFtZSkgIT0gLTEpKSB7XHJcbiAgICAgICAgICAgIGFsbG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29tbWFuZC5taW5Sb2xlKSB7XHJcbiAgICAgICAgICAgIGxldCBtaW5Sb2xlID0gbWVzc2FnZS5ndWlsZC5yb2xlcy5maW5kKFwibmFtZVwiLCBjb21tYW5kLm1pblJvbGUpIHx8IG1lc3NhZ2UuZ3VpbGQuZGVmYXVsdFJvbGU7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLm1lbWJlci5oaWdoZXN0Um9sZS5jb21wYXJlUG9zaXRpb25UbyhtaW5Sb2xlKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBhbGxvd2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFsbG93ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJZb3UgZG9uJ3QgaGF2ZSBwZXJtaXNzaW9uIHRvIGV4ZWN1dGUgdGhpcyBjb21tYW5kXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb21tYW5kLnJ1bih0aGlzLCBtZXNzYWdlLCBwYXJzZWRNZXNzYWdlKTtcclxuICAgIH1cclxuICAgIHNldCBnYW1lKGdhbWUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdhbWVcIiwgZ2FtZSk7XHJcbiAgICAgICAgdGhpcy51c2VyLnNldEdhbWUoZ2FtZSk7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5nYW1lID0gZ2FtZTtcclxuICAgIH1cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gdGhpcy5kZWZhdWx0R2FtZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIGdldFZvaWNlQ29ubmVjdGlvbihndWlsZElkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudm9pY2VDb25uZWN0aW9ucy5maW5kKHZjID0+IHZjLmNoYW5uZWwuZ3VpbGQuaWQgPT09IGd1aWxkSWQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiB0aGUgaWQgbWF0Y2hlcyB0aGUgb3duZXIgaWRcclxuICAgICAqIEBwYXJhbSBpZCBpZCB0byBjaGVja1xyXG4gICAgICovXHJcbiAgICBpc093bmVySWQoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5vd25lciA9PT0gaWQ7XHJcbiAgICB9XHJcbiAgICB2b2ljZUNoZWNrZXIoKSB7XHJcbiAgICAgICAgbGV0IGNvbm5lY3Rpb25zID0gdGhpcy52b2ljZUNvbm5lY3Rpb25zO1xyXG4gICAgICAgIGNvbm5lY3Rpb25zLmZvckVhY2goYyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjLmNoYW5uZWwubWVtYmVycy5hcnJheSgpLmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjLmRpc3BhdGNoZXIuZW5kKCk7XHJcbiAgICAgICAgICAgICAgICBjLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWMuZGlzcGF0Y2hlciB8fCAhYy5kaXNwYXRjaGVyLnBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgYy5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkJvdCA9IEJvdDtcclxuZXhwb3J0cy5kZWZhdWx0ID0gQm90O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9ib3QudHNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZnVuY3Rpb24gdmFsaWRhdGUobWVzc2FnZSwgY21kUHJlZml4KSB7XHJcbiAgICAvKipcclxuICAgICAqIGNoZWNrIGlmIGNvbW1hbmQgaGFzIHJpZ2h0IHByZWZpeFxyXG4gICAgICovXHJcbiAgICBsZXQgc3ViID0gbWVzc2FnZS5jb250ZW50LnN1YnN0cigwLCBjbWRQcmVmaXgubGVuZ3RoKTtcclxuICAgIGlmIChzdWIgIT09IGNtZFByZWZpeClcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBsZXQgcHJlZml4ID0gZXNjYXBlKGNtZFByZWZpeCk7XHJcbiAgICAvKipcclxuICAgICAqIHRlc3QgaWYgdGhlIG1lc3NhZ2UgaXMgaW4gYSBnb29kIGZvcm1hdFxyXG4gICAgICovXHJcbiAgICBsZXQgZXhwcmVzc2lvbiA9IHByZWZpeCArIFwiW2EtekEtWl0rXFxzKihcXHMqLitcXHMqKSpcIjtcclxuICAgIGxldCByZWdleHAgPSBuZXcgUmVnRXhwKGV4cHJlc3Npb24pO1xyXG4gICAgLy8gY29uc29sZS5sb2cocmVnZXhwKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiXFx0W01lc3NhZ2UgVmFsaWRhdG9yXSBuaWNlbHkgZm9ybWF0dGVkXCIsIHJlZ2V4cC50ZXN0KG1lc3NhZ2UuY29udGVudCkpO1xyXG4gICAgaWYgKCFyZWdleHAudGVzdChtZXNzYWdlLmNvbnRlbnQpKVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IHZhbGlkYXRlO1xyXG5mdW5jdGlvbiBlc2NhcGUoc3RyKSB7XHJcbiAgICBjb25zdCBtYXRjaE9wZXJhdG9yc1JlID0gL1t8XFxcXHt9KClbXFxdXiQrKj8uXS9nO1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKG1hdGNoT3BlcmF0b3JzUmUsICdcXFxcJCYnKTtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91dGlscy9tZXNzYWdlLXZhbGlkYXRvci50c1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBEaXNjb3JkID0gcmVxdWlyZShcImRpc2NvcmQuanNcIik7XHJcbmNvbnN0IG1peGluc18xID0gcmVxdWlyZShcIi4uL21peGluc1wiKTtcclxuY2xhc3MgSGVscCBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJoZWxwXCIsXHJcbiAgICAgICAgICAgIGFsaWFzZXM6IFtcclxuICAgICAgICAgICAgICAgIFwiaFwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInNlbmQgYSBoZWxwIG1lc3NhZ2VcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBlbWJlZCA9IG5ldyBEaXNjb3JkLlJpY2hFbWJlZCgpO1xyXG4gICAgICAgICAgICBpZiAocGFyc2VkTWVzc2FnZS5hcmdzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJnID0gcGFyc2VkTWVzc2FnZS5hcmdzWzFdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbW1hbmQgPSBib3QucmVnaXN0cnkuZ2V0VGV4dENvbW1hbmQocGFyc2VkTWVzc2FnZS5hcmdzWzBdKTtcclxuICAgICAgICAgICAgICAgIGlmIChhcmcgPT09IFwiLWNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbW1hbmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIWNvbW1hbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRIZWxwKGJvdCwgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRIZWxwRm9yQ29tbWFuZChib3QsIG1lc3NhZ2UsIGNvbW1hbmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kSGVscChib3QsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzZW5kSGVscChib3QsIG1lc3NhZ2UpIHtcclxuICAgICAgICBsZXQgZW1iZWQgPSBuZXcgRGlzY29yZC5SaWNoRW1iZWQoKTtcclxuICAgICAgICBsZXQgY29tbWFuZHM7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2UuYXV0aG9yLmlkID09PSBib3Quc2V0dGluZ3Mub3duZXIpIHtcclxuICAgICAgICAgICAgY29tbWFuZHMgPSBib3QucmVnaXN0cnkudGV4dENvbW1hbmRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29tbWFuZHMgPSBib3QucmVnaXN0cnkudGV4dENvbW1hbmRzLmZpbHRlcihjID0+IGMub253ZXJPbmx5ID09PSBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVtYmVkLnNldENvbG9yKFwiI0ZBRkFGQVwiKS5zZXRUaXRsZShcIkNvbW1hbmRzXCIpO1xyXG4gICAgICAgIGxldCB0ZXh0ID0gXCJcIjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbW1hbmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjb21tYW5kID0gY29tbWFuZHNbaV07XHJcbiAgICAgICAgICAgIC8vIGVtYmVkLmFkZEZpZWxkKGAke2JvdC5zZXR0aW5ncy5wcmVmaXh9JHtjb21tYW5kLmlzfWAsIGAke2NvbW1hbmQuZGVzY3JpcHRpb259YCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAvLyBlbWJlZC5hZGRGaWVsZChgWyR7Ym90LnNldHRpbmdzLnByZWZpeH0ke2NvbW1hbmQuaXN9XShodHRwczovL2dpdGh1Yi5jb20vZGFubGlvbmlzL2RvbmJvdClgLCBgJHtjb21tYW5kLmRlc2NyaXB0aW9ufWAsIHRydWUpO1xyXG4gICAgICAgICAgICB0ZXh0ICs9IGBcXGAke2JvdC5zZXR0aW5ncy5wcmVmaXh9JHtjb21tYW5kLmlzfVxcYCAtICR7Y29tbWFuZC5kZXNjcmlwdGlvbn1cXG5cXG5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbWJlZC5zZXREZXNjcmlwdGlvbih0ZXh0KTtcclxuICAgICAgICBtZXNzYWdlLmF1dGhvci5zZW5kKGVtYmVkKTtcclxuICAgIH1cclxuICAgIHNlbmRIZWxwRm9yQ29tbWFuZChib3QsIG1lc3NhZ2UsIGNvbW1hbmQpIHtcclxuICAgICAgICBsZXQgZW1iZWQgPSBuZXcgRGlzY29yZC5SaWNoRW1iZWQoKTtcclxuICAgICAgICBsZXQgYWxpYXNlcyA9IGNvbW1hbmQuYWxpYXNlcy5tYXAoYSA9PiBib3Quc2V0dGluZ3MucHJlZml4ICsgYSk7XHJcbiAgICAgICAgZW1iZWRcclxuICAgICAgICAgICAgLnNldFRpdGxlKGNvbW1hbmQuaXMpO1xyXG4gICAgICAgIGlmIChjb21tYW5kLmRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIGVtYmVkLnNldERlc2NyaXB0aW9uKGNvbW1hbmQuZGVzY3JpcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29tbWFuZC5oZWxwKSB7XHJcbiAgICAgICAgICAgIGVtYmVkLmFkZEZpZWxkKFwiSW5mb1wiLCBjb21tYW5kLmhlbHApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWxpYXNlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIGVtYmVkLmFkZEZpZWxkKFwiQWxpYXNlc1wiLCBhbGlhc2VzLmpvaW4oYCBgKSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb2xvciA9ICcjJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2Nzc3MjE1KS50b1N0cmluZygxNik7XHJcbiAgICAgICAgZW1iZWQuc2V0Q29sb3IoY29sb3IpO1xyXG4gICAgICAgIG1lc3NhZ2UuYXV0aG9yLnNlbmQoZW1iZWQpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuSGVscCA9IEhlbHA7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEhlbHA7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbW1hbmRzL2hlbHAudHNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY2xhc3MgVGV4dENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IoeyBjb21tYW5kID0gXCJcIiwgZGVzY3JpcHRpb24gPSBcIlwiLCBoZWxwID0gXCJcIiwgcGVybWlzc2lvbnMgPSBbXSwgcm9sZXMgPSBbXSwgbWluUm9sZSA9IFwiXCIsIGFsaWFzZXMgPSBbXSwgb3duZXJPbmx5ID0gZmFsc2UgfSkge1xyXG4gICAgICAgIHRoaXMuX2NvbW1hbmQgPSBjb21tYW5kO1xyXG4gICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy5faGVscCA9IGhlbHA7XHJcbiAgICAgICAgdGhpcy5fcGVybWlzc2lvbnMgPSBwZXJtaXNzaW9ucy5tYXAocCA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcCA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBwLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fcm9sZXMgPSByb2xlcztcclxuICAgICAgICB0aGlzLl9taW5Sb2xlID0gbWluUm9sZTtcclxuICAgICAgICB0aGlzLl9vd25lck9ubHkgPSBvd25lck9ubHk7XHJcbiAgICAgICAgYWxpYXNlcy51bnNoaWZ0KGNvbW1hbmQpO1xyXG4gICAgICAgIHRoaXMuX2FsaWFzZXMgPSBhbGlhc2VzO1xyXG4gICAgfVxyXG4gICAgZ2V0IG9ud2VyT25seSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3duZXJPbmx5O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGhlIG5hbWUgb2YgdGhlIGNvbW1hbmRcclxuICAgICAqL1xyXG4gICAgZ2V0IGlzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21tYW5kO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgYWxsIHBvc3NpbGJlIGFsaWFzZXMgZm9yIHRoaXMgY29tbWFuZFxyXG4gICAgICovXHJcbiAgICBnZXQgYWxpYXNlcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWxpYXNlcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgY29tbWFuZFxyXG4gICAgICovXHJcbiAgICBnZXQgZGVzY3JpcHRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGhlIGhlbHAgdGV4dCBvZiB0aGUgY29tbWFuZFxyXG4gICAgICovXHJcbiAgICBnZXQgaGVscCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faGVscDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHJlcXVpcmVkIHBlcm1pc3Npb25zIGZvciB0aGUgY29tbWFuZFxyXG4gICAgICovXHJcbiAgICBnZXQgcGVybWlzc2lvbnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Blcm1pc3Npb25zO1xyXG4gICAgfVxyXG4gICAgZ2V0IHJvbGVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yb2xlcztcclxuICAgIH1cclxuICAgIGdldCBtaW5Sb2xlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW5Sb2xlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSdW4gdGhlIGNvbW1hbmRcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlIHtEaXNjb3JkLk1lc3NhZ2V9IC0gcmF3IG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBwYXJzZWRNZXNzYWdlIHtQYXJzZWRNZXNzYWdlfSAtIHBhcnNlZCBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gcmVnaXN0cnkge1JlZ2lzdHJ5fSAtIHJlZ2lzdHJ5XHJcbiAgICAgKi9cclxuICAgIC8vVE9ETzogYXJnc1xyXG4gICAgLy8gcHVibGljIGFzeW5jIHJ1bihib3Q6IEJvdCwgbWVzc2FnZTogRGlzY29yZC5NZXNzYWdlLCBwYXJzZWRNZXNzYWdlOiBQYXJzZWRNZXNzYWdlKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIC8vICAgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKFwidGhlcmUgaXMgbm8gY29tbWFuZCB3aXRoIHRoaXMgbmFtZVwiKTtcclxuICAgIC8vIH1cclxuICAgIHJ1bihib3QsIG1lc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocGFyc2VkTWVzc2FnZS5hcmdzWzBdID09PSBcIi1oXCIpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYXV0aG9yLnNlbmQodGhpcy5oZWxwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVGV4dENvbW1hbmQgPSBUZXh0Q29tbWFuZDtcclxuZXhwb3J0cy5kZWZhdWx0ID0gVGV4dENvbW1hbmQ7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21peGlucy90ZXh0LWNvbW1hbmQudHNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IERpc2NvcmQgPSByZXF1aXJlKFwiZGlzY29yZC5qc1wiKTtcclxuY29uc3QgbWl4aW5zXzEgPSByZXF1aXJlKFwiLi4vbWl4aW5zXCIpO1xyXG5jbGFzcyBSYW5kb20gZXh0ZW5kcyBtaXhpbnNfMS5UZXh0Q29tbWFuZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwicmFuZG9tXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImNob29zZXMgYSByYW5kb20gbnVtYmVyXCIsXHJcbiAgICAgICAgICAgIGFsaWFzZXM6IFtcclxuICAgICAgICAgICAgICAgIFwiclwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJ1bihib3QsIG1lc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBsZXQgbWluID0gMTtcclxuICAgICAgICAgICAgbGV0IG1heCA9IDEwO1xyXG4gICAgICAgICAgICBsZXQgcmVnZXhSYW5nZSA9IC9cXGQtXFxkLztcclxuICAgICAgICAgICAgbGV0IHJlZ2V4VmFsaWQgPSAvXlxcZCskLztcclxuICAgICAgICAgICAgLy8gdGVzdCBpZiBjb21tYW5kIHByb3ZpZGVkIGEgcmFuZ2UgZS5nLiBbcF1yYW5kb20gNi00NVxyXG4gICAgICAgICAgICBpZiAocmVnZXhSYW5nZS50ZXN0KHBhcnNlZE1lc3NhZ2UuYXJnc1swXSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhcmdzID0gcGFyc2VkTWVzc2FnZS5hcmdzWzBdLnNwbGl0KFwiLVwiKTtcclxuICAgICAgICAgICAgICAgIG1pbiA9ICthcmdzWzBdO1xyXG4gICAgICAgICAgICAgICAgbWF4ID0gK2FyZ3NbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAocGFyc2VkTWVzc2FnZS5hcmdzLmxlbmd0aCA+IDAgJiYgcmVnZXhWYWxpZC50ZXN0KHBhcnNlZE1lc3NhZ2UuYXJnc1swXSkpIHtcclxuICAgICAgICAgICAgICAgIG1heCA9ICtwYXJzZWRNZXNzYWdlLmFyZ3NbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMTtcclxuICAgICAgICAgICAgaWYgKHBhcnNlZE1lc3NhZ2UuYXJncy5sZW5ndGggPiAxICYmIHJlZ2V4VmFsaWQudGVzdChwYXJzZWRNZXNzYWdlLmFyZ3NbMV0pKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCA9IE1hdGgubWluKCtwYXJzZWRNZXNzYWdlLmFyZ3NbMV0sIDIwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coY291bnQpO1xyXG4gICAgICAgICAgICBsZXQgbnVtYmVycyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG51bWJlcnMucHVzaChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4ICsgMSAtIG1pbikgKyBtaW4pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY291bnQgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXZlcmFnZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBudW1iZXJzLmZvckVhY2gobnVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhdmVyYWdlICs9IG51bTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gcm91bmQgYXZlcmFnZSB0byAxIGRlY2ltYWxcclxuICAgICAgICAgICAgICAgIGF2ZXJhZ2UgPSBNYXRoLnJvdW5kKGF2ZXJhZ2UgLyBudW1iZXJzLmxlbmd0aCAqIDEwKSAvIDEwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVtYmVkID0gbmV3IERpc2NvcmQuUmljaEVtYmVkKCk7XHJcbiAgICAgICAgICAgICAgICBlbWJlZC5zZXRUaXRsZShcIlJhbmRvbSBHZW5lcmF0b3JcIik7XHJcbiAgICAgICAgICAgICAgICBlbWJlZC5hZGRGaWVsZChcIlJvbGxzXCIsIGNvdW50LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGVtYmVkLmFkZEZpZWxkKFwiQXZlcmFnZVwiLCBhdmVyYWdlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGVtYmVkLmFkZEZpZWxkKFwiTnVtYmVyc1wiLCBgXFxgXFxgXFxgJHtudW1iZXJzLmpvaW4oXCIsIFwiKX1cXGBcXGBcXGBgKTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGVtYmVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UucmVwbHkoYFlvdXIgcmFuZG9tIG51Ym1lciBpcyAke251bWJlcnMudG9TdHJpbmcoKX1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBtZXNzYWdlLnJlcGx5KGBcXG5Sb2xsczogXFxgJHtjb3VudH1cXGAgXFxuQXZlcmFnZTogXFxgJHthdmVyYWdlfVxcYCBcXG5OdW1iZXJzOiBcXGAke251bWJlcnMudG9TdHJpbmcoKX1cXGBgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlJhbmRvbSA9IFJhbmRvbTtcclxuY2xhc3MgQ2hvaWNlIGV4dGVuZHMgbWl4aW5zXzEuVGV4dENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcImNob2ljZVwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJjaG9vc2Ugb25lIGZyb20gYWxsIGFyZ3VtZW50c1wiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJzZWRNZXNzYWdlLmFyZ3MubGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiTm90IGVub3VnaCBjaG9pY2VzIGdpdmVuLiBQbGVhc2UgcHJvdmlkZSBhdCBsZWFzdCAyXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwYXJzZWRNZXNzYWdlLmFyZ3MubGVuZ3RoKTtcclxuICAgICAgICAgICAgbWVzc2FnZS5yZXBseShgWW91ciBjaG9pY2UgaXM6ICR7cGFyc2VkTWVzc2FnZS5hcmdzW3JhbmRvbV19YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5DaG9pY2UgPSBDaG9pY2U7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbW1hbmRzL2dlbmVyYWwudHNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IG1peGluc18xID0gcmVxdWlyZShcIi4uL21peGluc1wiKTtcclxuY2xhc3MgQ2hhbmdlUHJlZml4IGV4dGVuZHMgbWl4aW5zXzEuVGV4dENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcInByZWZpeFwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzZXQgYSBuZXcgcHJlZml4IGZvciBhbGwgY29tbWFuZHNcIixcclxuICAgICAgICAgICAgaGVscDogXCJwcmVmaXggW25ldyBwcmVmaXhdXCIsXHJcbiAgICAgICAgICAgIG93bmVyT25seTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBib3Quc2V0dGluZ3MucHJlZml4ID0gcGFyc2VkTWVzc2FnZS5hcmdzWzBdO1xyXG4gICAgICAgICAgICBtZXNzc2FnZS5yZXBseShgQ2hhbmdlZCBjb21tYW5kIHByZWZpeCB0byAke2JvdC5zZXR0aW5ncy5wcmVmaXh9YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5DaGFuZ2VQcmVmaXggPSBDaGFuZ2VQcmVmaXg7XHJcbmNsYXNzIFBsYXlpbmcgZXh0ZW5kcyBtaXhpbnNfMS5UZXh0Q29tbWFuZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwiZ2FtZVwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzZXQgdGhlIGN1cnJlbnQgZ2FtZVwiLFxyXG4gICAgICAgICAgICBoZWxwOiBcImdhbWUgW2dhbWVdXCIsXHJcbiAgICAgICAgICAgIG93bmVyT25seTogdHJ1ZSxcclxuICAgICAgICAgICAgYWxpYXNlczogW1xyXG4gICAgICAgICAgICAgICAgXCJwbGF5aW5nXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBib3QudXNlci5zZXRHYW1lKHBhcnNlZE1lc3NhZ2UuYXJncy5qb2luKFwiIFwiKSkuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuUGxheWluZyA9IFBsYXlpbmc7XHJcbmNsYXNzIFNlcnZlcnMgZXh0ZW5kcyBtaXhpbnNfMS5UZXh0Q29tbWFuZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwic2VydmVyc1wiLFxyXG4gICAgICAgICAgICBvd25lck9ubHk6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJ1bihib3QsIG1lc3NzYWdlLCBwYXJzZWRNZXNzYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHBhcnNlZE1lc3NhZ2UuYXJnc1swXSA9PT0gXCJsZWF2ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ3VpbGQgPSBib3QuZ3VpbGRzLmZpbmQoXCJpZFwiLCBwYXJzZWRNZXNzYWdlLmFyZ3NbMV0pO1xyXG4gICAgICAgICAgICAgICAgZ3VpbGQubGVhdmUoKTtcclxuICAgICAgICAgICAgICAgIG1lc3NzYWdlLmRlbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRleHQgPSBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgYm90Lmd1aWxkcy5mb3JFYWNoKChnKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBgJHtnLmlkfSA6ICR7Zy5uYW1lfVxcbmA7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRleHQpO1xyXG4gICAgICAgICAgICAgICAgbWVzc3NhZ2UucmVwbHkodGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlNlcnZlcnMgPSBTZXJ2ZXJzO1xyXG5jbGFzcyBHaXZlQWRtaW4gZXh0ZW5kcyBtaXhpbnNfMS5UZXh0Q29tbWFuZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwiYWRtaW5cIixcclxuICAgICAgICAgICAgb3duZXJPbmx5OiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UuZGVsZXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmF1dGhvci5pZCA9PT0gYm90LnNldHRpbmdzLm93bmVyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgYWRtaW5yb2xlID0gbWVzc2FnZS5ndWlsZC5yb2xlcy5hcnJheSgpLmZpbmQociA9PiByLmhhc1Blcm1pc3Npb24oXCJBRE1JTklTVFJBVE9SXCIpICYmIHIubWFuYWdlZCA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICBsZXQgYWRtaW5yb2xlID0gbWVzc2FnZS5ndWlsZC5yb2xlcy5hcnJheSgpLmZpbmQociA9PiByLmhhc1Blcm1pc3Npb24oXCJBRE1JTklTVFJBVE9SXCIpICYmIHIubWFuYWdlZCA9PT0gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZS5ndWlsZC5yb2xlcy5tYXAociA9PiByLm5hbWUpKTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UubWVtYmVyLmFkZFJvbGUoYWRtaW5yb2xlKS5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkdpdmVBZG1pbiA9IEdpdmVBZG1pbjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tbWFuZHMvYWRtaW4udHNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IERpc2NvcmQgPSByZXF1aXJlKFwiZGlzY29yZC5qc1wiKTtcclxuY29uc3QgbWl4aW5zXzEgPSByZXF1aXJlKFwiLi4vbWl4aW5zXCIpO1xyXG5jb25zdCBwYXJzZXJfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9wYXJzZXJcIik7XHJcbmNsYXNzIENsZWFyIGV4dGVuZHMgbWl4aW5zXzEuVGV4dENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcImNsZWFyXCIsXHJcbiAgICAgICAgICAgIGFsaWFzZXM6IFtcclxuICAgICAgICAgICAgICAgIFwiY2xzXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgaGVscDogXCJjbGVhciA8c2lsZW50Pz5cIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2xlYXJzIHRoZSBsYXN0IDEwMCBjaGF0IG1lc3NhZ2VzXCIsXHJcbiAgICAgICAgICAgIHBlcm1pc3Npb25zOiBbXHJcbiAgICAgICAgICAgICAgICBcIk1BTkFHRV9NRVNTQUdFU1wiLFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBydW4oYm90LCBtZXNzYWdlLCBwYXJzZWRNZXNzYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbWVzc2FnZS5jaGFubmVsLmZldGNoTWVzc2FnZXMoeyBsaW1pdDogOTkgfSkudGhlbigobWVzc2FnZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2VzLm1hcChtID0+IG0uY3JlYXRlZEF0LmdldFRpbWUoKSkpO1xyXG4gICAgICAgICAgICAgICAgLy8gRmlsdGVyIGFsbCBtZXNzYWdlcyBuZXdlciB0aGFuIDE0IGRheXMgXHJcbiAgICAgICAgICAgICAgICBsZXQgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gMTQgKiAyNCAqIDYwICogNjAgKiAxMDAwO1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMgPSBtZXNzYWdlcy5maWx0ZXIobSA9PiBtLmNyZWF0ZWRBdC5nZXRUaW1lKCkgPiB0aW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlcy5hcnJheSgpLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5jaGFubmVsLmJ1bGtEZWxldGUobWVzc2FnZXMuZmlsdGVyKG0gPT4gIW0ucGlubmVkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlZE1lc3NhZ2UuYXJnc1swXSAhPT0gXCJzaWxlbnRcIiAmJiBwYXJzZWRNZXNzYWdlLmFyZ3NbMF0gIT09IFwic1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGBNZXNzYWdlcyBjbGVhcmVkIGJ5ICR7bWVzc2FnZS5hdXRob3IudG9TdHJpbmcoKX1gKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuQ2xlYXIgPSBDbGVhcjtcclxuY2xhc3MgUG9sbCBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJwb2xsXCIsXHJcbiAgICAgICAgICAgIGFsaWFzZXM6IFtcclxuICAgICAgICAgICAgICAgIFwidm90ZVwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInN0YXJ0IGEgbmV3IHZvdGVcIixcclxuICAgICAgICAgICAgaGVscDogXCJwb2xsIFt0aXRsZS4uLl1cIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UuZGVsZXRlKCk7XHJcbiAgICAgICAgICAgIGxldCBlbWJlZCA9IG5ldyBEaXNjb3JkLlJpY2hFbWJlZCgpO1xyXG4gICAgICAgICAgICBlbWJlZC5zZXRGb290ZXIoYFBvbGwgYnkgJHttZXNzYWdlLm1lbWJlci5kaXNwbGF5TmFtZX1gKVxyXG4gICAgICAgICAgICAgICAgLnNldEF1dGhvcihwYXJzZWRNZXNzYWdlLmFyZ3Muam9pbihcIiBcIikpXHJcbiAgICAgICAgICAgICAgICAuc2V0Q29sb3IoXCIjMjE5NkYzXCIpO1xyXG4gICAgICAgICAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZChlbWJlZCkudGhlbigocG9sbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcG9sbC5yZWFjdChcIvCfkY1cIikudGhlbihzdWNjZXNzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBwb2xsLnJlYWN0KFwi8J+RjlwiKS50aGVuKHN1Y2Nlc3MgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2xsLnJlYWN0KFwi8J+kt1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlBvbGwgPSBQb2xsO1xyXG5jbGFzcyBUaW1lTXV0ZSBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJ0aW1lbXV0ZVwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJtdXRlIGEgbWVtYmVyIGZvciBhIGdpdmVuIHRpbWVcIixcclxuICAgICAgICAgICAgcGVybWlzc2lvbnM6IFtcclxuICAgICAgICAgICAgICAgIFwiTVVURV9NRU1CRVJTXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBtdXRlVXNlciA9IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5maXJzdCgpO1xyXG4gICAgICAgICAgICBsZXQgeyBkYXlzLCBob3VycywgbWludXRlcywgc2Vjb25kcyB9ID0gcGFyc2VyXzEuUGFyc2VyLnBhcnNlVGltZShwYXJzZWRNZXNzYWdlLmFyZ3NbMV0pO1xyXG4gICAgICAgICAgICBsZXQgbXV0ZVRpbWUgPSAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApICsgKGhvdXJzICogNjAgKiA2MCAqIDEwMDApICsgKG1pbnV0ZXMgKiA2MCAqIDEwMDApICsgKHNlY29uZHMgKiAxMDAwKTtcclxuICAgICAgICAgICAgbXV0ZVVzZXIuc2V0TXV0ZSh0cnVlKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBtdXRlVXNlci5zZXRNdXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgfSwgbXV0ZVRpbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVGltZU11dGUgPSBUaW1lTXV0ZTtcclxuY2xhc3MgVGltZURlYWYgZXh0ZW5kcyBtaXhpbnNfMS5UZXh0Q29tbWFuZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwidGltZWRlYWZcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiZGVhZiBhIG1lbWJlciBmb3IgYSBnaXZlbiB0aW1lXCIsXHJcbiAgICAgICAgICAgIHBlcm1pc3Npb25zOiBbXHJcbiAgICAgICAgICAgICAgICBcIkRFQUZFTl9NRU1CRVJTXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCB1c2VyID0gbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIGxldCB7IGRheXMsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzIH0gPSBwYXJzZXJfMS5QYXJzZXIucGFyc2VUaW1lKHBhcnNlZE1lc3NhZ2UuYXJnc1sxXSk7XHJcbiAgICAgICAgICAgIGxldCBtdXRlVGltZSA9IChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkgKyAoaG91cnMgKiA2MCAqIDYwICogMTAwMCkgKyAobWludXRlcyAqIDYwICogMTAwMCkgKyAoc2Vjb25kcyAqIDEwMDApO1xyXG4gICAgICAgICAgICB1c2VyLnNldERlYWYodHJ1ZSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdXNlci5zZXREZWFmKGZhbHNlKTtcclxuICAgICAgICAgICAgfSwgbXV0ZVRpbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVGltZURlYWYgPSBUaW1lRGVhZjtcclxuY2xhc3MgQmFuVGVzdCBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJ0ZXN0YmFuXCJcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJ1bihib3QsIG1lc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBsZXQgYmFucyA9IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycztcclxuICAgICAgICAgICAgYmFucy5maWx0ZXIodXNlciA9PiAhYm90LmlzT3duZXJJZCh1c2VyLmlkKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGJhbnMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuQmFuVGVzdCA9IEJhblRlc3Q7XHJcbmNsYXNzIEJhbiBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJiYW5cIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiYmFucyBvbmUgb3IgbW9yZSB1c2VyXCIsXHJcbiAgICAgICAgICAgIHBlcm1pc3Npb25zOiBbXHJcbiAgICAgICAgICAgICAgICBcIkJBTl9NRU1CRVJTXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBiYW5zID0gbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzO1xyXG4gICAgICAgICAgICBiYW5zLmZpbHRlcih1c2VyID0+ICFib3QuaXNPd25lcklkKHVzZXIuaWQpKTtcclxuICAgICAgICAgICAgYmFucy5mb3JFYWNoKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UubWVtYmVyLmhpZ2hlc3RSb2xlLmNvbXBhcmVQb3NpdGlvblRvKHVzZXIuaGlnaGVzdFJvbGUpID4gMCB8fCBib3QuaXNPd25lcklkKG1lc3NhZ2UuYXV0aG9yLmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXIuYmFuKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnJlcGx5KFwiWW91IGRvbid0IGhhdmUgcGVybWlzc2lvbiB0byBiYW4gdGhpcyB1c2VyXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkJhbiA9IEJhbjtcclxuY2xhc3MgU29mdEJhbiBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJzb2Z0YmFuXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInNvZnRiYW5zIG9uZSBvciBtb3JlIHVzZXJcIixcclxuICAgICAgICAgICAgcGVybWlzc2lvbnM6IFtcclxuICAgICAgICAgICAgICAgIFwiQkFOX01FTUJFUlNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBydW4oYm90LCBtZXNzYWdlLCBwYXJzZWRNZXNzYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbGV0IGJhbnMgPSBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnM7XHJcbiAgICAgICAgICAgIGJhbnMuZm9yRWFjaCgodXNlcikgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UubWVtYmVyLmhpZ2hlc3RSb2xlLmNvbXBhcmVQb3NpdGlvblRvKHVzZXIuaGlnaGVzdFJvbGUpID4gMCB8fCBib3QuaXNPd25lcklkKG1lc3NhZ2UuYXV0aG9yLmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBiYW5uZWQgPSB5aWVsZCB1c2VyLmJhbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhbm5lZC5ndWlsZC51bmJhbihiYW5uZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5yZXBseShcIllvdSBkb24ndCBoYXZlIHBlcm1pc3Npb24gdG8gYmFuIHRoaXMgdXNlclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuU29mdEJhbiA9IFNvZnRCYW47XHJcbmNsYXNzIEtpY2sgZXh0ZW5kcyBtaXhpbnNfMS5UZXh0Q29tbWFuZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwic29mdGJhblwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzb2Z0YmFucyBvbmUgb3IgbW9yZSB1c2VyXCIsXHJcbiAgICAgICAgICAgIHBlcm1pc3Npb25zOiBbXHJcbiAgICAgICAgICAgICAgICBcIktJQ0tfTUVNQkVSU1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJ1bihib3QsIG1lc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBsZXQga2lja3MgPSBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnM7XHJcbiAgICAgICAgICAgIGtpY2tzLmZvckVhY2godXNlciA9PiB7XHJcbiAgICAgICAgICAgICAgICB1c2VyLmtpY2soKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5LaWNrID0gS2ljaztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tbWFuZHMvbW9kZXJhdGlvbi50c1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgbWl4aW5zXzEgPSByZXF1aXJlKFwiLi4vbWl4aW5zXCIpO1xyXG5sZXQgcm9sZXMgPSBbXHJcbiAgICBcIkRKXCJcclxuXTtcclxuY2xhc3MgSm9pbiBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJqb2luXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpvaW4geW91ciB2b2ljZSBjaGFubmVsXCIsXHJcbiAgICAgICAgICAgIHJvbGVzOiByb2xlc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBjb24gPSBib3QuZ2V0Vm9pY2VDb25uZWN0aW9uKG1lc3NhZ2UuZ3VpbGQuaWQpO1xyXG4gICAgICAgICAgICBpZiAoIW1lc3NhZ2UubWVtYmVyLnZvaWNlQ2hhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJZb3UgaGF2ZSB0byBiZSBpbiBhIFZvaWNlIENoYW5uZWxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbiAmJiBjb24uY2hhbm5lbC5pZCA9PT0gbWVzc2FnZS5tZW1iZXIudm9pY2VDaGFubmVsLmlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcIlRoZSBCb3QgaXMgYWxyZWFkeSBjb25uZWN0ZWQgdG8geW91ciBWb2ljZUNoYW5uZWxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UubWVtYmVyLnZvaWNlQ2hhbm5lbC5qb2luKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Kb2luID0gSm9pbjtcclxuY2xhc3MgRGlzY29uZW5jdCBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJkaXNjb25uZWN0XCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImRpc2Nvbm5lY3RzIGZyb20geW91ciBjaGFubmVsXCIsXHJcbiAgICAgICAgICAgIHJvbGVzOiByb2xlcyxcclxuICAgICAgICAgICAgYWxpYXNlczogW1xyXG4gICAgICAgICAgICAgICAgXCJkY1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJ1bihib3QsIG1lc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBsZXQgY29uID0gYm90LmdldFZvaWNlQ29ubmVjdGlvbihtZXNzYWdlLmd1aWxkLmlkKTtcclxuICAgICAgICAgICAgaWYgKCFjb24pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29uLnBsYXllci5kaXNwYXRjaGVyKVxyXG4gICAgICAgICAgICAgICAgY29uLnBsYXllci5kaXNwYXRjaGVyLmVuZCgpO1xyXG4gICAgICAgICAgICBjb24uZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuRGlzY29uZW5jdCA9IERpc2NvbmVuY3Q7XHJcbmNsYXNzIFN0b3AgZXh0ZW5kcyBtaXhpbnNfMS5UZXh0Q29tbWFuZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwic3RvcFwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzdG9wIHN0cmVhbWluZ1wiLFxyXG4gICAgICAgICAgICByb2xlczogcm9sZXNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJ1bihib3QsIG1lc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBsZXQgY29uID0gYm90LmdldFZvaWNlQ29ubmVjdGlvbihtZXNzYWdlLmd1aWxkLmlkKTtcclxuICAgICAgICAgICAgaWYgKCFjb24pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiRXMga29ubnRlIGtlaW5lIFZlcmJpbmR1bmcgaGVyZ2VzdGVsbHQgd2VyZGVuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbi5wbGF5ZXIuZGlzcGF0Y2hlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbi5wbGF5ZXIuZGlzcGF0Y2hlci5lbmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuU3RvcCA9IFN0b3A7XHJcbmNsYXNzIFBhdXNlIGV4dGVuZHMgbWl4aW5zXzEuVGV4dENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcInBhdXNlXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInBhdXNlcyBzdHJlYW1cIixcclxuICAgICAgICAgICAgcm9sZXM6IHJvbGVzXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBydW4oYm90LCBtZXNzYWdlLCBwYXJzZWRNZXNzYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbGV0IGNvbiA9IGJvdC5nZXRWb2ljZUNvbm5lY3Rpb24obWVzc2FnZS5ndWlsZC5pZCk7XHJcbiAgICAgICAgICAgIGlmICghY29uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcIkVzIGtvbm50ZSBrZWluZSBWZXJiaW5kdW5nIGhlcmdlc3RlbGx0IHdlcmRlblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb24ucGxheWVyLmRpc3BhdGNoZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb24ucGxheWVyLmRpc3BhdGNoZXIucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuUGF1c2UgPSBQYXVzZTtcclxuY2xhc3MgUmVzdW1lIGV4dGVuZHMgbWl4aW5zXzEuVGV4dENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcInJlc3VtZVwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJyZXN1bWVzIG11c2ljXCIsXHJcbiAgICAgICAgICAgIHJvbGVzOiByb2xlcyxcclxuICAgICAgICAgICAgYWxpYXNlczogW1xyXG4gICAgICAgICAgICAgICAgXCJ1bnBhdXNlXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBjb24gPSBib3QuZ2V0Vm9pY2VDb25uZWN0aW9uKG1lc3NhZ2UuZ3VpbGQuaWQpO1xyXG4gICAgICAgICAgICBpZiAoIWNvbikge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5yZXBseShcIkVzIGtvbm50ZSBrZWluZSBWZXJiaW5kdW5nIGhlcmdlc3RlbGx0IHdlcmRlblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb24ucGxheWVyLmRpc3BhdGNoZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbi5wbGF5ZXIuZGlzcGF0Y2hlci5yZXN1bWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuUmVzdW1lID0gUmVzdW1lO1xyXG5jbGFzcyBWb2x1bWUgZXh0ZW5kcyBtaXhpbnNfMS5UZXh0Q29tbWFuZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwidm9sdW1lXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInNldCB0aGUgdm9sdW1lIGZyb20gMS0xMFwiLFxyXG4gICAgICAgICAgICByb2xlczogcm9sZXNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJ1bihib3QsIG1lc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBsZXQgY29uID0gYm90LmdldFZvaWNlQ29ubmVjdGlvbihtZXNzYWdlLmd1aWxkLmlkKTtcclxuICAgICAgICAgICAgaWYgKCFjb24pXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCB2b2x1bWVNdWx0aXBsaWVyID0gMTA7XHJcbiAgICAgICAgICAgIGxldCB2b2x1bWUgPSBwYXJzZWRNZXNzYWdlLmFyZ3NbMF07XHJcbiAgICAgICAgICAgIGlmICghdm9sdW1lKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnJlcGx5KGBWb2x1bWUgaXMgc2V0IHRvICR7Y29uLmRpc3BhdGNoZXIudm9sdW1lICogdm9sdW1lTXVsdGlwbGllcn1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh2b2x1bWUgPj0gMSAmJiB2b2x1bWUgPD0gdm9sdW1lTXVsdGlwbGllciAmJiBjb24uZGlzcGF0Y2hlcikge1xyXG4gICAgICAgICAgICAgICAgY29uLmRpc3BhdGNoZXIuc2V0Vm9sdW1lKHZvbHVtZSAvIHZvbHVtZU11bHRpcGxpZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Wb2x1bWUgPSBWb2x1bWU7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbW1hbmRzL211c2ljLnRzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBtaXhpbnNfMSA9IHJlcXVpcmUoXCIuLi9taXhpbnNcIik7XHJcbmNsYXNzIFRlc3QgZXh0ZW5kcyBtaXhpbnNfMS5UZXh0Q29tbWFuZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwidGVzdFwiLFxyXG4gICAgICAgICAgICBhbGlhc2VzOiBbXHJcbiAgICAgICAgICAgICAgICBcInRlc3RpbmdcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUZXN0bmFjaHJpY2h0IHNlbmRlblwiLFxyXG4gICAgICAgICAgICBwZXJtaXNzaW9uczogW10sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBydW4oYm90LCBtZXNzYWdlLCBwYXJzZWRNZXNzYWdlKSB7XHJcbiAgICAgICAgY29uc3QgX3N1cGVyID0gbmFtZSA9PiBzdXBlcltuYW1lXTtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBfc3VwZXIoXCJydW5cIikuY2FsbCh0aGlzLCBib3QsIG1lc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBtZXNzYWdlLnJlcGx5KFwiVGVzdCBDb21tYW5kXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVGVzdCA9IFRlc3Q7XHJcbmNsYXNzIFRyb2xsTW92ZSBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJuZXJ2XCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRlc3RuYWNocmljaHQgc2VuZGVuXCIsXHJcbiAgICAgICAgICAgIHBlcm1pc3Npb25zOiBbXHJcbiAgICAgICAgICAgICAgICBcIkFETUlOSVNUUkFUT1JcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGFubmVscyA9IG1lc3NhZ2UuZ3VpbGQuY2hhbm5lbHMuZmlsdGVyKGMgPT4gYy50eXBlID09PSBcInZvaWNlXCIpLmFycmF5KCk7XHJcbiAgICAgICAgICAgIGxldCBtZW1iZXIgPSBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMuZmlyc3QoKSB8fCBtZXNzYWdlLm1lbWJlcjtcclxuICAgICAgICAgICAgaWYgKCFtZW1iZXIudm9pY2VDaGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcIlVzZXIgaGFzIHRvIGJlIGNvbm5lY3RlZCB0byBhIHZvaWNlIGNoYW5uZWxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHZvaWNlQ2hhbm5lbCA9IG1lbWJlci52b2ljZUNoYW5uZWw7XHJcbiAgICAgICAgICAgIGNoYW5uZWxzLnB1c2godm9pY2VDaGFubmVsKTtcclxuICAgICAgICAgICAgbW92ZSgpO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBtb3ZlKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGMgPSBjaGFubmVscy5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIG1lbWJlci5zZXRWb2ljZUNoYW5uZWwoYykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlRyb2xsTW92ZSA9IFRyb2xsTW92ZTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tbWFuZHMvdGVzdC50c1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgbWl4aW5zXzEgPSByZXF1aXJlKFwiLi4vbWl4aW5zXCIpO1xyXG5jbGFzcyBBbHRGNCBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJhbHRmNFwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzdXJwcmlzZVwiLFxyXG4gICAgICAgICAgICBwZXJtaXNzaW9uczogW11cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJ1bihib3QsIG1lc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBtZXNzYWdlLm1lbWJlci5zZXREZWFmKHRydWUpO1xyXG4gICAgICAgICAgICBtZXNzYWdlLm1lbWJlci5zZXRNdXRlKHRydWUpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UubWVtYmVyLnNldERlYWYoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5tZW1iZXIuc2V0TXV0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH0sIDEwMDAgKiA2MCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5BbHRGNCA9IEFsdEY0O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21tYW5kcy9mdW4udHNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGNvbW1hbmRzXzEgPSByZXF1aXJlKFwiLi9jb21tYW5kc1wiKTtcclxuY29uc3QgY29sb3JzID0gcmVxdWlyZShcImNvbG9ycy9zYWZlXCIpO1xyXG5jbGFzcyBSZWdpc3RyeSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnRleHRDb21tYW5kcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIHRoaXMuYWRkVGV4dENvbW1hbmQoY29tbWFuZHNfMS5IZWxwKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyBjb21tYW5kIHRvIHRoZSByZWdpc3RyeVxyXG4gICAgICogQHBhcmFtIGNvbnN0cnVjdG9yIENvbnN0cnVjdG9yIG9mIHRoZSBjb21tYW5kIGNsYXNzXHJcbiAgICAgKi9cclxuICAgIGFkZFRleHRDb21tYW5kKGNvbnN0cnVjdG9yKSB7XHJcbiAgICAgICAgbGV0IGNtZCA9IG5ldyBjb25zdHJ1Y3RvcigpO1xyXG4gICAgICAgIHRoaXMudGV4dENvbW1hbmRzLnB1c2goY21kKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb2xvcnMueWVsbG93KFwiW1JdXCIpLCBcIitcIiwgY29sb3JzLmJsdWUoXCIoQylcIiksIGNvbnN0cnVjdG9yLm5hbWUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGhlIGNvbW1hbmQgY2xhc3MgYXNzb2NpYXRlZCB3aXRoIHRoZSBjb21tYW5kIG5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIGNvbW1hbmQgbmFtZVxyXG4gICAgICovXHJcbiAgICBnZXRUZXh0Q29tbWFuZChuYW1lKSB7XHJcbiAgICAgICAgLy8gZmluZCBhIHRleHRDb21tYW5kIHdoZXJlIGFueSBhbGlhc2UgZXF1YWxzIHRoZSBwcm92aWRlZCBuYW1lXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dENvbW1hbmRzLmZpbmQodGMgPT4gdGMuYWxpYXNlcy5zb21lKGEgPT4gYSA9PT0gbmFtZSkpO1xyXG4gICAgfVxyXG4gICAgLy8gZ2V0IHRleHRDb21tYW5kcygpOiBBcnJheTxUZXh0Q29tbWFuZD4ge1xyXG4gICAgLy8gICByZXR1cm4gdGhpcy50ZXh0Q29tbWFuZHM7XHJcbiAgICAvLyB9XHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY29tbWFuZFxyXG4gICAgICogQHBhcmFtIGJvdFxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBwYXJzZWRNZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIGV4ZWN1dGVDb21tYW5kKGNvbW1hbmQsIGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIGxldCBjbWQgPSB0aGlzLnRleHRDb21tYW5kcy5maW5kKHRjID0+IHRjLmlzID09PSBjb21tYW5kKTtcclxuICAgICAgICByZXR1cm4gY21kLnJ1bihib3QsIG1lc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuUmVnaXN0cnkgPSBSZWdpc3RyeTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gUmVnaXN0cnk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL1JlZ2lzdHJ5LnRzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0aW1lcnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ0aW1lcnNcIlxuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==