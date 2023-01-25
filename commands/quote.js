const fetch = require("node-fetch");

const getQuote = () => {
  return fetch("https://programming-quotes-api.herokuapp.com/quotes/random/lang/ro", {
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

exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-vars
  const msg = await message.channel.send("Wait...");

  const quote = await getQuote();

  if (!quote) {
    msg.edit(`Can't find a quote`);
  }

  msg.edit(`*${quote.en}*\n`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "quote",
  category: "Fun",
  description: "Get a random quote.",
  usage: "quote",
};
