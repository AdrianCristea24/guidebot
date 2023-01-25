const fetch = require("node-fetch");

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const getTrivia = () => {
  return fetch("https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=multiple", {
    method: "GET", // or 'PUT'
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
  message.delete();

  const res = await getTrivia();

  if (!res) {
    let msg = await message.channel.send(`Nu am gasit nici o intrebare`);
    return;
  }

  const results = res.results[0];
  const anwsers = shuffle([`${results.correct_answer}‏‏‎ ‎‏‏‎`, ...results.incorrect_answers]);

  let msg = await message.channel.send(`**${results.question}**`);

  anwsers.map((element) => {
    message.channel.send(`‏‏‎-${element}`);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "trivia",
  category: "Fun",
  description: "Get a question.",
  usage: "trivia",
};
