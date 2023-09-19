import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import formatDate from "../utils.js";

export default function SearchForm(props) {
  const environment = process.env.NODE_ENV;
  const localApiUrl = process.env.REACT_APP_LOCAL_API_URL;
  const productionApiUrl = process.env.REACT_APP_PRODUCTION_API_URL;

  const url = environment === "development" ? localApiUrl : productionApiUrl;

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

  console.log("***url", url);

  function handleSubmit(event) {
    event.preventDefault();
    props.setLoading((prevLoading) => {
      return !prevLoading;
    });
    props.setSubmitted(() => {
      return true;
    });
    fetch(
      `${url}/api/listings/?city=${props.searchData.city}&budget=${props.searchData.budget}` +
        `&checkin=${props.searchData.checkinFormatted}&checkout=${props.searchData.checkoutFormatted}` +
        `&numAdults=${props.searchData.numAdults}&numChildren=${props.searchData.numChildren}&currency=${props.searchData.currency}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        props.setResults(result);
        props.setLoading(false);
      });
  }

  const allCurrencies = [
    "USD",
    "AUD",
    "BRL",
    "BGN",
    "CAD",
    "CLP",
    "CNY",
    "COP",
    "CRC",
    "CZK",
    "DKK",
    "AED",
    "EUR",
    "HKD",
    "HUF",
    "INR",
    "IDR",
    "ILS",
    "JPY",
    "MYR",
    "MXN",
    "TWD",
    "NZD",
    "NOK",
    "PLN",
    "GBP",
    "RON",
    "SAR",
    "SGD",
    "ZAR",
    "SEK",
    "CHF",
    "THB",
    "TRY",
  ];

  function Currencies() {
    return (
      <select
        className="search-input"
        value={props.searchData.currency}
        onChange={handleChange}
        name="currency"
      >
        {allCurrencies.map((currency) => {
          return <option key={currency}>{currency}</option>;
        })}
      </select>
    );
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
          <div className="column">
            <div className="budget-div">
              <label htmlFor="budget">Select your currency:</label>
              <Currencies />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div className="numpeople-div">
              <label htmlFor="num-people">How many adults:</label>
              <input
                className="search-input"
                type="number"
                onChange={handleChange}
                name="numAdults"
                value={props.searchData.numAdults}
              ></input>
            </div>
          </div>
          <div className="column">
            <div className="numpeople-div">
              <label htmlFor="num-people">How many children?</label>
              <input
                className="search-input"
                type="number"
                onChange={handleChange}
                name="numChildren"
                value={props.searchData.numChildren}
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
        <button className="submit-button">Submit</button>
      </form>
    </div>
  );
}
