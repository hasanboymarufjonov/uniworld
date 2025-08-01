import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  HiOutlineLocationMarker,
  HiArrowRight,
  HiOutlineDocumentSearch,
} from "react-icons/hi";

/**
 * A reusable, restyled card to display a university in the results list.
 */
const UniversityResultCard = ({ university }) => {
  const { t } = useTranslation();
  return (
    <Link
      to={`/universities/${university.slug}/overview`}
      className="group grid grid-cols-1 sm:grid-cols-10 gap-x-6 items-center bg-white rounded-2xl border border-gray-200 shadow-sm 
                 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:border-secondary"
    >
      <div className="relative sm:col-span-3 h-48 sm:h-full">
        <img
          className="w-full h-full object-cover"
          src={university.image}
          alt={university.name}
        />
        <div className="absolute bottom-3 right-3">
          <img
            src={university.logo}
            alt={t("university_logo_alt", { universityName: university.name })}
            className="w-16 h-16 object-contain bg-white/80 backdrop-blur-sm rounded-full border-2 border-white shadow-lg p-1"
          />
        </div>
      </div>

      <div className="sm:col-span-7 p-4 sm:p-6 flex items-center gap-4">
        <div className="flex-grow">
          <h3 className="font-heading text-xl font-bold text-gray-900">
            {university.name}
          </h3>
          <div className="flex items-center text-gray-600 mt-1">
            <HiOutlineLocationMarker className="w-5 h-5 mr-1.5 flex-shrink-0 text-gray-400" />
            <p className="font-sans text-sm">{university.country.name}</p>
          </div>
        </div>

        <div className="flex-shrink-0 self-center">
          <HiArrowRight className="h-7 w-7 text-gray-300 transition-all duration-300 group-hover:text-secondary group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};
/**
 * This page displays the matched universities from the eligibility check.
 */
const EligibilityResultsPage = () => {
  const { state } = useLocation();
  const { t } = useTranslation();
  const matchedUniversities = state?.matchedUniversities;

  if (!matchedUniversities || matchedUniversities.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center text-center p-6">
        <div className="max-w-md">
          <HiOutlineDocumentSearch className="mx-auto h-20 w-20 text-gray-300" />
          <h1 className="mt-6 font-heading text-3xl font-bold text-gray-800">
            {t("eligibility_results_no_matches_title")}
          </h1>
          <p className="font-sans mt-4 text-lg text-gray-600">
            {t("eligibility_results_no_matches_desc")}
          </p>
          <Link to="/">
            <button className="mt-8 px-8 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md">
              {t("eligibility_results_go_home_button")}
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            {t("eligibility_results_title")}
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            {t("eligibility_results_subtitle")}
          </p>
        </div>

        <div className="space-y-6">
          {matchedUniversities.map((university) => (
            <UniversityResultCard key={university.id} university={university} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EligibilityResultsPage;
