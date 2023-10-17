import { Tag, Dropdown } from "antd";
import {
  MoreOutlined,
  BookOutlined,
  SnippetsOutlined,
  DeleteOutlined,
  ControlOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import instance from "../../../api";
import { ModalContext } from "../../../context/Context";
import ViewModal from "../../viewModal/ViewModal";
import { Link } from "react-router-dom";

const items = [
  {
    key: "1",
    label: "View",
    icon: <SnippetsOutlined />,
  },
  {
    key: "2",
    label: "Edit",
    icon: <ControlOutlined />,
  },
  {
    key: "3",
    label: "Delete",
    icon: <DeleteOutlined />,
  },
];

function Home() {
  const [noteData, setnoteData] = useState([]);
  const { setIsModalOpen } = useContext(ModalContext);

  const token = localStorage.getItem("notesToken");
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await instance.get("/notes", {
          headers: { Authorization: `Token ${token}` },
        });
        console.log(response);
        setnoteData(response.data);
      } catch (error) {
        console.log(error);
        setnoteData([]);
      }
    };

    fetchNote();
  }, []);

  const handleMenuClick = (menuItem) => {
    if (menuItem) {
      console.log(`Clicked on ${menuItem}`);
      if (menuItem.key === "1") {
        setIsModalOpen(true);
        console.log("hello");
      } else if (menuItem.key === "2") {
        console.log("van");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await instance.delete(`/notes/${id}`, {
        headers: { Authorization: `Token ${token}` },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const menuProps = {
    items,
    onClick: ({ key }) => {
      const menuItem = items.find((item) => item.key === key);
      handleMenuClick(menuItem);
    },
  };

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
                  <Dropdown menu={menuProps} placement="bottomRight">
                    <MoreOutlined rotate={90} />
                  </Dropdown>
                  <ViewModal />
                </div>
                <h4>{title}</h4>
                <div>
                  <p>{description}</p>
                  <Tag color="success">{category}</Tag>
                  <Tag color="success">{priority}</Tag>
                </div>
                <DeleteOutlined onClick={() => handleDelete(id)} />
                <Link to={`/home/edit-note/${id}`}>
                  <EditOutlined />
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Home;
