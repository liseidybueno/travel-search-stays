import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/api/listings/airbnb", async (req, res) => {
  const { city, budget, checkin, checkout, numadults, numchildren, currency } =
    req.query;

  const options = {
    method: "GET",
    url: "https://airbnb13.p.rapidapi.com/search-location",
    params: {
      location: city,
      checkin: checkin,
      checkout: checkout,
      adults: numadults,
      children: numchildren,
      infants: "0",
      pets: "0",
      page: "1",
      currency: currency,
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST,
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
        rating: item.rating * 2,
      };

      listings.push(listing);
    }
  });

  res.json({ results: listings });
});

export default router;
