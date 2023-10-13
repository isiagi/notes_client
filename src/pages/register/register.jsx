import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import instance from "../../api";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const history = useNavigate();

  const info = (msg) => {
    messageApi.info(msg);
  };

  const onFinish = async (values) => {
    try {
      const response = await instance.post("/auth/signup", values);

      localStorage.setItem("notesToken", response.data.Token);

      info("You have successfully signed up");

      setTimeout(() => {
        history("/home");
      }, 3000);
    } catch (error) {
      error.code === "ERR_NETWORK"
        ? info(error.message)
        : info(error.response.data.username);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      {contextHolder}
      <h3 className="text-xl">Register To JotBox</h3>
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
          <a className="text-blue-500" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-700 mb-4"
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
