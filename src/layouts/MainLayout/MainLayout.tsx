import React from "react";
import { useAppSelector } from "../../store/hooks";
import { Outlet, useNavigate, useLocation } from "react-router";
import { Layout, Menu } from "antd";
import {
  UnorderedListOutlined,
  UserOutlined,
  UserSwitchOutlined
} from "@ant-design/icons";

import "./MainLayout.css";

const { Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRoles  = useAppSelector(state => state.auth.currentUser?.roles);
  const hasElevatedRole = userRoles?.includes("ADMIN") || userRoles?.includes("MODERATOR");

  return (
    <Layout className="main">
      <Sider>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: "/todos",
              icon: <UnorderedListOutlined />,
              label: "Список задач"
            },
            {
              key: "/profile",
              icon: <UserOutlined />,
              label: "Личный кабинет"
            },

            ...(hasElevatedRole
              ? [
                  {
                    key: "/users",
                    icon: <UserSwitchOutlined />,
                    label: "Пользователи"
                  }
                ]
              : [])
          ]}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "24px",
            background: "white",
            borderRadius: "20px"
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
