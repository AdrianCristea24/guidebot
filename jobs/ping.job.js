var upTimeBotApiKey = "ur23070-cd7bfc95b4da549dcb3de413";
const fetch = require("node-fetch");
var lastDownWebsites = [];


var cf = require("cloudflare");({
  email: "bogdan@ejump.ro",
  key: "b0daa356901059f02095e95a25f88aa627cd0"
});

fetchMonitorUpTime = async () => {
  const body = {
    api_key: upTimeBotApiKey,
    statuses: "9", // 9 down 2 up
    logs: 1,
    log_type: 1,
  };
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  try {
    const fetchResponse = await fetch("https://api.uptimerobot.com/v2/getMonitors", settings);
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};


const checkCloudFlare = async ({client}) => {

  const settings = {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "X-Auth-Email": "bogdan@ejump.ro",
      "X-Auth-Key":"b0daa356901059f02095e95a25f88aa627cd0",
      "Content-Type": "application/json"
    },
  };

  const fetchResponse = await fetch("https://api.cloudflare.com/client/v4/zones/0eca97b8bbf778186b8dfcccd0e60483/healthchecks", settings);
  const data = await fetchResponse.json();

  if (!data || !data.result) {
    return null;
  }

  return data.result.filter(e => e.status === "unhealthy");
};

// Check websites
// Fetch monitor up time
const checkedWebsites = async () => {
  const downWebsites = [];

  const monitorResults = await fetchMonitorUpTime();

  if (monitorResults.monitors) {
    monitorResults.monitors.forEach((e) => {
      const monitor = {
        name: e.friendly_name,
        url: e.url,
        reason: "Unknow",
      };

      if (e.logs) {
        monitor.reason = e.logs[0].reason.detail;
      }

      downWebsites.push(monitor);
    });
  }

  return downWebsites;
};

        
// Creating a discord client

var lastVidevoCheck = [];
const sendVidevoMsg = async ({client}) => {
  const channelVidevo = client.channels.cache.find((c) => c.name === "videvo");

  const videvoHealthReport = await checkCloudFlare({client});
  let msgVidevo = "";
  videvoHealthReport.forEach((report) => (msgVidevo += `**${report.name}** is down.\n${report.description}\nReason: ${report.failure_reason}\n\n`));

  // If no diff videvo
  if (JSON.stringify(videvoHealthReport) === JSON.stringify(lastVidevoCheck)) {
    return null;
  }

  // Get diff videvo
  lastVidevoCheck.forEach((oldReport) => {
    if (!videvoHealthReport.includes(oldReport)) {
      msgVidevo += `**${oldReport.name}** is up.\n\n`;
    }
  });

  // Actualize history videvo
  lastVidevoCheck = videvoHealthReport;

  if (msgVidevo) {
    channelVidevo.send(msgVidevo);
  }
};
module.exports = async (client) => {

 //sendVidevoMsg({client});

 client.once("ready", () => {
  console.log(`Online as ${client.user.tag}`);
    
  let scheduledMessage = new cron.CronJob('* * * * * *', () => {
    // This runs every day at 10:30:00, you can do anything you want
    // Specifing your guild (server) and your channel
    channel = client.channels.cache.find((c) => c.name === "gandacel")
    channel.send('You message');

  });
        
    // When you want to start it, use:
    scheduledMessage.start();
  });

  const channel = client.channels.cache.find((c) => c.name === "gandacel");
  let msg = "";

  const deadWebs = await checkedWebsites();
  deadWebs.forEach((deadHost) => (msg += `**${deadHost.name}** is down.\n${deadHost.url}\nReason: ${deadHost.reason}\n\n`));

  // If no diff
  if (JSON.stringify(lastDownWebsites) === JSON.stringify(deadWebs)) {
    return null;
  }
  // Get diff
  lastDownWebsites.forEach((oldWeb) => {
    if (!deadWebs.includes(oldWeb)) {
      msg += `**${oldWeb.name}** is up.\n${oldWeb.url}\n\n`;
    }
  });

  // Actualize history
  lastDownWebsites = deadWebs;

  if (msg) {
    //channel.send(msg);
  }
};
