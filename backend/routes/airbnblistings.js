const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/api/listings/airbnb", async (req, res) => {
  const { city, budget, checkin, checkout } = req.query;

  console.log("***checkin", checkin);
  console.log("****checkout", checkout);
  console.log("****city", city);

  const options = {
    method: "GET",
    url: "https://airbnb13.p.rapidapi.com/search-location",
    params: {
      location: city,
      checkin: checkin,
      checkout: checkout,
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

  results.forEach((item, index) => {
    if (item.price.rate < budget) {
      const listing = {
        key: `airbnb+${index}`,
        source: "Airbnb",
        name: item.name,
        url: item.url,
        img: item.images[0],
        price: item.price.rate,
        roomType: item.type,
      };

      listings.push(listing);
    }
  });

  res.json({ results: listings });
});

module.exports = router;
