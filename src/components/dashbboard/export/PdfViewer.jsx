import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function PdfViewer({ responseData }) {
  // eslint-disable-next-line no-unused-vars
  const [pdfBlob, setPdfBlob] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    // When the component mounts, convert the binary data to a Blob and create a URL.
    const blob = new Blob([responseData], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setPdfBlob(blob);
    setPdfUrl(url);

    // Revoke the URL when the component unmounts to free up memory.
    return () => URL.revokeObjectURL(url);
  }, [responseData]);

  return (
    <div>
      {pdfUrl && (
        <iframe src={pdfUrl} width="100%" height="500px" title="PDF Viewer" />
      )}
      {pdfUrl && (
        <a href={pdfUrl} download="Notes.pdf">
          Download PDF
        </a>
      )}
    </div>
  );
}

export default PdfViewer;
