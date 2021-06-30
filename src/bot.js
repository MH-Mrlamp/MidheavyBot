require('dotenv').config();

const { Client } = require('discord.js');
const bot = new Client();
const PREFIX = "$"

bot.on('ready', () => {
  console.log(`${bot.user.tag} has logged in.`);
});

bot.on('message', (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
    .trim()
    .substring(PREFIX.length)
    .split(/\s+/);

  console.log(CMD_NAME);
  console.log(args);
  }


  // console.log(`[${message.author.tag}]: ${message.content}`);
  // if (message.content === 'hello') {
  //   message.channel.send('hello');
  // }
});

bot.login(process.env.DISCORDJS_BOT_TOKEN);

// console.log(process.env.DISCORDJS_BOT_TOKEN);

