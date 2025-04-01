import OpenAI from "openai";
import "dotenv/config";

// Create a new open ai client
const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
  });
  let result = chatCompletion.choices[0].message.content;
  console.log(result);
}

main();
