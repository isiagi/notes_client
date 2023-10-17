import { Button, Result } from "antd";
import { DownloadOutlined, MailOutlined } from "@ant-design/icons";
import instance from "../../../api";
import { useState } from "react";

function Publish() {
  const [loading, setloading] = useState(false);
  const [sent, setSent] = useState("pending");

  const handlePublish = async () => {
    const token = localStorage.getItem("notesToken");
    try {
      setloading(true);
      const response = await instance.post(
        "/notes/publish_pdf",
        {},
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      console.log("---r---", response);
      response.statusText === "OK" && setSent("ok");
    } catch (error) {
      console.log(error);
      setSent("failed");
    } finally {
      setloading(false);
    }
  };
  return (
    <div>
      <h2>Publish Your Notes To Your Email</h2>

      <p>{loading && "Publishing..."}</p>
      <section>
        {sent === "ok" && (
          <Result
            status="success"
            title="Successfully Sent"
            subTitle="PDF of your Notes has been successfully sent to your email"
          />
        )}
        {sent === "failed" && (
          <Result
            status="warning"
            title="There were some problems with your operation."
          />
        )}
        {sent === "pending" && (
          <Result
            icon={<MailOutlined />}
            title="Great, Send Copy Of Your Notes To Your Email!"
            subTitle="PDF copy of your notes to be sent to Email you signed up with."
          />
        )}
      </section>
      <div className="flex justify-center">
        <Button
          className="bg-blue-500 text-center"
          type="primary"
          icon={<DownloadOutlined />}
          size={"large"}
          onClick={handlePublish}
          disabled={loading}
          loading={loading}
        >
          Publish Notes
        </Button>
      </div>
    </div>
  );
}

export default Publish;
