import OpenAI from "openai";
import "dotenv/config";

// Create openai client
const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

async function main() {
  // Get the model list from the openai client
  const model_list = await openai.models.list();

  // Save the model names to a variable
  const model_names_list = model_list.data.map((model) => model.id);

  // Loop through the names and log them.
  for (const name of model_names_list) {
    console.log(name);
  }
}

main();
