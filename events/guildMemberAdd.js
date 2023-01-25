// This event executes when a new member joins a server. Let's welcome them!

const generalChannelMSG = `
**Aww, You made it! Welcome aboard of eJump’s stellar discord!**
As our new comrade, there’s no time to waste 🚀 Put ur digital seatbelt on, activate your awesomeness and start exploring our vast space of design magic & tech wonder!
Ready for the LIFT-OFF? Check these “house rules” before you start:
-Back in the days, we had many such great coffee talks in our HQ kitchen! Live love laugh, all that. The kitchen is now digital: **under-the-dome**, for socializing & sharing random stuff w/ fellow space travelers. So engage, listen, share, learn, stir things up, have fun, be kind & connect!   
-Need smth? Check https://wiki.dev.ascensys.ro first – it’s your go-to FAQ, but remember: we’re your buddies. We’ll be there for you, just ask.   
-Each project has its own channel, ofc. So all the cool people working on a specific project have their own channels to be in sync.
-What’s shared here, stays in here – every bit of sensitive info shared and accessed on discord is confidential (passwords, client decisions etc.) – the same you agreed & signed for already.
-Obviously, you can talk to each other in PMs, work related or not. So keep your big secrets, you know, secret. Or not👽
-All we want with this Discord server is to make it super-easy to keep an honest & frequent communication. It’s our core value we, including you, cannot live well or work without. These days, more than ever. But you can start with a meme or smth. Thanks for joining!\n\n`;

const projectChannelMSG = `**Project channel description**
In this channel, it’s all about the work & talk on this project only. To help you, here’s what you should do here:
-New among us? Just take a look at the message history and see how we talk & work, what topics are discussed and so on – you know, to get into the vibe.
-Talk about the project with your other colleagues involved in it (text/voice)
-Share the morning status – also, the status at the end of the day
-Let your team know about any changes in the timeline (deadlines, delays, unexpected stuff)
-Announce any updated/new/urgent tasks in Asana
-Pin the stuff you consider important (passwords, decisions, good-to-know about the project).
-What you shouldn’t do:
-Don’t assign tasks. All tasks are created in Asana – here, you can only let people know about them and the urgent ones (a bug found on live, an anxious client)
-Don’t share big fat files. Everything >5MB (plugins, .zip, backups) will be shared through Dropbox/Google Drive/direct server link/Asana attachment to its specific task.
-Don’t be shy. Speak up and trust your voice (in a kind way) ✌🏻
`;

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.getSettings(member.guild);

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag.slice(0, -5));

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.cache
    .find((c) => c.name === settings.welcomeChannel)
    .send(`${welcomeMessage} \n${generalChannelMSG}`)
    .catch(console.error);
};
