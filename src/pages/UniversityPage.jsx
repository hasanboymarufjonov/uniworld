import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UniversityOverview from "../components/UniversityOverview";
import UniversityCourses from "../components/UniversityCourses";

const UniversityPage = () => {
  const { universityName } = useParams();
  const [showOverview, setShowOverview] = useState(true);

  const handleShowOverview = () => {
    setShowOverview(true);
  };

  const handleShowCourses = () => {
    setShowOverview(false);
  };

  return (
    <div className="min-h-[calc(100vh-220px)] bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 -mt-4 py-10">
      <div className="flex justify-center my-4">
        <button
          className={`mx-2 px-4 py-2 rounded ${
            showOverview ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={handleShowOverview}
        >
          Overview
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded ${
            showOverview ? "bg-gray-200" : "bg-blue-500 text-white"
          }`}
          onClick={handleShowCourses}
        >
          Courses
        </button>
      </div>
      {showOverview ? (
        <UniversityOverview slug={universityName} />
      ) : (
        <UniversityCourses slug={universityName} />
      )}
    </div>
  );
};

export default UniversityPage;
