<<<<<<< HEAD
// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {
  client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
};
=======
const logger = require("../modules/logger.js");
// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {
  logger.log(`[GUILD JOIN] ${guild.id} added the bot. Owner: ${guild.ownerId}`);
};
>>>>>>> 725fc1460ca276282c27a775b5f9915154983ecc
