import TodoItem from "../TodoItem/TodoItem";
import { useSelector } from "react-redux";
import { selectTodos } from "../../store/todoSlice";
import type { RootState } from "../../store/store";

import styles from "./TodoList.module.css";

export function TodoList() {
  const todos = useSelector((state: RootState) => selectTodos(state));

  return (
    <div className={styles["todo-list"]}>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
