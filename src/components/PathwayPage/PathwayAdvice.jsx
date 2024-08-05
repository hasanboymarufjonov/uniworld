import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../config";
import HtmlContentRenderer from "../shared/HtmlContentRenderer";

const PathwayAdvice = () => {
  const { pathway } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/article/${pathway}/detail/`)
      .then((response) => {
        setArticle(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching article details:", error);
        setLoading(false);
      });
  }, [pathway]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen">
        Article not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 min-h-[450px]">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mt-4">
        Published at: {new Date(article.published_at).toLocaleDateString()}
      </p>
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-auto mb-4"
        />
      )}
      <HtmlContentRenderer htmlContent={article.content} />
    </div>
  );
};

export default PathwayAdvice;
