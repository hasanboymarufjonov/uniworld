import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "../../app/api.js";

const RegionSelector = ({ onSelect }) => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get(`/common/regions/?limit=20`);
        setRegions(response.data.results);
      } catch (error) {
        console.error("Error fetching regions: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  return (
    <div className="">
      {loading ? (
        <p>{t("loading_regions")}</p>
      ) : (
        <select
          onChange={(e) => onSelect(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-3 mt-1 w-full"
        >
          <option value="">{t("select_region")}</option>
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
