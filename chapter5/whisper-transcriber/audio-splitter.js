const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");
const fs = require("fs");

// Function to split MP3 file
async function splitMP3(inputFile, duration_secs) {
  const duration = duration_secs * 60;
  // Configure ffmpeg to use the static binary
  ffmpeg.setFfmpegPath(ffmpegPath);
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(inputFile, async (err, metadata) => {
      if (err) {
        console.error(`Error occurred: ${err.message}`);
        return;
      }

      const totalDuration = metadata.format.duration;
      const numberOfChunks = Math.ceil(totalDuration / duration);
      const outputDir = path.join(__dirname, "mp3-files");

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
      }

      for (let i = 0; i < numberOfChunks; i++) {
        const startTime = i * duration;
        const outputFile = path.join(outputDir, `output_${i + 1}.mp3`);

        await createFile(inputFile, outputFile, startTime, duration);
      }
      resolve();
    });
  });
}

async function createFile(inputFile, outputFile, startTime, duration) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputFile)
      .setStartTime(startTime)
      .duration(duration)
      .output(outputFile)
      .on("end", () => {
        console.log(`Created ${outputFile}`);
        resolve();
      })
      .on("error", (err) => {
        console.error(`Error occurred: ${err.message}`);
        reject(err);
      })
      .run();
  });
}

// async function createFile(inputFile, outputFile, startTime, duration) {
//     return new Promise((resolve, reject) => {
//       ffmpeg(inputFile)
//         .setStartTime(startTime)
//         .duration(duration)
//         .output(outputFile)
//         .on("end", () => {
//           console.log(`Created ${outputFile}`);
//           resolve();
//         })
//         .on("error", (err) => {
//           console.error(`Error occurred: ${err.message}`);
//           reject(err);
//         })
//         .run();
//     });
//   }

// TODO, decide on a standard of either modules or common.js
module.exports = { splitMP3 };
