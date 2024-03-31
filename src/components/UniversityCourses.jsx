import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config";
import ApplyModal from "./ApplyModal";

function UniversityCourses({ slug }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qualifications, setQualifications] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedQualification, setSelectedQualification] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

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

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/universities/filters/`, {
          params: {
            university: 2,
          },
        });
        console.log(response.data);
        setQualifications(response.data.qualification_levels);
        setSubjects(response.data.specialties);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  const handleApply = (courseId) => {
    setSelectedCourse(courseId);
    setIsModalOpen(true);
  };

  const handleQualificationChange = (e) => {
    setSelectedQualification(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const filteredCourses = courses.filter((course) => {
    if (
      selectedQualification &&
      course.qualification !== selectedQualification
    ) {
      return false;
    }
    if (selectedSubject && !course.subjects.includes(selectedSubject)) {
      return false;
    }
    return true;
  });

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Courses Offered</h2>
        <div className="flex justify-between mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Filter by Qualification:
            </label>
            <select
              value={selectedQualification}
              onChange={handleQualificationChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">All</option>
              {qualifications.map((qualification) => (
                <option key={qualification} value={qualification}>
                  {qualification}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Filter by Subject:
            </label>
            <select
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">All</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.name}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {filteredCourses.length === 0 ? (
              <p>No courses available</p>
            ) : (
              filteredCourses.map((course) => (
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
                  <button
                    className="bg-blue-600 text-white p-2 rounded mt-2"
                    onClick={() => handleApply(course.id)}
                  >
                    Apply
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        universityId={slug}
        courseId={selectedCourse}
      />
    </>
  );
}

export default UniversityCourses;
