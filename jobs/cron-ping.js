const cron = require('node-cron');

    // Creating a discord client

    exports.run = async (client, message, args, level) => {
        const msg = await message.channel.send("Wait...");
        msg.edit(`Can't find a quote`);

        cron.schedule('* * * * *', async function() {
            console.log('running a task every minute');
            // eslint-disable-line no-unused-vars
            const msg = await message.channel.send("Wait...");
            msg.edit(`Can't find a quote`);
        });
    };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User",
  };
  
  exports.help = {
    name: "ho",
    category: "Fun",
    description: "Get a random quote.",
    usage: "ho",
  };