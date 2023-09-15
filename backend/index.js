const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const bodyParser = require("body-parser");
// const router = express.Router();

const app = express();

app.use(cors());
app.use(express.json());

//Define routes and middle ware

const PORT = process.env.PORT || 8000;

app.get("/message", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/search", async (req, res) => {
  const data = req.body;

  const city = data.city.replace(/ /g, "+");
  const budget = data.budget;

  //Getting data from booking.com
  const url = `https://www.booking.com/searchresults.en-gb.html?ss=${city}&dest_type=city&checkin=2023-10-13&checkout=2023-10-14&nflt=price%3DUSD-min-${budget}-1`;

  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const hotels = [];

  $("[data-testid=property-card]").each((element) => {
    const listing = {
      source: "Booking.com",
      name: $(element).find("[data-testid=title]").text(),
      price: $(element).find("[data-testid=price-and-discounted-price]").text(),
      url: $(element)
        .find("[data-testid=property-card-desktop-single-image]")
        .attr("href"),
      img: $(element).find("[data-testid=image]").attr("src"),
      roomType: $(element).find("span.df597226dd").text(),
      unitConfiguration: $(element)
        .find("[data-testid=property-card-unit-configuration]")
        .text(),
      bedType: $(element).find("div.cb5b4b68a4").find("div.abf093bdfe").text(),
    };
    hotels.push(listing);
  });
});

app.get("/airbnb", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://airbnb13.p.rapidapi.com/search-location",
    params: {
      location: "Paris",
      checkin: "2023-09-16",
      checkout: "2023-09-17",
      adults: "1",
      children: "0",
      infants: "0",
      pets: "0",
      page: "1",
      currency: "USD",
    },
    headers: {
      "X-RapidAPI-Key": "47bc00c936msh21813d19de3c7e0p12c834jsn644689ad087b",
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
    },
  };

  const listings = [];

  const response = await axios.request(options);
  const results = response.data.results;
  results.forEach((item) => {
    const listing = {
      name: item.name,
      url: item.url,
      img: item.hostThumbnail,
      roomType: item.type,
    };

    listings.push(listing);
  });
  console.log("***listings", listings);

  res.send(listings);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
