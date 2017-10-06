"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseMessage(message) {
    let args = message.content.split(" ");
    for (var i = 0; i < args.length; i++) {
        if (args[i] == '') {
            args.splice(i, 1);
            i--;
        }
    }
    let command = args.shift().toLowerCase().substr(1);
    let msg = {
        args,
        command
    };
    return msg;
}
exports.default = parseMessage;
//# sourceMappingURL=message-parser.js.map