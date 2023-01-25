const fetch = require("node-fetch");

const getJoke = () => {
  return fetch(
    "https://api.humorapi.com/jokes/random?api-key=d9e610293b7e405d833e9047d8116577",
    {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
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

  const joke = await getJoke();

  if (!joke || !joke.joke) {
    msg.edit(`Am rămas fără glume...`);
  }

  msg.edit(`**${joke.joke} :rofl: :rofl: :rofl: `);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "joke",
  category: "Fun",
  description: "Get a random joke.",
  usage: "joke",
};
