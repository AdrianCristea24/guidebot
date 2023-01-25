const fetch = require("node-fetch");

const getConcediu = () => {
  return fetch(
    "https://gandacel.ro/api/index.php?function=get_concediu",
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
  const concedii = await getConcediu();

  if(!concedii){
    return;
  }

  const msg = await message.channel.send("Wait...");

  if (concedii.freeDay){
    //is freeDay or Weekend
    return;
  }

  if (concedii.noData) {
    msg.edit(`Nimeni nu este in concediu astazi`);
  }

  var list = '';
  for(let x = 0; x < concedii.length; x++){
    list += '- ' + concedii[x].nume + '\n';
  }

  if (concedii.length === 1){
    msg.edit(`Astazi este in concediu:\n${(list)}`);
  }
  else if (concedii.length > 1){
    msg.edit(`Astazi sunt in concediu:\n${(list)}`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "concediu",
  category: "Fun",
  description: "concediu",
  usage: "concediu",
};