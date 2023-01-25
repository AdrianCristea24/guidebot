<<<<<<< HEAD
module.exports = async (client, error) => {
  client.logger.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
};
=======
const logger = require("../modules/logger.js");
module.exports = async (client, error) => {
  logger.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
};
>>>>>>> 725fc1460ca276282c27a775b5f9915154983ecc
