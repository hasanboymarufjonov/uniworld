import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../../app/api";
import SliderSkeleton from "./SliderSkeleton ";

function FullScholarshipUniversitiesSlider() {
  const { t } = useTranslation();
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get(`/universities/list/`, {
          signal: controller.signal,
          params: {
            full_scolarship: true,
          },
        });
        setUniversities(response.data.results);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError(t("Failed to load universities. Please try again later."));
          console.error("Error fetching full scholarship universities:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [t]);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const renderContent = () => {
    if (isLoading) return <SliderSkeleton />;
    if (error)
      return <p className="text-center text-red-300 mt-10 text-lg">{error}</p>;
    if (universities.length === 0)
      return (
        <p className="text-center text-gray-400 mt-10 text-lg">
          {t("No universities with free agency service found.")}
        </p>
      );

    return (
      <div
        ref={scrollContainerRef}
        role="region"
        aria-label={t("Free Agency Service Universities")}
        className="flex flex-nowrap gap-4 md:gap-6 w-full mt-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-secondary/60 scrollbar-track-primary/20 scrollbar-thumb-rounded-full"
      >
        {universities.map((uni) => (
          <UniversityCard key={uni.id} university={uni} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-16 bg-primary text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight border-l-4 border-secondary pl-4">
            {t("Free Agency Service Universities")}
          </h2>
          {!isLoading && !error && universities.length > 0 && (
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => handleScroll("left")}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                aria-label="Scroll left"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                aria-label="Scroll right"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default FullScholarshipUniversitiesSlider;
