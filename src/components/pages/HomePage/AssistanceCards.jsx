import visaImg from "../../../assets/images/illustrations/visa.png";
import applicationImg from "../../../assets/images/illustrations/guidance.png";
import matchImg from "../../../assets/images/illustrations/operator.png";

import { useTranslation } from "react-i18next";

const AssistanceCards = () => {
  const { t } = useTranslation();

  return (
      <div className="bg-primary px-8 py-5">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl pt-10">
            {t("How UniWorld Can Help You")}
          </h2>
          <p className="text-base mt-1">
            {t(
                "Our team of advisors is ready to support you at every step of your study abroad journey"
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:mx-32 py-10">
          <div className="flex flex-col">
            <img
                className="w-full h-[300px] object-cover"
                src={visaImg}
                alt="Visa & Travel Advice"
            />
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-800">
                {t("Visa & Travel Advice")}
              </h3>
              <p className="mt-1 text-gray-700">
                {t(
                    "Get help after application, all the way to your first day at university."
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <img
                className="w-full h-[300px] object-cover"
                src={matchImg}
                alt="Application Guidance"
            />
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-800">
                {t("Application Guidance")}
              </h3>
              <p className="mt-1 text-gray-700">
                {t("We'll get you to the right place to start your application.")}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <img
                className="w-full h-[300px] object-cover"
                src={applicationImg}
                alt="Find Your Best Matches"
            />
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-800">
                {t("Find Your Best Matches")}
              </h3>
              <p className="mt-1 text-gray-700">
                {t(
                    "See programs that best match your eligibility and aspirations."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AssistanceCards;
