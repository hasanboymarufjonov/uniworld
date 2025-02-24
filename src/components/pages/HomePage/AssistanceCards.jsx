import visaImg from "../../../assets/images/illustrations/visa.png";
import applicationImg from "../../../assets/images/illustrations/guidance.png";
import matchImg from "../../../assets/images/illustrations/operator.png";

import { useTranslation } from "react-i18next";

const AssistanceCards = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-primary px-5 py-5">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl pt-10">
          {t("How our partner agencies can help you")}
        </h2>
        <p className="text-base mt-1">
          {t(
            "Our partner advisors are ready to support you every step of the way on your study abroad journey"
          )}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 md:mx-32 py-10">
        {[
          {
            img: visaImg,
            title: t("Visa & Travel Advice"),
            text: t(
              "Get help after application, all the way to your first day at university."
            ),
          },
          {
            img: matchImg,
            title: t("Application Guidance"),
            text: t(
              "We'll get you to the right place to start your application."
            ),
          },
          {
            img: applicationImg,
            title: t("Find Your Best Matches"),
            text: t(
              "See programs that best match your eligibility and aspirations."
            ),
          },
        ].map((item, index) => (
          <div key={index} className="flex flex-col md:flex-col lg:flex-col">
            <div className="flex flex-row-reverse md:flex-col lg:flex-col items-center">
              <img
                className="w-1/3 md:w-full h-[100px] md:h-[300px] object-cover"
                src={item.img}
                alt={item.title}
              />
              <div className="p-4 md:p-5 w-2/3 md:w-full order-first md:order-none">
                <h3 className="text-lg font-bold text-gray-800">
                  {item.title}
                </h3>
                <p className="mt-1 text-gray-700">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssistanceCards;
