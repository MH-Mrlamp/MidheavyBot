require('dotenv').config();

const { Client } = require('discord.js');
const bot = new Client({
  partials: ['MESSAGE', 'REACTION']
});
const PREFIX = "$"

//bot turn on npm run dev
bot.on('ready', () => {
  console.log(`${bot.user.tag} has logged in.`);
});

bot.on('message', async (message) => {
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
    } else if (CMD_NAME === 'ban') {
      if (!message.member.hasPermission('BAN_MEMBERS'))
        return message.reply('You dont have permissions to use that command');
      if (args.length === 0) 
        return message.reply('Please provide an ID');
      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send('User was given the Ban Hammer!');
      } catch (err) {
        console.log(err);
        message.channel.send('an error occured. You dont have permissions or that user was not found');
      }
    }
  }
});

bot.on('messageReactionAdd', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '861250322869780530') {
    switch (name) {
      case '⭐':
        member.roles.add('861252788456914995');
        break;
      case '🐍':
        member.roles.add('861252845718601828');
        break;
      case '💻':
        member.roles.add('861252892329246770');
        break;
      case '☕':
        member.roles.add('861252957995663411');
        break;
    }
  }
});

bot.on('messageReactionRemove', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '861250322869780530') {
    switch (name) {
      case '⭐':
        member.roles.remove('861252788456914995');
        break;
      case '🐍':
        member.roles.remove('861252845718601828');
        break;
      case '💻':
        member.roles.remove('861252892329246770');
        break;
      case '☕':
        member.roles.remove('861252957995663411');
        break;
    }
  }
});



bot.login(process.env.DISCORDJS_BOT_TOKEN);

// console.log(process.env.DISCORDJS_BOT_TOKEN);

