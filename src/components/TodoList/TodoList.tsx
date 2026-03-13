import TodoItem from "../TodoItem/TodoItem";
import { useAppSelector } from "../../store/hooks";
import { selectTodos } from "../../Modules/todos/selectors";

import styles from "./TodoList.module.css";

export function TodoList() {
  const todos = useAppSelector(selectTodos);

  return (
    <div className={styles["todo-list"]}>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
