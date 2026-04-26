import { Form, Input, Button, Typography, notification } from "antd";

import loginIcon from "../../assets/loginIcon.svg";
import styles from "./LoginPage.module.css";
import type { AuthData } from "../../types/auth";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/auth/thunks";
import { fetchProfile } from "../../store/auth/thunks";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const { Title, Text } = Typography;

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values: AuthData) => {
    try {
      await dispatch(login(values)).unwrap();
      await dispatch(fetchProfile()).unwrap();
      navigate("/todos");
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
    <div className={styles.formWrap}>
      <img className={styles.icon} src={loginIcon} alt="login-icon" />
      <div className={styles.title}>
        <Title level={2}>Войти</Title>
        <Text type="secondary">See what is going on with your business</Text>
      </div>

      <Form onFinish={handleLogin} layout="vertical" className={styles.form}>
        <Form.Item
          className={styles.input}
          label="Логин"
          name="login"
          rules={[
            { required: true, message: "Введите логин" },
            {
              min: 2,
              message: "Минимум 2 символа",
            },
            {
              max: 60,
              message: "Максимум 60 символов",
            },
            {
              pattern: /^\S+$/,
              message: "Пробелы запрещены",
            },
            {
              pattern: /^[A-Za-z]/,
              message: "Только буквы латинского алфавита",
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
  );
}
