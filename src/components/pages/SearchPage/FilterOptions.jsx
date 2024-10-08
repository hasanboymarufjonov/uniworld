import { useState, useEffect } from "react";
import api from "../../../app/api";

const formatQualificationLevel = (level) => {
  switch (level) {
    case "foundation":
      return "Foundation degree";
    case "certificate":
      return "Certificate";
    case "bachelor":
      return "Bachelor's degree";
    case "diploma":
      return "Diploma";
    case "master":
      return "Master's degree";
    case "undergraduate":
      return "Undergraduate";
    case "postgraduate":
      return "Postgraduate";
    default:
      return level;
  }
};

const FilterOptions = ({ paramName, labelText, onChange, selectedOption }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/universities/filters/`);
        setOptions(response.data[paramName]);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching ${paramName}: `, error);
      }
    };

    fetchData();
  }, [paramName]);

  const handleOptionChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">{labelText}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap">
          {/* Render select element on mobile */}
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="p-2 w-full mb-2 md:hidden rounded-lg"
          >
            <option value="">All</option>
            {options.map((option) => (
              <option key={option.id || option} value={option.id || option}>
                {formatQualificationLevel(option.name || option)}
              </option>
            ))}
          </select>
          {/* Render radio buttons on larger screens */}
          <div className="hidden md:flex flex-wrap">
            <label className="inline-flex items-center mr-4 mb-2 w-full">
              <input
                type="radio"
                value=""
                checked={!selectedOption}
                onChange={() => onChange("")}
                className="form-radio h-4 w-4 text-primary"
              />
              <span className="ml-2">All</span>
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
