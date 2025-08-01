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
            <p className="text-center p-10">{t("loading")}</p>
          ) : universities.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10">
              <img
                src={inboxIcon}
                alt={t("no_results_alt")}
                className="w-24 h-24 mb-4"
              />
              <p>{t("universities_no_results")}</p>
            </div>
          ) : (
            <div className="lg:px-4">
              {universities.map((university) => (
                <div
                  key={university.id}
                  className="bg-white flex flex-col sm:flex-row w-full mx-auto border-t-2 border-gray-200 px-5"
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
                              <p className="bg-primary text-secondary px-2 py-1 rounded-lg flex items-center">
                                <span>•</span>
                                <span className="ml-1">
                                  {t("universities_featured_badge")}
                                </span>
                              </p>
                            )}
                          </div>
                          <div className="ml-2">
                            {university.full_scolarship && (
                              <p className="bg-primary text-secondary px-2 py-1 rounded-lg flex items-center">
                                <span>•</span>
                                <span className="ml-1">
                                  {t("universities_free_badge")}
                                </span>
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
                        {t("universities_learn_more_button")}
                      </Link>
                      <Link
                        to={`${university.slug}/courses?qualification_level=${selectedQualification}&specialty=${selectedSpecialty}`}
                        className="border w-fit p-2 rounded-md border-secondary text-secondary ml-2"
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
