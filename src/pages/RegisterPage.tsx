import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
  message,
} from "antd";
import illustration from "../assets/illustration.png";
import loginIcon from "../assets/loginIcon.svg";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../store/hooks";
import type { UserRegistration } from "../types/auth";
import { register } from "../store/slices/authSlice";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: UserRegistration) => {
    try {
      await dispatch(register(values)).unwrap();
      message.success("Регистрация успешна");
      navigate("/login");
    } catch (error) {
      message.error(String(error));
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
                <Title level={2}>Регистрация</Title>
                <Text type="secondary">
                  See what is going on with your business
                </Text>
              </div>

              <Form
                onFinish={onSubmit}
                layout="vertical"
                className={styles.form}
              >
                <Form.Item
                  className={styles.input}
                  label="Имя пользователя"
                  name="username"
                  rules={[
                    { required: true, message: "Введите имя пользователя" },
                    {
                      pattern: /^[A-Za-zА-Яа-яЁё]{1,60}$/,
                      message:
                        "От 1 до 60 символов русского или латинского алфавита",
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
                    { required: true, message: "Введите логин" },
                    {
                      pattern: /^[A-Za-z]{2,60}$/,
                      message:
                        "От 2 до 60 символов латинского алфавита без пробелов",
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
                    { required: true, message: "Введите пароль" },
                    { min: 6, message: "Минимум 6 символов" },
                    { max: 60, message: "Максимум 60 символов" },
                  ]}
                >
                  <Input.Password
                    placeholder="********"
                    onKeyDown={e => {
                      if (e.key === " ") {
                        e.preventDefault();
                      }
                    }}
                  />
                </Form.Item>

                <Form.Item
                  className={styles.input}
                  label="Повторите пароль"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Повторите пароль" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Пароли не совпадают"));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="********"
                    onKeyDown={e => {
                      if (e.key === " ") {
                        e.preventDefault();
                      }
                    }}
                  />
                </Form.Item>

                <Form.Item
                  className={styles.input}
                  label="Почтовый адрес"
                  name="email"
                  rules={[
                    { required: true, message: "Введите email" },
                    { type: "email", message: "Введите корректный email" },
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
                  <Link to="/login" className={styles.link}>
                    Войти
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
