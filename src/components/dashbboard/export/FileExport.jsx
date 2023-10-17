import { useState } from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import instance from "../../../api";
import PDFViewer from "./PdfViewer"; // Import the PDFViewer component

function FileExport() {
  const [pdfData, setPdfData] = useState(null);

  const handleExport = async (fileType, urlExtension) => {
    try {
      const token = localStorage.getItem("notesToken");

      const responseType = fileType === "pdf" ? "arraybuffer" : "blob";

      const response = await instance.get(`/notes/generate_${urlExtension}`, {
        headers: { Authorization: `Token ${token}` },
        responseType, // Set responseType based on the file type
      });

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
      <h2>Choose File Format To Download</h2>
      <div className="flex gap-5 mb-2">
        <Button
          className="bg-blue-500"
          type="primary"
          icon={<DownloadOutlined />}
          size={"large"}
          onClick={() => handleExport("pdf", "pdf")} // Handle PDF download
        >
          View & Download PDF
        </Button>
        <Button
          className="bg-blue-500"
          type="primary"
          icon={<DownloadOutlined />}
          size={"large"}
          onClick={() => handleExport("csv", "csv")} // Handle CSV download
        >
          Download CSV
        </Button>
        <Button
          className="bg-blue-500"
          type="primary"
          icon={<DownloadOutlined />}
          size={"large"}
          onClick={() => handleExport("xlsx", "excel")} // Handle Excel download
        >
          Download Excel
        </Button>
      </div>
      {pdfData && <PDFViewer responseData={pdfData} />}
    </div>
  );
}

export default FileExport;
