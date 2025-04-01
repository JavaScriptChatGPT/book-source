To use the Google Maps Platform's Routes API in Node.js to get the travel time and distance between two points, you'll need to make an HTTP request to the API endpoint. Below are the steps and an example code snippet to help you get started:

1. **Get an API Key**: Ensure you have an API key from the Google Cloud Console with access to the Google Maps Platform.

2. **Install Axios**: We'll use the `axios` library to make HTTP requests. If you haven't already installed it, you can do so by running:

   ```sh
   npm install axios
   ```

3. **Make the HTTP Request**: Create a Node.js script to make the HTTP request to the Routes API endpoint.

Here's an example script to achieve this:

```javascript
const axios = require("axios");

// Replace with your API key
const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";

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
const destination = "Los Angeles, CA";

// Call the function
getTravelInfo(origin, destination);
```

### Explanation

- **API Endpoint**: The URL for the Directions API endpoint is `https://maps.googleapis.com/maps/api/directions/json`.
- **Parameters**:
  - `origin`: The starting point for the route.
  - `destination`: The endpoint for the route.
  - `key`: Your API key.
- **Axios**: Used to make the HTTP GET request.
- **Response Handling**: The response contains a `status` field and a `routes` array. The first route's first leg contains the `duration` and `distance`.

Replace `'YOUR_GOOGLE_MAPS_API_KEY'` with your actual API key, and update the `origin` and `destination` with the desired locations.

### Running the Script

1. Save the script to a file, e.g., `getTravelInfo.js`.
2. Run the script using Node.js:
   ```sh
   node getTravelInfo.js
   ```

This will print the travel time and distance between the specified origin and destination to the console.
