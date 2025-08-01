import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "../../../app/api.js";
import { HiOutlineLocationMarker } from "react-icons/hi";

const UniversityTitle = ({ slug, onUniversityIdChange }) => {
  const [universityData, setUniversityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUniversityData = async () => {
      try {
        const response = await axios.get(`/universities/${slug}/detail/`);
        setUniversityData(response.data);
        onUniversityIdChange(response.data.id);
      } catch (error) {
        console.error("Error fetching university data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversityData();
  }, [slug, onUniversityIdChange]);

  if (loading) {
    return <p className="text-center p-10">{t("loading")}</p>;
  }

  if (!universityData) {
    return null; // Don't render anything if data fetch fails
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <h1 className="text-3xl font-semibold mb-4">{universityData.name}</h1>
        <div className="flex items-center">
          <HiOutlineLocationMarker />
          <p className="text-gray-600 ml-2">{universityData.country.name}</p>
        </div>
      </div>
    </div>
  );
};

export default UniversityTitle;
