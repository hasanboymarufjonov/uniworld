import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import api from "../../app/api.js";
import HtmlContentRenderer from "../shared/HtmlContentRenderer.jsx";

const TermsAndConditions = () => {
  const [terms, setTerms] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await api.get("/common/terms-and-conditions/");
        setTerms(response.data.terms);
      } catch (error) {
        console.error("Error fetching terms and conditions: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {loading ? (
        <p>{t("loading")}</p>
      ) : (
        <HtmlContentRenderer htmlContent={terms} />
      )}
    </div>
  );
};

export default TermsAndConditions;
