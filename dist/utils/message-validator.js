"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_settings_1 = require("../bot-settings");
function validate(message) {
    if (message.author.bot)
        return false;
    if (!message.content.startsWith(bot_settings_1.BOT_CMD_PREFIX))
        return false;
    return true;
}
exports.default = validate;
//# sourceMappingURL=message-validator.js.map