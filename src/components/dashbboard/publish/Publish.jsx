import { Button, Result } from "antd";
import { SendOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import { getNotesApi, publishApi } from "../../../api/notes";
import { Link } from "react-router-dom";

function Publish() {
  const [loading, setloading] = useState(false);
  const [sent, setSent] = useState("pending");
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
          icon={<SendOutlined />}
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

  const handlePublish = async () => {
    try {
      setloading(true);
      const response = await publishApi();
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
      <h2 className="text-lg text-[#10826E] mb-4">
        Publish Your Notes To Your Email
      </h2>

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
          icon={<SendOutlined />}
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
