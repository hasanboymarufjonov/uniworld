import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiArrowRight } from "react-icons/hi";
import Modal from "./Modal";
import EligibilityCheck from "./EligibilityCheck";
import AdvisorApplication from "./AdvisorApplication";
import matcherImg from "../../../assets/images/illustrations/matcher.png";
import advisorImg from "../../../assets/images/illustrations/advisor.png";
import compassImg from "../../../assets/images/illustrations/compas.png";

const toolsData = [
  {
    id: "matcher",
    nameKey: "career_tools_matcher_title",
    descriptionKey: "career_tools_matcher_desc",
    image: matcherImg,
  },
  {
    id: "advisor",
    nameKey: "career_tools_advisor_title",
    descriptionKey: "career_tools_advisor_desc",
    image: advisorImg,
  },
  {
    id: "compass",
    nameKey: "career_tools_compass_title",
    descriptionKey: "career_tools_compass_desc",
    image: compassImg,
  },
];

const CareerTools = () => {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (toolId) => {
    if (toolId === "matcher") setActiveModal("eligibility");
    else if (toolId === "advisor") setActiveModal("advisor");
    else if (toolId === "compass") navigate("/career-compass");
  };

  const closeModal = () => setActiveModal(null);

  return (
    <div className="bg-primary py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            {t("career_tools_section_title")}
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {t("career_tools_section_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {toolsData.map((tool) => (
            <article
              key={tool.id}
              onClick={() => handleCardClick(tool.id)}
              className="group bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer flex flex-col"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={tool.image}
                  alt={t(tool.nameKey)}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-heading text-2xl font-bold text-gray-900">
                  {t(tool.nameKey)}
                </h3>
                <p className="font-sans text-gray-600 mt-2 flex-grow">
                  {t(tool.descriptionKey)}
                </p>
                <div className="mt-4 text-right">
                  <HiArrowRight className="inline-block text-secondary opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in-out h-6 w-6" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Modal isOpen={activeModal === "eligibility"} onClose={closeModal}>
        <h2 className="font-heading text-2xl font-bold mb-2">
          {t("career_tools_matcher_title")}
        </h2>
        <p className="font-sans mb-6 text-gray-600">
          {t("career_tools_matcher_desc")}
        </p>
        <EligibilityCheck onClose={closeModal} />
      </Modal>

      <Modal isOpen={activeModal === "advisor"} onClose={closeModal}>
        <h2 className="font-heading text-2xl font-bold mb-2">
          {t("career_tools_advisor_title")}
        </h2>
        <p className="font-sans mb-6 text-gray-600">
          {t("career_tools_advisor_desc")}
        </p>
        <AdvisorApplication onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default CareerTools;
