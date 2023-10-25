import { Button } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const [allow, setAllow] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("notesToken");
    setAllow(true);
    if (token) {
      history("/home");
    }
  }, []);

  if (!allow) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" h-screen bg-[url('https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm90ZXN8ZW58MHx8MHx8fDA%3D&w=500')] bg-no-repeat bg-cover bg-center bg-[#00000099] bg-blend-overlay">
      <div className="pl-6 pt-[10vh] flex justify-center h-full flex-col">
        <h3 className="text-[50px] text-white">Welcome to JotBox</h3>
        <h3 className="text-[19px] text-white">
          Elevate Your Note-Taking Experience.
        </h3>
        <Link to="/register">
          <Button className="w-fit bg-blue-500 text-white mt-3" size="large">
            Sign Up For Free
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
