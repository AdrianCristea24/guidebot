const fetch = require("node-fetch");
const { MessageAttachment } = require("discord.js");

function getUserFromMention({ mention, client }) {
  // The id is the first and only match found by the RegEx.
  const matches = mention.match(/^<@!?(\d+)>$/);

  // If supplied variable was not a mention, matches will be null instead of an array.
  if (!matches) return null;

  // However the first element in the matches array will be the entire mention, not just the ID,
  // so use index 1.
  const id = matches[1];

  return client.users.cache.get(id);
}

const getAnswer = (forced) => {
  return fetch(forced ? `https://yesno.wtf/api?force=${forced}` : "https://yesno.wtf/api", {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
exports.run = async (client, message, [...value], level) => {
  // eslint-disable-line no-unused-vars

  const userQuestion = [...value].join(" ");

  if (!value) {
    message.channel.send(`Pune o intrebare`);
    return;
  }
  const msg = `**${message.author.username} intreaba:**\n${userQuestion}`;

  let forced = null;

  if (userQuestion.toLowerCase().includes("?.")) {
    forced = "yes";
  }
  if (userQuestion.toLowerCase().includes(".?")) {
    forced = "no";
  }

  const answer = await getAnswer(forced);
  const attachment = new MessageAttachment(answer.image);

  // Send the attachment in the message channel
  try {
    message.channel.send(`${msg}\n**Gandacel:**`);
    message.channel.send(attachment);
  } catch (error) {}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "ask",
  category: "Fun",
  description: "Obtii un da sau un nu.",
  usage: "ask <question>",
};
