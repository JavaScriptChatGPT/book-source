require("dotenv").config();

const apiKey = process.env.GOOGLE_API_KEY; // Replace with your actual API key
const url = "https://routes.googleapis.com/directions/v2:computeRoutes";

const requestBody = {
  origin: {
    location: {
      latLng: {
        latitude: 37.419734,
        longitude: -122.0827784,
      },
    },
  },
  destination: {
    location: {
      latLng: {
        latitude: 37.41767,
        longitude: -122.079595,
      },
    },
  },
  travelMode: "DRIVE",
  routingPreference: "TRAFFIC_AWARE",
  departureTime: "2025-02-17T17:00:00Z",
  computeAlternativeRoutes: false,
  routeModifiers: {
    avoidTolls: false,
    avoidHighways: false,
    avoidFerries: false,
  },
  languageCode: "en-US",
  units: "IMPERIAL",
};

const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": apiKey,
    "X-Goog-FieldMask":
      "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
  },
  body: JSON.stringify(requestBody),
};

fetch(url, requestOptions)
  .then((response) => response.json())
  .then((data) => {
    // Process the data here
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
