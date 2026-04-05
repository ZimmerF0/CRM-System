import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import type { AppDispatch, RootState } from "../../store/store";
import type { TableProps } from "antd";
import type { Roles, User } from "../../types/users";
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
  Select,
} from "antd";
import {
  ExclamationCircleFilled,
  FilterOutlined,
  MailOutlined,
  MoreOutlined,
  PhoneOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  fetchUsers,
  deleteUserThunk,
  blockUserThunk,
  unblockUserThunk,
  updateUserRolesThunk,
} from "../../store/users/thunks";
import styles from "./UsersPage.module.css";

export default function UserPage() {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<Roles[]>([]);

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

  const handleToggleBlock = async (record: User) => {
    const isCurrentlyBlocked = record.isBlocked;
    confirm({
      title: isCurrentlyBlocked
        ? "Вы уверены что хотите разблокировать этот профиль?"
        : "Вы уверены что хотите заблокировать этот профиль?",
      icon: <ExclamationCircleFilled />,
      content: "Это действие нельзя отменить",
      okText: isCurrentlyBlocked ? "Разблокировать" : "Заблокировать",
      okType: "danger",
      cancelText: "Отмена",
      async onOk() {
        try {
          if (isCurrentlyBlocked) {
            await dispatch(unblockUserThunk(record.id)).unwrap();
          } else {
            await dispatch(blockUserThunk(record.id)).unwrap();
          }
        } catch (error: unknown) {
          console.error("Ошибка при изменении статуса блокировки:", error);
        }
      },
    });
  };

  const openRolesModal = (user: User) => {
    setSelectedUser(user);
    setIsRoleModalOpen(true);
    setSelectedRoles(user.roles);
  };

  const roles = ["USER", "ADMIN", "MODERATOR"] as const;

  const options = roles.map(role => ({
    value: role,
    label: role,
  }));

  const handleRolesChange = (value: Roles[]) => {
    setSelectedRoles(value);
  };

  const handleConfirmRoles = async () => {
    if (!selectedUser) return;

    try {
      await dispatch(
        updateUserRolesThunk({ id: selectedUser.id, roles: selectedRoles }),
      ).unwrap();

      setIsRoleModalOpen(false);
    } catch (error) {
      console.error("Ошибка обновления ролей:", error);
    }
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
          {phoneNumber || " "}
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
            <Link to={`/users/${record.id}`}>Перейти к профилю</Link>
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
                  openRolesModal(record);
                }
                if (key === "block") {
                  handleToggleBlock(record);
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
        page: (pagination.current ?? 1) - 1,
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ ...filters, search: e.target.value, page: 0 }));
  };

  return (
    <>
      <div className={styles.main}>
        <Title level={4}>Пользователи</Title>
        <div className={styles.search}>
          <Input
            value={filters.search ?? ""}
            onChange={handleSearchChange}
            prefix={
              <SearchOutlined style={{ fontSize: "16px", color: "#A5A4A4" }} />
            }
            placeholder="Поиск по имени или email"
            style={{ width: "450px" }}
          />

          <Dropdown
            menu={{
              items: [
                {
                  key: "all",
                  label: "все пользователи",
                },
                {
                  key: "blocked",
                  label: "только заблокированные пользователи",
                },
                {
                  key: "active",
                  label: "только активные пользователи",
                },
              ],
              selectable: true,
              defaultSelectedKeys: ["all"],
              onClick: ({ key }) => {
                if (key === "all") {
                  dispatch(
                    setFilters({ ...filters, isBlocked: undefined, page: 0 }),
                  );
                }
                if (key === "blocked") {
                  dispatch(
                    setFilters({ ...filters, isBlocked: true, page: 0 }),
                  );
                }
                if (key === "active") {
                  dispatch(
                    setFilters({ ...filters, isBlocked: false, page: 0 }),
                  );
                }
              },
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
          current: (filters.page ?? 0) + 1,
          pageSize: filters.limit,
          total: meta?.totalAmount,
        }}
        loading={isLoading}
        onChange={handleTableChange}
      />
      <Modal
        title="Изменение ролей"
        open={isRoleModalOpen}
        onOk={handleConfirmRoles}
        onCancel={() => setIsRoleModalOpen(false)}
        okText="Подтвердить"
        cancelText="Отмена"
      >
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          value={selectedRoles}
          onChange={handleRolesChange}
          options={options}
        />
      </Modal>
    </>
  );
}
