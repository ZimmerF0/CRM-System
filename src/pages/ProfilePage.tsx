import { Button, Card, Descriptions, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { fetchProfile } from "../store/slices/authSlice";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.currentUser);
  const isLoading = useAppSelector(state => state.auth.isLoading);

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
    <Card title="Личный кабинет" style={{ maxWidth: 600, margin: "100px auto", background: "#eeeeec" }}>
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
      <Button type="primary" htmlType="submit" block size="large">
        Logout
      </Button>
    </Card>
  );
}
