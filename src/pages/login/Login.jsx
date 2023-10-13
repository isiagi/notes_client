import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";

import "./login.css";
import instance from "../../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const history = useNavigate();

  const info = (msg) => {
    messageApi.info(msg);
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const response = await instance.post("/auth/login", values);

      localStorage.setItem("notesToken", response.data.Token);

      info("You have successfully Logged In");

      setTimeout(() => {
        history("/home");
      }, 3000);
    } catch (error) {
      console.log(error);
      error.code === "ERR_NETWORK"
        ? info(error.message)
        : info(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      {contextHolder}
      <h3 className="text-xl">LogIn To JotBox</h3>
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
