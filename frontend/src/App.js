import React from "react";
import Booking from "./components/Booking.js";
import SearchForm from "./components/SearchForm.js";
import formatDate from "./utils.js";

function App() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [searchData, setSearchData] = React.useState({
    city: "Madrid",
    budget: 100,
    checkin: today,
    checkinFormatted: formatDate(today),
    checkout: tomorrow,
    checkoutFormatted: formatDate(tomorrow),
  });

  console.log("***search data", searchData);

  const [submitted, setSubmitted] = React.useState(false);

  const [bookingResults, setBookingResults] = React.useState([]);

  return (
    <main>
      <div className="main-wrapper">
        <div className="main-text">
          <h1>Search all accommodations</h1>
          <p>
            Enter your location, budget, and dates and get accommodation options
            from Booking.com and Airbnb!
          </p>
        </div>

        <SearchForm
          searchData={searchData}
          setSearchData={setSearchData}
          submitted={submitted}
          setSubmitted={setSubmitted}
          setBookingResults={setBookingResults}
        />
        {submitted && <Booking data={searchData} results={bookingResults} />}
      </div>
    </main>
  );
}

export default App;

//TO DO
//add css/styling
//add loading image
