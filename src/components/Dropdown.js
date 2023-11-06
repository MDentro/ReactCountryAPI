import React from "react";

const Dropdown = ({ setKeyword }) => {
  function filterCountries(region) {
    setKeyword(region);
  }

  return (
    <div>
      <select
        name="regions"
        id="regions"
        onChange={(e) => filterCountries(e.target.value)}
      >
        <option value="All">Filter by region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
};

export default Dropdown;
