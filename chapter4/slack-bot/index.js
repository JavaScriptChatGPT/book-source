import { WebClient } from "@slack/web-api";
import "dotenv/config";

const token = process.env.SLACK_API_TOKEN;
const id = "C075PB2F6UD";

async function main(id) {
  const web = new WebClient(token);
  // Store conversation history
  let conversationHistory;
  // ID of channel you watch to fetch the history for

  try {
    // Call the conversations.history method using WebClient
    const result = await web.conversations.history({
      channel: id,
      limit: 3,
    });

    // Get the messages in the order they were sent.
    conversationHistory = result.messages.reverse();

    // Print results
    for (const message of conversationHistory) {
      const userInfo = await web.users.info({ user: message.user });

      // Convert the timestamp into a date
      const timestamp = new Date(parseFloat(message.ts) * 1000);

      if (userInfo.ok) {
        console.log("Username is", userInfo.user.name);
        console.log("Timestamp is", timestamp);
        console.log("Message is", message.text);
        console.log("\n");
      }
    }
  } catch (error) {
    console.error(error);
  }
}

main(id);
