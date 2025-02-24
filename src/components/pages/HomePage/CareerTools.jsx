const CareerTools = () => {
  const tools = [
    {
      name: "Matcher",
      description:
        "Find the best career options tailored to your skills and interests.",
      image: "",
    },
    {
      name: "Speak to Advisor",
      description:
        "Get personalized guidance from career experts to navigate your path.",
      image: "/images/advisor.png",
    },
    {
      name: "Career Compass",
      description:
        "Discover your career direction with insights and suggestions.",
      image: "/images/compass.png",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {tools.map((tool, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={tool.image}
            alt={tool.name}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
          <p className="text-gray-600">{tool.description}</p>
          <button className="mt-4 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
            Explore
          </button>
        </div>
      ))}
    </div>
  );
};

export default CareerTools;
