import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Spin, message } from "antd";
import instance from "../../api";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [loading, setloading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const history = useNavigate();

  const info = (msg) => {
    messageApi.info(msg);
  };

  const onFinish = async (values) => {
    try {
      setloading(true);
      const response = await instance.post("/auth/signup", values);

      localStorage.setItem("notesToken", response.data.Token);

      info("You have successfully signed up");

      setTimeout(() => {
        history("/home");
      }, 1000);
    } catch (error) {
      error.code === "ERR_NETWORK"
        ? info(error.message)
        : info(error.response.data.username);
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-[90vh] justify-center">
      {contextHolder}
      {loading && (
        <Spin tip="Signing...">
          <Alert
            message="Signing You Up"
            description="Jotbox currently registering you up, Wait for confirmation Alert"
            type="info"
          />
        </Spin>
      )}
      <h3 className="text-xl text-[#0F4C81] pb-6">Register To JotBox</h3>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="first_name"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
            }}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Form.Item>
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
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
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
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-700 mb-4"
            disabled={loading}
            loading={loading}
          >
            Register
          </Button>
          Or{" "}
          <a className="text-blue-500 mt-20" href="/login">
            Login now!
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
