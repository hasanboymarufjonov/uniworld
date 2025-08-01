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
      <div className="flex justify-center items-center h-screen">
        {t("loading")}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-4xl">
        <span className="font-bold">{t("career_compass_title")}:</span>{" "}
        {t("career_compass_subtitle")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {careers.map((career) => (
          <Link
            to={`pathway-advice/${career.article_slug}/detail`}
            key={career.id}
            className="flex items-center space-x-4 p-4 border rounded-lg shadow-md bg-white transition-transform hover:scale-105"
          >
            <img
              src={career.icon}
              alt={`${career.title} ${t("icon_alt_text")}`}
              className="w-12 h-12"
            />
            <div>
              <h3 className="text-lg font-semibold">{career.title}</h3>
              <p className="text-sm text-gray-600">{career.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CareerCompass;
