import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config";
import HtmlContentRenderer from "./HtmlContentRenderer";

function UniversityOverview({ slug }) {
  const [universityData, setUniversityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversityData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/universities/${slug}/detail/`
        );
        setUniversityData(response.data);
        setLoading(false);
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
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">{universityData.name}</h1>
      <div className="flex items-center justify-between mb-4">
        <img
          src={universityData.logo}
          alt={universityData.name}
          className="w-32 h-auto"
        />
        <p className="text-gray-600">{universityData.country.name}</p>
      </div>
      <HtmlContentRenderer htmlContent={universityData.about} />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Establishment Year</h2>
          <p>{universityData.establishment_year}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Institution Type</h2>
          <p>{universityData.institution_type}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Students Count</h2>
          <p>{universityData.students_count}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Address</h2>
          <p>{universityData.address}</p>
        </div>
      </div>
    </div>
  );
}

export default UniversityOverview;
