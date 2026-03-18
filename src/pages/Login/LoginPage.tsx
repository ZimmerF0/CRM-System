import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
  notification,
} from "antd";

import illustration from "../../assets/illustration.png";
import loginIcon from "../../assets/loginIcon.svg";
import styles from "./LoginPage.module.css";
import type { AuthData } from "../../types/auth";
import { useAppDispatch } from "../../store/hooks";
import {  login } from "../../store/auth/thunks";
import { fetchProfile } from "../../store/auth/thunks";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const { Content } = Layout;
const { Title, Text} = Typography;

export default function LoginPage() {
const dispatch = useAppDispatch()
const navigate = useNavigate();

  const handleLogin = async (values: AuthData) => {
    try {
      await dispatch(login(values)).unwrap();
      await dispatch(fetchProfile()).unwrap();
      navigate("/list");
    } catch (error) {
      notification.error({
        message: "Ошибка авторизации",
        description: String(error),
        placement: "topRight",
      });
    }
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === " ") {
    e.preventDefault();
  }
};

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

              <Form onFinish={handleLogin} layout="vertical" className={styles.form}>
                <Form.Item
                  className={styles.input}
                  label="Логин"
                  name="login"
                  rules={[
                    { required: true, message: "Введите логин" },
                    {
                      pattern: /^[A-Za-z]{2,60}$/,
                      message:
                        "От 2 до 60 символов латинского алфавита без пробелов",
                    },
                  ]}
                >
                  <Input placeholder="логин" />
                </Form.Item>

                <Form.Item
                  className={styles.input}
                  label="Пароль"
                  name="password"
                  rules={[
                    { required: true, message: "Введите пароль" },
                    { min: 6, message: "Минимум 6 символов" },
                    { max: 60, message: "Максимум 60 символов" },
                  ]}
                >
                  <Input.Password
                    placeholder="********"
                    onKeyDown={handlePasswordKeyDown}
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  className={styles.loginButton}
                >
                  Войти
                </Button>

                <div className={styles.footer}>
                  <Text type="secondary">Not Registered Yet?</Text>{" "}
                  <Link to="/register" className={styles.link}>
                    Регистрация
                  </Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
