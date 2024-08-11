import { useState, useEffect } from "react";
import axios from "../../app/api.js";

const RegionSelector = ({ onSelect }) => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get(`/common/regions/?limit=20`);
        setRegions(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching regions: ", error);
      }
    };

    fetchRegions();
  }, []);

  return (
    <div className="">
      {loading ? (
        <p>Loading regions...</p>
      ) : (
        <select
          onChange={(e) => onSelect(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-3 mt-1 w-full"
        >
          <option value="">Select a region</option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default RegionSelector;
