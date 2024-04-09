import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../config";

const QualificationLevels = () => {
  const [qualificationLevels, setQualificationLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQualificationLevels = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/universities/filters/`);
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
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {qualificationLevels.map((level, index) => (
              <div
                key={index}
                className="bg-white border shadow-sm rounded-xl p-4 flex justify-center items-center"
              >
                <p className="text-center">{level}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QualificationLevels;
