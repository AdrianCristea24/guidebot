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
  const msg = await message.channel.send(`Minutes left until ${userMsg.join(" ")}: ${formatTime(secondsCounter)}`);
  const timeInterval = 5; // seconds

  var countdown = setInterval(() => {
    secondsCounter -= timeInterval;
    msg.edit(`Time left until ${userMsg.join(" ")}: ${formatTime(secondsCounter)}`);
    if (secondsCounter < 0) {
      msg.edit(`Countdown until ${userMsg.join(" ")} completed`);
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
  name: "countdown",
  category: "Tools",
  description: "Countdown minutes.",
  usage: "countdown <minutes> <message>",
};
