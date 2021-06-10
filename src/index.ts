import { Client, MessageEmbed, MessageEmbedImage } from 'discord.js';
import { UnsplashAPIClient } from './lib';
import type { Photo } from './types';

require('dotenv').config();

const client = new Client();
client.login(process.env.BOT_TOKEN!);

const unsplashClient = new UnsplashAPIClient(process.env.UNSPLASH_CLIENT_ID!);

client.on('ready', async () => {
  console.log('Bot is ready');
});

client.on('message', async (message) => {
  if (message.content === 'Hi') {
    message.channel.send('Hi!');
  }

  if (message.content == '!pic') {
    const photos: Array<Photo> = (await unsplashClient.search('aesthetic'))!;
    for (let photo of photos) {
      const embed = new MessageEmbed().setImage(photo.src);
      message.channel.send(embed);
    }
  }
});
