import {
  Alert,
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Spin,
  notification,
} from "antd";
import moment from "moment";

import { useNavigate } from "react-router-dom";
import { createNoteApi } from "../../../api/notes";
import { useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");

  const openNotification = (msg, desc) => {
    api.open({
      message: msg,
      description: desc,
    });
  };

  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    try {
      setLoading(true);
      values.due_date = moment(date).format("YYYY-MM-DD");

      const response = await createNoteApi(values);

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
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid place-items-center pt-5">
      {contextHolder}
      {loading && (
        <Spin tip="Creating Note...">
          <Alert
            message="Jotbox creating note in progress !"
            description="Jotbox is currently creating you Note, Wait for confirmation Alert"
            type="info"
          />
        </Spin>
      )}
      <h2 className="text-xl text-[#10826E] pb-6">Create A New Note</h2>
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
            <Select placeholder="Note Priority">
              <Select.Option value="Low">Low</Select.Option>
              <Select.Option value="Moderate">Moderate</Select.Option>
              <Select.Option value="High">High</Select.Option>
            </Select>
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
            <DatePicker onChange={onChange} format="YYYY-MM-DD" />
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="completed"
          rules={[
            {
              required: true,
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(100%)",
          }}
        >
          <Select placeholder="Note Completed Status">
            <Select.Option value="True">True</Select.Option>
            <Select.Option value="False">False</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name={"description"}>
          <Input.TextArea maxLength={1000} showCount={true} />
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
            disabled={loading}
            loading={loading}
          >
            Create Note
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CreateNote;
