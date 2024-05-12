import UniversityList from "../components/SearchPage/UniversityList.jsx";
import { useTranslation } from "react-i18next";

const SearchPage = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-primary">
      <h2 className="text-center text-3xl pt-10">
        {t("2024 best universities Worldwide")}
      </h2>

      <UniversityList />
    </div>
  );
};

export default SearchPage;
