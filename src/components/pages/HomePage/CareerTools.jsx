import matcherImg from "../../../assets/images/illustrations/matcher.png";
import advisorImg from "../../../assets/images/illustrations/advisor.png";
import compassImg from "../../../assets/images/illustrations/compas.png";

import { useState } from "react";
import EligibilityCheck from "./EligibilityCheck";
import AdvisorApplication from "./AdvisorApplication";

const CareerTools = () => {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  const handleOpenEligibilityModal = () => {
    setIsEligibilityOpen(true);
  };

  const handleCloseEligibilityModal = () => {
    setIsEligibilityOpen(false);
  };

  const handleOpenAdvisorModal = () => {
    setIsAdvisorOpen(true);
  };

  const handleCloseAdvisorModal = () => {
    setIsAdvisorOpen(false);
  };

  const tools = [
    {
      name: "Matcher",
      description:
        "Find the universities & programs that best match your profile with the help of AI",
      image: matcherImg,
      onClick: handleOpenEligibilityModal,
    },
    {
      name: "Speak to Advisor",
      description: "Get free consultation, just leave your contacts",
      image: advisorImg,
      onClick: handleOpenAdvisorModal,
    },
    {
      name: "Career Compass",
      description: "Pick your passion, we will find the path for you",
      image: compassImg,
    },
  ];

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl w-full">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-800 text-2xl"
          >
            &#10005;
          </button>
          <div>{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:px-28 md:pt-10">
      {tools.map((tool, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          onClick={tool.onClick}
        >
          <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
          <p className="text-gray-600">{tool.description}</p>
          <img
            src={tool.image}
            alt={tool.name}
            className="w-full h-40 object-cover rounded-lg my-4"
          />
        </div>
      ))}

      <Modal isOpen={isEligibilityOpen} onClose={handleCloseEligibilityModal}>
        <h2 className="text-2xl font-bold mb-4">Eligibility Check</h2>
        <EligibilityCheck onClose={handleCloseEligibilityModal} />
      </Modal>

      <Modal isOpen={isAdvisorOpen} onClose={handleCloseAdvisorModal}>
        <h2 className="text-2xl font-bold mb-4">Speak to the advisor</h2>
        <AdvisorApplication onClose={handleCloseAdvisorModal} />
      </Modal>
    </div>
  );
};

export default CareerTools;
