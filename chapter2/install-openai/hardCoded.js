import OpenAI from "openai";
import "dotenv/config";

const API_KEY = "sk-proj-XXXX";

const openai = new OpenAI({
  apiKey: API_KEY,
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
