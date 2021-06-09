import { Client } from 'discord.js';

require('dotenv').config();

const client: Client = new Client();
client.login(process.env.BOT_TOKEN!);

client.on('ready', async () => {
  console.log('Bot is ready');
});

client.on('message', async (message) => {
  if (message.content === 'Hi') {
    message.channel.send('Hi!');
  }
});
