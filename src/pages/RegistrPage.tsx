import { Layout, Row, Col, Form, Input, Button, Typography } from "antd";
import illustration from "../assets/illustration.png";
import loginIcon from "../assets/loginIcon.svg";
import styles from "./LoginPage.module.css";

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
                <Title level={2}>Зарегистрироваться</Title>
                <Text type="secondary">
                  See what is going on with your business
                </Text>
              </div>

              <Form layout="vertical" className={styles.form}>
                <Form.Item
                  className={styles.input}
                  label="Имя пользователя"
                  name="text"
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
                  name="text"
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
                  name="Пароль"
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
                  name="Пароль"
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
                  name="phone"
                   rules={[
              { type: 'tel', message: 'Введите номер телеффона' },
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
                  Зарегистрироваться
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
