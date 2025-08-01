import { useTranslation } from "react-i18next";
import UniversityList from "../components/pages/SearchPage/UniversityList.jsx";

const SearchPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-center text-3xl pt-10">{t("search_page_title")}</h2>
      <UniversityList />
    </div>
  );
};

export default SearchPage;
