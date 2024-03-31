const HtmlContentRenderer = ({ htmlContent }) => {
  return (
    <div
      className="prose mb-4"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    ></div>
  );
};

export default HtmlContentRenderer;
