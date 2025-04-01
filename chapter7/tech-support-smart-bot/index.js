// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");
const { ChatGPTClient } = require("./chatGPTClient");
const fs = require("node:fs");
require("dotenv").config();

const systemMessage =
  "You are a virtual assistant that provides support for the Crooks Bank banking app.";
const faqContents = fs.readFileSync("./FAQ.txt", "utf8");
const chatGPTClient = new ChatGPTClient(systemMessage, faqContents);

const CHANNEL_TO_WATCH = "q-and-a";
// Create a new client instance
const discordClient = new Client({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
  ],
});

discordClient.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

discordClient.on(Events.MessageCreate, async (message) => {
  if (discordClient.user.username === message.author.username) return;
  if (message.channel.name != CHANNEL_TO_WATCH) return;

  console.log("User is:", message.author.globalName);
  console.log("Message is:", message.content);

  await message.channel.sendTyping();
  const chatGPTResponse = await chatGPTClient.sendMessageFromDiscord(
    message.content
  );

  const reply = `${mention(message.author)} ${chatGPTResponse}`;
  await message.channel.send(reply);
});

function mention(author) {
  return `<@${author.id}>`;
}

// Log in to Discord with your client's token
discordClient.login(process.env.DISCORD_BOT_API_TOKEN);
