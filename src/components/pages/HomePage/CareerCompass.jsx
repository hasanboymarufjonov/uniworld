import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../../app/api.js";

const CareerCompass = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    api
      .get("/article/pathway-advice/list/")
      .then((response) => {
        setCareers(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching career data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[450px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            <span className="text-secondary">{t("career_compass_title")}:</span>{" "}
            {t("career_compass_subtitle")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {careers.map((career) => (
            <Link
              to={`pathway-advice/${career.article_slug}/detail`}
              key={career.id}
              className="group flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-secondary/10">
                  <img
                    src={career.icon}
                    alt={`${career.title} ${t("icon_alt_text")}`}
                    className="w-12 h-12"
                  />
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {career.title}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {career.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerCompass;
