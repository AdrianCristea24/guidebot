<<<<<<< HEAD
module.exports = async client => {
  // Log that the bot is online.
  client.logger.log(`${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`, "ready");

  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`${client.settings.get("default").prefix}help`, {type: "PLAYING"});

  client.
};
=======
const logger = require("../modules/logger.js");
const { getSettings } = require("../modules/functions.js");
module.exports = async client => {
  // Log that the bot is online.
  logger.log(`${client.user.tag}, ready to serve ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} users in ${client.guilds.cache.size} servers.`, "ready");
  
  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`${getSettings("default").prefix}help`, { type: "PLAYING" });
};
>>>>>>> 725fc1460ca276282c27a775b5f9915154983ecc
