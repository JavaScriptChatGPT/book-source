Sure! Below is a step-by-step guide and the code for a Node.js program that reads all `.mp3` files in a directory and sends them to OpenAI's Whisper using the OpenAI JavaScript library.

1. **Setup Node.js project**:

   - Initialize a new Node.js project.
   - Install the required packages.

2. **Create the script**:
   - Read the files in the directory.
   - Filter out the `.mp3` files.
   - Send each file to OpenAI's Whisper API.

### Step 1: Setup Node.js project

1. Initialize a new Node.js project:

   ```sh
   mkdir whisper-transcription
   cd whisper-transcription
   npm init -y
   ```

2. Install required packages:
   ```sh
   npm install openai fs path
   ```

### Step 2: Create the script

Create a file named `transcribe.js` and add the following code:

```javascript
const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");

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

      // Read the .mp3 file
      const fileData = fs.readFileSync(filePath);

      // Send the file to OpenAI's Whisper
      const response = await openai.transcriptions.create({
        file: fileData,
        model: "whisper-1",
      });

      // Output the transcription
      console.log(`Transcription for ${file}:`);
      console.log(response.data.text);
    }
  } catch (error) {
    console.error("Error processing files:", error);
  }
}

// Set the directory to read from
const directoryPath = "./mp3-files";

// Run the transcription function
transcribeMP3Files(directoryPath);
```

### Explanation:

1. **Setup OpenAI Client**: Initialize the OpenAI client using the API key.
2. **Read Directory**: Use `fs.readdirSync` to read all files in the specified directory.
3. **Filter .mp3 Files**: Filter the files to include only `.mp3` files.
4. **Read and Transcribe Files**: Read each file using `fs.readFileSync` and send it to OpenAI's Whisper API using the `transcriptions.create` method. Output the transcription result.

### Environment Variables

Ensure your OpenAI API key is set in your environment variables. You can set it in your shell before running the script:

```sh
export OPENAI_API_KEY='your-api-key'
```

### Directory Structure

Place your `.mp3` files in a directory named `mp3-files` inside your project directory. The structure should look like this:

```
whisper-transcription/
│
├── mp3-files/
│   ├── file1.mp3
│   ├── file2.mp3
│   └── ...
│
├── transcribe.js
├── package.json
└── package-lock.json
```

### Run the Script

Run the Node.js script:

```sh
node transcribe.js
```

This will read all `.mp3` files in the `mp3-files` directory, send them to OpenAI's Whisper for transcription, and print the transcriptions to the console.
