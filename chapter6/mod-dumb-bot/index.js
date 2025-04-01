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

const banned_word = "puppies";

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (client.user.username === message.author.username) return;
  if (message.channel.name != "q-and-a") return;

  if (message.content.includes(banned_word)) {
    if (!(await message.delete())) {
      console.log("Failed to delete message");
    } else {
      const authorMention = `${mention(message.author)}`;
      const reply = `${authorMention} This comment was deemed inappropriate for this channel.\nif you believe this to be in error, please contact one of the human server moderators.`;
      await message.channel.send(reply);
    }
  }
});

function mention(author) {
  return `<@${author.id}>`;
}

client.login(process.env.DISCORD_BOT_API_TOKEN);
