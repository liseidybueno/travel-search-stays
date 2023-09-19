import express from "express";
import cors from "cors";
import listings from "./routes/listings.js";
import bookingcomListings from "./routes/bookingcomlistings.js";
import airbnbListings from "./routes/airbnblistings.js";
import "dotenv/config.js";

const app = express();

app.use(cors());
app.use(listings);
app.use(bookingcomListings);
app.use(airbnbListings);

console.log("**env", process.env.NODE_ENV);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
