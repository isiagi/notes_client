/* eslint-disable react/prop-types */
import { Button, Result } from "antd";
import { DownloadOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import PDFViewer from "./PdfViewer"; // Import the PDFViewer component

function FileExport({ handleExport, pdfData }) {
  return (
    <div>
      <h2 className="text-lg text-[#10826E] mb-4">
        Choose File Format To Download
      </h2>
      <div className="flex gap-5 mb-2 flex-wrap">
        <Button
          className="bg-blue-600"
          type="primary"
          icon={<DownloadOutlined />}
          size={"large"}
          onClick={() => handleExport("pdf", "pdf")} // Handle PDF download
        >
          View & Download PDF
        </Button>
        <Button
          className="bg-blue-600"
          type="primary"
          icon={<DownloadOutlined />}
          size={"large"}
          onClick={() => handleExport("csv", "csv")} // Handle CSV download
        >
          Download CSV
        </Button>
        <Button
          className="bg-blue-600"
          type="primary"
          icon={<DownloadOutlined />}
          size={"large"}
          onClick={() => handleExport("xlsx", "excel")} // Handle Excel download
        >
          Download Excel
        </Button>
      </div>
      {!pdfData && (
        <Result
          status={"info"}
          icon={<CloudDownloadOutlined />}
          title="Use Bottons above to download files"
          className="text-[#10826E]"
        />
      )}
      {pdfData && <PDFViewer responseData={pdfData} />}
    </div>
  );
}

export default FileExport;
