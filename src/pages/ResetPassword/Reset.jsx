import { LockOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Spin, message } from "antd";
import instance from "../../api";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Reset = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);

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

      setLoading(true);
      const response = await instance.patch(`/${path}`, values);

      console.log(response);
      info("Your password has been successfuly changed");

      setTimeout(() => {
        history("/home");
      }, 3000);
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
        <Spin tip="Resetting...">
          <Alert
            message="Resetting Password in process !"
            description="Jotbox is currently Resetting your password, Wait for confirmation Alert"
            type="info"
          />
        </Spin>
      )}
      <h3 className="text-xl">JotBox Reset Password</h3>

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
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Enter New Password Here!"
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
