import React, { useState } from "react";

import editImg from "../assets/edit.svg";
import confirmImg from "../assets/confirm.svg";
import deleteImg from "../assets/delete.svg";
import cancelImg from "../assets/cancel.svg";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  changeTodo: (id: number, title: string) => void;
}

const TodoItem = ({
  todo,
  toggleTodo,
  deleteTodo,
  changeTodo,
}: TodoItemProps) => {
  const [newText, setNewText] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  function handleConfirmClick() {
    const editingText = newText.trim();

    if (!editingText) {
      alert("Поле содержит только пробелы или пустое!");
      return;
    }

    if (editingText.length < 2 || editingText.length > 64) {
      alert("Длина текста должна быть от 2 до 64 символов");
      return;
    }

    changeTodo(todo.id, editingText);
    setIsEditing(false);
  }

  function handleCancelClick() {
    setNewText(todo.title);
    setIsEditing(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewText(event.target.value);
  }

  let taskContent: React.ReactElement;

  if (isEditing) {
    taskContent = (
      <div className="edited">
        <input
          type="text"
          required
          value={newText}
          onChange={handleChange}
          autoFocus
        />
        <img
          className="confirm"
          src={confirmImg}
          onClick={handleConfirmClick}
          alt="Confirm"
        />
        <img
          className="cancel"
          src={cancelImg}
          onClick={handleCancelClick}
          alt="Cancel"
        />
      </div>
    );
  } else {
    taskContent = (
      <li className={todo.isDone ? "completed" : ""}>
        <input
          className="checkbox-input"
          type="checkbox"
          checked={todo.isDone}
          onChange={() => toggleTodo(todo.id)}
        />
        <span>{todo.title}</span>
        <img
          className="edit"
          src={editImg}
          onClick={() => setIsEditing(true)}
          alt="Edit"
        />
        <img
          className="delete"
          src={deleteImg}
          onClick={() => deleteTodo(todo.id)}
          alt="Delete"
        />
      </li>
    );
  }

  return <ul className="todo">{taskContent}</ul>;
};

export default TodoItem;
