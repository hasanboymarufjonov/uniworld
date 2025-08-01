import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import graduationCapImg from "../../../assets/images/illustrations/cap.webp";
import person1Img from "../../../assets/images/illustrations/person1.png";
import person2Img from "../../../assets/images/illustrations/person2.png";
import person3Img from "../../../assets/images/illustrations/person3.png";

const personImages = [
  { src: person1Img, alt: "A smiling student" },
  { src: person2Img, alt: "A student with glasses" },
  { src: person3Img, alt: "A student looking forward" },
];

const headingTextClasses = "text-4xl md:text-5xl lg:text-[88px]";
const boldHeadingTextClasses = `${headingTextClasses} font-semibold`;

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-primary relative overflow-hidden">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="text-center">
          <h1>
            <span className={headingTextClasses}>{t("hero_title_part1")}</span>
            <div className="flex justify-center items-center mt-3">
              <span className={boldHeadingTextClasses}>
                {t("hero_title_part2")}
              </span>
              <img
                src={graduationCapImg}
                alt=""
                aria-hidden="true"
                className="w-12 md:w-16 lg:w-32 mx-4"
              />
              <span className={boldHeadingTextClasses}>
                {t("hero_title_part3")}
              </span>
            </div>
            <div className="flex flex-wrap justify-center items-center mt-3">
              <span className={headingTextClasses}>
                {t("hero_title_part4")}
              </span>

              <div className="flex ml-4 space-x-[-16px]">
                {personImages.map((person, index) => (
                  <img
                    key={index}
                    src={person.src}
                    alt={person.alt}
                    aria-hidden="true"
                    className="w-12 md:w-16 lg:w-24"
                  />
                ))}
              </div>
              <span className={`${headingTextClasses} ml-4`}>
                {t("hero_subtitle")}
              </span>
            </div>
          </h1>

          <Link to="/universities">
            <button className="bg-secondary text-white px-20 py-2 rounded-lg text-xl mt-10 hover:opacity-90 transition-opacity">
              {t("universities_link")}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
