# Notes

To install the packages run:

```bash
npm install discord.js dotenv openai
```

To run the program run the command:

```bash
node index.js
```

Instead of creating two classes for moderation and for ChatGPT, I create one class since one class already has the an initialized ChatGPT client. The class is created in the `chatGPTClient.js` file.
