import React, { useState, useEffect } from "react";
import BASE_URL from "../../config.js";
import HtmlContentRenderer from "../shared/HtmlContentRenderer.jsx";

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await fetch(`${BASE_URL}/common/privacy-policy/`);
        const data = await response.json();
        setPolicy(data.policy);
        setLoading(false);
        console.log(data.policy);
      } catch (error) {
        console.error("Error fetching privacy policy: ", error);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <HtmlContentRenderer htmlContent={policy} />
      )}
    </div>
  );
};

export default PrivacyPolicy;
