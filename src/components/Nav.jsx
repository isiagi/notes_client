import { Typography } from "antd";
import { Link } from "react-router-dom";

const { Text } = Typography;

function Nav() {
  return (
    <nav className="flex justify-between items-center bg-slate-400 h-[10vh] px-6 fixed w-full z-10">
      <Text className="text-xl">JotBox</Text>
      <section className="flex gap-3 items-center">
        <Text className="text-base">Home</Text>
        <Link to="/login">
          <Text className="text-base">Login</Text>
        </Link>
      </section>
    </nav>
  );
}

export default Nav;
