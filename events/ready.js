const schedule = require('node-schedule');

module.exports = async client => {
  // Log that the bot is online.
  client.logger.log(`${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`, "ready");

  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`${client.settings.get("default").prefix}help`, {type: "PLAYING"});


  // RUN SCHEDULE:

  //run concediu at 8 am ( Bucharest ) every weekday
  let rule1 = new schedule.RecurrenceRule();
  rule1.tz = 'Europe/Bucharest';

  rule1.second = 0;
  rule1.minute = 0;
  rule1.hour = 8;
  rule1.dayOfWeek = [1, 2, 3, 4, 5];

  schedule.scheduleJob(rule1, () => {
    client.logger.log(`Concediu cron running...`, "log");
    const cmd = client.commands.get('concediu');
    const channel = client.channels.cache.find((c) => c.name === "under-the-dome");
    cmd.run(client,'', '', '', channel);
  })

  //run cine intra in concediu de maine at 8 am ( Bucharest ) every weekday

  schedule.scheduleJob(rule1, () => {
    client.logger.log(`Concediu de maine cron running...`, "log");
    const cmd = client.commands.get('concediu');
    const channel = client.channels.cache.find((c) => c.name === "manage");
    cmd.run(client,'', '', '', channel, false);
  })

  //run reporter at 8:10 am ( Bucharest ) every monday
  let rule2 = new schedule.RecurrenceRule();
  rule2.tz = 'Europe/Bucharest';

  rule2.second = 0;
  rule2.minute = 10;
  rule2.hour = 8;
  rule2.dayOfWeek = 1;

  schedule.scheduleJob(rule2, () => {
    client.logger.log(`Reporter cron running...`, "log");
    const cmd = client.commands.get('reporter');
    const channel = client.channels.cache.find((c) => c.name === "under-the-dome");
    cmd.run(client,'', '', '', channel);
  })

};
