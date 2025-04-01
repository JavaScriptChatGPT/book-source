# Notes

I used the following prompt to ChatGPT with the GPT4-o model:

"I'm coding in JavaScript and trying to build an application that makes a request to the Google Maps API and pull down the amount of time it'll take to get from one location to the other. This is the cURL code that would accomplish that goal. Help me convert this to something I can use in JavaScript:

curl -X POST -d '{
"origin":{
"location":{
"latLng":{
"latitude": 37.419734,
"longitude": -122.0827784
}
}
},
"destination":{
"location":{
"latLng":{
"latitude": 37.417670,
"longitude": -122.079595
}
}
},
"travelMode": "DRIVE",
"routingPreference": "TRAFFIC_AWARE",
"departureTime": "2023-10-15T15:01:23.045123456Z",
"computeAlternativeRoutes": false,
"routeModifiers": {
"avoidTolls": false,
"avoidHighways": false,
"avoidFerries": false
},
"languageCode": "en-US",
"units": "IMPERIAL"
}' \
-H 'Content-Type: application/json' -H 'X-Goog-Api-Key: YOUR_API_KEY' \
-H 'X-Goog-FieldMask: routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline' \
‘https://routes.googleapis.com/directions/v2:computeRoutes'"

The response is in the file `chatgpt-response.md` The code used is in the file `firstResponse.js`

I asked it a second question on getting routes with the following prompt:

"I need to use the Google Maps Platform's Routes API gives me to pull down information pertaining to how much time it'll take to get from one destination to the other, as well as how much distance is between the two points. How can I make an HTTP request in Node.js to get the information I'm looking for?"

The second response is stored in `chatgpt-response2.md`, the code for the second response is saved in `index.js`
