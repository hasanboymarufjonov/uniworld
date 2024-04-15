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
    <div className="min-h-[calc(100vh-220px)] bg-[#DFDFEC] -mt-4 py-10 px-4">
      <div className="flex justify-center my-4">
        <button
          className={`mx-2 px-4 py-2 ${
            showOverview ? "border-b-4 border-secondary" : ""
          }`}
          onClick={handleShowOverview}
        >
          Overview
        </button>
        <button
          className={`mx-2 px-4 py-2 ${
            showOverview ? "" : "border-b-4 border-secondary"
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

// import React, { useState } from "react";
// import { useParams, Outlet, Link } from "react-router-dom";

// const UniversityPage = () => {
//   const { universityName } = useParams();
//   const [showOverview, setShowOverview] = useState(true);

//   const handleShowOverview = () => {
//     setShowOverview(true);
//   };

//   const handleShowCourses = () => {
//     setShowOverview(false);
//   };

//   return (
//     <div className="min-h-[calc(100vh-220px)] bg-[#DFDFEC] -mt-4 py-10 px-4">
//       <div className="flex justify-center my-4">
//         <Link
//           to={`/universities/${universityName}/overview`}
//           className={`mx-2 px-4 py-2 ${
//             showOverview ? "border-b-4 border-secondary" : ""
//           }`}
//           onClick={handleShowOverview}
//         >
//           Overview
//         </Link>
//         <Link
//           to={`/universities/${universityName}/courses`}
//           className={`mx-2 px-4 py-2 ${
//             showOverview ? "" : "border-b-4 border-secondary"
//           }`}
//           onClick={handleShowCourses}
//         >
//           Courses
//         </Link>
//       </div>
//       <Outlet />
//     </div>
//   );
// };

// export default UniversityPage;
