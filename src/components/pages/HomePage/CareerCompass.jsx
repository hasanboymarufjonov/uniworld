import { useState, useEffect } from "react";
import api from "../../../app/api.js";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

const CareerCompass = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    api
      .get("/article/pathway-advice/list/")
      .then((response) => {
        setCareers(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching career data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-20 py-8 ">
      <h2 className="text-4xl">
        <span className="font-bold">{t("Career Compass")}:</span>{" "}
        {t("Pick your passion, we'll find the path")}.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {careers.map((career) => (
          <Link
            to={`pathway-advice/${career.article_slug}/detail`}
            key={career.id}
            className="flex items-center space-x-4 p-4 border rounded-lg shadow-md bg-white"
          >
            <img
              src={career.icon}
              alt={`${career.title} icon`}
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
