const { OpenAI } = require("openai");
require("dotenv").config();

class ChatGPTClient {
  constructor(systemMessage, initialInituctionsToChatGPT) {
    this.systemMessage = systemMessage;
    this.initialInituctionsToChatGPT = initialInituctionsToChatGPT;
    this.client = new OpenAI({
      apiKey: process.env["OPENAI_API_KEY"],
    });
  }

  async sendMessageFromDiscord(userMessage) {
    const chatCompletion = await this.client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: this.systemMessage,
        },
        {
          role: "user",
          content: this.initialInituctionsToChatGPT,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "gpt-4",
      temperature: 0.85,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const result = chatCompletion.choices[0].message.content;
    return result;
  }

  async isFlagged(message) {
    const response = await this.client.moderations.create({
      input: message,
    });
    return response.results[0].flagged;
  }
}

module.exports = { ChatGPTClient };
