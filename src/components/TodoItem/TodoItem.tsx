import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeTodo} from "../../store/todos/Slices/slice";
import { fetchTodos } from "../../store/todos/thunks";
import { selectFilter } from "../../Modules/todos/selectors";
import { deleteTask, updateTask } from "../../api/tasksAPI";
import type { Todo } from "../../types/todo";
import { validateTitle } from "../../helpers/validateTitle";
import {
  Button,
  Card,
  Checkbox,
  Flex,
  Input,
  Typography,
  notification,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [newText, setNewText] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector(selectFilter);

  function handleConfirmClick() {
    const editingText = newText.trim();
    const error = validateTitle(editingText);

    if (error) {
      notification.error({
        message: "Ошибка",
        description: error,
        placement: "topRight",
      });
      return;
    }

    changeTodo(todo.id, editingText);
    setIsEditing(false);

    notification.success({
      message: "Успешно",
      description: "Задача обновлена",
      placement: "topRight",
    });
  }

  function handleCancelClick() {
    setIsEditing(false);
    setNewText(todo.title);
  }

  const handleDelete = async () => {
    try {
      await deleteTask(todo.id); // 1. удаляем на сервере
      dispatch(removeTodo(todo.id)); // 2. удаляем в Redux
      dispatch(fetchTodos(activeFilter));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "ошибка при удалении";

      notification.error({
        message: "Не удалось удалить задачу",
        description: errorMessage,
        placement: "topRight",
      });
    }
  };

  const changeTodo = async (id: number, newText: string) => {
    try {
      await updateTask(id, { title: newText });
      dispatch(fetchTodos(activeFilter));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Произошла ошибка при обновлении";

      notification.error({
        message: "Не удалось изменить задачу",
        description: errorMessage,
        placement: "topRight",
      });
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      await updateTask(id, { isDone: !todo.isDone });
      dispatch(fetchTodos(activeFilter));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Произошла ошибка при изменении статуса";

      notification.error({
        message: "Не удалось изменить статус задачи",
        description: errorMessage,
        placement: "topRight",
      });
    }
  };

  return (
    <>
      {isEditing ? (
        <Card bodyStyle={{ padding: 0 }} className={styles.edited}>
          <Input
            className={styles.input}
            type="text"
            required
            value={newText}
            onChange={event => setNewText(event.target.value)}
            autoFocus
          />
          <div className={styles.actions}>
            <Button
              color="primary"
              variant="solid"
              onClick={handleConfirmClick}
              icon={<CheckOutlined />}
            />
            <Button
              style={{
                backgroundColor: "#b3a9a9",
                borderColor: "#b3a9a9",
              }}
              onClick={handleCancelClick}
              icon={<CloseOutlined />}
            />
          </div>
        </Card>
      ) : (
        <Card
          size="small"
          style={{ marginBottom: 20 }}
          className={todo.isDone ? styles.completed : ""}
        >
          <Flex align="center" gap={8}>
            <Checkbox
              className={styles.checkbox}
              checked={todo.isDone}
              onChange={() => toggleTodo(todo.id)}
            />
            <Typography.Text style={{ fontSize: 16 }}>
              {todo.title}
            </Typography.Text>
          </Flex>

          <div className={styles.actions}>
            <Button
              color="primary"
              variant="solid"
              onClick={() => setIsEditing(true)}
              icon={<EditOutlined />}
            />
            <Button
              color="danger"
              variant="solid"
              onClick={() => handleDelete()}
              icon={<DeleteOutlined />}
            />
          </div>
        </Card>
      )}
    </>
  );
}
