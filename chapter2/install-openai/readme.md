## Setting up Node

Check if node is installed. If it's not, install it.

```bash
node -v
```

Check your npm version to see if it's installed

```bash
npm -v
```

If you have npm installed, then install the openai client

```bash
npm install openai
```

## Setting Enviroment

Install the `dotenv` package to load the `.env` file. (Of course, you have the option to export the enviroment variable in bash, I don't see the utiliting in doing so since the variable would be temporary. Nevertheless, it would be the same process as the python book.)

```
npm install dotenv
```

## Running the project

I have examples for how to setup the codebase with a hard coded value, without using a `.env` file, and with a `.env` which are hardcoded.js, withoutDotenv.js, and index.js respectively. In order to run each project, run `node fileYouWantToRun.js` for instance to run the project using a `.env` file you would run:

```bash
node index.js
```

// TODO write note about the type module in the package.json
