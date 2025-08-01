import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "../../../app/api.js";
import HtmlContentRenderer from "../../shared/HtmlContentRenderer.jsx";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsFillHouseFill, BsFillHouseXFill } from "react-icons/bs";

function UniversityOverview() {
  const [universityData, setUniversityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const { universityName } = useParams();

  useEffect(() => {
    const fetchUniversityData = async () => {
      try {
        const response = await axios.get(
          `/universities/${universityName}/detail/`
        );
        setUniversityData(response.data);
      } catch (error) {
        console.error("Error fetching university data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversityData();
  }, [universityName]);

  if (loading) {
    return <p className="text-center p-10">{t("loading")}</p>;
  }

  if (!universityData) {
    return <p className="text-center p-10">{t("university_overview_error")}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">{universityData.name}</h1>
      <div className="flex items-center mb-4">
        <HiOutlineLocationMarker />
        <p className="text-gray-600 ml-2">{universityData.country.name}</p>
      </div>

      <div className="relative">
        <img
          src={universityData.image}
          className="w-full h-[500px] object-cover rounded-lg mb-4"
          alt={universityData.name}
        />
        <img
          src={universityData.logo}
          alt={t("university_logo_alt", {
            universityName: universityData.name,
          })}
          className="absolute bottom-0 left-0 w-28 rounded-lg h-auto mb-2 ml-2"
        />
      </div>
      <div className="bg-white px-6 py-8 rounded-lg mb-4">
        <h3 className="text-3xl font-bold mb-6">{t("about_university")}</h3>
        <HtmlContentRenderer htmlContent={universityData.about} />
      </div>
      <div className="bg-white rounded-lg px-6 py-8 mb-4">
        <h3 className="text-3xl font-bold mb-6">{t("overview_title")}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">
              {t("establishment_year_label")}
            </h2>
            <p>{universityData.establishment_year}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">
              {t("institution_type_label")}
            </h2>
            <p>{universityData.institution_type}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">
              {t("students_count_label")}
            </h2>
            <p>{universityData.students_count}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">{t("address_label")}</h2>
            <p>{universityData.address}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg px-6 py-8 mb-4">
        <h3 className="text-3xl font-bold mb-6">{t("admissions_title")}</h3>
        <div className="grid grid-cols-3 lg:grid-cols-6 mt-4">
          {[
            "january",
            "february",
            "march",
            "april",
            "may",
            "june",
            "july",
            "august",
            "september",
            "october",
            "november",
            "december",
          ].map((month, index) => (
            <span
              key={index}
              className={`mr-2 mb-2 p-2 rounded-lg ${
                universityData.intake_months.includes(month)
                  ? "bg-secondary text-white"
                  : "bg-white text-black border border-gray-900"
              }`}
            >
              {t(`months.${month}`)}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg px-6 py-8 mb-4">
        <h3 className="text-3xl font-bold mb-6">
          {t("tuition_and_fees_title")}
        </h3>
        <div className="flex flex-col md:flex-row">
          <div className="bg-blue-50 rounded-lg p-4 lg:w-1/2">
            <p className="font-bold text-xl">
              {universityData.tuition_fee} {t("per_year_text")}
            </p>
            <p>{t("tuition_fee_disclaimer")}</p>
          </div>
          <div className="p-4 lg:w-1/2 flex justify-around">
            <div>
              <p className="font-semibold">{t("application_fee_label")}</p>
              <p>{universityData.application_fee}</p>
            </div>
            <div>
              <p className="font-semibold">{t("visa_fee_label")}</p>
              <p>{universityData.visa_fee}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-bold my-6 ">{t("living_cost_title")}</h3>
          <div className="flex justify-between items-center flex-col md:flex-row">
            <div className="bg-blue-50 rounded-lg p-4 lg:w-1/2">
              <p className="font-bold text-xl">
                {universityData.living_cost} {t("per_month_text")}
              </p>
              <p>
                {t("average_living_cost_in", {
                  country: universityData.country.name,
                })}
              </p>
              <p className="mt-2">
                {t("living_cost_disclaimer", {
                  country: universityData.country.name,
                  year: "2024",
                })}
              </p>
            </div>
            <div className="p-4 lg:w-1/2 flex justify-around items-center">
              <div>
                <p className="font-semibold">{t("dormitory_label")}</p>
                <p>{universityData.has_dormitory ? t("yes") : t("no")}</p>
              </div>
              <div className="ml-12">
                {universityData.has_dormitory ? (
                  <BsFillHouseFill size={50} />
                ) : (
                  <BsFillHouseXFill size={50} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg px-6 py-8">
        <h3 className="text-3xl font-bold mb-6">
          {t("courses_available_title")}
          <span className="bg-blue-50 p-2 rounded-lg ml-2 text-xl">
            {universityData.specialties.total_courses}
          </span>
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {universityData.specialties.data.map((specialty) => (
            <li key={specialty.id} className="">
              <div className="flex items-center">
                <Link
                  to={`/universities/${universityName}/courses?specialty=${specialty.id}&qualification_level=`}
                  className="text-base font-semibold bg-blue-50 p-2 rounded-lg"
                >
                  {specialty.name}
                </Link>
                <p className="ml-2">{specialty.course_count}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UniversityOverview;
