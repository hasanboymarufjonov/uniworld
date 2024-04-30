import visaImg from "../../assets/Visa&Travel Advice.png";
import applicationImg from "../../assets/Applicaiton guidance.png";
import matchImg from "../../assets/operator.png";

import { useTranslation } from "react-i18next";

const AssistanceCards = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-primary px-8">
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

      <div className="grid md:grid-cols-3 gap-10 md:mx-32  py-10">
        <a class="flex flex-col" href="#">
          <img
            class="w-full h-[300px] object-cover"
            src={visaImg}
            alt="Image Description"
          />
          <div class="p-4 md:p-5">
            <h3 class="text-lg font-bold text-gray-800">
              {t("Visa & Travel Advice")}
            </h3>
            <p class="mt-1 text-gray-500">
              {t(
                "Get help after application, all the way to your first day at university."
              )}
            </p>
          </div>
        </a>

        <a class="flex flex-col " href="#">
          <img
            class="w-full h-[300px] object-cover"
            src={matchImg}
            alt="Image Description"
          />
          <div class="p-4 md:p-5">
            <h3 class="text-lg font-bold text-gray-800">
              {t("Application Guidance")}
            </h3>
            <p class="mt-1 text-gray-500">
              {t("We'll get you to the right place to start your application.")}
            </p>
          </div>
        </a>
        <a class="flex flex-col" href="#">
          <img
            class="w-full h-[300px] object-cover"
            src={applicationImg}
            alt="Image Description"
          />
          <div class="p-4 md:p-5">
            <h3 class="text-lg font-bold text-gray-800">
              {t("Find your best matches")}
            </h3>
            <p class="mt-1 text-gray-500">
              {t(
                "See programs that best match your eligibility and aspirations."
              )}
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default AssistanceCards;
