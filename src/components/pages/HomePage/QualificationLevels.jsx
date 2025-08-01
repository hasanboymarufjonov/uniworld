import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const QualificationLevels = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
          <div className="bg-white border shadow-sm rounded-xl p-4 flex justify-center items-center">
            <Link
              to={`/universities?country=&specialty=&qualification_level=diploma`}
              className="text-center"
            >
              {t("qualification_diploma")}
            </Link>
          </div>
          <div className="bg-white border shadow-sm rounded-xl p-4 flex justify-center items-center">
            <Link
              to={`/universities?country=&specialty=&qualification_level=bachelor`}
              className="text-center"
            >
              {t("qualification_bachelor")}
            </Link>{" "}
          </div>
          <div className="bg-white border shadow-sm rounded-xl p-4 flex justify-center items-center hidden lg:block text-center">
            <Link
              to={`/universities?country=&specialty=&qualification_level=master`}
              className="text-center"
            >
              {" "}
              {t("qualification_master")}{" "}
            </Link>{" "}
          </div>
        </div>
        <div className="bg-white border shadow-sm rounded-xl p-4 flex justify-center items-center mt-2 lg:hidden">
          <Link
            to={`/universities?country=&specialty=&qualification_level=master`}
            className="text-center"
          >
            {t("qualification_master")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QualificationLevels;
