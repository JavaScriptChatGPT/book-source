To convert the provided cURL command to JavaScript, you can use the `fetch` API. Here is how you can do it:

```javascript
const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
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
  departureTime: "2023-10-15T15:01:23.045123456Z",
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
```

### Explanation:

1. **API Key:** Ensure you replace `'YOUR_API_KEY'` with your actual Google Maps API key.
2. **URL:** The URL for the Google Maps Directions API endpoint remains the same.
3. **Request Body:** The request body is defined as a JavaScript object and then converted to a JSON string using `JSON.stringify()`.
4. **Request Options:**
   - `method: 'POST'` indicates that we are making a POST request.
   - `headers` includes the content type, API key, and the field mask.
   - `body` is the JSON string of the request body.
5. **fetch:** This makes the HTTP request and returns a promise.
   - `.then(response => response.json())` processes the response as JSON.
   - `.then(data => { ... })` processes the returned data.
   - `.catch(error => { ... })` handles any errors that occur during the fetch.

This code will send a POST request to the Google Maps API and log the response data to the console. Adjust the processing logic within the `.then(data => { ... })` block to fit the needs of your application.
