import { useState } from "react";
import type { Todo } from "../../types/todo";
import { validateTitle } from "../../helpers/validateTitle";

import { deleteTask, updateTask } from "../../api/tasksAPI";

import { ConfirmButton } from "../../ui/IconButton/ConfirmButton/ConfirmButton";
import { CancelButton } from "../../ui/IconButton/CancelButton/CancelButton";
import { EditButton } from "../../ui/IconButton/EditButton/EditButton";
import { DeleteButton } from "../../ui/IconButton/DeleteButton/DeleteButton";

import { CheckboxBtn } from "../../ui/Checkbox/Checkbox";

import styles from "./TodoItem.module.css";
import { IconButton } from "../../ui/IconButton/IconButton";

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
              onClick={handleConfirmClick}
            />
            <IconButton
              variant="secondary"
              onClick={() => setIsEditing(false)}
            />
          </div>
          <ConfirmButton className="confirm" onClick={handleConfirmClick} />
          <CancelButton className="cancel" onClick={() => setIsEditing(false)} />
        </li>
      ) : (
        <li className={todo.isDone ? styles.completed : ""}>
          <CheckboxBtn
            className="checkbox"
            checked={todo.isDone}
            onChange={() => toggleTodo(todo.id)}
          />
          <span>{todo.title}</span>
          <div className={styles.actions}>
            <IconButton
              variant="primary"
              onClick={() => setIsEditing(true)}
            />
            <IconButton
              variant="danger"
              onClick={() => deleteTodo(todo.id)}
            />
          </div>

          <EditButton className="edit" onClick={() => setIsEditing(true)} />
          <DeleteButton
            className="delete"
            onClick={() => deleteTodo(todo.id)}
          />
        </li>
      )}
    </>
  );
}
