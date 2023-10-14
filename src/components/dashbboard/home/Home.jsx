import { Tag, Dropdown } from "antd";
import {
  MoreOutlined,
  BookOutlined,
  SnippetsOutlined,
  DeleteOutlined,
  ControlOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import instance from "../../../api";

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        View
      </a>
    ),
    icon: <SnippetsOutlined />,
  },
  {
    key: "2",
    label: <p>Edit</p>,
    icon: <ControlOutlined />,
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        Delete
      </a>
    ),
    icon: <DeleteOutlined />,
  },
];

function Home() {
  const [noteData, setnoteData] = useState([]);
  const token = localStorage.getItem("notesToken");
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await instance.get("/notes", {
          headers: { Authorization: `Token ${token}` },
        });
        setnoteData(response.data);
      } catch (error) {
        console.log(error);
        setnoteData([]);
      }
    };

    fetchNote();
  }, []);

  return (
    <div>
      <h4>Your Notes</h4>
      <div className="grid md:grid-cols-fluid grid-cols-flud gap-6">
        {noteData.length === 0
          ? "No Notes Found"
          : noteData?.map(({ category, description, title, priority, id }) => (
              <div key={id} className="bg-violet-400 md:p-4 p-3">
                <div className="flex justify-between">
                  <BookOutlined />
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottomRight"
                  >
                    <MoreOutlined rotate={90} />
                  </Dropdown>
                </div>
                <h4>{title}</h4>
                <div>
                  <p>{description}</p>
                  <Tag color="success">{category}</Tag>
                  <Tag color="success">{priority}</Tag>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Home;
