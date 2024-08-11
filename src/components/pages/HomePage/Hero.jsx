import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import capImg from "../../../assets/images/illustrations/cap.webp";
import person1Img from "../../../assets/images/illustrations/person1.png";
import person2Img from "../../../assets/images/illustrations/person2.png";
import person3Img from "../../../assets/images/illustrations/person3.png";

const Hero = () => {
  const { t } = useTranslation();

  return (
      <section className="bg-primary relative overflow-hidden">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="text-center mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-[88px] mt-5">
              {t("Find The")}
            </h2>

            <div className="flex justify-center items-center mt-8">
              <h2 className="font-semibold text-4xl md:text-5xl lg:text-[88px] ml-2">
                {t("Right")}
              </h2>
              <img
                  src={capImg}
                  alt="Cap"
                  className="w-12 md:w-16 lg:w-32 ml-4"
              />
              <h2 className="font-semibold text-4xl md:text-5xl lg:text-[88px] ml-2">
                {t("University")}
              </h2>
            </div>

            <div className="lg:flex lg:justify-center items-center mt-8">
              <div className="flex items-center">
                <h2 className="text-4xl md:text-5xl lg:text-[88px] md:ml-2 ml-10">
                  {t("For You")}
                </h2>
                <div className="flex ml-4 space-x-[-16px]">
                  <img src={person1Img} alt="Person 1" className="w-12 md:w-16 lg:w-24" />
                  <img src={person2Img} alt="Person 2" className="w-12 md:w-16 lg:w-24" />
                  <img src={person3Img} alt="Person 3" className="w-12 md:w-16 lg:w-24" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-[88px] ml-2 md:mt-0 mt-8">
                {t("Worldwide")}
              </h2>
            </div>

            <Link to="/universities">
              <button className="bg-secondary text-white px-20 py-2 rounded-md text-xl mt-10 hover:opacity-90">
                {t("Universities")}
              </button>
            </Link>
          </div>
        </div>
      </section>
  );
};

export default Hero;
