import { useTranslation } from "react-i18next";
import ukFlag from "../../assets/language/uk.png"
import uzFlag from "../../assets/language/uz.png"

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    i18n.changeLanguage(lang);

    // window.location.reload();
  };

  return (
    <select
      onChange={handleLanguageChange}
      defaultValue={i18n.language}
      className="rounded w-18 h-10 p-2 text-gray-900 border border-gray-400 bg-primary"
    >
    
      <option value="en">{t("En")}</option>
      <option value="uz">{t("Uz")} </option>
    </select>

  );
}

export default LanguageSwitcher;



