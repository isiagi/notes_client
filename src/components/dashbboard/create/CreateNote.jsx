import { Button, DatePicker, Form, Input, Select, notification } from "antd";
import moment from "moment";
import instance from "../../../api";

import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: {
    span: 16,
  },
  wrapperCol: {
    span: 24,
  },
};
const CreateNote = () => {
  const history = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (msg, desc) => {
    api.open({
      message: msg,
      description: desc,
    });
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const token = localStorage.getItem("notesToken");

    try {
      values["due_date"] = moment(values["due_date"]).format("YYYY-MM-DD");
      const response = await instance.post("/notes/create", values, {
        headers: { Authorization: `Token ${token}` },
      });
      openNotification(
        "Creation Successful!",
        `New Note with Title ${response.data.title} has been created!`
      );
      setTimeout(() => {
        history("/home");
      }, 3000);
    } catch (error) {
      console.log(error);
      openNotification("Creation Unsuccessful", `Failed to create new note!`);
    }
  };
  return (
    <div className="grid place-items-center">
      {contextHolder}
      <h2>Create A New Note</h2>
      <Form
        {...layout}
        name="complex-form"
        onFinish={onFinish}
        labelCol={{
          span: 16,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 800,
        }}
      >
        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="title"
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
            <Input placeholder="Note Title" />
          </Form.Item>
          <Form.Item
            name="category"
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
            <Select placeholder="Note Category">
              <Select.Option value="Personal">Personal</Select.Option>
              <Select.Option value="Work">Work</Select.Option>
              <Select.Option value="Education">Education</Select.Option>
              <Select.Option value="Health">Health</Select.Option>
            </Select>
          </Form.Item>
        </Form.Item>
        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          {" "}
          <Form.Item
            name="priority"
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
            <Input placeholder="Note Priority" />
          </Form.Item>
          <Form.Item
            name="due_date"
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
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
        </Form.Item>
        <Form.Item name={"description"}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
          }}
        >
          <Button
            className="bg-blue-500 w-full"
            type="primary"
            htmlType="submit"
          >
            Create Note
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CreateNote;
