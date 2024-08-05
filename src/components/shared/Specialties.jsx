import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../config";

const Specialties = ({ register }) => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/universities/filters/`);
        setSpecialties(response.data.specialties);
      } catch (err) {
        setError("Failed to load specialties. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  if (loading) return <p>Loading specialties...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Needed Specialty</label>
      <select
        {...register("needed_specialty", { required: true })}
        className="w-full px-3 py-2 border rounded-lg"
        required
      >
        {specialties.map((specialty) => (
          <option key={specialty.id} value={specialty.id}>
            {specialty.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Specialties;
