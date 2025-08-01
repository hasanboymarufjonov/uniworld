import Hero from "../components/pages/HomePage/Hero.jsx";
import Countries from "../components/pages/HomePage/Countries.jsx";
import AdvisorApplication from "../components/pages/HomePage/AdvisorApplication";
import QualificationLevels from "../components/pages/HomePage/QualificationLevels";
import AssistanceCards from "../components/pages/HomePage/AssistanceCards.jsx";
import FeaturedUniversitiesSlider from "../components/pages/HomePage/FeaturedUniversitiesSlider.jsx";
import FullScholarshipUniversitiesSlider from "../components/pages/HomePage/FullScholarshipUniversitiesSlider.jsx";
import CareerCompass from "../components/pages/HomePage/CareerCompass.jsx";
import EligibilityCheck from "../components/pages/HomePage/EligibilityCheck.jsx";
import CareerTools from "../components/pages/HomePage/CareerTools.jsx";
import UniversitySlider from "../components/pages/HomePage/UniversitySlider.jsx";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Countries />
      <QualificationLevels />
      <CareerTools />
      <AssistanceCards />
      {/* <AdvisorApplication /> */}
      {/* <CareerCompass /> */}
      {/* <EligibilityCheck /> */}

      <UniversitySlider
        title="Featured Universities"
        fetchParams={{ is_featured: true }}
      />

      <UniversitySlider
        title="Free Agency Service Universities"
        fetchParams={{ full_scolarship: true }}
      />
      {/* <FeaturedUniversitiesSlider />
      <FullScholarshipUniversitiesSlider /> */}
    </div>
  );
};

export default HomePage;
