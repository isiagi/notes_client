import { useState } from "react";
import { fileGenerationApi } from "../../../api/notes";
import FileExportz from "./FileExport";

function FileComponent() {
  const [pdfData, setPdfData] = useState(null);

  const handleExportFx = async (fileType, urlExtension) => {
    try {
      const responseType = fileType === "pdf" ? "arraybuffer" : "blob";

      const response = await fileGenerationApi(urlExtension, responseType);

      if (fileType === "pdf") {
        setPdfData(response.data); // Store the binary PDF data
      } else {
        // For CSV and Excel, trigger a file download
        const blob = new Blob([response.data], {
          type: `application/${fileType}`,
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Notes.${fileType}`;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <FileExportz handleExport={handleExportFx} pdfData={pdfData} />
    </div>
  );
}

export default FileComponent;
