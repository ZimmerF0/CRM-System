import React from "react";
import { Layout, Menu } from "antd";
import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";

import "./styles/App.css";
import { Outlet, useNavigate } from "react-router";

const { Sider, Content } = Layout;

const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout className="main">
      <Sider>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/list"]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: "/list",
              icon: <UnorderedListOutlined />,
              label: "Список задач",
            },
            {
              key: "/profile",
              icon: <UserOutlined />,
              label: "Профиль",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "24px",
            background: "white",
            borderRadius: "20px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
