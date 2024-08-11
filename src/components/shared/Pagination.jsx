import { Link } from "react-router-dom";
import { HiArrowLongRight, HiArrowLongLeft } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const Pagination = ({
  totalPages,
  currentPage,
  limit,
  selectedCountry,
  selectedSpecialty,
  selectedQualification,
  searchTerm,
  handlePageChange,
  goToNextPage,
  goToPreviousPage,
}) => {
  const { t } = useTranslation();

  return (
    <div className="pt-6 border-t-2 mx-4 py-8">
      {totalPages > 1 && (
        <ul className="flex justify-center">
          <li>
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="mx-1 px-2 flex items-center"
            >
              <HiArrowLongLeft className="mr-2" /> {t("Previous")}
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
              className="mx-1 px-2 flex items-center"
            >
              {t("Next")} <HiArrowLongRight className="ml-2" />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Pagination;
