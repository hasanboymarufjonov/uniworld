import { useTranslation } from "react-i18next";
import Hero from "../components/pages/HomePage/Hero.jsx";
import Countries from "../components/pages/HomePage/Countries.jsx";
import QualificationLevels from "../components/pages/HomePage/QualificationLevels";
import AssistanceCards from "../components/pages/HomePage/AssistanceCards.jsx";
import CareerTools from "../components/pages/HomePage/CareerTools.jsx";
import UniversitySlider from "../components/pages/HomePage/UniversitySlider.jsx";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Hero />
      <Countries />
      <QualificationLevels />
      <CareerTools />
      <AssistanceCards />

      <UniversitySlider
        title={t("homepage_featured_universities_title")}
        fetchParams={{ is_featured: true }}
      />

      <UniversitySlider
        title={t("homepage_free_agency_universities_title")}
        fetchParams={{ full_scolarship: true }}
      />
    </div>
  );
};

export default HomePage;
