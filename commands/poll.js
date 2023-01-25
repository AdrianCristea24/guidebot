const numberToEmoji = (n) => {
  switch (n) {
    case 1:
      return "🇦";
    case 2:
      return "🇧";
    case 3:
      return "🇨";
    case 4:
      return "🇩";
    case 5:
      return "🇪";
    case 6:
      return "🇫";
    case 7:
      return "🇬";
    case 8:
      return "🇭";
    case 9:
      return "🇮";
    case 10:
      return "🇯";
    default:
      return "⭕";
  }
};

const createEmbedMessage = ({ message, title, content }) => {
  const embed = new MessageEmbed()
    // Set the title of the field
    .setTitle("A slick little embed")
    // Set the color of the embed
    .setColor(0xff0000)
    // Set the main content of the embed
    .setDescription("Hello, this is a slick embed!");
  // Send the embed to the same channel as the message
  message.channel.send(embed);
};

exports.run = async (client, message, args, level) => {
  message.delete();

  let textArray = args.join(" ").split(`"`);

  // Get question
  const intrebare = textArray[0];

  let mesageText = `:bar_chart: **${intrebare}** \n\n`;
  const msg = await message.channel.send(mesageText);

  // Eliminate question from array
  textArray = textArray.slice(1);

  // Eliminate empty space
  const optionArray = textArray.filter((e) => e.trim() != "");

  if (optionArray.length < 1) {
    msg.react("👍");

    msg.react("👎");

    msg.react("🤷‍♂️");
  }

  optionArray.forEach((element, index) => {
    let icon = numberToEmoji(index + 1);
    mesageText += `${icon} ${element}\n`;
    msg.edit(mesageText);
    msg.react(icon);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "poll",
  category: "Tools",
  description: "Make a poll.",
  usage: `poll <quetion> "<1>" "<2>" "<3>"`,
};
