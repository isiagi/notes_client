import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import instance from "../../api";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Reset = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setloading] = useState(false);
  const history = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  let path;

  // Split the pathname by '/'
  const pathParts = pathname.split("/");

  // Find the index of "auth" in the pathParts array
  const authIndex = pathParts.indexOf("api");

  if (authIndex !== -1 && authIndex < pathParts.length - 1) {
    // Get the part of the URL that comes after "auth"
    path = pathParts.slice(authIndex + 1).join("/");

    // console.log("Desired Path:", desiredPath);
  }

  const info = (msg) => {
    messageApi.info(msg);
  };

  console.log("Full URL:", path);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      setloading(true);
      const response = await instance.patch(`/${path}`, values);

      console.log(response);
      info("You have successfully Logged In");

      setTimeout(() => {
        history("/home");
      }, 3000);
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
      <h3 className="text-xl">JotBox New Password</h3>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
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
            prefix={<MailOutlined className="site-form-item-icon" />}
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
            Reset Password!
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
export default Reset;
