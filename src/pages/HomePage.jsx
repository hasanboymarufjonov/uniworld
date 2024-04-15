import Hero from "../components/Hero";
import Countries from "../components/Countries";
import AdvisorApplication from "../components/HomePage/AdvisorApplication";
import QualificationLevels from "../components/HomePage/QualificationLevels";
import AssistanceCards from "../components/AssistanceCards";
import FeaturedUniversitiesSlider from "../components/FeaturedUniversitiesSlider";
import FullScholarshipUniversitiesSlider from "../components/FullScholarshipUniversitiesSlider";

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
