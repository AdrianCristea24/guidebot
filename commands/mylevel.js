<<<<<<< HEAD
exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  message.reply(`Your permission level is: ${level} - ${friendly}`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "mylevel",
  category: "Miscelaneous",
  description: "Tells you your permission level for the current message location.",
  usage: "mylevel"
};
=======
const config = require("../config.js");
const { settings } = require("../modules/settings.js");
exports.run = async (client, message, args, level) => {
  const friendly = config.permLevels.find(l => l.level === level).name;
  const replying = settings.ensure(message.guild.id, config.defaultSettings).commandReply;
  message.reply({ content: `Your permission level is: ${level} - ${friendly}`, allowedMentions: { repliedUser: (replying === "true") }});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "mylevel",
  category: "Miscellaneous",
  description: "Tells you your permission level for the current message location.",
  usage: "mylevel"
};
>>>>>>> 725fc1460ca276282c27a775b5f9915154983ecc
