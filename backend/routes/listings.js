import express from "express";
import axios from "axios";
const router = express.Router();

//countains all listings route
router.get("/api/listings", async (req, res) => {
  //Query data
  const data = req.query;
  const city = data.city.replace(/ /g, "+");
  const budget = data.budget;
  const checkin = data.checkin;
  const checkout = data.checkout;
  const numAdults = data.numAdults;
  const numChildren = data.numChildren;

  //Booking.com Results
  const bookingsURL =
    `http://localhost:8000/api/listings/bookingcom/?city=${city}&budget=${budget}` +
    `&checkin=${checkin}&checkout=${checkout}&numadults=${numAdults}$numchildren=${numChildren}`;
  const bookingsResponse = await axios.get(bookingsURL);
  const bookingsListings = bookingsResponse.data.results;

  //Airbnb Results
  // const airbnbURL = `http://localhost:8000/api/listings/airbnb/?city=${city}&budget=${budget}&checkin=${checkin}&checkout=${checkout}`;
  // const airbnbResponse = await axios.get(airbnbURL);
  // const airbnbListings = airbnbResponse.data.results;

  // const allListings = [...bookingsListings, ...airbnbListings];

  res.json({ results: bookingsListings });
});

export default router;
