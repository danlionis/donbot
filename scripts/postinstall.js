const fs = require("fs");
const path = require("path");

const config_folder_path = "../../config/";

if (!fs.existsSync(path.resolve(config_folder_path))) {
  fs.mkdirSync(path.resolve(config_folder_path));
}

const default_bot_config_path = path.resolve("shared/config/config.bot.yaml");
const bot_config_path = path.resolve(config_folder_path + "/config.bot.yaml");
// const file = fs.readFileSync(bot_config_path, "utf8");
if (!fs.existsSync(path.resolve(bot_config_path))) {
  fs.copyFileSync(default_bot_config_path, bot_config_path);
}
