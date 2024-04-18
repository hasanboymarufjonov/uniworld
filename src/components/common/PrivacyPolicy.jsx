import React, { useState, useEffect } from "react";
import BASE_URL from "../../config.js";

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
      } catch (error) {
        console.error("Error fetching privacy policy: ", error);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="prose" dangerouslySetInnerHTML={{ __html: policy }} />
      )}
    </div>
  );
};

export default PrivacyPolicy;
