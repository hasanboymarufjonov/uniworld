import { useParams, Outlet, Link } from "react-router-dom";

const UniversityPage = () => {
  const { universityName } = useParams();

  const url = window.location.href;

  const urlAfterUniversity = url.split(`${universityName}/`)[1];

  const firstWordAfterUniversityName = urlAfterUniversity.split("?")[0];

  return (
    <div className="min-h-[calc(100vh-220px)] bg-[#DFDFEC] -mt-4 py-10 px-4">
      <div className="flex justify-center my-4">
        <Link
          to={`/universities/${universityName}/overview`}
          className={`mx-2 px-4 py-2 ${
            firstWordAfterUniversityName === "overview"
              ? "border-b-4 border-secondary" 
              : ""
          }`}
        >
          Overview
        </Link>
        <Link
          to={`/universities/${universityName}/courses`}
          className={`mx-2 px-4 py-2 ${
            firstWordAfterUniversityName === "courses"
              ? "border-b-4 border-secondary"
              : ""
          }`}
        >
          Courses
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default UniversityPage;
