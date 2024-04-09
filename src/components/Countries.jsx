import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/common/countries/`, {
          params: {
            limit: 5,
          },
        });
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
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
            {countries.map((country) => (
              <div
                key={country.id}
                className="bg-white border shadow-sm rounded-xl p-4 "
              >
                <p className="text-center"> {country.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Countries;
