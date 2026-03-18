import { useEffect } from "react";

import { TodoForm } from "../../components/TodoForm/TodoForm";
import { TodoFilter } from "../../components/TodoFilter/TodoFilter";
import { TodoList } from "../../components/TodoList/TodoList";

import { fetchTodos } from "../../store/todos/thunks";
import { selectFilter } from "../../Modules/todos/selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import styles from "./TodoListPage.module.css";

export default function TodoListPage() {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchTodos(activeFilter));

    const intervalId = setInterval(() => {
      dispatch(fetchTodos(activeFilter));
    }, 5000);
    return () => clearInterval(intervalId);
  }, [dispatch, activeFilter]);

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>TodoList</h1>

      <TodoForm />
      <TodoFilter />
      <TodoList />
    </div>
  );
}
