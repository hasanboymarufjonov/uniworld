import React, { useState, useEffect } from "react";
import BASE_URL from "../../config.js";

const TermsAndConditions = () => {
  const [terms, setTerms] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/common/terms-and-conditions/`
        );
        const data = await response.json();
        setTerms(data.terms);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching terms and conditions: ", error);
      }
    };

    fetchTerms();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Terms and Conditions</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="prose" dangerouslySetInnerHTML={{ __html: terms }} />
      )}
    </div>
  );
};

export default TermsAndConditions;
