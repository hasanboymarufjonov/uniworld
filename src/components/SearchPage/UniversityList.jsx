import React, { useState, useEffect } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useLocation, useNavigate, Link } from "react-router-dom";
import BASE_URL from "../../config.js";
import Filters from "./Filters.jsx";

const UniversityList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(9);
  const [offset, setOffset] = useState(0);

  const [universities, setUniversities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(
    queryParams.get("country") || ""
  );
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    queryParams.get("specialty") || ""
  );
  const [selectedQualification, setSelectedQualification] = useState(
    queryParams.get("qualification_level") || ""
  );
  const [searchTerm, setSearchTerm] = useState(queryParams.get("search") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUniversities();
  }, [
    selectedCountry,
    selectedSpecialty,
    selectedQualification,
    searchTerm,
    limit,
    offset,
  ]);

  const fetchUniversities = async () => {
    try {
      const params = new URLSearchParams();

      if (selectedCountry) params.append("country", selectedCountry);
      if (selectedSpecialty) params.append("specialty", selectedSpecialty);
      if (selectedQualification)
        params.append("qualification_level", selectedQualification);
      if (searchTerm) params.append("search", searchTerm);

      params.append("limit", limit);
      params.append("offset", offset);
      queryParams.forEach((value, key) => {
        params.append(key, value);
      });

      const response = await fetch(
        `${BASE_URL}/universities/list/?${params.toString()}`
      );

      const data = await response.json();
      setUniversities(data.results);
      setCount(data.count);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching universities: ", error);
    }
  };

  const handleCountryChange = (countryId) => {
    setSelectedCountry(countryId);
    navigate(
      `?country=${countryId}&specialty=${selectedSpecialty}&qualification_level=${selectedQualification}`
    );
  };

  const handleSpecialtyChange = (specialtyId) => {
    setSelectedSpecialty(specialtyId);
    navigate(
      `?country=${selectedCountry}&specialty=${specialtyId}&qualification_level=${selectedQualification}`
    );
  };

  const handleQualificationChange = (qualification) => {
    setSelectedQualification(qualification);
    navigate(
      `?country=${selectedCountry}&specialty=${selectedSpecialty}&qualification_level=${qualification}`
    );
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    navigate(
      `?country=${selectedCountry}&specialty=${selectedSpecialty}&qualification_level=${selectedQualification}&search=${value}`
    );
  };

  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
  };

  const totalPages = Math.ceil(count / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const goToNextPage = () => {
    const nextOffset = offset + limit;
    setOffset(nextOffset);
  };

  const goToPreviousPage = () => {
    const previousOffset = Math.max(offset - limit, 0);
    setOffset(previousOffset);
  };

  return (
    <div>
      {" "}
      <div className="flex justify-center">
        {" "}
        {/* Center the input */}
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a college or university..."
          className="w-[768px] mx-4 my-8 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex flex-wrap lg:flex-nowrap lg:px-32 px-4 py-4">
        <Filters
          selectedCountry={selectedCountry}
          handleCountryChange={handleCountryChange}
          selectedSpecialty={selectedSpecialty}
          handleSpecialtyChange={handleSpecialtyChange}
          selectedQualification={selectedQualification}
          handleQualificationChange={handleQualificationChange}
        />

        <div className="container mx-auto max-w-6xl bg-white py-0 md:py-4 md:rounded-lg lg:ml-5 lg:mt-0 h-fit">
          {loading ? (
            <p>Loading...</p>
          ) : universities.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://img.icons8.com/ios-filled/200/inbox.png"
                alt="No results"
                className="w-24 h-24 mb-4"
              />
              <p>No universities found.</p>
            </div>
          ) : (
            <div className="lg:px-4 ">
              {universities.map((university) => (
                <div
                  key={university.id}
                  className="bg-white flex flex-col sm:flex-row w-full mx-auto border-t-2 border-gray-200 px-5 "
                >
                  <div className="sm:w-48 sm:h-36 sm:object-cover my-4">
                    <img
                      src={university.image}
                      alt={university.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between sm:ml-4">
                    <div>
                      <div className="flex items-center justify-between lg:w-[640px]">
                        <h2 className="text-4xl font-semibold mb-2">
                          {university.name}
                        </h2>
                        <div className="flex">
                          <div>
                            {university.is_featured && (
                              <p className="bg-primary text-secondary px-2 py-1  rounded-lg float-right flex ">
                                <span>•</span>{" "}
                                <span className="ml-1">Featured</span>
                              </p>
                            )}
                          </div>
                          <div className="ml-2">
                            {university.full_scolarship && (
                              <p className="bg-primary text-secondary px-2 py-1 rounded-lg float-right flex ">
                                <span>•</span>{" "}
                                <span className="ml-1">Free</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-black mb-2 flex items-center text-base">
                        <HiOutlineLocationMarker /> {university.country.name}
                      </p>
                    </div>
                    <div className="flex">
                      <Link
                        to={`${university.slug}/overview`}
                        className="w-fit p-2 rounded-md bg-secondary text-white"
                      >
                        Learn more
                      </Link>
                      <Link
                        to={`${university.slug}/courses?qualification_level=${selectedQualification}&specialty=${selectedSpecialty}`}
                        className="border w-fit p-2 rounded-md border-secondary text-secondary ml-2"
                      >
                        {university.course_count} courses available
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="pt-6 border-t-2 mx-4">
            {totalPages > 1 && (
              <ul className="flex justify-center">
                <li>
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="mx-1 px-2"
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages).keys()].map((pageNumber) => (
                  <li key={pageNumber} className="mx-1">
                    <Link
                      to={`?country=${selectedCountry}&specialty=${selectedSpecialty}&qualification_level=${selectedQualification}&search=${searchTerm}&limit=${limit}&offset=${
                        pageNumber * limit
                      }`}
                      onClick={() => handlePageChange(pageNumber * limit)}
                      className={`p-3${
                        pageNumber + 1 === currentPage
                          ? " border-t-2 border-secondary text-secondary"
                          : ""
                      }`}
                    >
                      {pageNumber + 1}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="mx-1 px-2"
                  >
                    Next
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityList;
