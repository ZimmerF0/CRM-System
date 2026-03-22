import type { Todo } from "../../types/todo";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";

interface TodoListProps {
  todo: Todo;
}

export function TodoList({ todos }: TodoListProps) {
  return (
    <div className={styles["todo-list"]}>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
