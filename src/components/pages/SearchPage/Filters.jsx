import { useState } from "react";
import { useTranslation } from "react-i18next";
import CountryFilter from "./CountryFilter.jsx";
import FilterOptions from "./FilterOptions.jsx";
import { FiFilter } from "react-icons/fi";

const Filters = ({
  selectedCountry,
  handleCountryChange,
  selectedSpecialty,
  handleSpecialtyChange,
  selectedQualification,
  handleQualificationChange,
}) => {
  const [showFilters, setShowFilters] = useState(true);
  const { t } = useTranslation();

  const toggleFilters = () => {
    setShowFilters((prevState) => !prevState);
  };

  return (
    <div className="bg-white rounded-t-lg md:rounded-lg lg:w-1/4 w-full p-4 md:p-8 ">
      <button
        onClick={toggleFilters}
        className="md:hidden flex items-center float-right text-gray-900 focus:outline-none"
      >
        <FiFilter className="mr-2" /> {t("filters_button_text")}
      </button>
      {showFilters && (
        <>
          <div>
            <CountryFilter
              selectedCountry={selectedCountry}
              handleCountryChange={handleCountryChange}
            />
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4">
            <FilterOptions
              paramName="specialties"
              labelText={t("filters_specialties_label")}
              onChange={handleSpecialtyChange}
              selectedOption={selectedSpecialty}
            />
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4">
            <FilterOptions
              paramName="qualification_levels"
              labelText={t("filters_qualification_levels_label")}
              onChange={handleQualificationChange}
              selectedOption={selectedQualification}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Filters;
