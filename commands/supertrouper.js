exports.run = async (client, message, args, level) => {
  // console.log(Array.from(message.member.guild.members));

  const ingnoreNames = ["Rythm", "Gandacel"];
  // Get all users and ignore "rythm" bot
  const list = message.guild.members.cache.filter(
    (e) => !ingnoreNames.includes(e.displayName)
  );

  // Investigate why this don't work without the json.stringify
  let randomUser = JSON.parse(JSON.stringify(list));
  randomUser = randomUser[Math.floor(Math.random() * randomUser.length)];
  const msg = await message.channel.send(randomUser.displayName);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "supertrouper",
  category: "Fun",
  description: "Get a random ejumper.",
  usage: "supertrouper",
};
