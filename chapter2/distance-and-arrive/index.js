require("dotenv").config();
const axios = require("axios");

// Replace with your API key
const apiKey = process.env.GOOGLE_API_KEY;

// Function to get travel time and distance between two points
async function getTravelInfo(origin, destination) {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === "OK") {
      const route = data.routes[0];
      const leg = route.legs[0];
      const travelTime = leg.duration.text;
      const distance = leg.distance.text;

      console.log(`Travel time: ${travelTime}`);
      console.log(`Distance: ${distance}`);
    } else {
      console.error(`Error: ${data.status}`);
    }
  } catch (error) {
    console.error("Error making request", error);
  }
}

// Replace with your origin and destination
const origin = "New York, NY";
const destination = "Los Angeles, CApn";

// Call the function
getTravelInfo(origin, destination);
