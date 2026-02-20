import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router";
import "./AuthLayout.css";

const { Content } = Layout;

const AuthLayout: React.FC = () => {
  return (
    <Layout className="main">
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AuthLayout;
