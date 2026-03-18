import { useState } from "react";
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
import { Link } from "react-router";
import { useAppDispatch } from "../../store/hooks";
import type { UserRegistration } from "../../types/auth";
import { register } from "../../store/auth/thunks";
import loginIcon from "../../assets/loginIcon.svg";
import illustration from "../../assets/illustration.png";

import styles from "../Login/LoginPage.module.css";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async (values: UserRegistration) => {
    try {
      await dispatch(register(values)).unwrap();
      setIsSuccess(true);

      notification.success({
        message: "Регистрация успешна",
        description: "Теперь вы можете перейти на страницу авторизации.",
        placement: "topRight",
      });
    } catch (error) {
      notification.error({
        message: "Ошибка регистрации",
        description: String(error),
        placement: "topRight",
      });
    }
  };

  if (isSuccess) {
    return (
      <Content style={{ maxWidth: 400, margin: "100px auto" }}>
        <Title level={3}>Регистрация прошла успешно</Title>
        <Text>Теперь вы можете войти в систему.</Text>

        <div style={{ marginTop: 20 }}>
          <Link to="/login">
            <Button type="primary" block>
              Перейти к авторизации
            </Button>
          </Link>
        </div>
      </Content>
    );
  }

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
                <Title level={2}>Регистрация</Title>
                <Text type="secondary">
                  See what is going on with your business
                </Text>
              </div>

              <Form
                onFinish={handleRegister}
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
                    onKeyDown={handlePasswordKeyDown}
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
                    onKeyDown={handlePasswordKeyDown}
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
                  className={styles.loginButton}
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
