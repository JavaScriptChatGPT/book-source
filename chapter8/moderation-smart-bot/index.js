// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");
const { ChatGPTClient } = require("./chatGPTClient");
const fs = require("node:fs");
require("dotenv").config();

const systemMessage = `
You are the automated moderator assistant for a Discord server. 
Review each message for the following rule violations:
1. Sensitive information
2. Abuse
3. Inappropriate comments
4. Spam, for example; a message in all capital letters, the same phrase or word being repeated over and over, more than 3 exclamation marks or question marks.
5. Advertisement
6. External links
7. Political messages or debate
8. Religious messages or debate

If any of these violations are detected, respond with "FLAG" (in uppercase without quotation marks). If the message adheres to the rules, respond with "SAFE" (in uppercase without quotation marks).
`;
const intructions = "Analyze the following message for rule violations:";
const chatGPTClient = new ChatGPTClient(systemMessage, intructions);

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

  const chatGPTResponse = await chatGPTClient.sendMessageFromDiscord(
    message.content
  );
  const isFlagged = await chatGPTClient.isFlagged(message.content);

  if (chatGPTResponse === "FLAG" || isFlagged) {
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

// Log in to Discord with your client's token
discordClient.login(process.env.DISCORD_BOT_API_TOKEN);
