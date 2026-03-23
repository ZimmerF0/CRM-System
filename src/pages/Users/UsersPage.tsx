import { FilterOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import type { TableProps } from "antd";
import Search from "antd/es/input/Search";
import Title from "antd/es/typography/Title";

interface DataType {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: string;
  phoneNumber: string;
  actions: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Имя пользователя",
    dataIndex: "username",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Дата регистрации",
    dataIndex: "date",
  },
  {
    title: "Статус блокировки",
    dataIndex: "isBlocked",
  },
  {
    title: "Роли",
    dataIndex: "roles",
  },
  {
    title: "Номер телефона",
    dataIndex: "phoneNumber",
  },
  {
    title: "Действия ",
    dataIndex: "button",
  },
];

const data: DataType[] = [
  {
    id: 1,
    username: "John Brown",
    email: "test@MailFilled.ru",
    date: "2026-03-22",
    isBlocked: true,
    roles: "user",
    phoneNumber: "123-456-7890",
    actions: "Редактировать | Удалить",
  },
  {
    id: 2,
    username: "Jim Green",
    email: "test@MailFilled.ru",
    date: "2026-03-22",
    isBlocked: false,
    roles: "user",
    phoneNumber: "123-456-7890",
    actions: "Редактировать | Удалить",
  },
  {
    id: 3,
    username: "Joe Black",
    email: "test@MailFilled.ru",
    date: "2026-03-22",
    isBlocked: false,
    roles: "admin",
    phoneNumber: "123-456-7890",
    actions: "Редактировать | Удалить",
  },
  {
    id: 4,
    username: "Disabled User",
    email: "test@MailFilled.ru",
    date: "2026-03-22",
    isBlocked: true,
    roles: "moderator",
    phoneNumber: "123-456-7890",
    actions: "Редактировать | Удалить",
  },
  {
    id: 5,
    username: "Another User",
    email: "test@MailFilled.ru",
    date: "2026-03-22",
    isBlocked: false,
    roles: "user",
    phoneNumber: "123-456-7890",
    actions: "Редактировать | Удалить",
  },
];

// rowSelection object indicates the need for row selection
// const rowSelection: TableProps<DataType>['rowSelection'] = {
//   onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
//   getCheckboxProps: (record: DataType) => ({
//     disabled: record.name === 'Disabled User', // Column configuration not to be checked
//     name: record.name,
//   }),
// };

export default function UsersPage() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        <Title level={4}>Пользователи</Title>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Search
            placeholder="Поиск по имени или email"
            enterButton
            style={{ width: "450px" }}
          />

          <Button size="large">
            <FilterOutlined />
            Filter
          </Button>
        </div>
      </div>
      <Table<DataType>
        // rowSelection={{ ...rowSelection }}
        columns={columns}
        dataSource={data}
        showSorterTooltip={{ target: "sorter-icon" }}
        bordered
      />
    </div>
  );
}
