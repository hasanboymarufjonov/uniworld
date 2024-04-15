import React from "react";
import CountryFilter from "./CountryFilter";
import FilterOptions from "./FilterOptions";

const Filters = ({
  selectedCountry,
  handleCountryChange,
  selectedSpecialty,
  handleSpecialtyChange,
  selectedQualification,
  handleQualificationChange,
}) => {
  return (
    <div className="bg-white rounded-lg lg:w-1/4 w-full p-8 ">
      <CountryFilter
        selectedCountry={selectedCountry}
        handleCountryChange={handleCountryChange}
      />
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
    </div>
  );
};

export default Filters;
