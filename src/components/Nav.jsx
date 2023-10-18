import { Typography } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

function Nav() {
  const authToken = localStorage.getItem("notesToken") ? true : false;
  return (
    <nav className="flex justify-between items-center bg-[#0F4C81] h-[10vh] px-6 fixed w-full z-10">
      <Text className="text-xl text-white font-semibold">JotBox</Text>
      <section className="flex gap-3 items-center">
        <Text className="text-base text-white font-semibold">Home</Text>
        {authToken ? (
          <div className="flex gap-1 items-center">
            <UserOutlined className="text-white" />
            <Text className="text-base text-white font-semibold">Logout</Text>
          </div>
        ) : (
          <Link to="/login" className="flex gap-1 items-center">
            <UserOutlined className="text-white" />
            <Text className="text-base text-white font-semibold">Login</Text>
          </Link>
        )}
      </section>
    </nav>
  );
}

export default Nav;
