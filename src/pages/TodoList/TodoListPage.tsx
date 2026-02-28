import { useEffect } from "react";

import { TodoForm } from "../../components/TodoForm/TodoForm";
import { TodoFilter } from "../../components/TodoFilter/TodoFilter";
import { TodoList } from "../../components/TodoList/TodoList";

import type { RootState } from "../../store/store";

import { fetchTodos, selectFilter } from "../../store/slices/todoSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import styles from "./TodoListPage.module.css";

export default function TodoListPage() {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector((state: RootState) =>
    selectFilter(state),
  );

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
