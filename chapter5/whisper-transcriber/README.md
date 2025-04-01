# Notes

Make sure you have ffmpeg installed by running:

```bash
ffmpeg -h
```

To install the packages, run the following inside the directory.

```bash
npm i ffmpeg-static fluent-ffmpeg dotenv openai
```

To run the transcriber, add the audio files you would like to cut into the base of the directory with the name `input.mp3`

# Prompting ChatGPT

## Audio Splitter

The prompt used to create the `audio-splitter.js` file is the following:

"Using the ffmpeg JavaScript library, I would like you create a node.js program that takes a mp3 file and creates a new one that is cut after 10 minutes of audio."

The result can be found at `audio-splitting-response.md`

Although the code I ended up with is used is different from the code given from ChatGPT. I had to make changes so that the function could be asynchronous, so that we can `await` until the mp3 splitting is complete to start sending the response to openai. Therefore, you'll notice the `async` keyword in some of the functions in the `audio-splitter` and the usage of the `Promise` class.

## Transcriber

I prompted ChatGPT the following: "Create a Node.js program that reads all the `.mp3` files a directory and sends the files to openai's whisper using the openai javascript library.". The response is within the file `whisper-repsonse.md`

I made adjustments so that the code would first run the audio splitting function and then to send the response to openai.

Although, after trying to run the code for the first time, I found that chatGPT made an error with the whisper API. It wrote:

```js
const response = await openai.transcriptions.create({
  file: fileData,
  model: "whisper-1",
});
```

When it should have been:

```js
const response = await openai.audio.transcriptions.create({
  file: fileData,
  model: "whisper-1",
});
```

It also told me to read the file by using

```js
const fileData = fs.readFileSync(
  "/home/brucehopkins/Documents/programming/chapgpt-for-javascript/chapter5/whisper-transcriber/mp3-files/output_1.mp3"
);
```

But the correct version of reading the file is like this:

```js
const fileData = fs.createReadStream(
  "/home/brucehopkins/Documents/programming/chapgpt-for-javascript/chapter5/whisper-transcriber/mp3-files/output_1.mp3"
);
```
