import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../config.js";
import HtmlContentRenderer from "../shared/HtmlContentRenderer.jsx";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsFillHouseFill, BsFillHouseXFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function UniversityOverview({ slug }) {
  const [universityData, setUniversityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const { universityName } = useParams();
  const lang = localStorage.getItem("i18nextLng");

  useEffect(() => {
    const fetchUniversityData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/universities/${universityName}/detail/`,
          {
            headers: {
              "Accept-Language": lang,
            },
          }
        );
        setUniversityData(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching university data:", error);
        setLoading(false);
      }
    };

    fetchUniversityData();
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!universityData) {
    return <p>Error: Unable to fetch university data.</p>;
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
          alt=""
        />
        <img
          src={universityData.logo}
          alt={universityData.name}
          className="absolute bottom-0 left-0 w-28 rounded-lg h-auto mb-2 ml-2"
        />
      </div>
      <div className="bg-white px-6 py-8 rounded-lg mb-4">
        <h3 className="text-3xl font-bold mb-6">{t("About")}</h3>
        <HtmlContentRenderer htmlContent={universityData.about} />
      </div>
      <div className="bg-white rounded-lg px-6 py-8 mb-4">
        <h3 className="text-3xl font-bold mb-6">{t("Overview")}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">
              {t("Establishment Year")}
            </h2>
            <p>{universityData.establishment_year}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">
              {t("Institution Type")}
            </h2>
            <p>{universityData.institution_type}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">
              {t("Students Count")}
            </h2>
            <p>{universityData.students_count}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">{t("Address")}</h2>
            <p>{universityData.address}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg px-6 py-8 mb-4">
        <h3 className="text-3xl font-bold mb-6">{t("Admissions")} </h3>

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
              className={`mr-2 mb-2 p-2 rounded-lg  ${
                universityData.intake_months.includes(month)
                  ? "bg-secondary text-white"
                  : "bg-white text-black border border-gray-900"
              }`}
            >
              {month.charAt(0).toUpperCase() + month.slice(1)}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg px-6 py-8 mb-4">
        <h3 className="text-3xl font-bold mb-6">
          {t("Tuition and application fees")}
        </h3>
        <div className="flex flex-col md:flex-row">
          <div className="bg-blue-50 rounded-lg p-4 lg:w-1/2">
            <p className="font-bold text-xl">
              {universityData.tuition_fee} per year
            </p>
            {/* <p>Estimated tuition fees as reported by the institution.</p> */}
            <p>
              {t(
                "The tuition fee might be outdated, please confirm it with theconsultant."
              )}
            </p>
          </div>
          <div className="p-4 lg:w-1/2 flex justify-around">
            <div>
              <p className="font-semibold">{t("Application fee")}</p>
              <p>{universityData.application_fee}</p>
            </div>

            <div>
              <p className="font-semibold">Visa fee</p>
              <p>{universityData.visa_fee}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-bold my-6 ">{t("Living cost")}</h3>
          <div className="flex justify-between items-center flex-col md:flex-row">
            <div className="bg-blue-50 rounded-lg p-4 lg:w-1/2">
              <p className="font-bold text-xl">
                {universityData.living_cost} per month
              </p>
              <p>Average living cost in {universityData.country.name}</p>
              <p className="mt-2">
                {t(
                  "The amount is indicated taking into account the average cost of food, accommodation, etc in"
                )}{" "}
                {universityData.country.name} {t("for 2024")}
              </p>
            </div>
            <div className="p-4 lg:w-1/2 flex justify-around items-center">
              <div>
                <p className="font-semibold">Dormitory</p>
                <p>{universityData.has_dormitory ? "Yes" : "No"}</p>
              </div>
              <div className="ml-12">
                {universityData.has_dormitory ? (
                  <BsFillHouseFill size={50} />
                ) : (
                  <BsFillHouseXFill />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg px-6 py-8">
        <h3 className="text-3xl font-bold mb-6">
          {t("Courses available")}
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

      <p>{universityData.required_documents.document_type}</p>
      <p>{universityData.required_documents.description}</p>
    </div>
  );
}

export default UniversityOverview;
