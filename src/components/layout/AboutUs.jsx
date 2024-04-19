import React, { useState, useEffect } from "react";
import BASE_URL from "../../config.js";
import HtmlContentRenderer from "../shared/HtmlContentRenderer.jsx";

const AboutUs = () => {
  const [aboutUsContent, setAboutUsContent] = useState({
    findUniversity: "",
    ourServices: "",
    cardTitle: "",
    cardBody: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutUsContent = async () => {
      try {
        const response = await fetch(`${BASE_URL}/common/about-us/`);
        const data = await response.json();
        setAboutUsContent({
          findUniversity: data.find_university,
          ourServices: data.our_services,
          cardTitle: data.card_title || "",
          cardBody: data.card_body || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching about us content: ", error);
      }
    };

    fetchAboutUsContent();
  }, []);

  return (
    <div className="bg-primary">
      <div className="max-w-7xl mx-auto p-4">
        {/* <h1 className="text-3xl font-semibold mb-4">About Us</h1> */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="md:flex items-center justify-between  rounded-lg w-full p-8">
              <div className="mb-8 mr-8">
                <p className="bg-white w-fit text-xs md:text-sm rounded-xl border border-gray-700 text-gray-700 p-1">
                  Search, compare and apply to universities in the World{" "}
                </p>
                <h2 className="text-4xl md:text-5xl font-semibold mb-2 mt-2">
                  Find the Right University
                </h2>
                <p className="text-base text-gray-700">
                  <HtmlContentRenderer
                    htmlContent={aboutUsContent.findUniversity}
                  />
                </p>
              </div>

              {/* Right side with images */}
              <div className="flex">
                <div className="mt-40 mr-5">
                  <img
                    src="https://via.placeholder.com/150x250"
                    alt="University Image 1"
                    className="rounded-lg"
                  />
                </div>
                {/* Place the first two images together */}
                <div className="mt-20">
                  <div className="mb-4">
                    <img
                      src="https://via.placeholder.com/150x250"
                      alt="University Image 1"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <img
                      src="https://via.placeholder.com/150x250"
                      alt="University Image 2"
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="ml-5">
                  <div className="mb-4">
                    <img
                      src="https://via.placeholder.com/150x250"
                      alt="University Image 3"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <img
                      src="https://via.placeholder.com/150x250"
                      alt="University Image 4"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4 p-8">
              <h2 className="text-4xl font-semibold ">Our Services</h2>
              <p className="m-8">
                <HtmlContentRenderer htmlContent={aboutUsContent.ourServices} />{" "}
              </p>
            </div>
            {aboutUsContent.cardTitle && aboutUsContent.cardBody && (
              <div className="rounded-lg p-20 bg-[#111827] text-white">
                <h2 className="text-xl md:text-4xl font-semibold mb-2 text-center">
                  {aboutUsContent.cardTitle}
                </h2>
                <p className="text-[#D1D5DB] md:px-28 text-center pt-5 text-base md:text-xl">
                  {" "}
                  <HtmlContentRenderer htmlContent={aboutUsContent.cardBody} />
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
