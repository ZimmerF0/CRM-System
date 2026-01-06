/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

import editImg from "../assets/edit.svg";
import confirmImg from "../assets/confirm.svg";
import deleteImg from "../assets/delete.svg";
import cancelImg from "../assets/cancel.svg";

export function TodoItem({ todo, toggleTodo, deleteTodo, changeTodo }: any) {
  const [newText, setNewText] = React.useState(todo.text);
  const [isEditing, setIsEditing] = React.useState(false);

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

    changeTodo(todo.id, newText);
    setIsEditing(false);
  }

  function handleCancelClick() {
    setIsEditing(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewText(event.target.value);
  }

  let taskContent;

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
      <li className={todo.completed ? "completed" : ""}>
        <input
          className="checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <span>{todo.text}</span>
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

  return (
    <div>
      <ul className="todo">{taskContent}</ul>
    </div>
  );
}
