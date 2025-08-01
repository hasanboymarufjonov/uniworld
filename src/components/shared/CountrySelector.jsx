import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "../../app/api.js";

const CountrySelector = ({ onSelect }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`/common/countries/?limit=50`);
        setCountries(response.data.results);
      } catch (error) {
        console.error("Error fetching countries: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="">
      {loading ? (
        <p>{t("loading_countries")}</p>
      ) : (
        <select
          onChange={(e) => onSelect(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-3 mt-1 w-full"
        >
          <option value="">{t("select_country")}</option>
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
