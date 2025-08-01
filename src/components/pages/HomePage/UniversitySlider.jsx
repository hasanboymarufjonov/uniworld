import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import api from "../../../app/api";
import Slider from "react-slick";
import UniversityCard from "./UniversityCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CustomArrow = (props) => {
  const { onClick, icon, disabled } = props;
  return (
    <button
      onClick={onClick}
      className={`w-9 h-9 flex items-center justify-center rounded-full bg-primary text-gray-700
      transition-colors duration-200 ease-in-out
      hover:bg-secondary hover:text-white
      focus:outline-none focus:ring-2 focus:ring-secondary/50
      ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

const UniversitySlider = ({ title, fetchParams }) => {
  const { t } = useTranslation();
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/universities/list/`, {
          signal: controller.signal,
          params: fetchParams,
        });
        setUniversities(response.data.results);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error(`Error fetching universities for ${title}:`, err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [fetchParams, title]);

  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: false,
    afterChange: (index) => setCurrentSlide(index),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1, dots: true },
      },
    ],
  };

  if (isLoading || !universities || universities.length === 0) {
    return null;
  }

  const isPrevDisabled = currentSlide === 0;
  const isNextDisabled =
    currentSlide >= universities.length - settings.slidesToShow;

  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 border-l-4 border-secondary pl-4">
            {t(title)}
          </h2>

          <div className="hidden lg:flex items-center gap-3">
            <CustomArrow
              onClick={() => sliderRef.current.slickPrev()}
              icon={<FaChevronLeft size={14} />}
              disabled={isPrevDisabled}
            />
            <CustomArrow
              onClick={() => sliderRef.current.slickNext()}
              icon={<FaChevronRight size={14} />}
              disabled={isNextDisabled}
            />
          </div>
        </div>

        <Slider ref={sliderRef} {...settings}>
          {universities.map((uni) => (
            <UniversityCard key={uni.id} university={uni} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default UniversitySlider;
