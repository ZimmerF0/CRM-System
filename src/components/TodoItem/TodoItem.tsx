import { useState } from "react";
import type { Todo } from "../../types/todo";
import { validateTitle } from "../../helpers/validateTitle";

import { deleteTask, updateTask } from "../../api/tasksAPI";

import editImg from "../../assets/edit.svg";
import confirmImg from "../../assets/confirm.svg";
import deleteImg from "../../assets/delete.svg";
import cancelImg from "../../assets/cancel.svg";

import { IconButton } from "../../ui/IconButton/IconButton";
import { Checkbox } from "../../ui/Checkbox/Checkbox";

import styles from "./TodoItem.module.css";

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
        <li className={styles.edited}>
          <input
            className={styles["edited-text"]}
            type="text"
            required
            value={newText}
            onChange={event => setNewText(event.target.value)}
            autoFocus
          />
          <div className={styles.actions}>
            <IconButton
              variant="primary"
              src={confirmImg}
              onClick={handleConfirmClick}
              alt="Confirm"
            />
            <IconButton
              variant="secondary"
              src={cancelImg}
              onClick={() => setIsEditing(false)}
              alt="Cancel"
            />
          </div>
        </li>
      ) : (
        <li className={todo.isDone ? styles.completed : ""}>
          <Checkbox
            checked={todo.isDone}
            onChange={() => toggleTodo(todo.id)}
          />
          <span>{todo.title}</span>
          <div className={styles.actions}>
            <IconButton
              variant="primary"
              src={editImg}
              onClick={() => setIsEditing(true)}
              alt="Edit"
            />
            <IconButton
              variant="danger"
              src={deleteImg}
              onClick={() => deleteTodo(todo.id)}
              alt="Delete"
            />
          </div>
        </li>
      )}
    </>
  );
}
