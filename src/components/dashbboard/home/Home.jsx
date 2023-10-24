import {
  Tag,
  Tooltip,
  message,
  Popconfirm,
  Result,
  Badge,
  Select,
  Spin,
  Alert,
  notification,
} from "antd";
import {
  EyeOutlined,
  BookOutlined,
  DeleteOutlined,
  EditOutlined,
  FolderOpenOutlined,
  CalendarOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../context/Context";
import ViewModal from "../../viewModal/ViewModal";
import { Link } from "react-router-dom";
import {
  deleteNoteApi,
  getNoteCompleted,
  getNoteOverDue,
  getNoteUnCompleted,
  getNotesApi,
  orderNoteAscendingPriority,
  sortNoteOld,
  sortNotelatest,
} from "../../../api/notes";

import "./home.css";
import { breakParagraphWithEllipsis } from "./breakParagraphWithEllipsis";

const cancel = (e) => {
  console.log(e);
  message.error("Click on No");
};

function Home() {
  const [noteData, setnoteData] = useState([]);
  const [note, setNote] = useState({});
  const { setIsModalOpen } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (msg, desc) => {
    api.open({
      message: msg,
      description: desc,
    });
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const response = await getNotesApi();
        setnoteData(response.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        openNotification(
          "Fetch Note was Unsuccessful! ",
          "Error Fetching Notes"
        );
        setnoteData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, []);

  console.log(noteData);

  const handleChange = async (value) => {
    console.log(`selected ${value}`);
    if (value === "due_date") {
      setLoading(true);
      const res = await getNoteOverDue();
      setnoteData(res.data);
      openNotification(
        "Over Dues Notes!",
        "Your current Over Dues Notes successful got !"
      );
      setLoading(false);
    }
    if (value === "completed") {
      setLoading(true);
      const res = await getNoteCompleted();
      setnoteData(res.data);
      openNotification(
        "Completed Notes!",
        "Your current Completed Notes successful got !"
      );
      setLoading(false);
    }
    if (value === "Uncompleted") {
      setLoading(true);
      const res = await getNoteUnCompleted();
      setnoteData(res.data);
      openNotification(
        "Uncompleted Notes!",
        "Your current Uncompleted Notes successful got !"
      );
      setLoading(false);
    }
    if (value === "latest") {
      setLoading(true);
      const res = await sortNotelatest();
      setnoteData(res.data);
      openNotification(
        "Sorted From Latest",
        "Your current have been Sorted From Latest"
      );
      setLoading(false);
    }
    if (value === "oldest") {
      setLoading(true);
      const res = await sortNoteOld();
      setnoteData(res.data);
      openNotification(
        "Sorted From Oldest",
        "Your current have been Sorted From Oldest"
      );
      setLoading(false);
    }
    if (value === "work") {
      setLoading(true);
      const res = await orderNoteAscendingPriority();
      setnoteData(res.data);
      openNotification(
        "Arranged in Ascending !",
        "Your current Notes have been Arranged in Ascending !"
      );
      setLoading(false);
    }
  };

  const handleMenuClick = (id) => {
    setIsModalOpen(true);

    const noteObj = noteData.filter((note) => note.id === id);
    setNote(noteObj);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteNoteApi(id);
      console.log(response);
      openNotification(
        "Delete Note was successful! ",
        "Note was successfully deleted"
      );
      // After a successful delete, update the state with the updated data
      const updatedData = noteData.filter((item) => item.id !== id);
      setnoteData(updatedData);
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
      {contextHolder}
      <div className="flex justify-between">
        <h4 className="text-lg text-[#10826E] mb-4">Your Notes</h4>
        <Select
          placeholder="Sort & Filter"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              label: "Filtering",
              options: [
                {
                  value: "completed",
                  label: "Completed",
                },
                {
                  value: "Uncompleted",
                  label: "Uncompleted",
                },
                {
                  value: "due_date",
                  label: "Over Dued",
                },
              ],
            },
            {
              label: "Sorting",
              options: [
                {
                  value: "latest",
                  label: "From Lastest",
                },
                {
                  value: "oldest",
                  label: "From Oldest",
                },
                {
                  value: "work",
                  label: "Asce Priority",
                },
              ],
            },
          ]}
        />
      </div>
      {loading ? (
        <Spin tip="Loading...">
          <Alert
            message="Fetch Notes !"
            description="Jotbox is getting your notes"
            type="info"
          />
        </Spin>
      ) : (
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
              ({
                category,
                description,
                title,
                priority,
                id,
                due_date,
                completed,
              }) => (
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
                          className="text-slate-700 text-xl "
                        />
                      </Tooltip>
                    </div>
                    <ViewModal data={note} />
                  </div>
                  <h4 className="text-slate-700 pt-4 pb-2 text-lg font-medium">
                    {title.toUpperCase()}
                  </h4>
                  {completed ? (
                    <div className="flex items-center gap-1 text-slate-500">
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                      completed
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-slate-500">
                      <CheckCircleTwoTone twoToneColor="#eb2f96" />
                      Uncompleted
                    </div>
                  )}
                  <p className="text-slate-500 text-ellipsis pb-11 pt-4">
                    {description.length < 40
                      ? description
                      : breakParagraphWithEllipsis(description)}
                  </p>
                  <div className="absolute bottom-2  w-[90%]">
                    <div className="flex justify-between items-center py-2  ">
                      <div className="flex">
                        <Tag color="success">{category}</Tag>
                        <div className="text-slate-700 font-medium flex gap-1 items-center">
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
      )}
    </div>
  );
}

export default Home;
