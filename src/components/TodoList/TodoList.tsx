import TodoItem from "../TodoItem/TodoItem";
import type { Todo } from "../../types/todo";

import styles from "./TodoList.module.css";

interface TodoListProps {
  todos: Todo[];
  refresh: () => Promise<void>;
}

export function TodoList({todos, refresh }: TodoListProps) {
  return (
    <ul className={styles["todo-list"]}>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} refresh={refresh} />
      ))}
    </ul>
  );
}
