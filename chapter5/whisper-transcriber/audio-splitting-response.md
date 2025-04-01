To create a Node.js program that uses the ffmpeg JavaScript library to split an MP3 file into smaller MP3 files no longer than 10 minutes each, you can follow these steps:

1. **Install Required Packages**: You need `fluent-ffmpeg` and `ffmpeg-static` packages for FFmpeg functionality and static binary, respectively.

2. **Write the Script**: Create a Node.js script to handle the splitting of the MP3 file.

Here is a step-by-step guide and the complete code for this task:

### Step 1: Install Required Packages

Open your terminal and run the following commands to install `fluent-ffmpeg` and `ffmpeg-static`:

```bash
npm install fluent-ffmpeg ffmpeg-static
```

### Step 2: Write the Node.js Script

Create a file named `split_mp3.js` and add the following code:

```javascript
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");
const fs = require("fs");

// Configure ffmpeg to use the static binary
ffmpeg.setFfmpegPath(ffmpegPath);

// Function to split MP3 file
function splitMP3(inputFile, duration) {
  ffmpeg.ffprobe(inputFile, (err, metadata) => {
    if (err) {
      console.error(`Error occurred: ${err.message}`);
      return;
    }

    const totalDuration = metadata.format.duration;
    const numberOfChunks = Math.ceil(totalDuration / duration);
    const outputDir = path.join(__dirname, "output");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    for (let i = 0; i < numberOfChunks; i++) {
      const startTime = i * duration;
      const outputFile = path.join(outputDir, `output_${i + 1}.mp3`);

      ffmpeg(inputFile)
        .setStartTime(startTime)
        .duration(duration)
        .output(outputFile)
        .on("end", () => {
          console.log(`Created ${outputFile}`);
        })
        .on("error", (err) => {
          console.error(`Error occurred: ${err.message}`);
        })
        .run();
    }
  });
}

// Usage example
const inputFilePath = path.join(__dirname, "input.mp3"); // Path to your input MP3 file
const maxDuration = 600; // 10 minutes in seconds

splitMP3(inputFilePath, maxDuration);
```

### Explanation

1. **Import Required Modules**: `fluent-ffmpeg` for FFmpeg functionalities, `ffmpeg-static` for static binary path, `path` for file paths, and `fs` for filesystem operations.
2. **Configure FFmpeg Path**: Set the path for the FFmpeg binary.
3. **splitMP3 Function**:
   - Get metadata of the input file using `ffprobe`.
   - Calculate the total duration and the number of chunks required.
   - Create an output directory if it doesn't exist.
   - Loop through the number of chunks and create segments using the `setStartTime` and `duration` methods of `fluent-ffmpeg`.
   - Output the smaller files in the `output` directory.
4. **Usage Example**: Define the input MP3 file path and the maximum duration for each segment (600 seconds = 10 minutes). Call the `splitMP3` function with these parameters.

### Step 3: Run the Script

Run your script using Node.js:

```bash
node split_mp3.js
```

This script will take an input MP3 file named `input.mp3` in the same directory as the script and split it into multiple MP3 files, each no longer than 10 minutes, and save them in the `output` directory. Adjust the `inputFilePath` as necessary to point to your actual MP3 file.
