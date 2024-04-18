import Hero from "../components/HomePage/Hero.jsx";
import Countries from "../components/HomePage/Countries.jsx";
import AdvisorApplication from "../components/HomePage/AdvisorApplication";
import QualificationLevels from "../components/HomePage/QualificationLevels";
import AssistanceCards from "../components/HomePage/AssistanceCards.jsx";
import FeaturedUniversitiesSlider from "../components/HomePage/FeaturedUniversitiesSlider.jsx";
import FullScholarshipUniversitiesSlider from "../components/HomePage/FullScholarshipUniversitiesSlider.jsx";

const HomePage = () => {
  return (
    <div className="">
      <Hero />
      <div className="py-10 bg-primary">
        <Countries />
        <QualificationLevels />
      </div>
      <AssistanceCards />
      <AdvisorApplication />
      <FeaturedUniversitiesSlider />
      <FullScholarshipUniversitiesSlider />
    </div>
  );
};

export default HomePage;
