import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config";

function UniversityCourses({ slug }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversityCourses = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/universities/${slug}/courses/`
        );
        setCourses(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching university courses:", error);
        setLoading(false);
      }
    };

    fetchUniversityCourses();
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Courses Offered</h2>
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li
              key={course.id}
              className="border-2 border-gray-100 rounded-md bg-white p-4"
            >
              <h3 className="text-lg font-semibold">{course.name}</h3>
              <p>Duration: {course.duration}</p>
              <p>Study Type: {course.study_type}</p>
              <p>Tuition Fee: {course.tuition_fee}</p>
              {/* Display intake months if available */}
              {course.intake_months && (
                <p>Intake Months: {course.intake_months.join(", ")}</p>
              )}
              <button className="bg-blue-600 text-white p-2 rounded mt-2">
                Apply
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UniversityCourses;
