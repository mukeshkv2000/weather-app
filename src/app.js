const path = require("path");
const express = require("express");
const geocode = require("./util/geocode");
const forecast = require("./util/forecast");

// using handlebar as templating engine
const hbs = require("hbs");

//initiating the app
const app = express();

/************************VIEW SETTINGS******************************* */

// set the default view to handlebar
app.set("view engine", "hbs");

// declare a static folder for public available data
const publicPath = path.join(__dirname, "..", "public");

app.use(express.static(publicPath));

// set the handlebar view(template) path

//declare the path to render custom view(templates) folder

const partialPath = path.join(__dirname, "../views/partials");

app.set("views", path.join(__dirname, "..") + "/views/view");

//register partials to hbs
hbs.registerPartials(partialPath);

/******************************______**______************************ */

/************************ROUTES SETTINGS******************************* */

app.get("/", (req, res) => {
  res.render("index", {
    title: "weather "
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about "
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "weather "
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address"
    });
  } else {
    geocode(
      req.query.address,
      (err, { latitude, longitude, location } = {}) => {
        if (err) {
          return res.send({ error: err });
        } else {
          console.log(latitude);

          forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
              return res.send({ error: err });
            }

            res.send({
              forecast: forecastData,
              location: location,
              address: req.query.address
            });
          });
        }
      }
    );
  }
});

app.get("/help/*", (req, res) => {
  res.send("help article not found");
});

app.get("*", (req, res) => {
  res.render("404");
});

/******************************______**______************************ */

port = process.env.PORT || 3000; // port choice as per prod || dev
app.listen(port, () => {
  console.log("server started at port :" + port);
});
