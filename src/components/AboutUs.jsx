import React, { useState, useEffect } from "react";
import BASE_URL from "../config";
import HtmlContentRenderer from "./HtmlContentRenderer";

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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">About Us</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">
              Find the Right University
            </h2>
            <p>
              {" "}
              <HtmlContentRenderer
                htmlContent={aboutUsContent.findUniversity}
              />
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Our Services</h2>
            <p>
              <HtmlContentRenderer htmlContent={aboutUsContent.ourServices} />{" "}
            </p>
          </div>
          {aboutUsContent.cardTitle && aboutUsContent.cardBody && (
            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">
                {aboutUsContent.cardTitle}
              </h2>
              <p>
                {" "}
                <HtmlContentRenderer htmlContent={aboutUsContent.cardBody} />
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AboutUs;
