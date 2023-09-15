import React from "react";
import Booking from "./components/Booking.js";
import SearchForm from "./components/SearchForm.js";

function App() {
  const [searchData, setSearchData] = React.useState({
    city: "Madrid",
    budget: 100,
  });

  const [submitted, setSubmitted] = React.useState(false);

  const [bookingResults, setBookingResults] = React.useState([]);

  return (
    <div>
      <SearchForm
        searchData={searchData}
        setSearchData={setSearchData}
        submitted={submitted}
        setSubmitted={setSubmitted}
        setBookingResults={setBookingResults}
      />
      {submitted && <Booking data={searchData} results={bookingResults} />}
    </div>
  );
}

export default App;

//TO DO
//add css/styling
//add loading image
