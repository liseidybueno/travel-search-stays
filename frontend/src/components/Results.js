import React from "react";
import "../App.css";
import SortAndFilter from "./SortAndFilter";

export default function Results(props) {
  const listings = props.results.results;

  const [sort, setSort] = React.useState("");

  const [filterByRating, setFilterByRating] = React.useState("");

  const [filterBySource, setFilterBySource] = React.useState("");

  // function sortByPriceLowToHigh(event) {
  //   event.preventDefault();
  //   const sortedListings = listings.sort((a, b) => {
  //     const priceA = a.price.split("$").pop();
  //     const priceB = b.price.split("$").pop();
  //     return priceA - priceB;
  //   });
  //   console.log("****sorted", sortedListings);
  //   props.setResults(() => [sortedListings]);
  // }

  const getRatingText = (rating) => {
    if (rating >= 9) {
      return (
        <div className="rating-div">
          <span class="rating-text">Amazing</span>{" "}
          <span class="rating">{rating}</span>
        </div>
      );
    } else if (rating >= 8.0) {
      return (
        <div className="rating-div">
          <span class="rating-text">Great</span>{" "}
          <span class="rating">{rating}</span>
        </div>
      );
    } else if (rating >= 8) {
      return (
        <div className="rating-div">
          <span class="rating-text">Good</span>{" "}
          <span class="rating">{rating}</span>
        </div>
      );
    } else if (rating >= 7) {
      return (
        <div className="rating-div">
          <span class="rating-text">Decent</span>{" "}
          <span class="rating">{rating}</span>
        </div>
      );
    } else {
      return (
        <div className="rating-div">
          <span class="rating">{rating}</span>
        </div>
      );
    }
  };

  return (
    <div>
      <h1 className="results-h1">Browse Results</h1>
      <SortAndFilter
        sort={sort}
        setSort={setSort}
        filterByRating={filterByRating}
        setFilterByRating={setFilterByRating}
        filterBySource={filterBySource}
        setFilterBySource={setFilterBySource}
        results={props.results}
        setResults={props.setResults}
        submitted={props.submitted}
      />
      <div className="results">
        {listings &&
          listings.map((listing) => (
            <div className="listing" key={listing.key}>
              <div className="listing-name-rating">
                <h4 className="listing-name">{listing.name}</h4>
                {listing.rating ? getRatingText(listing.rating) : ""}
              </div>

              <div className="listing-row">
                <img
                  className="listing-image"
                  src={listing.img}
                  alt={listing.name}
                />
                <div className="listing-info">
                  <p className="listing-source">Source: {listing.source}</p>
                  <p className="listing-price">
                    Price per night: {listing.currency} ${listing.price}
                  </p>
                  <p className="listing-roomType">{listing.roomType}</p>
                  <span className="listing-unitConfiguration">
                    {listing.unitConfiguration && (
                      <p>{listing.unitConfiguration}</p>
                    )}
                  </span>
                  <p className="listing-bedType">{listing.bedType}</p>
                  <a className="listing-url" href={listing.url} target="_blank">
                    View listing
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
