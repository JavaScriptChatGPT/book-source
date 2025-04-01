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
