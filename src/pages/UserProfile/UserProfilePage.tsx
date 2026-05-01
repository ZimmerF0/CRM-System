import {
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  notification,
  Spin
} from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { fetchUserById, updateUserThunk } from "../../store/user/thunks";
import type { RootState } from "../../store/store";
import { useNavigate, useParams } from "react-router";
import { ArrowLeftOutlined } from "@ant-design/icons";

import styles from "./UserProfilePage.module.css";
import type { UserRequest } from "../../types/users";

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const currentUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  const isLoading = useAppSelector((state: RootState) => state.users.isLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    form.setFieldsValue(currentUser);
  }, [currentUser, form]);

  if (isLoading) return <Spin />;

  if (!currentUser) return <div>Пользователь не найден</div>;

  const getChangedUserValues = (
    values: UserRequest,
    currentUser: UserRequest
  ): UserRequest => {
    const changedValues: UserRequest = {};

    const fields = ["username", "email", "phoneNumber"];

    fields.forEach(field => {
      if (
        values[field as keyof UserRequest] !==
        currentUser[field as keyof UserRequest]
      ) {
        changedValues[field as keyof UserRequest] =
          values[field as keyof UserRequest];
      }
    });
    return changedValues;
  };

  const handleSubmitUserForm = async () => {
    const values = await form.validateFields();

    const changedValues = getChangedUserValues(values, currentUser);

    if (Object.keys(changedValues).length === 0) {
      setIsEditing(false);
      return;
    }

    await dispatch(
      updateUserThunk({
        id: currentUser.id,
        body: changedValues
      })
    ).unwrap();

    setIsEditing(false);

    notification.success({
      message: "Данные обновлены",
      placement: "topRight"
    });
  };

  return (
    <>
      <Card title="Информация о пользователе" className={styles.main}>
        <Form form={form} layout="vertical">
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Имя пользователя">
              {isEditing ? (
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "Введите имя пользователя" },
                    {
                      pattern: /^[A-Za-zА-Яа-яЁё]{1,60}$/,
                      message:
                        "От 1 до 60 символов русского или латинского алфавита"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : (
                currentUser.username
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Почтовый адрес">
              {isEditing ? (
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Введите email" },
                    { type: "email", message: "Введите корректный email" }
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : (
                currentUser.email
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Телефон">
              {isEditing ? (
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    {
                      pattern: /^\+?\d{10,15}$/,
                      message: "Введите корректный номер"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : (
                currentUser.phoneNumber
              )}
            </Descriptions.Item>
          </Descriptions>
        </Form>

        {!isEditing ? (
          <Button
            className={styles.button}
            onClick={() => {
              form.setFieldsValue({
                username: currentUser.username,
                email: currentUser.email,
                phoneNumber: currentUser.phoneNumber
              });

              setIsEditing(true);
            }}
            type="primary"
            block
            size="large"
          >
            Редактировать
          </Button>
        ) : (
          <Button
            className={styles.button}
            type="primary"
            block
            size="large"
            onClick={handleSubmitUserForm}
          >
            Сохранить
          </Button>
        )}
      </Card>
      <Button
        className={styles.back}
        onClick={() => navigate("/users")}
        color="primary"
        variant="outlined"
        block
        size="large"
      >
        <ArrowLeftOutlined />
        Вернуться
      </Button>
    </>
  );
}
