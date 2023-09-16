const express = require("express");
const axios = require("axios");
const cors = require("cors");
// const bodyParser = require("body-parser");
const listings = require("./routes/listings.js");
const bookingcomListings = require("./routes/bookingcomlistings.js");
const airbnbListings = require("./routes/airbnblistings.js");

const app = express();

app.use(cors());
app.use(listings);
app.use(bookingcomListings);
app.use(airbnbListings);

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// app.post("/search", async (req, res) => {
//   const data = req.body;
//   const city = data.city.replace(/ /g, "+");
//   const budget = data.budget;

//   res.json({ city: city, budget: budget });
// });

//TO DO: add airbnb listings to booking lists
//add sort by price algorithm
//add rating, and add sort by rating algorithm
//add expedia listings to booking lists
//refactor code to make neater and more readable
//add filter algorithm to filter by room type (apartment/house, hotel, hostel)
//add filter algorithm to filter by rating
//add filter to filter by source

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
