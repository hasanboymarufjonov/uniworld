import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../../app/api.js";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get(`/common/countries/`, {
          params: {
            is_top: true,
            limit: 5,
          },
        });
        setCountries(response.data.results);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="bg-primary">
      {loading ? (
        <p className="text-center py-4">{t("loading")}</p>
      ) : (
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 py-2 mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
            {countries.map((country, index) => (
              <Link
                key={index}
                to={`/universities?country=${country.id}&specialty=&qualification_level=`}
                className={`bg-white border shadow-sm rounded-xl p-4 text-center transition-all hover:shadow-md hover:bg-gray-50 ${
                  index === 2 ? "col-span-2 lg:col-span-1" : "col-span-1"
                }`}
              >
                <p>{country.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Countries;
