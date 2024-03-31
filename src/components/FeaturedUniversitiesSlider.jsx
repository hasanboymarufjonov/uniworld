import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config";

function FeaturedUniversitiesSlider() {
  const [featuredUniversities, setFeaturedUniversities] = useState([]);

  useEffect(() => {
    // Fetch featured universities data
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/universities/list/`, {
          params: {
            // is_featured: true,
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
    <div className="overflow-hidden w-full px-20">
      <div className="flex space-x-4">
        {featuredUniversities.map((university) => (
          <div key={university.id} className="flex-none w-full lg:w-1/4">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedUniversitiesSlider;
