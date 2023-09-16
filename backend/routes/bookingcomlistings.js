const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const router = express.Router();

//countains all listings route
router.get("/api/listings/bookingcom", async (req, res) => {
  const data = req.query;
  const city = data.city;
  const budget = data.budget;

  const url = `https://www.booking.com/searchresults.en-gb.html?ss=${city}&dest_type=city&checkin=${data.checkin}&checkout=${data.checkout}&nflt=price%3DUSD-min-${budget}-1`;
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const hotels = [];

  $("[data-testid=property-card]").each((index, element) => {
    const listing = {
      source: "Booking.com",
      key: `booking+${index}`,
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
});

module.exports = router;