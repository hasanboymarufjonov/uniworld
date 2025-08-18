import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineLocationMarker } from "react-icons/hi";
import api from "../../../app/api";
import Filters from "./Filters.jsx";
import Pagination from "../../shared/Pagination.jsx";
import inboxIcon from "../../../assets/images/icons/inbox.png";

const UniversityList = () => {
  const { t } = useTranslation();
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

      const response = await api.get(
        `/universities/list/?${params.toString()}`
      );
      const data = response.data;
      setUniversities(data.results);
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching universities: ", error);
    } finally {
      setLoading(false);
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
      <div className="flex justify-center">
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={t("universities_search_placeholder")}
          className="w-full max-w-3xl mx-4 my-8 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:px-8 xl:px-32 px-4 py-4">
        <Filters
          selectedCountry={selectedCountry}
          handleCountryChange={handleCountryChange}
          selectedSpecialty={selectedSpecialty}
          handleSpecialtyChange={handleSpecialtyChange}
          selectedQualification={selectedQualification}
          handleQualificationChange={handleQualificationChange}
        />

        <div className="w-full container mx-auto bg-white py-4 md:rounded-lg lg:ml-5 h-fit shadow-md">
          {loading ? (
            <p className="text-center p-10">{t("loading")}</p>
          ) : universities.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10 text-center">
              <img
                src={inboxIcon}
                alt={t("no_results_alt")}
                className="w-24 h-24 mb-4"
              />
              <p className="text-gray-800">{t("universities_no_results")}</p>
            </div>
          ) : (
            <div className="px-2 sm:px-4">
              {universities.map((university) => (
                <div
                  key={university.id}
                  className="bg-white flex flex-col md:flex-row w-full mx-auto border-t border-gray-100 p-4 md:p-5 items-center"
                >
                  <div className="w-full md:w-48 flex-shrink-0 mb-4 md:mb-0">
                    <img
                      src={university.image}
                      alt={university.name}
                      className="w-full h-40 md:h-32 object-cover rounded-lg shadow-sm"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/400x300/e0e0e0/757575?text=Image+Error";
                      }}
                    />
                  </div>
                  <div className="w-full md:ml-6 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-2 sm:mb-0 pr-2">
                          {university.name}
                        </h2>
                        <div className="flex flex-shrink-0 space-x-2 mt-2 sm:mt-0">
                          {university.is_featured && (
                            <p className="bg-primary text-secondary text-xs font-semibold px-2.5 py-1 rounded-full flex items-center whitespace-nowrap">
                              <span className="w-2 h-2 bg-secondary rounded-full mr-1.5"></span>
                              {t("universities_featured_badge")}
                            </p>
                          )}
                          {university.full_scolarship && (
                            <p className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center whitespace-nowrap">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                              {t("universities_free_badge")}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-800 mb-4 flex items-center text-base">
                        <HiOutlineLocationMarker className="w-5 h-5 mr-1.5 text-gray-800" />{" "}
                        {university.country.name}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`${university.slug}/overview`}
                        className="px-4 py-2 rounded-md bg-secondary text-white font-semibold hover:bg-blue-700 transition-colors text-sm"
                      >
                        {t("universities_learn_more_button")}
                      </Link>
                      <Link
                        to={`${university.slug}/courses?qualification_level=${selectedQualification}&specialty=${selectedSpecialty}`}
                        className="px-4 py-2 rounded-md border border-secondary text-secondary font-semibold hover:bg-blue-50 transition-colors text-sm"
                      >
                        {university.course_count}{" "}
                        {t("universities_courses_available")}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            limit={limit}
            selectedCountry={selectedCountry}
            selectedSpecialty={selectedSpecialty}
            selectedQualification={selectedQualification}
            searchTerm={searchTerm}
            handlePageChange={handlePageChange}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
          />
        </div>
      </div>
    </div>
  );
};

export default UniversityList;
