const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZnJvbnRhbmR5d2ViIiwiYSI6ImNrNTVoemQzcDA5ZWozbHBjZ3QwM25waWwifQ.rrCRu-p-kfiPlVTxhCvh0g";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unabled to connect to location services!");
    } else if (body.features.length === 0) {
      callback("Unable to find geolocation");
    } else {
      const data = body.features[0];
      callback(undefined, {
        latitude: data.center[1],
        longitude: data.center[0],
        location: data.place_name
      });
    }
  });
};

module.exports = geocode;
