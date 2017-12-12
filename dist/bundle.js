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
var text_command_1 = __webpack_require__(9);
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
const help_1 = __webpack_require__(8);
exports.Help = help_1.Help;
const general_1 = __webpack_require__(10);
const admin_1 = __webpack_require__(11);
const moderation_1 = __webpack_require__(12);
const music_1 = __webpack_require__(13);
const test_1 = __webpack_require__(14);
const fun_1 = __webpack_require__(15);
exports.defaultCommands = [
    moderation_1.Ban,
    moderation_1.BanTest,
    moderation_1.SoftBan,
    moderation_1.Clear,
    test_1.Test,
    admin_1.ChangePrefix,
    fun_1.AltF4,
    music_1.Disconenct,
    admin_1.Playing,
    moderation_1.Poll,
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
const commands_1 = __webpack_require__(2);
const Registry_1 = __webpack_require__(16);
const bot_settings_1 = __webpack_require__(5);
const parser_1 = __webpack_require__(3);
const validator_1 = __webpack_require__(17);
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
        if (!validator_1.Validator.messageValid(message, this.settings.prefix))
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
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Validator;
(function (Validator) {
    function messageValid(message, cmdPrefix) {
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
        // if (!regexp.test(message.content)) return false;
        return regexp.test(message.content);
        // return true;
    }
    Validator.messageValid = messageValid;
    function escape(str) {
        const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
        return str.replace(matchOperatorsRe, '\\$&');
    }
})(Validator = exports.Validator || (exports.Validator = {}));


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("timers");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjk2NTc3YmExN2FlOWY3MTVkZWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL21peGlucy9pbmRleC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJkaXNjb3JkLmpzXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1hbmRzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9wYXJzZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29sb3JzL3NhZmVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvYm90LXNldHRpbmdzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYm90LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tYW5kcy9oZWxwLnRzIiwid2VicGFjazovLy8uL3NyYy9taXhpbnMvdGV4dC1jb21tYW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tYW5kcy9nZW5lcmFsLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tYW5kcy9hZG1pbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbWFuZHMvbW9kZXJhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbWFuZHMvbXVzaWMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1hbmRzL3Rlc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1hbmRzL2Z1bi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVnaXN0cnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3ZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0aW1lcnNcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDMUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQSxDQUFDLDBEQUEwRDs7Ozs7OztBQzFCM0QsbUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjk2NTc3YmExN2FlOWY3MTVkZWIiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdGV4dF9jb21tYW5kXzEgPSByZXF1aXJlKFwiLi90ZXh0LWNvbW1hbmRcIik7XHJcbmV4cG9ydHMuVGV4dENvbW1hbmQgPSB0ZXh0X2NvbW1hbmRfMS5UZXh0Q29tbWFuZDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWl4aW5zL2luZGV4LnRzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRpc2NvcmQuanNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJkaXNjb3JkLmpzXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgaGVscF8xID0gcmVxdWlyZShcIi4vaGVscFwiKTtcclxuZXhwb3J0cy5IZWxwID0gaGVscF8xLkhlbHA7XHJcbmNvbnN0IGdlbmVyYWxfMSA9IHJlcXVpcmUoXCIuL2dlbmVyYWxcIik7XHJcbmNvbnN0IGFkbWluXzEgPSByZXF1aXJlKFwiLi9hZG1pblwiKTtcclxuY29uc3QgbW9kZXJhdGlvbl8xID0gcmVxdWlyZShcIi4vbW9kZXJhdGlvblwiKTtcclxuY29uc3QgbXVzaWNfMSA9IHJlcXVpcmUoXCIuL211c2ljXCIpO1xyXG5jb25zdCB0ZXN0XzEgPSByZXF1aXJlKFwiLi90ZXN0XCIpO1xyXG5jb25zdCBmdW5fMSA9IHJlcXVpcmUoXCIuL2Z1blwiKTtcclxuZXhwb3J0cy5kZWZhdWx0Q29tbWFuZHMgPSBbXHJcbiAgICBtb2RlcmF0aW9uXzEuQmFuLFxyXG4gICAgbW9kZXJhdGlvbl8xLkJhblRlc3QsXHJcbiAgICBtb2RlcmF0aW9uXzEuU29mdEJhbixcclxuICAgIG1vZGVyYXRpb25fMS5DbGVhcixcclxuICAgIHRlc3RfMS5UZXN0LFxyXG4gICAgYWRtaW5fMS5DaGFuZ2VQcmVmaXgsXHJcbiAgICBmdW5fMS5BbHRGNCxcclxuICAgIG11c2ljXzEuRGlzY29uZW5jdCxcclxuICAgIGFkbWluXzEuUGxheWluZyxcclxuICAgIG1vZGVyYXRpb25fMS5Qb2xsLFxyXG4gICAgbW9kZXJhdGlvbl8xLlRpbWVNdXRlLFxyXG4gICAgbW9kZXJhdGlvbl8xLlRpbWVEZWFmLFxyXG4gICAgZ2VuZXJhbF8xLlJhbmRvbSxcclxuICAgIGdlbmVyYWxfMS5DaG9pY2UsXHJcbiAgICB0ZXN0XzEuVHJvbGxNb3ZlLFxyXG4gICAgYWRtaW5fMS5TZXJ2ZXJzLFxyXG4gICAgYWRtaW5fMS5HaXZlQWRtaW5cclxuXTtcclxuZXhwb3J0cy5tdXNpY0NvbW1hbmRzID0gW1xyXG4gICAgbXVzaWNfMS5Kb2luLFxyXG4gICAgbXVzaWNfMS5TdG9wLFxyXG4gICAgbXVzaWNfMS5EaXNjb25lbmN0LFxyXG4gICAgbXVzaWNfMS5Wb2x1bWUsXHJcbiAgICBtdXNpY18xLlBhdXNlLFxyXG4gICAgbXVzaWNfMS5SZXN1bWVcclxuXTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tbWFuZHMvaW5kZXgudHNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgY29sb3JzID0gcmVxdWlyZShcImNvbG9ycy9zYWZlXCIpO1xyXG52YXIgUGFyc2VyO1xyXG4oZnVuY3Rpb24gKFBhcnNlcikge1xyXG4gICAgZnVuY3Rpb24gcGFyc2VUaW1lKHRpbWUpIHtcclxuICAgICAgICBsZXQgcmVnZXhEYXlzID0gL1xcZCtkLztcclxuICAgICAgICBsZXQgcmVnZXhIb3VycyA9IC9cXGQraC87XHJcbiAgICAgICAgbGV0IHJlZ2V4TWludXRlcyA9IC9cXGQrbS87XHJcbiAgICAgICAgbGV0IHJlZ2V4U2Vjb25kcyA9IC9cXGQrcy87XHJcbiAgICAgICAgbGV0IGRheXMgPSArKHRpbWUubWF0Y2gocmVnZXhEYXlzKSB8fCBcIjBkXCIpWzBdLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICBsZXQgaG91cnMgPSArKHRpbWUubWF0Y2gocmVnZXhIb3VycykgfHwgXCIwaFwiKVswXS5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgbGV0IG1pbnV0ZXMgPSArKHRpbWUubWF0Y2gocmVnZXhNaW51dGVzKSB8fCBcIjBtXCIpWzBdLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICBsZXQgc2Vjb25kcyA9ICsodGltZS5tYXRjaChyZWdleFNlY29uZHMpIHx8IFwiMHNcIilbMF0uc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgIHJldHVybiB7IGRheXMsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzIH07XHJcbiAgICB9XHJcbiAgICBQYXJzZXIucGFyc2VUaW1lID0gcGFyc2VUaW1lO1xyXG4gICAgZnVuY3Rpb24gcGFyc2VNZXNzYWdlKG1lc3NhZ2UsIGNtZFByZWZpeCkge1xyXG4gICAgICAgIGxldCBhcmdzID0gbWVzc2FnZS5jb250ZW50LnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAvLyByZW1vdmUgZW1wdHkgYXJnc1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYXJnc1tpXSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgYXJncy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlzID0gYXJncy5zaGlmdCgpLnRvTG93ZXJDYXNlKCkuc3Vic3RyKGNtZFByZWZpeC5sZW5ndGgpO1xyXG4gICAgICAgIGxldCBtc2cgPSB7XHJcbiAgICAgICAgICAgIGlzLFxyXG4gICAgICAgICAgICBhcmdzXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgJHtjb2xvcnMueWVsbG93KFwiW0NdXCIpfSBieSAke2NvbG9ycy5ibHVlKG1lc3NhZ2UuYXV0aG9yLnRhZyl9OiAke21zZy5pc30gWyR7bXNnLmFyZ3Muam9pbihcIixcIil9XWApO1xyXG4gICAgICAgIHJldHVybiBtc2c7XHJcbiAgICB9XHJcbiAgICBQYXJzZXIucGFyc2VNZXNzYWdlID0gcGFyc2VNZXNzYWdlO1xyXG59KShQYXJzZXIgPSBleHBvcnRzLlBhcnNlciB8fCAoZXhwb3J0cy5QYXJzZXIgPSB7fSkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBQYXJzZXI7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3V0aWxzL3BhcnNlci50c1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb2xvcnMvc2FmZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvbG9ycy9zYWZlXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY2xhc3MgQm90U2V0dGluZ3Mge1xyXG4gICAgY29uc3RydWN0b3Iob3duZXIpIHtcclxuICAgICAgICB0aGlzLmRlZmF1bHRQcmVmaXggPSBcIi5cIjtcclxuICAgICAgICB0aGlzLl9vd25lciA9IG93bmVyO1xyXG4gICAgfVxyXG4gICAgZ2V0IHRva2VuKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90b2tlbjtcclxuICAgIH1cclxuICAgIHNldCB0b2tlbih0b2tlbikge1xyXG4gICAgICAgIHRoaXMuX3Rva2VuID0gdG9rZW47XHJcbiAgICB9XHJcbiAgICBnZXQgcHJlZml4KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcmVmaXggfHwgdGhpcy5kZWZhdWx0UHJlZml4O1xyXG4gICAgfVxyXG4gICAgc2V0IHByZWZpeChwcmVmaXgpIHtcclxuICAgICAgICB0aGlzLl9wcmVmaXggPSBwcmVmaXggfHwgdGhpcy5kZWZhdWx0UHJlZml4O1xyXG4gICAgfVxyXG4gICAgZ2V0IGV4dHJhcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZXh0cmFzO1xyXG4gICAgfVxyXG4gICAgc2V0IGV4dHJhcyhleHRyYXMpIHtcclxuICAgICAgICB0aGlzLl9leHRyYXMgPSBleHRyYXM7XHJcbiAgICB9XHJcbiAgICBnZXQgZ2FtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZTtcclxuICAgIH1cclxuICAgIHNldCBnYW1lKGdhbWUpIHtcclxuICAgICAgICB0aGlzLl9nYW1lID0gZ2FtZTtcclxuICAgIH1cclxuICAgIGdldCBub3RpZnlVbmtub3duQ29tbWFuZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbm90aWZ5VW5rbm93bkNvbW1hbmQ7XHJcbiAgICB9XHJcbiAgICBzZXQgbm90aWZ5VW5rbm93bkNvbW1hbmQobm90aWZ5VW5rbm93bkNvbW1hbmQpIHtcclxuICAgICAgICB0aGlzLl9ub3RpZnlVbmtub3duQ29tbWFuZCA9IG5vdGlmeVVua25vd25Db21tYW5kO1xyXG4gICAgfVxyXG4gICAgZ2V0IG93bmVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vd25lcjtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkJvdFNldHRpbmdzID0gQm90U2V0dGluZ3M7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEJvdFNldHRpbmdzO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9ib3Qtc2V0dGluZ3MudHNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgYm90XzEgPSByZXF1aXJlKFwiLi9ib3RcIik7XHJcbmV4cG9ydHMuQm90ID0gYm90XzEuQm90O1xyXG52YXIgYm90X3NldHRpbmdzXzEgPSByZXF1aXJlKFwiLi9ib3Qtc2V0dGluZ3NcIik7XHJcbmV4cG9ydHMuQm90U2V0dGluZ3MgPSBib3Rfc2V0dGluZ3NfMS5Cb3RTZXR0aW5ncztcclxudmFyIG1peGluc18xID0gcmVxdWlyZShcIi4vbWl4aW5zXCIpO1xyXG5leHBvcnRzLlRleHRDb21tYW5kID0gbWl4aW5zXzEuVGV4dENvbW1hbmQ7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGJvdF8xLkJvdDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW5kZXgudHNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRGlzY29yZCA9IHJlcXVpcmUoXCJkaXNjb3JkLmpzXCIpO1xyXG5jb25zdCBjb21tYW5kc18xID0gcmVxdWlyZShcIi4vY29tbWFuZHNcIik7XHJcbmNvbnN0IFJlZ2lzdHJ5XzEgPSByZXF1aXJlKFwiLi9SZWdpc3RyeVwiKTtcclxuY29uc3QgYm90X3NldHRpbmdzXzEgPSByZXF1aXJlKFwiLi9ib3Qtc2V0dGluZ3NcIik7XHJcbmNvbnN0IHBhcnNlcl8xID0gcmVxdWlyZShcIi4vdXRpbHMvcGFyc2VyXCIpO1xyXG5jb25zdCB2YWxpZGF0b3JfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL3ZhbGlkYXRvclwiKTtcclxuY29uc3QgdGltZXJzXzEgPSByZXF1aXJlKFwidGltZXJzXCIpO1xyXG5jbGFzcyBCb3QgZXh0ZW5kcyBEaXNjb3JkLkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW0wXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHsgdG9rZW4gPSBcIlwiLCBwcmVmaXggPSBcIlwiLCBidWlsZEluQ29tbWFuZHMgPSB0cnVlLCBidWlsZEluTXVzaWNDb21tYW5kcyA9IGZhbHNlLCBidWlsZEluRmlsdGVycyA9IHRydWUsIGdhbWUgPSBudWxsLCBleHRyYXMgPSB7fSwgbm90aWZ5VW5rbm93bkNvbW1hbmQgPSB0cnVlLCBvd25lciA9IFwiXCIgfSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZXMgPSAwO1xyXG4gICAgICAgIHRoaXMucmVnaXN0cnkgPSBuZXcgUmVnaXN0cnlfMS5SZWdpc3RyeSgpO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBuZXcgYm90X3NldHRpbmdzXzEuQm90U2V0dGluZ3Mob3duZXIpO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdEdhbWUgPSBgJHt0aGlzLnNldHRpbmdzLnByZWZpeH1oZWxwIGZvciBoZWxwYDtcclxuICAgICAgICAvLyBpbml0IHNldHRpbmdzXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5wcmVmaXggPSBwcmVmaXg7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy50b2tlbiA9IHRva2VuO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5leHRyYXMgPSBleHRyYXM7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5ub3RpZnlVbmtub3duQ29tbWFuZCA9IG5vdGlmeVVua25vd25Db21tYW5kO1xyXG4gICAgICAgIGlmIChidWlsZEluQ29tbWFuZHMpXHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJDb21tbWFuZHMoY29tbWFuZHNfMS5kZWZhdWx0Q29tbWFuZHMpO1xyXG4gICAgICAgIGlmIChidWlsZEluTXVzaWNDb21tYW5kcylcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNvbW1tYW5kcyhjb21tYW5kc18xLm11c2ljQ29tbWFuZHMpO1xyXG4gICAgICAgIC8vIGlmIChidWlsZEluRmlsdGVycykgdGhpcy5yZWdpc3RlckZpbHRlcnMoYnVpbHRJbkZpbHRlcnMpO1xyXG4gICAgICAgIHRoaXMub24oJ3JlYWR5JywgdGhpcy5yZWFkeSk7XHJcbiAgICAgICAgdGhpcy5vbignbWVzc2FnZScsIHRoaXMubWVzc2FnZXMpO1xyXG4gICAgfVxyXG4gICAgcmVhZHkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ2FtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnVzZXIuc2V0R2FtZSh0aGlzLnNldHRpbmdzLmdhbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhgXHJcbiAgICBCb3QgU3RhcnRlZCBhcyAke3RoaXMudXNlci50YWd9XHJcbiAgICBJRDogJHt0aGlzLnVzZXIuaWR9XHJcbiAgICAke3RoaXMuZ3VpbGRzLmFycmF5KCkubGVuZ3RofSBzZXJ2ZXJzXHJcbiAgICAke3RoaXMuY2hhbm5lbHMuYXJyYXkoKS5sZW5ndGh9IGNoYW5uZWxzXHJcbiAgICAke3RoaXMudXNlcnMuYXJyYXkoKS5sZW5ndGh9IHVzZXJzXHJcblxyXG4gICAgT3duZXJJZDogJHt0aGlzLnNldHRpbmdzLm93bmVyfVxyXG5cclxuICAgIEludml0ZSBMaW5rOiBodHRwczovL2Rpc2NvcmRhcHAuY29tL29hdXRoMi9hdXRob3JpemU/Y2xpZW50X2lkPSR7dGhpcy51c2VyLmlkfSZzY29wZT1ib3QmcGVybWlzc2lvbnM9OFxyXG4gICAgYCk7XHJcbiAgICAgICAgdGltZXJzXzEuc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZvaWNlQ2hlY2tlcigpO1xyXG4gICAgICAgIH0sIDYwICogMTAwMCk7XHJcbiAgICB9XHJcbiAgICByZWdpc3RlckNvbW1tYW5kcyhjb21tYW5kcykge1xyXG4gICAgICAgIGNvbW1hbmRzLmZvckVhY2goY29tbWFuZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cnkuYWRkVGV4dENvbW1hbmQoY29tbWFuZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENvbm5lY3QgdGhlIGJvdCB0byB0aGUgc2VydmVyXHJcbiAgICAgKiBAcGFyYW0gdG9rZW4gYm90IGxvZ2luIHRva2VuXHJcbiAgICAgKi9cclxuICAgIGNvbm5lY3QodG9rZW4gPSB0aGlzLnNldHRpbmdzLnRva2VuKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBjaGVjayBpZiBhIGxvZ2luIHRva2VuIGlzIGdpdmVuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLnRva2VuICYmICF0b2tlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJwbGVhc2UgcHJvdmlkZSBhIGxvZ2luIHRva2VuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy50b2tlbiA9IHRva2VuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvZ2luKHRoaXMuc2V0dGluZ3MudG9rZW4pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBtZXNzYWdlcyhtZXNzYWdlKSB7XHJcbiAgICAgICAgLy8gaWdub3JlIG1lc3NhZ2VzIGZyb20gb3RoZXIgYm90c1xyXG4gICAgICAgIGlmIChtZXNzYWdlLmF1dGhvci5ib3QpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyBjaGVjayBpZiBtZXNzYWdlIGlzIG5vIHByaXZhdGUgbWVzc2FnZVxyXG4gICAgICAgIGlmIChtZXNzYWdlLmNoYW5uZWwudHlwZSA9PT0gXCJkbVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgbWVzc2FnZSBpZiBmb3JtYXR0ZWQgbGlrZSBhIGNvbW1hbmRcclxuICAgICAgICBpZiAoIXZhbGlkYXRvcl8xLlZhbGlkYXRvci5tZXNzYWdlVmFsaWQobWVzc2FnZSwgdGhpcy5zZXR0aW5ncy5wcmVmaXgpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gcGFyc2UgdGhlIG1lc3NhZ2VcclxuICAgICAgICAvLyBsZXQgcGFyc2VkTWVzc2FnZSA9IHBhcnNlTWVzc2FnZShtZXNzYWdlLCB0aGlzLnNldHRpbmdzLnByZWZpeCk7XHJcbiAgICAgICAgbGV0IHBhcnNlZE1lc3NhZ2UgPSBwYXJzZXJfMS5QYXJzZXIucGFyc2VNZXNzYWdlKG1lc3NhZ2UsIHRoaXMuc2V0dGluZ3MucHJlZml4KTtcclxuICAgICAgICAvL2dldCBjb21tYW5kIGZyb20gdGhlIHJlZ2lzdHJ5XHJcbiAgICAgICAgbGV0IGNvbW1hbmQgPSB0aGlzLnJlZ2lzdHJ5LmdldFRleHRDb21tYW5kKHBhcnNlZE1lc3NhZ2UuaXMpO1xyXG4gICAgICAgIC8vIGlmIHRoZSBjb21tYW5kIHdhc24ndCBmb3VuZCBvciBhIG5vcm1hbCB1c2VyIHRyaWVkIHRvIGV4ZWN1dGUgYW4gb3duZXJPbmx5IGNvbW1hbmRcclxuICAgICAgICBpZiAoIWNvbW1hbmQgfHwgKGNvbW1hbmQub253ZXJPbmx5ICYmIG1lc3NhZ2UuYXV0aG9yLmlkICE9PSB0aGlzLnNldHRpbmdzLm93bmVyKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ub3RpZnlVbmtub3duQ29tbWFuZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoYDQwNCBDb21tYW5kIG5vdCBmb3VuZC4gVHlwZSAke3RoaXMuc2V0dGluZ3MucHJlZml4fWhlbHAgZm9yIGEgbGlzdCBvZiBjb21tYW5kc2ApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFsbG93ZWQgPSBmYWxzZTtcclxuICAgICAgICAvL2FsbG93IGZvciBib3Qgb3duZXJcclxuICAgICAgICBpZiAobWVzc2FnZS5hdXRob3IuaWQgPT09IHRoaXMuc2V0dGluZ3Mub3duZXIpIHtcclxuICAgICAgICAgICAgYWxsb3dlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGFsbG93IGlmIHVzZXIgaGFzIHJlcXVpcmVkIHBlcm1pc3Npb25zXHJcbiAgICAgICAgaWYgKGNvbW1hbmQucGVybWlzc2lvbnMubGVuZ3RoID4gMCAmJiBtZXNzYWdlLm1lbWJlci5oYXNQZXJtaXNzaW9uKGNvbW1hbmQucGVybWlzc2lvbnMpKSB7XHJcbiAgICAgICAgICAgIGFsbG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBhbGxvdyBpZiB1c2VyIGhhcyBhdCBsZWFzdCB0aGUgbWluIHJvbGVcclxuICAgICAgICBpZiAoY29tbWFuZC5wZXJtaXNzaW9ucy5sZW5ndGggPT0gMCAmJiBjb21tYW5kLnJvbGVzLmxlbmd0aCA9PSAwICYmICFjb21tYW5kLm1pblJvbGUpIHtcclxuICAgICAgICAgICAgYWxsb3dlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGFsbG93IGlmIHRoZSB1c2VyIGhhcyBzb21lIG9mIHRoZSBhbGxvd2VkIHJvbGVzXHJcbiAgICAgICAgaWYgKG1lc3NhZ2UubWVtYmVyLnJvbGVzLnNvbWUociA9PiBjb21tYW5kLnJvbGVzLmluZGV4T2Yoci5uYW1lKSAhPSAtMSkpIHtcclxuICAgICAgICAgICAgYWxsb3dlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb21tYW5kLm1pblJvbGUpIHtcclxuICAgICAgICAgICAgbGV0IG1pblJvbGUgPSBtZXNzYWdlLmd1aWxkLnJvbGVzLmZpbmQoXCJuYW1lXCIsIGNvbW1hbmQubWluUm9sZSkgfHwgbWVzc2FnZS5ndWlsZC5kZWZhdWx0Um9sZTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UubWVtYmVyLmhpZ2hlc3RSb2xlLmNvbXBhcmVQb3NpdGlvblRvKG1pblJvbGUpID49IDApIHtcclxuICAgICAgICAgICAgICAgIGFsbG93ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYWxsb3dlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcIllvdSBkb24ndCBoYXZlIHBlcm1pc3Npb24gdG8gZXhlY3V0ZSB0aGlzIGNvbW1hbmRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbW1hbmQucnVuKHRoaXMsIG1lc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gICAgc2V0IGdhbWUoZ2FtZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZVwiLCBnYW1lKTtcclxuICAgICAgICB0aGlzLnVzZXIuc2V0R2FtZShnYW1lKTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLmdhbWUgPSBnYW1lO1xyXG4gICAgfVxyXG4gICAgcmVmcmVzaCgpIHtcclxuICAgICAgICB0aGlzLmdhbWUgPSB0aGlzLmRlZmF1bHRHYW1lO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqL1xyXG4gICAgZ2V0Vm9pY2VDb25uZWN0aW9uKGd1aWxkSWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52b2ljZUNvbm5lY3Rpb25zLmZpbmQodmMgPT4gdmMuY2hhbm5lbC5ndWlsZC5pZCA9PT0gZ3VpbGRJZCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIHRoZSBpZCBtYXRjaGVzIHRoZSBvd25lciBpZFxyXG4gICAgICogQHBhcmFtIGlkIGlkIHRvIGNoZWNrXHJcbiAgICAgKi9cclxuICAgIGlzT3duZXJJZChpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLm93bmVyID09PSBpZDtcclxuICAgIH1cclxuICAgIHZvaWNlQ2hlY2tlcigpIHtcclxuICAgICAgICBsZXQgY29ubmVjdGlvbnMgPSB0aGlzLnZvaWNlQ29ubmVjdGlvbnM7XHJcbiAgICAgICAgY29ubmVjdGlvbnMuZm9yRWFjaChjID0+IHtcclxuICAgICAgICAgICAgaWYgKGMuY2hhbm5lbC5tZW1iZXJzLmFycmF5KCkubGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAgICAgICAgIGMuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghYy5kaXNwYXRjaGVyIHx8ICFjLmRpc3BhdGNoZXIucGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBjLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuQm90ID0gQm90O1xyXG5leHBvcnRzLmRlZmF1bHQgPSBCb3Q7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JvdC50c1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBEaXNjb3JkID0gcmVxdWlyZShcImRpc2NvcmQuanNcIik7XHJcbmNvbnN0IG1peGluc18xID0gcmVxdWlyZShcIi4uL21peGluc1wiKTtcclxuY2xhc3MgSGVscCBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJoZWxwXCIsXHJcbiAgICAgICAgICAgIGFsaWFzZXM6IFtcclxuICAgICAgICAgICAgICAgIFwiaFwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInNlbmQgYSBoZWxwIG1lc3NhZ2VcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBlbWJlZCA9IG5ldyBEaXNjb3JkLlJpY2hFbWJlZCgpO1xyXG4gICAgICAgICAgICBpZiAocGFyc2VkTWVzc2FnZS5hcmdzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJnID0gcGFyc2VkTWVzc2FnZS5hcmdzWzFdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbW1hbmQgPSBib3QucmVnaXN0cnkuZ2V0VGV4dENvbW1hbmQocGFyc2VkTWVzc2FnZS5hcmdzWzBdKTtcclxuICAgICAgICAgICAgICAgIGlmIChhcmcgPT09IFwiLWNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbW1hbmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIWNvbW1hbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRIZWxwKGJvdCwgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRIZWxwRm9yQ29tbWFuZChib3QsIG1lc3NhZ2UsIGNvbW1hbmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kSGVscChib3QsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzZW5kSGVscChib3QsIG1lc3NhZ2UpIHtcclxuICAgICAgICBsZXQgZW1iZWQgPSBuZXcgRGlzY29yZC5SaWNoRW1iZWQoKTtcclxuICAgICAgICBsZXQgY29tbWFuZHM7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2UuYXV0aG9yLmlkID09PSBib3Quc2V0dGluZ3Mub3duZXIpIHtcclxuICAgICAgICAgICAgY29tbWFuZHMgPSBib3QucmVnaXN0cnkudGV4dENvbW1hbmRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29tbWFuZHMgPSBib3QucmVnaXN0cnkudGV4dENvbW1hbmRzLmZpbHRlcihjID0+IGMub253ZXJPbmx5ID09PSBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVtYmVkLnNldENvbG9yKFwiI0ZBRkFGQVwiKS5zZXRUaXRsZShcIkNvbW1hbmRzXCIpO1xyXG4gICAgICAgIGxldCB0ZXh0ID0gXCJcIjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbW1hbmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjb21tYW5kID0gY29tbWFuZHNbaV07XHJcbiAgICAgICAgICAgIC8vIGVtYmVkLmFkZEZpZWxkKGAke2JvdC5zZXR0aW5ncy5wcmVmaXh9JHtjb21tYW5kLmlzfWAsIGAke2NvbW1hbmQuZGVzY3JpcHRpb259YCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAvLyBlbWJlZC5hZGRGaWVsZChgWyR7Ym90LnNldHRpbmdzLnByZWZpeH0ke2NvbW1hbmQuaXN9XShodHRwczovL2dpdGh1Yi5jb20vZGFubGlvbmlzL2RvbmJvdClgLCBgJHtjb21tYW5kLmRlc2NyaXB0aW9ufWAsIHRydWUpO1xyXG4gICAgICAgICAgICB0ZXh0ICs9IGBcXGAke2JvdC5zZXR0aW5ncy5wcmVmaXh9JHtjb21tYW5kLmlzfVxcYCAtICR7Y29tbWFuZC5kZXNjcmlwdGlvbn1cXG5cXG5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbWJlZC5zZXREZXNjcmlwdGlvbih0ZXh0KTtcclxuICAgICAgICBtZXNzYWdlLmF1dGhvci5zZW5kKGVtYmVkKTtcclxuICAgIH1cclxuICAgIHNlbmRIZWxwRm9yQ29tbWFuZChib3QsIG1lc3NhZ2UsIGNvbW1hbmQpIHtcclxuICAgICAgICBsZXQgZW1iZWQgPSBuZXcgRGlzY29yZC5SaWNoRW1iZWQoKTtcclxuICAgICAgICBsZXQgYWxpYXNlcyA9IGNvbW1hbmQuYWxpYXNlcy5tYXAoYSA9PiBib3Quc2V0dGluZ3MucHJlZml4ICsgYSk7XHJcbiAgICAgICAgZW1iZWRcclxuICAgICAgICAgICAgLnNldFRpdGxlKGNvbW1hbmQuaXMpO1xyXG4gICAgICAgIGlmIChjb21tYW5kLmRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIGVtYmVkLnNldERlc2NyaXB0aW9uKGNvbW1hbmQuZGVzY3JpcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29tbWFuZC5oZWxwKSB7XHJcbiAgICAgICAgICAgIGVtYmVkLmFkZEZpZWxkKFwiSW5mb1wiLCBjb21tYW5kLmhlbHApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWxpYXNlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIGVtYmVkLmFkZEZpZWxkKFwiQWxpYXNlc1wiLCBhbGlhc2VzLmpvaW4oYCBgKSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb2xvciA9ICcjJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2Nzc3MjE1KS50b1N0cmluZygxNik7XHJcbiAgICAgICAgZW1iZWQuc2V0Q29sb3IoY29sb3IpO1xyXG4gICAgICAgIG1lc3NhZ2UuYXV0aG9yLnNlbmQoZW1iZWQpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuSGVscCA9IEhlbHA7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEhlbHA7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbW1hbmRzL2hlbHAudHNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY2xhc3MgVGV4dENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IoeyBjb21tYW5kID0gXCJcIiwgZGVzY3JpcHRpb24gPSBcIlwiLCBoZWxwID0gXCJcIiwgcGVybWlzc2lvbnMgPSBbXSwgcm9sZXMgPSBbXSwgbWluUm9sZSA9IFwiXCIsIGFsaWFzZXMgPSBbXSwgb3duZXJPbmx5ID0gZmFsc2UgfSkge1xyXG4gICAgICAgIHRoaXMuX2NvbW1hbmQgPSBjb21tYW5kO1xyXG4gICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy5faGVscCA9IGhlbHA7XHJcbiAgICAgICAgdGhpcy5fcGVybWlzc2lvbnMgPSBwZXJtaXNzaW9ucy5tYXAocCA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcCA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBwLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fcm9sZXMgPSByb2xlcztcclxuICAgICAgICB0aGlzLl9taW5Sb2xlID0gbWluUm9sZTtcclxuICAgICAgICB0aGlzLl9vd25lck9ubHkgPSBvd25lck9ubHk7XHJcbiAgICAgICAgYWxpYXNlcy51bnNoaWZ0KGNvbW1hbmQpO1xyXG4gICAgICAgIHRoaXMuX2FsaWFzZXMgPSBhbGlhc2VzO1xyXG4gICAgfVxyXG4gICAgZ2V0IG9ud2VyT25seSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3duZXJPbmx5O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGhlIG5hbWUgb2YgdGhlIGNvbW1hbmRcclxuICAgICAqL1xyXG4gICAgZ2V0IGlzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21tYW5kO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgYWxsIHBvc3NpbGJlIGFsaWFzZXMgZm9yIHRoaXMgY29tbWFuZFxyXG4gICAgICovXHJcbiAgICBnZXQgYWxpYXNlcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWxpYXNlcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgY29tbWFuZFxyXG4gICAgICovXHJcbiAgICBnZXQgZGVzY3JpcHRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGhlIGhlbHAgdGV4dCBvZiB0aGUgY29tbWFuZFxyXG4gICAgICovXHJcbiAgICBnZXQgaGVscCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faGVscDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHJlcXVpcmVkIHBlcm1pc3Npb25zIGZvciB0aGUgY29tbWFuZFxyXG4gICAgICovXHJcbiAgICBnZXQgcGVybWlzc2lvbnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Blcm1pc3Npb25zO1xyXG4gICAgfVxyXG4gICAgZ2V0IHJvbGVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yb2xlcztcclxuICAgIH1cclxuICAgIGdldCBtaW5Sb2xlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW5Sb2xlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSdW4gdGhlIGNvbW1hbmRcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlIHtEaXNjb3JkLk1lc3NhZ2V9IC0gcmF3IG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBwYXJzZWRNZXNzYWdlIHtQYXJzZWRNZXNzYWdlfSAtIHBhcnNlZCBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gcmVnaXN0cnkge1JlZ2lzdHJ5fSAtIHJlZ2lzdHJ5XHJcbiAgICAgKi9cclxuICAgIC8vVE9ETzogYXJnc1xyXG4gICAgLy8gcHVibGljIGFzeW5jIHJ1bihib3Q6IEJvdCwgbWVzc2FnZTogRGlzY29yZC5NZXNzYWdlLCBwYXJzZWRNZXNzYWdlOiBQYXJzZWRNZXNzYWdlKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIC8vICAgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKFwidGhlcmUgaXMgbm8gY29tbWFuZCB3aXRoIHRoaXMgbmFtZVwiKTtcclxuICAgIC8vIH1cclxuICAgIHJ1bihib3QsIG1lc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocGFyc2VkTWVzc2FnZS5hcmdzWzBdID09PSBcIi1oXCIpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYXV0aG9yLnNlbmQodGhpcy5oZWxwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVGV4dENvbW1hbmQgPSBUZXh0Q29tbWFuZDtcclxuZXhwb3J0cy5kZWZhdWx0ID0gVGV4dENvbW1hbmQ7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21peGlucy90ZXh0LWNvbW1hbmQudHNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRGlzY29yZCA9IHJlcXVpcmUoXCJkaXNjb3JkLmpzXCIpO1xyXG5jb25zdCBtaXhpbnNfMSA9IHJlcXVpcmUoXCIuLi9taXhpbnNcIik7XHJcbmNsYXNzIFJhbmRvbSBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJyYW5kb21cIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiY2hvb3NlcyBhIHJhbmRvbSBudW1iZXJcIixcclxuICAgICAgICAgICAgYWxpYXNlczogW1xyXG4gICAgICAgICAgICAgICAgXCJyXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBtaW4gPSAxO1xyXG4gICAgICAgICAgICBsZXQgbWF4ID0gMTA7XHJcbiAgICAgICAgICAgIGxldCByZWdleFJhbmdlID0gL1xcZC1cXGQvO1xyXG4gICAgICAgICAgICBsZXQgcmVnZXhWYWxpZCA9IC9eXFxkKyQvO1xyXG4gICAgICAgICAgICAvLyB0ZXN0IGlmIGNvbW1hbmQgcHJvdmlkZWQgYSByYW5nZSBlLmcuIFtwXXJhbmRvbSA2LTQ1XHJcbiAgICAgICAgICAgIGlmIChyZWdleFJhbmdlLnRlc3QocGFyc2VkTWVzc2FnZS5hcmdzWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyZ3MgPSBwYXJzZWRNZXNzYWdlLmFyZ3NbMF0uc3BsaXQoXCItXCIpO1xyXG4gICAgICAgICAgICAgICAgbWluID0gK2FyZ3NbMF07XHJcbiAgICAgICAgICAgICAgICBtYXggPSArYXJnc1sxXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChwYXJzZWRNZXNzYWdlLmFyZ3MubGVuZ3RoID4gMCAmJiByZWdleFZhbGlkLnRlc3QocGFyc2VkTWVzc2FnZS5hcmdzWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgbWF4ID0gK3BhcnNlZE1lc3NhZ2UuYXJnc1swXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAxO1xyXG4gICAgICAgICAgICBpZiAocGFyc2VkTWVzc2FnZS5hcmdzLmxlbmd0aCA+IDEgJiYgcmVnZXhWYWxpZC50ZXN0KHBhcnNlZE1lc3NhZ2UuYXJnc1sxXSkpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ID0gTWF0aC5taW4oK3BhcnNlZE1lc3NhZ2UuYXJnc1sxXSwgMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjb3VudCk7XHJcbiAgICAgICAgICAgIGxldCBudW1iZXJzID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbnVtYmVycy5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggKyAxIC0gbWluKSArIG1pbikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb3VudCA+IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhdmVyYWdlID0gMDtcclxuICAgICAgICAgICAgICAgIG51bWJlcnMuZm9yRWFjaChudW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGF2ZXJhZ2UgKz0gbnVtO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyByb3VuZCBhdmVyYWdlIHRvIDEgZGVjaW1hbFxyXG4gICAgICAgICAgICAgICAgYXZlcmFnZSA9IE1hdGgucm91bmQoYXZlcmFnZSAvIG51bWJlcnMubGVuZ3RoICogMTApIC8gMTA7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW1iZWQgPSBuZXcgRGlzY29yZC5SaWNoRW1iZWQoKTtcclxuICAgICAgICAgICAgICAgIGVtYmVkLnNldFRpdGxlKFwiUmFuZG9tIEdlbmVyYXRvclwiKTtcclxuICAgICAgICAgICAgICAgIGVtYmVkLmFkZEZpZWxkKFwiUm9sbHNcIiwgY291bnQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZW1iZWQuYWRkRmllbGQoXCJBdmVyYWdlXCIsIGF2ZXJhZ2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZW1iZWQuYWRkRmllbGQoXCJOdW1iZXJzXCIsIGBcXGBcXGBcXGAke251bWJlcnMuam9pbihcIiwgXCIpfVxcYFxcYFxcYGApO1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5jaGFubmVsLnNlbmQoZW1iZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5yZXBseShgWW91ciByYW5kb20gbnVibWVyIGlzICR7bnVtYmVycy50b1N0cmluZygpfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIG1lc3NhZ2UucmVwbHkoYFxcblJvbGxzOiBcXGAke2NvdW50fVxcYCBcXG5BdmVyYWdlOiBcXGAke2F2ZXJhZ2V9XFxgIFxcbk51bWJlcnM6IFxcYCR7bnVtYmVycy50b1N0cmluZygpfVxcYGApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuUmFuZG9tID0gUmFuZG9tO1xyXG5jbGFzcyBDaG9pY2UgZXh0ZW5kcyBtaXhpbnNfMS5UZXh0Q29tbWFuZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwiY2hvaWNlXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImNob29zZSBvbmUgZnJvbSBhbGwgYXJndW1lbnRzXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBydW4oYm90LCBtZXNzYWdlLCBwYXJzZWRNZXNzYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHBhcnNlZE1lc3NhZ2UuYXJncy5sZW5ndGggPD0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJOb3QgZW5vdWdoIGNob2ljZXMgZ2l2ZW4uIFBsZWFzZSBwcm92aWRlIGF0IGxlYXN0IDJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBhcnNlZE1lc3NhZ2UuYXJncy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBtZXNzYWdlLnJlcGx5KGBZb3VyIGNob2ljZSBpczogJHtwYXJzZWRNZXNzYWdlLmFyZ3NbcmFuZG9tXX1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkNob2ljZSA9IENob2ljZTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tbWFuZHMvZ2VuZXJhbC50c1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgbWl4aW5zXzEgPSByZXF1aXJlKFwiLi4vbWl4aW5zXCIpO1xyXG5jbGFzcyBDaGFuZ2VQcmVmaXggZXh0ZW5kcyBtaXhpbnNfMS5UZXh0Q29tbWFuZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwicHJlZml4XCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInNldCBhIG5ldyBwcmVmaXggZm9yIGFsbCBjb21tYW5kc1wiLFxyXG4gICAgICAgICAgICBoZWxwOiBcInByZWZpeCBbbmV3IHByZWZpeF1cIixcclxuICAgICAgICAgICAgb3duZXJPbmx5OiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBydW4oYm90LCBtZXNzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGJvdC5zZXR0aW5ncy5wcmVmaXggPSBwYXJzZWRNZXNzYWdlLmFyZ3NbMF07XHJcbiAgICAgICAgICAgIG1lc3NzYWdlLnJlcGx5KGBDaGFuZ2VkIGNvbW1hbmQgcHJlZml4IHRvICR7Ym90LnNldHRpbmdzLnByZWZpeH1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkNoYW5nZVByZWZpeCA9IENoYW5nZVByZWZpeDtcclxuY2xhc3MgUGxheWluZyBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJnYW1lXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInNldCB0aGUgY3VycmVudCBnYW1lXCIsXHJcbiAgICAgICAgICAgIGhlbHA6IFwiZ2FtZSBbZ2FtZV1cIixcclxuICAgICAgICAgICAgb3duZXJPbmx5OiB0cnVlLFxyXG4gICAgICAgICAgICBhbGlhc2VzOiBbXHJcbiAgICAgICAgICAgICAgICBcInBsYXlpbmdcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBydW4oYm90LCBtZXNzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGJvdC51c2VyLnNldEdhbWUocGFyc2VkTWVzc2FnZS5hcmdzLmpvaW4oXCIgXCIpKS5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5QbGF5aW5nID0gUGxheWluZztcclxuY2xhc3MgU2VydmVycyBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJzZXJ2ZXJzXCIsXHJcbiAgICAgICAgICAgIG93bmVyT25seTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocGFyc2VkTWVzc2FnZS5hcmdzWzBdID09PSBcImxlYXZlXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBndWlsZCA9IGJvdC5ndWlsZHMuZmluZChcImlkXCIsIHBhcnNlZE1lc3NhZ2UuYXJnc1sxXSk7XHJcbiAgICAgICAgICAgICAgICBndWlsZC5sZWF2ZSgpO1xyXG4gICAgICAgICAgICAgICAgbWVzc3NhZ2UuZGVsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dCA9IFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBib3QuZ3VpbGRzLmZvckVhY2goKGcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IGAke2cuaWR9IDogJHtnLm5hbWV9XFxuYDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGV4dCk7XHJcbiAgICAgICAgICAgICAgICBtZXNzc2FnZS5yZXBseSh0ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuU2VydmVycyA9IFNlcnZlcnM7XHJcbmNsYXNzIEdpdmVBZG1pbiBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJhZG1pblwiLFxyXG4gICAgICAgICAgICBvd25lck9ubHk6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBydW4oYm90LCBtZXNzYWdlLCBwYXJzZWRNZXNzYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbWVzc2FnZS5kZWxldGUoKTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuYXV0aG9yLmlkID09PSBib3Quc2V0dGluZ3Mub3duZXIpIHtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBhZG1pbnJvbGUgPSBtZXNzYWdlLmd1aWxkLnJvbGVzLmFycmF5KCkuZmluZChyID0+IHIuaGFzUGVybWlzc2lvbihcIkFETUlOSVNUUkFUT1JcIikgJiYgci5tYW5hZ2VkID09PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIGxldCBhZG1pbnJvbGUgPSBtZXNzYWdlLmd1aWxkLnJvbGVzLmFycmF5KCkuZmluZChyID0+IHIuaGFzUGVybWlzc2lvbihcIkFETUlOSVNUUkFUT1JcIikgJiYgci5tYW5hZ2VkID09PSBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlLmd1aWxkLnJvbGVzLm1hcChyID0+IHIubmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5tZW1iZXIuYWRkUm9sZShhZG1pbnJvbGUpLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuR2l2ZUFkbWluID0gR2l2ZUFkbWluO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21tYW5kcy9hZG1pbi50c1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRGlzY29yZCA9IHJlcXVpcmUoXCJkaXNjb3JkLmpzXCIpO1xyXG5jb25zdCBtaXhpbnNfMSA9IHJlcXVpcmUoXCIuLi9taXhpbnNcIik7XHJcbmNvbnN0IHBhcnNlcl8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3BhcnNlclwiKTtcclxuY2xhc3MgQ2xlYXIgZXh0ZW5kcyBtaXhpbnNfMS5UZXh0Q29tbWFuZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwiY2xlYXJcIixcclxuICAgICAgICAgICAgYWxpYXNlczogW1xyXG4gICAgICAgICAgICAgICAgXCJjbHNcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBoZWxwOiBcImNsZWFyIDxzaWxlbnQ/PlwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDbGVhcnMgdGhlIGxhc3QgMTAwIGNoYXQgbWVzc2FnZXNcIixcclxuICAgICAgICAgICAgcGVybWlzc2lvbnM6IFtcclxuICAgICAgICAgICAgICAgIFwiTUFOQUdFX01FU1NBR0VTXCIsXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJ1bihib3QsIG1lc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBtZXNzYWdlLmNoYW5uZWwuZmV0Y2hNZXNzYWdlcyh7IGxpbWl0OiA5OSB9KS50aGVuKChtZXNzYWdlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZXMubWFwKG0gPT4gbS5jcmVhdGVkQXQuZ2V0VGltZSgpKSk7XHJcbiAgICAgICAgICAgICAgICAvLyBGaWx0ZXIgYWxsIG1lc3NhZ2VzIG5ld2VyIHRoYW4gMTQgZGF5cyBcclxuICAgICAgICAgICAgICAgIGxldCB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSAxNCAqIDI0ICogNjAgKiA2MCAqIDEwMDA7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcyA9IG1lc3NhZ2VzLmZpbHRlcihtID0+IG0uY3JlYXRlZEF0LmdldFRpbWUoKSA+IHRpbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2VzLmFycmF5KCkubGVuZ3RoID49IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmNoYW5uZWwuYnVsa0RlbGV0ZShtZXNzYWdlcy5maWx0ZXIobSA9PiAhbS5waW5uZWQpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VkTWVzc2FnZS5hcmdzWzBdICE9PSBcInNpbGVudFwiICYmIHBhcnNlZE1lc3NhZ2UuYXJnc1swXSAhPT0gXCJzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5jaGFubmVsLnNlbmQoYE1lc3NhZ2VzIGNsZWFyZWQgYnkgJHttZXNzYWdlLmF1dGhvci50b1N0cmluZygpfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5DbGVhciA9IENsZWFyO1xyXG5jbGFzcyBQb2xsIGV4dGVuZHMgbWl4aW5zXzEuVGV4dENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcInBvbGxcIixcclxuICAgICAgICAgICAgYWxpYXNlczogW1xyXG4gICAgICAgICAgICAgICAgXCJ2b3RlXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwic3RhcnQgYSBuZXcgdm90ZVwiLFxyXG4gICAgICAgICAgICBoZWxwOiBcInBvbGwgW3RpdGxlLi4uXVwiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBydW4oYm90LCBtZXNzYWdlLCBwYXJzZWRNZXNzYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbWVzc2FnZS5kZWxldGUoKTtcclxuICAgICAgICAgICAgbGV0IGVtYmVkID0gbmV3IERpc2NvcmQuUmljaEVtYmVkKCk7XHJcbiAgICAgICAgICAgIGVtYmVkLnNldEZvb3RlcihgUG9sbCBieSAke21lc3NhZ2UubWVtYmVyLmRpc3BsYXlOYW1lfWApXHJcbiAgICAgICAgICAgICAgICAuc2V0QXV0aG9yKHBhcnNlZE1lc3NhZ2UuYXJncy5qb2luKFwiIFwiKSlcclxuICAgICAgICAgICAgICAgIC5zZXRDb2xvcihcIiMyMTk2RjNcIik7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGVtYmVkKS50aGVuKChwb2xsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb2xsLnJlYWN0KFwi8J+RjVwiKS50aGVuKHN1Y2Nlc3MgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvbGwucmVhY3QoXCLwn5GOXCIpLnRoZW4oc3VjY2VzcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvbGwucmVhY3QoXCLwn6S3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuUG9sbCA9IFBvbGw7XHJcbmNsYXNzIFRpbWVNdXRlIGV4dGVuZHMgbWl4aW5zXzEuVGV4dENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcInRpbWVtdXRlXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm11dGUgYSBtZW1iZXIgZm9yIGEgZ2l2ZW4gdGltZVwiLFxyXG4gICAgICAgICAgICBwZXJtaXNzaW9uczogW1xyXG4gICAgICAgICAgICAgICAgXCJNVVRFX01FTUJFUlNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBydW4oYm90LCBtZXNzYWdlLCBwYXJzZWRNZXNzYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbGV0IG11dGVVc2VyID0gbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIGxldCB7IGRheXMsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzIH0gPSBwYXJzZXJfMS5QYXJzZXIucGFyc2VUaW1lKHBhcnNlZE1lc3NhZ2UuYXJnc1sxXSk7XHJcbiAgICAgICAgICAgIGxldCBtdXRlVGltZSA9IChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkgKyAoaG91cnMgKiA2MCAqIDYwICogMTAwMCkgKyAobWludXRlcyAqIDYwICogMTAwMCkgKyAoc2Vjb25kcyAqIDEwMDApO1xyXG4gICAgICAgICAgICBtdXRlVXNlci5zZXRNdXRlKHRydWUpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG11dGVVc2VyLnNldE11dGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9LCBtdXRlVGltZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5UaW1lTXV0ZSA9IFRpbWVNdXRlO1xyXG5jbGFzcyBUaW1lRGVhZiBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJ0aW1lZGVhZlwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJkZWFmIGEgbWVtYmVyIGZvciBhIGdpdmVuIHRpbWVcIixcclxuICAgICAgICAgICAgcGVybWlzc2lvbnM6IFtcclxuICAgICAgICAgICAgICAgIFwiREVBRkVOX01FTUJFUlNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBydW4oYm90LCBtZXNzYWdlLCBwYXJzZWRNZXNzYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbGV0IHVzZXIgPSBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMuZmlyc3QoKTtcclxuICAgICAgICAgICAgbGV0IHsgZGF5cywgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMgfSA9IHBhcnNlcl8xLlBhcnNlci5wYXJzZVRpbWUocGFyc2VkTWVzc2FnZS5hcmdzWzFdKTtcclxuICAgICAgICAgICAgbGV0IG11dGVUaW1lID0gKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSArIChob3VycyAqIDYwICogNjAgKiAxMDAwKSArIChtaW51dGVzICogNjAgKiAxMDAwKSArIChzZWNvbmRzICogMTAwMCk7XHJcbiAgICAgICAgICAgIHVzZXIuc2V0RGVhZih0cnVlKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyLnNldERlYWYoZmFsc2UpO1xyXG4gICAgICAgICAgICB9LCBtdXRlVGltZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5UaW1lRGVhZiA9IFRpbWVEZWFmO1xyXG5jbGFzcyBCYW5UZXN0IGV4dGVuZHMgbWl4aW5zXzEuVGV4dENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcInRlc3RiYW5cIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBiYW5zID0gbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzO1xyXG4gICAgICAgICAgICBiYW5zLmZpbHRlcih1c2VyID0+ICFib3QuaXNPd25lcklkKHVzZXIuaWQpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYmFucyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5CYW5UZXN0ID0gQmFuVGVzdDtcclxuY2xhc3MgQmFuIGV4dGVuZHMgbWl4aW5zXzEuVGV4dENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcImJhblwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJiYW5zIG9uZSBvciBtb3JlIHVzZXJcIixcclxuICAgICAgICAgICAgcGVybWlzc2lvbnM6IFtcclxuICAgICAgICAgICAgICAgIFwiQkFOX01FTUJFUlNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBydW4oYm90LCBtZXNzYWdlLCBwYXJzZWRNZXNzYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbGV0IGJhbnMgPSBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnM7XHJcbiAgICAgICAgICAgIGJhbnMuZmlsdGVyKHVzZXIgPT4gIWJvdC5pc093bmVySWQodXNlci5pZCkpO1xyXG4gICAgICAgICAgICBiYW5zLmZvckVhY2godXNlciA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29tcGFyZVBvc2l0aW9uVG8odXNlci5oaWdoZXN0Um9sZSkgPiAwIHx8IGJvdC5pc093bmVySWQobWVzc2FnZS5hdXRob3IuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlci5iYW4oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UucmVwbHkoXCJZb3UgZG9uJ3QgaGF2ZSBwZXJtaXNzaW9uIHRvIGJhbiB0aGlzIHVzZXJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuQmFuID0gQmFuO1xyXG5jbGFzcyBTb2Z0QmFuIGV4dGVuZHMgbWl4aW5zXzEuVGV4dENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcInNvZnRiYW5cIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwic29mdGJhbnMgb25lIG9yIG1vcmUgdXNlclwiLFxyXG4gICAgICAgICAgICBwZXJtaXNzaW9uczogW1xyXG4gICAgICAgICAgICAgICAgXCJCQU5fTUVNQkVSU1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJ1bihib3QsIG1lc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBsZXQgYmFucyA9IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycztcclxuICAgICAgICAgICAgYmFucy5mb3JFYWNoKCh1c2VyKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29tcGFyZVBvc2l0aW9uVG8odXNlci5oaWdoZXN0Um9sZSkgPiAwIHx8IGJvdC5pc093bmVySWQobWVzc2FnZS5hdXRob3IuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJhbm5lZCA9IHlpZWxkIHVzZXIuYmFuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFubmVkLmd1aWxkLnVuYmFuKGJhbm5lZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnJlcGx5KFwiWW91IGRvbid0IGhhdmUgcGVybWlzc2lvbiB0byBiYW4gdGhpcyB1c2VyXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Tb2Z0QmFuID0gU29mdEJhbjtcclxuY2xhc3MgS2ljayBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJzb2Z0YmFuXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInNvZnRiYW5zIG9uZSBvciBtb3JlIHVzZXJcIixcclxuICAgICAgICAgICAgcGVybWlzc2lvbnM6IFtcclxuICAgICAgICAgICAgICAgIFwiS0lDS19NRU1CRVJTXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBraWNrcyA9IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycztcclxuICAgICAgICAgICAga2lja3MuZm9yRWFjaCh1c2VyID0+IHtcclxuICAgICAgICAgICAgICAgIHVzZXIua2ljaygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLktpY2sgPSBLaWNrO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21tYW5kcy9tb2RlcmF0aW9uLnRzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBtaXhpbnNfMSA9IHJlcXVpcmUoXCIuLi9taXhpbnNcIik7XHJcbmxldCByb2xlcyA9IFtcclxuICAgIFwiREpcIlxyXG5dO1xyXG5jbGFzcyBKb2luIGV4dGVuZHMgbWl4aW5zXzEuVGV4dENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcImpvaW5cIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiam9pbiB5b3VyIHZvaWNlIGNoYW5uZWxcIixcclxuICAgICAgICAgICAgcm9sZXM6IHJvbGVzXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBydW4oYm90LCBtZXNzYWdlLCBwYXJzZWRNZXNzYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbGV0IGNvbiA9IGJvdC5nZXRWb2ljZUNvbm5lY3Rpb24obWVzc2FnZS5ndWlsZC5pZCk7XHJcbiAgICAgICAgICAgIGlmICghbWVzc2FnZS5tZW1iZXIudm9pY2VDaGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcIllvdSBoYXZlIHRvIGJlIGluIGEgVm9pY2UgQ2hhbm5lbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29uICYmIGNvbi5jaGFubmVsLmlkID09PSBtZXNzYWdlLm1lbWJlci52b2ljZUNoYW5uZWwuaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiVGhlIEJvdCBpcyBhbHJlYWR5IGNvbm5lY3RlZCB0byB5b3VyIFZvaWNlQ2hhbm5lbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5tZW1iZXIudm9pY2VDaGFubmVsLmpvaW4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkpvaW4gPSBKb2luO1xyXG5jbGFzcyBEaXNjb25lbmN0IGV4dGVuZHMgbWl4aW5zXzEuVGV4dENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcImRpc2Nvbm5lY3RcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiZGlzY29ubmVjdHMgZnJvbSB5b3VyIGNoYW5uZWxcIixcclxuICAgICAgICAgICAgcm9sZXM6IHJvbGVzLFxyXG4gICAgICAgICAgICBhbGlhc2VzOiBbXHJcbiAgICAgICAgICAgICAgICBcImRjXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBjb24gPSBib3QuZ2V0Vm9pY2VDb25uZWN0aW9uKG1lc3NhZ2UuZ3VpbGQuaWQpO1xyXG4gICAgICAgICAgICBpZiAoIWNvbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb24ucGxheWVyLmRpc3BhdGNoZXIpXHJcbiAgICAgICAgICAgICAgICBjb24ucGxheWVyLmRpc3BhdGNoZXIuZW5kKCk7XHJcbiAgICAgICAgICAgIGNvbi5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5EaXNjb25lbmN0ID0gRGlzY29uZW5jdDtcclxuY2xhc3MgU3RvcCBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJzdG9wXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInN0b3Agc3RyZWFtaW5nXCIsXHJcbiAgICAgICAgICAgIHJvbGVzOiByb2xlc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBjb24gPSBib3QuZ2V0Vm9pY2VDb25uZWN0aW9uKG1lc3NhZ2UuZ3VpbGQuaWQpO1xyXG4gICAgICAgICAgICBpZiAoIWNvbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJFcyBrb25udGUga2VpbmUgVmVyYmluZHVuZyBoZXJnZXN0ZWxsdCB3ZXJkZW5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY29uLnBsYXllci5kaXNwYXRjaGVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uLnBsYXllci5kaXNwYXRjaGVyLmVuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5TdG9wID0gU3RvcDtcclxuY2xhc3MgUGF1c2UgZXh0ZW5kcyBtaXhpbnNfMS5UZXh0Q29tbWFuZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwicGF1c2VcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwicGF1c2VzIHN0cmVhbVwiLFxyXG4gICAgICAgICAgICByb2xlczogcm9sZXNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJ1bihib3QsIG1lc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBsZXQgY29uID0gYm90LmdldFZvaWNlQ29ubmVjdGlvbihtZXNzYWdlLmd1aWxkLmlkKTtcclxuICAgICAgICAgICAgaWYgKCFjb24pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiRXMga29ubnRlIGtlaW5lIFZlcmJpbmR1bmcgaGVyZ2VzdGVsbHQgd2VyZGVuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbi5wbGF5ZXIuZGlzcGF0Y2hlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbi5wbGF5ZXIuZGlzcGF0Y2hlci5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5QYXVzZSA9IFBhdXNlO1xyXG5jbGFzcyBSZXN1bWUgZXh0ZW5kcyBtaXhpbnNfMS5UZXh0Q29tbWFuZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwicmVzdW1lXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInJlc3VtZXMgbXVzaWNcIixcclxuICAgICAgICAgICAgcm9sZXM6IHJvbGVzLFxyXG4gICAgICAgICAgICBhbGlhc2VzOiBbXHJcbiAgICAgICAgICAgICAgICBcInVucGF1c2VcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBydW4oYm90LCBtZXNzYWdlLCBwYXJzZWRNZXNzYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbGV0IGNvbiA9IGJvdC5nZXRWb2ljZUNvbm5lY3Rpb24obWVzc2FnZS5ndWlsZC5pZCk7XHJcbiAgICAgICAgICAgIGlmICghY29uKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnJlcGx5KFwiRXMga29ubnRlIGtlaW5lIFZlcmJpbmR1bmcgaGVyZ2VzdGVsbHQgd2VyZGVuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbi5wbGF5ZXIuZGlzcGF0Y2hlcikge1xyXG4gICAgICAgICAgICAgICAgY29uLnBsYXllci5kaXNwYXRjaGVyLnJlc3VtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5SZXN1bWUgPSBSZXN1bWU7XHJcbmNsYXNzIFZvbHVtZSBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJ2b2x1bWVcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwic2V0IHRoZSB2b2x1bWUgZnJvbSAxLTEwXCIsXHJcbiAgICAgICAgICAgIHJvbGVzOiByb2xlc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBjb24gPSBib3QuZ2V0Vm9pY2VDb25uZWN0aW9uKG1lc3NhZ2UuZ3VpbGQuaWQpO1xyXG4gICAgICAgICAgICBpZiAoIWNvbilcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IHZvbHVtZU11bHRpcGxpZXIgPSAxMDtcclxuICAgICAgICAgICAgbGV0IHZvbHVtZSA9IHBhcnNlZE1lc3NhZ2UuYXJnc1swXTtcclxuICAgICAgICAgICAgaWYgKCF2b2x1bWUpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UucmVwbHkoYFZvbHVtZSBpcyBzZXQgdG8gJHtjb24uZGlzcGF0Y2hlci52b2x1bWUgKiB2b2x1bWVNdWx0aXBsaWVyfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZvbHVtZSA+PSAxICYmIHZvbHVtZSA8PSB2b2x1bWVNdWx0aXBsaWVyICYmIGNvbi5kaXNwYXRjaGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb24uZGlzcGF0Y2hlci5zZXRWb2x1bWUodm9sdW1lIC8gdm9sdW1lTXVsdGlwbGllcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlZvbHVtZSA9IFZvbHVtZTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tbWFuZHMvbXVzaWMudHNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IG1peGluc18xID0gcmVxdWlyZShcIi4uL21peGluc1wiKTtcclxuY2xhc3MgVGVzdCBleHRlbmRzIG1peGluc18xLlRleHRDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJ0ZXN0XCIsXHJcbiAgICAgICAgICAgIGFsaWFzZXM6IFtcclxuICAgICAgICAgICAgICAgIFwidGVzdGluZ1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRlc3RuYWNocmljaHQgc2VuZGVuXCIsXHJcbiAgICAgICAgICAgIHBlcm1pc3Npb25zOiBbXSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJ1bihib3QsIG1lc3NhZ2UsIHBhcnNlZE1lc3NhZ2UpIHtcclxuICAgICAgICBjb25zdCBfc3VwZXIgPSBuYW1lID0+IHN1cGVyW25hbWVdO1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIF9zdXBlcihcInJ1blwiKS5jYWxsKHRoaXMsIGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UucmVwbHkoXCJUZXN0IENvbW1hbmRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5UZXN0ID0gVGVzdDtcclxuY2xhc3MgVHJvbGxNb3ZlIGV4dGVuZHMgbWl4aW5zXzEuVGV4dENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcIm5lcnZcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGVzdG5hY2hyaWNodCBzZW5kZW5cIixcclxuICAgICAgICAgICAgcGVybWlzc2lvbnM6IFtcclxuICAgICAgICAgICAgICAgIFwiQURNSU5JU1RSQVRPUlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBydW4oYm90LCBtZXNzYWdlLCBwYXJzZWRNZXNzYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbGV0IGNoYW5uZWxzID0gbWVzc2FnZS5ndWlsZC5jaGFubmVscy5maWx0ZXIoYyA9PiBjLnR5cGUgPT09IFwidm9pY2VcIikuYXJyYXkoKTtcclxuICAgICAgICAgICAgbGV0IG1lbWJlciA9IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5maXJzdCgpIHx8IG1lc3NhZ2UubWVtYmVyO1xyXG4gICAgICAgICAgICBpZiAoIW1lbWJlci52b2ljZUNoYW5uZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwiVXNlciBoYXMgdG8gYmUgY29ubmVjdGVkIHRvIGEgdm9pY2UgY2hhbm5lbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdm9pY2VDaGFubmVsID0gbWVtYmVyLnZvaWNlQ2hhbm5lbDtcclxuICAgICAgICAgICAgY2hhbm5lbHMucHVzaCh2b2ljZUNoYW5uZWwpO1xyXG4gICAgICAgICAgICBtb3ZlKCk7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1vdmUoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYyA9IGNoYW5uZWxzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWMpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgbWVtYmVyLnNldFZvaWNlQ2hhbm5lbChjKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVHJvbGxNb3ZlID0gVHJvbGxNb3ZlO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21tYW5kcy90ZXN0LnRzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBtaXhpbnNfMSA9IHJlcXVpcmUoXCIuLi9taXhpbnNcIik7XHJcbmNsYXNzIEFsdEY0IGV4dGVuZHMgbWl4aW5zXzEuVGV4dENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcImFsdGY0XCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInN1cnByaXNlXCIsXHJcbiAgICAgICAgICAgIHBlcm1pc3Npb25zOiBbXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UubWVtYmVyLnNldERlYWYodHJ1ZSk7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UubWVtYmVyLnNldE11dGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5tZW1iZXIuc2V0RGVhZihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLm1lbWJlci5zZXRNdXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgfSwgMTAwMCAqIDYwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkFsdEY0ID0gQWx0RjQ7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbW1hbmRzL2Z1bi50c1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgY29tbWFuZHNfMSA9IHJlcXVpcmUoXCIuL2NvbW1hbmRzXCIpO1xyXG5jb25zdCBjb2xvcnMgPSByZXF1aXJlKFwiY29sb3JzL3NhZmVcIik7XHJcbmNsYXNzIFJlZ2lzdHJ5IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudGV4dENvbW1hbmRzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5hZGRUZXh0Q29tbWFuZChjb21tYW5kc18xLkhlbHApO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IGNvbW1hbmQgdG8gdGhlIHJlZ2lzdHJ5XHJcbiAgICAgKiBAcGFyYW0gY29uc3RydWN0b3IgQ29uc3RydWN0b3Igb2YgdGhlIGNvbW1hbmQgY2xhc3NcclxuICAgICAqL1xyXG4gICAgYWRkVGV4dENvbW1hbmQoY29uc3RydWN0b3IpIHtcclxuICAgICAgICBsZXQgY21kID0gbmV3IGNvbnN0cnVjdG9yKCk7XHJcbiAgICAgICAgdGhpcy50ZXh0Q29tbWFuZHMucHVzaChjbWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvbG9ycy55ZWxsb3coXCJbUl1cIiksIFwiK1wiLCBjb2xvcnMuYmx1ZShcIihDKVwiKSwgY29uc3RydWN0b3IubmFtZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIGdldCB0aGUgY29tbWFuZCBjbGFzcyBhc3NvY2lhdGVkIHdpdGggdGhlIGNvbW1hbmQgbmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgY29tbWFuZCBuYW1lXHJcbiAgICAgKi9cclxuICAgIGdldFRleHRDb21tYW5kKG5hbWUpIHtcclxuICAgICAgICAvLyBmaW5kIGEgdGV4dENvbW1hbmQgd2hlcmUgYW55IGFsaWFzZSBlcXVhbHMgdGhlIHByb3ZpZGVkIG5hbWVcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0Q29tbWFuZHMuZmluZCh0YyA9PiB0Yy5hbGlhc2VzLnNvbWUoYSA9PiBhID09PSBuYW1lKSk7XHJcbiAgICB9XHJcbiAgICAvLyBnZXQgdGV4dENvbW1hbmRzKCk6IEFycmF5PFRleHRDb21tYW5kPiB7XHJcbiAgICAvLyAgIHJldHVybiB0aGlzLnRleHRDb21tYW5kcztcclxuICAgIC8vIH1cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjb21tYW5kXHJcbiAgICAgKiBAcGFyYW0gYm90XHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIHBhcnNlZE1lc3NhZ2VcclxuICAgICAqL1xyXG4gICAgZXhlY3V0ZUNvbW1hbmQoY29tbWFuZCwgYm90LCBtZXNzYWdlLCBwYXJzZWRNZXNzYWdlKSB7XHJcbiAgICAgICAgbGV0IGNtZCA9IHRoaXMudGV4dENvbW1hbmRzLmZpbmQodGMgPT4gdGMuaXMgPT09IGNvbW1hbmQpO1xyXG4gICAgICAgIHJldHVybiBjbWQucnVuKGJvdCwgbWVzc2FnZSwgcGFyc2VkTWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5SZWdpc3RyeSA9IFJlZ2lzdHJ5O1xyXG5leHBvcnRzLmRlZmF1bHQgPSBSZWdpc3RyeTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvUmVnaXN0cnkudHNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBWYWxpZGF0b3I7XHJcbihmdW5jdGlvbiAoVmFsaWRhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBtZXNzYWdlVmFsaWQobWVzc2FnZSwgY21kUHJlZml4KSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY2hlY2sgaWYgY29tbWFuZCBoYXMgcmlnaHQgcHJlZml4XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbGV0IHN1YiA9IG1lc3NhZ2UuY29udGVudC5zdWJzdHIoMCwgY21kUHJlZml4Lmxlbmd0aCk7XHJcbiAgICAgICAgaWYgKHN1YiAhPT0gY21kUHJlZml4KVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgbGV0IHByZWZpeCA9IGVzY2FwZShjbWRQcmVmaXgpO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHRlc3QgaWYgdGhlIG1lc3NhZ2UgaXMgaW4gYSBnb29kIGZvcm1hdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxldCBleHByZXNzaW9uID0gcHJlZml4ICsgXCJbYS16QS1aXStcXHMqKFxccyouK1xccyopKlwiO1xyXG4gICAgICAgIGxldCByZWdleHAgPSBuZXcgUmVnRXhwKGV4cHJlc3Npb24pO1xyXG4gICAgICAgIC8vIGlmICghcmVnZXhwLnRlc3QobWVzc2FnZS5jb250ZW50KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiByZWdleHAudGVzdChtZXNzYWdlLmNvbnRlbnQpO1xyXG4gICAgICAgIC8vIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgVmFsaWRhdG9yLm1lc3NhZ2VWYWxpZCA9IG1lc3NhZ2VWYWxpZDtcclxuICAgIGZ1bmN0aW9uIGVzY2FwZShzdHIpIHtcclxuICAgICAgICBjb25zdCBtYXRjaE9wZXJhdG9yc1JlID0gL1t8XFxcXHt9KClbXFxdXiQrKj8uXS9nO1xyXG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZShtYXRjaE9wZXJhdG9yc1JlLCAnXFxcXCQmJyk7XHJcbiAgICB9XHJcbn0pKFZhbGlkYXRvciA9IGV4cG9ydHMuVmFsaWRhdG9yIHx8IChleHBvcnRzLlZhbGlkYXRvciA9IHt9KSk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3V0aWxzL3ZhbGlkYXRvci50c1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidGltZXJzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidGltZXJzXCJcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=