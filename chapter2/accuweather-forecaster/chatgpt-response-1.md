Certainly! Below is a step-by-step guide to creating a simple Node.js application that fetches weather data from the AccuWeather API for a given city.

### Step 1: Set Up Your Node.js Project

1. **Initialize a new Node.js project:**

   ```bash
   mkdir weather-app
   cd weather-app
   npm init -y
   ```

2. **Install necessary packages:**
   ```bash
   npm install axios readline-sync dotenv
   ```

### Step 2: Set Up AccuWeather API

1. **Sign up for an AccuWeather API key:**  
   Go to [AccuWeather Developer Portal](https://developer.accuweather.com/) and sign up for an API key.

2. **Create a `.env` file in your project root to store your API key:**
   ```plaintext
   ACCUWEATHER_API_KEY=your_api_key_here
   ```

### Step 3: Write the Application Code

Create a file named `index.js` in the project root and add the following code:

```javascript
const axios = require("axios");
const readlineSync = require("readline-sync");
require("dotenv").config();

const apiKey = process.env.ACCUWEATHER_API_KEY;
const baseUrl = "http://dataservice.accuweather.com";

async function getCityKey(city) {
  const url = `${baseUrl}/locations/v1/cities/search`;
  try {
    const response = await axios.get(url, {
      params: {
        apikey: apiKey,
        q: city,
      },
    });
    if (response.data && response.data.length > 0) {
      return response.data[0].Key;
    } else {
      console.log("City not found.");
      process.exit(1);
    }
  } catch (error) {
    console.error("Error fetching city key:", error);
    process.exit(1);
  }
}

async function getWeather(cityKey) {
  const url = `${baseUrl}/currentconditions/v1/${cityKey}`;
  try {
    const response = await axios.get(url, {
      params: {
        apikey: apiKey,
      },
    });
    if (response.data && response.data.length > 0) {
      return response.data[0];
    } else {
      console.log("Weather data not found.");
      process.exit(1);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    process.exit(1);
  }
}

async function main() {
  const city = readlineSync.question("Enter your city: ");
  const cityKey = await getCityKey(city);
  const weather = await getWeather(cityKey);

  console.log(`Weather in ${city}:`);
  console.log(
    `Temperature: ${weather.Temperature.Metric.Value}°${weather.Temperature.Metric.Unit}`
  );
  console.log(`Weather Text: ${weather.WeatherText}`);
}

main();
```

### Step 4: Run the Application

1. **Run your application:**

   ```bash
   node index.js
   ```

2. **Enter your city when prompted:**
   ```plaintext
   Enter your city: [Your City Name]
   ```

You should see the current weather conditions for the city you entered.

### Summary

This simple Node.js application uses the AccuWeather API to fetch and display the current weather for a specified city. It uses `axios` to make HTTP requests, `readline-sync` to get user input from the console, and `dotenv` to manage environment variables securely.
