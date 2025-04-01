const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");
const { splitMP3 } = require("./audio-splitter");
require("dotenv").config();
// Set up the OpenAI client with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to read and transcribe .mp3 files in a directory
async function transcribeMP3Files(directory) {
  try {
    // Read the directory
    const files = fs.readdirSync(directory);

    // Filter out .mp3 files
    const mp3Files = files.filter((file) => path.extname(file) === ".mp3");

    // Process each .mp3 file
    for (const file of mp3Files) {
      const filePath = path.join(directory, file);

      console.log("Filepath is", filePath);

      // Read the .mp3 file
      const fileData = fs.createReadStream(filePath);

      const transcription = await openai.audio.transcriptions.create({
        file: fileData,
        model: "whisper-1",
        response_format: "text",
      });

      // Output the transcription
      console.log(`Transcription for ${file}:`);
      console.log(transcription);
    }
  } catch (error) {
    console.error("Error processing files:", error);
  }
}

async function main() {
  // Set the directory to read from
  const directoryPath = "./mp3-files";

  // Split the MP3 file into segments with no greater than 10 minutes.
  await splitMP3("input.mp3", 10);
  console.log("Completed splitting the mp3 file");

  // Run the transcription function
  await transcribeMP3Files(directoryPath);
  console.log("Finished transcribing the files");
}

main();
