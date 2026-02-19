import { Button, Card, Descriptions } from "antd";

export default function ProfilePage() {
  // Обычно данные приходят с API
  const user = {
    username: "Ivan Ivanov",
    email: "ivan@mail.com",
    phone: "+380991234567",
  };

  return (
    <Card title="Личный кабинет" style={{ maxWidth: 600, margin: "0 auto"  }}>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Имя пользователя">
          {user.username}
        </Descriptions.Item>

        <Descriptions.Item label="Почтовый адрес">
          {user.email}
        </Descriptions.Item>

        <Descriptions.Item label="Телефон">{user.phone}</Descriptions.Item>
      </Descriptions>
      <Button type="primary" htmlType="submit" block size="large">
        Logout
      </Button>
    </Card>
  );
}
