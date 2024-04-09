import React, { useState, useEffect } from "react";
import BASE_URL from "../../config";

const CountryFilter = ({ selectedCountry, handleCountryChange }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/common/countries/`);
        const data = await response.json();
        setCountries(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries: ", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="mb-4 w-[100px] ">
      <h2 className="text-xl font-semibold mb-2">Filter by Country:</h2>
      <div className="flex flex-wrap">
        <label className="inline-flex items-center mb-2 mr-4">
          <input
            type="radio"
            value=""
            checked={selectedCountry === ""}
            onChange={() => handleCountryChange("")}
            className="form-radio h-4 w-4 text-primary"
          />
          <span className="ml-2">All</span>
        </label>
        {countries.map((country) => (
          <label
            key={country.id}
            className="inline-flex items-center mb-2 mr-4"
            style={{ whiteSpace: "nowrap" }}
          >
            <input
              type="radio"
              value={country.id}
              checked={selectedCountry === country.id}
              onChange={() => handleCountryChange(country.id)}
              className="form-radio h-4 w-4 text-primary"
            />
            <span className="ml-2">{country.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CountryFilter;