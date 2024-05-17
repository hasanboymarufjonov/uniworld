import React, { useState, useEffect } from "react";
import BASE_URL from "../../config";

const CountryFilter = ({ selectedCountry, handleCountryChange }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const lang = localStorage.getItem("i18nextLng");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/common/countries/`, {
          headers: {
            "Accept-Language": lang,
          },
          params: {
            limit: 40,
          },
        });
        const data = await response.json();
        setCountries(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries: ", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (event) => {
    handleCountryChange(event.target.value);
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Country:</h2>
      <div className="flex flex-wrap">
        {/* Render select element on mobile */}
        <select
          value={selectedCountry}
          onChange={handleChange}
          className="p-2 w-full mb-2  md:hidden rounded-lg"
        >
          <option value="">All</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
        {/* Render radio buttons on larger screens */}
        <div className="hidden md:flex flex-wrap">
          <label className="inline-flex items-center mb-2 mr-4 w-full">
            <input
              type="radio"
              value=""
              checked={selectedCountry === ""}
              onChange={() => handleCountryChange("")}
              className="form-radio h-4 w-4  text-primary"
            />
            <span className="ml-2">All</span>
          </label>
          {countries.map((country) => (
            <label
              key={country.id}
              className="inline-flex items-center mb-2 mr-4 w-full"
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
    </div>
  );
};

export default CountryFilter;
