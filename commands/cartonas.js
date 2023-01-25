const fetch = require("node-fetch");
const { MessageEmbed, MessageAttachment } = require("discord.js");

const sendCardToApi = async (data) => {
  const response = await fetch("https://gandacel.ro/gamification-api/cards/actions/sendCard.php", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return response;
};

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

var arrayChunk = function (array, chunkSize) {
  var arrayOfArrays = [];

  if (array.length <= chunkSize) {
    arrayOfArrays.push(array);
  } else {
    for (var i = 0; i < array.length; i += chunkSize) {
      arrayOfArrays.push(array.slice(i, i + chunkSize));
    }
  }
  return arrayOfArrays;
};

const getAllCards = () => {
  return fetch("https://gandacel.ro/gamification-api/cards/actions/getAllCards.php", {
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
const _handleList = async ({ message }) => {
  let msg = `= Cartonase = \n`;

  let msgList = [];
  fetch("https://gandacel.ro/gamification-api/cards/actions/getAllCards.php", {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((card) => {
        if (card.dat_de == "all") {
          msgList.push(
            `ID: ${card.id}\nName: ${card.nume}\nDescription : ${card.descriere}\nUse: !cartonas ${card.id} @user <message>\n\n`
          );
        }
      });

      arrayChunk(msgList, 5).map((arrayBudle) => {
        message.channel.send(arrayBudle.join(""), { code: "asciidoc" });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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

exports.run = async (client, message, [action, key, ...value], level) => {
  // eslint-disable-line no-unused-vars

  message.delete();

  if (action == "list") {
    // client.logger.log(JSON.stringify(xx));
    _handleList({ message: message });
    return false;
  }

  if (action == "mycards") {
    _handleMyCards({ message: message });
    return false;
  }

  const cards = await getAllCards();

  let cardID = cards.find((e) => e.nume.toLowerCase().includes(action.toLowerCase()) || e.id == action);
  const mention = key || "";
  const cardMessage = [...value].join(" ");

  if (!cardID) {
    await message.channel.send(`Nu am găsit cartonașul **${action}** (!cartonas list)`);
    return;
  }

  cardID = cardID.id;

  const mentionedUser = getUserFromMention({ client: client, mention: mention });
  if (!mention) {
    await message.channel.send("Menționează un user (foloseste @)");
    return;
  }

  if (mention && !mentionedUser) {
    await message.channel.send("Userul nu a fost găsit");
    return;
  }

  if (cardMessage.length < 1) {
    await message.channel.send("Adaugă un mesaj");
    return;
  }

  //   client.logger.log(JSON.stringify());

  if (message.author.id == mention.slice(3, -1)) {
    await message.channel.send(`Nu te mai lauda singur...Off ${message.author.username}... :man_facepalming: `);
    return;
  }

  const msg = await message.channel.send("Se trimite un cartonas...");
  const res = await sendCardToApi({
    card_id: cardID,
    from: message.author.id,
    for: mention.slice(3, -1),
    message: cardMessage,
    fromDiscord: true,
  });

  const sentCard = cards.find((card) => card.id === cardID);

  client.logger.log(
    JSON.stringify({
      card_id: cardID,
      from: message.author.id,
      for: mention.slice(3, -1),
      message: cardMessage,
      fromDiscord: true,
    })
  );
  if (!res) {
    msg.edit(`Eroare...`);
    return null;
  }
  msg.edit(
    `**${message.author.username}** a trimis cartonașul **${sentCard.nume}** lui **${mentionedUser.username}** :partying_face: :partying_face:  :partying_face:`
  );
  const attachment = new MessageAttachment(`https://gandacel.ro/${sentCard.locatie_poza}`);
  // Send the attachment in the message channel
  message.channel.send(attachment);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["card"],
  permLevel: "User",
};

exports.help = {
  name: "cartonas",
  category: "Cartonas",
  description: "Trimite un cartonas unui coleg!",
  usage: "cartonas <numele cartonasului> <mentiune> <mesaj>",
};
