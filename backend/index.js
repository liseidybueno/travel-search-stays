import express from "express";
import cors from "cors";
import listings from "./routes/listings.js";
import bookingcomListings from "./routes/bookingcomlistings.js";
import airbnbListings from "./routes/airbnblistings.js";
import filter from "./routes/filter.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(listings);
app.use(bookingcomListings);
app.use(airbnbListings);
app.use(filter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//TO DO:
//refactor code to make neater and more readable
//add filter algorithm to filter by room type (apartment/house, hotel, hostel)
//add filter algorithm to filter by rating
//add filter to filter by source
