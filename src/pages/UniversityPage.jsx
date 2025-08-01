import { useParams, Outlet, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UniversityPage = () => {
  const { universityName } = useParams();
  const { t } = useTranslation();
  const location = useLocation();

  // This is a more reliable way to check the active tab
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="min-h-[calc(100vh-220px)] bg-[#DFDFEC] -mt-4 py-10 px-4">
      <div className="flex justify-center my-4">
        <Link
          to={`/universities/${universityName}/overview`}
          className={`mx-2 px-4 py-2 ${
            isActive("overview") ? "border-b-4 border-secondary" : ""
          }`}
        >
          {t("university_page_overview_link")}
        </Link>
        <Link
          to={`/universities/${universityName}/courses`}
          className={`mx-2 px-4 py-2 ${
            isActive("courses") ? "border-b-4 border-secondary" : ""
          }`}
        >
          {t("university_page_courses_link")}
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default UniversityPage;
