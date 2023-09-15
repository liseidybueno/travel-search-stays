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

  res.json({ city: city, budget: budget });
});

app.get("/bookingResults", async (req, res) => {
  const data = req.query;
  const city = data.city.replace(/ /g, "+");
  const budget = data.budget;

  const url = `https://www.booking.com/searchresults.en-gb.html?ss=${city}&dest_type=city&checkin=2023-10-13&checkout=2023-10-14&nflt=price%3DUSD-min-${budget}-1`;
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const hotels = [];

  $("[data-testid=property-card]").each((index, element) => {
    const listing = {
      source: "Booking.com",
      key: index,
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

  res.json({ results: hotels });

  console.log("****city and budget", city, " ", budget);
});
// app.post("/search", async (req, res) => {
//   const data = req.body;

//   const city = data.city.replace(/ /g, "+");
//   const budget = data.budget;

//   console.log("****city", city);

//   //Getting data from booking.com
//   const url = `https://www.booking.com/searchresults.en-gb.html?ss=${city}&dest_type=city&checkin=2023-10-13&checkout=2023-10-14&nflt=price%3DUSD-min-${budget}-1`;

//   const response = await axios.get(url);
//   const $ = cheerio.load(response.data);

//   // console.log("*****response", response.data);

//   const hotels = [];

//   $("[data-testid=property-card]").each((index, element) => {
//     const listing = {
//       source: "Booking.com",
//       name: $(element).find("[data-testid=title]").text(),
//       price: $(element).find("[data-testid=price-and-discounted-price]").text(),
//       url: $(element)
//         .find("[data-testid=property-card-desktop-single-image]")
//         .attr("href"),
//       img: $(element).find("[data-testid=image]").attr("src"),
//       roomType: $(element).find("span.df597226dd").text(),
//       unitConfiguration: $(element)
//         .find("[data-testid=property-card-unit-configuration]")
//         .text(),
//       bedType: $(element).find("div.cb5b4b68a4").find("div.abf093bdfe").text(),
//     };
//     hotels.push(listing);
//   });

//   const airBnBresponse = await axios.get(
//     `http://localhost:8000/airbnb/?city=${city}&budget=${budget}`
//   );

//   console.log("****airbnb", airBnBresponse.data);

//   res.json({ results: hotels });

//   // const airBnBresponse = await axios.get(`https://localhost:8000/airbnb`);

//   // console.log("****airbnb", airBnBresponse.data);
// });

app.get("/airbnb", async (req, res) => {
  const { city, budget } = req.query;

  console.log("*****city, budget", city, " ", budget);

  const options = {
    method: "GET",
    url: "https://airbnb13.p.rapidapi.com/search-location",
    params: {
      location: city,
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
  results.each((index, item) => {
    if (item.price.total < budget) {
      const listing = {
        key: index,
        name: item.name,
        url: item.url,
        img: item.hostThumbnail,
        price: item.price.total,
        roomType: item.type,
      };

      listings.push(listing);
    }
  });
  console.log("***listings", listings);

  res.send(listings);
});

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
