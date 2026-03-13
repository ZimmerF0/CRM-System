import { Button, Card, Descriptions, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import {  logout } from "../../store/auth/Slices/slice";
import { fetchProfile } from "../../store/auth/thunks";
import { useNavigate } from "react-router";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.currentUser);
  const isLoading = useAppSelector(state => state.auth.isLoading);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (isLoading) {
    return <Spin style={{ display: "block", margin: "100px auto" }} />;
  }

  if (!user) {
    return <div style={{ textAlign: "center" }}>Профиль не найден</div>;
  }

  return (
    <Card
      title="Информация о пользователе"
      style={{ maxWidth: 600, margin: "100px auto", background: "#eeeeec" }}
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Имя пользователя">
          {user.username}
        </Descriptions.Item>

        <Descriptions.Item label="Почтовый адрес">
          {user.email}
        </Descriptions.Item>

        <Descriptions.Item label="Телефон">
          {user.phoneNumber}
        </Descriptions.Item>
      </Descriptions>
      <Button
        style={{ marginTop: "50px" }}
        onClick={handleLogout}
        type="primary"
        htmlType="submit"
        block
        size="large"
      >
        Logout
      </Button>
    </Card>
  );
}
