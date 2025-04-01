import OpenAI from "openai";
import "dotenv/config";

// Create a new open ai client
const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a JavaScript developer",
      },
      {
        role: "user",
        content: "Why is JavaScript use for web development?",
      },
    ],
    model: "gpt-4",
    temperature: 0.85,
    top_p: 1,
    max_tokens: 1921,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const result = chatCompletion.choices[0].message.content;
  console.log(result);
}

main();
