import React from "react";
import Booking from "./components/Results.js";
import SearchForm from "./components/SearchForm.js";
import formatDate from "./utils.js";
import { DotWave } from "@uiball/loaders";

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
    numAdults: 1,
    numChildren: 0,
    currency: "USD",
  });

  const [submitted, setSubmitted] = React.useState(false);

  const [bookingResults, setBookingResults] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

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
          loading={loading}
          setLoading={setLoading}
        />
        {loading && (
          <div className="loader">
            <DotWave size={47} speed={1} color="white" />
          </div>
        )}
        {!loading && submitted && (
          <Booking data={searchData} results={bookingResults} />
        )}
      </div>
    </main>
  );
}

export default App;
