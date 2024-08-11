import { useState, useEffect } from "react";
import api from "../../app/api";

const TermsAndConditions = () => {
  const [terms, setTerms] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await api.get("/common/terms-and-conditions/");
        setTerms(response.data.terms);
        setLoading(false);
        console.log(response.data.terms);
      } catch (error) {
        console.error("Error fetching terms and conditions: ", error);
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Terms and Conditions</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: terms }} />
      )}
    </div>
  );
};

export default TermsAndConditions;
