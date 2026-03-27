import React from "react";
import { Col, Layout, Row } from "antd";
import { Outlet } from "react-router";
import illustration from "../../assets/illustration.png";
import "./AuthLayout.css";

const { Content } = Layout;

const AuthLayout: React.FC = () => {
  return (
    <Layout className="loginRoot">
      <Content className="content">
        <Row className="shell" wrap>
          {/* Левая часть */}
          <Col xs={0} md={14}>
            <img src={illustration} alt="illustration" className="image" />
          </Col>

          {/* Правая часть */}
          <Col xs={24} md={10} className="right">
            <Outlet />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
