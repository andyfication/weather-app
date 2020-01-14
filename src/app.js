const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT;

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");
const partialsPath = path.join(__dirname, "../views/partials");

// Setting up the templating engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set the directory to serve static files
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("home", {
    title: "Weather App",
    name: "Andrea"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Andrea"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Andrea"
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrea",
    errorMessage: "Article Not Found"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error
          });
        }
        res.send({
          forecast: forecastData.summary,
          temperature: forecastData.temperature,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrea",
    errorMessage: "Page Not Found"
  });
});

app.listen(port || 3000, () => {
  console.log("App is running");
});
