import React from "react";
import "../App.css";

export default function Booking(props) {
  const hotels = props.results.results;

  return (
    <div className="App">
      <h1>Booking.com Results</h1>
      {hotels &&
        hotels.map((hotel) => (
          <div key={hotel.key}>
            <h4>{hotel.name}</h4>
            <img src={hotel.img} alt={hotel.name} />
            <p>{hotel.price}</p>
            <p>
              <b>{hotel.roomType}</b>
            </p>
            {hotel.unitConfiguration && <p>{hotel.unitConfiguration}</p>}
            <p>{hotel.bedType}</p>
            <a href={hotel.url}>View Hotel</a>
          </div>
        ))}
    </div>
  );
}
