import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const QualificationLevels = () => {
  const [qualificationLevels, setQualificationLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const lang = localStorage.getItem("i18nextLng");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchQualificationLevels = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/universities/filters/`, {
          headers: {
            "Accept-Language": lang,
          },
        });
        const { qualification_levels } = response.data;
        setQualificationLevels(qualification_levels.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching qualification levels:", error);
        setLoading(false);
      }
    };

    fetchQualificationLevels();
  }, []);

  return (
    <div className="bg-primary">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="max-w-[85rem] px-4  sm:px-6 lg:px-8  mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
            {/* {qualificationLevels.map((level, index) => (
              <div
                key={index}
                className="bg-white border shadow-sm rounded-xl p-4 flex justify-center items-center"
              >
                <p className="text-center">{level}</p>
              </div>
            ))} */}
            <div className="bg-white border shadow-sm rounded-xl p-4 flex justify-center items-center">
              <Link
                to={`/universities?country=&specialty=&qualification_level=diploma`}
                className="text-center"
              >
                {t("Diploma")}
              </Link>
            </div>
            <div className="bg-white border shadow-sm rounded-xl p-4 flex justify-center items-center">
              <Link
                to={`/universities?country=&specialty=&qualification_level=bachelor`}
                className="text-center"
              >
                {t("Bachelor's Degree")}{" "}
              </Link>{" "}
            </div>
            <div className="bg-white border shadow-sm rounded-xl p-4 flex justify-center items-center hidden lg:block text-center">
              <Link
                to={`/universities?country=&specialty=&qualification_level=master`}
                className="text-center"
              >
                {" "}
                {t("Master's Degree")}{" "}
              </Link>{" "}
            </div>
          </div>
          <div className="bg-white border shadow-sm rounded-xl p-4 flex justify-center items-center mt-2 lg:hidden">
            <Link
              to={`/universities?country=&specialty=&qualification_level=master`}
              className="text-center"
            >
              {t("Master's Degree")}{" "}
            </Link>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default QualificationLevels;
