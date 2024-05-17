import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../config.js";
import { Link } from "react-router-dom";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const lang = localStorage.getItem("i18nextLng");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/common/countries/`, {
          headers: {
            "Accept-Language": lang,
          },

          params: {
            is_top: true,
            limit: 5,
          },
        });
        // const shuffledCountries = response.data.results.sort(
        //   () => Math.random() - 0.5
        // );
        // const randomCountries = shuffledCountries.slice(0, 5);
        // setCountries(randomCountries);
        setCountries(response.data.results);
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
            {countries.map((country, index) => (
              <Link
                key={index}
                to={`/universities?country=${country.id}&specialty=&qualification_level=`}
                className={`bg-white border shadow-sm rounded-xl p-4 ${
                  index === 2 ? "col-span-2 lg:col-span-1" : "col-span-1"
                }`}
              >
                <p className="text-center">{country.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Countries;
