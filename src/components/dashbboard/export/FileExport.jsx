/* eslint-disable react/prop-types */
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import PDFViewer from "./PdfViewer"; // Import the PDFViewer component

function FileExport({ handleExport, pdfData }) {
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
