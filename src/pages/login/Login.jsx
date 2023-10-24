import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Alert, Spin } from "antd";

import "./login.css";
import instance from "../../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useStore } from "../../context/AuthContext";

const Login = () => {
  const [loading, setloading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const history = useNavigate();

  // const loginUser = useStore((state) => state.logInUser);

  const info = (msg) => {
    messageApi.info(msg);
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      setloading(true);
      const response = await instance.post("/auth/login", values);

      localStorage.setItem("notesToken", response.data.Token);

      localStorage.setItem("noteUser", response.data?.User.username);

      info("You have successfully Logged In");

      setTimeout(() => {
        history("/home");
      }, 2000);
    } catch (error) {
      console.log(error);
      error.code === "ERR_NETWORK"
        ? info(error.message)
        : info(JSON.stringify(error.response.data));
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      {contextHolder}
      {loading && (
        <Spin tip="Logging In...">
          <Alert
            message="Logging You In !"
            description="Jotbox currently trying to log you in, Wait for confirmation Alert"
            type="info"
          />
        </Spin>
      )}
      {!loading && (
        <Alert message="Login To Continue!" type="warning" className="my-2" />
      )}
      <h3 className="text-xl my-3">LogIn To JotBox</h3>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <a className="text-blue-500" href="/forgot_password">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-700 mb-4"
            disabled={loading}
            loading={loading}
          >
            Log in
          </Button>
          Or{" "}
          <a className="text-blue-500 mt-20" href="/register">
            register now!
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
