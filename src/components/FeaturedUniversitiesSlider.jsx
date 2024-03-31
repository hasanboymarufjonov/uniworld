import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config";
import { Link } from "react-router-dom";

function FeaturedUniversitiesSlider() {
  const [featuredUniversities, setFeaturedUniversities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/universities/list/`, {
          params: {
            is_featured: true,
          },
        });
        setFeaturedUniversities(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error("Error fetching featured universities:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-hidden w-full px-20 py-10 bg-gradient-to-b from-white via-blue-50 to-blue-50">
      <h2 className="text-4xl">Featured Universities</h2>
      <div className="grid grid-cols-5 gap-2 w-full mt-10">
        {featuredUniversities.map((university) => (
          <Link
            key={university.id}
            to={university.slug}
            className="flex-none  shadow-md border border-gray-100 bg-white"
          >
            <div className=" overflow-hidden ">
              <img
                src={university.logo}
                alt={university.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {university.name}
                </h3>
                <p className="text-gray-600">{university.country.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FeaturedUniversitiesSlider;
