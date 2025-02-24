import { useState, useEffect } from "react";
import api from "../../../app/api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function FeaturedUniversitiesSlider() {
  const { t } = useTranslation();
  const [featuredUniversities, setFeaturedUniversities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/universities/list/`, {
          params: {
            is_featured: true,
          },
        });
        setFeaturedUniversities(response.data.results);
      } catch (error) {
        console.error("Error fetching featured universities:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full lg:px-20 px-4 py-10 bg-primary">
      <h2 className="text-2xl md:text-4xl">{t("Featured Universities")}</h2>
      <div className="flex flex-no-wrap gap-2 md:gap-4 w-full mt-10 overflow-x-auto pb-4">
        {featuredUniversities.map((university) => (
          <Link
            key={university.id}
            to={`/universities/${university.slug}/overview`}
            className="relative flex-none shadow-md border border-gray-100 bg-white w-1/2 lg:w-1/5 rounded-lg"
          >
            <div className="relative overflow-hidden">
              <img
                src={university.image}
                alt={university.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {university.logo && (
                <img
                  src={university.logo}
                  alt="University Logo"
                  className="absolute bottom-2 right-2 w-16 h-16 object-cover bg-white rounded-full border border-gray-200"
                />
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{university.name}</h3>
              <p className="text-gray-600">{university.country.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FeaturedUniversitiesSlider;
