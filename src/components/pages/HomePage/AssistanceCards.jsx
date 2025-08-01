import { useTranslation } from "react-i18next";
import visaImg from "../../../assets/images/illustrations/visa.png";
import applicationImg from "../../../assets/images/illustrations/guidance.png";
import matchImg from "../../../assets/images/illustrations/operator.png";

const AssistanceCards = () => {
  const { t } = useTranslation();

  const assistanceData = [
    {
      img: visaImg,
      titleKey: "assistance_cards_visa_title",
      textKey: "assistance_cards_visa_desc",
    },
    {
      img: matchImg,
      titleKey: "assistance_cards_guidance_title",
      textKey: "assistance_cards_guidance_desc",
    },
    {
      img: applicationImg,
      titleKey: "assistance_cards_matcher_title",
      textKey: "assistance_cards_matcher_desc",
    },
  ];

  return (
    <div className="bg-primary px-5 py-5">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl pt-10">
          {t("assistance_section_title")}
        </h2>
        <p className="text-base mt-1">{t("assistance_section_subtitle")}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 md:mx-32 py-10">
        {assistanceData.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-col lg:flex-col">
            <div className="flex flex-row-reverse md:flex-col lg:flex-col items-center">
              <img
                className="w-1/3 md:w-full h-[100px] md:h-[300px] object-cover"
                src={item.img}
                alt={t(item.titleKey)}
              />
              <div className="p-4 md:p-5 w-2/3 md:w-full order-first md:order-none">
                <h3 className="text-lg font-bold text-gray-800">
                  {t(item.titleKey)}
                </h3>
                <p className="mt-1 text-gray-700">{t(item.textKey)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssistanceCards;
