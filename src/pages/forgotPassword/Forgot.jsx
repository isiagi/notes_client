import { MailOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Spin, message } from "antd";
import instance from "../../api";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

const Forgot = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const history = useNavigate();
  const [loading, setLoading] = useState(false);


  const info = (msg) => {
    messageApi.info(msg);
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {

      setLoading(true);

      const response = await instance.post("/auth/forgot_password", values);

      console.log(response);
      info("Email Reset Link Successful Sent your email");

      setTimeout(() => {}, 1000);
    } catch (error) {
      console.log(error);
      error.code === "ERR_NETWORK"
        ? info(error.message)
        : info(error.response.data.message);

      setLoading(false);
    } finally {
      setLoading(false);

    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      {contextHolder}
      {loading && (
        <Spin tip="Sending...">
          <Alert
            message="Sending Reset Link To Your Email !"
            description="Jotbox is currently send, Wait for confirmation Alert"
            type="info"
          />
        </Spin>
      )}
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
