const HtmlContentRenderer = ({ htmlContent }) => {
  return (
    <div
      className="mb-4"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    ></div>
  );
};

export default HtmlContentRenderer;
