import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../../app/api";
import HtmlContentRenderer from "../../shared/HtmlContentRenderer.jsx";

const PathwayAdvice = () => {
  const { pathway } = useParams();
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const response = await api.get(`/article/${pathway}/detail/`);
        setAdvice(response.data);
      } catch (error) {
        console.error("Error fetching advice details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvice();
  }, [pathway]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {t("loading")}
      </div>
    );
  }

  if (!advice) {
    return (
      <div className="flex justify-center items-center h-screen">
        {t("pathway_advice_not_found")}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 min-h-[450px]">
      <h1 className="text-3xl font-bold mb-4">{advice.title}</h1>
      {advice.image && (
        <img
          src={advice.image}
          alt={advice.title}
          className="w-full h-auto mb-4 rounded-lg shadow-md"
        />
      )}
      <HtmlContentRenderer htmlContent={advice.content} />
    </div>
  );
};

export default PathwayAdvice;
