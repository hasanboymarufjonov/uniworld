import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../config.js";
import { Link } from "react-router-dom";

function FullScholarshipUniversitiesSlider() {
  const [featuredUniversities, setFeaturedUniversities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/universities/list/`, {
          params: {
            full_scolarship: true,
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
    <div className="overflow-hidden w-full lg:px-20 px-4 py-10 bg-primary">
      <h2 className="text-4xl">Full Scholarships Universities</h2>
      <div className="flex flex-no-wrap gap-2 w-full mt-10 overflow-x-auto pb-4">
        {featuredUniversities.map((university) => (
          <Link
            key={university.id}
            to={`universities/${university.slug}/overview`}
            className="flex-none  shadow-md border border-gray-100 bg-white w-1/2 lg:w-1/5 rounded-lg"
          >
            <div className=" overflow-hidden ">
              <img
                src={university.image}
                alt={university.name}
                className="w-full h-48 object-cover rounded-t-lg"
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

export default FullScholarshipUniversitiesSlider;
