import React, { useState } from "react";
import CountryFilter from "./CountryFilter";
import FilterOptions from "./FilterOptions";
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

  const toggleFilters = () => {
    setShowFilters((prevState) => !prevState);
  };

  return (
    <div className="bg-white rounded-t-lg  md:rounded-lg lg:w-1/4 w-full p-4 md:p-8 ">
      <button
        onClick={toggleFilters}
        className="md:hidden flex items-center float-right text-gray-900 focus:outline-none"
      >
        <FiFilter className="mr-2" /> Filter
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
              labelText="Specialties:"
              onChange={handleSpecialtyChange}
              selectedOption={selectedSpecialty}
            />
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4">
            <FilterOptions
              paramName="qualification_levels"
              labelText="Qualification Levels:"
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
