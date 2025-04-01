// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (client.user.username === message.author.username) return;
  if (message.channel.name != "q-and-a") return;

  console.log("User is:", message.author.globalName);
  console.log("Message is:", message.content);

  const reply = `${mention(message.author)}, I can help you with that!`;
  await message.channel.send(reply);
});

function mention(author) {
  return `<@${author.id}>`;
}

// Log in to Discord with your client's token
client.login(process.env.DISCORD_BOT_API_TOKEN);
