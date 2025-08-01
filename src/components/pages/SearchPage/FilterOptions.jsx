import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import api from "../../../app/api";

const FilterOptions = ({ paramName, labelText, onChange, selectedOption }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/universities/filters/`);
        setOptions(response.data[paramName]);
      } catch (error) {
        console.error(`Error fetching ${paramName}: `, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paramName]);

  // This function now creates a consistent key from the API data
  // e.g., 'bachelor' becomes 'qualification_level_bachelor'
  const formatQualificationLevel = (level) => {
    const key = `qualification_level_${level}`;
    const translation = t(key);
    // If a translation isn't found, it returns the original level, capitalized.
    return translation === key
      ? level.charAt(0).toUpperCase() + level.slice(1)
      : translation;
  };

  const handleOptionChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">{labelText}</h2>
      {loading ? (
        <p>{t("loading")}</p>
      ) : (
        <div className="flex flex-wrap">
          {/* Mobile select dropdown */}
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="p-2 w-full mb-2 md:hidden rounded-lg"
          >
            <option value="">{t("filter_options_all")}</option>
            {options.map((option) => (
              <option key={option.id || option} value={option.id || option}>
                {formatQualificationLevel(option.name || option)}
              </option>
            ))}
          </select>
          {/* Desktop radio buttons */}
          <div className="hidden md:flex flex-wrap">
            <label className="inline-flex items-center mr-4 mb-2 w-full">
              <input
                type="radio"
                value=""
                checked={!selectedOption}
                onChange={() => onChange("")}
                className="form-radio h-4 w-4 text-primary"
              />
              <span className="ml-2">{t("filter_options_all")}</span>
            </label>
            {options.map((option) => (
              <label
                key={option.id || option}
                className="inline-flex items-center mr-4 mb-2 w-full"
              >
                <div className="w-4 h-4">
                  <input
                    type="radio"
                    value={option.id || option}
                    checked={selectedOption === (option.id || option)}
                    onChange={() => onChange(option.id || option)}
                    className="form-radio h-4 w-4 text-primary"
                  />
                </div>
                <span className="ml-2">
                  {formatQualificationLevel(option.name || option)}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterOptions;
