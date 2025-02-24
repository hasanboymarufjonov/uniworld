import matcherImg from "../../../assets/images/illustrations/matcher.png";
import advisorImg from "../../../assets/images/illustrations/advisor.png";
import compassImg from "../../../assets/images/illustrations/compas.png";

import { useState } from "react";
import EligibilityCheck from "./EligibilityCheck";

const CareerTools = () => {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);

  const handleOpenModal = () => {
    setIsEligibilityOpen(true);
  };

  const handleCloseModal = () => {
    setIsEligibilityOpen(false);
  };

  const tools = [
    {
      name: "Matcher",
      description:
        "Find the universities & programs that best match your profile with the help of AI",
      image: matcherImg,
      onClick: handleOpenModal,
    },
    {
      name: "Speak to Advisor",
      description: "Get free consultation  just leave your contacts",
      image: advisorImg,
    },
    {
      name: "Career Compass",
      description: "Pick your passino, we will find the path for you",
      image: compassImg,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:px-28 md:pt-10">
      {tools.map((tool, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl transition-shadow duration-300"
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
    </div>
  );
};

export default CareerTools;
