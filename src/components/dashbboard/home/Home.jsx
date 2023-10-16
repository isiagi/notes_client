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
// import { ModalContext } from "../../../context/Context";
import ViewModal from "../../viewModal/ViewModal";

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
  // const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

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

  const handleMenuClick = (menuItem) => {
    if (menuItem) {
      console.log(`Clicked on ${menuItem}`);
      if (menuItem.key === "1") {
        // setIsModalOpen(true);
      } else if (menuItem.key === "2") {
        alert("You clicked the 2nd menu item: World");
      }
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
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
              </div>
            ))}
      </div>
    </div>
  );
}

export default Home;
