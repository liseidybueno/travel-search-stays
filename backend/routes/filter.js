import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/api/filter", async (req, res) => {
  const { source } = req.query;

  console.log("***source", source);
  // console.log("****listings", JSON.parse(listings));

  // const parsedListings = JSON.parse(listings);
  // console.log("***listings", parsedListings);

  // var filteredListings;

  // if (filterBySource === "bookingcom") {
  //   console.log("****im in booking");
  //   const filtered = {
  //     results: parsedListings.filter((listing) => {
  //       console.log("***listing", listing);
  //       return listing.source === "Booking.com";
  //     }),
  //   };
  //   filteredListings = filtered;
  // }

  // if (filterByRating === "rating9") {
  //   const filtered = {
  //     results: parsedListings.filter((listing) => {
  //       console.log("****rating", listing.rating);
  //       return listing.rating >= 9;
  //     }),
  //   };
  //   filteredListings = filtered;
  // } else if (filterByRating === "rating8") {
  //   console.log("****im in here");
  //   const filtered = {
  //     results: parsedListings.filter((listing) => {
  //       console.log("****rating", listing.rating);
  //       return listing.rating >= 8;
  //     }),
  //   };
  //   filteredListings = filtered;
  // } else if (filterByRating == "rating7") {
  //   const filtered = {
  //     results: parsedListings.filter((listing) => {
  //       console.log("****rating", listing.rating);
  //       return listing.rating >= 7;
  //     }),
  //   };
  //   filteredListings = filtered;
  // } else if (filterByRating == "rating6") {
  //   const filtered = {
  //     results: parsedListings.filter((listing) => {
  //       console.log("****rating", listing.rating);
  //       return listing.rating >= 6;
  //     }),
  //   };
  //   filteredListings = filtered;
  // }

  // console.log("****filtered", filteredListings);
  // res.json({ results: parsedListings });
});

export default router;

// console.log("****filter by", props.filterByRating);
// const listings = props.results.results;
// if (props.filterByRating === "rating9+") {
//   const filtered = {
//     results: listings.filter((listing) => {
//       console.log("*****rating", listing.rating);
//       return listing.rating >= 9;
//     }),
//   };
//   console.log("****filtered", filtered);
//   props.setResults(() => filtered);
// } else if (props.filterByRating === "rating8+") {
//   const filtered = {
//     results: listings.filter((listing) => {
//       console.log("*****rating", listing.rating);
//       return listing.rating >= 8;
//     }),
//   };
//   console.log("****filtered", filtered);
//   props.setResults(() => filtered);
// } else if (props.filterByRating === "rating7+") {
//   const filtered = {
//     results: listings.filter((listing) => {
//       console.log("*****rating", listing.rating);
//       return listing.rating >= 7;
//     }),
//   };
//   console.log("****filtered", filtered);
//   props.setResults(() => filtered);
// } else if (props.filterByRating === "rating6+") {
//   const filtered = {
//     results: listings.filter((listing) => {
//       console.log("*****rating", listing.rating);
//       return listing.rating >= 6;
//     }),
//   };
//   console.log("****filtered", filtered);
//   props.setResults(() => filtered);
// }
