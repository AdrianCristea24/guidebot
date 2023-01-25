exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-vars
  message.delete();

  const msgContent = message.content.replace("!echo ", "");
  const msg = await message.channel.send(msgContent);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator",
};

exports.help = {
  name: "echo",
  category: "Fun",
  description: "Gandacel can speak!",
  usage: "echo <message>",
};
