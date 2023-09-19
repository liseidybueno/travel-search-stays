import React from "react";
import "../App.css";

export default function SortAndFilter(props) {
  function handleChangeSort(event) {
    props.setSort(event.target.value);
  }

  function sortListings(event) {
    event.preventDefault();
    const listings = props.results.results;

    if (props.filteredBySource.bookingcom || props.filteredBySource.airbnb) {
      const listings = props.filteredResults;
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
        props.setFilteredResults(() => sortedListings.results);
      }
    }

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

  function filterListings(checked, filterBy) {
    let filteredResults = [];

    const formattedFilter =
      filterBy === "bookingcom" ? "Booking.com" : "Airbnb";

    if (!checked) {
      const tempResults = props.filteredResults;
      filteredResults = tempResults.filter(
        (result) => result.source !== formattedFilter
      );
      props.setFilteredResults(() => filteredResults);
    } else if (checked) {
      const tempResults = props.results.results;
      tempResults.forEach((result) => {
        if (result.source === formattedFilter && checked) {
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
        <h4 className="filterby-text">Filter by:</h4>
        <div className="filter-row">
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
    </div>
  );
}
