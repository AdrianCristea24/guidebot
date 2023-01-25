<<<<<<< HEAD:events/message.js
// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.
const { MessageEmbed, MessageAttachment } = require("discord.js");

const _onlyRadu = async ({ client, message }) => {
  const msg = JSON.parse(JSON.stringify(message));

  if (msg.cleanContent.includes(":):")) {
    message.react("👍");
  }
  if (msg.cleanContent.includes(":(:")) {
    message.react("👎");
  }
  if (msg.cleanContent.toLowerCase().includes("omg")) {
    await message.react("🇴");
    await message.react("🇲");
    await message.react("🇬");
  }
};

const _handleMessageMiddleware = async ({ client, message }) => {
  const msg = JSON.parse(JSON.stringify(message));

  client.logger.log(JSON.stringify(message) + ' //', "log");

  channel = client.channels.cache.find((c) => c.name === "gandacel")
  //channel.send('Your mes: ' + msg.content);

  if ((msg)) {
    _onlyRadu({ client, message });
  }

  if (msg.cleanContent.toLowerCase().includes("inca un meme")) {
    const attachment = new MessageAttachment("https://memegenerator.net/img/instances/76127927/it-doesnt-take-much-to-be-the-best-worker-when-your-coworkers-spend-all-day-sharing-memes.jpg");
    message.channel.send(attachment);
    return null;
  }

  if (msg.cleanContent.toLowerCase().includes("ajutor") && msg.cleanContent.toLowerCase().includes("nevoie")) {
    const images = [
      "https://media.giphy.com/media/l46Cbqvg6gxGvh2PS/giphy.gif",
      "https://media.giphy.com/media/WS6ABEVwTwWew89CHo/giphy.gif",
      "https://media.giphy.com/media/phJ6eMRFYI6CQ/giphy.gif",
      "https://media.giphy.com/media/8vRrxHIZlJT2xvo920/giphy.gif",
      "https://media.giphy.com/media/3oGNDk715s04Hw0zbG/giphy.gif",
      "https://media.giphy.com/media/tL3Nkk58oeWEo/giphy.gif",
      "https://media.giphy.com/media/3otPoIpKz3pYa4o2hq/giphy.gif",
      "https://media.giphy.com/media/2GjTdNHnmk2IM/giphy.gif"
    ];

    const attachment = images[Math.floor(Math.random() * images.length)];
    message.channel.send(attachment);
    message.react("📢");
    return null;
  }

  if (msg.cleanContent.toLowerCase().includes("ma ajuti")) {
    const attachment = new MessageAttachment("https://memegenerator.net/img/instances/55920194.jpg");
    message.channel.send(attachment);
    return null;
  }
  if (msg.cleanContent.toLowerCase().includes("bug") && msg.cleanContent.toLowerCase().includes("productie")) {
    const attachment = new MessageAttachment("https://media3.giphy.com/media/2zZKmC3BnDicRHbm8z/giphy.gif");
    message.channel.send(attachment);
    return null;
  }

  if (msg.cleanContent.toLowerCase().includes("am iesit")) {
    const images = [
      "https://media.giphy.com/media/LMQo5ad3JdjCAba7Sv/giphy.gif",
      "https://media.giphy.com/media/m9eG1qVjvN56H0MXt8/giphy.gif",
      "https://media.giphy.com/media/kaBU6pgv0OsPHz2yxy/giphy.gif",
      "https://media.giphy.com/media/jUwpNzg9IcyrK/giphy.gif",
      "https://media.giphy.com/media/7DzlajZNY5D0I/giphy.gif",
      "https://media.giphy.com/media/AmDzMmCJZABsk/giphy.gif",
      "https://media.giphy.com/media/26u4b45b8KlgAB7iM/giphy.gif",
      "https://media.giphy.com/media/YooypXsohhjMc/giphy.gif",
      "https://media.giphy.com/media/UQaRUOLveyjNC/giphy.gif",
      "https://media.giphy.com/media/sZJ9eVTkKgjn2/giphy.gif",
      "https://media.giphy.com/media/nc20IGTi6pIDrHRfJ0/giphy.gif",
      "https://media.giphy.com/media/VelWewgR6CpNK/giphy.gif",
      "https://media.giphy.com/media/12CtkDlw4QVnWw/giphy.gif",
      "https://media.giphy.com/media/IUx4UZdX38QEM/giphy.gif",
      "https://media.giphy.com/media/9Drpf7ZufmEFbhRQRe/giphy.gif",
      "https://media.tenor.com/images/b6eabf1b7c0bb6387231fa01e8883f24/tenor.gif",
      "https://media.tenor.com/images/24e0754c47c943d4a38121f22fa7630e/tenor.gif",
      "https://i.gifer.com/1eMy.gif",
      "https://thumbs.gfycat.com/WeepyBrownBactrian-size_restricted.gif",
      "https://media3.giphy.com/media/3oEduK0kW69xoX5Apq/giphy.gif",
      "https://media.tenor.com/images/6f17cd2bf23f0196dda8fcc8d76a4a70/tenor.gif",
      "https://thumbs.gfycat.com/WildCloudyBichonfrise-size_restricted.gif",
      "https://i.pinimg.com/originals/7f/7a/82/7f7a823c58cb5de32e5b0f976e9aa59f.gif",
    ];

    const attachment = images[Math.floor(Math.random() * images.length)];
    message.channel.send(attachment);
    message.react("👋");
    return null;
  }
  if (msg.cleanContent.toLowerCase().includes("weekend fain")) {
    const images = [
      "https://media.giphy.com/media/RMlLHhMencIpgh19jV/giphy.gif",
      "https://media.giphy.com/media/l2JhBoNin9yhqSDLO/giphy.gif",
      "https://media.giphy.com/media/23lzAGaZOXkomLSR8c/giphy.gif",
      "https://media.giphy.com/media/bWS1Vh9mVkcZq/giphy.gif",
      "https://media.giphy.com/media/J0ySNzZ5APILC/giphy.gif",
      "https://media.giphy.com/media/MDxJnL1GGnuALMFu2e/giphy.gif",
      "https://media.giphy.com/media/oF5oUYTOhvFnO/giphy.gif",
      "https://media.giphy.com/media/J546wv1ja2LkrAwRBm/giphy.gif",
      "https://media.giphy.com/media/j0QzDgFZRX2njRxxtP/giphy.gif",
      "https://i.pinimg.com/originals/cd/36/37/cd36373eb332838f895939cf74a060bf.gif",
      "https://media4.giphy.com/media/LqhxsFA4OPT58z8oto/giphy.gif",
      "https://media.tenor.com/images/dd4178a808a9ec1972658c302d57af14/tenor.gif",
      "https://media1.tenor.com/images/7406a1fa8e80d0a6d488533df9752541/tenor.gif?itemid=15154882",
      "https://i.makeagif.com/media/3-30-2017/M33PNX.gif",
      "https://media1.giphy.com/media/1yn20nWimU9iQjvFgo/giphy.gif",
    ];

    const attachment = images[Math.floor(Math.random() * images.length)];
    message.channel.send(attachment);
    message.react("👋");
    return null;
  }
};

module.exports = async (client, message) => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  // Grab the settings for this server from Enmap.
  // If there is no guild, get default conf (DMs)
  const settings = (message.settings = client.getSettings(message.guild));

  // Checks if the bot was mentioned, with no message after it, returns the prefix.
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix on this guild is \`${settings.prefix}\``);
  }

  _handleMessageMiddleware({ client, message });
  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(settings.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // If the member on a guild is invisible or not cached, fetch them.
  if (message.guild && !message.member) await message.guild.members.fetch(message.author);

  // Get the user or member's permission level from the elevation
  const level = client.permlevel(message);

  // Check whether the command, or alias, exist in the collections defined
  // in app.js.
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  // using this const varName = thing OR otherThing; is a pretty efficient
  // and clean way to grab one of 2 values!
  if (!cmd) return;

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`You do not have permission to use this command.
  Your permission level is ${level} (${client.config.permLevels.find((l) => l.level === level).name})
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }

  // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
  // The "level" command module argument will be deprecated in the future.
  message.author.permLevel = level;

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  // If the command exists, **AND** the user has permission, run it.
  client.logger.cmd(
    `[CMD] ${client.config.permLevels.find((l) => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${
      cmd.help.name
    }`
  );
  cmd.run(client, message, args, level);
};
=======
const logger = require("../modules/logger.js");
const { getSettings, permlevel } = require("../modules/functions.js");
const config = require("../config.js");

// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = async (client, message) => {
  // Grab the container from the client to reduce line length.
  const { container } = client;
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  // Grab the settings for this server from Enmap.
  // If there is no guild, get default conf (DMs)
  const settings = message.settings = getSettings(message.guild);

  // Checks if the bot was mentioned via regex, with no message after it,
  // returns the prefix. The reason why we used regex here instead of
  // message.mentions is because of the mention prefix later on in the
  // code, would render it useless.
  const prefixMention = new RegExp(`^<@!?${client.user.id}> ?$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix on this guild is \`${settings.prefix}\``);
  }

  // It's also good practice to ignore any and all messages that do not start
  // with our prefix, or a bot mention.
  const prefix = new RegExp(`^<@!?${client.user.id}> |^\\${settings.prefix}`).exec(message.content);
  // This will return and stop the code from continuing if it's missing
  // our prefix (be it mention or from the settings).
  if (!prefix) return;
    
  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(prefix[0].length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // If the member on a guild is invisible or not cached, fetch them.
  if (message.guild && !message.member) await message.guild.members.fetch(message.author);

  // Get the user or member's permission level from the elevation
  const level = permlevel(message);

  // Check whether the command, or alias, exist in the collections defined
  // in app.js.
  const cmd = container.commands.get(command) || container.commands.get(container.aliases.get(command));
  // using this const varName = thing OR otherThing; is a pretty efficient
  // and clean way to grab one of 2 values!
  if (!cmd) return;

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

  if (!cmd.conf.enabled) return;

  if (level < container.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`You do not have permission to use this command.
Your permission level is ${level} (${config.permLevels.find(l => l.level === level).name})
This command requires level ${container.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }

  // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
  // The "level" command module argument will be deprecated in the future.
  message.author.permLevel = level;
  
  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  // If the command exists, **AND** the user has permission, run it.
  try {
    await cmd.run(client, message, args, level);
    logger.log(`${config.permLevels.find(l => l.level === level).name} ${message.author.id} ran command ${cmd.help.name}`, "cmd");
  } catch (e) {
    console.error(e);
    message.channel.send({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\`` })
      .catch(e => console.error("An error occurred replying on an error", e));
  }
};
>>>>>>> 725fc1460ca276282c27a775b5f9915154983ecc:events/messageCreate.js
