function formatTime(s) {
  let hours = Math.floor(s / 3600);
  let minutes = Math.floor((s % 3600) / 60);
  let seconds = Math.round(s % 60);

  return `${hours} hours ${minutes} minutes ${seconds} seconds`;
}

exports.run = async (client, message, [minutes, ...userMsg], level) => {
  // eslint-disable-line no-unused-vars
  message.delete();

  if (!Number.isInteger(Number(minutes))) {
    await message.channel.send(`Invalid number`);
    return false;
  }

  let secondsCounter = Number(minutes) * 60;
  const msg = await message.channel.send(`${message.author.username} will be back in ${formatTime(secondsCounter)}`);
  const timeInterval = 5; // seconds

  var countdown = setInterval(() => {
    secondsCounter -= timeInterval;
    msg.edit(`${message.author.username} will be back in ${formatTime(secondsCounter)}`);
    if (secondsCounter < 0) {
      msg.edit(`${message.author.username} is back.`);
      clearInterval(countdown);
    }
  }, 1000 * timeInterval);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "brb",
  category: "Tools",
  description: "Be right back.",
  usage: "brb <minutes>",
};
