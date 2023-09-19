import React from "react";
import "../App.css";
import SortAndFilter from "./SortAndFilter";

export default function Results(props) {
  const listings = props.results.results;

  const [sort, setSort] = React.useState("");

  const [filteredBySource, setFilteredBySource] = React.useState({
    bookingcom: false,
    airbnb: false,
  });

  const [filteredResults, setFilteredResults] = React.useState([]);

  const isFilteredBySource =
    filteredBySource.bookingcom || filteredBySource.airbnb;

  const getRatingText = (rating) => {
    if (rating >= 9) {
      return (
        <div className="rating-div">
          <span className="rating-text">Amazing</span>{" "}
          <span className="rating">{Math.round(rating * 10) / 10}</span>
        </div>
      );
    } else if (rating >= 8.0) {
      return (
        <div className="rating-div">
          <span className="rating-text">Great</span>{" "}
          <span className="rating">{Math.round(rating * 10) / 10}</span>
        </div>
      );
    } else if (rating >= 8) {
      return (
        <div className="rating-div">
          <span className="rating-text">Good</span>{" "}
          <span className="rating">{Math.round(rating * 10) / 10}</span>
        </div>
      );
    } else if (rating >= 7) {
      return (
        <div className="rating-div">
          <span className="rating-text">Decent</span>{" "}
          <span className="rating">{Math.round(rating * 10) / 10}</span>
        </div>
      );
    } else {
      return (
        <div className="rating-div">
          <span className="rating">{Math.round(rating * 10) / 10}</span>
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
        results={props.results}
        setResults={props.setResults}
        submitted={props.submitted}
        setFilteredBySource={setFilteredBySource}
        filteredBySource={filteredBySource}
        filteredResults={filteredResults}
        setFilteredResults={setFilteredResults}
        searchData={props.searchData}
      />
      <div className="results">
        {!isFilteredBySource &&
          listings &&
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

      <div className="results">
        {isFilteredBySource &&
          filteredResults &&
          filteredResults.map((listing) => (
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
