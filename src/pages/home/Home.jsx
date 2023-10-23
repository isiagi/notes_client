import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownloadOutlined,
  SendOutlined,
  HomeOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useStore } from "../../context/AuthContext";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const bears = useStore((state) => state.getLoginedUser);
  const user = useStore((state) => state.user);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  bears();

  return (
    <div className="">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="sm"
          onBreakpoint={() => {}}
          onCollapse={(collapsed, type) => {
            setCollapsed(collapsed);

            console.log(collapsed, type);
          }}
        >
          <div className="demo-logo-vertical bg-[#E6F4FE] py-3 uppercase text-green-700">
            <p className="bg-gray-300 mx-5 py-2 rounded text-center font-semibold md:text-[14px] text-[10px]">{`Hello ${
              user && user
            }`}</p>
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <HomeOutlined />,
                label: <Link to="/home">Home</Link>,
              },
              {
                key: "4",
                icon: <FileAddOutlined />,
                label: <Link to="/home/create-notes">Create Note</Link>,
              },
              {
                key: "2",
                icon: <SendOutlined />,
                label: <Link to="/home/publish-notes">Publish Note</Link>,
              },
              {
                key: "3",
                icon: <DownloadOutlined />,
                label: <Link to="/home/export-notes">Export Note</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              minHeight: 280,
              background: colorBgContainer,
              overflowX: "hidden",
              overflowY: "scroll",
            }}
            className="md:my-6 md:mx-4 my-4 mx-2 md:p-7 p-3"
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
