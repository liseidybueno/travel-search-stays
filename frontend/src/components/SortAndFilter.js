import React from "react";
import "../App.css";

export default function SortAndFilter(props) {
  function handleChangeSort(event) {
    props.setSort(event.target.value);
  }

  function sortListings(event) {
    event.preventDefault();
    const listings = props.results.results;

    if (props.sort === "Price (Low to High)") {
      const sortedListings = {
        results: listings.sort((a, b) => (a.price > b.price ? 1 : -1)),
      };

      props.setResults(() => sortedListings);
    } else if (props.sort === "Price (High to Low)") {
      const sortedListings = {
        results: listings.sort((a, b) => (a.price < b.price ? 1 : -1)),
      };
      props.setResults(() => sortedListings);
    } else if (props.sort === "Rating") {
      const sortedListings = {
        results: listings.sort((a, b) => (a.rating < b.rating ? 1 : -1)),
      };
      props.setResults(() => sortedListings);
    }
  }

  function filterListings(checked, filterBySource) {
    let filteredResults = [];
    const formattedSource =
      filterBySource === "bookingcom" ? "Booking.com" : "Airbnb";

    if (!checked) {
      const tempResults = props.filteredResults;
      filteredResults = tempResults.filter(
        (result) => result.source !== formattedSource
      );
      props.setFilteredResults(() => filteredResults);
    } else if (checked) {
      const tempResults = props.results.results;
      tempResults.forEach((result) => {
        if (result.source === formattedSource && checked) {
          filteredResults.push(result);
        }
      });
      props.setFilteredResults((prevFiltered) => [
        ...prevFiltered,
        ...filteredResults,
      ]);
    }
  }

  function handleFilterBySourceChange(event) {
    const { name, checked } = event.target;
    props.setFilteredBySource({
      ...props.filteredBySource,
      [name]: checked,
    });
    filterListings(checked, name);
  }

  return (
    <div className="sort-and-filters">
      <form className="sort-form">
        <div className="sortBy-div">
          <select
            className="select-input"
            value={props.sort}
            onChange={handleChangeSort}
            name="sortBy"
          >
            <option value="" disabled={true}>
              Sort by:
            </option>
            <option key="lowToHigh">Price (Low to High)</option>
            <option key="highToLow">Price (High to Low)</option>
            <option key="rating">Rating</option>
          </select>
          <button onClick={sortListings} className="sort-button">
            Sort
          </button>
        </div>
      </form>
      <div className="filter-div">
        {/* <h4 className="filterby-text">Filter by:</h4>
        <div className="filter-row">
          <fieldset className="rating-fieldset">
            <legend className="filter-legend">Rating:</legend>
            <input
              type="radio"
              id="rating9+"
              name="filterByRating"
              value="rating9+"
              checked={props.filterByRating === "rating9+"}
              onChange={handleFilterByRatingChange}
            />
            <label htmlFor="rating9+">Amazing: 9+</label>
            <br />

            <input
              type="radio"
              id="rating8+"
              name="filterByRating"
              value="rating8+"
              checked={props.filterByRating === "rating8+"}
              onChange={handleFilterByRatingChange}
            />
            <label htmlFor="rating8+">Great: 8+</label>
            <br />

            <input
              type="radio"
              id="7+"
              name="filterByRating"
              value="rating7+"
              checked={props.filterByRating === "rating7+"}
              onChange={handleFilterByRatingChange}
            />
            <label htmlFor="rating7+">Good: 7+</label>
            <br />
            <input
              type="radio"
              id="6+"
              name="filterByRating"
              value="rating6+"
              checked={props.filterByRating === "rating6+"}
              onChange={handleFilterByRatingChange}
            />
            <label htmlFor="rating7+">Decent: 6+</label>
            <br />
            <button
              onClick={clearRatingFilter}
              className="clear-filters-button"
            >
              Clear Filters
            </button>
          </fieldset> */}
        <fieldset className="source-fieldset">
          <legend className="filter-legend">Source:</legend>
          <input
            type="checkbox"
            id="bookingcom"
            checked={props.filteredBySource.bookingcom}
            onChange={handleFilterBySourceChange}
            name="bookingcom"
          />
          <label htmlFor="bookingcom">Booking.com</label>
          <br />
          <input
            type="checkbox"
            id="airbnb"
            checked={props.filteredBySource.airbnb}
            onChange={handleFilterBySourceChange}
            name="airbnb"
          />
          <label htmlFor="airbnb">Airbnb</label>
        </fieldset>
      </div>
    </div>
    // </div>
  );
}
