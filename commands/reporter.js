const fetch = require("node-fetch");

const getReporter = () => {
  return fetch(
    "https://gandacel.ro/api/index.php?function=process_get_reporter",
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
exports.run = async (client, message, args, level, channel='') => {
  // eslint-disable-line no-unused-vars
  const reporter = await getReporter();

  if(!reporter){
    return;
  }

  var msg = '';
  if (channel !== ''){
    msg = await channel.send("Wait...");
    msg.edit(`@everyone Reporter of Good News of the week este ` + reporter);
  }
  else{
    msg = await message.channel.send("Wait...");
    msg.edit(`Reporter of Good News of the week este ` + reporter);
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "reporter",
  category: "Tools",
  description: "Reporter of good news this week",
  usage: "reporter",
};