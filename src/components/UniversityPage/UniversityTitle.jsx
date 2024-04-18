import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../config.js";
import { HiOutlineLocationMarker } from "react-icons/hi";

const UniversityTitle = ({ slug, onUniversityIdChange }) => {
  const [universityData, setUniversityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversityData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/universities/${slug}/detail/`
        );
        setUniversityData(response.data);
        onUniversityIdChange(response.data.id);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching university data:", error);
        setLoading(false);
      }
    };

    fetchUniversityData();
  }, [slug, onUniversityIdChange]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <h1 className="text-3xl font-semibold mb-4">{universityData.name}</h1>
          <div className="flex items-center">
            <HiOutlineLocationMarker />
            <p className="text-gray-600 ml-2">{universityData.country.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityTitle;
