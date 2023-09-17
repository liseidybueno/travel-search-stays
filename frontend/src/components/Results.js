import React from "react";
import "../App.css";

export default function Booking(props) {
  const listings = props.results.results;

  return (
    <div>
      <h1 className="results-h1">Browse Results</h1>
      <div className="results">
        {listings &&
          listings.map((listing) => (
            <div className="listing" key={listing.key}>
              <h4 className="listing-name">{listing.name}</h4>
              <div className="listing-row">
                <img
                  className="listing-image"
                  src={listing.img}
                  alt={listing.name}
                />
                <div className="listing-info">
                  <p className="listing-source">Source: {listing.source}</p>
                  <p className="listing-price">
                    Price per night: {listing.price}
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
