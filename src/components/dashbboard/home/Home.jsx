import { Tag, Tooltip, message, Popconfirm, Result, Badge } from "antd";
import {
  EyeOutlined,
  BookOutlined,
  DeleteOutlined,
  EditOutlined,
  FolderOpenOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../context/Context";
import ViewModal from "../../viewModal/ViewModal";
import { Link } from "react-router-dom";
import { deleteNoteApi, getNotesApi } from "../../../api/notes";

import "./home.css";

const cancel = (e) => {
  console.log(e);
  message.error("Click on No");
};

function Home() {
  const [noteData, setnoteData] = useState([]);
  const [note, setNote] = useState({});
  const { setIsModalOpen } = useContext(ModalContext);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await getNotesApi();
        setnoteData(response.data);
      } catch (error) {
        console.log(error);
        setnoteData([]);
      }
    };

    fetchNote();
  }, []);

  console.log(noteData);

  const handleMenuClick = (id) => {
    setIsModalOpen(true);

    const noteObj = noteData.filter((note) => note.id === id);
    setNote(noteObj);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteNoteApi(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const priorityColor = (priority) => {
    return priority === "High"
      ? "green"
      : priority === "Moderate"
      ? "purple"
      : "orange";
  };

  const okButtonProps = {
    style: {
      background: "#0F4C81", // Your desired background color (e.g., Classic Blue)
      color: "white", // Text color for contrast
    },
  };

  return (
    <div>
      <h4 className="text-lg text-[#10826E] mb-4">Your Notes</h4>
      <div className="grid md:grid-cols-fluid grid-cols-flud gap-6">
        {noteData?.length === 0 || !noteData ? (
          <Result
            icon={<FolderOpenOutlined />}
            status="warning"
            title="No Notes Found"
            subTitle="Please create notes!"
          />
        ) : (
          noteData?.map(
            ({ category, description, title, priority, id, due_date }) => (
              <div
                key={id}
                className={`border-[1px] md:p-4 p-3 flex flex-col shadow-sm relative overflow-hidden`}
              >
                <div className="flex justify-between">
                  <BookOutlined
                    style={{
                      fontSize: "1.6rem",
                      color: priorityColor(priority),
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <Badge
                      key={id}
                      color={priorityColor(priority)}
                      text={priority}
                    />
                    <Tooltip placement="topLeft" title={"View Note"}>
                      <EyeOutlined
                        onClick={() => handleMenuClick(id)}
                        className="text-[#000] text-xl "
                      />
                    </Tooltip>
                  </div>
                  <ViewModal data={note} />
                </div>
                <h4 className="text-base text-slate-600 pt-3">
                  {title.toUpperCase()}
                </h4>
                <p className="text-slate-500 pb-11 pt-3">{description}</p>
                <div className="absolute bottom-2  w-[90%]">
                  <div className="flex justify-between items-center py-2  ">
                    <div className="flex">
                      <Tag color="success">{category}</Tag>
                      <div>
                        <CalendarOutlined />
                        {due_date}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Popconfirm
                        title="Delete the task"
                        placement="leftBottom"
                        description="Are you sure to delete this task?"
                        onConfirm={() => handleDelete(id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={okButtonProps}
                      >
                        <DeleteOutlined
                          className="text-red-500 text-lg"
                          // onClick={() => handleDelete(id)}
                        />
                      </Popconfirm>
                      <Tooltip placement="topRight" title={"Edit Note"}>
                        <Link to={`/home/edit-note/${id}`}>
                          <EditOutlined className="text-[#10826E] text-lg" />
                        </Link>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default Home;
