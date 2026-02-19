import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
} from "antd";
import illustration from "../assets/illustration.png";
import loginIcon from "../assets/loginIcon.svg";
import styles from "./LoginPage.module.css";

const { Content } = Layout;
const { Title, Text, Link } = Typography;

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
                <Title level={2}>Войти</Title>
                <Text type="secondary">
                  See what is going on with your business
                </Text>
              </div>

              <Form layout="vertical" className={styles.form}>
                <Form.Item className={styles.input} label="Логин" name="text"
                rules={[
                    {
                      required: true,
                      message: "Введите логин",
                      whitespace: true,
                    },
                  ]}>
                  <Input placeholder="логин" />
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


                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  className={styles.loginBtn}
                >
                  Войти
                </Button>

                <div className={styles.footer}>
                  <Text type="secondary">Not Registered Yet?</Text>{" "}
                  <Link className={styles.link}>Регистрация</Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
