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
            limit: 8,
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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {countries.map((country) => (
              <a
                key={country.id}
                className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                <div className="p-4 md:p-5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {/* You can replace this with your country image */}
                      <img
                        className="size-[38px] rounded-full"
                        src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                        alt="Image Description"
                      />
                      <div className="ms-3">
                        <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                          {country.name}
                        </h3>
                      </div>
                    </div>
                    <div className="ps-3">
                      <svg
                        className="flex-shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Countries;
