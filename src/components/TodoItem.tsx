/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

import editImg from "../assets/edit.svg";
import saveImg from "../assets/save.svg";
import deleteImg from "../assets/delete.svg";

export function TodoItem({ todo, toggleTodo, deleteTodo, changeTodo }: any) {
  const [newText, setNewText] = React.useState(todo.text);
  const [isEditing, setIsEditing] = React.useState(false);

  function handleSaveClick() {
    changeTodo(todo.id, newText);
    setIsEditing(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement> ) {
    setNewText(event.target.value);
  }

  let taskContent;

  if (isEditing) {
    taskContent = (
      <div>
        <input
          type="text"
          required
          value={newText}
          onChange={handleChange}
          autoFocus
        />
        <img
          className="save"
          src={saveImg}
          onClick={handleSaveClick}
          alt="Save"
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
