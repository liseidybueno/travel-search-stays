import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import formatDate from "../utils.js";

export default function SearchForm(props) {
  function handleChange(event) {
    props.setSearchData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleCheckInDateChange(date) {
    const minCheckoutDate = new Date(date);
    minCheckoutDate.setDate(minCheckoutDate.getDate() + 1);
    props.setSearchData((prevFormData) => {
      return {
        ...prevFormData,
        checkin: date,
        checkinFormatted: formatDate(date),
        checkout: minCheckoutDate,
        checkoutFormatted: formatDate(minCheckoutDate),
      };
    });
  }

  function handleCheckOutDateChange(date) {
    props.setSearchData((prevFormData) => {
      return {
        ...prevFormData,
        checkout: date,
        checkoutFormatted: formatDate(date),
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.setLoading((prevLoading) => {
      return !prevLoading;
    });
    props.setSubmitted((prevSubmitted) => {
      return !prevSubmitted;
    });
    fetch(
      `http://localhost:8000/api/listings/?city=${props.searchData.city}&budget=${props.searchData.budget}&checkin=${props.searchData.checkinFormatted}&checkout=${props.searchData.checkoutFormatted}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        props.setBookingResults(result);
        props.setLoading(false);
      });
  }

  return (
    <div className="search-form">
      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="column">
            <div className="city-div">
              <label htmlFor="city">Enter your destination city:</label>
              <input
                className="search-input"
                type="text"
                placeholder="City"
                onChange={handleChange}
                name="city"
                value={props.searchData.city}
              ></input>
            </div>
          </div>
          <div className="column">
            <div className="budget-div">
              <label htmlFor="budget">What's your budget? (USD):</label>
              <input
                className="search-input"
                type="number"
                placeholder="100"
                onChange={handleChange}
                name="budget"
                value={props.searchData.budget}
              ></input>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div className="checkin-div">
              <label htmlFor="checkin">Check-in date:</label>
              <DatePicker
                className="date-input"
                selected={props.searchData.checkin}
                onChange={(date) => handleCheckInDateChange(date)}
                minDate={new Date()}
                selectsStart
                startDate={props.searchData.checkin}
                endDate={props.searchData.checkout}
              />
            </div>
          </div>
          <div className="column">
            <div className="checkout-div">
              <label htmlFor="checkin">Check-out date:</label>
              <DatePicker
                className="date-input"
                selected={props.searchData.checkout}
                onChange={(date) => handleCheckOutDateChange(date)}
                selectsEnd
                startDate={props.searchData.checkin}
                endDate={props.searchData.checkout}
                minDate={props.searchData.checkout}
              />
            </div>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
