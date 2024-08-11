import UniversityList from "../components/pages/SearchPage/UniversityList.jsx";
import { useTranslation } from "react-i18next";

const SearchPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-center text-3xl pt-10">
        {t("2024 best universities Worldwide")}
      </h2>

      <UniversityList />
    </div>
  );
};

export default SearchPage;
