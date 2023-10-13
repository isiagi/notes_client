import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import DashHome from "../components/dashbboard/home/Home";
import Nav from "../components/Nav";
import Login from "./login/Login";
import Register from "./register/register";
import ProtectRoutes from "../utils/ProtectRoutes";
import Forgot from "./forgotPassword/Forgot";
import Reset from "./ResetPassword/Reset";

function index() {
  const tokenStatus = localStorage.getItem("notesToken") ? true : false;

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectRoutes token={tokenStatus} />}>
          <Route path="/home" element={<Home />}>
            <Route path="/home" element={<DashHome />} />
          </Route>
        </Route>
        <Route path="/forgot_password" element={<Forgot />} />
        <Route path="/api/auth/reset-password/:id/:more/" element={<Reset />} />
        <Route path="*" element={<p>There&apos;s nothing here: 404!</p>} />
      </Routes>
    </Router>
  );
}

export default index;
