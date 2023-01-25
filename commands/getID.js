exports.run = async (client, message, [mention, ...args], level) => {
  // eslint-disable-line no-unused-vars
  message.delete();

  if (!mention) {
    let futureMsg = await message.channel.send("No user mentioned");
    return false;
  }
  const matches = mention.match(/^<@!?(\d+)>$/);

  if (!matches) return null;

  const id = matches[1];

  const msg = await message.channel.send(`${mention} id: ${id}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Administrator",
};

exports.help = {
  name: "getid",
  category: "Miscelaneous",
  description: "Get the id of mentioned user.",
  usage: "getid <@mention>",
};
