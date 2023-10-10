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

const today = new Date();

function getNextMondayFromDate(date) {

  const nextMonday = new Date(date);
  nextMonday.setDate(date.getDate() + 3);

  const year = nextMonday.getFullYear();
  const month = String(nextMonday.getMonth() + 1).padStart(2, '0');
  const day = String(nextMonday.getDate()).padStart(2, '0');
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

function isTodayFriday() {
  return today.getDay() === 5; // 5 is the code for Friday
}

var isFriday = false;
function getNextMondayIfTodayIsFriday() {
  if (isTodayFriday()) {
    isFriday = true;
    const nextMonday = getNextMondayFromDate(today);
    return nextMonday;
  } else {
    return getTomorrowDate();
  }
}

function getTomorrowDate() {
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}
exports.run = async (client, message, args, level, channel='', isConcediuToday = true) => {
  // eslint-disable-line no-unused-vars
  const concedii = await getConcediu();

  if(!concedii || concedii.freeDay){
    return;
  }

  var msg = '';
  if (channel !== ''){
    msg = await channel.send("Wait...");
  }
  else{
    msg = await message.channel.send("Wait...");
  }

  var tommorow = getNextMondayIfTodayIsFriday();
  var zi = isFriday ? 'luni' : 'maine';
  var list = '';
  var listStartConcediu = '';
  for(let x = 0; x < concedii.length; x++){

    if (concedii[x].start == tommorow){
      if (concedii[x].days>1){
        listStartConcediu += '- ' + concedii[x].nume + ' intra in concediu timp de ' + concedii[x].days +' zile. \n';
      }
      else{
        listStartConcediu += '- ' + concedii[x].nume + ' intra in concediu timp de o zi. \n';
      }
    }

    list += '- ' + concedii[x].nume + '\n';

  }

  if (isConcediuToday){
    if (concedii.length === 1){
      msg.edit(`Astazi este in concediu:\n${(list)}`);
      msg.react('🏖️');
    }
    else if (concedii.length > 1){
      msg.edit(`Astazi sunt in concediu:\n${(list)}`);
      msg.react('🏖️');
    }
    else{
      msg.edit(`Nimeni nu este in concediu astazi`);
      msg.react('⭐')
    }
  }
  else{
    if(listStartConcediu == ''){
      msg.edit(`Nimeni nu incepe ` +  zi + ` ( ` + tommorow + `) concediul`);
      msg.react('⭐')
    }
    else{
      msg.edit(`Incepand de ` +  zi + ` ( ` + tommorow + ` ) \n${(listStartConcediu)}`);
    }

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
  category: "Tools",
  description: "Cine este astazi in concediu",
  usage: "concediu",
};