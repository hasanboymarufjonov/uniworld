import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import api from "../../app/api";
import HtmlContentRenderer from "../shared/HtmlContentRenderer.jsx";

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await api.get("/common/privacy-policy/");
        setPolicy(response.data.policy);
      } catch (error) {
        console.error("Error fetching privacy policy: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {loading ? (
        <p>{t("loading")}</p>
      ) : (
        <HtmlContentRenderer htmlContent={policy} />
      )}
    </div>
  );
};

export default PrivacyPolicy;
