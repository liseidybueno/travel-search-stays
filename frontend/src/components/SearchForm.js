import React from "react";

export default function SearchForm(props) {
  function handleChange(event) {
    props.setSearchData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(
      `http://localhost:8000/bookingResults/?city=${props.searchData.city}&budget=${props.searchData.budget}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => props.setBookingResults(result));
    props.setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="City"
        onChange={handleChange}
        name="city"
        value={props.searchData.city}
      ></input>
      <input
        type="number"
        placeholder="100"
        onChange={handleChange}
        name="budget"
        value={props.searchData.budget}
      ></input>
      <button>Submit</button>
    </form>
  );
}
