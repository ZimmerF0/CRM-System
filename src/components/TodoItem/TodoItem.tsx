import { useState } from "react";
import type { Todo } from "../../types/todo";
import { validateTitle } from "../../helpers/validateTitle";
import { Card, Flex, Input, Typography } from "antd";

import { deleteTask, updateTask } from "../../api/tasksAPI";

import { CheckboxBtn } from "../../ui/Checkbox/Checkbox";

import styles from "./TodoItem.module.css";
import { IconButton } from "../../ui/IconButton/IconButton";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

interface TodoItemProps {
  todo: Todo;
  refresh: () => Promise<void>;
}

export default function TodoItem({ todo, refresh }: TodoItemProps) {
  const [newText, setNewText] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  function handleConfirmClick() {
    const editingText = newText.trim(); // функция валидации вводимого текста
    const error = validateTitle(editingText);

    if (error) {
      alert(error);
      return;
    }

    changeTodo(todo.id, editingText);
    setIsEditing(false);
  }

  function handleCancelClick() {
    setIsEditing(false);
    setNewText(todo.title);
  }

  const deleteTodo = async (id: number) => {
    try {
      await deleteTask(id);

      await refresh();
    } catch (error) {
      console.error(error);
      alert("Не удалось удалить задачу");
    }
  };

  const changeTodo = async (id: number, newText: string) => {
    try {
      await updateTask(id, { title: newText });

      await refresh();
    } catch (error) {
      console.error(error);
      alert("Не удалось изменить задачу");
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      await updateTask(id, { isDone: !todo.isDone });

      await refresh();
    } catch (error) {
      console.error(error);
      alert("Не удалось завуршить задачу");
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
            <IconButton
              variant="primary"
              onClick={handleConfirmClick}
              icon={<CheckOutlined />}
            />
            <IconButton
              variant="secondary"
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
            <CheckboxBtn
              className="checkbox"
              checked={todo.isDone}
              onChange={() => toggleTodo(todo.id)}
            />
            <Typography.Text style={{ fontSize: 16 }}>
              {todo.title}
            </Typography.Text>
          </Flex>

          <div className={styles.actions}>
            <IconButton
              variant="primary"
              onClick={() => setIsEditing(true)}
              icon={<EditOutlined />}
            />
            <IconButton
              variant="danger"
              onClick={() => deleteTodo(todo.id)}
              icon={<DeleteOutlined />}
            />
          </div>
        </Card>
      )}
    </>
  );
}
