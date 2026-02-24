import { Layout, Row, Col, Form, Input, Button, Typography } from "antd";
import illustration from "../assets/illustration.png";
import loginIcon from "../assets/loginIcon.svg";
import styles from "./LoginPage.module.css";
import { Link } from "react-router";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function LoginPage() {
  return (
    <Layout className={styles.loginRoot}>
      <Content className={styles.content}>
        <Row className={styles.shell} wrap>
          {/* Левая часть */}
          <Col xs={0} md={14}>
            <img
              src={illustration}
              alt="illustration"
              className={styles.image}
            />
          </Col>

          {/* Правая часть */}
          <Col xs={24} md={10} className={styles.right}>
            <div className={styles.formWrap}>
              <img className={styles.icon} src={loginIcon} alt="login-icon" />
              <div className={styles.title}>
                <Title level={2}>Регистрация</Title>
                <Text type="secondary">
                  See what is going on with your business
                </Text>
              </div>

              <Form layout="vertical" className={styles.form}>
                <Form.Item
                  className={styles.input}
                  label="Имя пользователя"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Введите имя",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder="Имя" />
                </Form.Item>

                <Form.Item
                  className={styles.input}
                  label="Логин"
                  name="login"
                  rules={[
                    {
                      required: true,
                      message: "Введите логин",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder="Логин" />
                </Form.Item>

                <Form.Item
                  className={styles.input}
                  label="Пароль"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Введите пароль",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input.Password placeholder="********" />
                </Form.Item>

                <Form.Item
                  className={styles.input}
                  label="Повторите пароль"
                  name="currentPassword"
                  rules={[
                    {
                      required: true,
                      message: "Повторите пароль",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input.Password placeholder="********" />
                </Form.Item>

                <Form.Item
                  className={styles.input}
                  label="Почтовый адрес"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Введите адрес",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder="abc@mail.ru" />
                </Form.Item>
                <Form.Item
                  className={styles.input}
                  label="Телефон"
                  name="phoneNumber"
                  rules={[
                    {
                      pattern: /^\+?\d{10,15}$/,
                      message: "Введите корректный номер",
                    },
                  ]}
                >
                  <Input placeholder="+78009993535" />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  className={styles.loginBtn}
                >
                  Регистрация
                </Button>
                <div className={styles.footer}>
                  <Text type="secondary">Уже зарегистрированы?</Text>{" "}
                  <Link to="/login" className={styles.link}>Войти</Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
