import { useState } from "react";
import { Layout, Form, Input, Button, Typography, notification } from "antd";
import { Link } from "react-router";
import { useAppDispatch } from "../../store/hooks";
import type { UserRegistration } from "../../types/auth";
import { register } from "../../store/auth/thunks";
import loginIcon from "../../assets/loginIcon.svg";

import styles from "../Login/LoginPage.module.css";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleRegister = async (values: UserRegistration) => {
    try {
      await dispatch(register(values)).unwrap();
      setIsSuccess(true);

      notification.success({
        message: "Регистрация успешна",
        description: "Теперь вы можете перейти на страницу авторизации.",
        placement: "topRight"
      });
    } catch (error) {
      notification.error({
        message: "Ошибка регистрации",
        description: String(error),
        placement: "topRight"
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
    <div className={styles.formWrap}>
      <img className={styles.icon} src={loginIcon} alt="login-icon" />
      <div className={styles.title}>
        <Title level={2}>Регистрация</Title>
        <Text type="secondary">See what is going on with your business</Text>
      </div>

      <Form onFinish={handleRegister} layout="vertical" className={styles.form}>
        <Form.Item
          className={styles.input}
          label="Имя пользователя"
          name="username"
          rules={[
            { required: true, message: "Введите имя пользователя" },
            {
              min: 1,
              message: "Минимум 1 символ"
            },
            {
              max: 60,
              message: "Максимум 60 символов"
            },
            {
              pattern: /^\S+$/,
              message: "Пробелы запрещены"
            },
            {
              pattern: /^[A-Za-zА-Яа-яЁё]/,
              message: "Буквы русского или латинского алфавита"
            }
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
              min: 2,
              message: "Минимум 2 символа"
            },
            {
              max: 60,
              message: "Максимум 60 символов"
            },
            {
              pattern: /^\S+$/,
              message: "Пробелы запрещены"
            },
            {
              pattern: /^[A-Za-z]/,
              message: "Только буквы латинского алфавита"
            }
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
            { max: 60, message: "Максимум 60 символов" }
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
              }
            })
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
            { type: "email", message: "Введите корректный email" }
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
              message: "Введите корректный номер"
            }
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
  );
}
