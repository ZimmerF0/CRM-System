import TodoItem from "../TodoItem/TodoItem";
import type { Todo } from "../../types/todo";

import styles from "./TodoList.module.css"

interface TodoListProps {
  todos: Todo[];
  changeTodo: (id: number, newText: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

export function TodoList({
  todos,
  changeTodo,
  deleteTodo,
  toggleTodo,
}: TodoListProps) {
  return (
    <ul className={styles["todo-list"]}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          changeTodo={changeTodo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </ul>
  );
}
