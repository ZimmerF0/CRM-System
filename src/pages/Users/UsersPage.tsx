import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import type { AppDispatch, RootState } from "../../store/store";
import type { MenuProps, TableProps } from "antd";
import type { User } from "../../types/users";
import type { ColumnsType } from "antd/es/table";
import { setFilters } from "../../store/users/Slices/slice";
import Title from "antd/es/typography/Title";
import {
  Button,
  Table,
  Input,
  Flex,
  Tag,
  Space,
  Dropdown,
  Typography,
  Modal,
} from "antd";
import {
  ExclamationCircleFilled,
  FilterOutlined,
  MailOutlined,
  MoreOutlined,
  PhoneOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import styles from "./UsersPage.module.css";
import { deleteUserThunk, fetchUsers } from "../../store/users/thunks";

export default function UserPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, filters, meta } = useSelector(
    (state: RootState) => state.users,
  );
  const { confirm } = Modal;

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: "Вы уверены что хотите удалить этот профиль?",
      icon: <ExclamationCircleFilled />,
      content: "Это действие нельзя отменить",
      okText: "Удалить",
      okType: "danger",
      cancelText: "Отмена",
      onOk() {
        dispatch(deleteUserThunk(id));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const columns: ColumnsType<User> = [
    {
      title: "Имя пользователя",
      dataIndex: "username",
      sorter: true,
      width: "12%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
      width: "15%",
      render: (email: string) => (
        <span>
          <MailOutlined style={{ marginRight: 8 }} />
          {email}
        </span>
      ),
    },
    {
      title: "Телефон",
      dataIndex: "phoneNumber",
      width: "12%",
      render: (phoneNumber: string) => (
        <span>
          {phoneNumber && <PhoneOutlined style={{ marginRight: 8 }} />}
          {phoneNumber || "-"}
        </span>
      ),
    },
    {
      title: "Роли",
      dataIndex: "roles",
      render: (_, { roles }) => (
        <Flex gap="small">
          {roles.map(roles => {
            let color = roles.length > 4 ? "blue" : "violet";
            if (roles === "MODERATOR") {
              color = "orange";
            }
            return (
              <Tag color={color} key={roles}>
                {roles.toUpperCase()}
              </Tag>
            );
          })}
        </Flex>
      ),
    },
    {
      title: "Статус блокировки",
      dataIndex: "isBlocked",
      width: "12%",
      render: (_, { isBlocked }) => (
        <Tag color={isBlocked ? "red" : "green"}>
          {isBlocked ? "заблокирован" : "не заблокирован"}
        </Tag>
      ),
    },
    {
      title: "Дата регистрации",
      dataIndex: "date",
      width: "12%",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Действия",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            danger
            onClick={() => showDeleteConfirm(record.id)}
          >
            Удалить
          </Button>

          <Button type="link">
            <Link to={`/users/${record.id}`}>Профиль</Link>
          </Button>

          <Dropdown
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "roles",
                  label: "Изменить роль",
                },
                {
                  key: "block",
                  label: record.isBlocked ? "Разблокировать" : "Блокировать",
                },
              ],
              onClick: ({ key }) => {
                if (key === "roles") {
                  console.log("roles", record);
                }
                if (key === "block") {
                  console.log("block", record);
                }
              },
            }}
          >
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchUsers(filters));
  }, [dispatch, filters]);

  const handleTableChange: TableProps<User>["onChange"] = (
    pagination,
    _tableFilters,
    sorter,
  ) => {
    dispatch(
      setFilters({
        ...filters,
        page: pagination.current,
        limit: pagination.pageSize,
        sortBy: Array.isArray(sorter) ? undefined : (sorter.field as string),
        sortOrder: Array.isArray(sorter)
          ? undefined
          : sorter.order === "ascend"
            ? "asc"
            : sorter.order === "descend"
              ? "desc"
              : undefined,
      }),
    );
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "все пользователи",
    },
    {
      key: "2",
      label: "только заблокированные пользователи",
    },
    {
      key: "3",
      label: "только активные пользователи",
    },
  ];

  return (
    <>
      <div className={styles.main}>
        <Title level={4}>Пользователи</Title>
        <div className={styles.search}>
          <Input
            prefix={
              <SearchOutlined style={{ fontSize: "16px", color: "#A5A4A4" }} />
            }
            placeholder="Поиск по имени или email"
            style={{ width: "450px" }}
          />

          <Dropdown
            menu={{
              items,
              selectable: true,
              defaultSelectedKeys: ["1"],
            }}
          >
            <Typography.Link>
              <Space>
                <Button size="medium">
                  <FilterOutlined />
                  Фильтр
                </Button>
              </Space>
            </Typography.Link>
          </Dropdown>
        </div>
      </div>

      <Table<User>
        columns={columns}
        rowKey={record => record.id}
        dataSource={users}
        scroll={{ y: 800 }}
        pagination={{
          current: filters.page,
          pageSize: filters.limit,
          total: meta?.totalAmount,
        }}
        loading={isLoading}
        onChange={handleTableChange}
      />
    </>
  );
}
