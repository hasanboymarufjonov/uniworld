import { useState, useEffect } from "react";
import api from "../../app/api";
import HtmlContentRenderer from "../shared/HtmlContentRenderer.jsx";

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await api.get("/common/privacy-policy/");
        setPolicy(response.data.policy);
        setLoading(false);
        console.log(response.data.policy);
      } catch (error) {
        console.error("Error fetching privacy policy: ", error);
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1> */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <HtmlContentRenderer htmlContent={policy} />
      )}
    </div>
  );
};

export default PrivacyPolicy;
