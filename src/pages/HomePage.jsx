import Hero from "../components/Hero";
// import Countries from "../components/Countries";
import AssistanceCards from "../components/AssistanceCards";
import FeaturedUniversitiesSlider from "../components/FeaturedUniversitiesSlider";
import FullScholarshipUniversitiesSlider from "../components/FullScholarshipUniversitiesSlider";

const HomePage = () => {
  return (
    <div className="">
      <Hero />
      {/* <Countries /> */}
      <AssistanceCards />
      <FeaturedUniversitiesSlider />
      <FullScholarshipUniversitiesSlider />
    </div>
  );
};

export default HomePage;
