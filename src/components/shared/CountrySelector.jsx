import { useState, useEffect } from "react";
import axios from "../../app/api.js";

const CountrySelector = ({ onSelect }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`/common/countries/?limit=50`);
        setCountries(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries: ", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="">
      {loading ? (
        <p>Loading Countries...</p>
      ) : (
        <select
          onChange={(e) => onSelect(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-3 mt-1 w-full"
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CountrySelector;
