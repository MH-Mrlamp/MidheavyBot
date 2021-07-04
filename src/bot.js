require('dotenv').config();

const { Client } = require('discord.js');
const bot = new Client();
const PREFIX = "$"

//bot turn on npm run dev
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
  if (CMD_NAME === 'kick') {
      if (!message.member.hasPermission('KICK_MEMBERS'))
        return message.reply('You dont have permissions to use that command');
      if (args.length === 0) 
        return message.reply('Please provide an ID');
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) =>  message.channel.send(`${member} was kicked!`))
          .catch((err) => message.channel.send('I do not have permission :('));
      } else {
        message.channel.send('That member was not found');
      }
    }
  }
});
// console.log(`[${message.author.tag}]: ${message.content}`);
//   if (message.content === 'hello') {
//     message.channel.send('hello');
//   }


bot.login(process.env.DISCORDJS_BOT_TOKEN);

// console.log(process.env.DISCORDJS_BOT_TOKEN);

