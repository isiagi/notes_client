import { Typography } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { logoutApi } from "../api/auth";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

function Nav() {
  const authToken = localStorage.getItem("notesToken") ? true : false;

  const history = useNavigate();

  const handleLogOut = async () => {
    try {
      await logoutApi("/auth/logout");

      localStorage.removeItem("notesToken");
      history("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="flex justify-between items-center bg-[#0F4C81] h-[10vh] px-6  w-full z-10">
      <Link to="/">
        <Text className="text-xl text-white font-semibold">JotBox</Text>
      </Link>
      <section className="flex gap-3 items-center">
        <Link to="/home">
          <Text className="text-base text-white font-semibold">Home</Text>
        </Link>
        {authToken ? (
          <div
            className="flex gap-1 items-center cursor-pointer"
            onClick={handleLogOut}
          >
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
