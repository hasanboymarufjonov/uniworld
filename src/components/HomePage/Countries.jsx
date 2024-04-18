import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../config.js";
import { Link } from "react-router-dom";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/common/countries/`);
        const shuffledCountries = response.data.results.sort(
          () => Math.random() - 0.5
        );
        const randomCountries = shuffledCountries.slice(0, 5);
        setCountries(randomCountries);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="bg-primary">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8  py-2 mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-1">
            {countries.map((country) => (
              <Link
                key={country.id}
                to={`/universities?country=${country.id}&specialty=&qualification_level=`}
                className="bg-white border shadow-sm rounded-xl p-4 "
              >
                <p className="text-center"> {country.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Countries;
