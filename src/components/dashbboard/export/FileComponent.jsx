import { useState } from "react";
import { fileGenerationApi, getNotesApi } from "../../../api/notes";
import FileExportz from "./FileExport";
import { Button, Result } from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function FileComponent() {
  const [pdfData, setPdfData] = useState(null);
  const [noteData, setNoteData] = useState(true);

  getNotesApi().then((response) => {
    if (response.data.length === 0) {
      setNoteData(false);
    }
  });

  if (!noteData) {
    return (
      <>
        <Result
          status={"error"}
          icon={<CloudDownloadOutlined />}
          title="You Current have No notes"
          className="text-[#10826E]"
          extra={
            <Link to="/home/create-notes">
              <Button type="primary" className="bg-blue-600">
                Create Note
              </Button>
            </Link>
          }
        />
      </>
    );
  }

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
