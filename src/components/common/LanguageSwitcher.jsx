import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    i18n.changeLanguage(lang);

    window.location.reload();
  };

  return (
    <select
      onChange={handleLanguageChange}
      defaultValue={i18n.language}
      className="rounded w-14 h-10 p-2 text-gray-900 border border-gray-400 bg-primary"
    >
      <option value="en">{t("En")}</option>
      <option value="uz">{t("Uz")}</option>
    </select>

    // <div
    //   className="max-w-[88rem] mr-3"
    //   onClick={handleLanguageChange}
    //   defaultValue={i18n.language}
    // >
    //   <button
    //     value="uz"
    //     onChange={handleLanguageChange}
    //     className={`rounded-full  border border-black float-right w-10 h-10 ml-2 ${
    //       i18n.language === "uz" ? "bg-white" : ""
    //     }`}
    //   >
    //     Uz
    //   </button>
    //   <button
    //     value="ru"
    //     onClick={handleLanguageChange}
    //     className={`rounded-full border-1 border border-black float-right w-10 h-10 ${
    //       i18n.language === "uz" ? "" : "bg-white"
    //     }`}
    //   >
    //     En
    //   </button>
    // </div>
  );
}

export default LanguageSwitcher;
