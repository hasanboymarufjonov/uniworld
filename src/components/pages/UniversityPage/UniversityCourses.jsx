import { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../../app/api";
import ApplyModal from "./ApplyModal.jsx";
import UniversityTitle from "./UniversityTitle.jsx";

function UniversityCourses() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { t } = useTranslation();

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
        const response = await api.get(
          `/universities/${universityName}/courses/`,
          {
            params: {
              specialty: selectedSubject,
              qualification_level: selectedQualification,
            },
          }
        );
        setCourses(response.data.results);
      } catch (error) {
        console.error("Error fetching university courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversityCourses();
  }, [universityName, selectedQualification, selectedSubject]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await api.get(`/universities/filters/`, {
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
    window.history.replaceState({}, "", `${location.pathname}?${queryParams}`);
  };

  const handleSubjectChange = (e) => {
    const subjectValue = e.target.value;
    setSelectedSubject(subjectValue);
    queryParams.set("specialty", subjectValue);
    window.history.replaceState({}, "", `${location.pathname}?${queryParams}`);
  };

  const formatLevel = (level, prefix) => {
    const key = `${prefix}_${level}`;
    const translation = t(key);
    return translation === key
      ? level.charAt(0).toUpperCase() + level.slice(1)
      : translation;
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <UniversityTitle
          slug={universityName}
          onUniversityIdChange={setUniversityId}
        />
        <h2 className="text-2xl font-semibold mb-4">
          {t("courses_offered_title")}
        </h2>
        <div className="flex justify-end mb-4 items-center">
          <p className="mr-2">{t("filter_by_label")}</p>
          <div className="pr-2">
            <select
              value={selectedQualification}
              onChange={handleQualificationChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">{t("filter_options_all")}</option>
              {qualifications.map((qualification) => (
                <option key={qualification} value={qualification}>
                  {formatLevel(qualification, "qualification_level")}
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
              <option value="">{t("filter_options_all")}</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {loading ? (
          <p>{t("loading")}</p>
        ) : (
          <ul>
            {courses.length === 0 ? (
              <p>{t("no_courses_available")}</p>
            ) : (
              courses.map((course) => (
                <li
                  key={course.id}
                  className="border-2 border-gray-100 rounded-xl bg-white p-4 mb-4"
                >
                  <h3 className="text-lg font-semibold">{course.name}</h3>
                  <div className="flex justify-between mt-2">
                    <div>
                      <h4 className="font-semibold text-secondary">
                        {t("course_duration_label")}
                      </h4>
                      <p>
                        {Number.isInteger(parseFloat(course.duration))
                          ? parseFloat(course.duration) % 1 === 0
                            ? parseFloat(course.duration)
                            : parseFloat(course.duration).toFixed(1)
                          : course.duration}{" "}
                        {t("years_text")}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary">
                        {t("course_study_type_label")}
                      </h4>
                      <p>{formatLevel(course.study_type, "study_type")}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary">
                        {t("course_tuition_fee_label")}
                      </h4>
                      <p>
                        $ {parseFloat(course.tuition_fee).toLocaleString()}{" "}
                        {t("per_year_text")}
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <p className="font-semibold text-secondary">
                      {t("course_intake_months_label")}
                    </p>
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
                    {t("apply_now_button")}
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
