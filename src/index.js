require('dotenv').config();

const { Intents, Client, Collection } = require('discord.js');
const fs = require('fs');

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES
	]
});

client.on('ready', function (client) {
	console.log(`[!] Ready On ${client.user.tag}`);
});

const functionFiles = fs.readdirSync('./functions/').filter(funcFile => funcFile.endsWith('.js'));
const eventFiles = fs.readdirSync('./events/').filter(eventFile => eventFile.endsWith('.js'));
const cmdFiles = fs.readdirSync('./commands/');

(async () => {

  for (funcFile of functionFiles) {
    require(`./functions/${funcFile}`)(client);
  }
	client.login(process.env.CLIENT_TOKEN);
})()