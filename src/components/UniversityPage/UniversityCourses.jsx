import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import ApplyModal from "./ApplyModal.jsx";
import UniversityTitle from "./UniversityTitle.jsx";
import BASE_URL from "../../config.js";

function UniversityCourses() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qualifications, setQualifications] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedQualification, setSelectedQualification] = useState(
    queryParams.get("qualification_level") || ""
  );
  const [selectedSubject, setSelectedSubject] = useState(
    queryParams.get("specialty") || ""
  );

  const { universityName } = useParams();

  const [universityId, setUniversityId] = useState(null);

  useEffect(() => {
    const fetchUniversityCourses = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/universities/${universityName}/courses/`,
          {
            params: {
              specialty: selectedSubject,
              qualification_level: selectedQualification,
            },
          }
        );
        setCourses(response.data.results);
        console.log(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching university courses:", error);
        setLoading(false);
      }
    };

    fetchUniversityCourses();
  }, [universityName, selectedQualification, selectedSubject]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/universities/filters/`, {
          params: {
            university: universityId,
          },
        });
        setQualifications(response.data.qualification_levels);
        setSubjects(response.data.specialties);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    if (universityId) {
      fetchFilters();
    }
  }, [universityId]);

  const handleApply = (courseId) => {
    setSelectedCourse(courseId);
    setIsModalOpen(true);
  };
  const handleQualificationChange = (e) => {
    const qualificationValue = e.target.value;
    setSelectedQualification(qualificationValue);
    queryParams.set("qualification_level", qualificationValue);

    if (selectedSubject !== "") {
      queryParams.set("specialty", selectedSubject);
    }

    window.history.replaceState({}, "", `${location.pathname}?${queryParams}`);
  };

  const handleSubjectChange = (e) => {
    const subjectValue = e.target.value;
    setSelectedSubject(subjectValue);
    queryParams.set("specialty", subjectValue);

    if (selectedQualification !== "") {
      queryParams.set("qualification_level", selectedQualification);
    }

    window.history.replaceState({}, "", `${location.pathname}?${queryParams}`);
  };

  const updateUniversityId = (id) => {
    setUniversityId(id);
  };

  const formatQualificationLevel = (level) => {
    switch (level) {
      case "foundation":
        return "Foundation degree";
      case "certificate":
        return "Certificate";
      case "bachelor":
        return "Bachelor's degree";
      case "diploma":
        return "Diploma";
      case "master":
        return "Master's degree";
      case "undergraduate":
        return "Undergraduate";
      case "postgraduate":
        return "Postgraduate";
      default:
        return level;
    }
  };

  const studyTypeNames = {
    full_time: "Full-time",
    part_time: "Part-time",
    distance: "Distance",
  };

  return (
    <>
      <div className="max-w-4xl mx-auto ">
        <UniversityTitle
          slug={universityName}
          onUniversityIdChange={updateUniversityId}
        />
        <h2 className="text-2xl font-semibold mb-4">Courses Offered</h2>
        <div className="flex justify-end mb-4 items-center">
          <p className="mr-2">Filter by</p>
          <div className="pr-2">
            <select
              value={selectedQualification}
              onChange={handleQualificationChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">All</option>
              {qualifications.map((qualification) => (
                <option key={qualification} value={qualification}>
                  {formatQualificationLevel(qualification)}
                </option>
              ))}
            </select>
          </div>
          <div className="pl-2">
            <select
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">All</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
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
            {courses.length === 0 ? (
              <p>No courses available</p>
            ) : (
              courses.map((course) => (
                <li
                  key={course.id}
                  className="border-2 border-gray-100 rounded-xl bg-white p-4 mb-4"
                >
                  <h3 className="text-lg font-semibold">{course.name}</h3>
                  <div className="flex justify-between mt-2">
                    <div>
                      <h4 className="font-semibold">Duration</h4>
                      <p>
                        {Number.isInteger(parseFloat(course.duration))
                          ? parseFloat(course.duration) % 1 === 0
                            ? parseFloat(course.duration)
                            : parseFloat(course.duration).toFixed(1)
                          : course.duration}{" "}
                        years
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Study Type</h4>
                      <p>{studyTypeNames[course.study_type]}</p>{" "}
                    </div>
                    <div>
                      <h4 className="font-semibold">Tuition Fee</h4>
                      <p>
                        {" "}
                        $ {parseFloat(course.tuition_fee).toLocaleString()} per
                        year
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <p className="font-semibold">Intake Months </p>
                    <div className="md:block grid grid-cols-3 py-1">
                      {course.intake_months.map((month, index) => (
                        <span
                          key={index}
                          className="mr-2 border border-black rounded p-1 text-center"
                        >
                          {month.charAt(0).toUpperCase() + month.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="bg-secondary hover:bg-blue-800 text-white py-2 px-8 rounded-lg mt-2"
                    onClick={() => handleApply(course.id)}
                  >
                    Apply Now
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
        universityId={universityId}
        courseId={selectedCourse}
      />
    </>
  );
}

export default UniversityCourses;
