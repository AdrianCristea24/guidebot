<<<<<<< HEAD
module.exports = (client) => {

  /*
  PERMISSION LEVEL FUNCTION

  This is a very basic permission system for commands which uses "levels"
  "spaces" are intentionally left black so you can add them if you want.
  NEVER GIVE ANYONE BUT OWNER THE LEVEL 10! By default this can run any
  command including the VERY DANGEROUS `eval` and `exec` commands!

  */
  client.permlevel = message => {
    let permlvl = 0;

    const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  };

  /*
  GUILD SETTINGS FUNCTION

  This function merges the default settings (from config.defaultSettings) with any
  guild override you might have for particular guild. If no overrides are present,
  the default settings are used.

  */
  
  // THIS IS HERE BECAUSE SOME PEOPLE DELETE ALL THE GUILD SETTINGS
  // And then they're stuck because the default settings are also gone.
  // So if you do that, you're resetting your defaults. Congrats.
  const defaultSettings = {
    "prefix": "~",
    "modLogChannel": "mod-log",
    "modRole": "Moderator",
    "adminRole": "Administrator",
    "systemNotice": "true",
    "welcomeChannel": "welcome",
    "welcomeMessage": "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D",
    "welcomeEnabled": "false"
  };

  // getSettings merges the client defaults with the guild settings. guild settings in
  // enmap should only have *unique* overrides that are different from defaults.
  client.getSettings = (guild) => {
    client.settings.ensure("default", defaultSettings);
    if(!guild) return client.settings.get("default");
    const guildConf = client.settings.get(guild.id) || {};
    // This "..." thing is the "Spread Operator". It's awesome!
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    return ({...client.settings.get("default"), ...guildConf});
  };

  /*
  SINGLE-LINE AWAITMESSAGE

  A simple way to grab a single reply, from the user that initiated
  the command. Useful to get "precisions" on certain things...

  USAGE

  const response = await client.awaitReply(msg, "Favourite Color?");
  msg.reply(`Oh, I really love ${response} too!`);

  */
  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };


  /*
  MESSAGE CLEAN FUNCTION

  "Clean" removes @everyone pings, as well as tokens, and makes code blocks
  escaped so they're shown more easily. As a bonus it resolves promises
  and stringifies objects!
  This is mostly only used by the Eval and Exec commands.
  */
  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise")
      text = await text;
    if (typeof text !== "string")
      text = require("util").inspect(text, {depth: 1});

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

    return text;
  };

  client.loadCommand = (commandName) => {
    try {
      client.logger.log(`Loading Command: ${commandName}`);
      const props = require(`../commands/${commandName}`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  client.unloadCommand = async (commandName) => {
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;
    
    if (command.shutdown) {
      await command.shutdown(client);
    }
    const mod = require.cache[require.resolve(`../commands/${command.help.name}`)];
    delete require.cache[require.resolve(`../commands/${command.help.name}.js`)];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }
    return false;
  };

  /* MISCELANEOUS NON-CRITICAL FUNCTIONS */
  
  // EXTENDING NATIVE TYPES IS BAD PRACTICE. Why? Because if JavaScript adds this
  // later, this conflicts with native code. Also, if some other lib you use does
  // this, a conflict also occurs. KNOWING THIS however, the following 2 methods
  // are, we feel, very useful in code. 
  
  // <String>.toPropercase() returns a proper-cased string such as: 
  // "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
  Object.defineProperty(String.prototype, "toProperCase", {
    value: function() {
      return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
  });

  // <Array>.random() returns a single random element from an array
  // [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5.
  Object.defineProperty(Array.prototype, "random", {
    value: function() {
      return this[Math.floor(Math.random() * this.length)];
    }
  });

  // `await client.wait(1000);` to "pause" for 1 second.
  client.wait = require("util").promisify(setTimeout);

  // These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
  process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    client.logger.error(`Uncaught Exception: ${errorMsg}`);
    console.error(err);
    // Always best practice to let the code crash on uncaught exceptions. 
    // Because you should be catching them anyway.
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    client.logger.error(`Unhandled rejection: ${err}`);
    console.error(err);
  });
};
=======
const logger = require("./logger.js");
const config = require("../config.js");
const { settings } = require("./settings.js");
// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.

/*
  PERMISSION LEVEL FUNCTION

  This is a very basic permission system for commands which uses "levels"
  "spaces" are intentionally left black so you can add them if you want.
  NEVER GIVE ANYONE BUT OWNER THE LEVEL 10! By default this can run any
  command including the VERY DANGEROUS `eval` and `exec` commands!

  */
function permlevel(message) {
  let permlvl = 0;

  const permOrder = config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

  while (permOrder.length) {
    const currentLevel = permOrder.shift();
    if (message.guild && currentLevel.guildOnly) continue;
    if (currentLevel.check(message)) {
      permlvl = currentLevel.level;
      break;
    }
  }
  return permlvl;
}

/*
  GUILD SETTINGS FUNCTION

  This function merges the default settings (from config.defaultSettings) with any
  guild override you might have for particular guild. If no overrides are present,
  the default settings are used.

*/
  
// getSettings merges the client defaults with the guild settings. guild settings in
// enmap should only have *unique* overrides that are different from defaults.
function getSettings(guild) {
  settings.ensure("default", config.defaultSettings);
  if (!guild) return settings.get("default");
  const guildConf = settings.get(guild.id) || {};
  // This "..." thing is the "Spread Operator". It's awesome!
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  return ({...settings.get("default"), ...guildConf});
}

/*
  SINGLE-LINE AWAIT MESSAGE

  A simple way to grab a single reply, from the user that initiated
  the command. Useful to get "precisions" on certain things...

  USAGE

  const response = await awaitReply(msg, "Favourite Color?");
  msg.reply(`Oh, I really love ${response} too!`);

*/
async function awaitReply(msg, question, limit = 60000) {
  const filter = m => m.author.id === msg.author.id;
  await msg.channel.send(question);
  try {
    const collected = await msg.channel.awaitMessages({ filter, max: 1, time: limit, errors: ["time"] });
    return collected.first().content;
  } catch (e) {
    return false;
  }
}


/* MISCELLANEOUS NON-CRITICAL FUNCTIONS */
  
// toProperCase(String) returns a proper-cased string such as: 
// toProperCase("Mary had a little lamb") returns "Mary Had A Little Lamb"
function toProperCase(string) {
  return string.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

// These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
process.on("uncaughtException", (err) => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  logger.error(`Uncaught Exception: ${errorMsg}`);
  console.error(err);
  // Always best practice to let the code crash on uncaught exceptions. 
  // Because you should be catching them anyway.
  process.exit(1);
});

process.on("unhandledRejection", err => {
  logger.error(`Unhandled rejection: ${err}`);
  console.error(err);
});

module.exports = { getSettings, permlevel, awaitReply, toProperCase };
>>>>>>> 725fc1460ca276282c27a775b5f9915154983ecc
