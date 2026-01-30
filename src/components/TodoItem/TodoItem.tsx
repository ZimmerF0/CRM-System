import { useState } from "react";
import type { Todo } from "../../types/todo";
import { validateTitle } from "../../helpers/validateTitle";

import editImg from "../../assets/edit.svg";
import confirmImg from "../../assets/confirm.svg";
import deleteImg from "../../assets/delete.svg";
import cancelImg from "../../assets/cancel.svg";

import { IconButton } from "../../ui/IconButton/IconButton";
import { Checkbox } from "../../ui/Checkbox/Checkbox";

import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  changeTodo: (id: number, title: string) => void;
}

export default function TodoItem({
  todo,
  toggleTodo,
  deleteTodo,
  changeTodo,
}: TodoItemProps) {
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
          <IconButton
            variant="confirm"
            src={confirmImg}
            onClick={handleConfirmClick}
            alt="Confirm"
          />
          <IconButton
            variant="cancel"
            src={cancelImg}
            onClick={() => setIsEditing(false)}
            alt="Cancel"
          />
        </li>
      ) : (
        <li className={todo.isDone ? styles.completed : ""}>
          <Checkbox
            checked={todo.isDone}
            onChange={() => toggleTodo(todo.id)}
          />
          <span>{todo.title}</span>
          <IconButton
            variant="edit"
            src={editImg}
            onClick={() => setIsEditing(true)}
            alt="Edit"
          />
          <IconButton
            variant="delete"
            src={deleteImg}
            onClick={() => deleteTodo(todo.id)}
            alt="Delete"
          />
        </li>
      )}
    </>
  );
}
