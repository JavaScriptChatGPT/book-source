const { OpenAI } = require("openai");
require("dotenv").config();

async function main() {
  // Set up the OpenAI client with your API key
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.images.generate({
    model: "dall-e-3",
    n: 1,
    // The prompt and for the image
    prompt:
      "a 35mm macro photo of 3 cute Rottweiler puppies with no collars laying down in a field",
    size: "1024x1024",
  });
  image_url = response.data[0].url;
  console.log(image_url);
}

main();
