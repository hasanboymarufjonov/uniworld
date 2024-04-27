import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import mainTranslations from "./translations/mainTranslations.json"

const translations = {
  en: {
    translation: {
      ...mainTranslations.en.translation,
    },
  },
  uz: {
    translation: {
      ...mainTranslations.uz.translation,
    },
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: translations,
  fallbackLng: "en",
  debug: true,
});

export default i18n;
