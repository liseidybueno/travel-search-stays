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
  const currency = data.currency;

  const environment = process.env.NODE_ENV;
  const localApiUrl = process.env.LOCAL_API_URL;
  const productionApiUrl = process.env.LOCAL_API_URL;

  const url = environment === "development" ? localApiUrl : productionApiUrl;
  //Booking.com Results
  const bookingsURL =
    `${url}/api/listings/bookingcom/?city=${city}&budget=${budget}` +
    `&checkin=${checkin}&checkout=${checkout}&numadults=${numAdults}&numchildren=${numChildren}&currency=${currency}`;
  const bookingsResponse = await axios.get(bookingsURL);
  const bookingsListings = bookingsResponse.data.results;

  //Airbnb Results
  const airbnbURL =
    `${url}/api/listings/airbnb/?city=${city}&budget=${budget}` +
    `&checkin=${checkin}&checkout=${checkout}&numadults=${numAdults}&numchildren=${numChildren}&currency=${currency}`;
  const airbnbResponse = await axios.get(airbnbURL);
  const airbnbListings = airbnbResponse.data.results;

  const allListings = [...bookingsListings, ...airbnbListings];

  const shuffle = ([...array]) => {
    let i = 0;
    let j = 0;
    let temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  res.json({ results: shuffle(allListings) });
});

export default router;
