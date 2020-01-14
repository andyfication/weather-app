const request = require("request");

function forecast(latitude, longitude, callback) {
  const url =
    "https://api.darksky.net/forecast/f6a5efe5794f7a2a8f77b00259b07608/" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "?units=si&lang=en";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unale to connect to weather service");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      const data = body;
      callback(undefined, {
        summary: data.daily.data[0].summary,
        temperature: data.currently.temperature,
        precipitations: data.currently.precipProbability
      });
    }
  });
}

module.exports = forecast;
