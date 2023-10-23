import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import instance from "../../api";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Forgot = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setloading] = useState(false);

  const info = (msg) => {
    messageApi.info(msg);
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      setloading(true);
      const response = await instance.post("/auth/forgot_password", values);

      console.log(response);
      info("Email Reset Link Successful Sent your email");

      setTimeout(() => {}, 1000);
    } catch (error) {
      console.log(error);
      error.code === "ERR_NETWORK"
        ? info(error.message)
        : info(error.response.data.message);
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      {contextHolder}
      <h3 className="text-xl">JotBox Forgot Password</h3>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
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
            Forgot Password!
          </Button>
          Or{" "}
          <a className="text-blue-500 mt-20" href="/login">
            Log In!
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Forgot;
