const { Client, Partials, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
	intents: [Object.keys(GatewayIntentBits)],
	partials:[Object.keys(Partials)],
});

client.setMaxListeners(0);

const waifuReactions = [
	'¡Oh, querido! Parece que he tenido que eliminar un mensaje con \'xd\'.',
	'¡Hola! Eliminé un mensaje que contenía \'xd\'.',
	'¿Un poco de orden por favor? \'xd\' ha sido eliminado.',
];

client.on('messageCreate', async (message) => {
	if (message.author.bot) return;

	const xdRegex = /xd+|xD+/;

	if (xdRegex.test(message.content)) {
		if (message.content.includes('xD')) {
			return;
		}
		else {
			message.channel.send(waifuReactions[Math.floor(Math.random() * waifuReactions.length)]);
			message.delete();
		}
	}
});

const emojisToDelete = ['😛', '🤪', '🧐', '🤓', '😎', '🥵', '🥴', '🤢', '🤑', '😈', '👿', '😼', '🚬', '🍆', '🍑'];
const emojiWaifuReactions = [
	'Oh, cariño, parece que hemos tenido que retirar esos emojis traviesos. Reglas son reglas, ¿sabes?',
	'Los emojis inapropiados han sido desterrados de este servidor. Mensaje eliminado.',
	'¡Hemos tenido que confiscar algunos emojis desobedientes! No permitimos eso aquí, querido.',
];

client.on('messageCreate', async (message) => {
	if (message.author.bot) return;

	// Verificar si el mensaje contiene alguno de los emojis a eliminar
	if (emojisToDelete.some(emoji => message.content.includes(emoji))) {
		message.delete();
		message.channel.send(emojiWaifuReactions[Math.floor(Math.random() * emojiWaifuReactions.length)]);
	}
});

client.login(TOKEN).then(() => {
	console.log(`${client.user.username} esta online`);
}).catch((err) => {
	console.log(err);
});